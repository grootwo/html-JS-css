const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

// 전체 상품 목록 + 추천 상품 함께 전달
router.get('/', (req, res) => {
    db.all('SELECT * FROM products', (err, allProducts) => {
        if (err) return res.status(500).send('DB 오류: 전체 상품 조회 실패');

        db.all('SELECT * FROM products WHERE is_featured = 1 ORDER BY likes DESC LIMIT 4', (err2, featuredProducts) => {
            if (err2) return res.status(500).send('DB 오류: 추천 상품 조회 실패');

            db.all('SELECT * FROM wish WHERE c.user_id = ' + req.session.user.id.toString(), (err3, wishProducts) => {
                if (err3) return res.status(500).send('DB 오류: 위시 상품 조회 실패');

                console.log('wish Products');
                console.log(wishProducts);
                res.render('products', {
                    allProducts: allProducts,
                    featuredProducts: featuredProducts,
                    wishProducts: wishProducts,
                    user: req.session.user
                });
            });
        });
    });
});

// 상품 상세 페이지
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.all('SELECT * FROM products WHERE id = ' + id.toString(), (err, products) => {
        if (err) return res.status(500).send('DB 오류: 선택 상품 조회 실패');

        res.render('product', {
            product: products[0],
            user: req.session.user
        });
    });
});

module.exports = router;
