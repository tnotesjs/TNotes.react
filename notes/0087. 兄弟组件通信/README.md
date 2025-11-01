# [0087. 兄弟组件通信](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0087.%20%E5%85%84%E5%BC%9F%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 什么是兄弟组件通信？](#3--什么是兄弟组件通信)
  - [3.1. 通信难点](#31-通信难点)
  - [3.2. 解决思路](#32-解决思路)
- [4. 🤔 通过状态提升实现通信？](#4--通过状态提升实现通信)
  - [4.1. 基本实现](#41-基本实现)
  - [4.2. 实战示例：Todo 列表](#42-实战示例todo-列表)
  - [4.3. 复杂场景：商品筛选](#43-复杂场景商品筛选)
- [5. 🤔 通过 Context 实现通信？](#5--通过-context-实现通信)
  - [5.1. 基本用法](#51-基本用法)
  - [5.2. 实战示例：购物车](#52-实战示例购物车)
- [6. 🤔 通过事件总线实现通信？](#6--通过事件总线实现通信)
  - [6.1. 基本实现](#61-基本实现)
  - [6.2. 实战示例：通知系统](#62-实战示例通知系统)
- [7. 🤔 通过状态管理库实现通信？](#7--通过状态管理库实现通信)
  - [7.1. 使用 Zustand](#71-使用-zustand)
  - [7.2. 使用 Redux Toolkit](#72-使用-redux-toolkit)
- [8. 🆚 兄弟组件通信方案对比](#8--兄弟组件通信方案对比)
  - [8.1. 对比表格](#81-对比表格)
  - [8.2. 选择建议](#82-选择建议)
  - [8.3. 实际项目建议](#83-实际项目建议)
- [9. 🔗 引用](#9--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 兄弟组件通信的概念
- 状态提升方案
- Context 方案
- 事件总线方案
- 不同方案的对比与选择

## 2. 🫧 评价

兄弟组件通信本质上是通过共同的父组件或全局状态来实现的。

- 状态提升是最简单直接的方案，适合简单场景
- Context 适合跨层级的兄弟组件通信
- 事件总线解耦性最好，但难以追踪
- 复杂项目建议使用状态管理库
- 优先使用状态提升，避免过度设计

## 3. 🤔 什么是兄弟组件通信？

兄弟组件是指在组件树中处于同一层级、拥有相同父组件的组件。

```jsx
function Parent() {
  return (
    <div>
      <ComponentA /> {/* 兄弟组件 A */}
      <ComponentB /> {/* 兄弟组件 B */}
    </div>
  )
}
```

### 3.1. 通信难点

```jsx
// ❌ 兄弟组件无法直接通信
function ComponentA() {
  const data = 'Hello'
  // 无法直接传递给 ComponentB
  return <div>{data}</div>
}

function ComponentB() {
  // 无法直接接收 ComponentA 的数据
  return <div>Waiting for data...</div>
}
```

### 3.2. 解决思路

兄弟组件通信需要借助第三方：

1. **状态提升**：将状态提升到共同父组件
2. **Context**：使用 Context 共享状态
3. **事件总线**：通过发布订阅模式通信
4. **状态管理库**：Redux、Zustand 等

## 4. 🤔 通过状态提升实现通信？

### 4.1. 基本实现

```jsx
// ✅ 状态提升到父组件
function Parent() {
  const [message, setMessage] = useState('')

  return (
    <div>
      {/* A 组件发送消息 */}
      <ComponentA onSend={setMessage} />

      {/* B 组件接收消息 */}
      <ComponentB message={message} />
    </div>
  )
}

function ComponentA({ onSend }) {
  return <button onClick={() => onSend('Hello from A')}>发送消息</button>
}

function ComponentB({ message }) {
  return <div>收到消息：{message}</div>
}
```

### 4.2. 实战示例：Todo 列表

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  return (
    <div>
      {/* 输入组件 */}
      <TodoInput onAdd={addTodo} />

      {/* 列表组件 */}
      <TodoList todos={todos} onToggle={toggleTodo} />

      {/* 统计组件 */}
      <TodoStats todos={todos} />
    </div>
  )
}

function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text)
      setText('')
    }
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>添加</button>
    </div>
  )
}

function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  )
}

function TodoStats({ todos }) {
  const total = todos.length
  const completed = todos.filter((t) => t.done).length

  return (
    <div>
      完成 {completed}/{total}
    </div>
  )
}
```

### 4.3. 复杂场景：商品筛选

```jsx
function ProductPage() {
  const [products] = useState([
    { id: 1, name: '商品A', price: 100, category: '电子' },
    { id: 2, name: '商品B', price: 200, category: '服装' },
  ])

  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
  })

  const filteredProducts = products.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false
    }
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false
    }
    return true
  })

  return (
    <div>
      {/* 筛选器组件 */}
      <ProductFilter filters={filters} onFilterChange={setFilters} />

      {/* 商品列表组件 */}
      <ProductList products={filteredProducts} />

      {/* 结果统计组件 */}
      <ProductCount count={filteredProducts.length} />
    </div>
  )
}
```

## 5. 🤔 通过 Context 实现通信？

### 5.1. 基本用法

```jsx
// 创建 Context
const DataContext = createContext()

function Parent() {
  const [data, setData] = useState('')

  return (
    <DataContext.Provider value={{ data, setData }}>
      <ComponentA />
      <ComponentB />
    </DataContext.Provider>
  )
}

function ComponentA() {
  const { setData } = useContext(DataContext)

  return <button onClick={() => setData('Hello from A')}>发送消息</button>
}

function ComponentB() {
  const { data } = useContext(DataContext)

  return <div>收到消息：{data}</div>
}
```

### 5.2. 实战示例：购物车

```jsx
const CartContext = createContext()

function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (product) => {
    setItems([...items, product])
  }

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, total }}>
      {children}
    </CartContext.Provider>
  )
}

// 商品列表组件
function ProductList() {
  const { addItem } = useContext(CartContext)
  const products = [
    { id: 1, name: '商品A', price: 100 },
    { id: 2, name: '商品B', price: 200 },
  ]

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          {product.name} - ¥{product.price}
          <button onClick={() => addItem(product)}>加入购物车</button>
        </div>
      ))}
    </div>
  )
}

// 购物车组件
function ShoppingCart() {
  const { items, removeItem, total } = useContext(CartContext)

  return (
    <div>
      <h3>购物车</h3>
      {items.map((item) => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => removeItem(item.id)}>删除</button>
        </div>
      ))}
      <p>总计：¥{total}</p>
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <ProductList />
      <ShoppingCart />
    </CartProvider>
  )
}
```

## 6. 🤔 通过事件总线实现通信？

### 6.1. 基本实现

```jsx
// eventBus.js
class EventBus {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    return () => this.off(event, callback)
  }

  off(event, callback) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter((cb) => cb !== callback)
  }

  emit(event, data) {
    if (!this.events[event]) return
    this.events[event].forEach((callback) => callback(data))
  }
}

export default new EventBus()
```

```jsx
import { useEffect, useState } from 'react'
import eventBus from './eventBus'

function ComponentA() {
  const sendMessage = () => {
    eventBus.emit('message', 'Hello from A')
  }

  return <button onClick={sendMessage}>发送消息</button>
}

function ComponentB() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const unsubscribe = eventBus.on('message', (data) => {
      setMessage(data)
    })

    return unsubscribe
  }, [])

  return <div>收到消息：{message}</div>
}

function Parent() {
  return (
    <div>
      <ComponentA />
      <ComponentB />
    </div>
  )
}
```

### 6.2. 实战示例：通知系统

```jsx
// 通知发送器
function NotificationTrigger() {
  const notify = (type, message) => {
    eventBus.emit('notification', { type, message })
  }

  return (
    <div>
      <button onClick={() => notify('success', '操作成功')}>成功通知</button>
      <button onClick={() => notify('error', '操作失败')}>错误通知</button>
    </div>
  )
}

// 通知显示器
function NotificationDisplay() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const unsubscribe = eventBus.on('notification', (data) => {
      const id = Date.now()
      setNotifications((prev) => [...prev, { ...data, id }])

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }, 3000)
    })

    return unsubscribe
  }, [])

  return (
    <div className="notifications">
      {notifications.map((notif) => (
        <div key={notif.id} className={`notification ${notif.type}`}>
          {notif.message}
        </div>
      ))}
    </div>
  )
}
```

## 7. 🤔 通过状态管理库实现通信？

### 7.1. 使用 Zustand

```jsx
import { create } from 'zustand'

// 创建 store
const useStore = create((set) => ({
  message: '',
  setMessage: (message) => set({ message }),
}))

function ComponentA() {
  const setMessage = useStore((state) => state.setMessage)

  return <button onClick={() => setMessage('Hello from A')}>发送消息</button>
}

function ComponentB() {
  const message = useStore((state) => state.message)

  return <div>收到消息：{message}</div>
}
```

### 7.2. 使用 Redux Toolkit

```jsx
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

// 创建 slice
const messageSlice = createSlice({
  name: 'message',
  initialState: { value: '' },
  reducers: {
    setMessage: (state, action) => {
      state.value = action.payload
    },
  },
})

const store = configureStore({
  reducer: {
    message: messageSlice.reducer,
  },
})

function ComponentA() {
  const dispatch = useDispatch()

  return (
    <button onClick={() => dispatch(messageSlice.actions.setMessage('Hello'))}>
      发送消息
    </button>
  )
}

function ComponentB() {
  const message = useSelector((state) => state.message.value)

  return <div>收到消息：{message}</div>
}
```

## 8. 🆚 兄弟组件通信方案对比

### 8.1. 对比表格

| 特性     | 状态提升 | Context    | 事件总线 | 状态管理库 |
| -------- | -------- | ---------- | -------- | ---------- |
| 实现难度 | 简单     | 中等       | 中等     | 复杂       |
| 代码量   | 少       | 中         | 中       | 多         |
| 性能     | 好       | 中         | 好       | 好         |
| 可维护性 | 高       | 中         | 低       | 高         |
| 调试难度 | 低       | 中         | 高       | 低         |
| 适用场景 | 简单通信 | 跨层级通信 | 解耦通信 | 复杂状态   |

### 8.2. 选择建议

::: code-group

```jsx [简单场景：状态提升]
// ✅ 兄弟组件层级近、通信简单
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter count={count} onIncrement={() => setCount(count + 1)} />
      <Display count={count} />
    </>
  )
}
```

```jsx [跨层级：Context]
// ✅ 兄弟组件嵌套深、多处使用
const ThemeContext = createContext()

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Sidebar /> {/* 深层嵌套 */}
      <Content /> {/* 深层嵌套 */}
    </ThemeContext.Provider>
  )
}
```

```jsx [解耦场景：事件总线]
// ✅ 组件完全独立、临时通信
function ModuleA() {
  eventBus.emit('action', data)
}

function ModuleB() {
  useEffect(() => {
    return eventBus.on('action', handler)
  }, [])
}
```

```jsx [复杂状态：Redux]
// ✅ 大型应用、复杂状态管理
function FeatureA() {
  const dispatch = useDispatch()
  dispatch(updateData(newData))
}

function FeatureB() {
  const data = useSelector((state) => state.data)
}
```

:::

### 8.3. 实际项目建议

```jsx
// 推荐的组合使用
function App() {
  // 1. 局部状态：状态提升
  const [localState, setLocalState] = useState()

  // 2. 全局配置：Context
  const theme = useContext(ThemeContext)

  // 3. 业务状态：状态管理库
  const user = useSelector((state) => state.user)

  // 4. 事件通知：事件总线（谨慎使用）
  useEffect(() => {
    return eventBus.on('notification', handler)
  }, [])

  return (
    <div>
      {/* 简单通信用 props */}
      <ChildA data={localState} onChange={setLocalState} />
      <ChildB data={localState} />
    </div>
  )
}
```

## 9. 🔗 引用

- [React 官方文档 - 状态提升][1]
- [React 官方文档 - Context][2]
- [Zustand 文档][3]

[1]: https://react.dev/learn/sharing-state-between-components
[2]: https://react.dev/learn/passing-data-deeply-with-context
[3]: https://github.com/pmndrs/zustand
