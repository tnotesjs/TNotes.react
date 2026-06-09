# [0060. react v19](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0060.%20react%20v19)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. react v19 都有哪些重大更新？（待整理）](#3-react-v19-都有哪些重大更新待整理)
  - [3.1. 核心主题 — Actions（扩展的 Transition）与更深的表单/服务器集成](#31-核心主题--actions扩展的-transition与更深的表单服务器集成)
  - [3.2. 新的 Hook / API](#32-新的-hook--api)
  - [3.3. React DOM 客户端（表单/资源/脚本/样式相关的改进）](#33-react-dom-客户端表单资源脚本样式相关的改进)
  - [3.4. 服务端渲染 / Server Components / 静态生成](#34-服务端渲染--server-components--静态生成)
  - [3.5. 重要行为变化 / Strict Mode & 运行时注意事项](#35-重要行为变化--strict-mode--运行时注意事项)
  - [3.6. 被移除 / 弃用（Breaking changes & Removals — 要认真对待）](#36-被移除--弃用breaking-changes--removals--要认真对待)
  - [3.7. TypeScript 改动与 Codemod（实操建议）](#37-typescript-改动与-codemod实操建议)
  - [3.8. 升级建议（实践步骤）](#38-升级建议实践步骤)
  - [3.9. 常见迁移片段（示例）](#39-常见迁移片段示例)
  - [3.10. 总结](#310-总结)
- [4. 引用（官方原文）](#4-引用官方原文)

<!-- endregion:toc -->

## 1. 本节内容

- react v19 的重大更新

## 2. 评价

- 快速了解 react v19 的一些重大变更

## 3. react v19 都有哪些重大更新？（待整理）

- 以下内容基于 React v19 官方 Release Notes + React 团队的博客/升级指南 的梳理与解读

### 3.1. 核心主题 — Actions（扩展的 Transition）与更深的表单/服务器集成

- React 19 的中心思想之一是把“异步动作（Actions）”作为渲染与数据交互的第一类公民：`startTransition` 现在可以接受 async 函数（Action），Action 可在后台执行副作用（例如 `fetch()`）、支持错误处理、支持乐观更新，并由 React 管理 pending 状态与最终 commit。这个设计把常见的「提交 → 请求 → 更新 UI（含 pending / error / optimistic）」流程纳入渲染模型，从而简化了许多常见模式（尤其是表单、CRUD 场景）。
- 简短示例：

```js
import { useTransition } from 'react'

function onSubmit(data) {
  startTransition(async () => {
    // 这是一个 Action：可以 await 请求、抛错、做乐观更新等
    await api.update(data)
  })
}
```

### 3.2. 新的 Hook / API

- `startTransition` 可以接受 async 函数（Action），Transition 可以包含多个 Actions。
- `useActionState`：把 Action 封装成可复用的提交函数，返回 [data/error, actionFn, pending]，非常适合表单场景。
- `useOptimistic`：用于乐观更新 —— 在 Transition 进行时立即渲染预期值，Transition 完成或回滚时自动恢复/最终同步。
- `use`：可以在 render 中读取 promise 或 Context；传入 promise 会导致组件 suspend，React 会等待该 promise resolve。注意：不能传入在 render 中新创建的 promise（必须由 Suspense 兼容的库/框架缓存提供）。
- `ref` 现在可以作为普通 prop 传递（`ref` as a prop），在很多场景下减少了对 `forwardRef` 的需要。
- `useFormStatus`（来自 `react-dom`）：读取父 `<form>` 的状态（pending、data、method、action），方便设计系统内的组件读取 form 状态而不用层层透传 props。

### 3.3. React DOM 客户端（表单/资源/脚本/样式相关的改进）

- `<form action>` / `<input formAction>` / `<button formAction>`：现在可以把函数传给 `action` / `formAction`，React 会把它当作 Action 自动提交、管理 pending 状态并在成功后自动重置非受控表单，另提供 `requestFormReset` 来手动触发重置。非常贴合 progressive enhancement + 全栈 React 的使用模式。
- Document metadata 原生支持：React 能在组件树中渲染 metadata（头部标签），并把它们提升到 `<head>`。
- 样式表（stylesheets）支持：当某个 Suspense 边界依赖于样式表时，React 会确保相关 stylesheet 在 reveal 之前被插入到 `<head>`，减少闪烁/样式失配。
- 支持 async scripts、以及资源预加载 API（`preinit`, `preload`, `prefetchDNS`, `preconnect`），用于优化首屏加载和预取场景。

### 3.4. 服务端渲染 / Server Components / 静态生成

- 新增 `prerender` 与 `prerenderToNodeStream`（面向静态站点生成，等待数据加载再生成 HTML，适配 Node Streams / Web Streams）。
- React Server Components（RSC）相关特性（directives、server components、server functions）进入稳定（stable），第三方库可以将 RSC 作为 peer dependency 面向 React 19 发布。但注意：实现 RSC 的底层工具链 API 在 minor 版本内可能不完全遵守 semver（打包/bundler 相关的接口可能在小版本间变化）。

### 3.5. 重要行为变化 / Strict Mode & 运行时注意事项

- New JSX Transform 现在是必须的（React 19 引入的若干性能与语法改进依赖新版的 JSX transform）。如果你的构建链仍在用旧 transform，需要先升级工具链。
- 严格模式（StrictMode）在开发环境下继续加强检查：比如 `useMemo` / `useCallback` 在第二次渲染时会重用第一个渲染的 memoized 结果；ref callback 在初次 mount 时会 double-invoke（开发环境用于发现副作用）。
- 错误处理变更：渲染中的未被 Error Boundary 捕获的错误不再被重新抛出，而是通过 `window.reportError` 报告；对已被 Error Boundary 捕获的错误则会通过 `console.error`。`createRoot` / `hydrateRoot` 新增 `onUncaughtError` 与 `onCaughtError` 选项以自定义这类行为。

### 3.6. 被移除 / 弃用（Breaking changes & Removals — 要认真对待）

React 19 移除了许多长期已被标记为遗留或弃用的 API（请务必在升级前审查并 codemod）：

- 删除 / 移除（重要）：`ReactDOM.render`、`ReactDOM.hydrate`（改用 `createRoot` / `hydrateRoot`），`unmountComponentAtNode` → `root.unmount()`。
- `propTypes`：使用将被忽略（建议迁移到 TypeScript 或其他类型检查方案）。
- `defaultProps`（对函数组件）被移除（函数默认参数取代）；类组件仍然支持 `defaultProps`。
- `contextTypes` / `getChildContext`（旧的 class 组件 Legacy Context）被移除；字符串 refs 被移除；`React.createFactory` 被移除；`react-dom/test-utils` 大部分工具已移出（`act` 已移动到 `react`）。
- UMD 构建被移除：要通过 ESM CDN（如 esm.sh）或 ESM 包来使用 React。

> 小结：如果你的代码库里还存在老式的 string refs、legacy context、或依赖 `propTypes` 做运行时逻辑，升级前必须替换或移除，否则会被无声忽略或产生错误。

### 3.7. TypeScript 改动与 Codemod（实操建议）

- React 19 移除/调整了一批 TypeScript 类型（例如 `ReactChild`、`ReactFragment`、`ReactText` 等），官方提供了 codemod（`npx types-react-codemod@latest preset-19 ./path-to-your-react-ts-files`）来帮助自动化迁移。
- refs 行为的类型严格化：不允许隐式返回非函数的值作为 ref cleanup；要求 `useRef` 传入初始参数等。注意这些改动会影响严格类型检查。

### 3.8. 升级建议（实践步骤）

官方建议的升级路径（摘要）：

1. 先升级到 React 18.3.1（这是一个与 18.2 行为相同但会对将被移除的 API 添加警告的版本），用以提前暴露兼容性问题。
2. 阅读并按照 React 19 Upgrade Guide 执行 codemods（TypeScript codemod、其他自动替换脚本）并修复警告/错误。([react.dev][3])
3. 重点扫描并替换：`propTypes` 依赖、string refs、legacy context、`ReactDOM.render` 的调用、任何使用 `react-dom/test-utils` 的测试工具（迁移到 `react` 的 `act` 或使用 React Testing Library）。
4. 在大型应用中，考虑分阶段升级并在 CI 中强制运行 codemod 以降低手工错误。

### 3.9. 常见迁移片段（示例）

替换旧 `ReactDOM.render` → 新 root API（示例）：

```js
// React 17 及更早（已移除于 v19）
// ReactDOM.render(<App />, container)

// React 18+ 推荐（v19 要使用 createRoot/hydrateRoot）
import { createRoot } from 'react-dom/client'

const root = createRoot(container, {
  onUncaughtError(error) {
    /* 可选：自定义未捕获错误处理 */
  },
})
root.render(<App />)
```

（注意：v19 已移除旧 API，请确保移除所有对旧 API 的直接调用。）

### 3.10. 总结

- 主轴：把「Action（异步 Transition）+ 表单/服务器集成」作为一等公民，极大简化表单提交、乐观更新、错误处理等常见流程。
- 工具链影响：必须采纳新版 JSX transform、处理若干移除项（propTypes、string refs、旧 context 等）、并使用官方 codemod 迁移 TypeScript 类型。
- 升级建议：先到 `18.3.1` 检查并修复警告，再按 Upgrade Guide + codemod 分阶段迁移。

## 4. 引用（官方原文）

- [GitHub][1]
  - React 官方 Release Notes（GitHub v19.0.0）。
- [react.dev][2]
  - React 团队博客：React v19（feature 详解与示例）。
- [react.dev][3]
  - React v19 Upgrade Guide（含 codemod / 迁移步骤）。

[1]: https://github.com/facebook/react/releases/tag/v19.0.0
[2]: https://react.dev/blog/2024/04/25/react-19
[3]: https://react.dev/blog/2024/04/25/react-19-upgrade-guide
