# [0052. 为什么一旦使用了 JSX 语法，就必须要引入 react 核心库？](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0052.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%80%E6%97%A6%E4%BD%BF%E7%94%A8%E4%BA%86%20JSX%20%E8%AF%AD%E6%B3%95%EF%BC%8C%E5%B0%B1%E5%BF%85%E9%A1%BB%E8%A6%81%E5%BC%95%E5%85%A5%20react%20%E6%A0%B8%E5%BF%83%E5%BA%93%EF%BC%9F)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 🤔 为什么一旦使用了 `JSX` 语法，就必须要引入 `react` 核心库？](#2--为什么一旦使用了-jsx-语法就必须要引入-react-核心库)
- [3. ⚠️ 注意：React v17+ 的变化](#3-️-注意react-v17-的变化)

<!-- endregion:toc -->

## 1. 📝 概述

- 加深对 jsx 的认识 —— 理解【为什么一旦使用了 `JSX` 语法，就必须要引入 `react` 核心库】。

## 2. 🤔 为什么一旦使用了 `JSX` 语法，就必须要引入 `react` 核心库？

- 比较官方的答复：
  - JSX 语法，是 react 官方提供的语法，它基于 react 的核心库，所以必须引入 react 核心库。
  - JSX 允许开发者在 JavaScript 代码中嵌入类似 HTML 的语法，但这种语法并不直接被 JavaScript 引擎理解。JSX 是 React 等库的一种语法糖，背后需要通过工具（如 Babel）进行编译转化成标准的 JavaScript 代码。
- **JSX 不是 es 官方标准，需要经过 Babel 编译，并依赖 `react` 核心库运行。**
  - JSX 在最初是由 React 团队提出的，并被 React 社区广泛采用。
  - 对于是否将 JSX 纳入 JavaScript 标准，曾有过讨论，截止目前 `2024 年 11 月 6 日 07:22:47` ES 官方没有将 JSX 纳入规范标准，如果要使用 JSX 的话，需要在中间加一层 bable 来对 JSX 进行编译。
  - 2017 年，Babel 发布了支持 JSX 语法的编译器插件，使得使用 JSX 更加方便。
  - JSX 经过 babel 编译之后，会变成 `React.createElement` 函数调用，而 `React.createElement` 是 react 核心库中的一个函数。
  - `React.createElement` 函数最终会返回一个 react 元素对象（虚拟 DOM），这个对象包含了所有需要渲染的信息，包括标签名、属性、子元素等。

## 3. ⚠️ 注意：React v17+ 的变化

- React v17+ 对 JSX 运行时进行了优化，不再强制要求每个文件导入 React，但 v16 版本仍需显式导入。
- 在新版本中，Babel 会从 `react/jsx-runtime` 自动导入 JSX 函数，不再需要显式导入 React。
