const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const app = express()

const isDev = process.env.NODE_ENV === 'development'


if (!isDev) {
  const serverEntry = require('../dist/server-entry').default //* 因为在 server-entry 里面是采用 es6 的语法 export default 的形式，所以在 conmmonJS 里面引入会引入整个对象，所以还要加 default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist'))) // 希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，现在，你可以通过带有 “/public” 前缀的地址来访问 dist 目录下面的文件了。
  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry) //* 拿到入口文件并通过 reactSSR 转换成字符串
    res.send(template.replace('<app><app>', appString))
  })
} else {
  const devStatic = require('./util/dev.static')
  devStatic(app)
}

app.listen(3333, () => {
  console.log('server is port 3333')
})