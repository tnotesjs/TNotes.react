# [0176. useLayoutEffect vs useEffect](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0176.%20useLayoutEffect%20vs%20useEffect)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 useEffect 是什么？](#3--useeffect-是什么)
- [4. 🤔 useLayoutEffect 是什么？](#4--uselayouteffect-是什么)
- [5. 🆚 useLayoutEffect vs useEffect](#5--uselayouteffect-vs-useeffect)
- [6. 🤔 执行时机有什么区别？](#6--执行时机有什么区别)
- [7. 🤔 何时使用 useLayoutEffect？](#7--何时使用-uselayouteffect)
- [8. 🤔 何时使用 useEffect？](#8--何时使用-useeffect)
- [9. 🤔 有哪些常见问题？](#9--有哪些常见问题)
- [10. 🤔 SSR 环境下如何处理？](#10--ssr-环境下如何处理)
- [11. 🔗 引用](#11--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- useEffect 的执行时机和特点
- useLayoutEffect 的执行时机和特点
- 两者的核心区别和对比
- 各自的使用场景
- 常见问题和解决方案
- SSR 环境下的处理方式

## 2. 🫧 评价

这篇笔记详细对比 React 中两个副作用 Hook：useEffect 和 useLayoutEffect。

- 99% 的场景应该使用 useEffect，它是异步执行不会阻塞渲染
- useLayoutEffect 同步执行会阻塞渲染，只在需要读取 DOM 布局或立即修改 DOM 时使用
- 两者的区别在于执行时机：useEffect 在浏览器绘制后执行，useLayoutEffect 在 DOM 更新后但浏览器绘制前执行
- useLayoutEffect 在 SSR 环境下会报警告，需要特殊处理
- 过度使用 useLayoutEffect 会导致性能问题，因为它会阻塞视觉更新

## 3. 🤔 useEffect 是什么？

`useEffect` 是 React 中最常用的副作用 Hook，在浏览器绘制完成后异步执行。

```typescript
// 基本语法
useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理函数
  }
}, [dependencies])

// 基本示例
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('useEffect 执行')
    document.title = `点击了 ${count} 次`
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}

// 执行时机
function TimingDemo() {
  const [count, setCount] = useState(0)

  console.log('1. 组件渲染')

  useEffect(() => {
    console.log('3. useEffect 执行（绘制后）')
  })

  console.log('2. render 完成')

  return <div>{count}</div>
}
// 输出顺序：
// 1. 组件渲染
// 2. render 完成
// （浏览器绘制到屏幕）
// 3. useEffect 执行（绘制后）
```

常见使用场景：

```typescript
// 场景 1：数据获取
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setUser(data)
      })

    return () => {
      cancelled = true
    }
  }, [userId])

  return <div>{user?.name}</div>
}

// 场景 2：订阅事件
function WindowSize() {
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

  return (
    <div>
      {size.width} x {size.height}
    </div>
  )
}

// 场景 3：定时器
function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <div>已运行 {seconds} 秒</div>
}
```

## 4. 🤔 useLayoutEffect 是什么？

`useLayoutEffect` 在 DOM 更新后但浏览器绘制前同步执行，会阻塞视觉更新。

```typescript
// 基本语法（与 useEffect 完全相同）
useLayoutEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理函数
  }
}, [dependencies])

// 基本示例
function LayoutDemo() {
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    console.log('useLayoutEffect 执行')
    // 此时 DOM 已更新，但用户还看不到
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}

// 执行时机
function TimingDemo() {
  const [count, setCount] = useState(0)

  console.log('1. 组件渲染')

  useLayoutEffect(() => {
    console.log('3. useLayoutEffect 执行（绘制前）')
  })

  console.log('2. render 完成')

  return <div>{count}</div>
}
// 输出顺序：
// 1. 组件渲染
// 2. render 完成
// 3. useLayoutEffect 执行（绘制前）
// （浏览器绘制到屏幕）
```

典型使用场景：

```typescript
// 场景 1：读取 DOM 尺寸并立即调整
function Tooltip({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect()

      let x = rect.left
      let y = rect.top

      if (x + rect.width > window.innerWidth) {
        x = window.innerWidth - rect.width - 10
      }

      if (y + rect.height > window.innerHeight) {
        y = window.innerHeight - rect.height - 10
      }

      setPosition({ x, y })
    }
  }, [children])

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
      }}
    >
      {children}
    </div>
  )
}

// 场景 2：防止闪烁
function AnimatedBox() {
  const [isVisible, setIsVisible] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  // ✅ 使用 useLayoutEffect 避免闪烁
  useLayoutEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.opacity = isVisible ? '1' : '0'
    }
  }, [isVisible])

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
      <div ref={boxRef} style={{ transition: 'opacity 0.3s' }}>
        Box Content
      </div>
    </div>
  )
}

// 场景 3：滚动位置调整
function ScrollToBottom({ messages }: { messages: string[] }) {
  const listRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={listRef} style={{ height: '400px', overflow: 'auto' }}>
      {messages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
    </div>
  )
}
```

## 5. 🆚 useLayoutEffect vs useEffect

| 特性         | useEffect                | useLayoutEffect             |
| ------------ | ------------------------ | --------------------------- |
| 执行时机     | 浏览器绘制后（异步）     | DOM 更新后、绘制前（同步）  |
| 是否阻塞渲染 | 否                       | 是                          |
| 性能影响     | 小                       | 大（阻塞视觉更新）          |
| 使用频率     | 99% 的场景               | 1% 的场景                   |
| 适用场景     | 数据获取、订阅、定时器等 | 读取 DOM 布局、立即修改 DOM |
| SSR 支持     | 完全支持                 | 会报警告                    |
| API 签名     | 完全相同                 | 完全相同                    |

```typescript
// 可视化时间线对比
function ComparisonDemo() {
  const [count, setCount] = useState(0)

  console.log('1. Render 开始')

  useLayoutEffect(() => {
    console.log('3. useLayoutEffect（绘制前）')
  })

  useEffect(() => {
    console.log('5. useEffect（绘制后）')
  })

  console.log('2. Render 结束')

  return <div>{count}</div>
}

// 完整执行顺序：
// 1. Render 开始
// 2. Render 结束
// 3. useLayoutEffect（绘制前） ← DOM 已更新但未绘制
// 4. 浏览器绘制 ← 用户看到更新
// 5. useEffect（绘制后）

// 直观对比：闪烁问题
function FlickerComparison() {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  // ❌ useEffect：用户会看到短暂的 0，然后变成 100
  useEffect(() => {
    if (ref.current && value === 0) {
      setValue(100)
    }
  }, [value])

  // ✅ useLayoutEffect：用户直接看到 100，不会闪烁
  useLayoutEffect(() => {
    if (ref.current && value === 0) {
      setValue(100)
    }
  }, [value])

  return <div ref={ref}>{value}</div>
}
```

## 6. 🤔 执行时机有什么区别？

理解执行时机是选择正确 Hook 的关键。

```typescript
// 完整的生命周期流程
function LifecycleDemo() {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  console.log('阶段 1：Render 阶段开始')

  const doubled = count * 2

  console.log('阶段 2：Render 阶段完成，doubled =', doubled)

  // 阶段 3：Commit 阶段（DOM 更新）
  // React 将虚拟 DOM 同步到真实 DOM

  // 阶段 4：useLayoutEffect（同步执行）
  useLayoutEffect(() => {
    console.log('阶段 4：useLayoutEffect 执行')
    console.log('DOM 已更新，ref.current =', ref.current?.textContent)
    console.log('但浏览器还未绘制，用户看不到')

    if (ref.current) {
      const width = ref.current.offsetWidth
      console.log('元素宽度:', width)
    }
  })

  // 阶段 5：浏览器绘制（用户看到更新）

  // 阶段 6：useEffect（异步执行）
  useEffect(() => {
    console.log('阶段 6：useEffect 执行')
    console.log('用户已经看到更新的内容')
  })

  return (
    <div>
      <div ref={ref}>{doubled}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}

// 测量问题示例
function MeasurementProblem() {
  const [height, setHeight] = useState(0)
  const [text, setText] = useState('Short')
  const divRef = useRef<HTMLDivElement>(null)

  // ❌ useEffect：读取的是旧的高度
  useEffect(() => {
    if (divRef.current) {
      const newHeight = divRef.current.offsetHeight
      setHeight(newHeight) // ⚠️ 可能不准确
    }
  }, [text])

  // ✅ useLayoutEffect：读取的是新的高度
  useLayoutEffect(() => {
    if (divRef.current) {
      const newHeight = divRef.current.offsetHeight
      setHeight(newHeight) // ✅ 准确
    }
  }, [text])

  return (
    <div>
      <div ref={divRef}>{text}</div>
      <p>测量高度：{height}px</p>
      <button onClick={() => setText(text + ' More text')}>添加文本</button>
    </div>
  )
}
```

## 7. 🤔 何时使用 useLayoutEffect？

只在特定场景下使用，避免性能问题。

```typescript
// 场景 1：需要读取 DOM 布局信息
function ResizablePanel() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const panelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }
  }, [])

  return (
    <div ref={panelRef}>
      <p>宽度：{size.width}px</p>
      <p>高度：{size.height}px</p>
    </div>
  )
}

// 场景 2：基于 DOM 测量进行条件渲染
function AdaptiveMenu({ items }: { items: MenuItem[] }) {
  const [visibleCount, setVisibleCount] = useState(items.length)
  const menuRef = useRef<HTMLUListElement>(null)

  useLayoutEffect(() => {
    if (menuRef.current) {
      const containerWidth = menuRef.current.offsetWidth
      let totalWidth = 0
      let count = 0

      const children = menuRef.current.children
      for (let i = 0; i < children.length; i++) {
        const itemWidth = (children[i] as HTMLElement).offsetWidth
        if (totalWidth + itemWidth <= containerWidth) {
          totalWidth += itemWidth
          count++
        } else {
          break
        }
      }

      setVisibleCount(count)
    }
  }, [items])

  return (
    <ul ref={menuRef}>
      {items.slice(0, visibleCount).map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
      {visibleCount < items.length && <li>更多...</li>}
    </ul>
  )
}

// 场景 3：同步 DOM 属性
function ScrollSync() {
  const [scrollTop, setScrollTop] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = scrollTop
    }
  }, [scrollTop])

  return (
    <div>
      <input
        type="range"
        min="0"
        max="1000"
        value={scrollTop}
        onChange={(e) => setScrollTop(Number(e.target.value))}
      />
      <div ref={contentRef} style={{ height: '200px', overflow: 'auto' }}>
        {/* 长内容 */}
      </div>
    </div>
  )
}
```

## 8. 🤔 何时使用 useEffect？

绝大多数场景应该使用 useEffect。

```typescript
// 场景 1：数据获取
function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setUsers(data)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <div>加载中...</div>
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}

// 场景 2：事件订阅
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div>
      鼠标位置：({position.x}, {position.y})
    </div>
  )
}

// 场景 3：定时器
function Countdown({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) return

    const timer = setTimeout(() => {
      setRemaining(remaining - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [remaining])

  return <div>{remaining > 0 ? `剩余 ${remaining} 秒` : '时间到！'}</div>
}

// 场景 4：本地存储同步
function Settings() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">浅色</option>
      <option value="dark">深色</option>
    </select>
  )
}

// 场景 5：文档标题更新
function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    return () => {
      document.title = prevTitle
    }
  }, [title])

  return null
}
```

## 9. 🤔 有哪些常见问题？

```typescript
// 问题 1：过度使用 useLayoutEffect
function BadExample() {
  const [data, setData] = useState<Data[]>([])

  // ❌ 不需要使用 useLayoutEffect
  useLayoutEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
  }, [])

  // ✅ 数据获取应该用 useEffect
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
  }, [])

  return <div>{/* 渲染数据 */}</div>
}

// 问题 2：useLayoutEffect 导致性能问题
function PerformanceIssue() {
  const [count, setCount] = useState(0)

  // ❌ 耗时操作阻塞渲染
  useLayoutEffect(() => {
    const start = Date.now()
    while (Date.now() - start < 500) {} // 模拟耗时
    console.log('计算完成')
  }, [count])

  // ✅ 改用 useEffect
  useEffect(() => {
    const start = Date.now()
    while (Date.now() - start < 500) {}
    console.log('计算完成')
  }, [count])

  return <div>{count}</div>
}

// 问题 3：循环依赖
function InfiniteLoop() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const divRef = useRef<HTMLDivElement>(null)

  // ❌ 会导致无限循环
  useLayoutEffect(() => {
    if (divRef.current) {
      setSize({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      })
    }
  }, [size]) // ❌ size 变化触发重新测量

  // ✅ 只在必要时测量
  useLayoutEffect(() => {
    if (divRef.current) {
      const newWidth = divRef.current.offsetWidth
      const newHeight = divRef.current.offsetHeight

      setSize((prev) => {
        if (prev.width !== newWidth || prev.height !== newHeight) {
          return { width: newWidth, height: newHeight }
        }
        return prev
      })
    }
  }, [])

  return (
    <div ref={divRef}>
      {size.width} x {size.height}
    </div>
  )
}

// 问题 4：混淆使用场景
function ConfusedUsage() {
  const [show, setShow] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // 判断是否需要 useLayoutEffect
  // 问：是否需要读取 DOM 布局？
  // 问：是否需要在绘制前修改 DOM？
  // 问：用户是否会看到闪烁？

  // ❌ 只是设置状态，不需要 useLayoutEffect
  useLayoutEffect(() => {
    if (show) {
      console.log('Modal 显示')
    }
  }, [show])

  // ✅ useEffect 足够
  useEffect(() => {
    if (show) {
      console.log('Modal 显示')
    }
  }, [show])

  return show ? <div ref={modalRef}>Modal</div> : null
}
```

## 10. 🤔 SSR 环境下如何处理？

useLayoutEffect 在服务端渲染时会报警告。

```typescript
// 问题：SSR 警告
function SSRWarning() {
  // ⚠️ Warning: useLayoutEffect does nothing on the server
  useLayoutEffect(() => {
    console.log('这在服务端不会执行')
  }, [])

  return <div>Content</div>
}

// 解决方案 1：使用 useEffect
function Solution1() {
  useEffect(() => {
    console.log('这在服务端和客户端都安全')
  }, [])

  return <div>Content</div>
}

// 解决方案 2：条件使用
function Solution2() {
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect

  useIsomorphicLayoutEffect(() => {
    // 现在不会有警告了
  }, [])

  return <div>Content</div>
}

// 解决方案 3：自定义 Hook
function useIsomorphicLayoutEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const isClient = typeof window !== 'undefined'
  const useEffectHook = isClient ? useLayoutEffect : useEffect

  useEffectHook(effect, deps)
}

function MyComponent() {
  useIsomorphicLayoutEffect(() => {
    // 你的逻辑
  }, [])

  return <div>Content</div>
}

// 完整的工具函数
export const useIsomorphicLayoutEffect: typeof useLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect

// 使用示例
function MyApp() {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      console.log('元素尺寸:', rect)
    }
  }, [])

  return <div ref={ref}>App Content</div>
}
```

## 11. 🔗 引用

- [useEffect 官方文档][1]
- [useLayoutEffect 官方文档][2]
- [Effect 执行时机详解][3]
- [React Hooks 深入理解][4]

[1]: https://react.dev/reference/react/useEffect
[2]: https://react.dev/reference/react/useLayoutEffect
[3]: https://react.dev/learn/synchronizing-with-effects
[4]: https://react.dev/learn/escape-hatches
