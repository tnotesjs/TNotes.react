# [0021. 组件的基本组成及核心概念简介](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90%E5%8F%8A%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%E7%AE%80%E4%BB%8B)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 📒 组件的 3 大基本组成结构](#2--组件的-3-大基本组成结构)
- [3. 📒 函数组件和类组件的基本写法](#3--函数组件和类组件的基本写法)
- [4. 📒 组件的属性 - `Props`](#4--组件的属性---props)
- [5. 📒 组件的状态 - `State`](#5--组件的状态---state)
- [6. 📒 组件的生命周期方法](#6--组件的生命周期方法)
- [7. 📒 组件的事件 - `Events`](#7--组件的事件---events)
- [8. 📒 组件模板语法 - 条件渲染、列表渲染](#8--组件模板语法---条件渲染列表渲染)
- [9. 📒 组件的样式 - `Style`](#9--组件的样式---style)
- [10. 📒 Context API](#10--context-api)
- [11. 📒 Hooks](#11--hooks)

<!-- endregion:toc -->

## 1. 📝 概述

- 介绍组件的基本组成。
- 其中很多概念（比如三大基本结构、属性、状态、生命周期、……）是通用的，其它框架（比如 vue）中的组件也是如此。
- 本文仅对这些核心概念做一个简单的介绍，相关详细内容请参阅其它笔记内容。

## 2. 📒 组件的 3 大基本组成结构

- 在 React 中，一个组件可以由多个部分组成，这些部分共同定义了组件的 **结构**、**外观** 以及 **行为**。
  - **1️⃣ 结构** 指的是组件的 HTML 结构，包括标签、属性、文本内容等，这部分通常由 JSX 来描述。
  - **2️⃣ 外观** 指的是组件的样式、布局、动画等，这部分由 CSS 来描述。
  - **3️⃣ 行为** 指的是组件的逻辑，比如与用户和其他组件的交互方式等，这部分由 JavaScript 来描述。
- 上述提到的 3 个基本组成部分，其实就是前端三件套 html、css、js。
  - html <-> “结构”
  - css <-> “样式”
  - js <-> “行为”

## 3. 📒 函数组件和类组件的基本写法

::: code-group

```jsx [函数组件]
// 函数组件是使用 JavaScript 函数来定义的组件。
// 函数组件通常使用 function 关键字或箭头函数来声明，并且返回 JSX 代码。
function MyComponent() {
  return <div>Hello, world!</div>
}
```

```jsx [类组件]
// 类组件是使用 ES6 类（class）语法定义的组件。
// 类组件继承自 React.Component 并且必须实现 render 方法。
class MyComponent extends React.Component {
  render() {
    return <div>Hello, world!</div>
  }
}
```

:::

## 4. 📒 组件的属性 - `Props`

- Props 是从父组件传递给子组件的数据。
- **Props 是只读的，意味着子组件不能直接修改父组件传递过来的 Props。**

::: code-group

```jsx [函数组件]
// 在函数组件中，props 作为参数传入。
function MyComponent(props) {
  return <div>{props.message}</div>
}
```

```jsx [类组件]
// 在类组件中，props 通过 this.props 访问。
class MyComponent extends React.Component {
  render() {
    return <div>{this.props.message}</div>
  }
}
```

:::

## 5. 📒 组件的状态 - `State`

- State 是组件内部管理的数据，它可以在组件的生命周期内被改变。
- **当 State 发生变化时，组件会重新渲染。**

::: code-group

```jsx [函数组件]
// 在函数组件中，可以使用 useState 钩子来声明 state。
import React, { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

```jsx [类组件]
// 在类组件中，state 通过 this.state 和 this.setState 来管理和更新。
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}
```

:::

## 6. 📒 组件的生命周期方法

- 生命周期方法允许你在特定时刻执行逻辑，例如组件挂载、更新和卸载的时候。
- 在类组件中，有多个生命周期方法如 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 等。
- 在函数组件中，可以使用 `useEffect` 钩子来替代大部分的生命周期方法。

## 7. 📒 组件的事件 - `Events`

- 事件处理允许你响应用户的操作，比如点击按钮、输入文本等。
- 在 JSX 中，你可以为元素添加事件处理器，它们通常是回调函数。

::: code-group

```jsx [函数组件]
function MyComponent() {
  const handleClick = () => {
    console.log('Button was clicked!')
  }

  return <button onClick={handleClick}>Click me</button>
}
```

```jsx [类组件]
class MyComponent extends React.Component {
  handleClick = () => {
    console.log('Button was clicked!')
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>
  }
}
```

:::

## 8. 📒 组件模板语法 - 条件渲染、列表渲染

::: code-group

```jsx [条件渲染]
// 根据不同的条件显示或隐藏组件的部分内容。
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}
```

```jsx [列表渲染]
// 当你需要渲染多个相似的元素时，通常需要使用数组来映射并创建一组元素。
// 每个元素都需要一个唯一的 key 属性，以帮助 React 识别哪些元素改变了、添加了或者删除了。
const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
))
```

:::

## 9. 📒 组件的样式 - `Style`

- 可以通过内联样式 `style`、CSS 类名 `className` 或是 `CSS-in-JS 库` 等其他手段来应用样式。

```jsx
function StyledComponent() {
  const containerStyle = {
    width: '300px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  }

  return (
    <div style={containerStyle}>
      <h2>Styled Component</h2>
      <p>This is a simple example of inline styling in React.</p>
    </div>
  )
}
```

## 10. 📒 Context API

- Context 提供了一种在组件树中传递数据的方法，而不需要手动将 props 逐层传递下去。
- 使用 `React.createContext()` 创建一个 context。
- 使用 `<Provider>` 提供数据。
- 使用 `<Consumer>` 在子组件中消费 context 数据。

::: code-group

```jsx [ThemeContext.jsx]
import React from 'react'

const ThemeContext = React.createContext('light') // 默认值为 'light'
export default ThemeContext
```

```jsx [App.jsx]
import React from 'react'
import ThemeContext from './ThemeContext'

function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button
          style={{
            background: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333',
          }}
        >
          I am {theme} button
        </button>
      )}
    </ThemeContext.Consumer>
  )
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  )
}

export default App
```

:::

## 11. 📒 Hooks

- Hooks 允许你在不编写类的情况下使用 state 和其他 React 特性。
- 常见的 hooks 包括 `useState`, `useEffect`, `useContext`, `useReducer` 等。

```jsx
import React, { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  // 模拟 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${count} times`

    // 模拟 componentWillUnmount
    return () => {
      document.title = 'React App'
    }
  }, [count]) // 仅在 count 变化时执行

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```
