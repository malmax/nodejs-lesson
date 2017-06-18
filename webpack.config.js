const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

  // убираем все externals модули из сборки это уменьшит вес сборки, но
  // потребуетя ставить расширения на удаленном компе
  externals: [nodeExternals()],
  // говорим что будет исполняться только на сервере
  target: 'node',
  // настройки для серверной ноды
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  // папка src становится корневой и смотрим на все файлы оттуда
  context: path.resolve(__dirname, 'src'),
  // точки входа в наше приложение
  entry: {
    server: './server.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // source-map'ы для отладки в консоли
  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,
  // обновление без перезагрузки
  // watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],
  module: {
    rules: [
      // что делать при require .js и .jsx файлов
      {
        test: /\.(jsx?)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-2', 'react'],
            // plugins: [require('babel-plugin-transform-object-rest-spread')],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  // расширения файлов по-умолчанию
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
};
