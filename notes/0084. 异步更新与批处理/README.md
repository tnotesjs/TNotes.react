# [0084. 异步更新与批处理](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0084.%20%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E4%B8%8E%E6%89%B9%E5%A4%84%E7%90%86)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 什么是批处理？](#3-什么是批处理)
  - [3.1. 基本概念](#31-基本概念)
  - [3.2. 批处理的好处](#32-批处理的好处)
  - [3.3. 批处理的执行时机](#33-批处理的执行时机)
- [4. React 18 的自动批处理有什么变化？](#4-react-18-的自动批处理有什么变化)
  - [4.1. React 17 vs React 18](#41-react-17-vs-react-18)
  - [4.2. 各种场景下的批处理](#42-各种场景下的批处理)
  - [4.3. React 18 迁移注意事项](#43-react-18-迁移注意事项)
- [5. 如何退出批处理？](#5-如何退出批处理)
  - [5.1. 使用 flushSync](#51-使用-flushsync)
  - [5.2. flushSync 的应用场景](#52-flushsync-的应用场景)
  - [5.3. flushSync 的注意事项](#53-flushsync-的注意事项)
- [6. 批处理如何影响性能？](#6-批处理如何影响性能)
  - [6.1. 性能对比](#61-性能对比)
  - [6.2. 减少不必要的渲染](#62-减少不必要的渲染)
  - [6.3. 性能监控](#63-性能监控)
- [7. 批处理的常见问题？](#7-批处理的常见问题)
  - [7.1. 问题 1：状态更新后立即读取](#71-问题-1状态更新后立即读取)
  - [7.2. 问题 2：批处理与 useEffect](#72-问题-2批处理与-useeffect)
  - [7.3. 问题 3：条件更新](#73-问题-3条件更新)
  - [7.4. 问题 4：父子组件更新顺序](#74-问题-4父子组件更新顺序)
- [8. 引用](#8-引用)

<!-- endregion:toc -->

## 1. 本节内容

- React 批处理机制的原理
- React 18 自动批处理的变化
- 退出批处理的方法
- 批处理对性能的影响
- 常见问题和解决方案

## 2. 评价

批处理是 React 性能优化的核心机制，React 18 进一步扩展了批处理的范围。

- React 18 前，只有事件处理器中的更新会批处理
- React 18 后，所有更新默认都会批处理，包括 Promise、setTimeout 等
- 批处理能显著减少渲染次数，提升应用性能
- 特殊情况下可以使用 `flushSync` 退出批处理，但应谨慎使用
- 理解批处理机制有助于优化组件性能和调试渲染问题

## 3. 什么是批处理？

### 3.1. 基本概念

批处理是指 React 将多个状态更新合并到一次重新渲染中的优化机制。

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  console.log('渲染') // 只打印一次

  const handleClick = () => {
    setCount(count + 1)
    setFlag(!flag)
    setCount(count + 2)
    // ✅ 三次更新，只触发一次渲染
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

### 3.2. 批处理的好处

```jsx
function ExpensiveComponent() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState('')

  console.log('渲染 - 执行了昂贵的计算')

  const handleSubmit = () => {
    // ✅ 批处理：只渲染一次
    setName('张三')
    setAge(25)
    setEmail('zhangsan@example.com')
  }

  const handleSubmitWithoutBatch = () => {
    // ❌ 如果没有批处理：渲染三次
    // 每次 setState 都会触发渲染
    setName('张三') // 渲染 1
    setAge(25) // 渲染 2
    setEmail('zhangsan@example.com') // 渲染 3
  }

  return <button onClick={handleSubmit}>提交</button>
}
```

### 3.3. 批处理的执行时机

```jsx
function BatchTiming() {
  const [count, setCount] = useState(0)

  console.log('渲染，count =', count)

  const handleClick = () => {
    console.log('开始更新，count =', count)

    setCount(count + 1)
    console.log('第一次更新后，count =', count) // 还是旧值

    setCount(count + 2)
    console.log('第二次更新后，count =', count) // 还是旧值

    console.log('函数结束')
    // 此时 React 才开始批量处理更新
  }

  return <button onClick={handleClick}>更新</button>
}
```

## 4. React 18 的自动批处理有什么变化？

### 4.1. React 17 vs React 18

::: code-group

```jsx [React 17 行为]
function React17Batch() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  console.log('渲染')

  const handleClick = () => {
    // ✅ 事件处理器中：批处理
    setCount((c) => c + 1)
    setFlag((f) => !f)
    // 只渲染一次
  }

  const handleAsync = () => {
    setTimeout(() => {
      // ❌ setTimeout 中：不批处理
      setCount((c) => c + 1) // 渲染 1
      setFlag((f) => !f) // 渲染 2
      // 渲染两次
    }, 0)

    fetch('/api/data').then(() => {
      // ❌ Promise 中：不批处理
      setCount((c) => c + 1) // 渲染 1
      setFlag((f) => !f) // 渲染 2
      // 渲染两次
    })
  }

  return (
    <div>
      <button onClick={handleClick}>同步更新</button>
      <button onClick={handleAsync}>异步更新</button>
    </div>
  )
}
```

```jsx [React 18 行为]
function React18Batch() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  console.log('渲染')

  const handleClick = () => {
    // ✅ 事件处理器中：批处理
    setCount((c) => c + 1)
    setFlag((f) => !f)
    // 只渲染一次
  }

  const handleAsync = () => {
    setTimeout(() => {
      // ✅ setTimeout 中：自动批处理
      setCount((c) => c + 1)
      setFlag((f) => !f)
      // 只渲染一次
    }, 0)

    fetch('/api/data').then(() => {
      // ✅ Promise 中：自动批处理
      setCount((c) => c + 1)
      setFlag((f) => !f)
      // 只渲染一次
    })
  }

  return (
    <div>
      <button onClick={handleClick}>同步更新</button>
      <button onClick={handleAsync}>异步更新</button>
    </div>
  )
}
```

:::

### 4.2. 各种场景下的批处理

```jsx
function AllScenarios() {
  const [count, setCount] = useState(0)

  console.log('渲染')

  // ✅ 场景 1：事件处理器
  const handleEvent = () => {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    // React 17 & 18：批处理 ✅
  }

  // ✅ 场景 2：setTimeout
  const handleTimeout = () => {
    setTimeout(() => {
      setCount((c) => c + 1)
      setCount((c) => c + 1)
      // React 17：不批处理 ❌
      // React 18：批处理 ✅
    }, 1000)
  }

  // ✅ 场景 3：Promise
  const handlePromise = () => {
    Promise.resolve().then(() => {
      setCount((c) => c + 1)
      setCount((c) => c + 1)
      // React 17：不批处理 ❌
      // React 18：批处理 ✅
    })
  }

  // ✅ 场景 4：原生事件
  useEffect(() => {
    const btn = document.getElementById('native-btn')
    btn?.addEventListener('click', () => {
      setCount((c) => c + 1)
      setCount((c) => c + 1)
      // React 17：不批处理 ❌
      // React 18：批处理 ✅
    })
  }, [])

  // ✅ 场景 5：async/await
  const handleAsync = async () => {
    await fetch('/api/data')
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    // React 17：不批处理 ❌
    // React 18：批处理 ✅
  }

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={handleEvent}>事件处理器</button>
      <button onClick={handleTimeout}>setTimeout</button>
      <button onClick={handlePromise}>Promise</button>
      <button id="native-btn">原生事件</button>
      <button onClick={handleAsync}>async/await</button>
    </div>
  )
}
```

### 4.3. React 18 迁移注意事项

```jsx
// React 17 中的代码
function OldCode() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setTimeout(() => {
      setCount(1)
      // React 17：立即渲染，DOM 更新
      console.log(divRef.current.textContent) // "1"

      setCount(2)
      // React 17：再次渲染，DOM 更新
      console.log(divRef.current.textContent) // "2"
    }, 0)
  }

  // ⚠️ 升级到 React 18 后
  // 两次 setCount 会批处理，上面的代码行为会改变
  // 第一个 console.log 可能输出的还是旧值

  return <div ref={divRef}>{count}</div>
}
```

## 5. 如何退出批处理？

### 5.1. 使用 flushSync

```jsx
import { flushSync } from 'react-dom'

function FlushSyncExample() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  console.log('渲染')

  const handleClick = () => {
    // ✅ 使用 flushSync 强制同步更新
    flushSync(() => {
      setCount((c) => c + 1)
    })
    // 此时 DOM 已经更新

    console.log('count 更新后')

    flushSync(() => {
      setFlag((f) => !f)
    })
    // 此时 DOM 再次更新

    // 总共触发两次渲染
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

### 5.2. flushSync 的应用场景

```jsx
// 场景 1：需要立即读取 DOM
function ScrollToBottom() {
  const [messages, setMessages] = useState([])
  const listRef = useRef(null)

  const addMessage = (text) => {
    flushSync(() => {
      setMessages((prev) => [...prev, text])
    })
    // ✅ DOM 已更新，可以滚动到底部
    listRef.current.scrollTop = listRef.current.scrollHeight
  }

  return (
    <div ref={listRef}>
      {messages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
      <button onClick={() => addMessage('新消息')}>发送消息</button>
    </div>
  )
}

// 场景 2：第三方库集成
function ChartComponent({ data }) {
  const [chartData, setChartData] = useState(data)
  const chartRef = useRef(null)

  const updateChart = (newData) => {
    flushSync(() => {
      setChartData(newData)
    })
    // ✅ 确保 DOM 更新后再调用图表库的更新方法
    chartRef.current.updateChart()
  }

  return <div ref={chartRef}>...</div>
}
```

### 5.3. flushSync 的注意事项

```jsx
function FlushSyncWarnings() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // ⚠️ 过度使用 flushSync 会降低性能
    for (let i = 0; i < 100; i++) {
      flushSync(() => {
        setCount((c) => c + 1)
      })
      // ❌ 触发 100 次渲染，性能很差
    }

    // ✅ 应该让 React 批处理
    for (let i = 0; i < 100; i++) {
      setCount((c) => c + 1)
    }
    // 只触发一次渲染
  }

  return <button onClick={handleClick}>更新</button>
}
```

## 6. 批处理如何影响性能？

### 6.1. 性能对比

```jsx
function PerformanceComparison() {
  const [items, setItems] = useState([])

  console.log('渲染，items 数量：', items.length)

  // ❌ 不使用批处理：性能差
  const addItemsWithoutBatch = () => {
    for (let i = 0; i < 100; i++) {
      flushSync(() => {
        setItems((prev) => [...prev, i])
      })
    }
    // 触发 100 次渲染
  }

  // ✅ 使用批处理：性能好
  const addItemsWithBatch = () => {
    setItems([])
    for (let i = 0; i < 100; i++) {
      setItems((prev) => [...prev, i])
    }
    // 只触发一次渲染
  }

  // ✅ 最佳方案：一次更新
  const addItemsBest = () => {
    setItems(Array.from({ length: 100 }, (_, i) => i))
    // 只触发一次渲染
  }

  return (
    <div>
      <p>项目数量：{items.length}</p>
      <button onClick={addItemsWithoutBatch}>不批处理</button>
      <button onClick={addItemsWithBatch}>批处理</button>
      <button onClick={addItemsBest}>最佳方案</button>
    </div>
  )
}
```

### 6.2. 减少不必要的渲染

```jsx
function ReduceRenders() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  console.log('渲染')

  const handleUpdate = () => {
    // ✅ 批处理自动优化
    setCount((c) => c + 1)
    setText('更新了')
    setCount((c) => c + 1)
    // 只触发一次渲染，count 增加 2
  }

  return (
    <div>
      <p>计数：{count}</p>
      <p>文本：{text}</p>
      <button onClick={handleUpdate}>更新</button>
    </div>
  )
}
```

### 6.3. 性能监控

```jsx
function PerformanceMonitor() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)

  renderCount.current++

  const handleClick = () => {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  return (
    <div>
      <p>计数：{count}</p>
      <p>渲染次数：{renderCount.current}</p>
      <button onClick={handleClick}>+3</button>
    </div>
  )
}
```

## 7. 批处理的常见问题？

### 7.1. 问题 1：状态更新后立即读取

::: code-group

```jsx [❌ 问题代码]
function BadExample() {
  const [count, setCount] = useState(0)
  const divRef = useRef(null)

  const handleClick = () => {
    setCount(count + 1)
    // ❌ DOM 还没更新
    console.log(divRef.current.textContent) // 输出旧值
  }

  return (
    <div ref={divRef}>
      {count}
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
```

```jsx [✅ 使用 flushSync]
function GoodExample1() {
  const [count, setCount] = useState(0)
  const divRef = useRef(null)

  const handleClick = () => {
    flushSync(() => {
      setCount(count + 1)
    })
    // ✅ DOM 已更新
    console.log(divRef.current.textContent) // 输出新值
  }

  return (
    <div ref={divRef}>
      {count}
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
```

```jsx [✅ 使用 useEffect]
function GoodExample2() {
  const [count, setCount] = useState(0)
  const divRef = useRef(null)

  useEffect(() => {
    // ✅ 在 effect 中读取更新后的 DOM
    console.log(divRef.current.textContent)
  }, [count])

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div ref={divRef}>
      {count}
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
```

:::

### 7.2. 问题 2：批处理与 useEffect

```jsx
function BatchWithEffect() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    console.log('effect 执行，count =', count, 'text =', text)
    // ✅ effect 只执行一次，因为批处理
  }, [count, text])

  const handleClick = () => {
    setCount((c) => c + 1)
    setText('更新了')
    // ✅ 批处理：只触发一次渲染和一次 effect
  }

  return <button onClick={handleClick}>更新</button>
}
```

### 7.3. 问题 3：条件更新

```jsx
function ConditionalUpdate() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)

  const handleClick = () => {
    setCount((c) => c + 1)

    // ⚠️ 这里的 count 还是旧值
    if (count > 10) {
      setShow(false)
    }

    // ✅ 使用函数式更新
    setCount((c) => {
      if (c > 10) {
        setShow(false)
      }
      return c + 1
    })
  }

  return (
    <div>
      {show && <p>计数：{count}</p>}
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
```

### 7.4. 问题 4：父子组件更新顺序

```jsx
function Parent() {
  const [count, setCount] = useState(0)

  console.log('Parent 渲染')

  const handleClick = () => {
    setCount((c) => c + 1)
  }

  return (
    <div>
      <p>父组件计数：{count}</p>
      <Child count={count} />
      <button onClick={handleClick}>+1</button>
    </div>
  )
}

function Child({ count }) {
  console.log('Child 渲染')

  // ✅ 父子组件在同一次批处理中更新
  return <p>子组件接收：{count}</p>
}
```

## 8. 引用

- [React 18 自动批处理][1]
- [React 官方文档 - flushSync][2]
- [React 批处理深入解析][3]

[1]: https://github.com/reactwg/react-18/discussions/21
[2]: https://react.dev/reference/react-dom/flushSync
[3]: https://react.dev/learn/queueing-a-series-of-state-updates
