var path = require('path')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.join(__dirname, 'src/antman.js'),
  target: 'node',
  externals: nodeExternals(),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'antman.js',
  },
  module: {
    rules: [{test: /\.js$/, use: 'babel-loader'}]
  },
}
