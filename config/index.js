const development = require('./development.json');
const production = require('./production.json');
const test = require('./test.json');

const env = process.env.NODE_ENV || 'production';

const configs = {
  development,
  production,
  test,
};

module.exports = configs[env];
