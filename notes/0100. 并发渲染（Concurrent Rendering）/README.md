# [0100. 并发渲染（Concurrent Rendering）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0100.%20%E5%B9%B6%E5%8F%91%E6%B8%B2%E6%9F%93%EF%BC%88Concurrent%20Rendering%EF%BC%89)

<!-- region:toc -->

- [1. 评价](#1-评价)
- [2. before v18 - `ReactDOM.render` 的局限性](#2-before-v18---reactdomrender-的局限性)
- [3. after v18 - `ReactDOM.createRoot` 的优势](#3-after-v18---reactdomcreateroot-的优势)
- [4. 引用](#4-引用)

<!-- endregion:toc -->

## 1. 评价

- 并发渲染（**Concurrent Rendering**）是 React 18 引入的一项核心特性，它的目标是提升应用的 **响应性和性能**，特别是在处理复杂 UI 或长任务时。
- 如果你正在使用 React 18 或以上版本，建议全面迁移到 `createRoot` 以启用并发模式带来的优化和新特性。
- 并发模式是一种新的 **调度机制**，它允许 React 在渲染过程中：
  - **中断和恢复工作**：React 可以暂停正在进行的渲染任务，优先处理更高优先级的任务（例如用户输入）。
  - **分批更新**：将多个状态更新合并为一次渲染，减少不必要的重渲染。
  - **避免阻塞主线程**：让页面保持响应，不会因为长时间渲染导致“卡顿”。

| 特性         | `ReactDOM.render` | `ReactDOM.createRoot` + 并发渲染 |
| ------------ | ----------------- | -------------------------------- |
| 渲染方式     | 同步、阻塞式      | 异步、可中断                     |
| 支持并发特性 | ❌ 不支持         | ✅ 支持                          |
| 是否推荐使用 | ❌ 已废弃         | ✅ 推荐使用                      |

```js
// React 17 及以前
import ReactDOM from 'react-dom'
ReactDOM.render(<App />, document.getElementById('root'))

// React 18 + Concurrent Mode
import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById('root'))
root.render(<App />)
```

## 2. before v18 - `ReactDOM.render` 的局限性

- 旧版 `ReactDOM.render` 是同步、阻塞式的渲染方式，一旦开始渲染，就必须等它完成才能执行其他操作。
- 这在并发场景下显得不够灵活，也无法支持上述特性。
- Before React 18, rendering was a single, uninterrupted, synchronous transaction and once rendering started, it couldn’t be interrupted.
  - 在 React 18 之前，渲染是单一、不可中断的同步事务，一旦开始便无法中止。
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-13-46-02.png)

## 3. after v18 - `ReactDOM.createRoot` 的优势

- 使用 `createRoot` 创建的根节点，默认就启用了并发模式，可以利用以下能力：
  - 支持 **Suspense**（异步加载组件）
  - 支持 **useTransition** 和 **useDeferredValue** 等新 Hook
  - 更好的错误边界和渲染控制
- Concurrency is a foundational update to React’s rendering mechanism. Concurrency allows React to interrupt rendering.
  - 并发机制是对 React 渲染架构的基础性升级，它使渲染过程具备可中断能力。
  - ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-13-47-17.png)

## 4. 引用

- https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
- https://react.dev/reference/react/Suspense
- https://www.freecodecamp.org/news/react-18-new-features/
