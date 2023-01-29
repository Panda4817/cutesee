var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'CuteSee - Backend with Node.js and Express' });
  res.sendFile(path.join(__dirname, '../../cutesee-frontend/build', 'index.html'));
});

module.exports = router;
