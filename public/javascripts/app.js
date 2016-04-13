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
    var article = root.select('article');
    if (article.size() === 0)
    {
      article = root.append('article');
    }
    var ja = article.append('textarea');
    var cog = article.append('i')
      .attr('class', 'fa fa-cog fa-spin')
      .style('visibility', 'hidden');

    var en = article.append('textarea');
    var tweet = article.append('a');
    tweet.attr('href', '#')
      .on('click', function() {
        d3.event.preventDefault();
        d3.json('/api/tweet')
          .header('Content-Type', 'application/json')
          .post(JSON.stringify({
            ja: ja.property('value'),
            en: en.property('value')
          }), function(e, d) {
            if (e != null) {
              return;
            }
          });
      });
    tweet.append('i')
      .attr('class', 'fa fa-twitter')
      .attr('aria-hidden', true);
    var timer = null;
    var tr = function() {
      d3.json('/api/translate?text='+ja.property('value'),
              function(e, d) {
                if (e != null) {
                  return;
                }
                en.property('value', d.en);
                ja.property('value', d.ja);
                timer = null;
                cog.style('visibility', 'hidden');
              });
    };
    ja.on('keyup', function() {
      if (timer != null) {
        clearTimeout(timer);
      }
      cog.style('visibility', 'visible');
      timer = setTimeout(tr, 5000);
    });
  };

  this.app = app;
}(d3));
