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
    var cog = article.append('i')
      .attr('class', 'fa fa-cog fa-spin')
      .style('visibility', 'hidden');

    var en = article.append('textarea');
    var ja = article.append('textarea');
    var timer = null;
    var tr = function()
    {
      d3.json('/api/translate?text='+input.property('value'),
              function(e, d)
              {
                if (e != null)
                {
                  return;
                }
                en.text(d.en);
                ja.text(d.ja);
                timer = null;
                cog.style('visibility', 'hidden');
              });
    };
    input.on('keyup', function()
    {
      if (timer != null)
      {
        clearTimeout(timer);
      }
      cog.style('visibility', 'visible');
      timer = setTimeout(tr, 5000);
    });
  };

  this.app = app;
}(d3));
