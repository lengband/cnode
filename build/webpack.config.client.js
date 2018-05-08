const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: `${isDev ? "development" : "production"}`,
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/' // 静态资源路径：e.g: 在 index.html 中如果 publicPath 的路径是 '/public', 那么在 index.html 的 script src 路径就变为 public/app.hash.js
  },
  module: {
    rules: [
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
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
}

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 局域网内允许其他伙伴连你的 IP 帮你调试，开发时推荐, 同时自己也可以通过 IP 访问
    port: '8888',
    contentBase: path.join(__dirname, '../dist'), // 配置开发服务运行时的文件根目录
    hot: true,
    overlay: { // 编译出错网页黑层弹窗
      error: true // error 时出现
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config