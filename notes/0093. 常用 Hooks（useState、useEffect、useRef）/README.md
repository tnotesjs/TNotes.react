# [0093. 常用 Hooks（useState、useEffect、useRef）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0093.%20%E5%B8%B8%E7%94%A8%20Hooks%EF%BC%88useState%E3%80%81useEffect%E3%80%81useRef%EF%BC%89)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. useState 的基本用法是什么？](#3-usestate-的基本用法是什么)
- [4. useEffect 的基本用法是什么？](#4-useeffect-的基本用法是什么)
- [5. useRef 的基本用法是什么？](#5-useref-的基本用法是什么)
- [6. 这三个 Hooks 如何配合使用？](#6-这三个-hooks-如何配合使用)
- [7. 这些 Hooks 有哪些常见错误？](#7-这些-hooks-有哪些常见错误)
- [8. 如何选择合适的 Hook？](#8-如何选择合适的-hook)
- [9. useState vs useEffect vs useRef 对比](#9-usestate-vs-useeffect-vs-useref-对比)
- [10. 引用](#10-引用)

<!-- endregion:toc -->

## 1. 本节内容

- useState 的基本用法与进阶技巧
- useEffect 的基本用法与依赖控制
- useRef 的基本用法与应用场景
- 三个 Hooks 的配合使用
- 常见错误与解决方案
- Hook 选择的决策依据
- 三个 Hooks 的详细对比

## 2. 评价

useState、useEffect、useRef 是 React Hooks 中最基础、最常用的三个，掌握它们是使用函数组件的前提。

- useState 用于管理组件状态，触发重渲染，适合存储 UI 相关数据
- useEffect 用于处理副作用（数据获取、订阅、DOM 操作），替代生命周期方法
- useRef 用于存储可变值或引用 DOM，不触发重渲染，适合存储不影响 UI 的数据
- 三者配合使用可以实现类组件的所有功能，且代码更简洁
- useState 更新是异步批处理，useRef 更新是同步的，需要理解两者区别
- 常见错误包括依赖数组不完整、useState 与 useRef 混用、忘记清理副作用
- 选择 Hook 的关键是判断数据变化是否需要触发重渲染

## 3. useState 的基本用法是什么？

useState 用于在函数组件中添加状态，状态变化会触发组件重渲染。

```tsx
// 基本用法
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  )
}
```

**惰性初始化：**

```tsx
// 避免每次渲染都执行昂贵的初始化计算
function ExpensiveComponent() {
  // ❌ 错误：每次渲染都会执行
  const [data, setData] = useState(expensiveComputation())

  // ✅ 正确：只在首次渲染时执行
  const [data, setData] = useState(() => expensiveComputation())

  return <div>{data}</div>
}

function expensiveComputation() {
  console.log('执行昂贵的计算')
  return Array.from({ length: 1000 }, (_, i) => i)
}
```

**函数式更新：**

```tsx
function FunctionalUpdate() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // ❌ 问题：基于旧值更新，可能出现问题
    setCount(count + 1)
    setCount(count + 1) // 两次调用，count 只增加 1

    // ✅ 正确：使用函数式更新
    setCount((prevCount) => prevCount + 1)
    setCount((prevCount) => prevCount + 1) // count 增加 2
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>增加</button>
    </div>
  )
}
```

**复杂状态管理：**

```tsx
// 对象状态
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0,
  })

  const handleChange = (field: string, value: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }))
  }

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <input
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => handleChange('age', Number(e.target.value))}
      />
    </form>
  )
}

// 数组状态
function TodoList() {
  const [todos, setTodos] = useState<string[]>([])

  const addTodo = (todo: string) => {
    setTodos((prevTodos) => [...prevTodos, todo])
  }

  const removeTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index))
  }

  return (
    <div>
      <button onClick={() => addTodo('新任务')}>添加</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## 4. useEffect 的基本用法是什么？

useEffect 用于处理副作用，通过依赖数组控制执行时机。

```tsx
// 基本用法
function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data))
  }, []) // 空依赖数组，只在挂载时执行

  return <div>{data?.name}</div>
}
```

**依赖数组的三种形式：**

```tsx
function EffectDependencies({ userId }: { userId: number }) {
  const [count, setCount] = useState(0)

  // 1. 无依赖数组：每次渲染后都执行
  useEffect(() => {
    console.log('每次渲染后执行')
  })

  // 2. 空依赖数组：只在挂载时执行
  useEffect(() => {
    console.log('只在挂载时执行')
  }, [])

  // 3. 指定依赖：依赖变化时执行
  useEffect(() => {
    console.log('userId 变化时执行：', userId)
  }, [userId])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}
```

**清理函数：**

```tsx
function TimerWithCleanup() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('启动定时器')
    const timer = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)

    // 返回清理函数
    return () => {
      console.log('清理定时器')
      clearInterval(timer)
    }
  }, []) // 空依赖，清理函数在卸载时执行

  return <div>Count: {count}</div>
}
```

**多个副作用的组织：**

```tsx
function MultipleEffects({ userId, theme }: { userId: number; theme: string }) {
  const [user, setUser] = useState(null)

  // 副作用 1：获取用户数据
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [userId])

  // 副作用 2：设置主题
  useEffect(() => {
    document.body.className = theme
    return () => {
      document.body.className = ''
    }
  }, [theme])

  // 副作用 3：设置文档标题
  useEffect(() => {
    document.title = user?.name || '加载中...'
  }, [user])

  return <div>{user?.name}</div>
}
```

## 5. useRef 的基本用法是什么？

useRef 用于存储可变值或引用 DOM 元素，更新不触发重渲染。

```tsx
// 用法 1：引用 DOM 元素
function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>聚焦输入框</button>
    </div>
  )
}
```

**存储可变值：**

```tsx
// 用法 2：存储不触发重渲染的值
function RenderCount() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)

  // 每次渲染都会执行，但不触发重渲染
  renderCount.current++

  return (
    <div>
      <p>状态 count: {count}</p>
      <p>渲染次数: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}
```

**保存前一次的值：**

```tsx
function usePrevious<T>(value: T) {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function ComparePrevious({ count }: { count: number }) {
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>当前值: {count}</p>
      <p>上一次的值: {prevCount}</p>
    </div>
  )
}
```

**存储定时器 ID：**

```tsx
function Timer() {
  const [time, setTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout>()

  const start = () => {
    if (timerRef.current) return // 防止重复启动
    timerRef.current = setInterval(() => {
      setTime((t) => t + 1)
    }, 1000)
  }

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = undefined
    }
  }

  useEffect(() => {
    return () => stop() // 组件卸载时清理
  }, [])

  return (
    <div>
      <p>时间: {time}秒</p>
      <button onClick={start}>开始</button>
      <button onClick={stop}>停止</button>
    </div>
  )
}
```

## 6. 这三个 Hooks 如何配合使用？

三个 Hooks 组合使用可以实现复杂的功能。

```tsx
// 完整示例：搜索功能
function SearchComponent() {
  const [query, setQuery] = useState('') // 搜索关键词
  const [results, setResults] = useState([]) // 搜索结果
  const [loading, setLoading] = useState(false) // 加载状态
  const inputRef = useRef<HTMLInputElement>(null) // 输入框引用
  const abortControllerRef = useRef<AbortController>() // 请求控制器

  // 自动聚焦输入框
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 搜索副作用
  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    // 取消上一次请求
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    setLoading(true)

    fetch(`/api/search?q=${query}`, {
      signal: abortControllerRef.current.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setLoading(false)
        }
      })

    // 清理函数
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [query])

  return (
    <div>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索..."
      />
      {loading && <p>加载中...</p>}
      <ul>
        {results.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

**自动保存功能：**

```tsx
function AutoSave() {
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(true)
  const timerRef = useRef<NodeJS.Timeout>()

  // 自动保存
  useEffect(() => {
    setSaved(false)

    // 防抖：延迟保存
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ content }),
      }).then(() => setSaved(true))
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [content])

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <p>{saved ? '已保存' : '保存中...'}</p>
    </div>
  )
}
```

## 7. 这些 Hooks 有哪些常见错误？

```tsx
// ❌ 错误 1：useState 与 useRef 混淆
function WrongUsage() {
  const count = useRef(0) // ❌ 应该用 useState

  const increment = () => {
    count.current++ // 不会触发重渲染
    console.log(count.current) // 值已更新
  }

  // UI 不会更新！
  return (
    <div>
      <p>Count: {count.current}</p>
      <button onClick={increment}>增加</button>
    </div>
  )
}

// ✅ 正确：使用 useState
function CorrectUsage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}
```

```tsx
// ❌ 错误 2：直接修改 useState 的值
function DirectMutation() {
  const [user, setUser] = useState({ name: 'Alice', age: 25 })

  const updateAge = () => {
    user.age = 26 // ❌ 直接修改，不会触发重渲染
    setUser(user) // ❌ 引用相同，React 认为没有变化
  }

  // ✅ 正确：创建新对象
  const updateAgeCorrect = () => {
    setUser({ ...user, age: 26 })
  }
}
```

```tsx
// ❌ 错误 3：useEffect 依赖数组不完整
function IncompleteDeps() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(2)

  useEffect(() => {
    const result = count * multiplier // ❌ 使用了 multiplier
    console.log(result)
  }, [count]) // ⚠️ 缺少 multiplier 依赖

  // ✅ 正确：包含所有依赖
  useEffect(() => {
    const result = count * multiplier
    console.log(result)
  }, [count, multiplier])
}
```

```tsx
// ❌ 错误 4：useRef 触发副作用
function RefSideEffect() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++ // ✅ 可以在 useEffect 中更新
  })

  // ❌ 错误：在渲染期间读取 ref
  console.log('渲染次数:', renderCount.current) // 可能不准确

  return <div>Count: {count}</div>
}
```

## 8. 如何选择合适的 Hook？

根据需求选择合适的 Hook。

```tsx
// 决策流程
function HookDecision() {
  // 问题 1：数据变化需要触发重渲染吗？
  // 是 → useState，否 → useRef

  const [uiData, setUiData] = useState(0) // ✅ UI 数据用 useState
  const cache = useRef(new Map()) // ✅ 缓存用 useRef

  // 问题 2：需要执行副作用吗？
  // 是 → useEffect

  useEffect(() => {
    // ✅ 数据获取、订阅、DOM 操作等副作用
    document.title = `Count: ${uiData}`
  }, [uiData])

  // 问题 3：需要引用 DOM 元素吗？
  // 是 → useRef

  const inputRef = useRef<HTMLInputElement>(null) // ✅ DOM 引用

  return (
    <div>
      <input ref={inputRef} />
      <p>{uiData}</p>
    </div>
  )
}
```

**选择建议：**

| 场景          | 使用 Hook         | 原因                 |
| ------------- | ----------------- | -------------------- |
| UI 显示的数据 | useState          | 需要触发重渲染       |
| 定时器 ID     | useRef            | 不需要触发重渲染     |
| 渲染次数统计  | useRef            | 不需要触发重渲染     |
| DOM 元素引用  | useRef            | 需要访问 DOM         |
| 数据获取      | useEffect         | 副作用操作           |
| 订阅/监听     | useEffect         | 副作用操作，需要清理 |
| 缓存计算结果  | useRef 或 useMemo | useRef 不触发重渲染  |
| 上一次的值    | useRef            | 在 useEffect 中更新  |

## 9. useState vs useEffect vs useRef 对比

| 特性 | useState | useEffect | useRef |
| --- | --- | --- | --- |
| 主要用途 | 状态管理 | 副作用处理 | 可变值存储/DOM 引用 |
| 触发重渲染 | ✅ 是 | ❌ 否 | ❌ 否 |
| 更新时机 | 异步批处理 | 渲染后执行 | 同步更新 |
| 初始化 | `useState(value)` | 无初始化 | `useRef(value)` |
| 更新方式 | `setState(newValue)` | 无更新，只执行 | `ref.current = newValue` |
| 返回值 | `[state, setState]` | 无返回（或清理函数） | `{ current: value }` |
| 常见用途 | 表单输入、计数器 | 数据获取、订阅 | DOM 操作、定时器 ID |
| 清理机制 | 无 | 返回清理函数 | 手动清理 |

## 10. 引用

- [React 文档 - useState][1]
- [React 文档 - useEffect][2]
- [React 文档 - useRef][3]

[1]: https://react.dev/reference/react/useState
[2]: https://react.dev/reference/react/useEffect
[3]: https://react.dev/reference/react/useRef
