# [0167. 派生状态（Derived State）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0167.%20%E6%B4%BE%E7%94%9F%E7%8A%B6%E6%80%81%EF%BC%88Derived%20State%EF%BC%89)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 什么是派生状态？](#3-什么是派生状态)
  - [3.1. 基本概念](#31-基本概念)
  - [3.2. 派生状态的特征](#32-派生状态的特征)
- [4. � 为什么避免存储派生状态？](#4--为什么避免存储派生状态)
  - [4.1. 问题 1：数据不一致](#41-问题-1数据不一致)
  - [4.2. 问题 2：代码复杂度增加](#42-问题-2代码复杂度增加)
  - [4.3. 问题 3：容易出错](#43-问题-3容易出错)
- [5. 如何正确使用派生状态？](#5-如何正确使用派生状态)
  - [5.1. 方法 1：直接计算](#51-方法-1直接计算)
  - [5.2. 方法 2：使用函数封装](#52-方法-2使用函数封装)
  - [5.3. 方法 3：避免从 props 派生状态](#53-方法-3避免从-props-派生状态)
- [6. 什么时候需要缓存派生值？](#6-什么时候需要缓存派生值)
  - [6.1. 使用 useMemo 的时机](#61-使用-usememo-的时机)
  - [6.2. 性能对比](#62-性能对比)
  - [6.3. useMemo 的正确使用](#63-usememo-的正确使用)
- [7. 派生状态的常见陷阱？](#7-派生状态的常见陷阱)
  - [7.1. 陷阱 1：过度使用 useMemo](#71-陷阱-1过度使用-usememo)
  - [7.2. 陷阱 2：忘记依赖项](#72-陷阱-2忘记依赖项)
  - [7.3. 陷阱 3：在循环中计算](#73-陷阱-3在循环中计算)
  - [7.4. 陷阱 4：从 props 派生复杂状态](#74-陷阱-4从-props-派生复杂状态)
  - [7.5. 陷阱 5：派生状态依赖其他派生状态](#75-陷阱-5派生状态依赖其他派生状态)
- [8. 引用](#8-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 派生状态的概念和特点
- 避免存储派生状态的原因
- 正确使用派生状态的方法
- 使用 useMemo 缓存派生值
- 派生状态的常见错误

## 2. 评价

派生状态是可以从现有状态计算得出的值，理解它能避免状态冗余和同步问题。

- 派生状态不应该存储，应该在渲染时计算
- 存储派生状态会导致数据不一致和维护困难
- 大多数派生计算都很快，不需要缓存
- 只有昂贵的计算才需要使用 useMemo 优化
- 从 props 派生状态要特别小心，通常应该直接使用 props

## 3. 什么是派生状态？

### 3.1. 基本概念

派生状态是指可以从现有的 state 或 props 计算得出的值。

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习', done: false },
    { id: 2, text: '工作', done: true },
  ])

  // ✅ 派生状态：直接计算
  const completedCount = todos.filter((t) => t.done).length
  const activeCount = todos.filter((t) => !t.done).length
  const allCompleted = todos.length > 0 && todos.every((t) => t.done)

  return (
    <div>
      <p>已完成：{completedCount}</p>
      <p>未完成：{activeCount}</p>
      <p>全部完成：{allCompleted ? '是' : '否'}</p>
    </div>
  )
}
```

### 3.2. 派生状态的特征

```jsx
function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: '商品A', price: 100, quantity: 2 },
    { id: 2, name: '商品B', price: 50, quantity: 3 },
  ])

  // ✅ 这些都是派生值，不应该存储为 state
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const tax = subtotal * 0.1
  const total = subtotal + tax
  const itemCount = items.length

  return (
    <div>
      <p>商品数量：{itemCount}</p>
      <p>小计：¥{subtotal}</p>
      <p>税费：¥{tax}</p>
      <p>总计：¥{total}</p>
    </div>
  )
}
```

## 4. � 为什么避免存储派生状态？

### 4.1. 问题 1：数据不一致

::: code-group

```jsx [❌ 存储派生状态]
function BadTodoList() {
  const [todos, setTodos] = useState([])
  // ❌ 存储派生状态
  const [completedCount, setCompletedCount] = useState(0)

  const addTodo = (text) => {
    setTodos([...todos, { text, done: false }])
    // ❌ 容易忘记更新
    // 数据不一致
  }

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo,
    )
    setTodos(newTodos)
    // ❌ 需要手动同步
    setCompletedCount(newTodos.filter((t) => t.done).length)
  }

  return <div>已完成：{completedCount}</div>
}
```

```jsx [✅ 直接计算]
function GoodTodoList() {
  const [todos, setTodos] = useState([])

  // ✅ 直接计算，永远正确
  const completedCount = todos.filter((t) => t.done).length

  const addTodo = (text) => {
    setTodos([...todos, { text, done: false }])
    // ✅ 不需要手动更新
  }

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo,
      ),
    )
    // ✅ 自动同步
  }

  return <div>已完成：{completedCount}</div>
}
```

:::

### 4.2. 问题 2：代码复杂度增加

```jsx
// ❌ 存储派生状态导致代码复杂
function BadForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  // ❌ 存储全名
  const [fullName, setFullName] = useState('')

  const updateFirstName = (name) => {
    setFirstName(name)
    setFullName(`${name} ${lastName}`) // 需要同步
  }

  const updateLastName = (name) => {
    setLastName(name)
    setFullName(`${firstName} ${name}`) // 需要同步
  }

  // 每个更新都要维护 fullName
  return <div>...</div>
}

// ✅ 直接计算更简单
function GoodForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // ✅ 自动计算
  const fullName = `${firstName} ${lastName}`.trim()

  return <div>全名：{fullName}</div>
}
```

### 4.3. 问题 3：容易出错

```jsx
// ❌ 多处更新容易遗漏
function BadInventory() {
  const [items, setItems] = useState([])
  // ❌ 存储总价
  const [totalPrice, setTotalPrice] = useState(0)

  const addItem = (item) => {
    setItems([...items, item])
    setTotalPrice(totalPrice + item.price) // 可能出错
  }

  const removeItem = (id) => {
    const item = items.find((i) => i.id === id)
    setItems(items.filter((i) => i.id !== id))
    // ❌ 容易忘记更新
    // setTotalPrice(totalPrice - item.price)
  }

  const updateQuantity = (id, quantity) => {
    // ❌ 更新逻辑变得复杂
    const oldItem = items.find((i) => i.id === id)
    const newItems = items.map((i) => (i.id === id ? { ...i, quantity } : i))
    setItems(newItems)
    setTotalPrice(
      totalPrice - oldItem.price + newItems.find((i) => i.id === id).price,
    )
  }
}
```

## 5. 如何正确使用派生状态？

### 5.1. 方法 1：直接计算

```jsx
function DataList() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('name')

  // ✅ 每次渲染时计算
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()),
  )

  const sortedItems = [...filteredItems].sort((a, b) =>
    a[sortBy] > b[sortBy] ? 1 : -1,
  )

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {sortedItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

### 5.2. 方法 2：使用函数封装

```jsx
function Statistics() {
  const [scores, setScores] = useState([85, 90, 78, 92, 88])

  // ✅ 封装计算逻辑
  const getAverage = (arr) => arr.reduce((sum, n) => sum + n, 0) / arr.length

  const getMax = (arr) => Math.max(...arr)
  const getMin = (arr) => Math.min(...arr)

  const average = getAverage(scores)
  const max = getMax(scores)
  const min = getMin(scores)

  return (
    <div>
      <p>平均分：{average}</p>
      <p>最高分：{max}</p>
      <p>最低分：{min}</p>
    </div>
  )
}
```

### 5.3. 方法 3：避免从 props 派生状态

::: code-group

```jsx [❌ 从 props 派生]
function BadEmailInput({ defaultEmail }) {
  // ❌ 从 props 派生 state
  const [email, setEmail] = useState(defaultEmail)

  // defaultEmail 变化时，email 不会更新
  return <input value={email} onChange={(e) => setEmail(e.target.value)} />
}
```

```jsx [✅ 直接使用 props]
function GoodEmailInput({ email, onChange }) {
  // ✅ 直接使用 props（受控组件）
  return <input value={email} onChange={onChange} />
}
```

```jsx [✅ 使用 key 重置]
function EmailInputWithKey({ userId, defaultEmail }) {
  const [email, setEmail] = useState(defaultEmail)

  return <input value={email} onChange={(e) => setEmail(e.target.value)} />
}

// ✅ 使用 key 强制重新创建
;<EmailInputWithKey
  key={userId} // userId 变化时重新创建组件
  userId={userId}
  defaultEmail={userEmail}
/>
```

:::

## 6. 什么时候需要缓存派生值？

### 6.1. 使用 useMemo 的时机

```jsx
function ExpensiveCalculation() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('')
  const [unrelatedState, setUnrelatedState] = useState(0)

  // ❌ 不需要 useMemo：计算很快
  const count = items.length

  // ❌ 不需要 useMemo：简单过滤
  const filtered = items.filter((item) => item.active)

  // ✅ 需要 useMemo：昂贵的计算
  const expensiveResult = useMemo(() => {
    console.log('执行昂贵计算')
    return items.map((item) => ({
      ...item,
      // 复杂的转换逻辑
      processed: heavyProcessing(item),
    }))
  }, [items])

  // ✅ 需要 useMemo：避免引用变化
  const config = useMemo(
    () => ({
      items: expensiveResult,
      filter,
    }),
    [expensiveResult, filter],
  )

  return <ExpensiveChild config={config} />
}
```

### 6.2. 性能对比

```jsx
function PerformanceComparison() {
  const [items] = useState(Array.from({ length: 10000 }, (_, i) => i))
  const [filter, setFilter] = useState(0)

  // ❌ 每次渲染都执行（即使 items 没变）
  const processed1 = items.map((item) => item * 2)

  // ✅ 只在 items 变化时执行
  const processed2 = useMemo(() => {
    console.log('计算 processed2')
    return items.map((item) => item * 2)
  }, [items])

  return (
    <div>
      <button onClick={() => setFilter(filter + 1)}>
        更新 filter（{filter}）
      </button>
      {/* 更新 filter 时，processed1 会重新计算，processed2 不会 */}
    </div>
  )
}
```

### 6.3. useMemo 的正确使用

```jsx
function DataVisualization() {
  const [data, setData] = useState([])
  const [chartType, setChartType] = useState('line')

  // ✅ 缓存昂贵的数据处理
  const processedData = useMemo(() => {
    console.log('处理数据')
    return data.map((item) => ({
      ...item,
      normalized: normalizeValue(item.value),
      aggregated: aggregateRelatedData(item),
    }))
  }, [data])

  // ✅ 缓存图表配置对象
  const chartConfig = useMemo(
    () => ({
      type: chartType,
      data: processedData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }),
    [chartType, processedData],
  )

  return <Chart config={chartConfig} />
}
```

## 7. 派生状态的常见陷阱？

### 7.1. 陷阱 1：过度使用 useMemo

::: code-group

```jsx [❌ 过度优化]
function OverOptimized() {
  const [name, setName] = useState('')

  // ❌ 不需要：计算太简单
  const uppercaseName = useMemo(() => name.toUpperCase(), [name])

  // ❌ 不需要：简单拼接
  const greeting = useMemo(() => `Hello, ${name}`, [name])

  return <div>{greeting}</div>
}
```

```jsx [✅ 合理使用]
function Optimized() {
  const [name, setName] = useState('')

  // ✅ 直接计算
  const uppercaseName = name.toUpperCase()
  const greeting = `Hello, ${name}`

  return <div>{greeting}</div>
}
```

:::

### 7.2. 陷阱 2：忘记依赖项

```jsx
function MissingDependency() {
  const [items, setItems] = useState([])
  const [multiplier, setMultiplier] = useState(2)

  // ❌ 忘记 multiplier 依赖
  const processed = useMemo(() => {
    return items.map((item) => item * multiplier)
  }, [items]) // ❌ 缺少 multiplier

  // ✅ 正确的依赖
  const processedCorrect = useMemo(() => {
    return items.map((item) => item * multiplier)
  }, [items, multiplier])
}
```

### 7.3. 陷阱 3：在循环中计算

::: code-group

```jsx [❌ 重复计算]
function BadList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {/* ❌ 每个 item 都计算一次总数 */}
          总数：{items.length}
          项目：{item.name}
        </div>
      ))}
    </div>
  )
}
```

```jsx [✅ 提前计算]
function GoodList({ items }) {
  // ✅ 只计算一次
  const total = items.length

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          总数：{total}
          项目：{item.name}
        </div>
      ))}
    </div>
  )
}
```

:::

### 7.4. 陷阱 4：从 props 派生复杂状态

```jsx
// ❌ 从 props 派生状态（错误）
function BadUserForm({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  })

  // ❌ user 变化时，formData 不会更新

  return <form>...</form>
}

// ✅ 方案 1：使用 useEffect 同步
function GoodUserForm1({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  })

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
    })
  }, [user])

  return <form>...</form>
}

// ✅ 方案 2：使用 key 重置
function GoodUserForm2({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  })

  return <form>...</form>
}

// 使用时添加 key
;<GoodUserForm2 key={user.id} user={user} />

// ✅ 方案 3：受控组件（最推荐）
function GoodUserForm3({ user, onUpdate }) {
  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => onUpdate({ ...user, name: e.target.value })}
      />
      <input
        value={user.email}
        onChange={(e) => onUpdate({ ...user, email: e.target.value })}
      />
    </form>
  )
}
```

### 7.5. 陷阱 5：派生状态依赖其他派生状态

```jsx
function NestedDerived() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('')

  // ✅ 第一层派生
  const filteredItems = useMemo(
    () => items.filter((item) => item.name.includes(filter)),
    [items, filter],
  )

  // ✅ 第二层派生（依赖第一层）
  const sortedItems = useMemo(
    () => [...filteredItems].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredItems],
  )

  // ✅ 第三层派生（依赖第二层）
  const groupedItems = useMemo(() => {
    const groups = {}
    sortedItems.forEach((item) => {
      const category = item.category || 'other'
      groups[category] = groups[category] || []
      groups[category].push(item)
    })
    return groups
  }, [sortedItems])

  return <div>...</div>
}
```

## 8. 引用

- [React 官方文档 - 避免派生状态][1]
- [React 官方文档 - useMemo][2]
- [React 性能优化指南][3]

[1]: https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state
[2]: https://react.dev/reference/react/useMemo
[3]: https://react.dev/learn/render-and-commit
