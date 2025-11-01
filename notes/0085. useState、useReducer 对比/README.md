# [0085. useState、useReducer 对比](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0085.%20useState%E3%80%81useReducer%20%E5%AF%B9%E6%AF%94)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🆚 基本用法对比](#3--基本用法对比)
  - [3.1. 简单计数器](#31-简单计数器)
  - [3.2. 表单状态管理](#32-表单状态管理)
  - [3.3. 对比总结表格](#33-对比总结表格)
- [4. 🤔 什么时候用 useState？](#4--什么时候用-usestate)
  - [4.1. 场景 1：简单的独立状态](#41-场景-1简单的独立状态)
  - [4.2. 场景 2：不相关的多个状态](#42-场景-2不相关的多个状态)
  - [4.3. 场景 3：简单的数组或对象](#43-场景-3简单的数组或对象)
  - [4.4. 场景 4：异步数据加载](#44-场景-4异步数据加载)
- [5. 🤔 什么时候用 useReducer？](#5--什么时候用-usereducer)
  - [5.1. 场景 1：复杂的状态逻辑](#51-场景-1复杂的状态逻辑)
  - [5.2. 场景 2：状态转换逻辑复杂](#52-场景-2状态转换逻辑复杂)
  - [5.3. 场景 3：需要优化性能](#53-场景-3需要优化性能)
  - [5.4. 场景 4：状态逻辑需要测试](#54-场景-4状态逻辑需要测试)
- [6. 🤔 如何选择使用哪个？](#6--如何选择使用哪个)
  - [6.1. 决策树](#61-决策树)
  - [6.2. 实际例子对比](#62-实际例子对比)
  - [6.3. 从 useState 迁移到 useReducer](#63-从-usestate-迁移到-usereducer)
- [7. 🤔 useReducer 的优势是什么？](#7--usereducer-的优势是什么)
  - [7.1. 优势 1：逻辑集中](#71-优势-1逻辑集中)
  - [7.2. 优势 2：引用稳定](#72-优势-2引用稳定)
  - [7.3. 优势 3：易于测试](#73-优势-3易于测试)
  - [7.4. 优势 4：可预测性](#74-优势-4可预测性)
- [8. 🔗 引用](#8--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- useState 和 useReducer 的基本用法
- 两者的适用场景
- 选择标准和最佳实践
- useReducer 的优势分析

## 2. 🫧 评价

useState 和 useReducer 是 React 中管理状态的两个核心 Hook，选对工具能让代码更清晰。

- useState 适合简单独立的状态，代码简洁直观
- useReducer 适合复杂关联的状态，逻辑更集中可测试
- 简单状态首选 useState，复杂状态逐渐迁移到 useReducer
- useReducer 更适合状态转换逻辑复杂或需要优化性能的场景
- 两者可以互相转换，根据实际需求灵活选择

## 3. 🆚 基本用法对比

### 3.1. 简单计数器

::: code-group

```jsx [useState 实现]
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  )
}
```

```jsx [useReducer 实现]
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'reset':
      return 0
    default:
      return state
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0)

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  )
}
```

:::

### 3.2. 表单状态管理

::: code-group

```jsx [useState 实现]
function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      await login(username, password)
    } catch (error) {
      setErrors({ message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading}>登录</button>
      {errors.message && <div>{errors.message}</div>}
    </form>
  )
}
```

```jsx [useReducer 实现]
const initialState = {
  username: '',
  password: '',
  errors: {},
  loading: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'setUsername':
      return { ...state, username: action.payload }
    case 'setPassword':
      return { ...state, password: action.payload }
    case 'setLoading':
      return { ...state, loading: action.payload }
    case 'setErrors':
      return { ...state, errors: action.payload }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'setLoading', payload: true })
    dispatch({ type: 'setErrors', payload: {} })

    try {
      await login(state.username, state.password)
    } catch (error) {
      dispatch({ type: 'setErrors', payload: { message: error.message } })
    } finally {
      dispatch({ type: 'setLoading', payload: false })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.username}
        onChange={(e) =>
          dispatch({ type: 'setUsername', payload: e.target.value })
        }
      />
      <input
        value={state.password}
        onChange={(e) =>
          dispatch({ type: 'setPassword', payload: e.target.value })
        }
      />
      <button disabled={state.loading}>登录</button>
      {state.errors.message && <div>{state.errors.message}</div>}
    </form>
  )
}
```

:::

### 3.3. 对比总结表格

| 特性     | useState          | useReducer             |
| -------- | ----------------- | ---------------------- |
| 学习曲线 | 简单直观          | 需要理解 reducer 概念  |
| 代码量   | 少                | 多（需要定义 reducer） |
| 状态更新 | 直接调用 setState | 通过 dispatch action   |
| 适用场景 | 简单独立状态      | 复杂关联状态           |
| 逻辑复用 | 较难              | 容易（reducer 可复用） |
| 测试     | 需要渲染组件      | reducer 可单独测试     |
| 性能优化 | 每次都创建新函数  | dispatch 引用稳定      |

## 4. 🤔 什么时候用 useState？

### 4.1. 场景 1：简单的独立状态

```jsx
function Toggle() {
  // ✅ 布尔值切换，用 useState
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '关闭' : '打开'}
      </button>
      {isOpen && <div>内容</div>}
    </div>
  )
}
```

### 4.2. 场景 2：不相关的多个状态

```jsx
function UserProfile() {
  // ✅ 各自独立，用 useState
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState('')

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
    </form>
  )
}
```

### 4.3. 场景 3：简单的数组或对象

```jsx
function TagInput() {
  // ✅ 简单的数组操作，用 useState
  const [tags, setTags] = useState([])

  const addTag = (tag) => {
    setTags([...tags, tag])
  }

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div>
      {tags.map((tag, i) => (
        <span key={i}>
          {tag}
          <button onClick={() => removeTag(i)}>×</button>
        </span>
      ))}
    </div>
  )
}
```

### 4.4. 场景 4：异步数据加载

```jsx
function UserData({ userId }) {
  // ✅ 简单的加载状态，用 useState
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error.message}</div>
  return <div>{data?.name}</div>
}
```

## 5. 🤔 什么时候用 useReducer？

### 5.1. 场景 1：复杂的状态逻辑

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
          ? [...state.data, ...action.payload]
          : action.payload,
        page: action.append ? state.page + 1 : 1,
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

function DataList() {
  // ✅ 多个相关状态，用 useReducer
  const [state, dispatch] = useReducer(reducer, initialState)

  const loadMore = () => {
    dispatch({ type: 'FETCH_START' })
    fetch(`/api/data?page=${state.page}`)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data,
          append: true,
        })
      )
      .catch((err) => dispatch({ type: 'FETCH_ERROR', payload: err }))
  }

  return <div>...</div>
}
```

### 5.2. 场景 2：状态转换逻辑复杂

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        status: 'playing',
        startTime: Date.now(),
        score: 0,
      }
    case 'ANSWER_CORRECT':
      const bonus = state.streak > 3 ? 2 : 1
      return {
        ...state,
        score: state.score + 10 * bonus,
        streak: state.streak + 1,
        correctAnswers: state.correctAnswers + 1,
      }
    case 'ANSWER_WRONG':
      return {
        ...state,
        streak: 0,
        wrongAnswers: state.wrongAnswers + 1,
        lives: state.lives - 1,
        status: state.lives <= 1 ? 'gameover' : 'playing',
      }
    case 'END_GAME':
      return {
        ...state,
        status: 'ended',
        endTime: Date.now(),
      }
    default:
      return state
  }
}

function QuizGame() {
  // ✅ 复杂的状态转换，用 useReducer
  const [state, dispatch] = useReducer(reducer, initialState)

  return <div>...</div>
}
```

### 5.3. 场景 3：需要优化性能

```jsx
function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  // ✅ dispatch 引用稳定，子组件不会因为父组件重渲染而重渲染
  return (
    <div>
      <AddTodo onAdd={(text) => dispatch({ type: 'ADD', text })} />
      <TodoItems
        items={state.todos}
        onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
        onDelete={(id) => dispatch({ type: 'DELETE', id })}
      />
    </div>
  )
}

// 子组件可以使用 memo 优化
const AddTodo = memo(({ onAdd }) => {
  // onAdd 引用稳定，不会导致重渲染
  return (
    <input onKeyPress={(e) => e.key === 'Enter' && onAdd(e.target.value)} />
  )
})
```

### 5.4. 场景 4：状态逻辑需要测试

```jsx
// ✅ reducer 是纯函数，容易测试
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, done: false }]
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      )
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.id)
    default:
      return state
  }
}

// 测试文件
describe('todoReducer', () => {
  it('should add todo', () => {
    const state = []
    const newState = todoReducer(state, { type: 'ADD', text: '学习 React' })
    expect(newState).toHaveLength(1)
    expect(newState[0].text).toBe('学习 React')
  })

  it('should toggle todo', () => {
    const state = [{ id: 1, text: '学习', done: false }]
    const newState = todoReducer(state, { type: 'TOGGLE', id: 1 })
    expect(newState[0].done).toBe(true)
  })
})
```

## 6. 🤔 如何选择使用哪个？

### 6.1. 决策树

```jsx
// 决策流程
function chooseHook() {
  // 1. 状态是否复杂？
  if (isStateSimple) {
    return 'useState' // ✅ 简单状态用 useState
  }

  // 2. 状态是否相互关联？
  if (hasRelatedStates) {
    return 'useReducer' // ✅ 关联状态用 useReducer
  }

  // 3. 是否有复杂的状态转换逻辑？
  if (hasComplexTransitions) {
    return 'useReducer' // ✅ 复杂逻辑用 useReducer
  }

  // 4. 是否需要优化性能？
  if (needsPerformanceOptimization) {
    return 'useReducer' // ✅ 性能优化用 useReducer
  }

  // 5. 是否需要测试状态逻辑？
  if (needsTesting) {
    return 'useReducer' // ✅ 需要测试用 useReducer
  }

  // 默认使用 useState
  return 'useState'
}
```

### 6.2. 实际例子对比

::: code-group

```jsx [简单：用 useState]
function Counter() {
  // ✅ 单一状态，逻辑简单
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

```jsx [复杂：用 useReducer]
function ShoppingCart() {
  // ✅ 多个相关状态，逻辑复杂
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    discount: 0,
    shippingFee: 0,
    coupon: null,
  })

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', item })
  }

  const applyCoupon = (code) => {
    dispatch({ type: 'APPLY_COUPON', code })
  }

  return <div>...</div>
}
```

:::

### 6.3. 从 useState 迁移到 useReducer

```jsx
// 第一步：使用 useState（简单场景）
function Form1() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return <form>...</form>
}

// 第二步：状态变多，组合成对象
function Form2() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0,
    address: '',
  })

  return <form>...</form>
}

// 第三步：逻辑复杂，迁移到 useReducer
function Form3() {
  const [state, dispatch] = useReducer(formReducer, initialState)

  return <form>...</form>
}
```

## 7. 🤔 useReducer 的优势是什么？

### 7.1. 优势 1：逻辑集中

::: code-group

```jsx [useState：逻辑分散]
function TodoList() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.done))
  }

  // 逻辑分散在多个函数中
  return <div>...</div>
}
```

```jsx [useReducer：逻辑集中]
function todoReducer(state, action) {
  // ✅ 所有逻辑集中在 reducer 中
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, done: false },
        ],
      }
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      }
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.done),
      }
    case 'SET_FILTER':
      return { ...state, filter: action.filter }
    default:
      return state
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  return <div>...</div>
}
```

:::

### 7.2. 优势 2：引用稳定

```jsx
function Parent() {
  const [count, setCount] = useState(0)

  // ❌ 每次渲染都创建新函数
  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)

  return (
    <div>
      <Child onIncrement={increment} onDecrement={decrement} />
    </div>
  )
}

// 需要使用 useCallback 优化
function ParentOptimized() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => setCount((c) => c + 1), [])
  const decrement = useCallback(() => setCount((c) => c - 1), [])

  return (
    <div>
      <Child onIncrement={increment} onDecrement={decrement} />
    </div>
  )
}

// ✅ useReducer 天然引用稳定
function ParentWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // dispatch 引用永远不变，不需要 useCallback
  return (
    <div>
      <Child
        onIncrement={() => dispatch({ type: 'INCREMENT' })}
        onDecrement={() => dispatch({ type: 'DECREMENT' })}
      />
    </div>
  )
}
```

### 7.3. 优势 3：易于测试

```jsx
// ✅ reducer 是纯函数，易于测试
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.item],
        total: state.total + action.item.price,
      }
    case 'REMOVE_ITEM':
      const item = state.items.find((i) => i.id === action.id)
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
        total: state.total - item.price,
      }
    default:
      return state
  }
}

// 测试非常简单
test('should add item to cart', () => {
  const state = { items: [], total: 0 }
  const action = { type: 'ADD_ITEM', item: { id: 1, price: 100 } }
  const newState = cartReducer(state, action)

  expect(newState.items).toHaveLength(1)
  expect(newState.total).toBe(100)
})
```

### 7.4. 优势 4：可预测性

```jsx
// ✅ action 类型明确，状态变化可预测
function reducer(state, action) {
  // 清楚地知道有哪些操作
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true }
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.user }
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.error }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

// 通过 action 就能知道发生了什么
dispatch({ type: 'LOGIN_START' })
dispatch({ type: 'LOGIN_SUCCESS', user: userData })
```

## 8. 🔗 引用

- [React 官方文档 - useState][1]
- [React 官方文档 - useReducer][2]
- [useState vs useReducer 选择指南][3]

[1]: https://react.dev/reference/react/useState
[2]: https://react.dev/reference/react/useReducer
[3]: https://react.dev/learn/extracting-state-logic-into-a-reducer
