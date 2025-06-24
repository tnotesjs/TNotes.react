# [0051. react 核心库和 react-dom 库之间的关系是？](https://github.com/Tdahuyou/TNotes.react/tree/main/notes/0051.%20react%20%E6%A0%B8%E5%BF%83%E5%BA%93%E5%92%8C%20react-dom%20%E5%BA%93%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB%E6%98%AF%EF%BC%9F)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 🤔 `react` 核心库和 `react-dom` 库之间的关系是？](#2--react-核心库和-react-dom-库之间的关系是)
- [3. 💬 评价](#3--评价)

<!-- endregion:toc -->

## 1. 📝 概述

- 理解 `react` 和 `react-dom` 这两个库之间的关系。

## 2. 🤔 `react` 核心库和 `react-dom` 库之间的关系是？

- `react` 核心库
  - React 核心库提供了构建用户界面所需的所有基本功能，压根就不关心元素具体如何渲染。
  - `React` 核心库主要负责提供创建和管理组件所需的 API 和工具，它定义了如何声明组件、状态管理和生命周期方法等核心概念。
  - `React` 核心库包含了如 `React.Component` 类、`useState`, `useEffect` 等 Hooks 函数以及 `React.createElement` 等用于创建 React 元素的方法。
  - 这个库不关心组件最终会被渲染到哪里，它可以是浏览器中的 DOM 节点，也可以是原生移动应用的视图组件（如在 React Native 中）。
- `react-dom` 库
  - ReactDOM 则专注于将由 React 库创建的 react 元素（虚拟 DOM）渲染到浏览器环境中。
  - `react-dom` 这个中间的 `-` 符号，可以将其理解为“连接”，就是将 react 和 dom 相互连接起来的意思。

## 3. 💬 评价

- react 的这种设计，使得它不仅局限于浏览器环境中，还可以应用于其他场景，比如 **React Native** 就是在移动端使用 React 构建原生应用的一个例子。
