'use strict';

const assign = require('lodash.assign');
const getInstagramData = require('./lib/getInstagramData');
const instagramWall = require('./lib/instagramWall');
const insertAssets = require('./lib/insertAssets');
const config = hexo.config;
const logger = require('hexo-log')({
  debug: false,
  silent: false
});

// set default options
config.instagramWall = assign({}, {
  enable: true,
  waterfall: true,
  styles: {
    overlayColor: 'black',
    gutterSize: '10px'
  }
}, config.instagramWall)

hexo.extend.filter.register('after_init', function() {
  return getInstagramData(config, logger);
});

hexo.extend.helper.register('instagramWall', function(requestedCount, itemsPerRow, showCaption) {
  return instagramWall(requestedCount, itemsPerRow, showCaption, config, logger);
}, {async: true});

hexo.extend.filter.register('after_render:html', function(str, data) {
  return insertAssets(str, data, config, logger);
});
