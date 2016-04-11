/* global d3 */

!(function(d3)
{
  var app = function(_)
  {
    var root = _;
    if (_.node === void 0 || typeof _.node !== 'function')
    {
      root = d3.select(_);
    }
    var article = root.append('article');
    var input = article.append('textarea');
    var en = article.append('p');
    var ja = article.append('p');
    var timer = null;
    var blocking = false;
    var tr = function()
    {
      d3.json('/api/translate?text='+input.property('value'),
              function(e, d)
              {
                if (e != null)
                {
                  console.log(e);
                  return;
                }
                en.text(d.en);
                ja.text(d.ja);
                timer = null;
              });
    };
    input.on('keyup', function()
    {
      if (timer != null)
      {
        clearTimeout(timer);
      }
      timer = setTimeout(tr, 5000);
    });
  };

  this.app = app;
}(d3));
