# [0042. Hello World（v16）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0042.%20Hello%20World%EF%BC%88v16%EF%BC%89)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 💻 通过 CDN 的方式引入相关依赖](#2--通过-cdn-的方式引入相关依赖)
- [3. ⚙️ 核心 API](#3-️-核心-api)
  - [3.1. ⚙️ `React.createElement`](#31-️-reactcreateelement)
  - [3.2. ⚙️ `React.render`](#32-️-reactrender)
- [4. 💻 demos.1 - 在页面上渲染出 Hello World](#4--demos1---在页面上渲染出-hello-world)
- [5. 💻 demos.2 - 初步认识 React.createElement 和 JSX](#5--demos2---初步认识-reactcreateelement-和-jsx)
- [6. 🔗 References](#6--references)

<!-- endregion:toc -->

## 1. 📝 概述

- 本节不使用任何脚手架工具，通过 CDN 引入 react、react-dom，直接在（.html）页面上使用 react，实现一个 demo「在页面上渲染出 Hello World」。并借此 demo 来熟悉 React.createElement 和 ReactDOM.render 的基本用法。
- 知识点
  - React.createElement 的基本使用
  - ReactDOM.render 的基本使用
  - 知道 JSX 其实就是 React.createElement 的简写，是一个语法糖。

## 2. 💻 通过 CDN 的方式引入相关依赖

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

- **注意版本**：这里引入的都是 `v16` 版。
- 这是早期写的 react 笔记，从现在这个时间点 `2025 年 1 月 18 日 08:32:00` 来看，最新的 react 版本应该是 v19 了，没记错的话 v16 应该是两年前左右（22 年初那会儿吧，当时大学还没毕业呢）发布的。

## 3. ⚙️ 核心 API

### 3.1. ⚙️ `React.createElement`

- 参数 1：需要创建的 html 元素的名称，比如 h1 表示 h1 标签
- 参数 2：元素属性，比如 id、class、style、onClick 等等，可以以一个对象的形式传入
- 参数 3 ~ 参数 n：子元素列表，比如 h1 标签中的文本内容，可以以一个字符串的形式传入，也可以传入由 `React.createElement` 创建的 React 元素
- 返回值是一个 React 元素，这个元素可以作为 `ReactDOM.render` 的第一个参数，表示要渲染的内容。
- **牢记由 `React.createElement` 创建的 react 元素是不可变的**
  - 不可变
    - 虽然 JSX 元素是一个对象，但是该对象中的所有属性都是不可更改的。
    - 如果确实需要更改元素的属性，需要重新创建 JSX 元素。
  - 等效
    - `react 元素 == JSX == React.createElement 创建的元素`
    - 当我们在口语表述 “react 元素”、“jsx”、“React.createElement 创建的元素”…… 这些内容的时候，大多时候想要表达的都是一个意思。

### 3.2. ⚙️ `React.render`

- 参数 1：要渲染的内容，可以是 React 元素，也可以是字符串，也可以是数字，也可以是布尔值，也可以是 null，也可以是 undefined。
- 参数 2：要渲染到哪个容器中，可以是一个 DOM 元素。
- 作用：将指定内容渲染到指定的容器中。

## 4. 💻 demos.1 - 在页面上渲染出 Hello World

<<< ./demos/1/1.html {11-28}

- 最终渲染结果如下图所示：
- ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-22-23-15.png)

## 5. 💻 demos.2 - 初步认识 React.createElement 和 JSX

::: code-group

<<< ./demos/2/1.html {11-41} [React.createElement 式写法]

<<< ./demos/2/2.html {21-22,31-47} [JSX 式写法]

:::

- `<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>` 需要引入 Babel 来编译 JSX。
- `<script type='text/babel'>` 需要让浏览器知道这部分的 JS 是需要交给 Babel 编译处理的脚本。
- 两者的最终渲染结果都是一样的，如下图所示：
- ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-22-27-46.png)

## 6. 🔗 References

- https://zh-hans.react.dev/reference/react/createElement
  - react createElement
- https://zh-hans.react.dev/reference/react-dom/render
  - react render - `React.render(reactNode, domNode, callback?)`
  - 注：在未来 React v19 中，此 API 将被移除。
