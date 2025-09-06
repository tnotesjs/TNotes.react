# [0046. JSX 元素的正确使用及常见错误示例](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0046.%20JSX%20%E5%85%83%E7%B4%A0%E7%9A%84%E6%AD%A3%E7%A1%AE%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%E7%A4%BA%E4%BE%8B)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 💻 demos.1 - JSX 元素的正确使用及常见错误示例](#2--demos1---jsx-元素的正确使用及常见错误示例)

<!-- endregion:toc -->

## 1. 📝 概述

- 介绍 jsx 中元素引用的多种写法。

## 2. 💻 demos.1 - JSX 元素的正确使用及常见错误示例

::: code-group

```jsx{4,13} [1️⃣ ✨]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const divEle = <div>this is a div element</div> // ✨
/*
常见写法：将 JSX 元素赋值给变量

正确引用方式：{divEle}

注意：这不是组件，不能使用 <divEle /> 方式引用

React 通过首字母大小写区分元素类型：
  小写开头：内置 HTML 元素
  大写开头：自定义组件
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 正确写法： */}
    {divEle}      {/* ✨ 推荐写法 */}

    {/* ❌ 错误写法： */}
    {/* <divEle /> */}

    {/* 报错：
    Warning: <divEle /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
    警告：<divEle /> 使用了错误的大小写，应该使用 PascalCase（大驼峰）来定义 React 组件，或者使用小写来定义 HTML 元素。 */}
  </StrictMode>
)
```

```jsx{4,12} [2️⃣]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const DivEle2 = <div>this is a div element 2</div>
/*
不推荐写法：将 JSX 元素赋值给大写变量
技术上可行：{DivEle2} 能渲染
但会误导 React 将其识别为组件类型
应避免这种命名方式 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 技术可行但不推荐： */}
    {DivEle2}     {/* 应避免 */}

    {/* ❌ 错误写法： */}
    {/* <DivEle2 /> */}
    {/* 报错：
    Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: <div />. Did you accidentally export a JSX literal instead of a component?
    React.jsx: type 是无效的 -- 预期应该是一个字符串（用于内置组件）或一个类/函数（用于组合组件），但实际是：<div />。 您是否意外导出了一个 JSX 引用，而不是一个组件？

    Uncaught Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
    未捕获的错误：元素类型无效：期望的是字符串（对于内置组件）或类/函数（对于复合组件），但得到了对象。
    */}
  </StrictMode>
)
```

```jsx{4,13} [3️⃣]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const divFun = () => <div>this is a div function</div>
/*
函数返回 JSX，但不符合组件命名规范
正确引用方式：{divFun()}
应使用大驼峰命名：DivFun

很鸡肋的一种写法
从值的层面来看 () => <div>this is a div function</div>，这是一个函数组件
从命名层面来看 divFun，这是一个 HTML 元素变量的引用。
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 正确写法： */}
    {divFun()}

    {/* ❌ 错误写法： */}
    {/* <divFun /> */}
    {/* 报错：
    Warning: <divFun /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
    警告：<divFun /> 使用了错误的大小写，应该使用 PascalCase（大驼峰）来定义 React 组件，或者使用小写来定义 HTML 元素。 */}

    {/* {divFun} */}
    {/* 报错：
    Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
    警告：函数不能作为 React 子元素。这可能是因为您返回了一个组件而不是 <Component /> 而导致。或者您可能想调用此函数，而不是返回它。 */}

  </StrictMode>
)
```

```jsx{4-7,15} [4️⃣ ✨]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const DivComp = () => { // ✨
   return <div>this is a div comp</div>
}
/*
标准函数组件写法（大驼峰命名）
推荐引用方式：<DivComp />
{DivComp()} 在条件渲染中可用
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 正确写法： */}
    <DivComp />   {/* ✨ 推荐写法 */}
    {condition && DivComp()} {/* 条件渲染场景 */}
  </StrictMode>
)
```

```jsx [5️⃣ 完整示例]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const divEle = <div>this is a div element</div>
const DivEle2 = <div>this is a div element 2</div>
const divFun = () => <div>this is a div function</div>
const DivComp = () => <div>this is a div comp</div>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 正确写法： */}
    {divEle} {/* ✨ 推荐 */}
    {DivEle2} {/* 不推荐，名称应该改为小驼峰形式。 */}
    {divFun()} {/* 不推荐，名称应该改为大驼峰形式。 */}
    <DivComp /> {/* ✨ 推荐 */}
    {condition && DivComp()} {/* ✨ 推荐 */}
    {/* ❌ 错误写法： */}
    {/* <divEle /> */}
    {/* <DivEle2 /> */}
    {/* <divFun /> */}
    {/* {divFun} */}
  </StrictMode>
)
```

:::

- **元素引用规则**

| 类型         | ✅ 正确引用方式 | ❌ 错误引用方式  |
| ------------ | --------------- | ---------------- |
| JSX 元素变量 | `{elementVar}`  | `<elementVar />` |
| 函数组件     | `<Component />` | `{Component}`    |

- **最佳实践总结**：
  - 使用 `const element = <div>...</div>` + `{element}` 存储和引用 JSX 片段
  - 组件使用大驼峰命名：`const MyComponent = () => ...` + `<MyComponent />`
  - 函数组件在条件渲染时可用 `{Component()}` 形式
