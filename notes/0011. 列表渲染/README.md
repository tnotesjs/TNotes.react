# [0011. 列表渲染](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🆚 对比 vue `v-for`](#3--对比-vue-v-for)
- [4. 🤔 “列表渲染”中的“列表”一词指的是什么？](#4--列表渲染中的列表一词指的是什么)
- [5. 🤔 列表渲染中的 react 元素必须加 key 吗？](#5--列表渲染中的-react-元素必须加-key-吗)
- [6. 🔍 查看官方文档对列表渲染的描述](#6--查看官方文档对列表渲染的描述)
- [7. 💻 demos.1 - 列表渲染](#7--demos1---列表渲染)
- [8. 💻 demos.2 - 列表中的 react 元素必须加 key](#8--demos2---列表中的-react-元素必须加-key)
- [9. 🔍 查看官方文档对于列表渲染时为什么要给元素加 `key` 的说明](#9--查看官方文档对于列表渲染时为什么要给元素加-key-的说明)
- [10. 💼 面试题：你知道为什么列表渲染需要添加 `key` 吗？](#10--面试题你知道为什么列表渲染需要添加-key-吗)
- [11. 🔗 引用](#11--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 列表渲染

## 2. 🫧 评价

- 在列表渲染的时候需要注意不要忘记加 `key`
- demos.2 中的做法，直接将一个数组丢到 jsx 中进行渲染，这么做仅仅是为了笔记编写而刻意为止，在实际开发中，更多情况下我们都是先利用 map 对列表进行处理，然后渲染 map 函数的返回结果。

## 3. 🆚 对比 vue `v-for`

- 本文提到的 “react 的列表渲染” 类似于 vue 中的 `v-for`，如果你写过 vue，那么一定对 `v-for` 不陌生。
- 不过在 react 中，列表渲染是通过纯 js 结合 jsx 语法来实现的，更加的灵活。

## 4. 🤔 “列表渲染”中的“列表”一词指的是什么？

- “列表渲染”中的“列表”一词，指的是 JS 中的“数组”这一数据类型。
- 比如你在 render 中返回一个 `{[1, 2, 3]}` 也是可以正常渲染的。
  - React 会取出数组的每一项进行渲染。
  - 你会在页面上看到渲染结果 1 2 3。
- 无法渲染的内容会自动被跳过
  - 如果需要渲染的列表（数组）中包含无法渲染的内容，比如 `null`、`undefined` 等，React 会忽略它们。
  - 比如 `{[1, 2, 3, null, undefined]}` 最终会渲染 1 2 3。
- 普通对象无法渲染
  - 如果要渲染的列表（数组）中包含普通对象，比如 `{ title: 'Cabbage', isFruit: false, id: 1 }`，那么会报错，对象无法直接渲染。
  - 通常会使用 `arr.map` 来对对象数组 `arr` 做一个映射处理，将每一个对象映射为对应的 React 元素，然后渲染 React 元素列表。

## 5. 🤔 列表渲染中的 react 元素必须加 key 吗？

- 是的，列表中的 React 元素必须加 key。
- 如果需要渲染的列表（数组）中包含 React 元素，则必须给元素加上 `key`，否则会报错。

## 6. 🔍 查看官方文档对列表渲染的描述

- 你将依赖 JavaScript 的特性，例如 `for` 循环 和 `array` 的 `map()` 函数 来渲染组件列表。
- 假设你有一个产品数组 `products`，在你的组件中，可以使用 `map()` 函数将这个数组转换为 `<li>` 标签构成的列表。
- 注意， `<li>` 有一个 `key` 属性。
- 对于列表中的每一个元素，你都应该传递一个字符串或者数字给 `key`，用于在其兄弟节点中唯一标识该元素。
- 通常 `key` 来自你的数据，比如数据库中的 ID。
- 如果你在后续插入、删除或重新排序这些项目，React 将依靠你提供的 `key` 来思考发生了什么。

::: code-group

```jsx [products 数组]
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
]
```

```jsx [li 列表]
const listItems = products.map((product) => (
  <li key={product.id}>{product.title}</li>
))

return <ul>{listItems}</ul>
```

:::

## 7. 💻 demos.1 - 列表渲染

<<< ./demos/1/assets/1.jsx {11-20}

- 最终渲染结果：
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-15-58-29.png)
- 注意：在列表渲染中，如果没有给 `key` 的话，会报错。
  - ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-15-58-46.png)

## 8. 💻 demos.2 - 列表中的 react 元素必须加 key

- “列表渲染”中的“列表”其实就是“数组”，且列表中的 react 元素必须加上 `key`。
- 比如可以直接传入一个 `[1, 2, 3]`，也能渲染。

```jsx {5}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>{[1, 2, 3]}</StrictMode>
)
```

- 最终渲染结果：
  - ![图 2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-15-59-01.png)
- 在这种情况下，并不需要给列表的每一项指定 key 属性，因为渲染的内容并非 react 元素。

```jsx {6}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  // ✅ 正确写法：
  <StrictMode>{[1, <div key={1}>2</div>, 3]}</StrictMode>
  // ❌ 错误写法：
  // <StrictMode>{[1,<div>2</div>,3]}</StrictMode>
  // 报错：
  // Warning: Each child in a list should have a unique "key" prop.
  // See https://reactjs.org/link/warning-keys for more information.
  // 对于列表中的 react 元素，如果不加 key 会导致报错。
)
```

- 如果将渲染的内容改为：`{[1,<div>2</div>,3]}` 这种写法，那么会立刻报错：
  - ![图 3](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-00-17.png)
- 如果要直接渲染一个列表（数组），那么这个列表中的所有“react 元素项”，都需要加上 key。
- 如果把每一项都单独写出来，那么不指定 key 是不会报错的。当然，那也就不再是列表渲染了。

```jsx {7}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 对于手动编写的静态列表项，不指定 key 不会导致错误或警告。 */}1
    <div>2</div>3
  </StrictMode>
)
```

## 9. 🔍 查看官方文档对于列表渲染时为什么要给元素加 `key` 的说明

- ![图 5](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-16-12-14.png)
- key 可以让 React 知道列表中的每一个元素是谁，这在列表内容发生变更的时候能够更好地匹配上对应的内容，更新真实 DOM。
- 当你在 React 中渲染列表时，确保为每个列表项提供一个唯一的 `key` 属性。这将帮助 React 更高效地管理组件树，并且能够避免潜在的问题。选择 `key` 时，尽量使用稳定且唯一的标识符。

## 10. 💼 面试题：你知道为什么列表渲染需要添加 `key` 吗？

- 身份标识：
  - `key` 是一个特殊的属性，你可以在创建元素时将其传递给 React。
  - React 使用 key 来识别每个列表项的身份，从而确定它在前后两次渲染中的对应关系。
- 优化性能：
  - 当数据发生变化时，React 会利用 `key` 来决定是否可以重用现有的元素，而不是重新创建新的元素。
  - 这有助于减少不必要的 DOM 操作，提升应用性能。
- 避免状态混淆：
  - 如果列表项的状态（例如输入框的内容）需要保持跨渲染的一致性，那么正确的 `key` 将确保这些状态不会被错误地分配给其他元素。

## 11. 🔗 引用

- [react - quick start - Rendering lists 列表渲染][1]
- [查看官方文档对于列表渲染时为什么要给元素加 `key` 的说明][2]

[1]: https://zh-hans.react.dev/learn#rendering-lists
[2]: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
