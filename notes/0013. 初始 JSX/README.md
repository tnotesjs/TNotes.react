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
- [6. 示例：JSX 必须单根](#6-示例jsx-必须单根)
  - [6.1. ❌ 错误写法](#61--错误写法)
  - [6.2. ✅ 解 1](#62--解-1)
  - [6.3. ✅ 解 2](#63--解-2)
  - [6.4. ✅ 解 3](#64--解-3)
  - [6.5. ✅ 解 4](#65--解-4)
- [7. 为什么 JSX 必须单根？](#7-为什么-jsx-必须单根)
  - [7.1. 官方回答：为什么多个 JSX 标签需要被一个父元素包裹？](#71-官方回答为什么多个-jsx-标签需要被一个父元素包裹)
  - [7.2. 解释](#72-解释)
- [8. 引用](#8-引用)

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

## 6. 示例：JSX 必须单根

JSX 必须只能有一个根节点，当遇到需要渲染多根的情况，可以使用 `Fragment` 将这些节点包裹起来，这也是官方推荐的最佳实践。

::: code-group

```jsx [❌ 错误写法]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ❌ 下面这种写法会报错 - JSX 必须得有一个根节点
const divContainer = (
    <div>div 1</div>
    <div>div 2</div>
    <div>div 3</div>
);

const root = createRoot(document.getElementById('root'))

root.render(<StrictMode>{divContainer}</StrictMode>)
```

```jsx {6,10} [✅ 解 1]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ✅ 解决办法1：在外层包裹一个 div 元素作为根节点。
const divContainer = (
  <div>
    <div>div 1</div>
    <div>div 2</div>
    <div>div 3</div>
  </div>
)
// 这种做法虽然在此 demo 中能够避免报错，并且能够正常渲染出 div 1、div 2、div 3，但是在实际的开发中，却未必能够顺利解决你的需求。
// 因为这种法子破坏了元素结构，在外层多套了一个实际的元素 div。
// 如果你既想成功渲染 3 个 div，又不想破坏元素结构，那么可以考虑使用 React.Fragment。

const root = createRoot(document.getElementById('root'))

root.render(<StrictMode>{divContainer}</StrictMode>)
```

```jsx {4-10,16-25} [✅ 解 2]
import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'

// const divContainer = (
//   <div>
//     <div>div 1</div>
//     <div>div 2</div>
//     <div>div 3</div>
//   </div>
// )

// JSX 和 createElement
// 始终记住，JSX 实际上是 createElement 的简写形式，是它的语法糖。
// 我们书写的 JSX 表达式，最终都会被 babel 处理，然后得到 createElement 式的写法。
// 比如，上述的 divContainer 经过 babel 解析之后，得到的编译结果类似下面这种写法。
const divContainer = createElement(
  'div',
  {},
  createElement(
    'div',
    {},
    'div 1',
    createElement('div', {}, 'div 2', createElement('div', {}, 'div 3')),
  ),
)
// 从编译结果来看，babel 编译后是一个树形结构，最外层的 createElement 的第一个元素是这个树的根节点。
// 不难理解如果存在多个根节点，那么最终生成的结构就不再是一棵树了，在 JSX 转为 createElement 的时候就会出现问题。
// 如果理解了这一点，其实就不难理解 —— 为什么 JSX 必须得是单根了。

const root = createRoot(document.getElementById('root'))

root.render(<StrictMode>{divContainer}</StrictMode>)
```

```jsx {17,21,26,27} [✅ 解 3]
import { StrictMode, Fragment } from 'react'
import { createRoot } from 'react-dom/client'

// ✅ 解决办法1：在外层包裹一个 div 元素作为根节点。
// const divContainer = (
//   <div>
//     <div>div 1</div>
//     <div>div 2</div>
//     <div>div 3</div>
//   </div>
// )

// ✅ 解决办法3：使用 <React.Fragment> 来包裹多个根节点。
// <React.Fragment> 并不会被渲染出来，并不会破坏 html 结构。
// <React.Fragment> 是一个特殊的 react 内置组件，专门用于解决 jsx 中多个根节点的书写问题。
const divContainer = (
  <Fragment>
    <div>div 1</div>
    <div>div 2</div>
    <div>div 3</div>
  </Fragment>
)
// 从数据结构层面来看，React.Fragment 是一个 symbol 类型。
console.log(Fragment, typeof Fragment) // Symbol(react.fragment) 'symbol'
// 由此也可以得出一个结论：
// 🤔 React 组件一定都是对象类型，这句话对吗？
// 不对，比如 Fragment 这个内置组件，它就是 symbol 类型。

const root = createRoot(document.getElementById('root'))

root.render(<StrictMode>{divContainer}</StrictMode>)
```

```jsx {14,18} [✅ 解 4]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// const divContainer = (
//   <Fragment>
//     <div>div 1</div>
//     <div>div 2</div>
//     <div>div 3</div>
//   </Fragment>
// )

// 语法糖 - <React.Fragment> 可以简写为 <>
const divContainer = (
  <>
    <div>div 1</div>
    <div>div 2</div>
    <div>div 3</div>
  </>
)
// <React.Fragment> 是一个比较常用的组件，JSX 对此做了一些特殊处理，如果想要使用 <React.Fragment> 的话：
// 反锁：不必每次都导入 import React from 'react'; 再使用。
// 简便：可以直接使用缩写的形式 <>...</>，这么写就相当于写了 import React from 'react'; <React.Fragment>...</React.Fragment>。

const root = createRoot(document.getElementById('root'))

root.render(<StrictMode>{divContainer}</StrictMode>)
```

:::

### 6.1. ❌ 错误写法

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-12-45.png)

### 6.2. ✅ 解 1

虽然上述提到的解决办法能够正常在页面上渲染出 3 个 div，但是却破坏的元素的结构，多出的这一层 div 很可能并非我们想要的。

对应的真实 DOM：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-12-10.png)

### 6.3. ✅ 解 2

其实就是将 `解1` 中的 JSX 的写法改为 `createElement` 式的写法，它们是等效的。

知道 JSX 是语法糖，掌握好 JSX 的写法即可，实际开发中很少会采用 `createElement` 式的写法来描述 UI。

### 6.4. ✅ 解 3

采用 `Fragment` 来包裹多个元素，最终渲染出来的结构如下：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-11-36.png)

会发现这种写法并不会破坏元素结构，这往往是我们开发时更常用的。

### 6.5. ✅ 解 4

是解法 3 的简写形式。

## 7. 为什么 JSX 必须单根？

### 7.1. 官方回答：为什么多个 JSX 标签需要被一个父元素包裹？

JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 [Fragment][3] 来包裹。

### 7.2. 解释

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

## 8. 引用

- [React 官方文档 - 教程 - 描述 UI - 使用 JSX 书写标签语言][1]
- [React 官方文档 - 参考 - 过时的 React API - createElement][2]
- [React 官方文档 - 参考 - 组件 - Fragment][3]

[1]: https://zh-hans.react.dev/learn/writing-markup-with-jsx
[2]: https://zh-hans.react.dev/reference/react/createElement
[3]: https://zh-hans.react.dev/reference/react/Fragment
