const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const config = require('./config');


const webpackConfig = {
  context: config.path.src,
  entry: {
    live: [config.path.src + '/live/index.js'],
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'prop-types', 'qrcode.react', 'react-transition-group']
  },
  output: {
    path: config.path.pub,
    filename: '[name].min.js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=js',
        exclude: /node_modules/,
        include: config.path.src
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'cache-loader',
            options: {
              cacheDirectory: config.path.cache
            }
          }, {
            loader: 'css-loader',
            options: {
              autoprefixer: true
            }
          }, {
            loader: 'postcss-loader'
          }]
        }),
        include: config.path.src
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'cache-loader',
            options: {
              cacheDirectory: config.path.cache
            }
          }, {
            loader: 'css-loader',
            options: {
              autoprefixer: true
            }
          }, {
            loader: 'postcss-loader'
          }, {
            loader: 'less-loader'
          }]
        }),
        include: config.path.src
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [{
          loader: 'url-loader',
          options: {
            publicPath: config.path.prefix,
            limit: 1000,
            name: 'img/[path][name].[ext]'
          }
        }],
        include: config.path.src
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      react: path.join(config.path.node_modules, 'react/'),
      'react-dom': path.join(config.path.node_modules, 'react-dom/'),
      'react-redux': path.join(config.path.node_modules, 'react-redux/'),
      redux: path.join(config.path.node_modules, 'redux/'),
      'lodash.merge': path.join(config.path.node_modules, 'lodash.merge/'),
      'qrcode.react': path.join(config.path.node_modules, 'qrcode.react'),
      'react-transition-group': path.join(config.path.node_modules, 'react-transition-group')
    }
  },
  performance: {
    assetFilter: assetFilename => {
      return assetFilename.endsWith('.js') || assetFilename.endsWith('.js');
    }
  },
  devtool: false,
  externals: [

  ],
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(config.env.current)
      }
    }),
    new HappyPack({
      id: 'js',
      verbose: false,
      loaders: [{
        path: 'babel-loader',
        options: {
          cacheDirectory: config.path.cache
        }
      }]
    }),
    new HappyPack({
      id: 'jsx',
      verbose: false,
      loaders: [{
        path: 'babel-loader',
        options: {
          plugins: [
            ['transform-react-jsx', { pragma: 'h' }]
          ],
          cacheDirectory: config.path.cache
        }
      }]
    }),
    new ExtractTextPlugin({
      filename: getPath => getPath('css/[name].css').replace('css/js', 'css'),
      allChunks: true,
      disable: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([{
      from: path.join(config.path.node_modules, 'babel-polyfill/dist/polyfill.min.js'),
      to: path.join(config.path.pub, '[name].[ext]')
    }])
  ]
};


module.exports = webpackConfig;
