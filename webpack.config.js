var path = require('path');

module.exports = {
  devtool: "cheap-eval-source-map",

  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    noParse:
    rules: [
      {
        test: /\.(jsx?)$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/,
        query: {
                presets: ["es2015", "react"]
        }
      }
    ]
  }
};
