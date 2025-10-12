// 这是 React 的核心库 react，与宿主环境无关。
import React from 'https://esm.sh/react@19/?dev'
// 这是 React 依赖核心库 react-dom，将 react 库的核心功能与网页环境结合起来。
import ReactDOM from 'https://esm.sh/react-dom@19/client?dev'

// 创建一个 H1 元素
const h1 = React.createElement('h1', {}, 'Hello World')

// 将 H1 元素渲染到 root 容器中
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(h1)

// ❌ 不再兼容的早期写法 - 使用 ReactDOM.render() 方法 // [!code error]
// ReactDOM.render(h1, document.getElementById("root")); // [!code error]
// 在目前（2025年1月10日11:14:49）的最新版 react v19 中，render API 已被移除。 // [!code error]
// 实际上在 v18 中就已经不再支持了。 // [!code error]
// 在查阅 react 的相关教程时，需要注意 react 的版本，在 v18 版本（含）之后，不要再去用这种旧版的错误写法了。 // [!code error]
