# [0046. JSX 元素的正确使用及常见错误示例【扩展】](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0046.%20JSX%20%E5%85%83%E7%B4%A0%E7%9A%84%E6%AD%A3%E7%A1%AE%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%E7%A4%BA%E4%BE%8B%E3%80%90%E6%89%A9%E5%B1%95%E3%80%91)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 💻 demos.1 - JSX 元素的正确使用及常见错误示例](#3--demos1---jsx-元素的正确使用及常见错误示例)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- jsx 中元素引用的多种写法

## 2. 🫧 评价

- 重点记住 -> 元素引用规则

| 类型         | ✅ 正确引用方式 | ❌ 错误引用方式  |
| ------------ | --------------- | ---------------- |
| JSX 元素变量 | `{elementVar}`  | `<elementVar />` |
| 函数组件     | `<Component />` | `{Component}`    |

## 3. 💻 demos.1 - JSX 元素的正确使用及常见错误示例

::: code-group

<<< ./demos/1/assets/1.jsx {4} [1✨]

<<< ./demos/1/assets/2.jsx {4} [2]

<<< ./demos/1/assets/3.jsx {4} [3]

<<< ./demos/1/assets/4.jsx {4-7} [4️✨]

<<< ./demos/1/assets/5.jsx {4-7} [5️]

:::

- 最佳实践总结：
- 使用 `const element = <div>...</div>` + `{element}` 存储和引用 JSX 片段
- 组件使用大驼峰命名：`const MyComponent = () => ...` + `<MyComponent />`
- 函数组件在条件渲染时可灵活采用 `{Component()}` 的形式
