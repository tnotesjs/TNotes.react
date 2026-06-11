# [0013. 初始 JSX](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0013.%20%E5%88%9D%E5%A7%8B%20JSX)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. JSX 是什么？](#3-jsx-是什么)
- [4. JSX 如何描述模板？（语法层面）](#4-jsx-如何描述模板语法层面)
  - [4.1. 声明式](#41-声明式)
  - [4.2. 嵌入表达式](#42-嵌入表达式)
  - [4.3. 属性及事件](#43-属性及事件)
  - [4.4. 必须单根](#44-必须单根)
  - [4.5. 必须要有结束标记](#45-必须要有结束标记)
  - [4.6. 注释](#46-注释)
- [5. 示例：一个简单的 React 组件](#5-示例一个简单的-react-组件)
- [6. 为什么 JSX 必须单根？](#6-为什么-jsx-必须单根)
  - [6.1. 官方回答：为什么多个 JSX 标签需要被一个父元素包裹？](#61-官方回答为什么多个-jsx-标签需要被一个父元素包裹)
  - [6.2. 解释](#62-解释)
- [7. 引用](#7-引用)

<!-- endregion:toc -->

## 1. 本节内容

- JSX
- 单根
- `React.createElement`

## 2. 评价

这篇笔记简单介绍了 JSX 的一些基础知识点，先对 JSX 是什么有个初步认识即可，有关 JSX 的更多细节，会在其他笔记中介绍。

## 3. JSX 是什么？

JSX 是 JavaScript XML 的缩写，它是 React 中用于描述用户界面的一种语法扩展。

JSX 是由 Facebook 起草的 JS 扩展语法，是一种将 HTML 和 JavaScript 混合使用的扩展语法。

虽然 JSX 看起来很像 HTML，但实际上它是 JavaScript 的一部分，并且最终会被编译成纯 JavaScript 代码。

JSX 允许开发者在 JavaScript 代码中直接编写类似 HTML 的结构，这样可以更直观地将 UI 与逻辑结合起来。

JSX 的本质：从数据类型层面来看，JSX 本质上是一个 JS 对象。

JSX 会被 babel 编译，最终会被转换为 `React.createElement` 函数调用，是一个 React Element 对象。

## 4. JSX 如何描述模板？（语法层面）

### 4.1. 声明式

JSX 是声明式的，这意味着你可以描述你的应用应该显示什么，而不是如何进行 DOM 操作来改变应用的状态。

这使得代码更容易理解和维护。

我们学习 JSX 更多学习的也就是 JSX 的声明式语法，如何使用 JSX 来描述 UI。

### 4.2. 嵌入表达式

你可以在 JSX 中使用大括号 `{}` 来嵌入任何有效的 JavaScript 表达式。

例如，变量、函数调用或计算结果都可以被嵌入到 JSX 中。

### 4.3. 属性及事件

JSX 属性和 HTML 属性非常相似，但有一些不同之处。`class` 在 HTML 中对应 `className` 在 JSX 中，因为 `class` 是 JavaScript 的保留字。

JSX 中的事件处理函数是以驼峰命名法（camelCase）来写的，比如点击事件函数是 `onClick` 而不是 `onclick`，这些事件处理函数接收一个事件对象作为参数。

### 4.4. 必须单根

每个 JSX 表达式，有且仅有一个根节点。

如果有多个根，可以使用 `<React.Fragment></React.Fragment>` 来包裹这些根节点。

`<React.Fragment></React.Fragment>` 可以简写为 `<></>`。

### 4.5. 必须要有结束标记

每个 JSX 元素必须有结束标记（这是 XML 规范）。

对于没有内容的元素，如 `<img>` 或 `<input>`，JSX 支持自闭合标签，比如 `<img src={imageSrc} />`。

### 4.6. 注释

在 JSX 中添加注释需要使用花括号 `{/* ... */}`。

## 5. 示例：一个简单的 React 组件

1. JSX 式写法
2. `React.createElement` 式写法

::: code-group

```jsx [1]
import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Welcome name="Tdahuyou" />
  </StrictMode>,
)
```

```jsx [2]
import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'

function Welcome(props) {
  return createElement('h1', null, 'Hello, ', props.name)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>{createElement(Welcome, { name: 'Tdahuyou' })}</StrictMode>,
)
```

:::

最终的渲染结果：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-09-42-59.png)

生成的真实 DOM 结构：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-09-43-10.png)

在这个例子中，`<Welcome name="Tdahuyou" />` 是一个 JSX 表达式，它表示一个 `Welcome` 组件的实例，传递了 `name` 属性。这个组件内部返回了一个包含动态内容的 `<h1>` 标签。

实际上，你在项目中使用的 JSX 是 `React.createElement` 的语法糖，最终会通过 Babel 这样的工具将 JSX 代码转换为纯粹的 JavaScript 代码。Babel 会把 JSX 代码转换成 `React.createElement` 函数调用，这是 React 用来创建虚拟 DOM 节点的方法。

通过这个简单的 demo，我们不难得出以下结论：

- 其实 JSX 并不是开发 React 项目所必需的，你如果更喜欢使用 `React.createElement(Welcome, {name: "Tdahuyou"})` 这种写法而非 `<Welcome name="Tdahuyou" />` 这种写法的话，那么完全可以舍弃 JSX。
- 尽管 JSX 不是必需的，但它极大地提高了开发效率和代码的可读性，因此在 React 社区中得到了广泛的应用。
- 在日常开发中应该很少会有人更倾向于 `React.createElement` 这种写法，相较而言 JSX 显然更加直观，因此我们更多使用的是 JSX 这种写法来描述页面。
- 不过也不要认为 `React.createElement` 这种写法就毫无意义，如果你编写的脚本不会通过 Babel 这样的工具进行编译处理，直接拿来运行的话，那就得使用 `React.createElement` 这种写法了。

## 6. 为什么 JSX 必须单根？

### 6.1. 官方回答：为什么多个 JSX 标签需要被一个父元素包裹？

JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 [Fragment][3] 来包裹。

### 6.2. 解释

首先需要知道：JSX 表达式最终会转换成 => 等效的 `React.createElement` 函数调用。

调用 `React.createElement` 必须有一个根，如果有多个根，根本就没法调用 `React.createElement` 函数。

```js
import { createElement } from 'react'

// createElement 允许你创建一个 React 元素。
// const element = createElement(type, props, ...children)

function Greeting({ name }) {
  return createElement(
    'h1', // 这里传入的是元素的类型
    { className: 'greeting' },
    '你好',
    createElement('i', null, name),
    '。欢迎！',
  )
}
```

JSX 表达式会被 babel 编译，转为等效的 `React.createElement` 写法。如果 JSX 有多个根节点，那显然是没法转的，因为 `React.createElement` 这个 API 创建的是一棵树，在创建这棵树的时候传入的第一个参数 type 表示的是根节点的类型。

## 7. 引用

- [React 官方文档 - 教程 - 描述 UI - 使用 JSX 书写标签语言][1]
- [React 官方文档 - 参考 - 过时的 React API - createElement][2]
- [React 官方文档 - 参考 - 组件 - Fragment][3]

[1]: https://zh-hans.react.dev/learn/writing-markup-with-jsx
[2]: https://zh-hans.react.dev/reference/react/createElement
[3]: https://zh-hans.react.dev/reference/react/Fragment
