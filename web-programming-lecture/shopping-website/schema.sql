-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     username TEXT UNIQUE NOT NULL,
                                     password TEXT NOT NULL,
                                     name TEXT NOT NULL
);

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS posts (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     title TEXT NOT NULL,
                                     content TEXT NOT NULL,
                                     parent_id INTEGER,
                                     author TEXT NOT NULL,
                                     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 파일 테이블
CREATE TABLE IF NOT EXISTS files (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     post_id INTEGER,
                                     filename TEXT NOT NULL,
                                     filepath TEXT NOT NULL
);

--  상품목록 테이블
CREATE TABLE IF NOT EXISTS products (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        name TEXT NOT NULL,              -- 상품명
                                        description TEXT,                -- 상품 설명
                                        price INTEGER NOT NULL,          -- 가격 (원 단위)
                                        emoji TEXT,                      -- 이모지 (간단한 시각적 표시용)
                                        image TEXT,                      -- 이미지 파일 경로
                                        likes INTEGER DEFAULT 0,         -- 선호도 (추천수, 고객클릭수 등)
                                        is_featured INTEGER DEFAULT 0    -- 오늘의 추천 상품 여부 (1=추천)
);

-- 장바구니 테이블

DROP TABLE IF EXISTS cart_items;
CREATE TABLE cart_items (
                            user_id INTEGER NOT NULL,
                            product_id INTEGER NOT NULL,
                            quantity INTEGER DEFAULT 1,
                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                            PRIMARY KEY(user_id, product_id)
);
