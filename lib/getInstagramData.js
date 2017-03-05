'use strict';

const fs = require('hexo-fs');
const request = require('superagent');
const prettyHrtime = require('pretty-hrtime');
const chalk = require('chalk');

module.exports = function(config, logger) {
  let user = {};
  let media = [];
  let timestamp = Date.now();

  // create cache directory
  if (!fs.existsSync('cache')) {
    fs.mkdirsSync('cache');
  }

  // try to use cached data first
  if (fs.existsSync('cache/instagram.media.json')) {
    media = fs.readFileSync('cache/instagram.media.json');
    media = JSON.parse(media);

    // if  cached data is newer than 24 hours old,
    // use it. otherwise get new data.
    if (timestamp - media.date < 1000 * 60 * 60 * 24) {
      logger.info('hexo-instagram-wall:', chalk.cyan('Using cached data from Instagram.'));
      return media.data;
    }
    else {
      logger.info('hexo-instagram-wall:', chalk.cyan('Your cached Instagram data is too old. It\'s time to get new data!'));
    }
  }

  const access_token = process.env.INSTAGRAM_WALL_TOKEN || config.access_token;
  if (!access_token) {
    return logger.error('hexo-instagram-wall:', chalk.red('Access token not set! New data from Instagram cannot be fetched now.'));
  }

  logger.info('hexo-instagram-wall:', chalk.cyan('Getting fresh data from Instagram ...'));

  const startTime = process.hrtime();

  function handleError(message, info) {
    logger.error('hexo-instagram-wall:', chalk.red(message));
    if (info) {
      logger.debug(info);
    }
    return false;
  }

  request
    .get(`https://api.instagram.com/v1/users/self?access_token=${access_token}`)
    .end(function(err, res) {
      if (err) return handleError(err.message + ': ' + err.response.body.meta.error_message);
      if (!res.ok) return handleError('Instagram responded correctly, but there was an error.', res.body);

      user = {
        data: res.body.data,
        date: timestamp,
      };

      fs.writeFileSync('cache/instagram.user.json', JSON.stringify(user));

      request
        .get(`https://api.instagram.com/v1/users/${user.data.id}/media/recent/?access_token=${access_token}`)
        .end(function(err, res) {
          if (err) return handleError(err.message + ': ' + err.response.body.meta.error_message);
          if (!res.ok) return handleError('Instagram responded correctly, but there was an error.', res.body);

          media = {
            data: res.body.data,
            date: timestamp,
          };

          fs.writeFileSync('cache/instagram.media.json', JSON.stringify(media));

          const interval = prettyHrtime(process.hrtime(startTime));

          logger.info('hexo-instagram-wall:', chalk.cyan('Fresh data has been fetched and saved from Instagram in ' + interval));

          return media.data;
        });
    });
};
