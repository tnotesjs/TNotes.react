# [0017. 在 JSX 中书写内联样式 style](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0017.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%B9%A6%E5%86%99%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F%20style)

<!-- region:toc -->

- [1. 🫧 评价](#1--评价)
- [2. 🤔 如何在 JSX 中书写内联样式 style？](#2--如何在-jsx-中书写内联样式-style)
- [3. 💻 demos.1 - ❌ 错误写法 - 在 JSX 中的 style 写成字符串形式](#3--demos1----错误写法---在-jsx-中的-style-写成字符串形式)
- [4. 💻 demos.2 - ✅ 正确写法 - 采用对象的形式来写，属性名使用小驼峰的形式](#4--demos2----正确写法---采用对象的形式来写属性名使用小驼峰的形式)
- [5. 💻 demos.3 - 动态样式](#5--demos3---动态样式)

<!-- endregion:toc -->

## 1. 🫧 评价

- 本文介绍了在 JSX 中书写内联样式 style 的一些注意事项。

## 2. 🤔 如何在 JSX 中书写内联样式 style？

- 在 React 中使用 JSX 时，你可以通过 `style` 属性来直接应用内联样式到你的组件。
- 与 HTML 不同的是，在 JSX 中 `style` 属性需要一个 JavaScript 对象而不是 CSS 字符串。
- 这个对象的键通常采用驼峰命名法（camelCase），因为它们是作为 JavaScript 对象的属性，虽然采用 `-` 连接符（kebab-case）的属性名再包裹一层引号也是可以正常识别的，不过 react 会对此抛出警告。
- 如果你想要根据某些条件动态地改变样式，你可以在定义样式对象时使用表达式来控制样式的值。
- 注意：虽然内联样式非常方便，但大量使用可能会导致代码难以维护。对于更复杂的样式需求，推荐使用 CSS 类或 CSS-in-JS 库（如 styled-components 或 emotion）来实现。

## 3. 💻 demos.1 - ❌ 错误写法 - 在 JSX 中的 style 写成字符串形式

<<< ./demos/1/assets/1.jsx

- 直接将 JSX 中的 style 写成字符串形式插入会报错。

::: swiper

![报错](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-59-05.png)

:::

## 4. 💻 demos.2 - ✅ 正确写法 - 采用对象的形式来写，属性名使用小驼峰的形式

<<< ./demos/2/assets/1.jsx

- 最终渲染结果如下：
  - ![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-59-50.png)

## 5. 💻 demos.3 - 动态样式

<<< ./demos/3/assets/1.jsx

- 最终效果：
  - ![gif](./assets/1.gif)
- 提示：这部分涉及到组件状态相关的知识点。
- 注解：
  - MyDynamicComponent 组件根据传入的 isActive 属性动态设置样式，当 isActive 为 true 时文字显示为绿色粗体，否则为红色正常字体
  - App 组件使用 useState 管理 isActive 状态，并提供按钮来切换状态值
  - 点击 "Toggle Active State" 按钮会切换 isActive 的值，从而触发 MyDynamicComponent 组件的样式更新
  - 通过这种方式展示了如何根据组件状态动态改变内联样式，实现交互式的 UI 效果
