# [0061. React Element 与 React Fiber 的关系【扩展】](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0061.%20React%20Element%20%E4%B8%8E%20React%20Fiber%20%E7%9A%84%E5%85%B3%E7%B3%BB%E3%80%90%E6%89%A9%E5%B1%95%E3%80%91)

<!-- region:toc -->

- [1. 🫧 评价](#1--评价)
- [2. 🤔 回顾 React Element 是什么？](#2--回顾-react-element-是什么)
- [3. 🤔 什么是 React Fiber？](#3--什么是-react-fiber)
- [4. 🤔 Fiber 有什么作用？](#4--fiber-有什么作用)
- [5. 🤔 React Element 与 Fiber 的关系是？](#5--react-element-与-fiber-的关系是)
- [6. 🤔 Fiber Node 的结构是？（简化版）](#6--fiber-node-的结构是简化版)
- [7. 🤔 双 Fiber 树（Current Tree / Work-In-Progress Tree）是什么？](#7--双-fiber-树current-tree--work-in-progress-tree是什么)
- [8. 🤔 react 的渲染流程（从 Element 到 Fiber）是？](#8--react-的渲染流程从-element-到-fiber是)
- [9. 🤔 为什么 Fiber 是“异步可中断的”？](#9--为什么-fiber-是异步可中断的)
- [10. 📒 Element 与 Fiber 的对照总结](#10--element-与-fiber-的对照总结)

<!-- endregion:toc -->

## 1. 🫧 评价

- 很多人理解 React 到了 “Element” 这一层就止步了，但实际上 —— React 真正的核心是 Fiber。
- 写到 React Element 自然会想到 React Fiber，你可以先把这篇笔记当做一个扩展内容来看！即便你不知道 Fiber 也不会影响你写一些日常的业务逻辑。
- 后边在学习 Fiber 的时候，再介绍具体细节，比如：旧版的 Stack Reconciler 和新版的 Fiber Reconciler 之间的区别、时间切片（Time Slicing）、Fiber 结构、并发模式（Concurrent Mode）、…… 等内容。

## 2. 🤔 回顾 React Element 是什么？

- 先来看一个示例：

```jsx
const element = <div className="box">Hello</div>

// 会被 Babel 编译为类似下面这样的结构：

const element = React.createElement('div', { className: 'box' }, 'Hello')

// 最终得到一个 普通的 JavaScript 对象：
{
  type: 'div',
  props: {
    className: 'box',
    children: 'Hello'
  },
  key: null,
  ref: null,
  // ...其他内部属性
}
```

- 综上：
- `React Element` 是 UI 的静态描述；
- 它并不包含状态或行为；
- React 内部会根据它去创建更复杂的结构，用于协调、渲染和更新；
- 这个更复杂的结构，就是 Fiber Tree。

## 3. 🤔 什么是 React Fiber？

- Fiber 是 React 16 引入的新的协调引擎（Reconciliation Engine）。
- 它将每一个 React Element 转换成一个 可中断、可恢复的工作单元（work unit）。
- 换句话说：
  - React Element = 静态描述；
  - React Fiber = 动态执行单元。

## 4. 🤔 Fiber 有什么作用？

- Fiber 解决的核心问题是：React 需要在保持流畅用户体验的同时，高效地调度和更新 UI。
- 在 React 15 及之前，渲染和更新是 同步、不可中断 的：
  - 一旦开始渲染，就会一直执行到结束；
  - 页面在这期间会“卡顿”；
  - 对动画、输入等交互体验很差。
- React 16 用 Fiber 重写协调算法，实现了：
  - 可中断渲染；
  - 优先级调度（Scheduling）；
  - 增量渲染（Incremental Rendering）；
  - 错误边界（Error Boundaries）；
  - …… 等其他新特性。

## 5. 🤔 React Element 与 Fiber 的关系是？

- 一句话总结：React Element 是 UI 的“草图”，Fiber 是“施工计划”，DOM 是“建筑成品”。
- 用一个图可以很好地理解它们之间的关系：

```
JSX → React.createElement()
         ↓
     React Element Tree （静态描述）
         ↓
React Reconciler 解析 Element
         ↓
     Fiber Tree （动态结构，包含状态、任务信息）
         ↓
Renderer（DOM/Native）
         ↓
     真实 DOM 树
```

## 6. 🤔 Fiber Node 的结构是？（简化版）

- React 中每一个组件、DOM 元素、文本节点，都会有一个对应的 Fiber 节点。
- 每一个 Fiber 节点都是一个对象，包含了当前组件实例的各种运行信息：

```js
{
  type,           // 组件类型（Function、Class、HostComponent 等）
  key,            // 唯一标识
  stateNode,      // 对应的真实 DOM 或组件实例
  child,          // 第一个子 Fiber
  sibling,        // 下一个兄弟 Fiber
  return,         // 父 Fiber
  pendingProps,   // 即将生效的 props
  memoizedProps,  // 已经生效的 props
  memoizedState,  // 已经生效的 state
  alternate,      // 上一次渲染的 Fiber（形成双缓冲机制）
  flags,          // 当前节点需要执行的操作类型（插入、更新、删除等）
}
```

## 7. 🤔 双 Fiber 树（Current Tree / Work-In-Progress Tree）是什么？

- React 在运行时会维护两棵 Fiber 树：

| 名称                        | 作用                     | 备注             |
| --------------------------- | ------------------------ | ---------------- |
| Current Fiber Tree          | 当前屏幕上显示的 UI 状态 | 当前在渲染的结果 |
| Work-In-Progress Fiber Tree | 正在计算的新 UI 状态     | 下次更新的结果   |

- 当新的更新完成时：
  - React 会将 Work-In-Progress 树 “交换” 成新的 Current 树；
  - 旧的 Fiber 树则会被回收。
- 这种“双缓存”机制类似于：
  - “浏览器渲染两层画布，一层在显示，一层在绘制，绘制完后一次性切换。”
  - 它极大地提高了性能，并让渲染可以被中断与恢复。

## 8. 🤔 react 的渲染流程（从 Element 到 Fiber）是？

```jsx
// 示例：
function App() {
  return <div>Hello</div>
}
```

- 渲染流程如下：
- 初次渲染
  - JSX → React Element；
  - Reconciler 根据 Element 构建 Fiber Tree；
  - Renderer（如 React DOM）将 Fiber Tree 转换为真实 DOM；
  - 完成挂载；
- 更新阶段
  - 组件状态更新 → 生成新的 React Element；
  - Reconciler 对比新旧 Element Tree；
  - 找出差异（Diff）；
  - 复用 Fiber 节点或创建新 Fiber；
  - 更新 Work-In-Progress Tree；
  - 提交（Commit）阶段更新 DOM；
  - 双树交换；

## 9. 🤔 为什么 Fiber 是“异步可中断的”？

- Fiber 的最大创新是：将递归的 Reconciliation 改写为链表结构，使得 React 可以暂停、恢复、丢弃和重新执行任务。
- React Scheduler 可以：
  - 暂停低优先级的更新；
  - 先渲染更紧急的任务（如输入框输入）；
  - 渲染完再回到上次中断的地方继续执行；
- React Scheduler 是 React 18 引入 Concurrent Rendering（并发渲染） 的基础。

## 10. 📒 Element 与 Fiber 的对照总结

| 对比项          | React Element      | React Fiber                   |
| --------------- | ------------------ | ----------------------------- |
| 本质            | 静态描述（对象）   | 动态执行单元（对象）          |
| 创建时机        | JSX 编译后         | Reconciler 运行时             |
| 功能            | 描述 UI 结构       | 跟踪、调度、协调 UI 更新      |
| 是否可中断      | ❌ 不可中断        | ✅ 可中断 / 恢复              |
| 是否包含状态    | ❌ 无状态          | ✅ 包含 state 与 props 信息   |
| 生命周期        | 短暂的（一次渲染） | 持久的（跨多次渲染）          |
| 是否与 DOM 对应 | 间接对应           | 直接映射到真实 DOM 或组件实例 |
| 双缓冲机制      | ❌ 无              | ✅ 有（alternate 指针）       |

- 一句话概括两者关系：React Element 是 UI 的蓝图，React Fiber 是蓝图的施工工人。
  - JSX 生成 React Element Tree；
  - Reconciler 把 Element Tree 转换成 Fiber Tree；
  - Fiber Tree 承载调度、状态、Diff；
  - Renderer 最终把 Fiber 的结果渲染成 DOM Tree；
  - 每次更新，都会新建一棵 Work-In-Progress Fiber Tree；
  - 更新完成后，Fiber 树交替，UI 即时刷新。
- 形象比喻总结

| 层级          | 名称       | 比喻                       |
| ------------- | ---------- | -------------------------- |
| JSX           | 建筑设计稿 | 你写的 `<div>`、组件代码   |
| React Element | 静态图纸   | 设计图转成数据结构         |
| React Fiber   | 施工现场   | 工人根据图纸建造建筑       |
| DOM           | 成品建筑   | 最终渲染结果               |
| Scheduler     | 工地监工   | 控制工人施工顺序与暂停     |
| Renderer      | 装修队     | 把建好的框架渲染成可见界面 |
