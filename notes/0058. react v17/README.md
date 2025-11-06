# [0058. react v17](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0058.%20react%20v17)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤖 react v17 都有哪些重大更新？（待整理）](#3--react-v17-都有哪些重大更新待整理)
  - [3.1. 核心目标： 为多版本共存和渐进升级做准备](#31-核心目标-为多版本共存和渐进升级做准备)
  - [3.2. 新的 JSX 转换（New JSX Transform） （可选但推荐）](#32-新的-jsx-转换new-jsx-transform-可选但推荐)
  - [3.3. 事件委托从 `document` 改为 React 树的根容器](#33-事件委托从-document-改为-react-树的根容器)
    - [旧行为（React 16 及之前）](#旧行为react-16-及之前)
    - [新行为（React 17+）](#新行为react-17)
    - [潜在影响](#潜在影响)
  - [3.4. 更一致的 `useEffect` 清理函数执行时机](#34-更一致的-useeffect-清理函数执行时机)
  - [3.5. 错误处理更严格](#35-错误处理更严格)
  - [3.6. 移除一些过时的生命周期警告](#36-移除一些过时的生命周期警告)
  - [3.7. Breaking Changes（破坏性变更）](#37-breaking-changes破坏性变更)
  - [3.8. 其他改进](#38-其他改进)
  - [3.9. 总结](#39-总结)
- [4. 🔗 引用](#4--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- react v17 的重大更新

## 2. 🫧 评价

- 快速了解 react v17 的一些重大变更

## 3. 🤖 react v17 都有哪些重大更新？（待整理）

- 以下是基于 [React v17.0.0 官方 Release Notes][1] 的主要变更内容总结。
- React v17 于 2020 年 10 月 20 日 正式发布，是一个 以“渐进升级”和“事件系统重构”为核心目标 的版本。与以往版本不同，React 17 没有引入面向开发者的新特性 （如 Hooks、Suspense 等），而是专注于 为未来版本（特别是 React 18 的并发渲染）铺平道路 ，并解决长期存在的兼容性问题。

### 3.1. 核心目标： 为多版本共存和渐进升级做准备

React 团队明确表示： React 17 是一个“垫脚石”版本 ，旨在让大型应用能够 逐步升级到 React 18+ ，而无需一次性重写整个应用。

### 3.2. 新的 JSX 转换（New JSX Transform） （可选但推荐）

- 无需再显式导入 `React` 来使用 JSX（在支持新转换的构建工具中）：

```jsx
// 以前必须写：
import React from 'react'
function App() {
  return <h1>Hello!</h1>
}

// React 17+（配合 Babel 7.9+ / TS 4.1+）可省略：
function App() {
  return <h1>Hello!</h1>
}
```

- 原理 ：Babel/TS 编译器会自动将 `<h1 />` 转换为 `jsx('h1', ...)` 而非 `React.createElement('h1', ...)`。
- 优势 ：
  - 减少 bundle 体积（移除不必要的 `React` 引用）。
  - 为未来 JSX 扩展（如自动注入 key）提供可能。
- ⚠️ 注意 ：这是 构建工具层面的变更 ，需升级 Babel（`@babel/preset-react@7.9.0+`）或 TypeScript（v4.1+）才能启用。

> 🔗 官方迁移指南：[React 17 JSX Transform][2]

### 3.3. 事件委托从 `document` 改为 React 树的根容器

这是 React 17 最重要的内部变更 ，解决了长期存在的 事件冒泡跨 React 版本冲突问题 。

#### 旧行为（React 16 及之前）

- 所有事件监听器都绑定在 `document` 上（通过事件委托）。
- 问题：如果页面同时存在 React 16 和 React 17+ 的应用 ，事件可能互相干扰（例如 stopPropagation 行为不一致）。

#### 新行为（React 17+）

- 事件监听器绑定在 每个 React 树的根 DOM 容器 （即 `ReactDOM.render(<App />, rootElement)` 中的 `rootElement`）。
- 好处 ：
  - 多个 React 版本可安全共存于同一页面。
  - 更符合直觉的事件冒泡行为（尤其在微前端架构中）。
  - 为 React 18 的并发渲染（Concurrent Rendering）提供更可控的事件系统。

#### 潜在影响

- 如果你 手动在 `document` 上添加事件监听器 ，并依赖 React 事件先触发，现在可能顺序反转。
- 解决方案 ：将监听器移到 React 树的根容器，或使用 `capture` 阶段。

### 3.4. 更一致的 `useEffect` 清理函数执行时机

- 在 React 17 中，`useEffect` 的清理函数（cleanup）会在 新 effect 执行前同步运行 （而非异步）。
- 目的 ：减少内存泄漏风险，使行为更可预测。
- 对大多数应用无感知，但对依赖精确时序的测试或复杂副作用可能有影响。

### 3.5. 错误处理更严格

- 如果在 `render` 阶段抛出错误，React 17 会 立即卸载整个根组件树 （而非尝试恢复）。
- 避免因部分组件处于不一致状态导致难以调试的问题。

### 3.6. 移除一些过时的生命周期警告

- 移除了对 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 的控制台警告（这些已在 React 16.9 中标记为 unsafe）。
- 因为这些 API 在 React 17 中仍可用（带 `UNSAFE_` 前缀），但未来版本可能彻底移除。

### 3.7. Breaking Changes（破坏性变更）

1. 事件委托目标变更 （如上所述）——可能影响混合应用或微前端。
2. `onScroll` 事件不再冒泡 （符合浏览器标准）。
3. `onChange` 事件在 `<input type="file">` 上不再触发 （因浏览器限制，实际无法监听文件 input 的 change 事件）。
4. `useEffect` 清理函数同步执行 —— 可能影响依赖异步清理逻辑的代码。

### 3.8. 其他改进

- 减小了 React DOM 的 bundle 体积。
- 改进了开发环境下的错误堆栈信息。
- 为 React Native 和 React DOM 共享更多内部逻辑（减少重复代码）。

### 3.9. 总结

> React 17 是一个“安静但重要”的版本 ：
>
> - 没有新 API，但为 React 18+ 的并发特性扫清障碍。
> - 重点解决 多版本共存 和 事件系统一致性 问题。
> - 推荐所有项目升级到 React 17 ，作为迈向 React 18/19 的第一步。

## 4. 🔗 引用

- [React v17.0.0 Release Notes][1]
- [React 17 JSX Transform][2]
- [React 17 博客文章：Making Upgrade Easier][3]

[1]: https://github.com/facebook/react/releases/tag/v17.0.0
[2]: https://react.dev/blog/2020/09/22/introducing-the-new-jsx-transform
[3]: https://react.dev/blog/2020/10/20/react-v17
