import React from 'react' // 虽然没有用到 React 也要写在这，因为有 jsx 语法，在 webpack 编译的时候回编译成为 React.render()
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
// ReactDOM.hydrate( < App / > , document.getElementById('root')) // jsx 语法, 所以在 webpack 中也要对 js 文件做 babel-loader 的转换
const root = document.getElementById('root')
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default // eslint-disable-line
    render(NextApp)
    // ReactDOM.hydrate( < NextApp / > , root) // jsx 语法, 所以在 webpack 中也要对 js 文件做 babel-loader 的转换
  })
}
