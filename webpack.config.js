const path = require('path');
require('@babel/register');

const config = {
  mode: 'development',
  entry: './public/js/main.js',
  // Output
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
  },
  // Loaders
  module: {
    rules: [
      // JavaScript/JSX Files
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  // Plugins
  plugins: [],
};
// Exports
module.exports = config;
