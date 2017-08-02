import path from 'path';
import webpack from 'webpack';

module.exports = {
  devtool: false,

  entry: './src/index.js',

  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    library: 'tmi-validation',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
