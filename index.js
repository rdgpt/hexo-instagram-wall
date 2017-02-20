'use strict';

const getInstagramData = require('./lib/getInstagramData');
const instagramWall = require('./lib/instagramWall');
const config = hexo.config;
const logger = require('hexo-log')({
  debug: false,
  silent: false
});

hexo.extend.filter.register('after_init', function() {
  return getInstagramData(config, logger);
});

hexo.extend.helper.register('instagramWall', function(count) {
  return instagramWall(count, logger);
}, {async: true});