const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/', // 静态资源路径：e.g: 在 index.html 中如果 publicPath 的路径是 '/public', 那么在 index.html 的 script src 路径就变为 public/app.hash.js
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 先检查 eslint
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}