const nodeExternals = require('webpack-node-externals')
const path = require('path')

const rules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
}

// webpack.config.js
const serverConfig = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    'index.js': path.resolve(__dirname, 'src/index.js'),
  },
  module: {
    rules: [rules],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
  },
}

// webpack.config.js
const clientConfig = {
  mode: 'development',
  target: 'web',
  entry: {
    'home.js': path.resolve(__dirname, 'src/public/home.js'),
  },
  module: {
    rules: [rules],
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name]',
  },
}

// webpack.config.js
module.exports = [serverConfig, clientConfig]
