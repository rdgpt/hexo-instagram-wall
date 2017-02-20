'use strict';

const fs = require('hexo-fs');
const chalk = require('chalk');

module.exports = function(requestedCount, itemsPerRow, showCaption, config, logger) {
  requestedCount = parseInt(requestedCount);
  itemsPerRow = parseInt(itemsPerRow);
  showCaption = !!showCaption;

  let count = (!requestedCount || isNaN(requestedCount) || requestedCount > 20 || requestedCount < 0) ? 20 : requestedCount;
  let rowCount = (!itemsPerRow || isNaN(itemsPerRow) || itemsPerRow <= 0) ? 3 : itemsPerRow;
  let media = [];

  // try to use cache data first
  if (fs.existsSync('cache/instagram.media.json')) {
    media = fs.readFileSync('cache/instagram.media.json');
    media = JSON.parse(media);
    let slice = media.data.slice(0, count);
    return render(slice);
  }
  else {
    logger.info('hexo-instagram-wall:', chalk.cyan('Instagram cache not found, cannot render instagram media.'));
    return render();
  }

  function render(media) {
    let wall = [];

    if (media && Array.isArray(media)) {
      // set item width
      let itemWidth = 100  / rowCount;

      // TODO: Implement random size options
      // const imageSizes = Object.keys(media[0].images);

      wall.push('<article class="js-instagram-wall instagram-wall">');

      media.forEach(function(m) {
        // let imageSize = Math.floor(Math.random() * (imageSizes.length - 1));
        let imageObject = m.images.low_resolution;

        wall.push('<a href="' + m.link + '" target="_blank" rel="noopener" class="instagram-wall__link" style="width:' + itemWidth + '%">');
        wall.push('<figure class="instagram-wall__brick low_resolution">');
        wall.push('<img class="instagram-wall__media" src="' + imageObject.url + '" width="' + imageObject.width + '" height="' + imageObject.height + '">');

        if (showCaption) {
          wall.push('<figcaption class="instagram-wall__caption">');
          wall.push('<p>' + m.caption.text + '</p>');
          wall.push('</figcaption>');
        }

        wall.push('</figure>');
        wall.push('</a>');
      });

      wall.push('</article>');
    }

    return wall.join('');
  }
};
