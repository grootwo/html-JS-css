// // routes/order.js
// const express = require('express');
// const router = express.Router();
//
// router.post('/confirm', (req, res) => {
//     // 실제 주문 로직은 생략하고 더미 페이지 렌더링
//     res.render('order_confirm', {
//         user: req.session.user || { name: '손님' }, // 사용자 세션
//     });
// });
//
// module.exports = router;

// 장바구니에 내용이 있을 때만 주문 가능하게 수정
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

router.post('/confirm', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/login');

    const query = `SELECT COUNT(*) AS count FROM cart_items WHERE user_id = ?`;

    db.get(query, [user.id], (err, row) => {
        if (err) return res.status(500).send('DB 오류: 장바구니 확인 실패');
        if (row.count === 0) {
            return res.render('order_confirm', {
                user,
                error: '장바구니가 비어 있어 주문할 수 없습니다.',
            });
        }

        // 장바구니에 상품이 있는 경우만 주문 확인 페이지 렌더링
        res.render('order_confirm', { user });
    });
});

module.exports = router;