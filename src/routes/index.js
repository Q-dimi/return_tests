var express = require('express');
var errors = require('../../build.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(errors);
  res.render('index', { title: 'Express', error_set: errors });
});

module.exports = router;