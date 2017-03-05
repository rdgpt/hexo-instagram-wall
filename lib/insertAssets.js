'use strict';

const cheerio = require('cheerio');
const chalk = require('chalk');

module.exports = function (str, data, config, logger) {
  let wallPosition = data.text && data.text.search(/instagramWall\(.*\)/);
  if (wallPosition >= 0) {
    let $ = cheerio.load(str);
    let walls = $('.js-instagram-wall');

    walls.each(function (i, el) {
      let $wall = $(this);
      let namespace = $wall.attr('data-instagramwall');
      let currentConfig = config.instagramWall[namespace];

      // if we should use only custom styling,
      // short-circuit out of this filter now
      if (currentConfig.displayStyle === 'custom') {
        return false;
      }

      if (config.instagramWall.waterfall) {
        // TODO: Finish masonry / pinterest style wall options
        // $('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/4.1.1/imagesloaded.pkgd.min.js"></script>').insertAfter('.js-instagram-wall');
        // $('<script src="https://cdnjs.cloudflare.com/ajax/libs/waterfall.js/1.1.0/waterfall.min.js"></script>').insertAfter('.js-instagram-wall');
        // $('<script>(function() { setTimeout(function() { return imagesLoaded(\'.instagram-wall__media\', function() { waterfall(\'.js-instagram-wall\'); }); }, 500); })();</script>').insertAfter('.js-instagram-wall');
        // $('<script>window.addEventListener(\'resize\', function() { return waterfall(\'.js-instagram-wall\'); });</script>').insertAfter('.js-instagram-wall');
      }

      $wall.css('box-sizing', 'border-box');
      $('.instagram-wall *').css('box-sizing', 'border-box');

      if (currentConfig.displayStyle === 'flex') {
        // calculate width of one item
        // based on the number per row
        let itemWidth = (100 / currentConfig.itemsPerRow) + '%';

        $wall.css('display', 'flex');
        $wall.css('flex-direction', 'row');
        $wall.css('flex-wrap', 'wrap');
        $wall.css('justify-content', 'center');
        $('.instagram-wall__link', $wall).css('padding', currentConfig.gutterSize);
        $('.instagram-wall__link', $wall).css('width', itemWidth);
        $('.instagram-wall__link', $wall).css('margin', '0');
      }
      else if (currentConfig.displayStyle === 'column') {
        $wall.css('column-count', currentConfig.itemsPerRow);
        $wall.css('column-gap', currentConfig.gutterSize);
        $('.instagram-wall__link', $wall).css('margin-bottom', currentConfig.gutterSize);
      }
      else {
        $wall.css('display', 'block');
      }

      $('.instagram-wall__link', $wall).css('display', 'block');
      $('.instagram-wall__brick', $wall).css('margin', '0');
      $('.instagram-wall__media', $wall).css('display', 'block');
      $('.instagram-wall__media', $wall).css('width', '100%');
      $('.instagram-wall__media', $wall).css('height', 'auto');

      if (currentConfig.showCaption) {
        $('.instagram-wall__brick', $wall).css('position', 'relative');
        $('.instagram-wall__caption', $wall).css('position', 'absolute');
        $('.instagram-wall__caption', $wall).css('bottom', '0');
        $('.instagram-wall__caption', $wall).css('left', '0');
        $('.instagram-wall__caption', $wall).css('right', '0');
        $('.instagram-wall__caption', $wall).css('width', '100%');
        $('.instagram-wall__caption', $wall).css('padding', '10px 15px');
        $('.instagram-wall__caption', $wall).css('background-color', currentConfig.overlayColor);
        $('.instagram-wall__caption', $wall).css('color', currentConfig.textColor);
      }

    }); // end each

    str = $.html();
  }

  return str;
};
