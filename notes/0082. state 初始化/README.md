# [0082. state 初始化](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0082.%20state%20%E5%88%9D%E5%A7%8B%E5%8C%96)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 如何初始化 State？](#3--如何初始化-state)
  - [3.1. 函数组件：useState](#31-函数组件usestate)
  - [3.2. 类组件：构造函数](#32-类组件构造函数)
  - [3.3. 从 Props 初始化](#33-从-props-初始化)
  - [3.4. 从 localStorage 初始化](#34-从-localstorage-初始化)
- [4. 🤔 什么是惰性初始化？](#4--什么是惰性初始化)
  - [4.1. 基本概念](#41-基本概念)
  - [4.2. 实际应用场景](#42-实际应用场景)
  - [4.3. 性能对比](#43-性能对比)
- [5. 🤔 如何初始化复杂 State？](#5--如何初始化复杂-state)
  - [5.1. 使用对象](#51-使用对象)
  - [5.2. 使用 useReducer](#52-使用-usereducer)
  - [5.3. 拆分多个 State](#53-拆分多个-state)
  - [5.4. 使用自定义 Hook](#54-使用自定义-hook)
- [6. 🤔 初始化 State 的常见错误？](#6--初始化-state-的常见错误)
  - [6.1. 错误 1：在渲染时执行昂贵计算](#61-错误-1在渲染时执行昂贵计算)
  - [6.2. 错误 2：使用 undefined 初始化](#62-错误-2使用-undefined-初始化)
  - [6.3. 错误 3：依赖外部变量](#63-错误-3依赖外部变量)
  - [6.4. 错误 4：在 useEffect 中初始化](#64-错误-4在-useeffect-中初始化)
  - [6.5. 错误 5：错误地使用 Props](#65-错误-5错误地使用-props)
- [7. 🔗 引用](#7--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- State 的基本初始化方式
- 惰性初始化的概念和用法
- 复杂 State 的初始化策略
- 常见错误和最佳实践

## 2. 🫧 评价

State 初始化是 React 组件中的基础操作，正确的初始化方式能避免性能问题。

- 函数组件使用 `useState` 初始化，类组件在构造函数中初始化
- 惰性初始化可以避免每次渲染都执行昂贵的计算
- 需要注意初始值的类型，避免 undefined 导致的受控/非受控切换问题
- 合理使用初始化函数可以提高组件性能

## 3. 🤔 如何初始化 State？

### 3.1. 函数组件：useState

```jsx
// ✅ 基本初始化
function Counter() {
  const [count, setCount] = useState(0)

  return <div>{count}</div>
}

// ✅ 多个 state
function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)

  return <form>...</form>
}

// ✅ 对象初始化
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0,
  })

  return <div>{user.name}</div>
}
```

### 3.2. 类组件：构造函数

```jsx
// ✅ 类组件初始化
class Counter extends React.Component {
  constructor(props) {
    super(props)
    // ✅ 在构造函数中初始化
    this.state = {
      count: 0,
    }
  }

  render() {
    return <div>{this.state.count}</div>
  }
}

// ✅ 类字段语法（推荐）
class Counter extends React.Component {
  state = {
    count: 0,
  }

  render() {
    return <div>{this.state.count}</div>
  }
}
```

### 3.3. 从 Props 初始化

```jsx
// ✅ 使用 props 作为初始值
function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount)

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}

// 使用
;<Counter initialCount={10} />
```

### 3.4. 从 localStorage 初始化

```jsx
// ✅ 从 localStorage 读取初始值
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // ⚠️ 注意：这里需要使用惰性初始化
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      当前主题：{theme}
    </button>
  )
}
```

## 4. 🤔 什么是惰性初始化？

### 4.1. 基本概念

惰性初始化是指将初始化逻辑放在函数中，只在组件首次渲染时执行。

::: code-group

```jsx [❌ 每次渲染都执行]
function ExpensiveComponent() {
  // ❌ 每次渲染都会调用 expensiveCalculation
  const [value, setValue] = useState(expensiveCalculation())

  return <div>{value}</div>
}

function expensiveCalculation() {
  console.log('执行昂贵计算')
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += i
  }
  return result
}
```

```jsx [✅ 只执行一次]
function ExpensiveComponent() {
  // ✅ 使用函数形式，只在首次渲染时执行
  const [value, setValue] = useState(() => expensiveCalculation())

  return <div>{value}</div>
}

function expensiveCalculation() {
  console.log('执行昂贵计算') // 只打印一次
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += i
  }
  return result
}
```

:::

### 4.2. 实际应用场景

```jsx
// ✅ 从 localStorage 读取
function TodoList() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  return <div>{todos.length} 个待办事项</div>
}

// ✅ 复杂的初始计算
function DataGrid({ rows, columns }) {
  const [processedData, setProcessedData] = useState(() => {
    // 只在首次渲染时处理数据
    return rows.map((row) =>
      columns.reduce((acc, col) => {
        acc[col.key] = transformValue(row[col.key], col.type)
        return acc
      }, {})
    )
  })

  return <div>...</div>
}

// ✅ 生成唯一 ID
function Form() {
  const [formId] = useState(() => `form-${Math.random().toString(36).slice(2)}`)

  return <form id={formId}>...</form>
}
```

### 4.3. 性能对比

```jsx
// 性能测试示例
function PerformanceTest() {
  // ❌ 不使用惰性初始化
  const [data1] = useState(
    Array(10000)
      .fill(0)
      .map((_, i) => i)
  )

  // ✅ 使用惰性初始化
  const [data2] = useState(() =>
    Array(10000)
      .fill(0)
      .map((_, i) => i)
  )

  // 第二种方式性能更好，因为数组只创建一次
}
```

## 5. 🤔 如何初始化复杂 State？

### 5.1. 使用对象

```jsx
// ✅ 单个对象管理相关状态
function UserProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    age: 0,
    address: {
      city: '',
      country: '',
    },
  })

  const updateName = (name) => {
    setProfile((prev) => ({ ...prev, name }))
  }

  return <div>{profile.name}</div>
}
```

### 5.2. 使用 useReducer

```jsx
// ✅ 复杂状态用 useReducer
const initialState = {
  loading: false,
  data: null,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null }
    case 'FETCH_ERROR':
      return { loading: false, data: null, error: action.payload }
    default:
      return state
  }
}

function DataFetcher({ url }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'FETCH_START' })
    fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'FETCH_ERROR', payload: error }))
  }, [url])

  return <div>...</div>
}
```

### 5.3. 拆分多个 State

```jsx
// ✅ 独立的状态分开管理
function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // 每个状态独立更新，互不影响
  return <form>...</form>
}

// ❌ 不要把不相关的状态放一起
function BadForm() {
  const [state, setState] = useState({
    name: '',
    email: '',
    unrelatedCounter: 0, // 不相关
    randomValue: null, // 不相关
  })
}
```

### 5.4. 使用自定义 Hook

```jsx
// ✅ 封装复杂的初始化逻辑
function useFormState(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  }
}

// 使用
function LoginForm() {
  const form = useFormState({
    username: '',
    password: '',
  })

  return (
    <form>
      <input
        value={form.values.username}
        onChange={(e) => form.handleChange('username', e.target.value)}
      />
    </form>
  )
}
```

## 6. 🤔 初始化 State 的常见错误？

### 6.1. 错误 1：在渲染时执行昂贵计算

::: code-group

```jsx [❌ 错误]
function BadComponent() {
  // ❌ 每次渲染都执行
  const [data, setData] = useState(
    Array(10000)
      .fill(0)
      .map((_, i) => ({
        id: i,
        value: Math.random(),
      }))
  )

  return <div>{data.length}</div>
}
```

```jsx [✅ 正确]
function GoodComponent() {
  // ✅ 使用惰性初始化
  const [data, setData] = useState(() =>
    Array(10000)
      .fill(0)
      .map((_, i) => ({
        id: i,
        value: Math.random(),
      }))
  )

  return <div>{data.length}</div>
}
```

:::

### 6.2. 错误 2：使用 undefined 初始化

::: code-group

```jsx [❌ 错误]
function BadInput({ initialValue }) {
  // ❌ initialValue 可能是 undefined
  const [value, setValue] = useState(initialValue)

  return (
    <input
      value={value} // ⚠️ 可能从非受控变为受控
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

```jsx [✅ 正确]
function GoodInput({ initialValue }) {
  // ✅ 提供默认值
  const [value, setValue] = useState(initialValue ?? '')

  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}
```

:::

### 6.3. 错误 3：依赖外部变量

::: code-group

```jsx [❌ 错误]
let globalCounter = 0

function BadCounter() {
  // ❌ 依赖外部变量，不可预测
  const [count, setCount] = useState(globalCounter++)

  return <div>{count}</div>
}
```

```jsx [✅ 正确]
function GoodCounter() {
  // ✅ 使用纯函数初始化
  const [count, setCount] = useState(() => {
    return Math.floor(Math.random() * 100)
  })

  return <div>{count}</div>
}
```

:::

### 6.4. 错误 4：在 useEffect 中初始化

::: code-group

```jsx [❌ 错误]
function BadComponent() {
  const [data, setData] = useState(null)

  // ❌ 初始化逻辑放在 useEffect 中
  useEffect(() => {
    setData(expensiveCalculation())
  }, [])

  // ⚠️ 首次渲染时 data 是 null
  if (!data) return <div>Loading...</div>

  return <div>{data}</div>
}
```

```jsx [✅ 正确]
function GoodComponent() {
  // ✅ 直接在 useState 中初始化
  const [data, setData] = useState(() => expensiveCalculation())

  return <div>{data}</div>
}
```

:::

### 6.5. 错误 5：错误地使用 Props

::: code-group

```jsx [❌ 错误]
function BadCounter({ count }) {
  // ❌ props 变化时，state 不会更新
  const [value, setValue] = useState(count)

  return <div>{value}</div>
}

// count 从 0 变为 10，但 value 还是 0
```

```jsx [✅ 正确方案1]
function GoodCounter({ count }) {
  // ✅ 直接使用 props，不需要 state
  return <div>{count}</div>
}
```

```jsx [✅ 正确方案2]
function GoodCounter({ count, onChange }) {
  // ✅ 如果需要本地修改，使用 key 重置
  const [value, setValue] = useState(count)

  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        onChange?.(e.target.value)
      }}
    />
  )
}

// 使用 key 强制重新挂载
;<GoodCounter key={userId} count={initialCount} />
```

:::

## 7. 🔗 引用

- [React 官方文档 - useState][1]
- [React 官方文档 - useReducer][2]
- [React 官方文档 - 状态初始化][3]

[1]: https://react.dev/reference/react/useState
[2]: https://react.dev/reference/react/useReducer
[3]: https://react.dev/learn/state-a-components-memory
