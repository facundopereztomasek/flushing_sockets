var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/control',function( req, res ){
   res.render('control');
});

router.get('/screen',function( req, res ){
   res.render('screen');
});

module.exports = router;
