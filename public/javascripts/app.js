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
    var ul = article.append('ul');
    var jaHolder = ul.append('li');
    var enHolder = ul.append('li');
    var btnHolder = ul.append('li');
    var popupLayer = article.append('div')
      .attr('class', 'popuplayer');
    app.popup = function(_)
    {
      var type = 'success';
      if (arguments.length > 1) {
        type = arguments[1];
      }
      var duration = 5000;
      if (arguments.length > 2) {
        duration = +arguments[2];
      }
      popupLayer.append('div')
        .text(_)
        .attr('class', type + ' popup')
        .transition().delay(duration).remove();
    };
    var ja = jaHolder.append('textarea');
    var cog = enHolder.append('div')
        .attr('class', 'cogholder')
        .style('visibility', 'hidden');
    cog.append('i')
        .attr('class', 'fa fa-cog fa-spin cog');

    var en = enHolder.append('textarea');
    var btn = btnHolder.append('a')
      .attr('class', 'tweetbtn')
      .attr('href', '#')
      .on('click', function() {
        d3.event.preventDefault();
        d3.json('/api/tweet')
          .header('Content-Type', 'application/json')
          .post(JSON.stringify({
            ja: ja.property('value'),
            en: en.property('value')
          }), function(e, d) {
            if (e != null) {
              app.popup('tweet failed', 'error');
              return;
            }
            app.popup('tweet success');
          });
      });
    btn.append('i')
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
