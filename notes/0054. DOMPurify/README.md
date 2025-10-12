# [0054. DOMPurify](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0054.%20DOMPurify)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 `DOMPurify` 是什么？](#3--dompurify-是什么)
- [4. 💻 demos.1 - 使用 DOMPurify 净化 html 字符串](#4--demos1---使用-dompurify-净化-html-字符串)
- [5. 🔗 引用](#5--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- DOMPurify

## 2. 🫧 评价

- 可以使用 `DOMPurify` 库对插入的 html 字符串进行清理和转义，以预防在使用 `dangerouslySetInnerHTML` 时导致的 XSS 攻击。

## 3. 🤔 `DOMPurify` 是什么？

- DOMPurify
  - [npm][1]
  - [GitHub][2]
- DOMPurify 是一个用于防止 XSS (跨站脚本攻击) 的 JavaScript 库。
- 它通过清理不安全的 HTML 内容，确保只有安全的 HTML 元素和属性被保留，从而防止潜在的恶意脚本执行。
- 特点：
  - 速度很快
  - 可自行配置清理规则

## 4. 💻 demos.1 - 使用 DOMPurify 净化 html 字符串

<<< ./demos/1/assets/1.jsx

- `unsafeHtmlContent` 包含了一个带有恶意脚本的 HTML 字符串。
- 使用 `purify` 函数对 `unsafeHtmlContent` 进行净化，得到 `safeHtmlContent`。
- 使用 `dangerouslySetInnerHTML` 将净化后的内容插入到 `<div>` 中。
- 最终运行结果：
  - ![图 4](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-35-31.png)
  - ![图 5](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-35-43.png)
  - ![图 6](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-35-58.png)
  - 恶意脚本 `<script>alert("XSS attack!");</script>` 被 `DOMPurify` 移除了，从而防止了 XSS 攻击。

## 5. 🔗 引用

- DOMPurify
  - [npm][1]
  - [GitHub][2]

[1]: https://www.npmjs.com/package/dompurify
[2]: https://github.com/cure53/DOMPurify
