# [0165. 复杂 State 管理策略](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0165.%20%E5%A4%8D%E6%9D%82%20State%20%E7%AE%A1%E7%90%86%E7%AD%96%E7%95%A5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 如何拆分复杂 State？](#3-如何拆分复杂-state)
  - [3.1. 按独立性拆分](#31-按独立性拆分)
  - [3.2. 按功能模块拆分](#32-按功能模块拆分)
  - [3.3. 使用自定义 Hook 拆分](#33-使用自定义-hook-拆分)
- [4. 如何组织关联 State？](#4-如何组织关联-state)
  - [4.1. 使用对象组合相关状态](#41-使用对象组合相关状态)
  - [4.2. 使用 useReducer 管理复杂状态](#42-使用-usereducer-管理复杂状态)
  - [4.3. 状态机模式](#43-状态机模式)
- [5. 如何处理派生 State？](#5-如何处理派生-state)
  - [5.1. 直接计算派生值](#51-直接计算派生值)
  - [5.2. 使用 useMemo 优化计算](#52-使用-usememo-优化计算)
  - [5.3. 避免派生状态陷阱](#53-避免派生状态陷阱)
- [6. 如何管理表单 State？](#6-如何管理表单-state)
  - [6.1. 单个状态对象](#61-单个状态对象)
  - [6.2. 使用 useReducer 管理表单](#62-使用-usereducer-管理表单)
  - [6.3. 使用表单库](#63-使用表单库)
- [7. 如何优化复杂 State 性能？](#7-如何优化复杂-state-性能)
  - [7.1. 使用 React.memo 避免重渲染](#71-使用-reactmemo-避免重渲染)
  - [7.2. 拆分状态避免级联更新](#72-拆分状态避免级联更新)
  - [7.3. 使用 Context 分层](#73-使用-context-分层)
  - [7.4. 懒加载和代码分割](#74-懒加载和代码分割)
  - [7.5. 使用虚拟化处理大列表](#75-使用虚拟化处理大列表)
- [8. 引用](#8-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 复杂 State 的拆分原则
- 关联 State 的组织方式
- 派生 State 的处理方法
- 表单 State 管理策略
- 复杂 State 的性能优化

## 2. 评价

管理复杂状态是 React 开发中的常见挑战，选对策略能让代码更清晰易维护。

- 独立状态分开管理，相关状态组合管理
- 优先使用派生值而不是存储重复状态
- 表单状态可使用专门的库来简化管理
- useReducer 适合有复杂状态转换逻辑的场景
- 合理拆分和组织状态能显著提升代码质量和性能

## 3. 如何拆分复杂 State？

### 3.1. 按独立性拆分

::: code-group

```jsx [❌ 全部放一起]
function Dashboard() {
  // ❌ 不相关的状态混在一起
  const [state, setState] = useState({
    user: null,
    theme: 'light',
    notifications: [],
    sidebarOpen: false,
    modalVisible: false,
    searchQuery: '',
    loading: false,
  })

  // 更新任何一个都要展开整个对象
  const toggleSidebar = () => {
    setState({ ...state, sidebarOpen: !state.sidebarOpen })
  }
}
```

```jsx [✅ 按独立性拆分]
function Dashboard() {
  // ✅ 独立的状态分开管理
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  // 更新简单直接
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
}
```

:::

### 3.2. 按功能模块拆分

```jsx
function ComplexForm() {
  // ✅ 按功能模块组织
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [addressInfo, setAddressInfo] = useState({
    country: '',
    city: '',
    street: '',
    zipCode: '',
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    submitted: false,
  })

  return <form>...</form>
}
```

### 3.3. 使用自定义 Hook 拆分

```jsx
// 将相关逻辑封装到自定义 Hook
function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (credentials) => {
    setLoading(true)
    try {
      const user = await authAPI.login(credentials)
      setUser(user)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return { user, loading, error, login, logout }
}

function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  return { notifications, unreadCount, markAsRead }
}

// ✅ 使用自定义 Hook
function App() {
  const auth = useAuth()
  const notifications = useNotifications()

  return (
    <div>
      {auth.user && <p>欢迎，{auth.user.name}</p>}
      <NotificationBadge count={notifications.unreadCount} />
    </div>
  )
}
```

## 4. 如何组织关联 State？

### 4.1. 使用对象组合相关状态

::: code-group

```jsx [❌ 分散管理]
function DataFetcher() {
  // ❌ 相关状态分散
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 需要同时更新多个状态
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetch('/api/data')
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
}
```

```jsx [✅ 组合管理]
function DataFetcher() {
  // ✅ 相关状态组合在一起
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = async () => {
    setState({ data: null, loading: true, error: null })
    try {
      const result = await fetch('/api/data')
      setState({ data: result, loading: false, error: null })
    } catch (err) {
      setState({ data: null, loading: false, error: err })
    }
  }
}
```

:::

### 4.2. 使用 useReducer 管理复杂状态

```jsx
const initialState = {
  data: null,
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.append
          ? [...(state.data || []), ...action.payload]
          : action.payload,
        page: action.append ? state.page + 1 : state.page,
        hasMore: action.payload.length > 0,
      }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function InfiniteList() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loadMore = async () => {
    dispatch({ type: 'FETCH_START' })
    try {
      const data = await fetchData(state.page)
      dispatch({ type: 'FETCH_SUCCESS', payload: data, append: true })
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error })
    }
  }

  return <div>...</div>
}
```

### 4.3. 状态机模式

```jsx
const STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

function StateMachine() {
  const [state, setState] = useState({
    status: STATES.IDLE,
    data: null,
    error: null,
  })

  const fetchData = async () => {
    setState({ status: STATES.LOADING, data: null, error: null })

    try {
      const data = await fetch('/api/data')
      setState({ status: STATES.SUCCESS, data, error: null })
    } catch (error) {
      setState({ status: STATES.ERROR, data: null, error })
    }
  }

  // 根据状态渲染
  switch (state.status) {
    case STATES.IDLE:
      return <button onClick={fetchData}>加载数据</button>
    case STATES.LOADING:
      return <div>加载中...</div>
    case STATES.SUCCESS:
      return <div>数据：{state.data}</div>
    case STATES.ERROR:
      return <div>错误：{state.error.message}</div>
  }
}
```

## 5. 如何处理派生 State？

### 5.1. 直接计算派生值

::: code-group

```jsx [❌ 存储派生状态]
function TodoList() {
  const [todos, setTodos] = useState([])
  // ❌ 存储了派生值
  const [completedCount, setCompletedCount] = useState(0)
  const [activeCount, setActiveCount] = useState(0)

  const addTodo = (text) => {
    const newTodos = [...todos, { text, done: false }]
    setTodos(newTodos)
    // ❌ 需要手动同步
    setActiveCount(activeCount + 1)
  }

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo,
    )
    setTodos(newTodos)
    // ❌ 需要重新计算
    setCompletedCount(newTodos.filter((t) => t.done).length)
    setActiveCount(newTodos.filter((t) => !t.done).length)
  }
}
```

```jsx [✅ 直接计算]
function TodoList() {
  const [todos, setTodos] = useState([])

  // ✅ 每次渲染时计算
  const completedCount = todos.filter((t) => t.done).length
  const activeCount = todos.filter((t) => !t.done).length

  const addTodo = (text) => {
    setTodos([...todos, { text, done: false }])
    // ✅ 不需要手动同步
  }

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo,
      ),
    )
    // ✅ 自动更新
  }
}
```

:::

### 5.2. 使用 useMemo 优化计算

```jsx
function ExpensiveCalculation() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('')

  // ✅ 使用 useMemo 缓存昂贵的计算
  const filteredItems = useMemo(() => {
    console.log('计算过滤结果')
    return items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }, [items, filter])

  const sortedItems = useMemo(() => {
    console.log('计算排序结果')
    return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name))
  }, [filteredItems])

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {sortedItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

### 5.3. 避免派生状态陷阱

```jsx
// ❌ 从 props 派生状态（错误）
function BadExample({ items }) {
  // ❌ props 变化时不会更新
  const [filteredItems, setFilteredItems] = useState(
    items.filter((item) => item.active),
  )

  return <div>{filteredItems.length}</div>
}

// ✅ 直接使用 props 计算（正确）
function GoodExample({ items }) {
  // ✅ props 变化时自动更新
  const filteredItems = items.filter((item) => item.active)

  return <div>{filteredItems.length}</div>
}

// ✅ 需要本地状态时使用 key（正确）
function GoodExampleWithKey({ userId, initialData }) {
  const [data, setData] = useState(initialData)

  // 使用 key 强制重新创建组件
  return <div>{data}</div>
}

// 使用时
;<GoodExampleWithKey key={userId} userId={userId} initialData={data} />
```

## 6. 如何管理表单 State？

### 6.1. 单个状态对象

```jsx
function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    await submitForm(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      {errors.username && <span>{errors.username}</span>}

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <span>{errors.password}</span>}

      <button type="submit">登录</button>
    </form>
  )
}
```

### 6.2. 使用 useReducer 管理表单

```jsx
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        touched: { ...state.touched, [action.field]: true },
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      }
    case 'SET_SUBMITTING':
      return { ...state, submitting: action.value }
    case 'RESET':
      return action.initialState
    default:
      return state
  }
}

function RegistrationForm() {
  const initialState = {
    values: { email: '', password: '', confirmPassword: '' },
    errors: {},
    touched: {},
    submitting: false,
  }

  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  const handleBlur = (field) => {
    const error = validateField(field, state.values[field])
    if (error) {
      dispatch({ type: 'SET_ERROR', field, error })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'SET_SUBMITTING', value: true })
    try {
      await register(state.values)
    } finally {
      dispatch({ type: 'SET_SUBMITTING', value: false })
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### 6.3. 使用表单库

```jsx
import { useForm } from 'react-hook-form'

function FormWithLibrary() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      age: 0,
    },
  })

  const onSubmit = async (data) => {
    await submitForm(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('username', {
          required: '用户名必填',
          minLength: { value: 3, message: '至少3个字符' },
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}

      <input
        {...register('email', {
          required: '邮箱必填',
          pattern: { value: /^\S+@\S+$/i, message: '邮箱格式不正确' },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        提交
      </button>
    </form>
  )
}
```

## 7. 如何优化复杂 State 性能？

### 7.1. 使用 React.memo 避免重渲染

```jsx
// ✅ 使用 memo 优化子组件
const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  console.log('TodoItem 渲染:', todo.id)

  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={() => onToggle(todo.id)}>切换</button>
      <button onClick={() => onDelete(todo.id)}>删除</button>
    </div>
  )
})

function TodoList() {
  const [todos, setTodos] = useState([])

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  )
}
```

### 7.2. 拆分状态避免级联更新

::: code-group

```jsx [❌ 状态耦合]
function BadApp() {
  // ❌ 所有状态在一起
  const [state, setState] = useState({
    user: null,
    posts: [],
    comments: [],
    notifications: [],
  })

  // 更新任何一个都会导致整个组件重渲染
  const updateUser = (user) => {
    setState({ ...state, user })
  }
}
```

```jsx [✅ 状态独立]
function GoodApp() {
  // ✅ 独立的状态
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [notifications, setNotifications] = useState([])

  // 只更新需要的部分
  const updateUser = (user) => {
    setUser(user) // 只触发依赖 user 的组件重渲染
  }
}
```

:::

### 7.3. 使用 Context 分层

```jsx
// ✅ 将不常变化的和频繁变化的数据分离
const UserContext = createContext()
const ThemeContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')

  // user 不常变化，单独的 context
  // theme 频繁变化，单独的 context
  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Dashboard />
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}

// 组件只订阅需要的 context
function UserProfile() {
  const user = useContext(UserContext)
  // 不会因为 theme 变化而重渲染
  return <div>{user?.name}</div>
}
```

### 7.4. 懒加载和代码分割

```jsx
import { lazy, Suspense } from 'react'

// ✅ 懒加载大型状态管理组件
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  const [showHeavy, setShowHeavy] = useState(false)

  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>显示复杂组件</button>

      {showHeavy && (
        <Suspense fallback={<div>加载中...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  )
}
```

### 7.5. 使用虚拟化处理大列表

```jsx
import { FixedSizeList } from 'react-window'

function LargeList() {
  const [items] = useState(
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      text: `项目 ${i}`,
    })),
  )

  // ✅ 只渲染可见的项
  const Row = ({ index, style }) => <div style={style}>{items[index].text}</div>

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}
```

## 8. 引用

- [React 官方文档 - 状态管理][1]
- [React 官方文档 - 选择状态结构][2]
- [React Hook Form 文档][3]

[1]: https://react.dev/learn/managing-state
[2]: https://react.dev/learn/choosing-the-state-structure
[3]: https://react-hook-form.com/
