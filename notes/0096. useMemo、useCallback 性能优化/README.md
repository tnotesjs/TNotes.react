# [0096. useMemo、useCallback 性能优化](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0096.%20useMemo%E3%80%81useCallback%20%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 `useMemo` 是什么？](#3--usememo-是什么)
- [4. 🤔 `useCallback` 是什么？](#4--usecallback-是什么)
- [5. 🆚 `useMemo` vs `useCallback`](#5--usememo-vs-usecallback)
- [6. 🤔 `React.memo` 是什么？](#6--reactmemo-是什么)
- [7. 🤔 `React.memo`、`useMemo`、`useCallback` 如何配合使用？](#7--reactmemousememousecallback-如何配合使用)
- [8. 🔗 引用](#8--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- `useMemo`
- `useCallback`
- `React.memo`

## 2. 🫧 评价

这篇笔记讲解 React 中两个重要的性能优化 Hook：`useMemo` 和 `useCallback`，以及一个高阶组件 `React.memo`。

- `useMemo` 用于缓存计算结果，`useCallback` 用于缓存函数引用
- 性能优化要基于实际性能分析，不要盲目优化，不是所有场景都需要优化，过度使用反而增加复杂度
- 必须与 `React.memo` 配合才能真正避免子组件重新渲染
- 依赖项数组是关键，遗漏或多余都会导致问题

## 3. 🤔 `useMemo` 是什么？

`useMemo` 是一个 React Hook，用于缓存计算结果，避免在每次渲染时重复执行昂贵的计算。

```jsx
// 基本语法：
// const cachedValue = useMemo(calculateValue, dependencies)

// 示例：
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b), // 计算函数
  [a, b] // 依赖项数组
)
```

1. 问题场景：昂贵的计算每次都执行
2. 解决方案：使用 `useMemo` 缓存计算结果

::: code-group

```jsx [1]
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

function Component({ items }) {
  const [count, setCount] = useState(0)

  // ⚠️ 每次渲染都重新计算
  console.log('排序执行')
  const sortedItems = items.slice().sort((a, b) => a.value - b.value)

  return (
    <>
      {/* 计数器更新 - 重新渲染 */}
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* 渲染列表 */}
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

function App() {
  return (
    <Component
      items={[
        { id: 1, name: 'Item 1', value: 10 },
        { id: 2, name: 'Item 2', value: 5 },
      ]}
    />
  )
}

createRoot(document.getElementById('root')).render(<App />)

// 测试步骤：
// 点击 count 按钮，观察控制台的“排序执行”日志
// 可以看到每次点击按钮都会重新计算排序，即使 items 没有变化
```

```jsx [2]
import { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'

function Component({ items }) {
  const [count, setCount] = useState(0)

  // ✅ 使用 useMemo 缓存排序结果，避免不必要的重新计算
  const sortedItems = useMemo(() => {
    console.log('排序执行')
    return items.slice().sort((a, b) => a.value - b.value)
  }, [items])

  return (
    <>
      {/* 计数器更新 - 重新渲染 */}
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* 渲染列表 */}
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

function App() {
  return (
    <Component
      items={[
        { id: 1, name: 'Item 1', value: 10 },
        { id: 2, name: 'Item 2', value: 5 },
      ]}
    />
  )
}

createRoot(document.getElementById('root')).render(<App />)

// 测试步骤：
// 点击 count 按钮，观察控制台的“排序执行”日志
// 可以看到每次点击按钮时，排序函数不会被重新调用，因为依赖 items 没有变化
```

:::

## 4. 🤔 `useCallback` 是什么？

`useCallback` 用于缓存函数引用，避免每次渲染都创建新函数。

```jsx
// 基本语法：
// const cachedFn = useCallback(fn, dependencies)

// 示例：
const memoizedCallback = useCallback(() => {
  // ... 函数逻辑
  doSomething(a, b)
}, [a, b]) // 依赖项数组
```

1. 问题场景：函数引用变化导致子组件重新渲染
2. 解决方案：使用 `useCallback` 缓存函数

::: code-group

```jsx [1]
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

// ParentComponent 渲染
// ChildComponent 也会重新渲染
function ParentComponent() {
  const [count, setCount] = useState(0)

  // ❌ 函数引用不稳定
  // ParentComponent 每次渲染都创建新函数实例 handleClick
  const handleClick = () => {
    console.log('Button clicked')
  }

  return (
    <div>
      {/* ❌ handleClick 每次都是新的 */}
      <ChildComponent onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

function ChildComponent({ onClick }) {
  // 即使 onClick 逻辑相同，每次都会重新渲染
  // 因为每次接收的都是新的函数引用
  console.log('ChildComponent 渲染') // ❌ 每次 ParentComponent 渲染都会执行
  return <button onClick={onClick}>Click me</button>
}

function App() {
  return <ParentComponent />
}

createRoot(document.getElementById('root')).render(<App />)

// 测试步骤：
// 点击 count 按钮
// count 值发生变化导致 ParentComponent 重新渲染
// 由于 handleClick 是新函数引用，ChildComponent 也会重新渲染
// 因此 控制台会打印多次 "ChildComponent 渲染"
```

```jsx [2]
import { memo, useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'

function ParentComponent() {
  const [count, setCount] = useState(0)

  // 使用 useCallback 缓存函数引用
  const handleClick = useCallback(() => {
    console.log('Button clicked')
  }, []) // 空依赖数组，永远返回同一个函数

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

// 使用 React.memo 进一步优化
const ChildComponent = memo(({ onClick }) => {
  console.log('ChildComponent 渲染了')
  return <button onClick={onClick}>Click me</button>
})

function App() {
  return <ParentComponent />
}

createRoot(document.getElementById('root')).render(<App />)

// 测试步骤：
// 点击 count 按钮
// count 值发生变化导致 ParentComponent 重新渲染
// 由于 handleClick 使用 useCallback 缓存，引用不变
// 因此 传递给 ChildComponent 的 onClick prop 也是同一个引用
// 并且子组件 ChildComponent 是 memo 包装优化的，因此子组件不会重新渲染
// 控制台只会输出一次 'ChildComponent 渲染了'

// ----------------------------------
// 🤔 为什么 ChildComponent 需要使用 memo 优化？
// handleClick 不是已经使用 useCallback 缓存了吗？
// ----------------------------------

// React 默认的渲染行为：
// React 组件在父组件重新渲染时，默认会无条件地重新渲染子组件
// 除非子组件是纯组件或使用了 React.memo

// 代码执行流程：
// 点击 "Count: {count}" 按钮后：
// 1. setCount(count + 1) 触发状态更新
// 2. ParentComponent 重新渲染（因为 count 变化）
// 3. 重新执行 ParentComponent 函数体
// 4. useCallback 返回缓存的函数（相同引用）✓
// 5. 但 ChildComponent 函数会被重新调用！
//    → console.log('ChildComponent 渲染了') 执行

// useCallback 只是缓存了函数引用，但它不会阻止子组件的渲染。
// 它只确保了：
// 传递给子组件的 onClick prop 是同一个函数引用
// 但这不意味着 React 会跳过子组件的渲染

// useCallback 单独使用：只解决了"函数引用稳定性"问题，但不会阻止子组件函数执行
// React.memo 的作用：通过浅比较 props，决定是否跳过组件函数的执行
// 最佳实践：useCallback + React.memo 配合使用才能达到完整的优化效果
// 性能影响：即使子组件重新执行了函数，如果虚拟 DOM 没有变化，React 不会更新真实 DOM，但函数执行本身也有成本
```

:::

## 5. 🆚 `useMemo` vs `useCallback`

| 对比项   | `useMemo`                    | `useCallback`                 |
| -------- | ---------------------------- | ----------------------------- |
| 基本语法 | `useMemo(() => value, deps)` | `useCallback(() => {}, deps)` |
| 缓存内容 | 计算结果（任何值）           | 函数引用                      |
| 返回值   | 计算函数的返回值             | 函数本身                      |
| 使用场景 | 昂贵的计算、对象/数组        | 事件处理函数                  |

`useCallback` 实际上是 `useMemo` 的语法糖，等价关系：`useCallback(fn, deps)` = `useMemo(() => fn, deps)`。

```jsx
// React 内部的简化实现：
export function useCallback(callback, deps) {
  return useMemo(() => callback, deps)
}

// 更详细的实现：
export function useCallback(callback, deps) {
  const memoizedState = useRef(null)

  if (!areDepsEqual(deps, memoizedState.current?.deps)) {
    memoizedState.current = {
      value: callback, // 直接保存函数本身
      deps: deps,
    }
  }

  return memoizedState.current.value
}

export function useMemo(factory, deps) {
  const memoizedState = useRef(null)

  if (!areDepsEqual(deps, memoizedState.current?.deps)) {
    memoizedState.current = {
      value: factory(), // 执行工厂函数获取值
      deps: deps,
    }
  }

  return memoizedState.current.value
}

// 以下两种写法是完全等价的：

// 写法1：使用 useCallback
const handleClick = useCallback(() => {
  console.log('Clicked')
}, [deps])

// 写法2：使用 useMemo 实现 useCallback
const handleClick = useMemo(() => {
  return () => {
    console.log('Clicked')
  }
}, [deps])

// 或更简洁的 useMemo 写法
// const handleClick = useMemo(
//   () => () => {
//     console.log('Clicked')
//   },
//   [deps]
// )
```

## 6. 🤔 `React.memo` 是什么？

`React.memo` 是一个高阶组件（HOC），用于记忆化函数组件。它通过浅比较 `props` 来决定是否跳过组件的重新渲染。

```jsx
// 基本语法：
// const MemoizedComponent = React.memo(SomeComponent, arePropsEqual?)

// SomeComponent 是一个需要优化的函数组件
// arePropsEqual 表示一个可选的自定义比较函数
// 我们可能需要自定义比较函数的场景是极少数的情况，例如当 props 包含复杂数据结构时
// function arePropsEqual(oldProps, newProps) {
//   return (
//     oldProps.dataPoints.length === newProps.dataPoints.length &&
//     oldProps.dataPoints.every((oldPoint, index) => {
//       const newPoint = newProps.dataPoints[index]
//       return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y
//     })
//   )
// }
```

示例：

```jsx
import { memo, useState } from 'react'
import { createRoot } from 'react-dom/client'

const Greeting = memo(({ name }) => {
  console.log('Greeting was rendered at', new Date().toLocaleTimeString())
  return (
    <h3>
      Hello{name && ', '}
      {name}!
    </h3>
  )
})

const GreetingWithoutMemo = ({ name }) => {
  console.log(
    'GreetingWithoutMemo was rendered at',
    new Date().toLocaleTimeString()
  )
  return (
    <h3>
      Hello{name && ', '}
      {name}!
    </h3>
  )
}

function App() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <h2>Greeting</h2>
      <Greeting name={name} />
      <h2>Greeting Without Memo</h2>
      <GreetingWithoutMemo name={name} />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)

// 测试步骤：
// 1. 在“Name”输入框中输入内容，观察控制台输出
// 结果：Greeting 和 GreetingWithoutMemo 组件均重新渲染
// 2. 在“Address”输入框中输入内容，观察控制台输出
// 结果：Greeting 组件不会重新渲染，GreetingWithoutMemo 组件会重新渲染

// 分析：
// Greeting
//   因为 Greeting 组件被 memo 包裹，只有当其 props 发生变化时才会重新渲染
//   当修改“Name”输入框时，传递给 Greeting 组件的 name prop 发生变化，导致组件重新渲染
//   当修改“Address”输入框时，Greeting 组件的 props 没有变化，因此不会重新渲染
// GreetingWithoutMemo
//   而 GreetingWithoutMemo 组件没有被 memo 包裹
//   每次父组件 App 重新渲染时，都会导致 GreetingWithoutMemo 组件也重新渲染
//   无论其 name prop 是否变化
```

## 7. 🤔 `React.memo`、`useMemo`、`useCallback` 如何配合使用？

必须配合使用才能真正避免重新渲染。

```jsx
import { memo, useCallback, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'

// 子组件使用 React.memo
const UserCard = memo(({ user, onUpdate, onDelete }) => {
  console.log('UserCard 渲染:', user.id)

  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={() => onUpdate(user.id, 'New Name')}>Update</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  )
})

// 子组件使用 React.memo
const ItemList = memo(({ items }) => {
  console.log('ItemList 渲染')

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
})

// 父组件使用 useCallback 和 useMemo
function UserList({ items }) {
  const [users, setUsers] = useState([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ])
  const [count, setCount] = useState(0)

  // ✅ 使用 useCallback 缓存函数引用，避免子组件不必要的重新渲染
  const handleUpdate = useCallback((id, name) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, name } : u)))
  }, [])

  const handleDelete = useCallback((id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

  // ✅ 使用 useMemo 缓存排序结果，避免不必要的重新计算
  const sortedItems = useMemo(() => {
    console.log('排序执行')
    return items.slice().sort((a, b) => a.value - b.value)
  }, [items])
  // 只要 items 不变，sortedItems 引用就不变

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* ✅ count 变化时，UserCard 不会重新渲染 */}
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
      {/* ✅ count 变化时，ItemList 不会重新渲染 */}
      <ItemList items={sortedItems} />
    </div>
  )
}

function App() {
  return (
    <UserList
      items={[
        { id: 1, name: 'Item 1', value: 10 },
        { id: 2, name: 'Item 2', value: 5 },
      ]}
    />
  )
}

createRoot(document.getElementById('root')).render(<App />)

// 默认输出结果：
// 排序执行
// UserCard 渲染: 1
// UserCard 渲染: 2
// ItemList 渲染
// ...

// 测试步骤：
// 1. 点击 Count 按钮，观察控制台输出
//   结果：UserCard 和 ItemList 都不会重新渲染
// 2. 点击 Update 或 Delete 按钮，观察控制台输出
//   结果：只有对应的 UserCard 会重新渲染，ItemList 不会重新渲染

// 分析.1 - React.memo
// 子组件都使用了 React.memo，因此只有当 props 变化时才会重新渲染，不会随着父组件渲染而自动重新渲染

// 分析.2 - UserCard
// UserCard 中一共有 3 个属性：user, onUpdate, onDelete
// 其中 onUpdate, onDelete 函数引用在父组件中通过 useCallback 做了缓存处理，因此它们是稳定的
// 不稳定的是 user 属性，当用户数据发生变化时，user 对象引用会变化，导致对应的 UserCard 重新渲染

// 当点击 Update 或者 Delete 按钮时
// 会导致特定的 user 对象引用变化，进而导致该 UserCard 重新渲染
// 当点击 Count 按钮时，虽然父组件重新渲染，但由于 onUpdate, onDelete, user 引用都没有变化，因此UserCard 不会重新渲染

// 分析.3 - ItemList
// ItemList 中只有一个 items 属性，该属性对应的值 sortedItems 在父组件中通过 useMemo 做了缓存处理
// 因此 sortedItems 的引用是稳定的，只有当 App 组件传入的 items 变化时，sortedItems 引用才会变化，进而导致 ItemList 重新渲染
// 当点击 Count 按钮时，虽然父组件重新渲染，但由于 sortedItems 引用没有变化，因此 ItemList 不会重新渲染
```

## 8. 🔗 引用

- [官方文档 - useMemo][1]
- [官方文档 - useCallback][2]
- [官方文档 - React.memo][3]
- [官方文档 - Render and Commit][4]

[1]: https://react.dev/reference/react/useMemo
[2]: https://react.dev/reference/react/useCallback
[3]: https://react.dev/reference/react/memo
[4]: https://react.dev/learn/render-and-commit
