const fs = require('fs');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const dotEnvPath = fs.existsSync('./.env.development') ? './.env.development' : './.env.development.example';

require('dotenv').config({
  path: dotEnvPath,
});

const {
  HOST: host,
  PORT: port,
  __API__
} = process.env;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    open: false,
    host,
    port
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: dotEnvPath
    }),
    new webpack.DefinePlugin({
      __API__: JSON.stringify(__API__)
    })
  ],
});
