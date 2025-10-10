# [0057. react v16](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0057.%20react%20v16)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤖 react v16 都有哪些重大更新？（待整理）](#3--react-v16-都有哪些重大更新待整理)
  - [3.1. 全新 Fiber Reconciler（核心重构）](#31-全新-fiber-reconciler核心重构)
  - [3.2. 错误边界（Error Boundaries）](#32-错误边界error-boundaries)
  - [3.3. 支持返回多个元素（Fragments 的前身）](#33-支持返回多个元素fragments-的前身)
  - [3.4. Portals（传送门）](#34-portals传送门)
  - [3.5. 更好的服务端渲染（SSR）支持](#35-更好的服务端渲染ssr支持)
  - [3.6. 更友好的错误和警告信息](#36-更友好的错误和警告信息)
  - [3.7. 许可证变更（临时争议）](#37-许可证变更临时争议)
  - [3.8. Breaking Changes（破坏性变更）](#38-breaking-changes破坏性变更)
  - [3.9. 其他改进](#39-其他改进)
- [4. 🔗 引用](#4--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- react v16 的重大更新

## 2. 🫧 评价

- 快速了解 react v16 的一些重大变更

## 3. 🤖 react v16 都有哪些重大更新？（待整理）

- 以下是基于 [React v16.0.0 官方 Release Notes][1] 的主要变更内容总结。
- React v16 是 React 发展史上的一个 里程碑式大版本，于 2017 年 9 月 26 日 正式发布。
- 它引入了多项重大改进，尤其是 全新的 Fiber 架构，为后续的并发渲染（Concurrent Rendering）奠定了基础。

### 3.1. 全新 Fiber Reconciler（核心重构）

- React 16 默认启用了 Fiber 重构后的协调引擎（reconciler），取代了旧的 Stack Reconciler。
- 目的：支持可中断的渲染、优先级调度、错误边界等高级能力，为未来的并发模式（Concurrent Mode）铺路。
- 对开发者的影响：
  - 渲染性能在某些场景下有提升。
  - 生命周期行为略有变化（如 `componentWillMount` 可能被多次调用）。
  - 不兼容自定义渲染器（如 react-art、react-native 等需升级适配）。

### 3.2. 错误边界（Error Boundaries）

- 引入新生命周期方法：`componentDidCatch(error, info)`。
- 允许组件捕获子组件树中的 JavaScript 错误，并展示 fallback UI，避免整个应用崩溃。
- 注意：错误边界无法捕获：
  - 事件处理函数中的错误
  - 异步代码（如 `setTimeout`）
  - 服务端渲染
  - 错误边界自身的错误

### 3.3. 支持返回多个元素（Fragments 的前身）

- 组件现在可以直接返回多个同级元素（无需包裹在额外的 `<div>` 中）：

```jsx
render() {
  return [
    <li key="1">First</li>,
    <li key="2">Second</li>
  ];
}
```

- 这为后续 v16.2 引入的 `<React.Fragment>`（或 `<>...</>`）语法打下基础。

### 3.4. Portals（传送门）

- 新增 `ReactDOM.createPortal(child, container)` API。
- 允许将子节点渲染到父组件 DOM 层级之外的 DOM 节点中（常用于 Modal、Tooltip 等）。

```jsx
render() {
  return ReactDOM.createPortal(
    this.props.children,
    document.getElementById('modal-root')
  );
}
```

### 3.5. 更好的服务端渲染（SSR）支持

- 重写了 SSR 模块，大幅提高性能（官方称快 3 倍以上）。
- 支持 流式渲染（Streaming Rendering）：`ReactDOMServer.renderToNodeStream()` 和 `renderToStaticNodeStream()`。
- SSR 与客户端 hydrate 更健壮。

### 3.6. 更友好的错误和警告信息

- 错误栈信息更清晰，包含组件名称和层级。
- 使用 call stack demangling 技术，在开发环境下提供更可读的错误提示。

### 3.7. 许可证变更（临时争议）

- React 16 初期使用 BSD + Patents License，引发社区对专利条款的担忧。
- 后续（2017 年 9 月底）Facebook 宣布回归 MIT License，并在 React 16.0.0 的后续 patch 中正式切换（v16.0.0 本身仍为 BSD+Patents，但很快被 MIT 版本取代）。

> 📌 实际上，React 16.0.0 发布几天后就发布了 16.0.0-alpha.13（MIT），最终稳定版均采用 MIT。

### 3.8. Breaking Changes（破坏性变更）

- `React.PropTypes` 和 `React.createClass` 被移除：
  - 移至独立包：`prop-types` 和 `create-react-class`。
  - 需手动安装并导入：

```js
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
```

- 自定义 DOM 属性不再被忽略：
  - 以前未知的 HTML 属性会被 React 忽略，现在会透传到 DOM 元素上（符合 HTML 标准）。
- `setState` 回调参数变化：
  - 在 `setState` 的回调中，`this` 不再自动绑定（需手动 `.bind(this)` 或使用箭头函数）。
- Hydration 不再尝试“修复”服务端与客户端的 markup 差异：
  - 如果 SSR 和客户端初始渲染不一致，React 会直接报错（而非静默修复），帮助开发者发现 bug。

### 3.9. 其他改进

- 减小了 bundle 体积（尽管功能更多）。
- 支持在 render 中返回 `null`、`boolean`、`string` 等类型（此前仅支持组件或元素）。

## 4. 🔗 引用

- [React v16.0.0 Release Notes][1]
- [React 16 博客文章（React Blog）][2]

[1]: https://github.com/facebook/react/releases/tag/v16.0.0
[2]: https://react.dev/blog/2017/09/26/react-v16.0
