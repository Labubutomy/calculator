const webpack = require('webpack');

module.exports = function override(config, env) {
  // Добавляем fallback для Node.js модулей
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "process": require.resolve("process/browser.js"), // ✅ Добавляем .js расширение
    "buffer": require.resolve("buffer/"),
    "crypto": false,
    "stream": false,
    "fs": false,
    "path": false,
    "os": false
  };

  // Добавляем плагины для глобальных переменных
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // ✅ Указываем полный путь
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ];

  // Добавляем алиасы для правильного разрешения
  config.resolve.alias = {
    ...config.resolve.alias,
    'process/browser': require.resolve('process/browser.js')
  };

  return config;
};