# [0006. react-modal](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0006.%20react-modal)

<!-- region:toc -->

- [1. 🫧 评价](#1--评价)
- [2. 🤔 react-modal 是什么？](#2--react-modal-是什么)
- [3. 🤔 `contentLabel` 属性有什么用？【扩展】](#3--contentlabel-属性有什么用扩展)
- [4. 🤔 为什么 `contentLabel` 对用户体验很重要？【扩展】](#4--为什么-contentlabel-对用户体验很重要扩展)
- [5. 💻 demos.1 - 认识 contentLabel 属性【扩展】](#5--demos1---认识-contentlabel-属性扩展)
- [6. 💻 demos.2 - 封装一个简单的 dialog 组件](#6--demos2---封装一个简单的-dialog-组件)
- [7. 🔗 引用](#7--引用)

<!-- endregion:toc -->

## 1. 🫧 评价

- `react-modal` 是一个使用起来非常简单的一个第三方组件，结合官方文档描述来使用即可。
- 该笔记中重点记录了一些 `react-modal` 的基本使用示例，以及在使用这个组件时比较模糊的一些知识点，比如 `contentLabel` 属性（它是用来做特殊用户的阅读体验优化的）。

## 2. 🤔 react-modal 是什么？

- `react-modal` 是一个常用的 React 弹出模态框库，它提供了许多配置选项来定制模态框的行为和样式。

## 3. 🤔 `contentLabel` 属性有什么用？【扩展】

- `contentLabel` 用于给模态框添加一个可访问性的标签（aria-label），以便屏幕阅读器和其他辅助技术能够更好地理解和描述模态框的内容。
- 可访问性（Accessibility）：`contentLabel` 用于为模态框添加一个描述性的标签，这个标签会被屏幕阅读器读取，帮助视障用户理解模态框的内容。这对于提高应用的可访问性非常重要。
- ARIA 标签：在 HTML 中，`aria-labelledby` 和 `aria-label` 属性用于提供额外的信息，帮助辅助技术（如屏幕阅读器）更好地理解和描述页面上的元素。`contentLabel` 会在模态框的 `role="dialog"` 元素上设置 `aria-label` 属性。

## 4. 🤔 为什么 `contentLabel` 对用户体验很重要？【扩展】

- 辅助技术兼容性：`contentLabel` 使得模态框更加兼容辅助技术，如屏幕阅读器。
- 用户体验：对于依赖屏幕阅读器的用户来说，清晰的标签可以提高用户体验。
- 合规性：遵循无障碍设计的最佳实践，确保你的应用符合 WCAG（Web Content Accessibility Guidelines）的要求。

## 5. 💻 demos.1 - 认识 contentLabel 属性【扩展】

- 下面是一个使用 react-modal 的简单示例：

<<< ./demos/1/assets/1.jsx

- 在这个的示例中 `contentLabel="Example modal dialog"` 为模态框提供了一个描述性的标签，告诉屏幕阅读器这是一个“示例模态对话框”。
- ![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-15-04-14-02.png)
- 当模态框打开时，屏幕阅读器会读取这个描述性的标签，帮助视障用户理解模态框的作用。

## 6. 💻 demos.2 - 封装一个简单的 dialog 组件

- 视口居中。
- 宽高可自定义。
- 内容区域可自定义。
- 关闭按钮可配置是否显示。
- 内容区域背景渐变。

<<< ./demos/2/assets/1.jsx

- ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-15-04-15-22.png)

## 7. 🔗 引用

- [npm react-modal][1]
- [github react-modal][2]

[1]: https://www.npmjs.com/package/react-modal?activeTab=readme
[2]: https://github.com/reactjs/react-modal
