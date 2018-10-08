const os = require('os');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./config');
const webpackBase = require('./base');


module.exports = webpackMerge.smartStrategy({
  'module.rules': 'append',
  'plugins': 'append'
})(webpackBase, {
  plugins: [
    new CleanPlugin([config.path.pub], { root: path.resolve() }),
    new UglifyJSPlugin({
      parallel: {
        cache: true,
        workers: os.cpus().length
      },
      warnings: true
    })
  ]
});
