# [0026. 属性默认值](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0026.%20%E5%B1%9E%E6%80%A7%E9%BB%98%E8%AE%A4%E5%80%BC)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 「属性默认值」是什么？](#3--属性默认值是什么)
- [4. 🤔 如何设置组件默认值？](#4--如何设置组件默认值)
- [5. 🔗 引用](#5--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 属性默认值

## 2. 🫧 评价

- 我们可以直接通过原生 JS 来管理属性的默认值。
- 注意：defaultProps 的写法官方并不推荐使用。

## 3. 🤔 「属性默认值」是什么？

- 组件默认值是指当父组件没有传递某些属性或者传递了 `undefined` 值时，子组件自动使用的预设值
- 这些默认值确保组件即使在缺少某些属性的情况下也能正常工作
- 默认值只在属性值为 `undefined` 时生效，对于 `null`、`false`、`0` 等其他假值不会应用默认值
- 可以提高组件的健壮性和可复用性，使组件更容易使用和维护

## 4. 🤔 如何设置组件默认值？

::: code-group

```jsx [1]
// 函数组件
function Welcome(props) {
  const { name = 'Guest' } = props
  return <h1>Hello, {name}</h1>
}

// 类组件
class Welcome extends Component {
  render() {
    const { name = 'Guest' } = this.props
    return <h1>Hello, {name}</h1>
  }
}
```

```jsx [2]
// ⚠️ 这种方式在最新的 React 版本中已不推荐。
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

Welcome.defaultProps = {
  name: 'Guest',
}

// 类组件
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

- 【1】原生 JS 控制：属性默认值本身不是啥复杂的逻辑，完全可以直接采用 JS 来控制，只要属性值为空，那么就赋值为我们指定的默认值即可。
- 【2】defaultProps：React 从框架层面出发，也给我们提供了一些其它形式的写法，比如 defaultProps。

::: warning 注意

- 做法 2 算是早期的实现方案，现在官方已经将 defaultProps 标记为弃用了。

:::

## 5. 🔗 引用

- [react defaultProps][1]

[1]: https://react.dev/reference/react/Component#static-defaultprops
