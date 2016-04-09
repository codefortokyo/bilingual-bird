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
      client.post('statuses/update',
                  {status: text, trim_user: 1},
                  function(error, tweet_body){
                    if(error)
                    {
                      return cb(error, null);
                    }
                    return cb(null, tweet_body);
                  });
    } catch (e) {
      return cb(e, null);
    }
  };
  tweet.reply = function(text, tweetid, cb)
  {
    try {
      client.post('statuses/update',
                  {status: text, in_reply_to_status_id: tweetid, trim_user: 1},
                  function(error, tweet_body){
                    if(error)
                    {
                      return cb(error, null);
                    }
                    return cb(null, tweet_body);
                  });
    } catch (e) {
      return cb(e, null);
    }
  };
  if (typeof define === 'function' && define.amd) define(tweet);
  else if (typeof module === 'object' && module.exports) module.exports = tweet;
  this.tweet = tweet;
}());
