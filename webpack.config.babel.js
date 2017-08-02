import path from 'path';
import webpack from 'webpack';

module.exports = {
  devtool: false,

  entry: './src/index.js',

  output: {
    path: __dirname + '/dist',
    filename: 'index.min.js',
    library: 'TMIValidation',
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
