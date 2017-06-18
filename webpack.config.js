const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  // context: __dirname + '/src',
  entry:  ['./src/server.js'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,
  watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.(jsx?)$/,
  //       use: [
  //         'babel-loader'
  //       ],
  //       exclude: /node_modules/,
  //     }
  //   ]
  // },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"]
  }
};
