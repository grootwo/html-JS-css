const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage: storage });


// 게시글 목록
router.get('/', (req, res) => {
    db.all(`
        SELECT * FROM posts ORDER BY 
        COALESCE(parent_id, id), id ASC
    `, [], (err, posts) => {
        if (err) return res.send('목록 불러오기 실패');
        res.render('board', { title: '고객센터 게시판',posts });
    });
});

// 글쓰기 폼
router.get('/new', (req, res) => {
    res.render('post', {post: null, parentId: null });
});

// 글쓰기 처리
// router.post('/new', (req, res) => {
//     const { title, content, parent_id } = req.body;
//     const author = req.session.user?.username || '익명';
//
//     db.run(
//         'INSERT INTO posts (title, content, parent_id, author) VALUES (?, ?, ?, ?)',
//         [title, content, parent_id || null, author],
//         function (err) {
//             if (err) return res.send('작성 실패');
//             res.redirect('/board');
//         }
//     );
// });

//글쓰기 처리 + 파일 업로드

router.post('/new', upload.single('attachment'), (req, res) => {
    const { title, content, parent_id } = req.body;
    const author = req.session.user?.username || '익명';

    db.run(
        'INSERT INTO posts (title, content, parent_id, author) VALUES (?, ?, ?, ?)',
        [title, content, parent_id || null, author],
        function (err) {
            if (err) return res.send('작성 실패');

            const postId = this.lastID;

            // 파일이 있을 경우 files 테이블에 저장
            if (req.file) {
                const { filename, path: filepath } = req.file;
                db.run(
                    'INSERT INTO files (post_id, filename, filepath) VALUES (?, ?, ?)',
                    [postId, filename, filepath],
                    (err2) => {
                        if (err2) console.error('파일 저장 오류:', err2.message);
                        res.redirect('/board');
                    }
                );
            } else {
                res.redirect('/board');
            }
        }
    );
});

// 글 상세
// router.get('/view/:id', (req, res) => {
//     const postId = req.params.id;
//
//     db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
//         if (err || !post) return res.send('글 없음');
//         res.render('detail', { post });
//     });
// });

// 글 상세 + 파일조회
router.get('/view/:id', (req, res) => {
    const postId = req.params.id;

    db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
        if (err || !post) return res.send('글 없음');

        db.all('SELECT * FROM files WHERE post_id = ?', [postId], (ferr, files) => {
            res.render('detail', { post, files:[] });
        });
    });
});


// 답글 달기 폼
//
// router.get('/reply/:id', (req, res) => {
//     const parentId = req.params.id;
//     res.render('post', {post: null, parentId });
// });

router.get('/reply/:id', (req, res) => {
    const parentId = req.params.id;
    db.get("SELECT title FROM posts WHERE id = ?", [parentId], (err, row) => {
        if (err || !row) return res.send("원글 없음");
        res.render('reply', { parentId, parentTitle: row.title });
    });
});

// 댓글 달기 post
router.post('/create', (req, res) => {
    const { author, title, content, parent_id } = req.body;
    db.run(
        'INSERT INTO posts (author, title, content, parent_id) VALUES (?, ?, ?, ?)',
        [author, title, content, parent_id || null],
        function (err) {
            if (err) return res.send('등록 실패');
            res.redirect('/board');
        }
    );
});


// 수정 폼
router.get('/edit/:id', (req, res) => {
    db.get('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, post) => {
        if (err || !post) return res.send('글 없음');
        res.render('edit',{ post });
        //res.render('post', { post });
    });
});

// 수정 처리
router.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    //const postId = req.params.id;
    db.run(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, req.params.id],
        (err) => {
            if (err) return res.send('수정 실패');
            res.redirect('/board/view/' + req.params.id);
        }
    );
});

// 삭제
router.get('/delete/:id', (req, res) => {
    db.run('DELETE FROM posts WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.send('삭제 실패');
        res.redirect('/board');
    });
});

module.exports = router;
