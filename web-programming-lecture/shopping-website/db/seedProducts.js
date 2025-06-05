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
        INSERT INTO products (name, description, price, thumbnail, descriptionImage, likes, is_featured, difficulty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

            const products = [
                ['무늬 보스턴 고사리', '습한 곳에 서식하는 식물이므로 실내재배 시 물이 부족하면 잎 끝이 갈색으로 변하거나 떨어집니다. 수경재배도 가능합니다. 15cm(대품)로 행잉 화분에 담아 보내드립니다.', 50000, '/images/고사리1.png', '/images/고사리2.png', 22, 1, 4],
                ['박쥐란', '잔털은 먼지가 아니니 닦아내면 안됩니다. 여름에는 반 그늘에 두고 겨울에는 직사광선을 쬐어주세요.', 10000, '/images/박쥐란1.png', '/images/박쥐란2.png', 54, 1, 5],
                ['백묘국', '6 ~ 9월에 개화합니다. 비가 많이 오는 경우 개화하지 않을 수도 있습니다. 분식 또는 절화, 화단가에 심으면 좋습니다.', 3000, '/images/백묘국1.png', '/images/백묘국2.png', 43, 0, 3],
                ['그레이스 캄파눌라', '개화기는 5∼6월입니다. 습한 토양과 반그늘을 좋아합니다.', 10000, '/images/캄파눌라1.png', '/images/캄파눌라2.png', 32, 0, 3],
            ];

            for (const product of products) {
                stmt.run(product);
            }

            stmt.finalize(() => {
                console.log('식물 상품 데이터 삽입 완료');
                db.close();
            });
        } else {
            console.log(`ℹ️ 이미 ${row.count}개의 상품이 존재합니다. 삽입 생략`);
            db.close();
        }
    });
});
