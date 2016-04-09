/* global define */

var translate = require('./translate');

!(function()
{
  var loopback = function(text, cb)
  {
    try {
      translate({text: text, from: 'ja', to: 'en'}, function(e, en) {
        if (e != null)
        {
          return cb(e, null);
        }
        return translate({text: en, from: 'en', to: 'ja'}, function(e, ja)
        {
          if (e != null)
          {
            return cb(e, null);
          }
          return cb(null, {ja: ja, en: en});
        });
      });
    } catch (e) {
      return cb(e, null);
    }
  };
  if (typeof define === 'function' && define.amd) define(loopback);
  else if (typeof module === 'object' && module.exports) module.exports = loopback;
  this.loopback = loopback;
}());
