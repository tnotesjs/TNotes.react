# [0049. 函数组件不同调用方式对比：组件式调用 vs. 函数式调用](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0049.%20%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E4%B8%8D%E5%90%8C%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F%E5%AF%B9%E6%AF%94%EF%BC%9A%E7%BB%84%E4%BB%B6%E5%BC%8F%E8%B0%83%E7%94%A8%20vs.%20%E5%87%BD%E6%95%B0%E5%BC%8F%E8%B0%83%E7%94%A8)

<!-- region:toc -->

- [1. 🫧 评价](#1--评价)
- [2. 💻 demos.1 - 组件式调用 `<Com />` vs. 函数式调用 `{Comp()}`](#2--demos1---组件式调用-com--vs-函数式调用-comp)

<!-- endregion:toc -->

## 1. 🫧 评价

- 以函数组件为例，在 jsx 中描述页面结构时，函数组件有两种调用方式：组件式调用 `<Com />` 和函数式调用 `{Comp()}`，该笔记主要介绍这两种调用方式的区别。
- 结论：优先使用组件式调用 `<Com />`。

## 2. 💻 demos.1 - 组件式调用 `<Com />` vs. 函数式调用 `{Comp()}`

::: code-group

```js [两种调用方式]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function MyFuncComp(props) {
  console.log('received props:', props)
  return <div>hello world</div>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyFuncComp a="1" b={2} c />
    {MyFuncComp({ a: '1', b: 2, c: true, d: false })}
  </StrictMode>
)
```

:::

- 相同点：页面上最终的渲染结果是一样的。
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-07-49-25.png)
- 控制台输出结果：
  - ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-07-49-33.png)
- React DevTools 仅能识别到 `<MyFuncComp a="1" b={2} c />` 组件。
  - ![图 2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-07-49-42.png)

::: code-group

```js [1️⃣ 组件式调用]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function MyFuncComp(props) {
  console.log('received props:', props)
  return <div>hello world</div>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyFuncComp a="1" b={2} c />
  </StrictMode>
)
/*
推荐的写法：JSX 渲染组件
这种写法会被 React 视作一个组件。

【1】在 StrictMode 中，组件函数会被额外调用一次（仅开发环境）：
- 额外调用的目的是帮助开发者排查一些潜在的问题，比如副作用（side effects）或不安全的生命周期方法。
- 详情可查阅官方文档对 StrictMode 的描述：https://react.dev/reference/react/StrictMode
- 普通函数调用不会触发这种双重调用机制，因此无法通过 StrictMode 检测到潜在问题。

【2】React 调试工具（如 React DevTools）支持：
- 在 React DevTools 中，能够检测到 React 组件的存在，并解析出组件树。
- 普通函数调用不会被 React DevTools 检测到，这意味着无法使用调试工具提供的功能。

【3】传递属性的方式：
- 传递属性的时候，采用组件的方式传递属性，而非函数调用的形式来传递参数。
- 属性会自动封装成一个 props 对象传递给组件。
- 这种方式更符合 React 的设计哲学，便于维护和扩展。
*/
```

```js [2️⃣ 函数式调用]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function MyFuncComp(props) {
  console.log('received props:', props)
  return <div>hello world</div>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>{MyFuncComp({ a: '1', b: 2, c: true, d: false })}</StrictMode>
)
/*
不推荐的写法：直接函数调用

这种写法是将 MyFuncComp 视作一个普通的函数调用，而不是 React 组件。
通常不会有人这么写（如果你不想收到来自你同事的亲切问候）。

【1】绕过 React 渲染机制：
- 直接函数调用会执行组件函数，但不会创建 React 组件实例。
- 这种方式虽然可以工作，但绕过了 React 的核心特性，容易引发不可预见的问题。

【2】缺乏调试支持：
- React DevTools 无法追踪直接函数调用的组件树，导致无法查看组件树或调试组件状态。

【3】命名和使用约定：
- 如果我们想要表达“这是一个组件”，应该采用大驼峰命名法（PascalCase），并使用 JSX 渲染它。
- 如果我们想要表达“这是一个普通函数”，则不应该使用大驼峰命名法，而是直接调用它。
*/
```

:::

- **Hook 执行差异**：
  - JSX 渲染：Hook 会被 React 正确追踪和管理（如 useState 保持状态）
  - 直接调用：Hook 每次都会重新初始化，无法保持状态一致性
- **特殊属性支持**：

| 特性       | 组件式调用 `<Comp />` | 函数式调用 `{Comp()}` |
| ---------- | --------------------- | --------------------- |
| `key`      | ✅                    | ❌                    |
| `ref`      | ✅                    | ❌                    |
| 上下文传递 | ✅                    | ❌                    |

- **渲染性能**：
  - 直接调用会跳过 React 的协调(reconciliation)过程
  - 可能导致不必要的重复渲染和性能下降
- **推荐的写法：1️⃣ 组件式调用**
  - 创建真正的 React 组件实例。
  - 符合 React 的设计理念，易于维护和扩展。
  - 支持 React 的核心特性（如生命周期、状态管理等）。
  - 能够被 React DevTools 检测到，方便调试。
  - 自动封装 `props`，减少手动操作。
  - 在 `StrictMode` 下会额外调用渲染函数（开发环境），帮助发现潜在问题。
  - 更加语义化，清晰地表达“这是一个组件”。
- **不推荐的写法：2️⃣ 函数式调用**
  - 将组件当作普通函数调用，绕过 React 的渲染机制。
  - 返回值是一个 React 元素（虚拟 DOM），但不会被 React 自动管理。
  - 不会创建组件实例（无状态保持能力）。
  - 缺乏 React 特性支持（如 `key`、`ref` 等）。
  - 无法被 React DevTools 检测到，难以调试。
  - Hook 会执行但行为不可预测。
  - 不符合 React 的最佳实践，容易引发代码混乱。
