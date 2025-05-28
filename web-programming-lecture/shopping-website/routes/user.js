const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

// 회원가입 페이지
router.get('/register', (req, res) => {
    res.render('register');
});

// 회원가입 처리
router.post('/register', async (req, res) => {
    const { username, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        'INSERT INTO users (username, password, name) VALUES (?, ?, ?)',
        [username, hashedPassword, name],
        (err) => {
            if (err) {
                console.error(err.message);
                return res.send('회원가입 실패');
            }
            res.redirect('/user/login');
        }
    );
});

// 로그인 페이지
router.get('/login', (req, res) => {
    res.render('login');
});

// 로그인 처리
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err || !user) {
            return res.send('존재하지 않는 사용자입니다.');
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.send('비밀번호가 일치하지 않습니다.');
        }
    });
});

// 로그아웃
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
