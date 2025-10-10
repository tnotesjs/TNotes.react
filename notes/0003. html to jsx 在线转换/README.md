# [0003. html to jsx 在线转换](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0003.%20html%20to%20jsx%20%E5%9C%A8%E7%BA%BF%E8%BD%AC%E6%8D%A2)

<!-- region:toc -->

- [1. 🫧 评价](#1--评价)
- [2. 🔍 transform - html 转 jsx 在线转换器](#2--transform---html-转-jsx-在线转换器)
- [3. 💻 一个简单的 html to jsx 转换示例](#3--一个简单的-html-to-jsx-转换示例)
- [4. 🔗 引用](#4--引用)

<!-- endregion:toc -->

## 1. 🫧 评价

- 这篇笔记介绍了一个在线转换工具 `transform`，你可以使用它将 html 转换成 jsx。
- 了解有这么一个工具即可，实际开发时若真有类似的转换需求，直接丢给 AI 应该会更方便一些。

## 2. 🔍 transform - html 转 jsx 在线转换器

- 需求场景
  - 如果你 有大量的 HTML 需要移植到 JSX 中，你可以使用 [transform 在线转换器](https://transform.tools/html-to-jsx) 来实现快速转换。
  - 转换后的结果不一定就能直接照搬过去使用，但应该可以作为一个参考。
  - 根据转换后的结果来编写你的 JSX 模板，或许会比你挨个翻译 `html -> jsx` 快一些。
- [transform][1]
  - html 转 jsx 在线转换器。
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-15-48.png)

## 3. 💻 一个简单的 html to jsx 转换示例

::: code-group

```html [1️⃣ 转换前的 html]
<!-- Hello world -->
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>
<p>Enter your HTML here</p>
```

```js [2️⃣ 转换后得到的 jsx]
<>
  {/* Hello world */}
  <div className="awesome" style={{ border: '1px solid red' }}>
    <label htmlFor="name">Enter your name: </label>
    <input type="text" id="name" />
  </div>
  <p>Enter your HTML here</p>
</>
```

:::

## 4. 🔗 引用

- [transform][1]
- [transform GitHub 仓库][2]

[1]: https://transform.tools/html-to-jsx
[2]: https://github.com/ritz078/transform
