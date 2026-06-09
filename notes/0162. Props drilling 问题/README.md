# [0162. Props drilling 问题](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0162.%20Props%20drilling%20%E9%97%AE%E9%A2%98)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 什么是 Props Drilling？](#3-什么是-props-drilling)
  - [3.1. 基本示例](#31-基本示例)
  - [3.2. 更复杂的场景](#32-更复杂的场景)
- [4. Props Drilling 有什么问题？](#4-props-drilling-有什么问题)
  - [4.1. 问题 1：代码冗余](#41-问题-1代码冗余)
  - [4.2. 问题 2：难以维护](#42-问题-2难以维护)
  - [4.3. 问题 3：组件耦合](#43-问题-3组件耦合)
  - [4.4. 问题 4：重构困难](#44-问题-4重构困难)
- [5. 如何解决 Props Drilling？](#5-如何解决-props-drilling)
  - [5.1. 方案 1：使用 Context API](#51-方案-1使用-context-api)
  - [5.2. 方案 2：组件组合](#52-方案-2组件组合)
  - [5.3. 方案 3：使用状态管理库](#53-方案-3使用状态管理库)
  - [5.4. 方案 4：自定义 Hooks](#54-方案-4自定义-hooks)
  - [5.5. 方案 5：Render Props](#55-方案-5render-props)
  - [5.6. 综合示例：解决复杂场景](#56-综合示例解决复杂场景)
- [6. 不同解决方案如何选择？](#6-不同解决方案如何选择)
  - [6.1. 选择决策表](#61-选择决策表)
  - [6.2. 方案对比](#62-方案对比)
  - [6.3. 实践建议](#63-实践建议)
- [7. 引用](#7-引用)

<!-- endregion:toc -->

## 1. 本节内容

- Props Drilling 的定义
- Props Drilling 的问题
- 多种解决方案
- 解决方案的选择策略

## 2. 评价

Props Drilling 是 React 开发中常见的问题，指的是通过多层组件传递 props。

- Props Drilling 会导致代码冗余，中间组件被迫接收不需要的 props
- 过深的传递链条会降低代码的可维护性和可读性
- Context、状态管理库、组合模式等都可以解决这个问题
- 选择合适的解决方案需要根据实际场景权衡

## 3. 什么是 Props Drilling？

### 3.1. 基本示例

```jsx
// ❌ Props Drilling：user 需要传递 3 层
function App() {
  const [user, setUser] = useState({ name: '张三', role: 'admin' })

  return <Dashboard user={user} />
}

function Dashboard({ user }) {
  // Dashboard 不使用 user，只是传递
  return (
    <div>
      <Sidebar user={user} />
    </div>
  )
}

function Sidebar({ user }) {
  // Sidebar 也不使用 user，继续传递
  return (
    <div>
      <UserMenu user={user} />
    </div>
  )
}

function UserMenu({ user }) {
  // 只有这里才真正使用 user
  return <div>欢迎，{user.name}</div>
}
```

### 3.2. 更复杂的场景

```jsx
// ❌ 多个 props 需要深层传递
function App() {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('zh')
  const [user, setUser] = useState(null)

  return (
    <Layout
      theme={theme}
      language={language}
      user={user}
      onThemeChange={setTheme}
      onLanguageChange={setLanguage}
    />
  )
}

function Layout({ theme, language, user, onThemeChange, onLanguageChange }) {
  return (
    <div className={`theme-${theme}`}>
      <Header
        theme={theme}
        language={language}
        user={user}
        onThemeChange={onThemeChange}
        onLanguageChange={onLanguageChange}
      />
      <Content user={user} />
    </div>
  )
}

function Header({ theme, language, user, onThemeChange, onLanguageChange }) {
  return (
    <header>
      <Logo />
      <Navigation
        theme={theme}
        language={language}
        user={user}
        onThemeChange={onThemeChange}
        onLanguageChange={onLanguageChange}
      />
    </header>
  )
}

// 继续向下传递...
```

## 4. Props Drilling 有什么问题？

### 4.1. 问题 1：代码冗余

```jsx
// ❌ 中间组件被迫接收和传递不需要的 props
function MiddleComponent({
  propA,  // 不需要
  propB,  // 不需要
  propC,  // 不需要
  ...其他 20 个 props
}) {
  return (
    <DeepComponent
      propA={propA}
      propB={propB}
      propC={propC}
      // 重复传递所有 props
    />
  )
}
```

### 4.2. 问题 2：难以维护

```jsx
// ❌ 添加新 prop 需要修改每一层
function App() {
  const [newProp, setNewProp] = useState('value')

  // 需要添加到这里
  return <Level1 newProp={newProp} />
}

function Level1({ newProp }) {
  // 需要添加到这里
  return <Level2 newProp={newProp} />
}

function Level2({ newProp }) {
  // 需要添加到这里
  return <Level3 newProp={newProp} />
}

function Level3({ newProp }) {
  // 终于可以使用了
  return <div>{newProp}</div>
}
```

### 4.3. 问题 3：组件耦合

```jsx
// ❌ 中间组件与不相关的 props 产生耦合
function Sidebar({ userSettings }) {
  // Sidebar 本身不关心 userSettings
  // 但必须知道它的存在并传递下去
  return (
    <nav>
      <Menu />
      <UserPanel userSettings={userSettings} />
    </nav>
  )
}
```

### 4.4. 问题 4：重构困难

```jsx
// ❌ 调整组件结构需要大量修改
// 如果要将 UserMenu 移到其他位置
// 需要重新建立整个传递链条

// 原来的位置
App → Dashboard → Sidebar → UserMenu

// 移动后
App → Header → TopBar → UserMenu
// 需要修改所有中间组件
```

## 5. 如何解决 Props Drilling？

### 5.1. 方案 1：使用 Context API

```jsx
// ✅ 使用 Context 避免逐层传递
import { createContext, useContext } from 'react'

const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState({ name: '张三', role: 'admin' })

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  )
}

function Dashboard() {
  // 不需要接收和传递 user
  return <Sidebar />
}

function Sidebar() {
  // 也不需要接收和传递
  return <UserMenu />
}

function UserMenu() {
  // ✅ 直接从 Context 获取
  const user = useContext(UserContext)
  return <div>欢迎，{user.name}</div>
}
```

### 5.2. 方案 2：组件组合

```jsx
// ✅ 通过组合避免传递
function App() {
  const [user, setUser] = useState({ name: '张三' })

  return (
    <Dashboard>
      <Sidebar>
        {/* ✅ 直接在顶层组合，不需要传递 */}
        <UserMenu user={user} />
      </Sidebar>
    </Dashboard>
  )
}

function Dashboard({ children }) {
  return <div className="dashboard">{children}</div>
}

function Sidebar({ children }) {
  return <aside className="sidebar">{children}</aside>
}

function UserMenu({ user }) {
  return <div>欢迎，{user.name}</div>
}
```

### 5.3. 方案 3：使用状态管理库

```jsx
// ✅ 使用 Redux/Zustand 等全局状态
import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

function App() {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    setUser({ name: '张三', role: 'admin' })
  }, [])

  return <Dashboard />
}

function UserMenu() {
  // ✅ 直接从 store 获取
  const user = useUserStore((state) => state.user)
  return <div>欢迎，{user?.name}</div>
}
```

### 5.4. 方案 4：自定义 Hooks

```jsx
// ✅ 封装数据获取逻辑
function useUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 从 API 或其他地方获取
    fetchUser().then(setUser)
  }, [])

  return user
}

function App() {
  return <Dashboard />
}

function UserMenu() {
  // ✅ 每个需要的地方直接调用 hook
  const user = useUser()
  return <div>欢迎，{user?.name}</div>
}
```

### 5.5. 方案 5：Render Props

```jsx
// ✅ 使用 render props 模式
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: '张三' })

  return children(user)
}

function App() {
  return (
    <UserProvider>
      {(user) => (
        <Dashboard>
          <Sidebar>
            <UserMenu user={user} />
          </Sidebar>
        </Dashboard>
      )}
    </UserProvider>
  )
}
```

### 5.6. 综合示例：解决复杂场景

::: code-group

```jsx [❌ Props Drilling]
function App() {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  return <Layout theme={theme} user={user} onThemeChange={setTheme} />
}

function Layout({ theme, user, onThemeChange }) {
  return (
    <div className={`theme-${theme}`}>
      <Header theme={theme} user={user} onThemeChange={onThemeChange} />
      <Main user={user} />
    </div>
  )
}

function Header({ theme, user, onThemeChange }) {
  return (
    <header>
      <Nav theme={theme} user={user} />
      <ThemeToggle theme={theme} onChange={onThemeChange} />
    </header>
  )
}
```

```jsx [✅ 使用 Context]
const ThemeContext = createContext()
const UserContext = createContext()

function App() {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={user}>
        <Layout />
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

function Layout() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`theme-${theme}`}>
      <Header />
      <Main />
    </div>
  )
}

function Header() {
  return (
    <header>
      <Nav />
      <ThemeToggle />
    </header>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      切换主题
    </button>
  )
}

function Nav() {
  const user = useContext(UserContext)
  return <nav>欢迎，{user?.name}</nav>
}
```

:::

## 6. 不同解决方案如何选择？

### 6.1. 选择决策表

| 场景           | 推荐方案           | 原因                         |
| -------------- | ------------------ | ---------------------------- |
| 全局主题、语言 | Context            | 数据相对稳定，组件树广泛使用 |
| 用户认证信息   | Context 或状态管理 | 整个应用都需要访问           |
| 复杂业务状态   | 状态管理库         | 需要复杂的状态逻辑           |
| 布局组件       | 组件组合           | 结构性组件，适合组合         |
| 数据获取       | 自定义 Hooks       | 逻辑复用，各组件独立获取     |
| 2-3 层传递     | 直接传递 props     | 层级不深，保持简单           |

### 6.2. 方案对比

::: code-group

```jsx [Context - 适合全局配置]
// ✅ 主题、语言等全局配置
const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <DeepComponent />
    </ThemeContext.Provider>
  )
}

function DeepComponent() {
  const theme = useContext(ThemeContext)
  return <div className={`theme-${theme}`}>内容</div>
}
```

```jsx [状态管理 - 适合复杂状态]
// ✅ 复杂业务逻辑
const useStore = create((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text }],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}))

function TodoList() {
  const todos = useStore((state) => state.todos)
  const removeTodo = useStore((state) => state.removeTodo)

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>删除</button>
        </li>
      ))}
    </ul>
  )
}
```

```jsx [组合 - 适合布局]
// ✅ 布局和结构性组件
function App() {
  const user = useUser()

  return (
    <Layout
      header={<Header user={user} />}
      sidebar={<Sidebar />}
      content={<Content />}
    />
  )
}

function Layout({ header, sidebar, content }) {
  return (
    <div className="layout">
      {header}
      <div className="main">
        {sidebar}
        {content}
      </div>
    </div>
  )
}
```

```jsx [Hooks - 适合数据获取]
// ✅ 独立的数据获取逻辑
function useUser(userId) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId])

  return user
}

function UserProfile({ userId }) {
  const user = useUser(userId)

  if (!user) return <Loading />
  return <div>{user.name}</div>
}
```

:::

### 6.3. 实践建议

```jsx
// ✅ 混合使用不同方案
function App() {
  // Context：全局配置
  const [theme, setTheme] = useState('light')

  // 状态管理：业务数据
  const todos = useStore((state) => state.todos)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* 组合：布局结构 */}
      <Layout
        header={<Header />}
        content={
          // 直接传递：层级浅
          <TodoList todos={todos} />
        }
      />
    </ThemeContext.Provider>
  )
}
```

## 7. 引用

- [React 官方文档 - Context][1]
- [React 官方文档 - 组件组合][2]
- [Kent C. Dodds - Props Drilling][3]

[1]: https://react.dev/learn/passing-data-deeply-with-context
[2]: https://react.dev/learn/passing-props-to-a-component
[3]: https://kentcdodds.com/blog/prop-drilling
