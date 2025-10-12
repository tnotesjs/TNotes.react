# [0016. dangerouslySetInnerHTML](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0016.%20dangerouslySetInnerHTML)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 `dangerouslySetInnerHTML` 是什么？](#3--dangerouslysetinnerhtml-是什么)
- [4. 🤔 什么时候需要用到 `dangerouslySetInnerHTML`？](#4--什么时候需要用到-dangerouslysetinnerhtml)
- [5. 🔍 跟安全相关的注意事项](#5--跟安全相关的注意事项)
- [6. 💻 demos.1 - dangerouslySetInnerHTML 的基本使用](#6--demos1---dangerouslysetinnerhtml-的基本使用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- `dangerouslySetInnerHTML`

## 2. 🫧 评价

- 在 JSX 中，使用 `dangerouslySetInnerHTML` 可以在组件中直接插入 html 标签。
- `dangerouslySetInnerHTML` 是一个强大的工具，但在使用时必须非常谨慎。始终确保插入的内容是安全的，并尽可能使用专门的库来处理潜在的恶意代码。通过这种方式，你可以充分利用 `dangerouslySetInnerHTML` 的功能，同时保持应用的安全性。

## 3. 🤔 `dangerouslySetInnerHTML` 是什么？

- `dangerouslySetInnerHTML` 是 React 中的一个特殊属性，它允许你直接设置一个元素的 `innerHTML`。
- `dangerouslySetInnerHTML` 的值是一个对象，该对象有一个 `__html` 属性，其值是要插入的 HTML 字符串。
- 防止注入攻击
  - `dangerouslySetInnerHTML` 这个属性的名字中的“危险”一词强调了使用这个属性时需要特别小心，因为它可能会导致跨站脚本（XSS）攻击等安全问题。
  - React 默认情况下会将注入的字符串（可能来自用户输入的内容）作为纯文本处理，而不是解析为 HTML。（即便这个字符串应该是可以成功解析为真实 DOM 的，比如 `<strong>bold</strong>`。）
  - `dangerouslySetInnerHTML` 将 html 字符串视作真实 DOM 来处理。
- 避免滥用：
  - 尽量减少 `dangerouslySetInnerHTML` 的使用，只在确实需要的时候使用。
  - 大多数情况下，通过 JSX 和 React 组件来构建 UI 是更安全和推荐的方式。

## 4. 🤔 什么时候需要用到 `dangerouslySetInnerHTML`？

- 在某些情况下，你可能需要将一段 HTML 字符串插入到你的 React 组件中。例如：
  - 从富文本编辑器接收的内容。
  - 从服务器获取的包含 HTML 标签的数据。
  - 动态生成的 HTML 内容。
- 因此，当你需要插入 HTML 内容（而非被编码后的普通字符串）时，就需要使用 `dangerouslySetInnerHTML`。

## 5. 🔍 跟安全相关的注意事项

- XSS 攻击：
  - 如果插入的 HTML 内容来自用户输入或不可信来源，可能会包含恶意脚本，导致 XSS 攻击。
  - 因此，在使用 `dangerouslySetInnerHTML` 时，必须确保内容是安全的。
- 内容转义：
  - 如果你不确定内容是否安全，可以先对内容进行转义处理。
  - 可以使用一些库如 `DOMPurify` 来清理和转义潜在的恶意代码。

## 6. 💻 demos.1 - dangerouslySetInnerHTML 的基本使用

::: code-group

<<< ./demos/1/assets/1.jsx {} [1]

<<< ./demos/1/assets/2.jsx {} [2]

:::

- 以下是 1、2 的最终渲染结果和真实 DOM 结构：

::: swiper

![1-1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-34-16.png)

![1-2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-34-26.png)

![2-1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-34-35.png)

![2-2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-34-45.png)

:::
