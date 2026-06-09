# [0091. 挂载、更新、卸载流程](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0091.%20%E6%8C%82%E8%BD%BD%E3%80%81%E6%9B%B4%E6%96%B0%E3%80%81%E5%8D%B8%E8%BD%BD%E6%B5%81%E7%A8%8B)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 组件的挂载流程是什么？](#3-组件的挂载流程是什么)
- [4. 组件的更新流程是什么？](#4-组件的更新流程是什么)
- [5. 组件的卸载流程是什么？](#5-组件的卸载流程是什么)
- [6. 类组件和函数组件的流程有何区别？](#6-类组件和函数组件的流程有何区别)
- [7. 如何追踪组件的生命周期？](#7-如何追踪组件的生命周期)
- [8. 生命周期流程中常见的错误有哪些？](#8-生命周期流程中常见的错误有哪些)
- [9. 类组件 vs 函数组件流程对比](#9-类组件-vs-函数组件流程对比)
- [10. 引用](#10-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 组件挂载的完整流程
- 组件更新的触发条件与流程
- 组件卸载的清理机制
- 类组件与函数组件的流程差异
- 生命周期追踪与调试方法
- 生命周期流程中的常见错误
- 不同组件类型的流程对比

## 2. 评价

理解组件的挂载、更新、卸载流程是掌握 React 运行机制的基础，有助于优化性能和避免常见错误。

- 挂载阶段执行初始化操作，是设置副作用（数据获取、订阅）的最佳时机
- 更新阶段会多次执行，需要注意性能优化，避免不必要的重渲染
- 卸载阶段必须清理副作用，防止内存泄漏（定时器、监听器、订阅）
- 类组件使用生命周期方法，函数组件使用 Hooks，但底层流程相似
- 使用 React DevTools Profiler 可以直观地追踪组件渲染流程
- 常见错误包括忘记清理副作用、在错误的生命周期阶段操作 DOM、死循环更新

## 3. 组件的挂载流程是什么？

挂载是组件首次被创建并插入 DOM 的过程，按照特定顺序执行初始化操作。

```tsx
// 类组件挂载流程
class MountDemo extends React.Component<{}, { count: number }> {
  state = { count: 0 }

  constructor(props: {}) {
    super(props)
    console.log('1️⃣ constructor - 构造函数')
    // 初始化 state
    // 绑定方法
  }

  static getDerivedStateFromProps(props: {}, state: { count: number }) {
    console.log('2️⃣ getDerivedStateFromProps - 派生 state')
    // 根据 props 更新 state（很少使用）
    return null
  }

  render() {
    console.log('3️⃣ render - 渲染 JSX')
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          增加
        </button>
      </div>
    )
  }

  componentDidMount() {
    console.log('4️⃣ componentDidMount - 挂载完成')
    // 数据获取
    // DOM 操作
    // 订阅事件
  }
}

// 输出顺序：
// 1️⃣ constructor
// 2️⃣ getDerivedStateFromProps
// 3️⃣ render
// 4️⃣ componentDidMount
```

**函数组件挂载流程：**

```tsx
function FunctionMountDemo() {
  console.log('1️⃣ 函数体执行 - 初始化')

  const [count, setCount] = useState(() => {
    console.log('2️⃣ useState 初始化')
    return 0
  })

  useEffect(() => {
    console.log('4️⃣ useEffect - 挂载后执行')

    return () => {
      console.log('💀 useEffect cleanup - 卸载时执行')
    }
  }, [])

  console.log('3️⃣ 返回 JSX')

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}

// 输出顺序：
// 1️⃣ 函数体执行
// 2️⃣ useState 初始化
// 3️⃣ 返回 JSX
// 4️⃣ useEffect
```

**挂载阶段的典型操作：**

```tsx
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ✅ 数据获取
    setLoading(true)
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        setLoading(false)
      })

    // ✅ DOM 操作
    document.title = `用户 ${userId} 的资料`

    // ✅ 添加事件监听
    const handleResize = () => console.log('窗口大小变化')
    window.addEventListener('resize', handleResize)

    return () => {
      // 清理
      window.removeEventListener('resize', handleResize)
    }
  }, []) // 空依赖数组，仅挂载时执行

  if (loading) return <div>加载中...</div>
  return <div>{user?.name}</div>
}
```

## 4. 组件的更新流程是什么？

更新发生在 props 或 state 变化时，组件会重新渲染。

```tsx
// 类组件更新流程
class UpdateDemo extends React.Component<{ name: string }, { count: number }> {
  state = { count: 0 }

  static getDerivedStateFromProps(
    props: { name: string },
    state: { count: number },
  ) {
    console.log('1️⃣ getDerivedStateFromProps - 派生 state')
    return null
  }

  shouldComponentUpdate(
    nextProps: { name: string },
    nextState: { count: number },
  ) {
    console.log('2️⃣ shouldComponentUpdate - 是否更新')
    // 返回 false 可阻止更新
    return true
  }

  render() {
    console.log('3️⃣ render - 渲染 JSX')
    return (
      <div>
        <p>Name: {this.props.name}</p>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          增加
        </button>
      </div>
    )
  }

  getSnapshotBeforeUpdate(
    prevProps: { name: string },
    prevState: { count: number },
  ) {
    console.log('4️⃣ getSnapshotBeforeUpdate - DOM 更新前')
    return null
  }

  componentDidUpdate(
    prevProps: { name: string },
    prevState: { count: number },
    snapshot: any,
  ) {
    console.log('5️⃣ componentDidUpdate - 更新完成')
    // 根据 props 变化执行副作用
  }
}

// 更新输出顺序：
// 1️⃣ getDerivedStateFromProps
// 2️⃣ shouldComponentUpdate
// 3️⃣ render
// 4️⃣ getSnapshotBeforeUpdate
// 5️⃣ componentDidUpdate
```

**函数组件更新流程：**

```tsx
function FunctionUpdateDemo({ name }: { name: string }) {
  const [count, setCount] = useState(0)

  console.log('1️⃣ 函数体重新执行')

  useEffect(() => {
    console.log('2️⃣ useEffect - 更新后执行')
  }) // 无依赖数组，每次更新都执行

  useEffect(() => {
    console.log('3️⃣ useEffect (name) - name 变化时执行')
  }, [name]) // 依赖 name

  return (
    <div>
      <p>Name: {name}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}

// 点击按钮后输出：
// 1️⃣ 函数体重新执行
// 2️⃣ useEffect
// （name 未变化，不执行 3️⃣）
```

**更新的触发条件：**

```tsx
function UpdateTriggers() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Alice')

  // ✅ 触发更新：setState
  const handleCountChange = () => {
    setCount(count + 1)
  }

  // ✅ 触发更新：props 变化（父组件传递）
  // <UpdateTriggers name="Bob" />

  // ✅ 触发更新：forceUpdate（类组件，不推荐）
  // this.forceUpdate();

  // ❌ 不触发更新：直接修改 state
  const wrongUpdate = () => {
    count++ // 错误！不会触发重渲染
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleCountChange}>正确更新</button>
      <button onClick={wrongUpdate}>错误更新</button>
    </div>
  )
}
```

## 5. 组件的卸载流程是什么？

卸载是组件从 DOM 中移除的过程，必须清理副作用以防止内存泄漏。

```tsx
// 类组件卸载流程
class UnmountDemo extends React.Component {
  timerId?: NodeJS.Timeout

  componentDidMount() {
    console.log('✅ 挂载 - 启动定时器')
    this.timerId = setInterval(() => {
      console.log('定时任务执行')
    }, 1000)
  }

  componentWillUnmount() {
    console.log('💀 卸载 - 清理定时器')
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  }

  render() {
    return <div>卸载示例</div>
  }
}

// 父组件控制显示/隐藏
function Parent() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <button onClick={() => setShow(!show)}>切换</button>
      {show && <UnmountDemo />}
    </div>
  )
}

// 点击切换按钮后输出：
// 💀 卸载 - 清理定时器
```

**函数组件卸载流程：**

```tsx
function FunctionUnmountDemo() {
  useEffect(() => {
    console.log('✅ 挂载 - 启动定时器')
    const timerId = setInterval(() => {
      console.log('定时任务执行')
    }, 1000)

    // 返回清理函数
    return () => {
      console.log('💀 卸载 - 清理定时器')
      clearInterval(timerId)
    }
  }, [])

  return <div>卸载示例</div>
}
```

**必须清理的副作用：**

```tsx
function CleanupDemo() {
  useEffect(() => {
    // ✅ 定时器
    const timer = setInterval(() => console.log('tick'), 1000)

    // ✅ 事件监听
    const handleResize = () => console.log('resize')
    window.addEventListener('resize', handleResize)

    // ✅ WebSocket 连接
    const ws = new WebSocket('ws://example.com')
    ws.onmessage = (e) => console.log(e.data)

    // ✅ 订阅
    const subscription = someObservable.subscribe()

    // 清理所有副作用
    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', handleResize)
      ws.close()
      subscription.unsubscribe()
    }
  }, [])

  return <div>清理示例</div>
}
```

## 6. 类组件和函数组件的流程有何区别？

类组件使用生命周期方法，函数组件使用 Hooks，但底层流程相似。

```tsx
// 类组件流程
class ClassLifecycle extends React.Component<{ id: number }, { data: any }> {
  state = { data: null }

  componentDidMount() {
    this.fetchData(this.props.id)
  }

  componentDidUpdate(prevProps: { id: number }) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id)
    }
  }

  componentWillUnmount() {
    // 清理
  }

  fetchData(id: number) {
    fetch(`/api/data/${id}`)
      .then((res) => res.json())
      .then((data) => this.setState({ data }))
  }

  render() {
    return <div>{this.state.data?.name}</div>
  }
}

// 函数组件等价实现
function FunctionLifecycle({ id }: { id: number }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    // 相当于 componentDidMount + componentDidUpdate
    fetch(`/api/data/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data))

    // 相当于 componentWillUnmount
    return () => {
      // 清理
    }
  }, [id]) // 依赖 id，id 变化时重新执行

  return <div>{data?.name}</div>
}
```

**主要区别：**

| 特性     | 类组件                 | 函数组件                  |
| -------- | ---------------------- | ------------------------- |
| 语法     | 生命周期方法           | Hooks                     |
| 挂载     | `componentDidMount`    | `useEffect(() => {}, [])` |
| 更新     | `componentDidUpdate`   | `useEffect(() => {})`     |
| 卸载     | `componentWillUnmount` | `useEffect` 返回清理函数  |
| this     | 需要绑定               | 无需绑定                  |
| 代码复用 | HOC、Render Props      | 自定义 Hooks              |

## 7. 如何追踪组件的生命周期？

使用 React DevTools Profiler 和日志可以追踪组件的渲染流程。

```tsx
// 自定义 Hook 追踪生命周期
function useLifecycleLogger(componentName: string) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
    console.log(`[${componentName}] 渲染次数: ${renderCount.current}`)
  })

  useEffect(() => {
    console.log(`[${componentName}] 挂载`)
    return () => {
      console.log(`[${componentName}] 卸载`)
    }
  }, [])
}

function TrackedComponent() {
  useLifecycleLogger('TrackedComponent')
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}

// 输出：
// [TrackedComponent] 渲染次数: 1
// [TrackedComponent] 挂载
// （点击按钮后）
// [TrackedComponent] 渲染次数: 2
// （组件卸载时）
// [TrackedComponent] 卸载
```

**使用 React DevTools Profiler：**

```tsx
import { Profiler } from 'react'

function App() {
  const onRenderCallback = (
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) => {
    console.log(`${id} ${phase} 耗时: ${actualDuration}ms`)
  }

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <TrackedComponent />
    </Profiler>
  )
}
```

## 8. 生命周期流程中常见的错误有哪些？

```tsx
// ❌ 错误 1：忘记清理副作用
function MemoryLeak() {
  useEffect(() => {
    const timer = setInterval(() => console.log('tick'), 1000)
    // ❌ 忘记清理，导致内存泄漏
  }, [])

  // ✅ 正确：返回清理函数
  useEffect(() => {
    const timer = setInterval(() => console.log('tick'), 1000)
    return () => clearInterval(timer)
  }, [])
}
```

```tsx
// ❌ 错误 2：在 render 中执行副作用
function WrongSideEffect() {
  const [count, setCount] = useState(0)

  // ❌ 错误：render 可能被多次调用
  fetch('/api/data').then(() => setCount(1))

  // ✅ 正确：在 useEffect 中执行
  useEffect(() => {
    fetch('/api/data').then(() => setCount(1))
  }, [])

  return <div>{count}</div>
}
```

```tsx
// ❌ 错误 3：componentDidUpdate 死循环
class InfiniteLoop extends React.Component {
  state = { count: 0 }

  componentDidUpdate() {
    // ❌ 错误：无条件更新，导致死循环
    this.setState({ count: this.state.count + 1 })
  }

  // ✅ 正确：添加条件判断
  componentDidUpdateFixed(prevProps: any, prevState: any) {
    if (prevState.count < 10) {
      this.setState({ count: this.state.count + 1 })
    }
  }
}
```

```tsx
// ❌ 错误 4：依赖数组不完整
function MissingDependency({ userId }: { userId: number }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // ❌ 错误：缺少 userId 依赖
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
  }, []) // ⚠️ 警告：缺少依赖 userId

  // ✅ 正确：包含所有依赖
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
  }, [userId])

  return <div>{user?.name}</div>
}
```

## 9. 类组件 vs 函数组件流程对比

| 生命周期阶段 | 类组件 | 函数组件 |
| --- | --- | --- |
| 挂载前初始化 | `constructor` | 函数体、`useState` |
| 挂载后执行 | `componentDidMount` | `useEffect(() => {}, [])` |
| 每次更新后执行 | `componentDidUpdate` | `useEffect(() => {})` |
| props 变化时执行 | `componentDidUpdate` 比较 props | `useEffect(() => {}, [prop])` |
| 卸载前清理 | `componentWillUnmount` | `useEffect` 返回函数 |
| 性能优化 | `shouldComponentUpdate` | `React.memo`、`useMemo` |
| 错误捕获 | `componentDidCatch` | 无（需要类组件） |

## 10. 引用

- [React 文档 - 组件生命周期][1]
- [React 文档 - useEffect][2]
- [React DevTools Profiler][3]

[1]: https://react.dev/reference/react/Component#reference
[2]: https://react.dev/reference/react/useEffect
[3]: https://react.dev/learn/react-developer-tools
