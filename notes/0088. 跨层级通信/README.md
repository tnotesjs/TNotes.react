# [0088. 跨层级通信](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0088.%20%E8%B7%A8%E5%B1%82%E7%BA%A7%E9%80%9A%E4%BF%A1)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 什么是跨层级通信？](#3-什么是跨层级通信)
  - [3.1. Props Drilling 问题](#31-props-drilling-问题)
  - [3.2. 跨层级通信的场景](#32-跨层级通信的场景)
- [4. 使用 Context 实现跨层级通信？](#4-使用-context-实现跨层级通信)
  - [4.1. 基本用法](#41-基本用法)
  - [4.2. 实战示例：主题切换](#42-实战示例主题切换)
  - [4.3. 实战示例：国际化](#43-实战示例国际化)
- [5. 如何优化 Context 性能？](#5-如何优化-context-性能)
  - [5.1. 问题：Context 导致不必要的重渲染](#51-问题context-导致不必要的重渲染)
  - [5.2. 优化 1：拆分 Context](#52-优化-1拆分-context)
  - [5.3. 优化 2：使用 useMemo](#53-优化-2使用-usememo)
  - [5.4. 优化 3：组件组合](#54-优化-3组件组合)
- [6. 多个 Context 如何组合使用？](#6-多个-context-如何组合使用)
  - [6.1. 方式 1：嵌套 Provider](#61-方式-1嵌套-provider)
  - [6.2. 方式 2：组合 Provider](#62-方式-2组合-provider)
  - [6.3. 方式 3：统一管理](#63-方式-3统一管理)
- [7. 跨层级通信的常见错误？](#7-跨层级通信的常见错误)
  - [7.1. 错误 1：忘记提供 Provider](#71-错误-1忘记提供-provider)
  - [7.2. 错误 2：在 Provider 中直接传递对象](#72-错误-2在-provider-中直接传递对象)
  - [7.3. 错误 3：过度使用 Context](#73-错误-3过度使用-context)
  - [7.4. 错误 4：Context 值频繁变化](#74-错误-4context-值频繁变化)
- [8. Context vs Props Drilling](#8-context-vs-props-drilling)
  - [8.1. 对比表格](#81-对比表格)
  - [8.2. 何时使用 Context](#82-何时使用-context)
  - [8.3. 推荐实践](#83-推荐实践)
- [9. 引用](#9-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 跨层级通信的概念和场景
- Context API 的使用方法
- Context 性能优化技巧
- 多个 Context 的组合
- 常见错误和解决方案

## 2. 评价

跨层级通信解决了 props 逐层传递的问题，Context 是 React 官方提供的解决方案。

- Context 适合传递不经常变化的全局数据
- 使用 Context 会增加组件耦合度，需谨慎使用
- 频繁变化的数据建议使用状态管理库
- Context 配合 useMemo 可以有效避免不必要的重渲染
- 优先考虑组件组合，避免过度使用 Context

## 3. 什么是跨层级通信？

### 3.1. Props Drilling 问题

```jsx
// ❌ Props 逐层传递（Props Drilling）
function App() {
  const [user, setUser] = useState({ name: '张三' })

  return <Level1 user={user} setUser={setUser} />
}

function Level1({ user, setUser }) {
  return <Level2 user={user} setUser={setUser} />
}

function Level2({ user, setUser }) {
  return <Level3 user={user} setUser={setUser} />
}

function Level3({ user, setUser }) {
  return <Level4 user={user} setUser={setUser} />
}

function Level4({ user, setUser }) {
  // 真正使用 user 的组件
  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => setUser({ name: '李四' })}>更新</button>
    </div>
  )
}
```

### 3.2. 跨层级通信的场景

```jsx
// 常见的跨层级数据
// 1. 主题配置
const theme = { mode: 'dark', primaryColor: '#1890ff' }

// 2. 用户信息
const user = { id: 1, name: '张三', role: 'admin' }

// 3. 语言设置
const locale = 'zh-CN'

// 4. 认证状态
const auth = { isAuthenticated: true, token: 'xxx' }
```

## 4. 使用 Context 实现跨层级通信？

### 4.1. 基本用法

```jsx
import { createContext, useContext, useState } from 'react'

// 1. 创建 Context
const UserContext = createContext()

// 2. 提供 Provider
function App() {
  const [user, setUser] = useState({ name: '张三' })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Level1 />
    </UserContext.Provider>
  )
}

function Level1() {
  return <Level2 />
}

function Level2() {
  return <Level3 />
}

// 3. 使用 Context
function Level3() {
  const { user, setUser } = useContext(UserContext)

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => setUser({ name: '李四' })}>更新</button>
    </div>
  )
}
```

### 4.2. 实战示例：主题切换

```jsx
const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const value = {
    theme,
    toggleTheme,
    colors:
      theme === 'light'
        ? { bg: '#fff', text: '#000' }
        : { bg: '#000', text: '#fff' },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// 自定义 Hook
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
      <Footer />
    </ThemeProvider>
  )
}

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header>
      <button onClick={toggleTheme}>
        切换到 {theme === 'light' ? '暗色' : '亮色'}
      </button>
    </header>
  )
}

function Content() {
  const { colors } = useTheme()

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text }}>
      内容区域
    </div>
  )
}
```

### 4.3. 实战示例：国际化

```jsx
const LocaleContext = createContext()

const translations = {
  'zh-CN': {
    welcome: '欢迎',
    logout: '退出',
  },
  'en-US': {
    welcome: 'Welcome',
    logout: 'Logout',
  },
}

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('zh-CN')

  const t = (key) => translations[locale][key] || key

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

function useLocale() {
  return useContext(LocaleContext)
}

function Greeting() {
  const { t } = useLocale()
  return <h1>{t('welcome')}</h1>
}

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      <option value="zh-CN">中文</option>
      <option value="en-US">English</option>
    </select>
  )
}
```

## 5. 如何优化 Context 性能？

### 5.1. 问题：Context 导致不必要的重渲染

```jsx
// ❌ 每次 count 变化，所有消费者都会重渲染
function BadProvider({ children }) {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: '张三' })

  return (
    <Context.Provider value={{ count, setCount, user, setUser }}>
      {children}
    </Context.Provider>
  )
}

// 即使只用了 user，count 变化时也会重渲染
function UserDisplay() {
  const { user } = useContext(Context)
  console.log('UserDisplay 渲染')
  return <div>{user.name}</div>
}
```

### 5.2. 优化 1：拆分 Context

```jsx
// ✅ 按职责拆分 Context
const CountContext = createContext()
const UserContext = createContext()

function Providers({ children }) {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: '张三' })

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </CountContext.Provider>
  )
}

// 只订阅需要的 Context
function UserDisplay() {
  const { user } = useContext(UserContext)
  // count 变化时不会重渲染
  return <div>{user.name}</div>
}
```

### 5.3. 优化 2：使用 useMemo

```jsx
function OptimizedProvider({ children }) {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: '张三' })

  // ✅ 缓存 value 对象
  const countValue = useMemo(() => ({ count, setCount }), [count])
  const userValue = useMemo(() => ({ user, setUser }), [user])

  return (
    <CountContext.Provider value={countValue}>
      <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
    </CountContext.Provider>
  )
}
```

### 5.4. 优化 3：组件组合

```jsx
// ✅ 使用组件组合替代 Context
function Layout({ header, sidebar, content }) {
  return (
    <div>
      <div className="header">{header}</div>
      <div className="container">
        <div className="sidebar">{sidebar}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState({ name: '张三' })

  return (
    <Layout
      header={<Header user={user} />}
      sidebar={<Sidebar user={user} />}
      content={<Content user={user} onUpdateUser={setUser} />}
    />
  )
}
```

## 6. 多个 Context 如何组合使用？

### 6.1. 方式 1：嵌套 Provider

```jsx
function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <RouterProvider>
            <Main />
          </RouterProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
```

### 6.2. 方式 2：组合 Provider

```jsx
function combineProviders(...providers) {
  return providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) => {
      return ({ children }) => (
        <AccumulatedProviders>
          <Provider {...props}>{children}</Provider>
        </AccumulatedProviders>
      )
    },
    ({ children }) => <>{children}</>,
  )
}

const AppProviders = combineProviders(
  [ThemeProvider],
  [LocaleProvider],
  [AuthProvider],
)

function App() {
  return (
    <AppProviders>
      <Main />
    </AppProviders>
  )
}
```

### 6.3. 方式 3：统一管理

```jsx
function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>{children}</AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}

function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  )
}

// 使用多个 Context
function Component() {
  const { theme } = useTheme()
  const { t } = useLocale()
  const { user } = useAuth()

  return (
    <div>
      {t('welcome')}, {user.name}
    </div>
  )
}
```

## 7. 跨层级通信的常见错误？

### 7.1. 错误 1：忘记提供 Provider

```jsx
const MyContext = createContext()

// ❌ 没有 Provider，useContext 返回 undefined
function App() {
  return <Child />
}

function Child() {
  const value = useContext(MyContext)
  console.log(value) // undefined
  return <div>{value?.text}</div> // 可能报错
}

// ✅ 正确：提供 Provider
function App() {
  return (
    <MyContext.Provider value={{ text: 'Hello' }}>
      <Child />
    </MyContext.Provider>
  )
}
```

### 7.2. 错误 2：在 Provider 中直接传递对象

```jsx
// ❌ 每次渲染都创建新对象
function BadProvider({ children }) {
  const [count, setCount] = useState(0)

  return (
    <Context.Provider value={{ count, setCount }}>{children}</Context.Provider>
  )
}

// ✅ 使用 useMemo
function GoodProvider({ children }) {
  const [count, setCount] = useState(0)

  const value = useMemo(() => ({ count, setCount }), [count])

  return <Context.Provider value={value}>{children}</Context.Provider>
}
```

### 7.3. 错误 3：过度使用 Context

```jsx
// ❌ 所有状态都放 Context
const AppContext = createContext()

function AppProvider({ children }) {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [theme, setTheme] = useState('light')
  // ... 更多状态

  return (
    <AppContext.Provider
      value={
        {
          /* 所有状态 */
        }
      }
    >
      {children}
    </AppContext.Provider>
  )
}

// ✅ 按需拆分
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ShoppingProvider>
          <Main />
        </ShoppingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
```

### 7.4. 错误 4：Context 值频繁变化

```jsx
// ❌ Context 用于频繁变化的数据
function BadProvider({ children }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return <Context.Provider value={mousePos}>{children}</Context.Provider>
}

// ✅ 使用状态管理库或 useRef
function GoodComponent() {
  const mousePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
}
```

## 8. Context vs Props Drilling

### 8.1. 对比表格

| 特性     | Props Drilling | Context  |
| -------- | -------------- | -------- |
| 代码量   | 多（逐层传递） | 少       |
| 组件耦合 | 低             | 高       |
| 可维护性 | 中间层修改困难 | 容易维护 |
| 性能     | 好             | 需要优化 |
| 数据流向 | 清晰           | 不够直观 |
| 适用场景 | 层级少         | 层级深   |

### 8.2. 何时使用 Context

::: code-group

```jsx [❌ 不需要 Context]
// 层级少，直接传递
function App() {
  const [theme, setTheme] = useState('light')

  return (
    <Layout theme={theme}>
      <Content theme={theme} />
    </Layout>
  )
}
```

```jsx [✅ 需要 Context]
// 层级深，多处使用
function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Sidebar>
          <Menu>
            <MenuItem /> {/* 需要 theme */}
          </Menu>
        </Sidebar>
        <Content>
          <Article>
            <Paragraph /> {/* 需要 theme */}
          </Article>
        </Content>
      </Layout>
    </ThemeProvider>
  )
}
```

:::

### 8.3. 推荐实践

```jsx
// 1. 全局配置：使用 Context
<ThemeProvider>
<LocaleProvider>

// 2. 业务数据：使用状态管理库
const user = useSelector(state => state.user)

// 3. 局部状态：Props 传递
<Parent>
  <Child data={localData} />
</Parent>

// 4. 组件组合：避免传递
<Layout header={<Header user={user} />} />
```

## 9. 引用

- [React 官方文档 - Context][1]
- [React 官方文档 - useContext][2]
- [深入理解 React Context][3]

[1]: https://react.dev/learn/passing-data-deeply-with-context
[2]: https://react.dev/reference/react/useContext
[3]: https://react.dev/reference/react/createContext
