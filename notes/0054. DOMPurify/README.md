# [0054. DOMPurify](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0054.%20DOMPurify)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 📒 DOMPurify 简介](#2--dompurify-简介)
- [3. 💻 demos.1 - 使用 DOMPurify 净化 html 字符串](#3--demos1---使用-dompurify-净化-html-字符串)

<!-- endregion:toc -->

## 1. 📝 概述

- 可以使用 `DOMPurify` 库对插入的 html 字符串进行清理和转义，以防止 XSS 攻击。
- 在 react 中，可以结合 `dangerouslySetInnerHTML` 来处理 XSS 攻击问题。

## 2. 📒 DOMPurify 简介

- https://www.npmjs.com/package/dompurify
  - npm
- https://github.com/cure53/DOMPurify
  - github
- DOMPurify 是一个用于防止 XSS (跨站脚本攻击) 的 JavaScript 库。
- 它通过清理不安全的 HTML 内容，确保只有安全的 HTML 元素和属性被保留，从而防止潜在的恶意脚本执行。
- **特点：**
  - 速度很快
  - 可自行配置清理规则

## 3. 💻 demos.1 - 使用 DOMPurify 净化 html 字符串

```jsx
import React from 'react'
import DOMPurify from 'dompurify'

// 创建一个净化函数
const purify = (dirty) =>
  DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } }) // 使用默认的 HTML 清理配置

function MyComponent() {
  const unsafeHtmlContent =
    '<p>This is a <strong>bold</strong> text. <script>alert("XSS attack!");</script></p>'
  const safeHtmlContent = purify(unsafeHtmlContent)

  return <div dangerouslySetInnerHTML={{ __html: safeHtmlContent }} />
}

export default MyComponent
```

- `unsafeHtmlContent` 包含了一个带有恶意脚本的 HTML 字符串。
- 使用 `purify` 函数对 `unsafeHtmlContent` 进行净化，得到 `safeHtmlContent`。
- 使用 `dangerouslySetInnerHTML` 将净化后的内容插入到 `<div>` 中。
- 最终运行结果：
  - ![图 4](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-35-31.png)
  - ![图 5](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-35-43.png)
  - ![图 6](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-35-58.png)
  - 恶意脚本 `<script>alert("XSS attack!");</script>` 被 `DOMPurify` 移除了，从而防止了 XSS 攻击。
