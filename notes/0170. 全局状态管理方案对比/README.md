# [0170. 全局状态管理方案对比](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0170.%20%E5%85%A8%E5%B1%80%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%96%B9%E6%A1%88%E5%AF%B9%E6%AF%94)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 为什么需要全局状态管理？](#3--为什么需要全局状态管理)
- [4. 🤔 Redux 的特点是什么？](#4--redux-的特点是什么)
- [5. 🤔 Zustand 的特点是什么？](#5--zustand-的特点是什么)
- [6. 🤔 MobX 的特点是什么？](#6--mobx-的特点是什么)
- [7. 🤔 Context + Hooks 的特点是什么？](#7--context--hooks-的特点是什么)
- [8. 🤔 Jotai 和 Recoil 的特点是什么？](#8--jotai-和-recoil-的特点是什么)
- [9. 🆚 主流状态管理方案对比](#9--主流状态管理方案对比)
- [10. 🔗 引用](#10--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 全局状态管理的必要性
- Redux 的核心特点与使用场景
- Zustand 的轻量级方案
- MobX 的响应式编程
- Context + Hooks 原生方案
- 原子化状态管理（Jotai、Recoil）
- 不同方案的对比与选型建议

## 2. 🫧 评价

全局状态管理是大型 React 应用的核心基础设施，不同方案各有优劣，需要根据项目规模和团队熟悉度选择。

- Redux 生态最成熟，适合大型复杂应用，但样板代码较多
- Zustand 是轻量级首选，API 简洁，性能优秀，适合中小型项目
- MobX 使用响应式编程，学习成本低，但魔法较多，调试可能困难
- Context + Hooks 是原生方案，适合简单场景，但性能优化需要手动处理
- Jotai 和 Recoil 提供原子化状态，适合复杂依赖关系，但生态相对较新
- 小型项目推荐 Zustand 或 Context，中大型项目推荐 Redux Toolkit

## 3. 🤔 为什么需要全局状态管理？

当组件树层级较深或多个组件需要共享状态时，Props Drilling 会导致代码难以维护。

```tsx
// ❌ Props Drilling 问题
function App() {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' })

  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }: any) {
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Sidebar user={user} />
      <Content user={user} setUser={setUser} />
    </div>
  )
}

function Header({ user, setUser }: any) {
  return <UserMenu user={user} setUser={setUser} />
}

function UserMenu({ user, setUser }: any) {
  // 经过多层传递才能使用
  return (
    <button onClick={() => setUser({ ...user, name: 'Bob' })}>切换用户</button>
  )
}
```

**全局状态管理的优势：**

```tsx
// ✅ 使用全局状态（以 Zustand 为例）
import create from 'zustand'

const useStore = create((set) => ({
  user: { name: 'Alice', role: 'admin' },
  setUser: (user: any) => set({ user }),
}))

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
    </div>
  )
}

function UserMenu() {
  // 直接访问全局状态，无需层层传递
  const { user, setUser } = useStore()

  return (
    <button onClick={() => setUser({ ...user, name: 'Bob' })}>切换用户</button>
  )
}
```

**适合使用全局状态的场景：**

- 用户认证信息（登录状态、用户资料）
- 主题配置（亮色/暗色模式）
- 语言设置（国际化）
- 购物车数据
- 通知消息
- 多个页面共享的数据

## 4. 🤔 Redux 的特点是什么？

Redux 是最流行的状态管理库，基于 Flux 架构，强调单向数据流和不可变性。

```tsx
// Redux Toolkit 基本使用
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from 'react-redux'

// 创建 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1 // RTK 内部使用 Immer，可以直接修改
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// 创建 store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})

// 导出 actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// 在组件中使用
function Counter() {
  const count = useSelector((state: any) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}
```

**Redux 的优势：**

- 生态成熟，工具链完善（DevTools、中间件）
- 可预测的状态更新（单向数据流）
- 时间旅行调试
- 强大的中间件系统（redux-thunk、redux-saga）

**Redux 的劣势：**

- 样板代码多（RTK 已大幅改善）
- 学习曲线陡峭
- 对小型项目过于复杂

## 5. 🤔 Zustand 的特点是什么？

Zustand 是轻量级状态管理库，API 简洁，性能优秀，无需 Provider。

```tsx
// Zustand 基本使用
import create from 'zustand'

// 创建 store（无需 Provider）
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  incrementByAmount: (amount: number) =>
    set((state) => ({ count: state.count + amount })),
  reset: () => set({ count: 0 }),
}))

// 在组件中使用
function Counter() {
  const { count, increment, decrement, incrementByAmount, reset } = useStore()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={() => incrementByAmount(5)}>+5</button>
      <button onClick={reset}>重置</button>
    </div>
  )
}

// 选择性订阅（性能优化）
function DisplayCount() {
  // 只订阅 count，不订阅其他状态
  const count = useStore((state) => state.count)
  return <p>Count: {count}</p>
}
```

**中间件支持：**

```tsx
import { persist, devtools } from 'zustand/middleware'

// 持久化 + DevTools
const useStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (user: any) => set({ user }),
        logout: () => set({ user: null }),
      }),
      { name: 'user-storage' } // localStorage key
    )
  )
)
```

**Zustand 的优势：**

- 极简 API，学习成本低
- 无需 Provider，代码更简洁
- 性能优秀，支持选择性订阅
- 支持中间件（持久化、DevTools）

**Zustand 的劣势：**

- 生态相对较小
- 缺少 Redux 的严格约束

## 6. 🤔 MobX 的特点是什么？

MobX 基于响应式编程，自动追踪依赖，代码简洁，但有一定魔法。

```tsx
// MobX 基本使用
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

// 创建 store
class CounterStore {
  count = 0

  constructor() {
    makeAutoObservable(this) // 自动追踪
  }

  increment() {
    this.count++ // 直接修改
  }

  decrement() {
    this.count--
  }

  get doubled() {
    return this.count * 2 // 计算属性
  }
}

const counterStore = new CounterStore()

// 使用 observer 包裹组件
const Counter = observer(() => {
  return (
    <div>
      <p>Count: {counterStore.count}</p>
      <p>Doubled: {counterStore.doubled}</p>
      <button onClick={() => counterStore.increment()}>+1</button>
      <button onClick={() => counterStore.decrement()}>-1</button>
    </div>
  )
})
```

**MobX 的优势：**

- 代码简洁，接近面向对象
- 自动追踪依赖，无需手动优化
- 学习成本相对较低

**MobX 的劣势：**

- 魔法较多，调试可能困难
- 不可变性不如 Redux 严格
- 需要装饰器或 `makeAutoObservable`

## 7. 🤔 Context + Hooks 的特点是什么？

React 原生方案，适合简单场景，无需额外依赖。

```tsx
// Context + Hooks
import { createContext, useContext, useState } from 'react'

const CounterContext = createContext<any>(null)

function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  )
}

function Counter() {
  const { count, increment, decrement } = useContext(CounterContext)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  )
}

function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  )
}
```

**性能优化：**

```tsx
// 使用 useMemo 优化
function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)

  const value = useMemo(
    () => ({
      count,
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => c - 1),
    }),
    [count]
  )

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  )
}
```

**Context 的优势：**

- 原生方案，无需额外依赖
- 适合简单场景

**Context 的劣势：**

- 性能优化需要手动处理
- 多个 Context 嵌套会导致 Provider Hell
- 不适合频繁更新的状态

## 8. 🤔 Jotai 和 Recoil 的特点是什么？

原子化状态管理，将状态拆分为独立的原子，适合复杂依赖关系。

::: code-group

```tsx [Jotai]
import { atom, useAtom } from 'jotai'

// 定义原子
const countAtom = atom(0)
const doubledAtom = atom((get) => get(countAtom) * 2)

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  const [doubled] = useAtom(doubledAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

```tsx [Recoil]
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

// 定义原子
const countState = atom({
  key: 'count',
  default: 0,
})

const doubledState = selector({
  key: 'doubled',
  get: ({ get }) => get(countState) * 2,
})

function Counter() {
  const [count, setCount] = useRecoilState(countState)
  const doubled = useRecoilValue(doubledState)

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

:::

**原子化方案的优势：**

- 细粒度订阅，性能优秀
- 支持派生状态和异步
- 适合复杂依赖关系

**原子化方案的劣势：**

- 生态相对较新
- 学习成本较高
- 需要 Provider 包裹

## 9. 🆚 主流状态管理方案对比

| 特性        | Redux      | Zustand    | MobX     | Context    | Jotai/Recoil |
| ----------- | ---------- | ---------- | -------- | ---------- | ------------ |
| 学习成本    | ⭐⭐       | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐       |
| 代码简洁度  | ⭐⭐       | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐     | ⭐⭐⭐⭐     |
| 性能        | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐     | ⭐⭐⭐⭐⭐   |
| 生态成熟度  | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐   | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐       |
| DevTools    | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐   | ⭐⭐⭐⭐ | ⭐⭐       | ⭐⭐⭐⭐     |
| TypeScript  | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐     |
| Bundle 大小 | 大         | 极小       | 中       | 无         | 小           |
| 适合规模    | 大型       | 中小型     | 中大型   | 小型       | 中大型       |

**选型建议：**

```tsx
// 小型项目（< 10 个页面）
// 推荐：Context + Hooks 或 Zustand
const useStore = create((set) => ({
  user: null,
  theme: 'light',
  setUser: (user: any) => set({ user }),
  setTheme: (theme: string) => set({ theme }),
}))

// 中型项目（10-50 个页面）
// 推荐：Zustand 或 Redux Toolkit
import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      // 状态定义
    }),
    { name: 'app-storage' }
  )
)

// 大型项目（50+ 个页面）
// 推荐：Redux Toolkit + RTK Query
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
  reducer: {
    // 多个 reducer
  },
})

setupListeners(store.dispatch)
```

**迁移难度对比：**

- Context → Zustand：简单，API 相似
- Context → Redux：中等，需要重构
- Redux → Zustand：中等，需要改写 reducer
- MobX → Redux：困难，范式完全不同

## 10. 🔗 引用

- [Redux 官方文档][1]
- [Zustand GitHub][2]
- [MobX 官方文档][3]
- [Jotai 官方文档][4]
- [Recoil 官方文档][5]

[1]: https://redux.js.org/
[2]: https://github.com/pmndrs/zustand
[3]: https://mobx.js.org/
[4]: https://jotai.org/
[5]: https://recoiljs.org/
