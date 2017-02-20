'use strict';

const cheerio = require('cheerio');
const chalk = require('chalk');

module.exports = function(str, data, config, logger) {
  let wallPosition = data.text && data.text.search(/instagramWall\(.*\)/);
  if (wallPosition >= 0) {
    let $ = cheerio.load(str);
    if (config.instagramWall.waterfall) {
      // TODO: Finish masonry / pinterest style wall options
      // $('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/4.1.1/imagesloaded.pkgd.min.js"></script>').insertAfter('.js-instagram-wall');
      // $('<script src="https://cdnjs.cloudflare.com/ajax/libs/waterfall.js/1.1.0/waterfall.min.js"></script>').insertAfter('.js-instagram-wall');
      // $('<script>(function() { setTimeout(function() { return imagesLoaded(\'.instagram-wall__media\', function() { waterfall(\'.js-instagram-wall\'); }); }, 500); })();</script>').insertAfter('.js-instagram-wall');
      // $('<script>window.addEventListener(\'resize\', function() { return waterfall(\'.js-instagram-wall\'); });</script>').insertAfter('.js-instagram-wall');
    }

    $('.instagram-wall').css('display', 'flex');
    $('.instagram-wall').css('flex-direction', 'row');
    $('.instagram-wall').css('flex-wrap', 'wrap');
    $('.instagram-wall').css('justify-content', 'center');
    $('.instagram-wall__link').css('display', 'block');
    $('.instagram-wall__link').css('padding', config.instagramWall.styles.gutterSize);
    $('.instagram-wall__link').css('margin', '0');
    $('.instagram-wall__brick').css('margin', '0');
    $('.instagram-wall__brick').css('position', 'relative');
    $('.instagram-wall__media').css('display', 'block');
    $('.instagram-wall__media').css('width', '100%');
    $('.instagram-wall__media').css('height', 'auto');
    $('.instagram-wall__caption').css('position', 'absolute');
    $('.instagram-wall__caption').css('bottom', '0');
    $('.instagram-wall__caption').css('left', '0');
    $('.instagram-wall__caption').css('right', '0');
    $('.instagram-wall__caption').css('width', '100%');
    $('.instagram-wall__caption').css('padding', '10px');
    $('.instagram-wall__caption').css('background-color', config.instagramWall.styles.overlayColor);
    str = $.html();
  }

  return str;
};
