# [0050. React.createElement 跟 document.createElement 是一样的吗？](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0050.%20React.createElement%20%E8%B7%9F%20document.createElement%20%E6%98%AF%E4%B8%80%E6%A0%B7%E7%9A%84%E5%90%97%EF%BC%9F)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 🤔 `React.createElement` 跟 `document.createElement` 是一样的吗？](#2--reactcreateelement-跟-documentcreateelement-是一样的吗)
- [3. 📒 扩展：虚拟 DOM](#3--扩展虚拟-dom)

<!-- endregion:toc -->

## 1. 📝 概述

- 理解 `React.createElement` 跟 `document.createElement` 之间的区别。

## 2. 🤔 `React.createElement` 跟 `document.createElement` 是一样的吗？

- 别想了，不可能是一样的。
- react 核心库是很纯粹的，里边是不包含任何跟宿主环境（比如，BOM `window`、DOM `document`）相关的 API 的，因此它们不可能是一个玩意儿。
- 可以认为前者 `React.createElement` 返回的就是一个跟宿主环境无关的普通 js 对象，在这个对象中记录了需要如何在页面上渲染出一个真实的元素节点的相关信息，它需要配合 react-dom 库一起使用，将它的返回结果丢给 react-dom，由 react-dom 去解析这些信息，渲染出真实 dom。

## 3. 📒 扩展：虚拟 DOM

- 上面提到了 `React.createElement` 的返回值是一个普通的 js 对象，其实这就是 React 的虚拟 dom（virtual dom）。
- 要知道 **虚拟 DOM** 并非啥多么神奇的技术，它实际上就是对实际 DOM 的抽象，它允许 React 在不影响浏览器性能的情况下高效地更新用户界面（更新信息暂时记录到虚拟 DOM 对象身上，最后明确需要修改的具体内容之后，才会转为真实 DOM 操作，触发页面更新）。
- 当应用的状态发生变化时，React 会首先在虚拟 DOM 上进行更新和差异计算（diffing algorithm），然后将实际需要更改的部分批量应用到真实的 DOM 上，从而减少直接操作 DOM 所带来的性能开销。
