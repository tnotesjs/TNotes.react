# [0083. state 更新机制](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0083.%20state%20%E6%9B%B4%E6%96%B0%E6%9C%BA%E5%88%B6)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 State 更新是同步还是异步的？](#3--state-更新是同步还是异步的)
  - [3.1. React 18 的更新行为](#31-react-18-的更新行为)
  - [3.2. React 事件处理器中的批量更新](#32-react-事件处理器中的批量更新)
  - [3.3. 异步操作中的批量更新（React 18）](#33-异步操作中的批量更新react-18)
  - [3.4. 强制同步更新（不推荐）](#34-强制同步更新不推荐)
- [4. 🤔 如何基于旧值更新 State？](#4--如何基于旧值更新-state)
  - [4.1. 直接赋值 vs 函数式更新](#41-直接赋值-vs-函数式更新)
  - [4.2. 复杂对象的更新](#42-复杂对象的更新)
  - [4.3. 数组的更新](#43-数组的更新)
- [5. 🤔 为什么多次更新只生效一次？](#5--为什么多次更新只生效一次)
  - [5.1. 问题演示](#51-问题演示)
  - [5.2. 原因分析](#52-原因分析)
  - [5.3. 解决方案](#53-解决方案)
  - [5.4. 对象更新的合并](#54-对象更新的合并)
- [6. 🤔 如何在更新后获取最新值？](#6--如何在更新后获取最新值)
  - [6.1. 使用 useEffect](#61-使用-useeffect)
  - [6.2. 使用 ref 存储最新值](#62-使用-ref-存储最新值)
  - [6.3. 使用回调函数](#63-使用回调函数)
- [7. 🤔 State 更新的常见陷阱？](#7--state-更新的常见陷阱)
  - [7.1. 陷阱 1：闭包陷阱](#71-陷阱-1闭包陷阱)
  - [7.2. 陷阱 2：异步操作中的过期值](#72-陷阱-2异步操作中的过期值)
  - [7.3. 陷阱 3：依赖对象引用](#73-陷阱-3依赖对象引用)
  - [7.4. 陷阱 4：直接修改 State](#74-陷阱-4直接修改-state)
- [8. 🔗 引用](#8--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- State 更新的同步与异步行为
- 函数式更新的使用场景
- 批量更新机制
- 获取更新后 State 的方法
- 常见更新陷阱及解决方案

## 2. 🫧 评价

理解 State 更新机制是掌握 React 的关键，能避免很多令人困惑的 bug。

- React 18 中所有更新都是异步批量处理的，提升性能
- 使用函数式更新可以确保基于最新值计算
- 多次 setState 会被合并，需要注意更新逻辑
- 不要在更新后立即读取 state，使用 useEffect 监听变化
- 理解闭包陷阱，避免在异步操作中使用过期的 state

## 3. 🤔 State 更新是同步还是异步的？

### 3.1. React 18 的更新行为

```jsx
// React 18：所有更新都是异步批量处理
function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    console.log('更新前：', count) // 0
    setCount(count + 1)
    console.log('更新后：', count) // ❌ 还是 0，不是 1
  }

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
```

### 3.2. React 事件处理器中的批量更新

```jsx
function BatchUpdate() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  console.log('渲染')

  const handleClick = () => {
    setCount((c) => c + 1)
    setFlag((f) => !f)
    setCount((c) => c + 1)
    // ✅ 只触发一次渲染，所有更新被批处理
  }

  return (
    <div>
      <p>计数：{count}</p>
      <p>标志：{flag ? '真' : '假'}</p>
      <button onClick={handleClick}>更新</button>
    </div>
  )
}
```

### 3.3. 异步操作中的批量更新（React 18）

```jsx
function AsyncUpdate() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // React 18：异步操作中也会批量更新
    setTimeout(() => {
      setCount((c) => c + 1)
      setCount((c) => c + 1)
      // ✅ React 18：只渲染一次
      // ❌ React 17：渲染两次
    }, 1000)

    fetch('/api/data').then(() => {
      setCount((c) => c + 1)
      setCount((c) => c + 1)
      // ✅ React 18：只渲染一次
    })
  }

  return <button onClick={handleClick}>更新</button>
}
```

### 3.4. 强制同步更新（不推荐）

```jsx
import { flushSync } from 'react-dom'

function SyncUpdate() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    flushSync(() => {
      setCount((c) => c + 1)
    })
    // ✅ 这里 count 已经更新了
    console.log(count) // 输出新值

    flushSync(() => {
      setCount((c) => c + 1)
    })
    // ⚠️ 会触发两次渲染，影响性能
  }

  return <button onClick={handleClick}>+1</button>
}
```

## 4. 🤔 如何基于旧值更新 State？

### 4.1. 直接赋值 vs 函数式更新

::: code-group

```jsx [❌ 错误：直接使用]
function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // ❌ 使用闭包中的值，可能过期
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    // 结果：count 只增加 1，不是 3
  }

  return <button onClick={handleClick}>+3</button>
}
```

```jsx [✅ 正确：函数式更新]
function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // ✅ 使用函数式更新
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    // 结果：count 增加 3
  }

  return <button onClick={handleClick}>+3</button>
}
```

:::

### 4.2. 复杂对象的更新

::: code-group

```jsx [❌ 错误：丢失其他属性]
function UserProfile() {
  const [user, setUser] = useState({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
  })

  const updateName = (newName) => {
    // ❌ 丢失了 age 和 email
    setUser({ name: newName })
  }

  return <input onChange={(e) => updateName(e.target.value)} />
}
```

```jsx [✅ 正确：保留其他属性]
function UserProfile() {
  const [user, setUser] = useState({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
  })

  const updateName = (newName) => {
    // ✅ 使用展开运算符保留其他属性
    setUser((prev) => ({
      ...prev,
      name: newName,
    }))
  }

  return <input onChange={(e) => updateName(e.target.value)} />
}
```

:::

### 4.3. 数组的更新

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React', done: false },
    { id: 2, text: '写代码', done: false },
  ])

  // ✅ 添加元素
  const addTodo = (text) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        done: false,
      },
    ])
  }

  // ✅ 删除元素
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // ✅ 更新元素
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  return <div>...</div>
}
```

## 5. 🤔 为什么多次更新只生效一次？

### 5.1. 问题演示

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // ❌ 三次更新，count 只增加 1
    setCount(count + 1) // 0 + 1 = 1
    setCount(count + 1) // 0 + 1 = 1
    setCount(count + 1) // 0 + 1 = 1
    console.log(count) // 还是 0
  }

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={handleClick}>+3？</button>
    </div>
  )
}
```

### 5.2. 原因分析

```jsx
// 原因：count 被闭包捕获了
function handleClick() {
  const currentCount = 0 // 闭包中的 count

  setCount(currentCount + 1) // 设置为 1
  setCount(currentCount + 1) // 设置为 1
  setCount(currentCount + 1) // 设置为 1

  // React 批量处理，最后一次设置生效
}
```

### 5.3. 解决方案

::: code-group

```jsx [✅ 方案1：函数式更新]
function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // ✅ 每次都基于最新值计算
    setCount((c) => c + 1) // c = 0, 返回 1
    setCount((c) => c + 1) // c = 1, 返回 2
    setCount((c) => c + 1) // c = 2, 返回 3
  }

  return <button onClick={handleClick}>+3</button>
}
```

```jsx [✅ 方案2：一次更新]
function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // ✅ 一次更新完成
    setCount(count + 3)
  }

  return <button onClick={handleClick}>+3</button>
}
```

:::

### 5.4. 对象更新的合并

```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0,
  })

  const handleSubmit = () => {
    // ❌ 只有最后一次生效
    setFormData({ name: '张三' })
    setFormData({ email: 'zhangsan@example.com' })
    setFormData({ age: 25 })
    // 结果：{ age: 25 }，name 和 email 丢失

    // ✅ 正确做法
    setFormData((prev) => ({
      ...prev,
      name: '张三',
      email: 'zhangsan@example.com',
      age: 25,
    }))
  }

  return <button onClick={handleSubmit}>提交</button>
}
```

## 6. 🤔 如何在更新后获取最新值？

### 6.1. 使用 useEffect

::: code-group

```jsx [❌ 错误：立即读取]
function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    console.log('新值：', count) // ❌ 还是旧值
  }

  return <button onClick={handleClick}>+1</button>
}
```

```jsx [✅ 正确：使用 useEffect]
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('count 更新了：', count) // ✅ 最新值
  }, [count])

  const handleClick = () => {
    setCount(count + 1)
  }

  return <button onClick={handleClick}>+1</button>
}
```

:::

### 6.2. 使用 ref 存储最新值

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)

  useEffect(() => {
    countRef.current = count
  }, [count])

  const handleClick = () => {
    setCount(count + 1)

    // 在异步操作中使用
    setTimeout(() => {
      console.log('最新值：', countRef.current) // ✅ 获取最新值
    }, 1000)
  }

  return <button onClick={handleClick}>+1</button>
}
```

### 6.3. 使用回调函数

```jsx
function DataFetcher() {
  const [data, setData] = useState(null)

  const fetchData = (callback) => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((newData) => {
        setData(newData)
        // ✅ 在回调中使用新值
        callback?.(newData)
      })
  }

  const handleFetch = () => {
    fetchData((newData) => {
      console.log('获取到的数据：', newData)
    })
  }

  return <button onClick={handleFetch}>获取数据</button>
}
```

## 7. 🤔 State 更新的常见陷阱？

### 7.1. 陷阱 1：闭包陷阱

::: code-group

```jsx [❌ 闭包问题]
function Timer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      // ❌ count 永远是 0
      setCount(count + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, []) // 空依赖，count 被闭包捕获

  return <div>{count}</div>
}
```

```jsx [✅ 函数式更新]
function Timer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      // ✅ 使用函数式更新
      setCount((c) => c + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <div>{count}</div>
}
```

:::

### 7.2. 陷阱 2：异步操作中的过期值

::: code-group

```jsx [❌ 使用过期值]
function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    const data = await fetch(`/api/search?q=${query}`)
    const json = await data.json()

    // ❌ 如果用户快速输入，query 可能已经变了
    setResults(json)
  }

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)
        handleSearch()
      }}
    />
  )
}
```

```jsx [✅ 使用 useEffect]
function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) return

    let cancelled = false

    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ 检查是否已取消
        if (!cancelled) {
          setResults(data)
        }
      })

    return () => {
      cancelled = true
    }
  }, [query])

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />
}
```

:::

### 7.3. 陷阱 3：依赖对象引用

::: code-group

```jsx [❌ 每次都创建新对象]
function UserProfile() {
  const [user, setUser] = useState({ name: '张三', age: 25 })

  useEffect(() => {
    console.log('user 变化了')
    // ⚠️ 每次渲染都会执行，因为对象引用变了
  }, [user])

  const updateAge = () => {
    // ❌ 即使值相同，也创建了新对象
    setUser({ name: '张三', age: 25 })
  }

  return <button onClick={updateAge}>更新</button>
}
```

```jsx [✅ 只在值变化时更新]
function UserProfile() {
  const [user, setUser] = useState({ name: '张三', age: 25 })

  useEffect(() => {
    console.log('user 变化了')
  }, [user.name, user.age]) // ✅ 依赖具体的值

  const updateAge = (newAge) => {
    setUser((prev) => {
      // ✅ 值相同时不更新
      if (prev.age === newAge) return prev
      return { ...prev, age: newAge }
    })
  }

  return <button onClick={() => updateAge(25)}>更新</button>
}
```

:::

### 7.4. 陷阱 4：直接修改 State

::: code-group

```jsx [❌ 直接修改]
function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, text: '学习', done: false }])

  const toggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id)
    // ❌ 直接修改了对象
    todo.done = !todo.done
    setTodos(todos) // ❌ 引用相同，不会触发更新
  }

  return <div>...</div>
}
```

```jsx [✅ 创建新对象]
function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, text: '学习', done: false }])

  const toggleTodo = (id) => {
    // ✅ 创建新数组和新对象
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  return <div>...</div>
}
```

:::

## 8. 🔗 引用

- [React 官方文档 - State 更新队列][1]
- [React 官方文档 - 批量更新][2]
- [React 18 自动批处理][3]

[1]: https://react.dev/learn/queueing-a-series-of-state-updates
[2]: https://react.dev/learn/state-as-a-snapshot
[3]: https://github.com/reactwg/react-18/discussions/21
