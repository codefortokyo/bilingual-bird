/* global define */

var tweet = require('./tweet');

!(function()
{
  var duplicity = function(obj, cb)
  {
    if (obj.ja === void 0 ||
        typeof obj.ja !== 'string' ||
        obj.ja.length === 0 ||
        obj.en === void 0 ||
        typeof obj.en !== 'string' ||
        obj.en.length === 0)
    {
      var e = new Error('invalid input');
      e.status = 400;
      return cb(e, null);
    }
    try {
      tweet(obj.ja, function(e, tweet_body)
      {
        if (e != null)
        {
          return cb(e, null);
        }
        if (tweet_body.id_str === void 0)
        {
          var ee = new Error('tweet failed');
          ee.status = 400;
          return cb(ee, null);
        }
        tweet.reply(obj.en, tweet_body.id_str, function(e, rep)
        {
          if (e != null)
          {
            return cb(e, null);
          }
          return cb(null, {original: tweet_body, reply: rep});
        });
      });
    } catch (e) {
      return cb(e, null);
    }
  };
  if (typeof define === 'function' && define.amd) define(duplicity);
  else if (typeof module === 'object' && module.exports) module.exports = duplicity;
  this.duplicity = duplicity;
}());
