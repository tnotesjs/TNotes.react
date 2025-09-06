# [0014. React.Fragment](https://github.com/Tdahuyou/TNotes.react/tree/main/notes/0014.%20React.Fragment)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 📒 `React.Fragment`](#2--reactfragment)
- [3. 🤔 为什么使用 `React.Fragment`？](#3--为什么使用-reactfragment)
- [4. ⚠️ 注意事项 - 列表渲染的 `key` 值问题](#4-️-注意事项---列表渲染的-key-值问题)
- [5. 💻 demos.1 - `React.Fragment` 并不会生成真实 DOM](#5--demos1---reactfragment-并不会生成真实-dom)
- [6. 💻 demos.2 - `React.Fragment` 在列表渲染中的应用](#6--demos2---reactfragment-在列表渲染中的应用)
- [7. 🔗 References](#7--references)

<!-- endregion:toc -->

## 1. 📝 概述

- 理解 `React.Fragment` 的作用。

## 2. 📒 `React.Fragment`

- `React.Fragment`
  - `React.Fragment` 是 React 中的一个 **内置组件**，它允许你将多个子元素组合在一起，而 **无需向 DOM 添加额外的节点**。
  - 当你需要单个元素时，你可以使用 `<Fragment>` 将其他元素组合起来，使用 `<Fragment>` 组合后的元素不会对 DOM 产生影响，就像元素没有被组合一样。这在你需要返回多个子元素但又不想引入额外的包装元素时非常有用。
- 占位
  - `React.Fragment` 并不会生成真实 DOM
  - `<Fragment>` 并不会实际被渲染到元素结构中，仅仅是起到一个占位的作用。
- 简写：`<></>`
  - 从 React 16.2 开始，你可以使用更简洁的空标签语法 `<></>` 来代替 `<React.Fragment></React.Fragment>`。
  - 在大多数情况下，`<Fragment></Fragment>` 可以简写为空的 JSX 元素 `<></>`。
- 应用场景
  - 使用 `<></>` 将多个“根元素”包裹一层，解决 jsx 的单根问题。

## 3. 🤔 为什么使用 `React.Fragment`？

- **避免额外的 DOM 节点**：有时候，你可能需要返回多个子元素，但不希望这些子元素被一个额外的 `<div>` 或其他标签包裹。`React.Fragment` 允许你这样做，从而保持 DOM 结构的简洁。
- **更好的语义化**：使用 `React.Fragment` 可以避免在不需要的地方添加无意义的 DOM 节点，使你的代码更加语义化和清晰。
- **性能优化**：虽然多一个 DOM 节点通常不会对性能产生显著影响，但在某些情况下，减少不必要的 DOM 节点可以稍微提高性能。

## 4. ⚠️ 注意事项 - 列表渲染的 `key` 值问题

- `<React.Fragment>` 可以接受属性，但需要注意的是，只有 `key` 属性会被传递给片段中的所有子元素。其他属性会被忽略。

```js{3,6}
function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}

// 在这种情况下，你需要显式地表示为 Fragment，而不是使用简写语法 <></>。
```

## 5. 💻 demos.1 - `React.Fragment` 并不会生成真实 DOM

```jsx {6-9}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <h1>Hello</h1>
      <p>This is a paragraph.</p>
    </>
  </StrictMode>
)
```

![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-22-06-46.png)

## 6. 💻 demos.2 - `React.Fragment` 在列表渲染中的应用

::: code-group

```jsx [🎯 需求描述]
// 现在有这么一组数据
const items = [
  { id: 1, title: 'Item 1', description: 'This is the first item.' },
  { id: 2, title: 'Item 2', description: 'This is the second item.' },
  { id: 3, title: 'Item 3', description: 'This is the third item.' }
]

// 由于某些原因，你需要将其渲染为如下结构：
<h2>Item 1</h2>
<p>This is the first item.</p>
<h2>Item 2</h2>
<p>This is the second item.</p>
<h2>Item 3</h2>
<p>This is the third item.</p>
```

```jsx [✅ 正确写法] {12-15}
import { StrictMode, Fragment } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const items = [
    { id: 1, title: 'Item 1', description: 'This is the first item.' },
    { id: 2, title: 'Item 2', description: 'This is the second item.' },
    { id: 3, title: 'Item 3', description: 'This is the third item.' },
  ]

  return items.map((item) => (
    <Fragment key={item.id}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </Fragment>
  ))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

```jsx [❌ 错误写法] {14-17}
import { StrictMode, Fragment } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const items = [
    { id: 1, title: 'Item 1', description: 'This is the first item.' },
    { id: 2, title: 'Item 2', description: 'This is the second item.' },
    { id: 3, title: 'Item 3', description: 'This is the third item.' },
  ]

  return (
    <>
      {items.map((item) => (
        <>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </>
      ))}
    </>
  )
  // ❌ 报错
  // Each child in a list should have a unique "key" prop.
  // Check the render method of `App`. See https://react.dev/link/warning-keys for more information.

  // return (
  //   <>
  //     {items.map(item => (
  //       <div key={item.id}>
  //         <h2>{item.title}</h2>
  //         <p>{item.description}</p>
  //       </div>
  //     ))}
  //   </>
  // );
  // ❌ 虽然可以正常渲染，但是会影响到真实 DOM，不符合要求。
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

:::

- 分析：items 是一个数组，包含多个对象，每个对象包含 id、title 和 description 属性 - 这里要用到列表渲染。
- 问题 - **多根节点** - 在一次渲染的结构中，包含一个 h2 根节点、一个 p 根节点，根节点的数量大于 1。
- 此时，React.Fragment 就可以解决这个问题。
  1. 可以使用 `<React.Fragment>` 标签来包裹需要渲染的所有根元素。
  2. 在列表渲染时如果没有指定 key 的话会存在问题，Fragment 考虑到了这一点，当我们循环渲染列表时，不能使用简写形式，应该写为 `<React.Fragment key={...}></React.Fragment>`。
- 最终渲染结果：
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-22-06-30.png)

## 7. 🔗 References

- https://zh-hans.react.dev/reference/react/Fragment
  - React - Reference - Components - Fragment
  - 查看 react 官方文档对内置组件 `React.Fragment` 的描述
