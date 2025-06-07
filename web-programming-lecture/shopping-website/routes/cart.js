const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

// 장바구니에 담기
router.post('/add', (req, res) => {
    const user = req.session.user;
    const productId = req.body.productId;

    if (!user) {
        return res.status(401).render('login_required', {
            message: '장바구니 담기 위해서는 로그인이 필요합니다.',
            redirectUrl: '/login'
        });
    }

    const query = `INSERT INTO cart_items (user_id, product_id, quantity) 
                 VALUES (?, ?, 1) 
                 ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = quantity + 1`;

    db.run(query, [user.id, productId], function (err) {
        if (err) return res.status(500).send('장바구니 추가 실패');
        res.redirect('/cart');
    });
});

// 장바구니 목록 조회
router.get('/', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/login');

    const query = `
    SELECT p.id, p.name, p.price, p.difficulty, p.thumbnail, c.quantity
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?`;

    db.all(query, [user.id], (err, rows) => {
        if (err) return res.status(500).send('장바구니 조회 실패');
        res.render('cart', { cartItems: rows, user });
    });
});

//장바구니 수량 조절
router.post('/update', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login_required'); //로그인 한 사용자만 수량 변경 가능
    }
    const userId = req.session.user.id; //로그인한 사용자의 user_id만 사용
    const productId = req.body.productId;
    const action = req.body.action;

    db.get(`SELECT quantity FROM cart_items WHERE user_id = ? AND product_id = ?`, [userId, productId], (err, row) => {
        if (err || !row) {
            return res.status(500).send("❌ 조회 실패");
        }

        let newQuantity = row.quantity;
        if (action === 'increase') {
            newQuantity += 1;
        } else if (action === 'decrease') {
            newQuantity -= 1;
        }

        if (newQuantity <= 0) {
            // 수량이 0이 되면 항목 삭제
            db.run(`DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`, [userId, productId], (err) => {
                return res.redirect('/cart');
            });
        } else {
            // 수량 업데이트
            db.run(`UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?`, [newQuantity, userId, productId], (err) => {
                return res.redirect('/cart');
            });

        }
    });
});


// 장바구니 항목 삭제
router.post('/delete', (req, res) => {
    const user = req.session.user;
    const { productId } = req.body;

    if (!user) return res.redirect('/user/login');

    // 1단계: 현재 수량 확인
    const checkQuery = `SELECT quantity FROM cart_items WHERE user_id = ? AND product_id = ?`;
    db.get(checkQuery, [user.id, productId], (err, row) => {
        if (err) {
            console.error('❌ 수량 조회 실패:', err.message);
            return res.status(500).send('수량 조회 실패');
        }

        if (!row) return res.redirect('/cart'); // 없으면 리다이렉트

        if (row.quantity > 1) {
            // 2단계: 수량 감소
            const updateQuery = `UPDATE cart_items SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?`;
            db.run(updateQuery, [user.id, productId], (err) => {
                if (err) {
                    console.error('❌ 수량 감소 실패:', err.message);
                    return res.status(500).send('수량 감소 실패');
                }
                res.redirect('/cart');
            });
        } else {
            // 3단계: 수량이 1이면 항목 제거
            const deleteQuery = `DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`;
            db.run(deleteQuery, [user.id, productId], (err) => {
                if (err) {
                    console.error('❌ 삭제 실패:', err.message);
                    return res.status(500).send('삭제 실패');
                }
                res.redirect('/cart');
            });
        }
    });
});

module.exports = router;

