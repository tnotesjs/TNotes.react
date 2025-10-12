# [0049. 函数组件不同调用方式](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0049.%20%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E4%B8%8D%E5%90%8C%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 💻 demos.1 - 组件式调用 `<Com />` vs. 函数式调用 `{Comp()}`](#3--demos1---组件式调用-com--vs-函数式调用-comp)
- [4. 🔗 引用](#4--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 函数组件不同调用方式对比：组件式调用 vs. 函数式调用

## 2. 🫧 评价

- 以函数组件为例，在 jsx 中描述页面结构时，函数组件有两种调用方式：组件式调用 `<Com />` 和函数式调用 `{Comp()}`，该笔记主要介绍这两种调用方式的区别。
- 先给结论：优先使用组件式调用 `<Com />`。

## 3. 💻 demos.1 - 组件式调用 `<Com />` vs. 函数式调用 `{Comp()}`

::: code-group

<<< ./demos/1/assets/3.jsx {11,12} [两种调用方式]

:::

1. 相同点：页面上最终的渲染结果是一样的。
2. 控制台输出结果
3. React DevTools 仅能识别到 `<MyFuncComp a="1" b={2} c />` 组件。

::: swiper

![1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-07-49-25.png)

![2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-07-49-33.png)

![3](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-07-49-42.png)

:::

---

::: code-group

<<< ./demos/1/assets/1.jsx [1. 组件式调用]

<<< ./demos/1/assets/2.jsx [2. 函数式调用]

:::

| 对比项 | ✅ 组件式调用 `<Comp />` | ❌ 函数式调用 `{Comp()}` |
| --- | --- | --- |
| React 实例 | 创建真正的 React 组件实例 | 不会创建组件实例 |
| 设计理念 | 符合 React 设计理念 | 不符合 React 设计理念 |
| 核心特性支持 | 支持生命周期、状态管理等 | 绕过 React 渲染机制，无状态保持能力 |
| 调试支持 | 可被 React DevTools 检测到 | 无法被 React DevTools 检测 |
| Props 处理 | 自动封装 props | 需要手动处理 props |
| StrictMode 支持 | 在 StrictMode 下正常工作 | 行为可能不可预测 |
| 语义化 | 清晰表达"这是一个组件" | 不符合组件化思想 |
| 维护性 | 易于维护和扩展 | 不符合 React 的最佳实践，容易引发代码混乱 |
| Hook 执行 | Hook 被 React 正确追踪和管理（如 useState 保持状态） | Hook 每次都会重新初始化，无法保持状态一致性 |
| 特殊属性支持 | 支持 key、ref、上下文传递 | 不支持 key、ref、上下文传递 |
| 渲染性能 | 正常参与 React 协调(reconciliation)过程 | 跳过 React 协调过程，可能导致不必要的重复渲染 |

::: warning

- 对比表格中罗列的对比项尚未全都核实，可能存在错误。

:::

## 4. 🔗 引用

- [React 官方文档 StrictMode][1]

[1]: https://react.dev/reference/react/StrictMode
