var express = require('express');
var errors = require('../../build.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { error_set: errors });
});

module.exports = router;