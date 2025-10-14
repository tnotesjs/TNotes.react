# [0019. 组件属性的传递和接收](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0019.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%A0%E9%80%92%E5%92%8C%E6%8E%A5%E6%94%B6)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 Props 是什么？](#3--props-是什么)
- [4. 💻 demos.1 - 组件属性的传递和接收](#4--demos1---组件属性的传递和接收)
- [5. 💻 demos.2 - 不同数据类型的属性传递](#5--demos2---不同数据类型的属性传递)
- [6. 🔗 引用](#6--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 认识组件属性
- 组件属性的传递和接收

## 2. 🫧 评价

- 组件属性是一个非常重要的知识点，也非常的简单，重点需要掌握属性的传递和接收，这是组件间互相通讯的主要方式之一。

```mermaid
graph LR
    A[父组件] -->|传递 Props| B[子组件]
    B -->|只读方式访问| C[Props 数据]
```

## 3. 🤔 Props 是什么？

- Props（properties 的缩写）允许父组件向子组件传递数据，实现了组件之间的通信机制。
- Props 是从父组件传递给子组件的数据。
- Props 是只读的
  - 子组件无权修改它们接收到的 props，这遵循了 React 的单向数据流原则
- Props 的值
  - 可以给任何名称的 props 传递任何 JavaScript 值，包括对象、数组和函数
  - 也可以直接传递 react 元素
- 属性的接收
  - 对于函数组件，属性会作为一个对象的属性，传递给函数的参数。
  - 对于类组件，属性会作为一个对象的属性，传递给构造函数的参数。
- 解构赋值：
  - 在函数组件中常用解构语法 `function Avatar({ person, size })` 来获取特定的 props
- JSX 展开语法：
  - 可以使用 `{...props}` 将对象的所有属性作为 props 传递给组件
- Props 默认值：
  - 可以通过解构赋值的默认值语法或 `defaultProps` 来设置默认值（注：现在更推荐前者）
- Props 机制构成了 React 组件化开发的基础，使得组件可以复用且具有良好的封装性。

## 4. 💻 demos.1 - 组件属性的传递和接收

<<< ./demos/1/assets/1.jsx

- ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-12-13-30.png)

## 5. 💻 demos.2 - 不同数据类型的属性传递

::: code-group

<<< ./demos/2/assets/1.jsx {13,19-24,39-44} [函数组件]

<<< ./demos/2/assets/2.jsx {7,20-25,40-45} [类组件]

:::

- ![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-12-14-32.png)

## 6. 🔗 引用

- [react 官方文档 - 将 Props 传递给组件][1]

[1]: https://zh-hans.react.dev/learn/passing-props-to-a-component
