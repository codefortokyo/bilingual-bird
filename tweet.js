/* global define */

var twitter = require('twitter');

var config = require('./config');

!(function()
{
  var client = new twitter({
    consumer_key: config['twitter_consumer_key'],
    consumer_secret: config['twitter_consumer_secret'],
    access_token_key: config['twitter_access_token_key'],
    access_token_secret: config['twitter_access_token_secret']
  });
  var tweet = function(text, cb)
  {
    try {
      client.post('statuses/update', {status: text}, function(error, tweet_body, response){
        if(error)
        {
          return cb(error, null);
        }
        return cb(null, response);
      });
    } catch (e) {
      return cb(e, null);
    }
  };
  if (typeof define === 'function' && define.amd) define(tweet);
  else if (typeof module === 'object' && module.exports) module.exports = tweet;
  this.tweet = tweet;
}());
