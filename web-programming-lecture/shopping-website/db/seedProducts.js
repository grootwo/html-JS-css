// scripts/seedProducts.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

// 상품 초기 데이터 삽입
db.serialize(() => {
    db.get('SELECT COUNT(*) AS count FROM products', (err, row) => {
        if (err) {
            console.error('❌ products 테이블 조회 오류:', err.message);
            return db.close();
        }

        if (row.count === 0) {
            const stmt = db.prepare(`
        INSERT INTO products (name, description, price, emoji, image, likes, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

            const products = [
                ['사과', '신선한 국내산 사과', 2000, '🍎', '/images/apple.png', 40, 1],
                ['바나나', '달콤한 수입 바나나', 1500, '🍌', '/images/banana.png', 35, 1],
                ['포도', '탱글탱글한 포도', 3000, '🍇', '/images/grape.png', 28, 1],
                ['오렌지', '비타민 가득 오렌지', 2500, '🍊', '/images/orange.png', 21, 1],
                ['키위', '상큼한 뉴질랜드 키위', 2800, '🥝', '/images/kiwi.png', 15, 0],
                ['복숭아', '달콤한 복숭아', 3500, '🍑', '/images/peach.png', 18, 0],
                ['레몬', '상큼한 레몬', 2000, '🍋', '/images/lemon.png', 12, 0],
                ['수박', '무더운 여름엔 수박!', 8000, '🍉', '/images/watermelon.png', 25, 0],
            ];

            for (const product of products) {
                stmt.run(product);
            }

            stmt.finalize(() => {
                console.log('🍓 8개의 과일 상품 데이터 삽입 완료');
                db.close();
            });
        } else {
            console.log(`ℹ️ 이미 ${row.count}개의 상품이 존재합니다. 삽입 생략`);
            db.close();
        }
    });
});
