# [0059. react v18](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0059.%20react%20v18)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. react v18 都有哪些重大更新？（待整理）](#3-react-v18-都有哪些重大更新待整理)
  - [3.1. 🚀 核心主题：并发渲染（Concurrent Rendering）正式落地](#31--核心主题并发渲染concurrent-rendering正式落地)
  - [3.2. 新的 Root API：`createRoot`（强制升级点）](#32-新的-root-apicreateroot强制升级点)
  - [3.3. 自动批处理（Automatic Batching）](#33-自动批处理automatic-batching)
  - [3.4. 新 API：`startTransition`（标记非紧急更新）](#34-新-apistarttransition标记非紧急更新)
  - [3.5. `useDeferredValue` Hook](#35-usedeferredvalue-hook)
  - [3.6. Streaming SSR with Suspense（流式服务端渲染）](#36-streaming-ssr-with-suspense流式服务端渲染)
  - [3.7. `useId` Hook（服务端/客户端 ID 同步）](#37-useid-hook服务端客户端-id-同步)
  - [3.8. 严格模式（Strict Mode）增强](#38-严格模式strict-mode增强)
  - [3.9. Breaking Changes & 注意事项](#39-breaking-changes--注意事项)
  - [3.10. 其他改进](#310-其他改进)
  - [3.11. 总结](#311-总结)
- [4. 引用](#4-引用)

<!-- endregion:toc -->

## 1. 本节内容

- react v18 的重大更新

## 2. 评价

- 快速了解 react v18 的一些重大变更

## 3. react v18 都有哪些重大更新？（待整理）

- 以下是基于 [React v18.0.0 官方 Release Notes][1] 的核心变更总结。
- React v18 于 2022 年 3 月 29 日正式发布，是继 React 16（Fiber）之后又一个重大里程碑版本。
- 它正式引入了 并发渲染（Concurrent Rendering） 能力，并带来一系列新 API 和行为优化，显著提升用户体验和开发体验。

### 3.1. 🚀 核心主题：并发渲染（Concurrent Rendering）正式落地

React 18 默认启用可中断、可优先级调度的渲染机制，使应用能更流畅地响应用户交互（如输入、滚动），即使在执行复杂更新时也不会卡顿。

> ⚠️ 注意：并发是 React 内部的实现机制，不是开发者直接调用的 API，但新 API（如 `startTransition`）可让你主动利用并发能力。

### 3.2. 新的 Root API：`createRoot`（强制升级点）

React 18 废弃了旧的 `ReactDOM.render`，引入新的 `createRoot` API 以启用并发特性：

```js
// ❌ 旧方式（React 17 及之前）
ReactDOM.render(<App />, container)

// ✅ 新方式（React 18+）
const root = ReactDOM.createRoot(container)
root.render(<App />)
```

- 为什么？
  - 旧 API 无法启用并发渲染、自动批处理等新特性。
- 兼容性：
  - `ReactDOM.render` 在 React 18 中仍可用（但会警告），React 19 将彻底移除它。

### 3.3. 自动批处理（Automatic Batching）

- 问题：在 React 17 中，只有 React 事件（如 `onClick`）内的多个 `setState` 会被批处理；Promise、setTimeout、原生事件中的 `setState` 会分别触发重渲染。
- React 18 改进：所有更新（包括异步回调、原生事件）默认自动批处理，大幅减少不必要的渲染。

```js
// React 17: 触发 2 次渲染
setTimeout(() => {
  setCount((c) => c + 1)
  setFlag((f) => !f)
}, 0)

// React 18: 自动批处理 → 仅 1 次渲染
```

- 如需退出批处理：使用 `flushSync`（谨慎使用）：

```js
import { flushSync } from 'react-dom'
flushSync(() => {
  setCount((c) => c + 1)
})
```

### 3.4. 新 API：`startTransition`（标记非紧急更新）

允许你将状态更新标记为 “过渡（Transition）” —— 即非紧急、可中断的更新，避免阻塞高优先级任务（如用户输入）。

```js
import { startTransition } from 'react'

// 紧急更新（立即响应）
setInputValue(input)

// 非紧急更新（可被中断）
startTransition(() => {
  setSearchQuery(input)
})
```

- 典型场景：搜索框输入过滤列表、路由切换等。
- 配合 Suspense：过渡中的内容可显示 fallback UI。

### 3.5. `useDeferredValue` Hook

用于延迟渲染部分 UI，避免因快速变化的值（如输入框）导致频繁重渲染。

```js
const deferredSearchTerm = useDeferredValue(searchTerm)
// deferredSearchTerm 会滞后于 searchTerm，但不会阻塞输入
```

- 常与 `React.memo` 或 `useMemo` 结合优化性能。

### 3.6. Streaming SSR with Suspense（流式服务端渲染）

React 18 引入 `<Suspense>` 在 SSR 中的支持，实现：

- HTML 流式传输：先发送 shell，再逐步填充内容。
- 选择性 hydration：客户端可优先 hydrate 可见区域，提升首屏交互速度。

```jsx
// 服务端
;<Layout>
  <Suspense fallback={<Spinner />}>
    <Comments />
  </Suspense>
</Layout>

// 客户端
const root = ReactDOM.hydrateRoot(container, <App />)
```

- 新 API：`renderToPipeableStream`（Node.js） / `renderToReadableStream`（Web Streams）。

### 3.7. `useId` Hook（服务端/客户端 ID 同步）

生成唯一、稳定、可复现的 ID，解决 SSR 与客户端 hydration 不匹配问题（尤其用于 `<label htmlFor={id}>` + `<input id={id}>`）。

```js
const id = useId() // 如 "r1_"
return (
  <>
    <label htmlFor={id}>Name</label>
    <input id={id} />
  </>
)
```

### 3.8. 严格模式（Strict Mode）增强

在开发环境下，React 18 的 `<StrictMode>` 会：

- 自动模拟组件卸载再挂载（验证 effect 清理逻辑）。
- 重复调用某些函数（如 `useState` 初始化函数），帮助发现副作用问题。

> 💡 目的是提前暴露并发渲染下的潜在 bug。

### 3.9. Breaking Changes & 注意事项

1. `ReactDOM.render` 被废弃 → 必须迁移到 `createRoot` 才能使用新特性。
2. `hydrate` 被 `hydrateRoot` 替代（用于 SSR）。
3. `useSyncExternalStore`（用于外部状态库如 Redux）需适配新 hydration 行为。
4. `useEffect` 在严格模式下会执行两次（开发环境），确保清理逻辑正确。

### 3.10. 其他改进

- 更小的 bundle 体积（相比 React 17）。
- 改进错误边界恢复逻辑。
- 支持 Web Components 更友好。

### 3.11. 总结

> React 18 是“并发时代”的开端：
>
> - 通过 `createRoot` 启用新渲染器。
> - 利用 `startTransition` / `useDeferredValue` 优化用户体验。
> - 借助流式 SSR + Suspense 提升首屏性能。
> - 所有新项目应直接使用 React 18+，旧项目建议尽快迁移 `createRoot`。

## 4. 引用

- [React v18.0.0 Release Notes][1]
- [React 18 Upgrade Guide][2]
- [React 18 官方博客][3]

[1]: https://github.com/facebook/react/releases/tag/v18.0.0
[2]: https://react.dev/blog/2022/03/08/react-18-upgrade-guide
[3]: https://react.dev/blog/2022/03/29/react-v18
