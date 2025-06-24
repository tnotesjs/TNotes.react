# [0043. ReactDOM.render](https://github.com/Tdahuyou/TNotes.react/tree/main/notes/0043.%20ReactDOM.render)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. ⚠️ 兼容性问题 - 从 v18 开始，不再支持 ReactDOM.render 这个 API](#2-️-兼容性问题---从-v18-开始不再支持-reactdomrender-这个-api)
- [3. ⚙️ `ReactDOM.render`](#3-️-reactdomrender)
- [4. 💻 demos.1 - `ReactDOM.render` 的基本使用示例](#4--demos1---reactdomrender-的基本使用示例)
- [5. ⚙️ `ReactDOM.createRoot`](#5-️-reactdomcreateroot)
- [6. 💻 demos.2 - `ReactDOM.createRoot` 的基本使用示例](#6--demos2---reactdomcreateroot-的基本使用示例)
- [7. 🤔 为什么弃用 `ReactDOM.render`？](#7--为什么弃用-reactdomrender)

<!-- endregion:toc -->

## 1. 📝 概述

- **`ReactDOM.render` 是 React 17 及之前版本的核心 API**，用于将 React 元素渲染到 DOM 中。
- **在 React 18 中，它被废弃，推荐使用 `ReactDOM.createRoot`**，以支持更现代化的并发渲染特性。
- 如果你正在使用 React 18 或更高版本，请迁移到新的 API，以利用 React 的性能优化和新特性。

## 2. ⚠️ 兼容性问题 - 从 v18 开始，不再支持 ReactDOM.render 这个 API

- 在 React 17 及以前的版本中，`ReactDOM.render` 是一个常用的 API，但随着 React 18 的推出，`ReactDOM.render` 被替代为 `ReactDOM.createRoot`，并逐渐被废弃。
- 🔍 查看官方文档对此的描述
  - https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
  - ![图 0](https://cdn.jsdelivr.net/gh/Tdahuyou/imgs@main/2025-06-24-13-19-16.png)

```js
// Before v18
import { render } from 'react-dom'
const container = document.getElementById('app')
render(<App tab="home" />, container)

// After v18
import { createRoot } from 'react-dom/client'
const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />)
```

## 3. ⚙️ `ReactDOM.render`

- `ReactDOM.render` 的基本语法

```javascript
ReactDOM.render(element, container[, callback])
```

- **`element`**：需要渲染的 React 元素，通常是由 `React.createElement` 创建的元素或 JSX。
- **`container`**：渲染的目标 DOM 容器。
- **`callback`** _(可选)_：渲染完成后执行的回调函数。

---

- `ReactDOM.render` 的作用：渲染 react 组件到指定的 DOM 容器中。

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return <h1>Hello, React!</h1>
}

ReactDOM.render(<App />, document.getElementById('root'))
// 将 App 组件渲染到 id 为 "root" 的 DOM 容器中。
```

## 4. 💻 demos.1 - `ReactDOM.render` 的基本使用示例

<<< ./demos/1/1.html {10-33}

- 最终渲染结果如下图所示：
  - ![图 1](https://cdn.jsdelivr.net/gh/Tdahuyou/imgs@main/2025-06-24-13-19-27.png)

## 5. ⚙️ `ReactDOM.createRoot`

- `ReactDOM.render` 的替代品：`ReactDOM.createRoot`
- 在 **React 18** 中，`ReactDOM.render` 被标记为过时，取而代之的是新的 **Concurrent Mode** 渲染 API：

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return <h1>Hello, React 18!</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

## 6. 💻 demos.2 - `ReactDOM.createRoot` 的基本使用示例

<<< ./demos/2/1.html {10-24}

- 最终渲染结果和 demos.1 是完全一样的。
  - ![图 1](https://cdn.jsdelivr.net/gh/Tdahuyou/imgs@main/2025-06-24-13-19-27.png)

## 7. 🤔 为什么弃用 `ReactDOM.render`？

- **支持并发渲染（Concurrent Rendering）**
  - React 18 引入了并发模式，提高了渲染性能和响应性。
  - `ReactDOM.render` 无法支持此模式。
- **改进的 API 设计**
  - `ReactDOM.createRoot` 更加灵活，未来可以更好地支持新特性。
- **提高渲染稳定性**
  - 新 API 提供了更强的控制能力，使 React 在渲染过程中可以处理更多复杂的场景。
