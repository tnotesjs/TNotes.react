# [0164. State 的不可变性原则](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0164.%20State%20%E7%9A%84%E4%B8%8D%E5%8F%AF%E5%8F%98%E6%80%A7%E5%8E%9F%E5%88%99)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 什么是 State 的不可变性？](#3--什么是-state-的不可变性)
  - [3.1. 基本概念](#31-基本概念)
  - [3.2. 引用相等性检查](#32-引用相等性检查)
  - [3.3. 不可变性的要求](#33-不可变性的要求)
- [4. 🤔 为什么需要遵守不可变性？](#4--为什么需要遵守不可变性)
  - [4.1. 原因 1：确保重新渲染](#41-原因-1确保重新渲染)
  - [4.2. 原因 2：性能优化生效](#42-原因-2性能优化生效)
  - [4.3. 原因 3：避免意外的副作用](#43-原因-3避免意外的副作用)
  - [4.4. 原因 4：时间旅行调试](#44-原因-4时间旅行调试)
- [5. 🤔 如何正确更新不同类型的 State？](#5--如何正确更新不同类型的-state)
  - [5.1. 更新对象](#51-更新对象)
  - [5.2. 更新嵌套对象](#52-更新嵌套对象)
  - [5.3. 更新数组](#53-更新数组)
  - [5.4. 更新数组中的对象](#54-更新数组中的对象)
- [6. 🤔 不可变更新的常见错误？](#6--不可变更新的常见错误)
  - [6.1. 错误 1：使用变异方法](#61-错误-1使用变异方法)
  - [6.2. 错误 2：部分展开](#62-错误-2部分展开)
  - [6.3. 错误 3：共享引用](#63-错误-3共享引用)
  - [6.4. 错误 4：异步更新中的闭包问题](#64-错误-4异步更新中的闭包问题)
- [7. � 如何简化不可变更新？](#7--如何简化不可变更新)
  - [7.1. 使用 Immer](#71-使用-immer)
  - [7.2. 对比传统方式和 Immer](#72-对比传统方式和-immer)
  - [7.3. 自定义 Hook 封装](#73-自定义-hook-封装)
  - [7.4. 使用工具函数](#74-使用工具函数)
- [8. 🔗 引用](#8--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- State 不可变性的概念
- 遵守不可变性的原因
- 正确更新各种类型的 State
- 常见错误和最佳实践
- 简化不可变更新的工具

## 2. 🫧 评价

State 不可变性是 React 的核心设计原则，理解它对写出正确的代码至关重要。

- 永远不要直接修改 state，而是创建新的对象或数组
- 不可变性保证了 React 能正确检测状态变化并触发重渲染
- 对象使用展开运算符，数组使用非变异方法
- 深层嵌套的对象更新比较繁琐，可以使用 Immer 等库简化
- 遵守不可变性是性能优化和避免 bug 的基础

## 3. 🤔 什么是 State 的不可变性？

### 3.1. 基本概念

不可变性是指不直接修改现有数据，而是创建新的数据副本。

::: code-group

```jsx [❌ 可变更新（错误）]
function Counter() {
  const [user, setUser] = useState({ name: '张三', age: 25 })

  const updateAge = () => {
    // ❌ 直接修改了对象
    user.age = 26
    setUser(user)
    // React 检测不到变化，不会重新渲染
  }

  return (
    <div>
      <p>年龄：{user.age}</p>
      <button onClick={updateAge}>增加年龄</button>
    </div>
  )
}
```

```jsx [✅ 不可变更新（正确）]
function Counter() {
  const [user, setUser] = useState({ name: '张三', age: 25 })

  const updateAge = () => {
    // ✅ 创建新对象
    setUser({ ...user, age: 26 })
    // React 能检测到变化，触发重新渲染
  }

  return (
    <div>
      <p>年龄：{user.age}</p>
      <button onClick={updateAge}>增加年龄</button>
    </div>
  )
}
```

:::

### 3.2. 引用相等性检查

```jsx
// React 使用 Object.is 比较新旧状态
function compare() {
  const obj1 = { count: 0 }
  const obj2 = obj1
  obj2.count = 1

  console.log(obj1 === obj2) // true，引用相同
  // ❌ React 认为没有变化

  const obj3 = { count: 0 }
  const obj4 = { ...obj3, count: 1 }

  console.log(obj3 === obj4) // false，引用不同
  // ✅ React 检测到变化
}
```

### 3.3. 不可变性的要求

```jsx
function Example() {
  const [state, setState] = useState({
    user: { name: '张三' },
    todos: ['学习', '工作'],
    count: 0,
  })

  // ❌ 错误：直接修改
  state.count = 1
  state.user.name = '李四'
  state.todos.push('运动')

  // ✅ 正确：创建新对象
  setState({
    ...state,
    count: 1,
    user: { ...state.user, name: '李四' },
    todos: [...state.todos, '运动'],
  })
}
```

## 4. 🤔 为什么需要遵守不可变性？

### 4.1. 原因 1：确保重新渲染

::: code-group

```jsx [❌ 检测不到变化]
function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, text: '学习', done: false }])

  const toggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id)
    // ❌ 直接修改
    todo.done = !todo.done
    setTodos(todos) // 引用没变，不会重新渲染
  }

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text} - {todo.done ? '完成' : '未完成'}
          <button onClick={() => toggleTodo(todo.id)}>切换</button>
        </div>
      ))}
    </div>
  )
}
```

```jsx [✅ 正确检测变化]
function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, text: '学习', done: false }])

  const toggleTodo = (id) => {
    // ✅ 创建新数组和新对象
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text} - {todo.done ? '完成' : '未完成'}
          <button onClick={() => toggleTodo(todo.id)}>切换</button>
        </div>
      ))}
    </div>
  )
}
```

:::

### 4.2. 原因 2：性能优化生效

```jsx
// ✅ React.memo 依赖不可变性
const ExpensiveComponent = memo(({ data }) => {
  console.log('渲染')
  return <div>{data.value}</div>
})

function Parent() {
  const [data, setData] = useState({ value: 0 })

  // ❌ 错误：直接修改，memo 失效
  const updateWrong = () => {
    data.value = 1
    setData(data) // 引用相同，子组件不会重新渲染
  }

  // ✅ 正确：创建新对象，memo 正常工作
  const updateRight = () => {
    setData({ ...data, value: 1 }) // 引用不同，子组件重新渲染
  }

  return (
    <div>
      <ExpensiveComponent data={data} />
      <button onClick={updateRight}>更新</button>
    </div>
  )
}
```

### 4.3. 原因 3：避免意外的副作用

```jsx
function DataSharing() {
  const [user, setUser] = useState({ name: '张三', age: 25 })

  // ❌ 危险：共享引用
  const updateUser = () => {
    const updatedUser = user
    updatedUser.age = 26
    setUser(updatedUser)
    // 如果其他地方也持有 user 的引用，会产生意外的副作用
  }

  // ✅ 安全：创建新对象
  const updateUserSafe = () => {
    setUser({ ...user, age: 26 })
    // 旧的 user 对象不受影响
  }
}
```

### 4.4. 原因 4：时间旅行调试

```jsx
function TimeTravelDebug() {
  const [history, setHistory] = useState([{ todos: [] }])
  const [currentStep, setCurrentStep] = useState(0)

  const current = history[currentStep]

  const addTodo = (text) => {
    // ✅ 每次都创建新对象，历史记录完整
    const newTodos = [...current.todos, { id: Date.now(), text }]
    const newHistory = history.slice(0, currentStep + 1)
    setHistory([...newHistory, { todos: newTodos }])
    setCurrentStep(currentStep + 1)
  }

  // 可以回到任意历史状态
  const goToStep = (step) => {
    setCurrentStep(step)
  }

  return <div>...</div>
}
```

## 5. 🤔 如何正确更新不同类型的 State？

### 5.1. 更新对象

::: code-group

```jsx [❌ 直接修改]
function UserProfile() {
  const [user, setUser] = useState({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
  })

  const updateName = () => {
    // ❌ 直接修改
    user.name = '李四'
    setUser(user)
  }
}
```

```jsx [✅ 展开运算符]
function UserProfile() {
  const [user, setUser] = useState({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
  })

  const updateName = () => {
    // ✅ 使用展开运算符
    setUser({ ...user, name: '李四' })
  }

  const updateMultiple = () => {
    // ✅ 同时更新多个属性
    setUser({
      ...user,
      name: '李四',
      age: 26,
    })
  }
}
```

:::

### 5.2. 更新嵌套对象

```jsx
function NestedObject() {
  const [user, setUser] = useState({
    name: '张三',
    address: {
      city: '北京',
      street: '朝阳区',
    },
  })

  // ❌ 错误：只展开了第一层
  const updateCityWrong = () => {
    setUser({
      ...user,
      address: { city: '上海' }, // ❌ 丢失了 street
    })
  }

  // ✅ 正确：展开所有层级
  const updateCityRight = () => {
    setUser({
      ...user,
      address: {
        ...user.address,
        city: '上海',
      },
    })
  }

  // ✅ 深层嵌套
  const updateDeepNested = () => {
    setUser((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        details: {
          ...prev.address.details,
          zipCode: '100000',
        },
      },
    }))
  }
}
```

### 5.3. 更新数组

```jsx
function ArrayOperations() {
  const [items, setItems] = useState([1, 2, 3])

  // ✅ 添加元素
  const addItem = () => {
    setItems([...items, 4]) // 末尾添加
    setItems([0, ...items]) // 开头添加
    setItems([...items.slice(0, 2), 2.5, ...items.slice(2)]) // 中间插入
  }

  // ✅ 删除元素
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  // ✅ 更新元素
  const updateItem = (index, newValue) => {
    setItems(items.map((item, i) => (i === index ? newValue : item)))
  }

  // ✅ 排序（创建新数组）
  const sortItems = () => {
    setItems([...items].sort((a, b) => a - b))
  }

  // ❌ 错误：变异方法
  const wrongOperations = () => {
    items.push(4) // ❌
    items.pop() // ❌
    items.splice(0, 1) // ❌
    items.sort() // ❌
    items.reverse() // ❌
    setItems(items) // 引用没变，不会更新
  }
}
```

### 5.4. 更新数组中的对象

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习', done: false },
    { id: 2, text: '工作', done: false },
  ])

  // ✅ 更新特定元素
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  // ✅ 删除特定元素
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // ✅ 添加新元素
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  // ✅ 更新嵌套属性
  const updateNestedProperty = (id, field, value) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              metadata: {
                ...todo.metadata,
                [field]: value,
              },
            }
          : todo
      )
    )
  }
}
```

## 6. 🤔 不可变更新的常见错误？

### 6.1. 错误 1：使用变异方法

::: code-group

```jsx [❌ 变异方法]
function BadArray() {
  const [items, setItems] = useState([1, 2, 3])

  const addItem = () => {
    // ❌ push 会修改原数组
    items.push(4)
    setItems(items) // 引用没变
  }

  const sortItems = () => {
    // ❌ sort 会修改原数组
    items.sort()
    setItems(items) // 引用没变
  }
}
```

```jsx [✅ 非变异方法]
function GoodArray() {
  const [items, setItems] = useState([1, 2, 3])

  const addItem = () => {
    // ✅ 创建新数组
    setItems([...items, 4])
  }

  const sortItems = () => {
    // ✅ 先复制再排序
    setItems([...items].sort())
  }
}
```

:::

### 6.2. 错误 2：部分展开

```jsx
function PartialSpread() {
  const [state, setState] = useState({
    user: { name: '张三', age: 25 },
    settings: { theme: 'light', lang: 'zh' },
  })

  // ❌ 错误：只展开一层
  const updateThemeWrong = () => {
    setState({
      ...state,
      settings: { theme: 'dark' }, // ❌ 丢失了 lang
    })
  }

  // ✅ 正确：展开所有需要保留的层级
  const updateThemeRight = () => {
    setState({
      ...state,
      settings: {
        ...state.settings,
        theme: 'dark',
      },
    })
  }
}
```

### 6.3. 错误 3：共享引用

```jsx
function SharedReference() {
  const [lists, setLists] = useState({
    list1: [1, 2, 3],
    list2: [4, 5, 6],
  })

  // ❌ 错误：共享引用
  const shareList = () => {
    setLists({
      ...lists,
      list2: lists.list1, // ❌ list1 和 list2 指向同一个数组
    })
    // 修改一个会影响另一个
  }

  // ✅ 正确：复制数组
  const copyList = () => {
    setLists({
      ...lists,
      list2: [...lists.list1], // ✅ 创建新数组
    })
  }
}
```

### 6.4. 错误 4：异步更新中的闭包问题

::: code-group

```jsx [❌ 使用闭包中的值]
function AsyncUpdate() {
  const [items, setItems] = useState([1, 2, 3])

  const addMultiple = async () => {
    await delay(1000)
    // ❌ items 可能已经过期
    setItems([...items, 4])

    await delay(1000)
    // ❌ 还是用的旧的 items
    setItems([...items, 5])
  }
}
```

```jsx [✅ 使用函数式更新]
function AsyncUpdate() {
  const [items, setItems] = useState([1, 2, 3])

  const addMultiple = async () => {
    await delay(1000)
    // ✅ 使用最新的 state
    setItems((prev) => [...prev, 4])

    await delay(1000)
    // ✅ 使用最新的 state
    setItems((prev) => [...prev, 5])
  }
}
```

:::

## 7. � 如何简化不可变更新？

### 7.1. 使用 Immer

```jsx
import { useImmer } from 'use-immer'

function TodoList() {
  const [todos, updateTodos] = useImmer([{ id: 1, text: '学习', done: false }])

  // ✅ 使用 Immer，可以直接"修改"
  const toggleTodo = (id) => {
    updateTodos((draft) => {
      const todo = draft.find((t) => t.id === id)
      if (todo) {
        todo.done = !todo.done // 看起来像直接修改，实际创建了新对象
      }
    })
  }

  const updateNestedProperty = (id) => {
    updateTodos((draft) => {
      const todo = draft.find((t) => t.id === id)
      if (todo) {
        // ✅ 深层嵌套也很简单
        todo.metadata.tags.push('urgent')
      }
    })
  }

  return <div>...</div>
}
```

### 7.2. 对比传统方式和 Immer

::: code-group

```jsx [传统方式：繁琐]
function ComplexUpdate() {
  const [state, setState] = useState({
    users: [
      {
        id: 1,
        profile: {
          name: '张三',
          contact: {
            email: 'zhang@example.com',
          },
        },
      },
    ],
  })

  const updateEmail = (userId, newEmail) => {
    setState({
      ...state,
      users: state.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              profile: {
                ...user.profile,
                contact: {
                  ...user.profile.contact,
                  email: newEmail,
                },
              },
            }
          : user
      ),
    })
  }
}
```

```jsx [Immer：简洁]
import { useImmer } from 'use-immer'

function ComplexUpdate() {
  const [state, updateState] = useImmer({
    users: [
      {
        id: 1,
        profile: {
          name: '张三',
          contact: {
            email: 'zhang@example.com',
          },
        },
      },
    ],
  })

  const updateEmail = (userId, newEmail) => {
    updateState((draft) => {
      const user = draft.users.find((u) => u.id === userId)
      if (user) {
        user.profile.contact.email = newEmail
      }
    })
  }
}
```

:::

### 7.3. 自定义 Hook 封装

```jsx
// 封装常见的数组操作
function useArray(initialValue) {
  const [array, setArray] = useState(initialValue)

  return {
    array,
    set: setArray,
    push: (item) => setArray((prev) => [...prev, item]),
    remove: (index) => setArray((prev) => prev.filter((_, i) => i !== index)),
    update: (index, item) =>
      setArray((prev) => prev.map((val, i) => (i === index ? item : val))),
    clear: () => setArray([]),
    filter: (callback) => setArray((prev) => prev.filter(callback)),
  }
}

// 使用
function TodoList() {
  const todos = useArray([{ id: 1, text: '学习', done: false }])

  return (
    <div>
      <button onClick={() => todos.push({ id: 2, text: '工作', done: false })}>
        添加
      </button>
      <button onClick={() => todos.remove(0)}>删除第一个</button>
    </div>
  )
}
```

### 7.4. 使用工具函数

```jsx
// 深度克隆工具
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 深度更新工具
function deepUpdate(obj, path, value) {
  const keys = path.split('.')
  const result = { ...obj }
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] }
    current = current[keys[i]]
  }

  current[keys[keys.length - 1]] = value
  return result
}

// 使用
function Example() {
  const [state, setState] = useState({
    user: {
      profile: {
        name: '张三',
      },
    },
  })

  const updateName = (name) => {
    setState(deepUpdate(state, 'user.profile.name', name))
  }
}
```

## 8. 🔗 引用

- [React 官方文档 - 更新对象和数组][1]
- [Immer 官方文档][2]
- [React 不可变性指南][3]

[1]: https://react.dev/learn/updating-objects-in-state
[2]: https://immerjs.github.io/immer/
[3]: https://react.dev/learn/updating-arrays-in-state
