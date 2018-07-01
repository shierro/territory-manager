import development from './development.json';
import production from './production.json';
import test from './test.json';

const env = process.env.NODE_ENV || 'production';

const configs = {
  development,
  production,
  test,
};

export default configs[env];
