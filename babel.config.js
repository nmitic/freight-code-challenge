const fs = require('fs');

const dotEnvPath = fs.existsSync('./.env.development') ? './.env.development' : './.env.development.example';

require('dotenv').config({
  path: dotEnvPath,
});

const { BABEL_ENV } = process.env;

module.exports = function (api) {
    api.cache(true);

    const presets = [
        "@babel/preset-env",
        "@babel/preset-react"
      ];
    const plugins = [
        "@babel/plugin-syntax-dynamic-import",
        "babel-plugin-smart-webpack-import",
        "react-hot-loader/babel"
      ];
  
    return {
      presets,
      plugins
    };
  }