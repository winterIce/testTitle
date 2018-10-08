const path = require('path');

const DEV = 'development';
const TEST = 'test';
const PROD = 'production';

const NODE_ENV = process.env.NODE_ENV || DEV;

const DIR_BASENAME = path.dirname(__dirname);
const DIR_PREFIX_PUB = 'static/spa';


module.exports = {
  env: {
    current: NODE_ENV,
    isDev: NODE_ENV === DEV,
    isTest: NODE_ENV === TEST,
    isProd: NODE_ENV === PROD
  },
  path: {
    src: path.resolve(DIR_BASENAME, 'src'),
    node_modules: path.resolve(DIR_BASENAME, 'node_modules'),
    dev: path.resolve(DIR_BASENAME, DIR_PREFIX_PUB),
    pub: path.resolve(DIR_BASENAME, DIR_PREFIX_PUB),
    cache: path.resolve(DIR_BASENAME, '.cache'),
    prefix: `/${DIR_PREFIX_PUB}/`
  }
};
