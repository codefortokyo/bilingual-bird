var express = require('express');
var router = express.Router();

var loopback = require('../loopback');
var tweet = require('../tweet');

var config = require('../config');


router.get('/translate', function(req, res, next) {
  if (req.query.text === void 0)
  {
    return res.end('text is required');
  }
  if (req.query.text.length === 0)
  {
    return res.json({ja: '', en: ''});
  }
  loopback(req.query.text, function(e, d)
  {
    if (e != null)
    {
      return res.end(e);
    }
    return res.json(d);
  });
});

router.post('/tweet', function(req, res, next) {

});

module.exports = router;
