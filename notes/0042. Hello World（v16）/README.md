# [0042. Hello World（v16）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0042.%20Hello%20World%EF%BC%88v16%EF%BC%89)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 通过 CDN 的方式引入相关依赖](#3-通过-cdn-的方式引入相关依赖)
- [4. `React.createElement`（过时的 API）](#4-reactcreateelement过时的-api)
- [5. `React.render`（Deprecated）](#5-reactrenderdeprecated)
- [6. 示例：在页面上渲染出 Hello World](#6-示例在页面上渲染出-hello-world)
- [7. 初步认识 `React.createElement` 和 JSX](#7-初步认识-reactcreateelement-和-jsx)
  - [7.1. `React.createElement` 式写法](#71-reactcreateelement-式写法)
  - [7.2. JSX 式写法](#72-jsx-式写法)
  - [7.3. 小结](#73-小结)
- [8. `React.createElement` 跟 `document.createElement` 是一样的吗？](#8-reactcreateelement-跟-documentcreateelement-是一样的吗)
- [9. `react` 核心库和 `react-dom` 库之间的关系是？](#9-react-核心库和-react-dom-库之间的关系是)
  - [9.1. `react` 核心库](#91-react-核心库)
  - [9.2. `react-dom` 库](#92-react-dom-库)
  - [9.3. 评价](#93-评价)
- [10. 为什么一旦使用了 `JSX` 语法，就必须要引入 `react` 核心库？](#10-为什么一旦使用了-jsx-语法就必须要引入-react-核心库)
  - [10.1. 比较官方的答复](#101-比较官方的答复)
  - [10.2. 关于 JSX 的一些补充说明](#102-关于-jsx-的一些补充说明)
  - [10.3. 注意：React v17+ 的变化](#103-注意react-v17-的变化)
    - [React 17+ 的变化](#react-17-的变化)
    - [新旧写法对比](#新旧写法对比)
- [11. “通过脚手架（比如 vite、umi、create-react-app）来搭建工程”和“通过 CDN 的方式来直接引入 react 相关的库”两种做法的区别是？](#11-通过脚手架比如-viteumicreate-react-app来搭建工程和通过-cdn-的方式来直接引入-react-相关的库两种做法的区别是)
- [12. 引用](#12-引用)

<!-- endregion:toc -->

## 1. 本节内容

- `React.createElement` 的基本使用（不重要 - API 已过时）
- `ReactDOM.render` 的基本使用（不重要 - API 已过时）
- 理解 `React.createElement` 跟 `JSX` 之间的关系（重要）
- 理解 `React.createElement` 跟 `document.createElement` 之间的区别（重要）
- 理解 `react` 和 `react-dom` 这两个库之间的关系（重要）
- 简单了解使用脚手架和不使用脚手架来初始化工程，存在什么区别（重要）

## 2. 评价

本节不使用任何脚手架工具，通过 CDN 引入 `react`、`react-dom`，直接在（.html）页面上使用 react，实现一个 demo，这个 demo 的效果也非常简单，就是在页面上渲染出 Hello World 即可。

核心目的是借助这个简单的 Hello World 的 demo 来熟悉 `React.createElement` 和 `ReactDOM.render` 的基本用法，并引出一些 react 的核心概念。

::: warning ⚠️ WARNING

本节介绍的两个核心 API 是早期 react 的 API，在当前 `25.10` 的最新版 React v19 中，这些 API 都已经过时了。因此，API 的具体使用不重要，但是跟 react 相关的核心概念比较重要。

:::

## 3. 通过 CDN 的方式引入相关依赖

```html
<!-- React 的核心库，与宿主环境无关 -->
<script
  crossorigin
  src="https://unpkg.com/react@16/umd/react.development.js"
></script>
<!-- 依赖核心库，将核心的功能与页面结合 -->
<script
  crossorigin
  src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
></script>
```

注意版本：开始写笔记的时间比较早，笔记中引入的 react 包都是 `v16` 版。

::: tip 💡 TIP

这是早期写的 react 笔记，从现在这个时间点 `25.10` 来看，最新的 react 版本已经是 v19 了，没记错的话 v16 应该是两年前左右（22 年初那会儿吧，当时大学还没毕业呢）发布的。

:::

## 4. `React.createElement`（过时的 API）

```js
// doc: https://zh-hans.react.dev/reference/react/createElement#createelement
// 调用 createElement 来创建一个 React 元素
// 它有 type、props 和 children 三个参数
const element = createElement(type, props, ...children)
```

参数说明：

- 参数 1：需要创建的 html 元素的名称，比如 h1 表示 h1 标签
- 参数 2：元素属性，比如 id、class、style、onClick 等等，可以以一个对象的形式传入
- 参数 3 ~ 参数 n：子元素列表，比如 h1 标签中的文本内容，可以以一个字符串的形式传入，也可以传入由 `React.createElement` 创建的 React 元素

返回值说明：返回值是一个 React 元素，这个元素可以作为 `ReactDOM.render` 的第一个参数，表示要渲染的内容。

牢记由 `React.createElement` 创建的 react 元素是不可变的：

- “不可变”
  - 虽然 JSX 元素是一个对象，但是该对象中的所有属性都是不可更改的。
  - 如果确实需要更改元素的属性，需要重新创建 JSX 元素。
- “react 元素”
  - 记住一个等价关系：$react 元素 = JSX = React.createElement 创建的元素$，它们只是叫法不同罢了。
  - 当我们在口语表述 “react 元素”、“JSX”、“React.createElement 创建的元素”…… 这些内容的时候，大多时候想要表达的都是一个意思。

## 5. `React.render`（Deprecated）

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs-2026@main/2026-06-11-21-38-58.png)

```js
// doc: https://18.react.dev/reference/react-dom/render
// 注意：render 这个 API 已经过时了，如果要搜的话，得往回翻阅历史版本或更新日志。
// 关于 render 函数，官方文档的描述是：render renders a piece of JSX (“React node”) into a browser DOM node.
// 中文：render 将一段 JSX（“React 节点”）渲染到浏览器的 DOM 节点中。
render(reactNode, domNode, callback?)
```

作用：将指定内容渲染到指定的容器中。

参数说明：

- 参数 1：要渲染的内容，可以是 React 元素，也可以是字符串，也可以是数字，也可以是布尔值，也可以是 null，也可以是 undefined。
- 参数 2：要渲染到哪个容器中，可以是一个 DOM 元素。

## 6. 示例：在页面上渲染出 Hello World

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>

  <body>
    <!-- 这是接下来要渲染内容的容器 -->
    <div id="root"></div>
    <!-- React 的核心库，与宿主环境无关 -->
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <!-- 依赖核心库，将核心的功能与页面结合 -->
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script>
      // 创建一个 H1 元素
      const h1 = React.createElement('h1', {}, 'Hello World')
      // 将 H1 元素渲染到 root 容器中
      ReactDOM.render(h1, document.getElementById('root'))
    </script>
  </body>
</html>
```

最终渲染结果如下图所示：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-22-23-15.png)

## 7. 初步认识 `React.createElement` 和 JSX

### 7.1. `React.createElement` 式写法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>

  <body>
    <div id="root"></div>
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script>
      // 创建一个 span 元素
      const span = React.createElement(
        'span',
        {
          title: '这是一个 span 元素',
        },
        'this is a span element',
      )

      // 创建一个 img 元素
      const img = React.createElement('img', {
        // 素材：github 头像
        src: 'https://avatars.githubusercontent.com/u/125541114?v=4',
        width: '100px',
      })

      // 创建一个 div 元素
      const div = React.createElement('div', {}, '123', img, span)
      // 123、img、span 这些都会成为该 div 的子元素

      ReactDOM.render(div, document.getElementById('root'))
    </script>
  </body>
</html>
```

### 7.2. JSX 式写法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>

  <body>
    <div id="root"></div>
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>

    <!-- 引入 babel，用于编译 JSX，最终效果跟 React.createElement 函数调用的效果是完全一致的。 -->
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <script type="text/babel">
      // const span = React.createElement("span", {
      //   title: '这是一个 span 元素'
      // }, "this is a span element");
      // const img = React.createElement('img', { src: 'https://avatars.githubusercontent.com/u/125541114?v=4', width: '100px' });
      // const div = React.createElement("div", {}, "123", img, span);

      // 最终要渲染的元素是由 React.createElement 创建的。
      // 但是使用 React.createElement 创建的话，写起来不是很舒服，和传统的 html 写法不太一样。
      // 因此，React 还给我们提供了 JSX 的语法。
      // 比如上述结构，我们如果改用 JSX 的写法来改写，最终页面上渲染出来的效果是完全等效的。
      // 在实际开发中，我们更多使用的也是 JSX 的语法来写我们的 React 组件。
      const div = (
        <div>
          123
          <img
            src="https://avatars.githubusercontent.com/u/125541114?v=4"
            width="100px"
          />
          <span title="这是一个 span 元素">this is a span element</span>
        </div>
      )

      ReactDOM.render(div, document.getElementById('root'))
    </script>
  </body>
</html>
```

### 7.3. 小结

上述两种写法的最终渲染结果都是一样的，如下图所示：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-22-27-46.png)

在 JSX 的写法中，和 `React.createElement` 式写法不同的地方有：

1. 通过 `<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>` 引入了 Babel 来编译 JSX。
2. `<script type='text/babel'>` 需要让浏览器知道这部分的 JS 是需要交给 Babel 编译处理的脚本。

## 8. `React.createElement` 跟 `document.createElement` 是一样的吗？

别想了，不可能是一样的。

react 核心库是很纯粹的，里边是不包含任何跟宿主环境（比如，BOM `window`、DOM `document`）相关的 API 的，因此它们不可能是一个玩意儿。

可以认为前者 `React.createElement` 返回的就是一个跟宿主环境无关的普通 JS 对象，在这个对象中记录了需要如何在页面上渲染出一个真实的元素节点的相关信息，它需要配合 react-dom 库一起使用，将它的返回结果丢给 react-dom，由 react-dom 去解析这些信息，渲染出真实 dom。

## 9. `react` 核心库和 `react-dom` 库之间的关系是？

### 9.1. `react` 核心库

- React 核心库提供了构建用户界面所需的所有基本功能，压根就不关心元素具体如何渲染。
- React 核心库主要负责提供创建和管理组件所需的 API 和工具，它定义了如何声明组件、状态管理和生命周期方法等核心概念。
- React 核心库包含了如 `React.Component` 类、`useState`, `useEffect` 等 Hooks 函数以及 `React.createElement` 等用于创建 React 元素的方法。
- 这个库不关心组件最终会被渲染到哪里，它可以是浏览器中的 DOM 节点，也可以是原生移动应用的视图组件（如在 React Native 中）。

### 9.2. `react-dom` 库

- ReactDOM 则专注于将由 React 库创建的 react 元素（虚拟 DOM）渲染到浏览器环境中。
- `react-dom` 这个中间的 `-` 符号，可以将其理解为“连接”，就是将 react 和 dom 相互连接起来的意思。

### 9.3. 评价

React 的这种设计，很好地实现了核心逻辑和宿主环境的解耦。

使得 React 不仅局限于浏览器环境中，还可以应用于其他场景，比如 React Native 就是在移动端使用 React 构建原生应用的一个例子。

## 10. 为什么一旦使用了 `JSX` 语法，就必须要引入 `react` 核心库？

### 10.1. 比较官方的答复

- JSX 语法，是 react 官方提供的语法，它基于 react 的核心库，所以必须引入 react 核心库。
- JSX 允许开发者在 JavaScript 代码中嵌入类似 HTML 的语法，但这种语法并不直接被 JavaScript 引擎理解。JSX 是 React 等库的一种语法糖，背后需要通过工具（如 Babel）进行编译转化成标准的 JavaScript 代码。

### 10.2. 关于 JSX 的一些补充说明

- JSX 不是 es 官方标准，需要经过 Babel 编译，并依赖 react 核心库运行。
- JSX 在最初是由 React 团队提出的，并被 React 社区广泛采用。
- 对于是否将 JSX 纳入 JavaScript 标准，曾有过讨论，截止目前 `25.10` ES 官方没有将 JSX 纳入规范标准，如果要使用 JSX 的话，需要在中间加一层 bable 来对 JSX 进行编译。
- 2017 年，Babel 发布了支持 JSX 语法的编译器插件，使得使用 JSX 更加方便。
- JSX 经过 babel 编译之后，会变成 `React.createElement` 函数调用，而 `React.createElement` 是 react 核心库中的一个函数。`React.createElement` 函数最终会返回一个 react 元素对象（虚拟 DOM），这个对象包含了所有需要渲染的信息，包括标签名、属性、子元素等。

### 10.3. 注意：React v17+ 的变化

#### React 17+ 的变化

React 17+ 支持新的 JSX Transform，使“使用 JSX 时不必手动 `import React from 'react'`”成为可能。但这不是“只要 React 版本是 17+ 就自动生效”，还需要构建工具启用新版 JSX 编译方式，例如 Babel 的 `runtime: 'automatic'`，或 TypeScript 的 `jsx: 'react-jsx'`。

在启用新版 JSX 编译配置后，使用 JSX 的文件不再需要显式 `import React from 'react'`，编译器会自动从 `react/jsx-runtime` 引入 JSX 运行时函数。但如果使用旧版 JSX 编译方式，或代码中直接访问 `React` 对象，仍然需要导入 React。

旧版 JSX 编译方式仍然存在，JSX 会被编译成：`React.createElement(...)`，所以必须有 `React` 变量在作用域中。

新版 JSX 编译方式会变成类似：`import { jsx } from 'react/jsx-runtime'`，因此不再需要在每个 JSX 文件中手动导入 `React`。

#### 新旧写法对比

核心区别在于：编译后的代码不再依赖你代码作用域里的 `React` 变量。

关于下面这段 JSX 的编译：

```jsx
const el = <h1>Hello</h1>
```

旧版 JSX 编译会变成类似下面这样的写法：

```jsx
const el = React.createElement('h1', null, 'Hello')
```

这段代码里用到了 React.createElement，所以当前文件必须有：`import React from 'react'`，否则 React 是未定义的。

新版 JSX 编译会变成类似下面这样的写法：

```jsx
import { jsx } from 'react/jsx-runtime'

const el = jsx('h1', {
  children: 'Hello',
})
```

这里不再使用 `React.createElement`，也不需要 React 这个变量存在。jsx 函数由编译器自动从 `react/jsx-runtime `引入。

所以在新版 JSX Transform 下，就不需要手写：`import React from 'react'` 了。

## 11. “通过脚手架（比如 vite、umi、create-react-app）来搭建工程”和“通过 CDN 的方式来直接引入 react 相关的库”两种做法的区别是？

如果想要快速搭建一个 react 项目，推荐使用脚手架，因为脚手架会帮我们做更多的工程配置，比如 babel 的配置，vite/webpack 的配置，eslint 的配置等，这些配置都帮我们做了，我们只需要关注业务代码就可以了。

脚手架帮我们解决的主要是项目的一些初始配置问题，这些配置是相对通用的，省去了我们手动引入这些配置的流程。

最终运行的打包产物，依旧是这种传统的 html+css+js 页面形式，本质是没变的。

在初学阶段，跳过脚手架，手动搭建 react 工程所需的基本结构，有助于加深对项目整体结构的理解。

对于一些简单的 demo，只需要通过 CDN 的方式将必要的库引入测试即可。

## 12. 引用

- [createElement][1]
- [render][2]

[1]: https://zh-hans.react.dev/reference/react/createElement
[2]: https://18.react.dev/reference/react-dom/render
