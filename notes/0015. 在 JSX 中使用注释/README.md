# [0015. 在 JSX 中使用注释](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0015.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%B3%A8%E9%87%8A)

<!-- region:toc -->

- [1. 评价](#1-评价)
- [2. JSX 中的注释怎么写？](#2-jsx-中的注释怎么写)
- [3. demos.1 - `//` 是错误的注释格式](#3-demos1----是错误的注释格式)
- [4. demos.2 - 可以使用 `jsx-eslint` 检查错误的注释格式 `//`](#4-demos2---可以使用-jsx-eslint-检查错误的注释格式-)
- [5. 引用](#5-引用)

<!-- endregion:toc -->

## 1. 评价

- 掌握 jsx 中注释的写法。
- 掌握 jsx-eslint 配置 `react/jsx-no-comment-textnodes` - 用于自动检测错误的注释格式 `// ...`。

## 2. JSX 中的注释怎么写？

- 在 JSX 中使用注释的方式与在 JavaScript 中使用注释的方式有些不同。在 JSX 中，注释应该被包含在特殊的注释标签中，即 `{/* 这里边是注释内容 */}`。
- 注意：不要尝试以传统的 `//` 这种写法来注释 JSX 中的代码，这会被视作普通的字符串内容被渲染到页面上。

## 3. demos.1 - `//` 是错误的注释格式

<<< ./demos/1/1.html {26-33}

- 最终的渲染结果：
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-21-22.png)
- 上面这种写法是直接通过 cdn 的方式来引入相关资源写的一个 demo。也可以通过 pnpm create vite 来快速创建一个 react 工程来写 demo。

## 4. demos.2 - 可以使用 `jsx-eslint` 检查错误的注释格式 `//`

<<< ./demos/2/src/main.jsx {5-12}

- 在一些使用构建工具初始化的默认工程中，当你使用了错误的注释写法 `//` 时是会被检测出来的，这就是 eslint 在起作用。
- 你可以在 eslint.config.js 中配置忽略规则：

```js
"react/jsx-no-comment-textnodes": "off",
```

- 如果开启这个配置项的话，那么上述程序会报错。
  - ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-21-34.png)
- 可以这么理解，当你在 JSX 中出现 `// <p>description</p>` 这种写法时，并且开启了 `react/jsx-no-comment-textnodes` 检查，那么 eslint 会认为你希望注释掉这一行代码，但是你却使用了错误的格式 `//`，JSX 中注释只能使用 `{/* */}` 这种写法，因此 eslint 会检查到错误，并爆红提醒你。

## 5. 引用

- [react/jsx-no-comment-textnodes][1]
  - jsx-eslint - GitHub - Disallow comments from being inserted as text nodes (react/jsx-no-comment-textnodes)
  - jsx eslint 注释格式检测 - 禁止将注释作为文本节点插入 `react/jsx-no-comment-textnodes`

[1]: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
