const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server.js', // Change if your entry file is index.js
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
