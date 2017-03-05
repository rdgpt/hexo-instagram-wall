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
  enable: false,
  waterfall: true,
  itemsPerRow: 3,
  requestedCount: 18,
  showCaption: true,
  overlayColor: 'black',
  gutterSize: '10px',
  displayStyle: 'flex',
  textColor: 'white',
}, config.instagramWall);

hexo.extend.filter.register('after_init', function() {
  if (!config.instagramWall.enable) {
    return false;
  }

  return getInstagramData(config, logger);
});

hexo.extend.helper.register('instagramWall', function(requestedCount, itemsPerRow, showCaption, overlayColor, textColor, displayStyle, gutterSize) {
  if (!config.instagramWall.enable) {
    return '';
  }

  requestedCount = parseInt(requestedCount);
  itemsPerRow = parseInt(itemsPerRow);
  showCaption = !!showCaption;

  requestedCount = (!requestedCount || isNaN(requestedCount) || requestedCount > 20 || requestedCount < 0) ? config.instagramWall.requestedCount : requestedCount;
  itemsPerRow = (!itemsPerRow || isNaN(itemsPerRow) || itemsPerRow <= 0) ? config.instagramWall.itemsPerRow : itemsPerRow;

  // make a namespace for this instance
  let namespace = requestedCount + itemsPerRow + showCaption + overlayColor + displayStyle + gutterSize;
  config.instagramWall[namespace] = {};

  // let this instance override
  // the default style settings
  config.instagramWall[namespace].requestedCount = requestedCount;
  config.instagramWall[namespace].itemsPerRow = itemsPerRow;
  config.instagramWall[namespace].showCaption = showCaption;
  config.instagramWall[namespace].overlayColor = (overlayColor) ? overlayColor : config.instagramWall.overlayColor;
  config.instagramWall[namespace].textColor = (textColor) ? textColor : config.instagramWall.textColor;
  config.instagramWall[namespace].displayStyle = (displayStyle) ? displayStyle : config.instagramWall.displayStyle;
  config.instagramWall[namespace].gutterSize = (gutterSize) ? gutterSize : config.instagramWall.gutterSize;

  return instagramWall(namespace, config, logger);
}, {async: true});

hexo.extend.filter.register('after_render:html', function(str, data) {
  if (!config.instagramWall.enable) {
    return false;
  }

  return insertAssets(str, data, config, logger);
});
