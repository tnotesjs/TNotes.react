# [0019. 组件属性的传递和接收](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0019.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%A0%E9%80%92%E5%92%8C%E6%8E%A5%E6%94%B6)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 💻 demos.1 - 组件属性的传递和接收](#3--demos1---组件属性的传递和接收)
- [4. 💻 demos.2 - 不同数据类型的属性传递](#4--demos2---不同数据类型的属性传递)
- [5. 🔗 引用](#5--引用)

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

## 3. 💻 demos.1 - 组件属性的传递和接收

<<< ./demos/1/assets/1.jsx

- ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-12-13-30.png)

## 4. 💻 demos.2 - 不同数据类型的属性传递

::: code-group

<<< ./demos/2/assets/1.jsx {13,19-24,39-44} [函数组件]

<<< ./demos/2/assets/2.jsx {7,20-25,40-45} [类组件]

:::

- ![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-12-14-32.png)

## 5. 🔗 引用

- [react 官方文档 - 将 Props 传递给组件][1]

[1]: https://zh-hans.react.dev/learn/passing-props-to-a-component
