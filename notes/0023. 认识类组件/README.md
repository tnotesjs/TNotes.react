# [0023. 认识类组件](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0023.%20%E8%AE%A4%E8%AF%86%E7%B1%BB%E7%BB%84%E4%BB%B6)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 “类组件”是什么？](#3--类组件是什么)
- [4. 🤔 “函数组件”和“类组件”用哪个？](#4--函数组件和类组件用哪个)
- [5. 🤔 如何管理类组件的状态（State）？](#5--如何管理类组件的状态state)
- [6. 🤔 类组件的“生命周期方法”是？](#6--类组件的生命周期方法是)
- [7. 🔗 引用](#7--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 类组件简介

## 2. 🫧 评价

- 随着 React Hooks 的引入，许多原本只能在类组件中完成的任务现在也可以在函数组件中实现，这使得函数组件成为了新的标准。
- 话虽如此，了解类组件仍然是蛮重要的，因为它们在很多现有的 React 旧项目中仍然广泛使用，咱们在看一些开源项目（比如目前 2025 年的 [scratch-gui][1]）的时候，你依旧会看到不少的类组件的使用。

## 3. 🤔 “类组件”是什么？

- 类组件是 React 中定义组件的另一种方式，它基于 ES6 的类（class）语法。
- 类组件扩展了 `React.Component` 类，并且必须实现一个名为 `render` 的方法，该方法返回要渲染到 DOM 的 JSX 代码。
- 类组件可以拥有自己的状态（state）和生命周期方法，这使得它们在处理复杂逻辑时非常有用。
- 一个基本的类组件看起来像这样：

```jsx
import React, { Component } from 'react'

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

- 注解：
  - 在这个例子中，`Welcome` 是一个类组件，它继承自 `React.Component`。
  - `render` 方法返回了一个 `<h1>` 元素，其中包含了通过 `this.props` 传递进来的 `name` 属性。

## 4. 🤔 “函数组件”和“类组件”用哪个？

- 在早期，类组件是主流，因为函数组件是没有状态（state）和生命周期方法的，当时的函数组件仅用来做一些简单的模板展示。
- 现在，函数组件有了 Hooks，并且写起来比类组件更为简洁，官方也更推荐采用函数组件的形式来定义组件。

## 5. 🤔 如何管理类组件的状态（State）？

- 类组件可以通过 `this.state` 来管理自己的状态。
- 状态是一个对象，可以在构造函数中初始化，并通过 `this.setState` 方法来更新。
- 当状态改变时，组件会自动重新渲染。

```jsx
class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    )
  }
}
```

- 在这个例子中，`Counter` 组件有一个 `count` 状态，并提供了一个按钮来增加这个计数器的值。

## 6. 🤔 类组件的“生命周期方法”是？

- 类组件的"生命周期方法"是指在组件不同阶段自动调用的特殊方法，允许开发者在组件的特定时刻执行相应的操作。
- 类组件提供了多种生命周期方法，这些方法允许你在组件的不同阶段执行特定的操作。
- 以下是几个常见的生命周期方法：

| 生命周期方法 | 说明 |
| --- | --- |
| `constructor` | 初始化 state 和绑定事件处理器 |
| `componentDidMount` | 在组件挂载后立即调用，通常用来发送网络请求或设置订阅 |
| `shouldComponentUpdate` | 决定是否需要更新组件，可以用于性能优化 |
| `componentDidUpdate` | 在组件更新后调用，可以用来触发网络请求或进行 DOM 操作 |
| `componentWillUnmount` | 在组件卸载前调用，用于清理工作，如取消订阅或清除定时器 |

```jsx
class Example extends Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount() {
    // 模拟异步数据获取
    setTimeout(() => {
      this.setState({ data: 'Data fetched' })
    }, 2000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      console.log('Data has changed:', this.state.data)
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount')
  }

  render() {
    return <div>{this.state.data || 'Loading...'}</div>
  }
}
```

- 在这个例子中，`Example` 组件在挂载后模拟了一个数据获取的过程，并在数据更新时记录一条消息。同时，当组件即将卸载时，它也会记录一条消息。
- 在使用相关生命周期 API 的时候，需要注意的是你当前所使用的 React 版本，在不同的 React 版本中，生命周期 API 会有所差异。
- 具体的版本变更，可以查阅 [react 官方的 CHANGELOG][2] 描述。

## 7. 🔗 引用

- [scratch-gui][1]
- [react 官方的 CHANGELOG][2]

[1]: https://github.com/scratchfoundation/scratch-gui
[2]: https://github.com/facebook/react/blob/main/CHANGELOG.md
