# [0019. 组件属性的传递和接收](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0019.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%A0%E9%80%92%E5%92%8C%E6%8E%A5%E6%94%B6)

<!-- region:toc -->

- [1. 🫧 评价](#1--评价)
- [2. 💻 demos.1 - 组件属性的传递和接收](#2--demos1---组件属性的传递和接收)
- [3. 💻 demos.2 - 不同数据类型的属性传递](#3--demos2---不同数据类型的属性传递)

<!-- endregion:toc -->

## 1. 🫧 评价

- Props 是从父组件传递给子组件的数据。
- 属性是只读的，意味着子组件不能修改接收到的 props。
- 对于函数组件，属性会作为一个对象的属性，传递给函数的参数。
- 对于类组件，属性会作为一个对象的属性，传递给构造函数的参数。

## 2. 💻 demos.1 - 组件属性的传递和接收

<<< ./demos/1/assets/1.jsx {5,11,19,20}

- 最终结果：
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-12-13-30.png)

## 3. 💻 demos.2 - 不同数据类型的属性传递

::: code-group

<<< ./demos/2/assets/1.jsx {13,19-24,39-44} [函数组件]

<<< ./demos/2/assets/2.jsx {7,20-25,40-45} [类组件]

:::

- ![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-12-14-32.png)
