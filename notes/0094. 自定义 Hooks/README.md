# [0094. 自定义 Hooks](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0094.%20%E8%87%AA%E5%AE%9A%E4%B9%89%20Hooks)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 什么是自定义 Hooks？](#3-什么是自定义-hooks)
- [4. 如何创建自定义 Hooks？](#4-如何创建自定义-hooks)
- [5. 常见的自定义 Hooks 有哪些？](#5-常见的自定义-hooks-有哪些)
  - [5.1. useLocalStorage](#51-uselocalstorage)
  - [5.2. useWindowSize](#52-usewindowsize)
  - [5.3. useToggle](#53-usetoggle)
  - [5.4. usePrevious](#54-useprevious)
  - [5.5. useInterval](#55-useinterval)
- [6. 自定义 Hooks 的最佳实践是什么？](#6-自定义-hooks-的最佳实践是什么)
- [7. 自定义 Hooks 的常见错误有哪些？](#7-自定义-hooks-的常见错误有哪些)
- [8. 如何测试自定义 Hooks？](#8-如何测试自定义-hooks)
- [9. 自定义 Hooks vs HOC vs Render Props](#9-自定义-hooks-vs-hoc-vs-render-props)
- [10. 引用](#10-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 自定义 Hooks 的概念与优势
- 创建自定义 Hooks 的方法
- 常见实用的自定义 Hooks
- 自定义 Hooks 的最佳实践
- 常见错误与解决方案
- 自定义 Hooks 的测试方法
- 与其他代码复用方式的对比

## 2. 评价

自定义 Hooks 是 React 最强大的代码复用机制，可以提取组件逻辑为可复用的函数，比 HOC 和 Render Props 更简洁直观。

- 自定义 Hooks 必须以 `use` 开头，遵循 Hooks 规则（不能在条件/循环中调用）
- 可以组合多个内置 Hooks，提取复杂的状态逻辑和副作用
- 常见场景包括数据获取、表单处理、订阅、定时器、窗口尺寸等
- 设计时遵循单一职责原则，每个 Hook 只做一件事
- 返回值应该是数组（类似 useState）或对象，方便使用者解构
- 避免过早抽象，只在逻辑真正需要复用时才创建自定义 Hook
- 使用 TypeScript 提供类型安全，使用 `@testing-library/react-hooks` 进行测试

## 3. 什么是自定义 Hooks？

自定义 Hooks 是以 `use` 开头的函数，内部可以调用其他 Hooks，用于提取和复用组件逻辑。

```tsx
// 自定义 Hook：计数器逻辑
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)
  const reset = () => setCount(initialValue)

  return { count, increment, decrement, reset }
}

// 在组件中使用
function Counter() {
  const { count, increment, decrement, reset } = useCounter(10)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>重置</button>
    </div>
  )
}

// 可以在多个组件中复用
function AnotherCounter() {
  const { count, increment } = useCounter(0)
  return <button onClick={increment}>点击次数: {count}</button>
}
```

**自定义 Hooks 的优势：**

- 提取和复用组件逻辑
- 代码更简洁，可读性更强
- 便于测试和维护
- 比 HOC 和 Render Props 更直观

## 4. 如何创建自定义 Hooks？

创建自定义 Hooks 的步骤：识别可复用逻辑、提取为函数、以 `use` 开头命名、返回需要的值。

```tsx
// 步骤 1：识别可复用逻辑（数据获取）
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [userId])

  // 其他组件也需要类似的数据获取逻辑...
}

// 步骤 2：提取为自定义 Hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}

// 步骤 3：在组件中使用
function UserProfileWithHook({ userId }: { userId: number }) {
  const { data: user, loading, error } = useFetch<any>(`/api/users/${userId}`)

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误: {error.message}</div>
  return <div>{user?.name}</div>
}
```

**带参数的自定义 Hook：**

```tsx
// 可配置的自定义 Hook
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// 使用
function SearchInput() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      console.log('搜索：', debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="输入搜索..."
    />
  )
}
```

## 5. 常见的自定义 Hooks 有哪些？

以下是一些实用的自定义 Hooks。

### 5.1. useLocalStorage

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }, [key, value])

  return [value, setValue] as const
}

// 使用
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      主题: {theme}
    </button>
  )
}
```

### 5.2. useWindowSize

```tsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// 使用
function ResponsiveComponent() {
  const { width } = useWindowSize()
  return <div>{width < 768 ? '移动端' : '桌面端'}</div>
}
```

### 5.3. useToggle

```tsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = () => setValue((v) => !v)
  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)

  return { value, toggle, setTrue, setFalse }
}

// 使用
function Modal() {
  const { value: isOpen, toggle, setFalse } = useToggle(false)

  return (
    <>
      <button onClick={toggle}>打开模态框</button>
      {isOpen && (
        <div>
          <p>模态框内容</p>
          <button onClick={setFalse}>关闭</button>
        </div>
      )}
    </>
  )
}
```

### 5.4. usePrevious

```tsx
function usePrevious<T>(value: T) {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// 使用
function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>当前: {count}</p>
      <p>之前: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}
```

### 5.5. useInterval

```tsx
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return

    const timer = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(timer)
  }, [delay])
}

// 使用
function Clock() {
  const [time, setTime] = useState(new Date())

  useInterval(() => {
    setTime(new Date())
  }, 1000)

  return <div>{time.toLocaleTimeString()}</div>
}
```

## 6. 自定义 Hooks 的最佳实践是什么？

```tsx
// ✅ 实践 1：命名以 use 开头
function useUserData() {
  /* ... */
} // ✅ 正确
function getUserData() {
  /* ... */
} // ❌ 错误

// ✅ 实践 2：单一职责
function useAuth() {
  // 只处理认证相关逻辑
  const [user, setUser] = useState(null)
  const login = () => {
    /* ... */
  }
  const logout = () => {
    /* ... */
  }
  return { user, login, logout }
}

// ❌ 不要在一个 Hook 中做太多事情
function useEverything() {
  // ❌ 认证、主题、路由等混在一起
}

// ✅ 实践 3：返回数组或对象
function useCounter() {
  const [count, setCount] = useState(0)

  // 数组形式（类似 useState）
  return [count, setCount] as const

  // 或对象形式（更明确）
  return { count, setCount }
}

// ✅ 实践 4：提供合理的默认值
function useFetch<T>(url: string, options = {}) {
  // 提供默认配置
  const config = { method: 'GET', ...options }
  // ...
}

// ✅ 实践 5：处理清理逻辑
function useEventListener(event: string, handler: () => void) {
  useEffect(() => {
    window.addEventListener(event, handler)
    return () => window.removeEventListener(event, handler)
  }, [event, handler])
}
```

**TypeScript 类型支持：**

```tsx
// 完整的 TypeScript 示例
interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
}

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

function useFetch<T>(
  url: string,
  options?: UseFetchOptions,
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
```

## 7. 自定义 Hooks 的常见错误有哪些？

```tsx
// ❌ 错误 1：不以 use 开头
function fetchData() {
  // ❌ ESLint 会报错
  const [data, setData] = useState(null)
  // ...
  return data
}

// ✅ 正确
function useFetchData() {
  const [data, setData] = useState(null)
  // ...
  return data
}

// ❌ 错误 2：在条件中调用 Hook
function useConditional(condition: boolean) {
  if (condition) {
    const [value, setValue] = useState(0) // ❌ 违反 Hooks 规则
    return value
  }
  return null
}

// ✅ 正确：Hook 在顶层调用
function useConditional(condition: boolean) {
  const [value, setValue] = useState(0)
  return condition ? value : null
}

// ❌ 错误 3：忘记添加依赖
function useSearch(query: string) {
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then(setResults)
  }, []) // ❌ 缺少 query 依赖

  return results
}

// ✅ 正确：添加依赖
function useSearch(query: string) {
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then(setResults)
  }, [query]) // ✅ 包含 query

  return results
}

// ❌ 错误 4：返回不稳定的引用
function useData() {
  const [data, setData] = useState([])

  // ❌ 每次渲染都返回新的对象
  return {
    data,
    setData,
  }
}

// ✅ 正确：使用 useMemo 或返回数组
function useData() {
  const [data, setData] = useState([])

  return useMemo(
    () => ({
      data,
      setData,
    }),
    [data],
  )
}
```

## 8. 如何测试自定义 Hooks？

使用 `@testing-library/react-hooks` 进行测试。

```tsx
// 自定义 Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)
  return { count, increment, decrement }
}

// 测试
import { renderHook, act } from '@testing-library/react-hooks'

describe('useCounter', () => {
  it('应该初始化为默认值', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  it('应该初始化为指定值', () => {
    const { result } = renderHook(() => useCounter(10))
    expect(result.current.count).toBe(10)
  })

  it('应该正确增加', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('应该正确减少', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(4)
  })
})
```

## 9. 自定义 Hooks vs HOC vs Render Props

| 特性       | 自定义 Hooks    | HOC             | Render Props     |
| ---------- | --------------- | --------------- | ---------------- |
| 语法复杂度 | ⭐⭐⭐⭐⭐ 简单 | ⭐⭐⭐ 中等     | ⭐⭐ 复杂        |
| 代码可读性 | ⭐⭐⭐⭐⭐ 优秀 | ⭐⭐⭐ 良好     | ⭐⭐ 一般        |
| 类型推导   | ⭐⭐⭐⭐⭐ 优秀 | ⭐⭐⭐ 良好     | ⭐⭐⭐⭐ 良好    |
| 嵌套问题   | ✅ 无嵌套       | ❌ Wrapper Hell | ❌ Callback Hell |
| 复用性     | ⭐⭐⭐⭐⭐ 优秀 | ⭐⭐⭐⭐ 良好   | ⭐⭐⭐⭐ 良好    |
| 适用范围   | 函数组件        | 类组件/函数组件 | 类组件/函数组件  |

**对比示例：**

```tsx
// 方式 1：自定义 Hooks（推荐）
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return position
}

function Component() {
  const { x, y } = useMousePosition()
  return (
    <div>
      X: {x}, Y: {y}
    </div>
  )
}

// 方式 2：HOC
const withMousePosition = (Component: any) => {
  return (props: any) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    // ... 逻辑省略
    return <Component {...props} mousePosition={position} />
  }
}

const EnhancedComponent = withMousePosition(Component)

// 方式 3：Render Props
class Mouse extends React.Component {
  state = { x: 0, y: 0 }
  // ... 逻辑省略
  render() {
    return this.props.render(this.state)
  }
}

function Component() {
  return (
    <Mouse
      render={({ x, y }) => (
        <div>
          X: {x}, Y: {y}
        </div>
      )}
    />
  )
}
```

## 10. 引用

- [React 文档 - 自定义 Hooks][1]
- [React 文档 - Hooks 规则][2]
- [usehooks.com - Hook 库][3]

[1]: https://react.dev/learn/reusing-logic-with-custom-hooks
[2]: https://react.dev/reference/rules/rules-of-hooks
[3]: https://usehooks.com/
