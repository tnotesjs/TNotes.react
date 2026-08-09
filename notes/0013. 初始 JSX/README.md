# [0013. 初始 JSX](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0013.%20%E5%88%9D%E5%A7%8B%20JSX)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. JSX 是什么？](#2-jsx-是什么)
- [3. 使用 JSX 描述 UI](#3-使用-jsx-描述-ui)
  - [3.1. 用 `{}` 嵌入表达式](#31-用--嵌入表达式)
  - [3.2. 属性与事件](#32-属性与事件)
  - [3.3. 结构约束](#33-结构约束)
  - [3.4. 注释](#34-注释)
- [4. 实验：用两种不同的写法实现一个简单的 React 组件](#4-实验用两种不同的写法实现一个简单的-react-组件)
- [5. 实验：JSX 必须单根](#5-实验jsx-必须单根)
  - [5.1. ❌ 错误写法](#51--错误写法)
  - [5.2. ✅ 解 1](#52--解-1)
  - [5.3. ✅ 解 2](#53--解-2)
  - [5.4. ✅ 解 3](#54--解-3)
  - [5.5. ✅ 解 4](#55--解-4)
- [6. 为什么 JSX 必须单根？](#6-为什么-jsx-必须单根)
  - [6.1. 官方说法](#61-官方说法)
  - [6.2. 建议：结合 `createElement` 理解](#62-建议结合-createelement-理解)
- [7. 引用](#7-引用)

<!-- endregion:toc -->

## 1. 本节内容

- JSX 是什么
- JSX 描述 UI 的基本写法规则
- JSX 的单根机制以及背后的原因
- `React.createElement` 的基本使用

这篇笔记简单介绍了 JSX 的一些基础知识点，先对 JSX 是什么有个初步认识即可，有关 JSX 的更多细节，会在其他笔记中介绍。

## 2. JSX 是什么？

JSX（JavaScript XML）是一种 JS 语法扩展，用来在代码里用类似 HTML 的写法描述 UI。它由 Facebook（现 Meta）在 React 生态中提出并推广，浏览器并不原生支持，需要经 Babel、TypeScript 等工具编译成普通 JavaScript。

写 JSX 的目的，是让 UI 结构和组件逻辑能写在同一处，读起来更直观。不用 JSX 也可以开发 React（直接调用 `React.createElement`），只是大多数项目会优先用 JSX。

从运行结果看：一段 JSX 经编译后，通常会变成 `React.createElement(...)`（或新版 JSX 运行时的等价调用），执行后得到的是 React Element —— 本质上就是一个普通的 JS 对象，用来描述「要渲染什么」。

## 3. 使用 JSX 描述 UI

JSX 是声明式的：你描述界面「长什么样」，而不是手写一步步 DOM 操作。下面是入门时最常用的几条写法规则（后文示例会展开）。

### 3.1. 用 `{}` 嵌入表达式

在标签内容或属性里，用大括号写入任意合法的 JavaScript 表达式，例如变量、函数调用、运算结果。

### 3.2. 属性与事件

写法接近 HTML，但有几处固定差异：

- `class` → `className`（`class` 是 JS 保留字）
- 事件名用小驼峰，如 `onClick`，不是 `onclick`
- 事件处理函数通常接收事件对象作为参数

### 3.3. 结构约束

- 单根：一个 JSX 表达式通常只能有一个根节点；多个并列节点用 `<React.Fragment>` 或简写 `<>...</>` 包起来（详见后文「必须单根」示例）
- 结束标记：标签必须闭合；无子节点时可写成 `<img src={imageSrc} />` 这种自闭合形式

### 3.4. 注释

JSX 里写注释用 `{/* ... */}`，不要直接写 `//` 或 HTML 注释 `<!-- -->`。

## 4. 实验：用两种不同的写法实现一个简单的 React 组件

两种写法：

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

## 5. 实验：JSX 必须单根

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

### 5.1. ❌ 错误写法

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-12-45.png)

### 5.2. ✅ 解 1

虽然上述提到的解决办法能够正常在页面上渲染出 3 个 div，但是却破坏的元素的结构，多出的这一层 div 很可能并非我们想要的。

对应的真实 DOM：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-12-10.png)

### 5.3. ✅ 解 2

其实就是将 `解1` 中的 JSX 的写法改为 `createElement` 式的写法，它们是等效的。

知道 JSX 是语法糖，掌握好 JSX 的写法即可，实际开发中很少会采用 `createElement` 式的写法来描述 UI。

### 5.4. ✅ 解 3

采用 `Fragment` 来包裹多个元素，最终渲染出来的结构如下：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-11-36.png)

会发现这种写法并不会破坏元素结构，这往往是我们开发时更常用的。

### 5.5. ✅ 解 4

是解法 3 的简写形式。

## 6. 为什么 JSX 必须单根？

### 6.1. 官方说法

来源：[React 官方文档 - 教程 - 描述 UI - 使用 JSX 书写标签语言][1]

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs-2026@main/2026-08-09-16-36-38.png)

可以把这段描述拆成三步来理解：

1. JSX 写出来像 HTML，编译后会变成普通的 JavaScript 对象（React Element）。
2. 组件本身是函数，界面长什么样，靠这个函数 `return` 出去，而 JS 函数一次只能返回一个值。
3. 因此：若你想一次给出多个并列的元素，就不能在 `return` 里并排放两个对象，得先把它们收成「一个」返回值 => 常见做法是用父元素或 [Fragment][3] 包起来（返回数组也可以，但日常更常用包一层）。

### 6.2. 建议：结合 `createElement` 理解

记住：一段 JSX 表达式，经 Babel 等工具编译后，通常对应一次（或一组嵌套的）`React.createElement` 调用。

`createElement` 的形态是：

```js
createElement(type, props, ...children)
```

一次调用只会创建一个元素节点：`type` 是这个节点的类型，后面的 `children` 都挂在它下面，整体形成一棵树。

```js
import { createElement } from 'react'

function Greeting({ name }) {
  // 根是 h1；「你好」、<i>、欢迎语都是它的子节点
  return createElement(
    'h1',
    { className: 'greeting' },
    '你好',
    createElement('i', null, name),
    '。欢迎！',
  )
}
```

因此，下面这种「多个根并排」的 JSX 不合法 => 编译器没法把它收成「一次 `createElement` 调用、只有一个根 `type`」：

```jsx
// ❌ 不合法
const node = (
  <div>A</div>
  <div>B</div>
)
```

解决办法就是补一个根：真实 DOM 节点（如外层 `div`），或不会多出 DOM 的 `Fragment` / `<>...</>`。

## 7. 引用

- [React 官方文档 - 教程 - 描述 UI - 使用 JSX 书写标签语言][1]
- [React 官方文档 - 参考 - 过时的 React API - createElement][2]
- [React 官方文档 - 参考 - 组件 - Fragment][3]

[1]: https://zh-hans.react.dev/learn/writing-markup-with-jsx
[2]: https://zh-hans.react.dev/reference/react/createElement
[3]: https://zh-hans.react.dev/reference/react/Fragment
