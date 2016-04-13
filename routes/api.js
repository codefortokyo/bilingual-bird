var express = require('express');
var router = express.Router();

var translate = require('../translate');
var loopback = require('../loopback');
var bird = require('../duplicity');

router.get('/translate', function(req, res) {
  if (req.query.text === void 0)
  {
    return res.status(400).json({error: 'text is required'});
  }
  if (req.query.text.length === 0)
  {
    return res.json({ja: '', en: ''});
  }
  translate({text: req.query.text,
             from: 'ja',
             to: 'en'}, function(e, d)
  {
    if (e != null)
    {
      return res.status(400).json(e);
    }
    return res.json({en: d});
  });
});

router.get('/loopback', function(req, res) {
  if (req.query.text === void 0)
  {
    return res.status(400).json({error: 'text is required'});
  }
  if (req.query.text.length === 0)
  {
    return res.json({ja: '', en: ''});
  }
  loopback(req.query.text, function(e, d)
  {
    if (e != null)
    {
      return res.status(400).json(e);
    }
    return res.json(d);
  });
});

router.post('/tweet', function(req, res) {
  bird(req.body, function(e, d)
  {
    if (e != null)
    {
      return res.status(400).json(e);
    }
    return res.json(d);
  });
});

module.exports = router;
