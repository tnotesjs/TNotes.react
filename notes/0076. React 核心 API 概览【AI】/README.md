# [0076. React 核心 API 概览【AI】](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0076.%20React%20%E6%A0%B8%E5%BF%83%20API%20%E6%A6%82%E8%A7%88%E3%80%90AI%E3%80%91)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. React 的核心 API](#3-react-的核心-api)
  - [3.1. 组件相关的 API](#31-组件相关的-api)
  - [3.2. Hooks API](#32-hooks-api)
  - [3.3. 渲染相关的 API](#33-渲染相关的-api)
  - [3.4. 工具 API](#34-工具-api)
- [4. 总结](#4-总结)
- [5. 引用](#5-引用)

<!-- endregion:toc -->

## 1. 本节内容

- React 核心 API 分类
- 组件相关 API
- Hooks API
- 渲染相关 API
- 其他常用 API

## 2. 评价

本笔记介绍了 React 的核心 API 大概都有哪些，不对 API 的细节做介绍，更多是起到一个“导航”的作用，目的是帮你快速了解 React 都提供了哪些主要能力，在需要的时候可以快速搜索到你想要的 API。

## 3. React 的核心 API

React API 主要分为以下几类：

| 分类     | 用途                         | 使用频率 |
| -------- | ---------------------------- | -------- |
| 组件相关 | 定义和优化组件               | 高       |
| Hooks    | 在函数组件中使用状态和副作用 | 高       |
| 渲染相关 | 将 React 组件渲染到 DOM      | 低       |
| 工具 API | 辅助开发的工具函数           | 低       |

```mermaid
graph LR
    A[React 核心 API] --> B["组件相关<br/>(用途: 定义和优化<br/>频率: 高)"]
    A --> C["Hooks<br/>(用途: 状态与副作用<br/>频率: 高)"]
    A --> D["渲染相关<br/>(用途: 挂载到 DOM<br/>频率: 低)"]
    A --> E["工具 API<br/>(用途: 辅助开发<br/>频率: 低)"]

    %% 组件相关扩充
    B --> B1[基础组件: React.Component / PureComponent]
    B --> B2[性能优化: React.memo]
    B --> B3[代码组织: React.Fragment / &lt;&gt;&lt;/&gt;]
    B --> B4[引用转发: React.forwardRef]
    B --> B5[异步加载: React.lazy & Suspense]
    B --> B6[严格模式: React.StrictMode]

    %% Hooks 分类扩充
    C --> C1[状态 Hooks]
    C1 --> C1a[useState]
    C1 --> C1b[useReducer]

    C --> C2[副作用 Hooks]
    C2 --> C2a[useEffect]
    C2 --> C2b[useLayoutEffect]

    C --> C3[性能与并发 Hooks]
    C3 --> C3a[useMemo / useCallback]
    C3 --> C3b[useTransition]
    C3 --> C3c[useDeferredValue]

    C --> C4[引用与上下文 Hooks]
    C4 --> C4a[useRef]
    C4 --> C4b[useContext]

    C --> C5[其他 Hooks]
    C5 --> C5a[useId]
    C5 --> C5b[useSyncExternalStore]

    %% 渲染相关明确
    D --> D1[createRoot 现代 React 入口]
    D --> D2[hydrateRoot SSR 注水]
    D --> D3[render 遗留 API]
    D --> D4[unmount 卸载组件]

    %% 工具 API 补充
    E --> E1[createElement / jsx]
    E --> E2[cloneElement]
    E --> E3[isValidElement]
    E --> E4[React.Children 工具库]
    E --> E5[createContext]
```

### 3.1. 组件相关的 API

主要的组件 API：

| API                   | 说明         | 使用场景                         |
| --------------------- | ------------ | -------------------------------- |
| `React.Component`     | 类组件基类   | 定义类组件（逐渐被函数组件取代） |
| `React.PureComponent` | 纯类组件基类 | 性能优化的类组件                 |
| `React.memo`          | 高阶组件     | 优化函数组件性能                 |
| `React.Fragment`      | 片段组件     | 包裹多个子元素，不产生额外 DOM   |
| `React.forwardRef`    | 转发 ref     | 将 ref 转发到子组件              |
| `React.lazy`          | 懒加载组件   | 代码分割，按需加载               |
| `React.Suspense`      | 悬挂组件     | 配合 lazy 使用，显示加载状态     |

示例代码：

```jsx
// React.memo - 性能优化
const MyComponent = React.memo(function MyComponent({ name }) {
  return <div>{name}</div>
})

// React.Fragment - 包裹多个元素
function App() {
  return (
    <React.Fragment>
      <h1>标题</h1>
      <p>内容</p>
    </React.Fragment>
    // 或简写为
    // <>
    //   <h1>标题</h1>
    //   <p>内容</p>
    // </>
  )
}

// React.lazy + Suspense - 懒加载
const LazyComponent = React.lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <React.Suspense fallback={<div>加载中...</div>}>
      <LazyComponent />
    </React.Suspense>
  )
}

// React.forwardRef - 转发 ref
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="fancy-button">
    {props.children}
  </button>
))
```

### 3.2. Hooks API

Hooks 分类表：

| 分类     | Hooks                  | 说明                       |
| -------- | ---------------------- | -------------------------- |
| 状态管理 | `useState`             | 管理组件状态               |
|          | `useReducer`           | 复杂状态管理               |
| 副作用   | `useEffect`            | 处理副作用                 |
|          | `useLayoutEffect`      | 同步副作用                 |
|          | `useInsertionEffect`   | 在 DOM 变更前注入样式      |
| 性能优化 | `useMemo`              | 缓存计算结果               |
|          | `useCallback`          | 缓存回调函数               |
| 引用     | `useRef`               | 引用 DOM 或保存可变值      |
|          | `useImperativeHandle`  | 自定义暴露给父组件的实例值 |
| 上下文   | `useContext`           | 读取 Context 值            |
| 其他     | `useId`                | 生成唯一 ID                |
|          | `useTransition`        | 标记非紧急更新             |
|          | `useDeferredValue`     | 延迟更新值                 |
|          | `useSyncExternalStore` | 订阅外部 store             |
|          | `useDebugValue`        | 调试自定义 Hook            |

基础 Hooks 示例：

```jsx
import { useState, useEffect, useRef, useContext } from 'react'

function Example() {
  // useState - 状态管理
  const [count, setCount] = useState(0)

  // useEffect - 副作用
  useEffect(() => {
    document.title = `点击了 ${count} 次`
    return () => {
      // 清理函数
    }
  }, [count])

  // useRef - 引用 DOM
  const inputRef = useRef(null)

  // useContext - 读取上下文
  const theme = useContext(ThemeContext)

  return (
    <div>
      <input ref={inputRef} />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

性能优化 Hooks 示例：

```jsx
import { useMemo, useCallback } from 'react'

function ExpensiveComponent({ data }) {
  // useMemo - 缓存计算结果
  const processedData = useMemo(() => {
    return data.map((item) => item * 2)
  }, [data])

  // useCallback - 缓存回调函数
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return <div onClick={handleClick}>{processedData}</div>
}
```

### 3.3. 渲染相关的 API

渲染 API 对比：

| API           | 版本        | 说明                    | 使用场景       |
| ------------- | ----------- | ----------------------- | -------------- |
| `createRoot`  | React 18+   | 创建 root，启用并发特性 | 新项目推荐使用 |
| `hydrateRoot` | React 18+   | 服务端渲染的客户端激活  | SSR 项目       |
| `render`      | React 16-17 | 旧版渲染方法            | 旧项目维护     |

React 18 新渲染 API：

```jsx
// React 18+ 推荐写法
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// 服务端渲染
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(document.getElementById('root'), <App />)
```

React 17 及以前的写法：

```jsx
// React 17 及以前的写法（不推荐）
import ReactDOM from 'react-dom'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
```

### 3.4. 工具 API

工具类 API：

| API | 说明 | 使用场景 |
| --- | --- | --- |
| `createElement` | 创建 React 元素 | JSX 编译的目标，通常不直接使用 |
| `isValidElement` | 判断是否为有效的 React 元素 | 类型检查 |
| `cloneElement` | 克隆元素 | 修改 props 后克隆 |
| `Children` | 操作 children | 遍历、映射 children |
| `createContext` | 创建 Context | 跨组件传递数据 |
| `startTransition` | 标记非紧急更新 | 性能优化 |

示例代码：

```jsx
// createElement - 不使用 JSX
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!',
)

// isValidElement - 类型检查
if (React.isValidElement(element)) {
  console.log('这是一个有效的 React 元素')
}

// cloneElement - 克隆并修改
const cloned = React.cloneElement(element, { className: 'new-class' })

// Children - 操作 children
function Parent({ children }) {
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, { key: index })
  })
}

// createContext - 创建上下文
const ThemeContext = React.createContext('light')

// startTransition - 标记非紧急更新
import { startTransition } from 'react'

function handleClick() {
  startTransition(() => {
    setQuery(input) // 非紧急更新
  })
}
```

## 4. 总结

本笔记概览了 React 的核心 API，帮助开发者快速了解 React 提供的主要能力。

- React 的 API 设计简洁，核心 API 数量不多，但功能强大
- Hooks 是 React 16.8 引入的重要特性，极大地简化了组件开发
- 掌握核心 API 是深入学习 React 的基础
- 不需要一次性记住所有 API，在实际使用中逐步熟悉即可

## 5. 引用

- [React API Reference][1]
- [Hooks API Reference][2]
- [React 18 新特性][3]
- [Legacy React APIs][4]

[1]: https://react.dev/reference/react
[2]: https://react.dev/reference/react/hooks
[3]: https://react.dev/blog/2022/03/29/react-v18
[4]: https://react.dev/reference/react/legacy
