# [0002. react 组件名的命名规则](https://github.com/Tdahuyou/TNotes.react/tree/main/notes/0002.%20react%20%E7%BB%84%E4%BB%B6%E5%90%8D%E7%9A%84%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99)

<!-- region:toc -->

- [1. 🔍 查看 react 官方对组件名的命名规则的描述](#1--查看-react-官方对组件名的命名规则的描述)
- [2. 💻 demos.1 - react 组件名的命名规则](#2--demos1---react-组件名的命名规则)

<!-- endregion:toc -->

## 1. 🔍 查看 react 官方对组件名的命名规则的描述

- https://react.dev/learn
- 官方原话：
  - **React component names must always start with a capital letter, while HTML tags must be lowercase.**
  - ![图 0](https://cdn.jsdelivr.net/gh/Tdahuyou/imgs@main/2025-06-24-21-44-59.png)

## 2. 💻 demos.1 - react 组件名的命名规则

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function MyButton() {
  return <button>I'm a button</button>
}

function App() {
  return (
    <>
      <h1>Welcome to my app</h1>
      <MyButton />

      {/* ❌ */}
      {/* 如果将 h1 改为 H1 会报错 Uncaught ReferenceError: H1 is not defined */}
      {/* <H1>Welcome to my app</H1> */}

      {/* ❌ */}
      {/* 组件名必须以大写字母开头，否则会报错：
      Warning: <myButton /> is using incorrect casing.
      Use PascalCase for React components, or lowercase for HTML elements. */}
      {/* <myButton /> */}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- `<h1>` 是 html 的标签，在使用的时候必须以小写开头，如果使用大写的 `<H1>` 会报错。
- `<MyButton>` 是自定义的组件，在使用的时候必须以大写开头，如果使用小写开头 `<myButton>` 会警告。
