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

            res.render('products', {
                allProducts: allProducts,
                featuredProducts: featuredProducts,
                user: req.session.user
            });
        });
    });
});

// ✅ 전체 상품 목록만 보여주는 페이지
router.get('/all', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) return res.status(500).send('전체 상품 목록 불러오기 실패');

        res.render('products_all', {
            products: rows,
            user: req.session.user
        });
    });
});

module.exports = router;
