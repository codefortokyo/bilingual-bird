
'use strict';

var config = {
  'translator_client_id': 'duplicitous-bird',
  'translator_client_secret': '*************************'
};

try
{
  var f = require('./.config.json');
  Object.keys(f).forEach(function(d)
  {
    config[d] = f[d];
  });
}
catch (e)
{
  'pass';
}
module.exports = config;
