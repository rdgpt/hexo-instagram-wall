'use strict';

const fs = require('hexo-fs');
const chalk = require('chalk');

module.exports = function(namespace, config, logger) {
  let media = [];
  let currentConfig = config.instagramWall[namespace];

  // try to use cache data first
  if (fs.existsSync('cache/instagram.media.json')) {
    media = fs.readFileSync('cache/instagram.media.json');
    media = JSON.parse(media);
    let slice = media.data.slice(0, currentConfig.requestedCount);
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

      wall.push('<article class="js-instagram-wall instagram-wall" data-instagramWall="' + namespace + '">');

      media.forEach(function(m) {
        // TODO: Implement random size options
        // let imageSize = Math.floor(Math.random() * (imageSizes.length - 1));
        let imageObject = m.images.low_resolution;

        wall.push('<a href="' + m.link + '" target="_blank" rel="noopener" class="instagram-wall__link">');
        wall.push('<figure class="instagram-wall__brick low_resolution">');
        wall.push('<img class="instagram-wall__media" src="' + imageObject.url + '" width="' + imageObject.width + '" height="' + imageObject.height + '">');

        if (currentConfig.showCaption) {
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
