/* global define */

var http = require('http');
var https = require('https');
var qs = require('querystring');

var config = require('./config');

!(function()
{
  var translator = function(obj, cb)
  {
    if (typeof obj === 'string')
    {
      obj = {text: obj};
    }
    try {
      var _tr = function(err, token)
      {
        if (err != null)
        {
          return cb(err, null);
        }
        var options = {
          text: obj.text,
          from: obj.from || 'ja',
          to: obj.to || 'en'
        };
        var body = '';
        var req = http.request({
          host: 'api.microsofttranslator.com',
          path: '/V2/Ajax.svc/Translate?' + qs.stringify(options),
          headers: {
            Authorization: 'Bearer ' + token
          },
          method: 'GET'
        }, function (res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            body += chunk;
          }).on('end', function () {
            cb(null, body.trim()
                         .replace(/^"(.*)"$/,'$1')
                         .replace(/^「(.*)」$/, '$1'));
          });
        }).on('error', function (err) {
          cb(err, null);
        });

        req.end();
      };
      return _get_token(_tr);
    } catch (e) {
      return cb(e, null);
    }
  };
  var _get_token = function(cb)
  {
    var body = '';
    var req = https.request({
      host: 'datamarket.accesscontrol.windows.net',
      path: '/v2/OAuth2-13',
      method: 'POST'
    }, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        body += chunk;
      }).on('end', function () {
        var resData = JSON.parse(body);
        cb(null, resData.access_token);
      });
    }).on('error', function (err) {
      cb(err, null);
    });
    var data = {
      'client_id': config['translator_client_id'],
      'client_secret': config['translator_client_secret'],
      'scope': 'http://api.microsofttranslator.com',
      'grant_type': 'client_credentials'
    };

    req.write(qs.stringify(data));
    req.end();
  };
  if (typeof define === 'function' && define.amd) define(translator);
  else if (typeof module === 'object' && module.exports) module.exports = translator;
  this.translator = translator;
}());
