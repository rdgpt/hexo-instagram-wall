'use strict';

const fs = require('hexo-fs');
const chalk = require('chalk');

module.exports = function(requestedCount, logger) {
  requestedCount = parseInt(requestedCount);
  let count = (!requestedCount || requestedCount > 20 || requestedCount < 0) ? 20 : requestedCount;
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
      // TODO: Implement random size options
      // const imageSizes = Object.keys(media[0].images);

      wall.push('<article class="instagram-wall">');

      media.forEach(function(m) {
        // let imageSize = Math.floor(Math.random() * (imageSizes.length - 1));
        let imageObject = m.images.standard_resolution;

        wall.push('<figure class="instagram-wall__brick standard_resolution">');
        wall.push('<img class="instagram-wall__media" src="' + imageObject.url + '" width="' + imageObject.width + '" height="' + imageObject.height + '">');
        wall.push('<figcaption class="instagram-wall__caption">');
        wall.push('<p>' + m.caption.text + '</p>');
        wall.push('</figcaption>');
        wall.push('</figure>');
      });

      wall.push('</article>');
    }

    return wall.join('');
  }
};
