# [0095. Hooks 规则与陷阱](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0095.%20Hooks%20%E8%A7%84%E5%88%99%E4%B8%8E%E9%99%B7%E9%98%B1)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Hooks 有哪些使用规则？](#3-hooks-有哪些使用规则)
- [4. 闭包陷阱是什么？](#4-闭包陷阱是什么)
- [5. 如何正确处理依赖项？](#5-如何正确处理依赖项)
- [6. useEffect 有哪些常见陷阱？](#6-useeffect-有哪些常见陷阱)
- [7. useState 有哪些使用注意事项？](#7-usestate-有哪些使用注意事项)
- [8. 自定义 Hooks 有哪些最佳实践？](#8-自定义-hooks-有哪些最佳实践)
- [9. 如何调试 Hooks 问题？](#9-如何调试-hooks-问题)
- [10. 引用](#10-引用)

<!-- endregion:toc -->

## 1. 本节内容

- Hooks 的两大核心规则
- 闭包陷阱及解决方案
- 依赖项处理的正确方式
- useEffect 常见错误
- useState 使用注意事项
- 自定义 Hooks 最佳实践
- Hooks 调试技巧

## 2. 评价

这篇笔记详细讲解 React Hooks 的使用规则、常见陷阱及解决方案，帮助避免实际开发中的问题。

- Hooks 有两条铁律：只在顶层调用、只在 React 函数中调用，违反会导致 Bug
- 闭包陷阱是 Hooks 最常见的问题，理解闭包机制是关键
- 依赖项不能遗漏也不能多余，使用 ESLint 插件自动检查
- useEffect 的清理函数至关重要，避免内存泄漏和副作用残留
- 理解 Hooks 的工作原理可以避免大部分问题

## 3. Hooks 有哪些使用规则？

Hooks 有两条必须遵守的规则。

```typescript
// 规则 1：只在顶层调用 Hooks
// ❌ 错误示例
function BadComponent({ showCount }: { showCount: boolean }) {
  if (showCount) {
    const [count, setCount] = useState(0) // ❌ 条件调用
  }
  return <div>Bad</div>
}

// ✅ 正确示例
function GoodComponent({ showCount }: { showCount: boolean }) {
  const [count, setCount] = useState(0) // ✅ 顶层调用

  if (!showCount) return null
  return <div>{count}</div>
}

// 规则 2：只在 React 函数中调用 Hooks
// ❌ 错误：在普通函数中调用
function notAComponent() {
  const [value, setValue] = useState(0) // ❌ 不在 React 函数中
  return value
}

// ✅ 正确：在函数组件或自定义 Hook 中调用
function GoodComponent() {
  const [count, setCount] = useState(0) // ✅ 函数组件
  return <div>{count}</div>
}

function useCustomHook() {
  const [value, setValue] = useState(0) // ✅ 自定义 Hook
  return [value, setValue] as const
}
```

React 内部使用链表存储 Hooks，每次渲染按调用顺序读取状态。如果调用顺序改变，React 会读取错误的状态。

```typescript
// React 内部机制
function Component() {
  const [name, setName] = useState('Alice') // Hook 1
  const [age, setAge] = useState(25) // Hook 2
  const [city, setCity] = useState('Beijing') // Hook 3
  // React 内部：[Hook1, Hook2, Hook3]
}

// ❌ 如果条件调用，顺序会改变
function Component({ showAge }: { showAge: boolean }) {
  const [name, setName] = useState('Alice') // Hook 1

  if (showAge) {
    const [age, setAge] = useState(25) // ❌ Hook 2 可能不存在
  }

  const [city, setCity] = useState('Beijing') // Hook 2 或 3？
  // React 内部错乱：无法正确匹配状态
}
```

使用 ESLint 插件自动检测：

```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

## 4. 闭包陷阱是什么？

闭包陷阱是 Hooks 中最常见的问题。

```typescript
// ❌ 问题：count 永远是 0
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('当前 count:', count) // ❌ 永远是 0
      setCount(count + 1) // ❌ 永远是 0 + 1
    }, 1000)

    return () => clearInterval(timer)
  }, []) // ⚠️ 空依赖，闭包捕获初始值

  return <div>{count}</div>
}

// ✅ 解决方案 1：函数式更新
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1) // ✅ 获取最新值
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <div>{count}</div>
}

// ✅ 解决方案 2：useRef 存储
function Counter() {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)

  useEffect(() => {
    countRef.current = count
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(countRef.current + 1) // ✅ 读取最新值
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <div>{count}</div>
}

// ✅ 解决方案 3：添加依赖（会重启定时器）
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    return () => clearInterval(timer) // ⚠️ 每次 count 变化重启
  }, [count])

  return <div>{count}</div>
}
```

复杂场景示例：

```typescript
// ❌ 函数闭包陷阱
function DataFetcher() {
  const [query, setQuery] = useState('react')
  const [data, setData] = useState([])

  const fetchData = async () => {
    const result = await fetch(`/api/search?q=${query}`).then((r) => r.json())
    setData(result)
  }

  useEffect(() => {
    const timer = setInterval(fetchData, 5000) // ❌ fetchData 捕获旧 query
    return () => clearInterval(timer)
  }, []) // ⚠️ 缺少依赖

  return <div>{/* ... */}</div>
}

// ✅ 使用 useCallback
function DataFetcher() {
  const [query, setQuery] = useState('react')
  const [data, setData] = useState([])

  const fetchData = useCallback(async () => {
    const result = await fetch(`/api/search?q=${query}`).then((r) => r.json())
    setData(result)
  }, [query]) // ✅ 依赖 query

  useEffect(() => {
    const timer = setInterval(fetchData, 5000)
    return () => clearInterval(timer)
  }, [fetchData]) // ✅ 依赖 fetchData

  return <div>{/* ... */}</div>
}
```

## 5. 如何正确处理依赖项？

依赖项规则：所有在 effect 中使用的外部值都应在依赖项中。

```typescript
// ❌ 错误 1：遗漏依赖项
function SearchResults() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchData(query).then(setResults) // 使用了 query
  }, []) // ❌ 缺少 query
}

// ✅ 正确：添加依赖
function SearchResults() {
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchData(query).then(setResults)
  }, [query]) // ✅ 包含 query
}

// ❌ 错误 2：对象依赖导致无限循环
function Component() {
  const config = { page: 1, size: 10 } // ⚠️ 每次渲染都是新对象

  useEffect(() => {
    fetchData(config).then(setItems)
  }, [config]) // ❌ 无限循环
}

// ✅ 解决方案 1：移到 effect 内部
function Component() {
  useEffect(() => {
    const config = { page: 1, size: 10 }
    fetchData(config).then(setItems)
  }, [])
}

// ✅ 解决方案 2：使用 useMemo
function Component() {
  const [page, setPage] = useState(1)
  const config = useMemo(() => ({ page, size: 10 }), [page])

  useEffect(() => {
    fetchData(config).then(setItems)
  }, [config])
}

// ❌ 错误 3：函数依赖
function Component() {
  const handleData = (data: string[]) => console.log(data)

  useEffect(() => {
    fetchData().then(handleData)
  }, [handleData]) // ❌ handleData 每次都是新函数
}

// ✅ 使用 useCallback
function Component() {
  const handleData = useCallback((data: string[]) => {
    console.log(data)
  }, [])

  useEffect(() => {
    fetchData().then(handleData)
  }, [handleData])
}
```

优化技巧：

```typescript
// 技巧 1：只依赖需要的属性
const [user, setUser] = useState({ name: 'Alice', age: 25 })
const userName = user.name

useEffect(() => {
  console.log(userName)
}, [userName]) // ✅ 只在 name 变化时触发

// 技巧 2：使用 useReducer 减少依赖
const [state, dispatch] = useReducer(reducer, initialState)

useEffect(() => {
  dispatch({ type: 'FETCH_DATA' }) // ✅ dispatch 永远不变
}, [])
```

## 6. useEffect 有哪些常见陷阱？

```typescript
// 陷阱 1：忘记清理副作用
// ❌ 错误
function Timer() {
  useEffect(() => {
    setInterval(() => setCount((c) => c + 1), 1000)
    // ❌ 没有返回清理函数
  }, [])
}

// ✅ 正确
function Timer() {
  useEffect(() => {
    const timer = setInterval(() => setCount((c) => c + 1), 1000)
    return () => clearInterval(timer) // ✅ 清理定时器
  }, [])
}

// 陷阱 2：异步竞态条件
// ❌ 错误
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser(userId).then(setUser) // ❌ 可能设置已过期的数据
  }, [userId])

  return <div>{user?.name}</div>
}

// ✅ 解决方案 1：使用标记位
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchUser(userId).then((data) => {
      if (!cancelled) setUser(data) // ✅ 检查是否已取消
    })

    return () => {
      cancelled = true
    }
  }, [userId])

  return <div>{user?.name}</div>
}

// ✅ 解决方案 2：使用 AbortController
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then((res) => res.json())
      .then(setUser)
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err)
      })

    return () => controller.abort()
  }, [userId])

  return <div>{user?.name}</div>
}

// 陷阱 3：effect 中修改依赖的状态
// ❌ 错误：无限循环
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(count + 1) // ❌ 修改依赖的状态
  }, [count]) // ❌ 导致无限循环
}

// ✅ 正确：使用函数式更新
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount((c) => c + 1) // ✅ 函数式更新
  }, []) // ✅ 不依赖 count
}
```

## 7. useState 有哪些使用注意事项？

```typescript
// 注意事项 1：状态更新是异步的
function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    console.log(count) // ❌ 还是旧值

    // ❌ 错误：连续调用不会累加
    setCount(count + 1)
    setCount(count + 1)
    // 结果：count 只增加 1，不是 3
  }

  // ✅ 正确：使用函数式更新
  const handleClickCorrect = () => {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    // 结果：count 增加 3
  }

  return <button onClick={handleClickCorrect}>+3</button>
}

// 注意事项 2：状态初始化只执行一次
// ❌ 错误：昂贵的初始化每次渲染都执行
function Component({ items }: { items: Item[] }) {
  const [state, setState] = useState(
    expensiveCalculation(items) // ❌ 每次渲染都执行
  )
}

// ✅ 正确：使用惰性初始化
function Component({ items }: { items: Item[] }) {
  const [state, setState] = useState(
    () => expensiveCalculation(items) // ✅ 只在初始化时执行一次
  )
}

// 注意事项 3：对象和数组的更新
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  // ❌ 错误：直接修改状态
  const addTodoBad = (text: string) => {
    todos.push({ id: Date.now(), text, done: false }) // ❌ 直接修改
    setTodos(todos) // ❌ 引用没变，不会触发更新
  }

  // ✅ 正确：创建新数组
  const addTodoGood = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  // ❌ 错误：直接修改对象属性
  const toggleTodoBad = (id: number) => {
    const todo = todos.find((t) => t.id === id)
    if (todo) {
      todo.done = !todo.done // ❌ 直接修改
      setTodos([...todos]) // ⚠️ 虽然创建了新数组，但对象还是同一个
    }
  }

  // ✅ 正确：创建新对象
  const toggleTodoGood = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }
}
```

## 8. 自定义 Hooks 有哪些最佳实践？

```typescript
// 最佳实践 1：命名以 use 开头
// ❌ 错误命名
function getFetchData() {
  // ❌ 不以 use 开头
  const [data, setData] = useState(null)
  return data
}

// ✅ 正确命名
function useFetchData() {
  // ✅ use 开头
  const [data, setData] = useState(null)
  return data
}

// 最佳实践 2：返回数组或对象
// ✅ 返回数组：解构时可自定义命名
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = () => setValue((v) => !v)

  return [value, toggle] as const
}

// 使用
function Component() {
  const [isOpen, toggleOpen] = useToggle(false)
  const [isActive, toggleActive] = useToggle(true)
}

// ✅ 返回对象：属性名固定，更清晰
function useFetch(url: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return { data, loading, error }
}

// 最佳实践 3：处理清理逻辑
function useEventListener(
  event: string,
  handler: (e: Event) => void,
  element: HTMLElement | Window = window,
) {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const eventListener = (e: Event) => savedHandler.current(e)
    element.addEventListener(event, eventListener)

    return () => element.removeEventListener(event, eventListener) // ✅ 清理
  }, [event, element])
}

// 最佳实践 4：提供选项和配置
interface UseFetchOptions {
  method?: 'GET' | 'POST'
  enabled?: boolean
}

function useFetch<T>(url: string, options: UseFetchOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const { method = 'GET', enabled = true } = options

  useEffect(() => {
    if (!enabled) return // ✅ 支持条件执行

    let cancelled = false

    fetch(url, { method })
      .then((res) => res.json())
      .then((result) => {
        if (!cancelled) setData(result)
      })

    return () => {
      cancelled = true
    }
  }, [url, method, enabled])

  return { data }
}
```

## 9. 如何调试 Hooks 问题？

```typescript
// 技巧 1：使用 React DevTools
function useUserStatus(userId: string) {
  const [status, setStatus] = useState<'online' | 'offline'>('offline')

  useDebugValue(status === 'online' ? '在线' : '离线') // ✅ DevTools 中显示

  return status
}

// 技巧 2：添加依赖项变化日志
function useEffectLogger(
  effect: React.EffectCallback,
  deps?: React.DependencyList
) {
  const prevDeps = useRef<React.DependencyList>()

  useEffect(() => {
    if (prevDeps.current) {
      const changedDeps = deps
        ?.map((dep, i) => {
          if (dep !== prevDeps.current![i]) {
            return { index: i, prev: prevDeps.current![i], current: dep }
          }
          return null
        })
        .filter(Boolean)

      console.log('Dependencies changed:', changedDeps)
    }

    prevDeps.current = deps
    return effect()
  }, deps)
}

// 技巧 3：检查重新渲染次数
function useRenderCount() {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log('Render count:', renderCount.current)
  })

  return renderCount.current
}

function Component() {
  const renderCount = useRenderCount()
  return <div>渲染次数：{renderCount}</div>
}

// 技巧 4：使用 why-did-you-render
// 安装：npm install @welldone-software/why-did-you-render

// wdyr.ts
import React from 'react'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  })
}

// Component.tsx
function ExpensiveComponent() {
  // ...
}

ExpensiveComponent.whyDidYouRender = true // ✅ 启用追踪

export default ExpensiveComponent
```

## 10. 引用

- [Hooks 规则官方文档][1]
- [Hooks FAQ][2]
- [useEffect 完全指南][3]
- [React Hooks 最佳实践][4]

[1]: https://react.dev/reference/rules/rules-of-hooks
[2]: https://react.dev/reference/react
[3]: https://overreacted.io/a-complete-guide-to-useeffect/
[4]: https://kentcdodds.com/blog/react-hooks-pitfalls
