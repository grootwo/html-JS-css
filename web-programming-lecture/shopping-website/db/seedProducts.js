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
                ['트리안', '뉴질랜드의 강한 바람을 맞고 자라는 강인한 식물입니다. 여름에는 아주 작은 연둣빛 꽃을 피웁니다. 반양지에서 키워주세요', 15000, '/images/트리안1.png', '/images/트리안2.png', 63, 1, 3],
                ['오렌지 자스민', '양지에서 햇빛을 충분히 받는다면 향기로운 꽃을 피웁니다. 꽃이 지고 나면 열리는 열매로 씨앗을 수확할 수 있습니다.', 17000, '/images/오렌지 자스민1.png', '/images/오렌지 자스민2.png', 36, 0, 3],
                ['아라우카리아', '사시사철 푸른 나무로 실내에서 키워도 잘 자랍니다. 잎의 끝은 뾰족해보이지만 부드럽습니다. 크리스마스 트리로 추천합니다.', 50000, '/images/아라우카리아1.png', '/images/아라우카리아2.png', 71, 1, 2],
                ['피쉬본', '생선뼈를 닮은 귀여운 선인장입니다. 알코올 소독한 가위로 피쉬본을 잘라 흙에 심어두면 뿌리를 내려 무한 증식시킬 수 있습니다.', 10000, '/images/피쉬본1.png', '/images/피쉬본2.png', 28, 0, 2],
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
