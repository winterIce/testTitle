const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const config = require('./config');
const webpackBase = require('./base');


module.exports = webpackMerge.smartStrategy({
  'module.rules': 'append',
  'plugins': 'append'
})(webpackBase, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
    new CleanPlugin([config.path.dev], { root: path.resolve() })
  ]
});
