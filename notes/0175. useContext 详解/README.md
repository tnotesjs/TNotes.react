# [0175. useContext 详解](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0175.%20useContext%20%E8%AF%A6%E8%A7%A3)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. useContext 是什么？](#2-usecontext-是什么)
  - [2.1. 基本定义](#21-基本定义)
  - [2.2. Context 解决的问题](#22-context-解决的问题)
  - [2.3. 基本使用流程](#23-基本使用流程)
- [3. 如何创建和使用 Context？](#3-如何创建和使用-context)
  - [3.1. 标准 Context 模式](#31-标准-context-模式)
  - [3.2. 带初始化逻辑的 Context](#32-带初始化逻辑的-context)
  - [3.3. 多值 Context 模式](#33-多值-context-模式)
- [4. 如何优化 Context 性能？](#4-如何优化-context-性能)
  - [4.1. 问题演示](#41-问题演示)
  - [4.2. 解决方案 1：使用 useMemo](#42-解决方案-1使用-usememo)
  - [4.3. 解决方案 2：拆分 Context](#43-解决方案-2拆分-context)
  - [4.4. 解决方案 3：状态与操作分离](#44-解决方案-3状态与操作分离)
  - [4.5. 解决方案 4：使用 React.memo](#45-解决方案-4使用-reactmemo)
- [5. 如何处理多个 Context？](#5-如何处理多个-context)
  - [5.1. 多个 Provider 嵌套](#51-多个-provider-嵌套)
  - [5.2. 创建组合 Provider](#52-创建组合-provider)
  - [5.3. 组合多个 Context 值](#53-组合多个-context-值)
  - [5.4. 动态 Provider 组合](#54-动态-provider-组合)
- [6. useContext 有哪些常见错误？](#6-usecontext-有哪些常见错误)
  - [6.1. 错误 1：在 Provider 外使用](#61-错误-1在-provider-外使用)
  - [6.2. 错误 2：忘记 useMemo](#62-错误-2忘记-usememo)
  - [6.3. 错误 3：Context 值过大](#63-错误-3context-值过大)
  - [6.4. 错误 4：不必要的 Context](#64-错误-4不必要的-context)
- [7. 如何实现 Context 的最佳实践？](#7-如何实现-context-的最佳实践)
  - [7.1. 模式 1：类型安全的 Context](#71-模式-1类型安全的-context)
  - [7.2. 模式 2：带持久化的 Context](#72-模式-2带持久化的-context)
  - [7.3. 模式 3：带 Reducer 的 Context](#73-模式-3带-reducer-的-context)
- [8. useContext vs Props vs Redux](#8-usecontext-vs-props-vs-redux)
  - [8.1. 选择指南](#81-选择指南)
- [9. 引用](#9-引用)

<!-- endregion:toc -->

## 1. 本节内容

- useContext 的基本概念和用法
- Context 的创建和配置
- Context 的性能优化技巧
- 多个 Context 的组合使用
- 常见错误和解决方案
- Context 的最佳实践模式

这篇笔记全面讲解 React Context API 的使用方法和最佳实践，帮助解决跨组件通信问题。

- useContext 是解决 props drilling 问题的官方方案，避免层层传递 props
- Context 适合共享不常变化的数据（主题、语言、用户信息等），不适合频繁更新的状态
- 必须注意性能优化，Context 值变化会导致所有消费组件重新渲染
- 合理拆分 Context，避免一个大 Context 包含所有状态

## 2. useContext 是什么？

`useContext` 是一个 Hook，用于在函数组件中读取 Context 的值。

### 2.1. 基本定义

```typescript
// 创建 Context
const MyContext = React.createContext<ContextType>(defaultValue)

// 使用 useContext 读取值
function MyComponent() {
  const value = useContext(MyContext)

  return <div>{value}</div>
}
```

### 2.2. Context 解决的问题

```typescript
// ❌ 问题：Props Drilling（属性钻取）
function App() {
  const [user, setUser] = useState({ name: 'Alice' })

  return <PageLayout user={user} />
}

function PageLayout({ user }: { user: User }) {
  return <Sidebar user={user} />
}

function Sidebar({ user }: { user: User }) {
  return <UserProfile user={user} />
}

function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>
}

// ✅ 解决：使用 Context
const UserContext = React.createContext<User | null>(null)

function App() {
  const [user, setUser] = useState({ name: 'Alice' })

  return (
    <UserContext.Provider value={user}>
      <PageLayout />
    </UserContext.Provider>
  )
}

function PageLayout() {
  return <Sidebar /> // ✅ 不需要传递 user
}

function Sidebar() {
  return <UserProfile /> // ✅ 不需要传递 user
}

function UserProfile() {
  const user = useContext(UserContext) // ✅ 直接获取 user
  return <div>{user?.name}</div>
}
```

### 2.3. 基本使用流程

```typescript
// 步骤 1：创建 Context
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
)

// 步骤 2：提供 Context 值
function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const value = { theme, toggleTheme }

  return (
    <ThemeContext.Provider value={value}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

// 步骤 3：消费 Context 值
function Toolbar() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('Toolbar 必须在 ThemeContext.Provider 内使用')
  }

  const { theme, toggleTheme } = context

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  )
}
```

## 3. 如何创建和使用 Context？

创建 Context 并提供自定义 Hook。

### 3.1. 标准 Context 模式

```typescript
// 定义类型
interface User {
  id: string
  name: string
  email: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

// 创建 Context
const UserContext = React.createContext<UserContextType | undefined>(undefined)

// 创建自定义 Hook
function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser 必须在 UserProvider 内使用')
  }

  return context
}

// 创建 Provider 组件
function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const value = React.useMemo(
    () => ({ user, setUser, isLoading }),
    [user, isLoading]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// 使用
function App() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  )
}

function Dashboard() {
  const { user, isLoading } = useUser()

  if (isLoading) return <div>加载中...</div>
  if (!user) return <div>未登录</div>

  return <div>欢迎，{user.name}</div>
}
```

### 3.2. 带初始化逻辑的 Context

```typescript
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内使用')
  }

  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // ✅ 初始化：检查登录状态
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const response = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          })
          const userData = await response.json()
          setUser(userData)
        }
      } catch (error) {
        console.error('认证检查失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const { token, user } = await response.json()
    localStorage.setItem('token', token)
    setUser(user)
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user]
  )

  if (isLoading) {
    return <div>初始化中...</div>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
```

### 3.3. 多值 Context 模式

```typescript
// Context 1：主题
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme 必须在 ThemeProvider 内使用')
  return context
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const value = React.useMemo(() => ({ theme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Context 2：语言
interface LanguageContextType {
  language: 'zh' | 'en'
  setLanguage: (lang: 'zh' | 'en') => void
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage 必须在 LanguageProvider 内使用')
  return context
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<'zh' | 'en'>('zh')

  const value = React.useMemo(() => ({ language, setLanguage }), [language])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// 组合使用
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Main />
      </LanguageProvider>
    </ThemeProvider>
  )
}

function Main() {
  const { theme } = useTheme()
  const { language } = useLanguage()

  return (
    <div>
      主题：{theme}，语言：{language}
    </div>
  )
}
```

## 4. 如何优化 Context 性能？

Context 值变化会导致所有消费组件重新渲染。

### 4.1. 问题演示

```typescript
// ❌ 性能问题：每次渲染都创建新对象
function BadProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = React.useState(0)

  // ❌ 每次渲染都是新对象，导致所有消费组件重新渲染
  const value = {
    count,
    increment: () => setCount((c) => c + 1),
  }

  return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}

function ExpensiveComponent() {
  const { count } = useContext(CountContext)
  console.log('ExpensiveComponent 重新渲染') // ❌ 每次都会执行

  // 昂贵的计算
  const result = expensiveCalculation()

  return <div>{count}</div>
}
```

### 4.2. 解决方案 1：使用 useMemo

```typescript
// ✅ 使用 useMemo 缓存 Context 值
function GoodProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = React.useState(0)

  // ✅ 只在依赖变化时创建新对象
  const value = React.useMemo(
    () => ({
      count,
      increment: () => setCount((c) => c + 1),
    }),
    [count]
  )

  return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}
```

### 4.3. 解决方案 2：拆分 Context

```typescript
// ❌ 一个大 Context
interface AppContextType {
  user: User
  theme: string
  language: string
  notifications: Notification[]
  settings: Settings
}

// ✅ 拆分成多个小 Context
const UserContext = React.createContext<User | null>(null)
const ThemeContext = React.createContext<string>('light')
const LanguageContext = React.createContext<string>('zh')
const NotificationContext = React.createContext<Notification[]>([])
const SettingsContext = React.createContext<Settings>({})

// ✅ 组件只订阅需要的 Context
function UserProfile() {
  const user = useContext(UserContext) // 只在 user 变化时重新渲染
  return <div>{user?.name}</div>
}

function ThemeToggle() {
  const theme = useContext(ThemeContext) // 只在 theme 变化时重新渲染
  return <button>{theme}</button>
}
```

### 4.4. 解决方案 3：状态与操作分离

```typescript
// 状态 Context
const CountStateContext = React.createContext<number>(0)

// 操作 Context
const CountDispatchContext = React.createContext<
  | {
      increment: () => void
      decrement: () => void
    }
  | undefined
>(undefined)

function CountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = React.useState(0)

  // ✅ 操作函数永远不变
  const dispatch = React.useMemo(
    () => ({
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => c - 1),
    }),
    []
  )

  return (
    <CountStateContext.Provider value={count}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

// ✅ 只显示 count 的组件，count 变化时重新渲染
function CountDisplay() {
  const count = useContext(CountStateContext)
  console.log('CountDisplay 渲染')
  return <div>{count}</div>
}

// ✅ 只使用操作的组件，永远不会重新渲染
function CountButtons() {
  const dispatch = useContext(CountDispatchContext)
  console.log('CountButtons 渲染') // 只渲染一次

  if (!dispatch) return null

  return (
    <div>
      <button onClick={dispatch.increment}>+</button>
      <button onClick={dispatch.decrement}>-</button>
    </div>
  )
}
```

### 4.5. 解决方案 4：使用 React.memo

```typescript
interface TodoContextType {
  todos: Todo[]
  addTodo: (text: string) => void
}

const TodoContext = React.createContext<TodoContextType | undefined>(undefined)

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = React.useState<Todo[]>([])

  const addTodo = React.useCallback((text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }])
  }, [])

  const value = React.useMemo(() => ({ todos, addTodo }), [todos, addTodo])

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

// ✅ 使用 React.memo 防止不必要的重新渲染
const ExpensiveSidebar = React.memo(function ExpensiveSidebar() {
  console.log('Sidebar 渲染') // todos 变化不会导致这里重新渲染

  return (
    <div>
      <h3>侧边栏</h3>
      <p>这是一个昂贵的组件</p>
    </div>
  )
})

function TodoList() {
  const { todos } = useContext(TodoContext)!

  return (
    <div>
      <ExpensiveSidebar />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}
```

## 5. 如何处理多个 Context？

组合使用多个 Context。

### 5.1. 多个 Provider 嵌套

```typescript
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>
            <Main />
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
```

### 5.2. 创建组合 Provider

```typescript
interface ProviderProps {
  children: React.ReactNode
}

function AppProviders({ children }: ProviderProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

function App() {
  return (
    <AppProviders>
      <Main />
    </AppProviders>
  )
}
```

### 5.3. 组合多个 Context 值

```typescript
// 组合多个 Context 的 Hook
function useAppContext() {
  const auth = useAuth()
  const theme = useTheme()
  const language = useLanguage()

  return {
    auth,
    theme,
    language,
  }
}

function Dashboard() {
  const { auth, theme, language } = useAppContext()

  return (
    <div style={{ background: theme.theme === 'light' ? '#fff' : '#333' }}>
      <h1>
        {language.language === 'zh' ? '欢迎' : 'Welcome'}, {auth.user?.name}
      </h1>
    </div>
  )
}
```

### 5.4. 动态 Provider 组合

```typescript
type ProviderComponent = React.ComponentType<{ children: React.ReactNode }>

function composeProviders(...providers: ProviderComponent[]) {
  return ({ children }: { children: React.ReactNode }) => {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    )
  }
}

// 使用
const AllProviders = composeProviders(
  AuthProvider,
  ThemeProvider,
  LanguageProvider,
  NotificationProvider
)

function App() {
  return (
    <AllProviders>
      <Main />
    </AllProviders>
  )
}
```

## 6. useContext 有哪些常见错误？

避免这些常见陷阱。

### 6.1. 错误 1：在 Provider 外使用

```typescript
// ❌ 错误：在 Provider 外使用
function BadComponent() {
  const { user } = useAuth() // 报错：useAuth 必须在 AuthProvider 内使用
  return <div>{user?.name}</div>
}

function App() {
  return <BadComponent /> // ❌ 没有 AuthProvider
}

// ✅ 正确：确保在 Provider 内使用
function App() {
  return (
    <AuthProvider>
      <BadComponent />
    </AuthProvider>
  )
}
```

### 6.2. 错误 2：忘记 useMemo

```typescript
// ❌ 错误：每次渲染创建新对象
function BadProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState(0)

  // ❌ 每次都是新对象
  const value = {
    state,
    setState,
  }

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}

// ✅ 正确：使用 useMemo
function GoodProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState(0)

  // ✅ 只在 state 变化时创建新对象
  const value = React.useMemo(() => ({ state, setState }), [state])

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
```

### 6.3. 错误 3：Context 值过大

```typescript
// ❌ 错误：一个大对象包含所有状态
interface BadContextType {
  user: User;
  posts: Post[];
  comments: Comment[];
  notifications: Notification[];
  settings: Settings;
  // ... 更多状态
}

// 任何一个属性变化，所有消费组件都会重新渲染

// ✅ 正确：拆分成多个小 Context
const UserContext = React.createContext<User | null>(null);
const PostsContext = React.createContext<Post[]>([]);
const CommentsContext = React.createContext<Comment[]>([]);
// ...
```

### 6.4. 错误 4：不必要的 Context

```typescript
// ❌ 错误：本地状态用 Context
function BadParent() {
  const [count, setCount] = React.useState(0)

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <Child />
    </CountContext.Provider>
  )
}

// ✅ 正确：直接传递 props
function GoodParent() {
  const [count, setCount] = React.useState(0)

  return <Child count={count} setCount={setCount} />
}
```

## 7. 如何实现 Context 的最佳实践？

遵循这些模式提高代码质量。

### 7.1. 模式 1：类型安全的 Context

```typescript
import { createContext, useContext, useState, useMemo } from 'react'

interface Settings {
  notifications: boolean
  darkMode: boolean
  language: 'zh' | 'en'
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (updates: Partial<Settings>) => void
}

// ✅ 创建类型安全的 Context
const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

// ✅ 导出自定义 Hook
export function useSettings() {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error('useSettings 必须在 SettingsProvider 内使用')
  }

  return context
}

// ✅ 导出 Provider
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    darkMode: false,
    language: 'zh',
  })

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  const value = useMemo(() => ({ settings, updateSettings }), [settings])

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
```

### 7.2. 模式 2：带持久化的 Context

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
```

### 7.3. 模式 3：带 Reducer 的 Context

```typescript
interface State {
  count: number
  items: string[]
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'addItem'; payload: string }
  | { type: 'removeItem'; payload: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'addItem':
      return { ...state, items: [...state.items, action.payload] }
    case 'removeItem':
      return {
        ...state,
        items: state.items.filter((_, i) => i !== action.payload),
      }
    default:
      return state
  }
}

const StateContext = createContext<State | undefined>(undefined)
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
)

export function useAppState() {
  const context = useContext(StateContext)
  if (!context) throw new Error('useAppState 必须在 Provider 内使用')
  return context
}

export function useAppDispatch() {
  const context = useContext(DispatchContext)
  if (!context) throw new Error('useAppDispatch 必须在 Provider 内使用')
  return context
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    items: [],
  })

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
```

## 8. useContext vs Props vs Redux

| 特性       | Props    | useContext     | Redux          |
| ---------- | -------- | -------------- | -------------- |
| 传递方式   | 逐层传递 | 跨层级访问     | 全局 store     |
| 使用复杂度 | 简单     | 中等           | 复杂           |
| 性能       | 最好     | 中等（需优化） | 好（精确订阅） |
| 适用场景   | 父子组件 | 跨层级共享     | 复杂状态管理   |
| 类型安全   | ✅ 优秀  | ✅ 良好        | ✅ 良好        |
| DevTools   | ❌ 无    | ❌ 无          | ✅ 有          |
| 中间件     | ❌ 无    | ❌ 无          | ✅ 有          |
| 时间旅行   | ❌ 无    | ❌ 无          | ✅ 有          |
| 学习成本   | 低       | 低             | 高             |

### 8.1. 选择指南

```typescript
// 1. 使用 Props：父子组件或层级较浅
function Parent() {
  const [data, setData] = useState('data')
  return <Child data={data} />
}

// 2. 使用 Context：跨层级共享，不常变化的数据
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Main />
      </LanguageProvider>
    </ThemeProvider>
  )
}

// 3. 使用 Redux：复杂状态管理，需要 DevTools
const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
})
```

## 9. 引用

- [useContext Hook 官方文档][1]
- [Context API 深入指南][2]
- [Context 性能优化][3]
- [何时使用 Context][4]

[1]: https://react.dev/reference/react/useContext
[2]: https://react.dev/learn/passing-data-deeply-with-context
[3]: https://react.dev/reference/react/memo
[4]: https://kentcdodds.com/blog/application-state-management-with-react
