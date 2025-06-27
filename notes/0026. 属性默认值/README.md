# [0026. 属性默认值](https://github.com/Tdahuyou/TNotes.react/tree/main/notes/0026.%20%E5%B1%9E%E6%80%A7%E9%BB%98%E8%AE%A4%E5%80%BC)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 💻 函数组件设置属性默认值](#2--函数组件设置属性默认值)
- [3. 💻 给类组件设置属性默认值](#3--给类组件设置属性默认值)

<!-- endregion:toc -->

## 1. 📝 概述

- 了解函数组件和类组件如何设置属性默认值。
- 常见的两种方案：
  - **原生 JS 控制**：属性默认值本身不是啥复杂的逻辑，完全可以直接采用 JS 来控制，只要属性值为空，那么就赋值为我们指定的默认值即可。
  - **defaultProps**：React 从框架层面出发，也给我们提供了一些其它形式的写法，比如 defaultProps。

## 2. 💻 函数组件设置属性默认值

::: code-group

```jsx [JS 控制]
function Welcome(props) {
  const { name = 'Guest' } = props
  return <h1>Hello, {name}</h1>
}
```

```jsx [defaultProps]
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

Welcome.defaultProps = {
  name: 'Guest',
}
// ⚠️ 这种方式在最新的 React 版本中已不推荐。
```

:::

## 3. 💻 给类组件设置属性默认值

::: code-group

```jsx [JS 控制]
class Welcome extends Component {
  render() {
    const { name = 'Guest' } = this.props
    return <h1>Hello, {name}</h1>
  }
}
```

```jsx [defaultProps]
class Welcome extends Component {
  static defaultProps = {
    name: 'Guest',
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

:::
