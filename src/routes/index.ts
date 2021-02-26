import express from 'express';
const router = express.Router();

import checker  from '../auth'
/* GET home page. */
router.get('/my-account', checker, function(req, res){
  res.render('my-account');
});

router.get('/', function (req, res) {
  res.render('index1', { title: 'Express' });
});

router.get('/dashboard', function (req, res) {
  res.render('dashboard', { title: 'Express' });
});

router.get('/charts', function (req, res) {
  res.render('charts', { title: 'Express' });
});

router.get('/tables', function (req, res) {
  res.render('Tables', { title: 'Express' });
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Express' });
});


router.get('/contact', function (req, res) {
  res.render('contact', { title: 'Express' });
});

router.get('/cart', function (req, res) {
  res.render('cart', { title: 'Carts' });
});

router.get('/login-register', (req, res) => {
  res.render('login-register', { title: 'Login' });
});

router.get('/about-us', (req, res) => {
  res.render('about-us', { title: 'About' });
});

// router.get('/product', (req, res) => {
//   res.render('products', { title: 'Express' });
// });

router.get('/shop', (req, res) => {
  res.render('shop', { title: 'Express' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Express' });
});
router.get('/productadd', (req, res) => {
  res.render('productadd', { title: 'Express' });
});

export default router;
