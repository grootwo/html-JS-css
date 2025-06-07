const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

// 위시리스트에 담기
router.post('/add', (req, res) => {
    const user = req.session.user;
    const productId = req.body.productId;

    if (!user) {
        return res.status(401).render('login_required', {
            message: '위시리스트 담기 위해서는 로그인이 필요합니다.',
            redirectUrl: '/login'
        });
    }

    const query = `INSERT INTO wish_items (user_id, product_id) VALUES (?, ?)`;

    db.run(query, [user.id, productId], function (err) {
        if (err) return res.status(500).send('이미 위시리스트에 존재합니다.');
        res.redirect('/wish');
    });
});

// 위시리스트 목록 조회
router.get('/', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/login');

    const query = `
    SELECT p.id, p.name, p.price, p.difficulty, p.thumbnail
    FROM wish_items c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?`;

    db.all(query, [user.id], (err, rows) => {
        if (err) return res.status(500).send('위시리스트 조회 실패');
        res.render('wish', { wishItems: rows, user });
    });
});

// 위시리스트 항목 삭제
router.post('/delete', (req, res) => {
    const user = req.session.user;
    const { productId } = req.body;

    if (!user) return res.redirect('/user/login');
    const deleteQuery = `DELETE FROM wish_items WHERE user_id = ? AND product_id = ?`;
    db.run(deleteQuery, [user.id, productId], (err) => {
        if (err) {
            console.error('❌ 삭제 실패:', err.message);
            return res.status(500).send('삭제 실패');
        }
        res.redirect('/wish');
    });
});

module.exports = router;

