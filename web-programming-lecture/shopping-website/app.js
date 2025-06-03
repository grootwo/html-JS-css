var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const boardRouter = require('./routes/board');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 공통 레이아웃 설정
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/board', boardRouter);
app.get('/login', (req, res) => {
  res.redirect('/user/login');
});
app.get('/register', (req, res) => {
  res.redirect('/user/register');
});


const products = [
  {
    id: 1,
    name: '무늬 보스턴 고사리',
    description: '15cm(대품)로 행잉 화분에 담아 보내드립니다.',
    price: '50,000',
    thumbnail: '/images/고사리1.png',
    descriptionImage: '/images/고사리2.png'
  },
  {
    id: 2,
    name: '박쥐란',
    description: '잔털은 먼지가 아니니 닦아내면 안됩니다.',
    price: '10,000',
    thumbnail: '/images/박쥐란1.png',
    descriptionImage: '/images/박쥐란2.png'
  },
  {
    id: 3,
    name: '백묘국',
    description: '6 ~ 9월에 개화합니다. 비가 많이 오는 경우 개화하지 않을 수도 있습니다.',
    price: '3,000',
    thumbnail: '/images/백묘국1.png',
    descriptionImage: '/images/백묘국2.png'
  },
  {
    id: 4,
    name: '그레이스 캄파눌라',
    description: '습한 토양과 반그늘을 좋아합니다.',
    price: '10,000',
    thumbnail: '/images/캄파눌라1.png',
    descriptionImage: '/images/캄파눌라2.png'
  }
];
app.get('/products', (req, res) => {
  res.render("products", { products });
});
app.get('/products/:id', (req, res) => {
  let id = req.params.id;
  let index = products.findIndex((item) => item.id == id);
  res.render('product', { product: products[index] });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
