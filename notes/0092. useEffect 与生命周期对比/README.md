# [0092. useEffect 与生命周期对比](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0092.%20useEffect%20%E4%B8%8E%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%AF%B9%E6%AF%94)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 useEffect 如何模拟 componentDidMount？](#3--useeffect-如何模拟-componentdidmount)
- [4. 🤔 useEffect 如何模拟 componentDidUpdate？](#4--useeffect-如何模拟-componentdidupdate)
- [5. 🤔 useEffect 如何模拟 componentWillUnmount？](#5--useeffect-如何模拟-componentwillunmount)
- [6. 🤔 useEffect 与生命周期的核心区别是什么？](#6--useeffect-与生命周期的核心区别是什么)
- [7. 🤔 如何迁移类组件到函数组件？](#7--如何迁移类组件到函数组件)
- [8. 🤔 useEffect 的常见陷阱有哪些？](#8--useeffect-的常见陷阱有哪些)
- [9. 🆚 useEffect vs 生命周期方法对比](#9--useeffect-vs-生命周期方法对比)
- [10. 🔗 引用](#10--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- useEffect 模拟 componentDidMount
- useEffect 模拟 componentDidUpdate
- useEffect 模拟 componentWillUnmount
- useEffect 与生命周期的核心区别
- 类组件迁移到函数组件的方法
- useEffect 的常见陷阱与解决方案
- useEffect 与生命周期方法的详细对比

## 2. 🫧 评价

useEffect 是函数组件中处理副作用的核心 Hook，通过依赖数组控制执行时机，可以模拟类组件的所有生命周期方法。

- useEffect 的设计理念与类组件生命周期不同，基于副作用而非生命周期阶段
- 空依赖数组 `[]` 模拟 `componentDidMount`，仅在挂载时执行一次
- 无依赖数组模拟 `componentDidUpdate`，每次渲染后都执行
- 返回清理函数模拟 `componentWillUnmount`，在卸载时执行清理
- useEffect 可以根据特定依赖执行，比类组件更灵活精确
- 常见陷阱包括依赖数组不完整、闭包陷阱、无限循环等
- 迁移时需要理解思维模式的转变，从生命周期思维转向副作用思维

## 3. 🤔 useEffect 如何模拟 componentDidMount？

使用空依赖数组 `[]` 让 useEffect 只在组件挂载时执行一次。

```tsx
// 类组件 - componentDidMount
class ClassComponent extends React.Component {
  componentDidMount() {
    console.log('组件挂载完成')
    // 数据获取
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => this.setState({ data }))

    // DOM 操作
    document.title = '新标题'

    // 事件监听
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => console.log('窗口大小变化')
}

// 函数组件 - useEffect 模拟
function FunctionComponent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log('组件挂载完成')

    // 数据获取
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data))

    // DOM 操作
    document.title = '新标题'

    // 事件监听
    const handleResize = () => console.log('窗口大小变化')
    window.addEventListener('resize', handleResize)

    // 清理函数（相当于 componentWillUnmount）
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // ✅ 空依赖数组，只执行一次

  return <div>{data}</div>
}
```

**典型的挂载时操作：**

```tsx
function MountExample() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // ✅ 数据获取
    async function fetchUser() {
      const response = await fetch('/api/user')
      const data = await response.json()
      setUser(data)
    }
    fetchUser()

    // ✅ 订阅
    const subscription = someObservable.subscribe((data) => {
      console.log('收到数据：', data)
    })

    // ✅ 第三方库初始化
    const chart = initChart('#chart')

    // 清理
    return () => {
      subscription.unsubscribe()
      chart.destroy()
    }
  }, []) // 空依赖数组

  return <div>{user?.name}</div>
}
```

## 4. 🤔 useEffect 如何模拟 componentDidUpdate？

不传递依赖数组或指定特定依赖可以模拟 componentDidUpdate。

```tsx
// 类组件 - componentDidUpdate
class ClassComponent extends React.Component<{ userId: number }> {
  componentDidUpdate(prevProps: { userId: number }) {
    // 检查 props 是否变化
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId)
    }
  }

  fetchUser(userId: number) {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => this.setState({ user: data }))
  }
}

// 函数组件 - useEffect 模拟
function FunctionComponent({ userId }: { userId: number }) {
  const [user, setUser] = useState(null)

  // 方式 1：每次更新后都执行
  useEffect(() => {
    console.log('组件更新了')
  }) // ✅ 无依赖数组，每次渲染后执行

  // 方式 2：仅当 userId 变化时执行
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [userId]) // ✅ 依赖 userId，userId 变化时执行

  return <div>{user?.name}</div>
}
```

**多个依赖项的场景：**

```tsx
function SearchResults({ query, filters }: { query: string; filters: any }) {
  const [results, setResults] = useState([])

  useEffect(() => {
    // 当 query 或 filters 变化时重新搜索
    const fetchResults = async () => {
      const response = await fetch(
        `/api/search?q=${query}&filters=${JSON.stringify(filters)}`
      )
      const data = await response.json()
      setResults(data)
    }

    fetchResults()
  }, [query, filters]) // ✅ 依赖多个变量

  return (
    <ul>
      {results.map((item: any) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

**避免不必要的执行：**

```tsx
function OptimizedComponent({ userId }: { userId: number }) {
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(0)

  // ❌ 错误：count 变化时也会执行
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [userId, count]) // ⚠️ count 应该移除

  // ✅ 正确：只依赖 userId
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [userId]) // 只在 userId 变化时执行

  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}
```

## 5. 🤔 useEffect 如何模拟 componentWillUnmount？

useEffect 的返回函数会在组件卸载时执行，用于清理副作用。

```tsx
// 类组件 - componentWillUnmount
class ClassComponent extends React.Component {
  timerId?: NodeJS.Timeout

  componentDidMount() {
    this.timerId = setInterval(() => console.log('tick'), 1000)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => console.log('resize')
}

// 函数组件 - useEffect 返回清理函数
function FunctionComponent() {
  useEffect(() => {
    const timerId = setInterval(() => console.log('tick'), 1000)
    const handleResize = () => console.log('resize')
    window.addEventListener('resize', handleResize)

    // ✅ 返回清理函数
    return () => {
      clearInterval(timerId)
      window.removeEventListener('resize', handleResize)
    }
  }, []) // 空依赖数组，清理函数只在卸载时执行

  return <div>清理示例</div>
}
```

**清理函数的执行时机：**

```tsx
function CleanupTiming({ id }: { id: number }) {
  useEffect(() => {
    console.log(`设置副作用，id: ${id}`)

    return () => {
      console.log(`清理副作用，id: ${id}`)
    }
  }, [id])

  return <div>ID: {id}</div>
}

// 执行顺序（当 id 从 1 变为 2 时）：
// 1. 清理副作用，id: 1  （先清理旧的）
// 2. 设置副作用，id: 2  （再设置新的）
// （组件卸载时）
// 3. 清理副作用，id: 2
```

**复杂清理场景：**

```tsx
function ComplexCleanup() {
  useEffect(() => {
    // WebSocket 连接
    const ws = new WebSocket('ws://example.com')
    ws.onmessage = (event) => console.log(event.data)

    // AbortController 取消请求
    const controller = new AbortController()
    fetch('/api/data', { signal: controller.signal })
      .then((res) => res.json())
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('请求被取消')
        }
      })

    // 定时器
    const timer = setTimeout(() => console.log('delayed'), 5000)

    // 清理所有副作用
    return () => {
      ws.close()
      controller.abort()
      clearTimeout(timer)
      console.log('所有副作用已清理')
    }
  }, [])

  return <div>复杂清理示例</div>
}
```

## 6. 🤔 useEffect 与生命周期的核心区别是什么？

useEffect 基于副作用思维，而生命周期基于阶段思维，这是根本性的差异。

```tsx
// 类组件：按生命周期阶段组织代码
class ClassComponent extends React.Component<{ userId: number }> {
  componentDidMount() {
    // 挂载时：初始化多个不相关的副作用
    this.fetchUser(this.props.userId)
    this.startTimer()
    this.subscribeToChat()
  }

  componentDidUpdate(prevProps: { userId: number }) {
    // 更新时：需要检查每个 prop 的变化
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId)
    }
  }

  componentWillUnmount() {
    // 卸载时：清理所有副作用
    this.stopTimer()
    this.unsubscribeFromChat()
  }

  fetchUser(userId: number) {
    /* ... */
  }
  startTimer() {
    /* ... */
  }
  stopTimer() {
    /* ... */
  }
  subscribeToChat() {
    /* ... */
  }
  unsubscribeFromChat() {
    /* ... */
  }
}

// 函数组件：按副作用逻辑组织代码
function FunctionComponent({ userId }: { userId: number }) {
  // 副作用 1：用户数据（相关逻辑在一起）
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [userId])

  // 副作用 2：定时器（相关逻辑在一起）
  useEffect(() => {
    const timer = setInterval(() => console.log('tick'), 1000)
    return () => clearInterval(timer)
  }, [])

  // 副作用 3：聊天订阅（相关逻辑在一起）
  useEffect(() => {
    const unsubscribe = subscribeToChat()
    return () => unsubscribe()
  }, [])

  return <div>函数组件</div>
}
```

**核心差异：**

| 特性     | 生命周期方法                   | useEffect                      |
| -------- | ------------------------------ | ------------------------------ |
| 思维模式 | 按阶段组织（挂载、更新、卸载） | 按副作用组织（相关逻辑在一起） |
| 代码组织 | 分散在不同方法中               | 集中在一个 useEffect 中        |
| 执行控制 | 固定的执行时机                 | 灵活的依赖控制                 |
| 清理逻辑 | 与设置逻辑分离                 | 与设置逻辑相邻                 |
| 复用性   | 通过 HOC、Render Props         | 通过自定义 Hooks               |

## 7. 🤔 如何迁移类组件到函数组件？

按照生命周期方法逐步转换为 useEffect。

```tsx
// 迁移前：类组件
class BeforeClass extends React.Component<
  { userId: number; theme: string },
  { user: any; count: number }
> {
  state = {
    user: null,
    count: 0,
  }

  componentDidMount() {
    this.fetchUser(this.props.userId)
    document.body.className = this.props.theme
  }

  componentDidUpdate(prevProps: { userId: number; theme: string }) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId)
    }
    if (prevProps.theme !== this.props.theme) {
      document.body.className = this.props.theme
    }
  }

  componentWillUnmount() {
    document.body.className = ''
  }

  fetchUser(userId: number) {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((user) => this.setState({ user }))
  }

  render() {
    return (
      <div>
        <p>{this.state.user?.name}</p>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          增加
        </button>
      </div>
    )
  }
}

// 迁移后：函数组件
function AfterFunction({ userId, theme }: { userId: number; theme: string }) {
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(0)

  // 副作用 1：获取用户数据
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((user) => setUser(user))
  }, [userId]) // 依赖 userId

  // 副作用 2：设置主题
  useEffect(() => {
    document.body.className = theme
    return () => {
      document.body.className = ''
    }
  }, [theme]) // 依赖 theme

  return (
    <div>
      <p>{user?.name}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}
```

**迁移步骤：**

1. 将 `state` 转换为 `useState`
2. 将 `componentDidMount` 转换为 `useEffect(() => {}, [])`
3. 将 `componentDidUpdate` 按依赖拆分为多个 `useEffect`
4. 将 `componentWillUnmount` 转换为 `useEffect` 的返回函数
5. 提取可复用逻辑为自定义 Hooks

## 8. 🤔 useEffect 的常见陷阱有哪些？

```tsx
// ❌ 陷阱 1：依赖数组不完整
function IncompleteDepsBad() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1) // ❌ count 应该在依赖数组中
    }, 1000)
    return () => clearInterval(timer)
  }, []) // ⚠️ ESLint 警告：缺少依赖 count

  // ✅ 解决方案：使用函数式更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, []) // 不需要依赖 count

  return <div>{count}</div>
}
```

```tsx
// ❌ 陷阱 2：无限循环
function InfiniteLoopBad() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((newData) => setData(newData)) // ❌ 触发重渲染
  }) // ❌ 无依赖数组，每次渲染都执行

  // ✅ 解决方案：添加空依赖数组
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((newData) => setData(newData))
  }, []) // 只执行一次
}
```

```tsx
// ❌ 陷阱 3：对象/数组依赖导致每次都执行
function ObjectDepBad() {
  const [user, setUser] = useState(null)
  const filters = { type: 'active' } // ❌ 每次渲染都是新对象

  useEffect(() => {
    fetch(`/api/users?type=${filters.type}`)
      .then((res) => res.json())
      .then(setUser)
  }, [filters]) // ❌ filters 每次都不同，导致无限循环

  // ✅ 解决方案 1：使用 useMemo
  const filtersMemo = useMemo(() => ({ type: 'active' }), [])

  useEffect(() => {
    fetch(`/api/users?type=${filtersMemo.type}`)
      .then((res) => res.json())
      .then(setUser)
  }, [filtersMemo])

  // ✅ 解决方案 2：直接依赖基本类型
  const filterType = 'active'

  useEffect(() => {
    fetch(`/api/users?type=${filterType}`)
      .then((res) => res.json())
      .then(setUser)
  }, [filterType])
}
```

```tsx
// ❌ 陷阱 4：清理函数使用闭包旧值
function StaleClosureBad({ id }: { id: number }) {
  useEffect(() => {
    const handleClick = () => {
      console.log('当前 ID：', id) // ✅ 使用最新的 id
    }

    document.addEventListener('click', handleClick)

    return () => {
      console.log('清理时的 ID：', id) // ⚠️ 闭包捕获的 id
      document.removeEventListener('click', handleClick)
    }
  }, [id])
}
```

## 9. 🆚 useEffect vs 生命周期方法对比

| 场景 | 类组件 | 函数组件（useEffect） |
| --- | --- | --- |
| 挂载时执行一次 | `componentDidMount` | `useEffect(() => {}, [])` |
| 每次更新后执行 | `componentDidUpdate` | `useEffect(() => {})` |
| 特定值变化时执行 | `componentDidUpdate` + 比较 | `useEffect(() => {}, [dep])` |
| 卸载时清理 | `componentWillUnmount` | `useEffect(() => { return cleanup }, [])` |
| 代码组织 | 按阶段分散 | 按副作用集中 |
| 代码复用 | HOC、Render Props | 自定义 Hooks |
| 学习曲线 | 容易理解 | 需要理解依赖和闭包 |
| 灵活性 | 固定时机 | 精确控制 |

## 10. 🔗 引用

- [React 文档 - useEffect][1]
- [React 文档 - 从类迁移到 Hooks][2]
- [useEffect 完整指南][3]

[1]: https://react.dev/reference/react/useEffect
[2]: https://react.dev/reference/react/Component#alternatives
[3]: https://overreacted.io/a-complete-guide-to-useeffect/
