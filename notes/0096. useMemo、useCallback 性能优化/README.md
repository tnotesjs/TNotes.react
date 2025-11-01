# [0096. useMemo、useCallback 性能优化](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0096.%20useMemo%E3%80%81useCallback%20%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 useMemo 是什么？](#3--usememo-是什么)
- [4. 🤔 useCallback 是什么？](#4--usecallback-是什么)
- [5. 🆚 useMemo vs useCallback](#5--usememo-vs-usecallback)
- [6. 🤔 何时使用这些优化？](#6--何时使用这些优化)
- [7. 🤔 何时不应该使用？](#7--何时不应该使用)
- [8. 🤔 如何与 React.memo 配合？](#8--如何与-reactmemo-配合)
- [9. 🤔 有哪些常见错误？](#9--有哪些常见错误)
- [10. 🔗 引用](#10--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- useMemo 的作用和使用场景
- useCallback 的作用和使用场景
- 两者的区别和选择
- 性能优化的最佳实践
- 常见错误和陷阱
- 与 React.memo 的配合使用

## 2. 🫧 评价

这篇笔记讲解 React 中两个重要的性能优化 Hook：useMemo 和 useCallback。

- useMemo 用于缓存计算结果，useCallback 用于缓存函数引用
- 不是所有场景都需要优化，过度使用反而增加复杂度
- 必须与 React.memo 配合才能真正避免子组件重新渲染
- 依赖项数组是关键，遗漏或多余都会导致问题
- 性能优化要基于实际性能分析，不要盲目优化

## 3. 🤔 useMemo 是什么？

`useMemo` 用于缓存计算结果，避免每次渲染都重新计算。

```typescript
// 基本语法
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])

// 问题场景：昂贵的计算每次都执行
function Component({ items }: { items: Item[] }) {
  // ❌ 每次渲染都重新计算
  const sortedItems = items.slice().sort((a, b) => a.value - b.value)

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

// ✅ 使用 useMemo 缓存计算结果
function Component({ items }: { items: Item[] }) {
  const sortedItems = useMemo(() => {
    console.log('排序执行')
    return items.slice().sort((a, b) => a.value - b.value)
  }, [items]) // 只在 items 变化时重新计算

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

常见使用场景：

```typescript
// 场景 1：复杂的数据转换
function DataTable({ data }: { data: Data[] }) {
  const processedData = useMemo(() => {
    return data
      .filter((item) => item.active)
      .map((item) => ({
        ...item,
        displayName: `${item.firstName} ${item.lastName}`,
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
  }, [data])

  return <Table data={processedData} />
}

// 场景 2：昂贵的数学计算
function Chart({ values }: { values: number[] }) {
  const statistics = useMemo(() => {
    const sum = values.reduce((a, b) => a + b, 0)
    const mean = sum / values.length
    return { sum, mean }
  }, [values])

  return <div>平均值：{statistics.mean}</div>
}

// 场景 3：创建稳定的对象引用
function SearchForm() {
  const [query, setQuery] = useState('')

  const searchConfig = useMemo(
    () => ({
      query,
      limit: 20,
    }),
    [query]
  )

  return <SearchResults config={searchConfig} />
}
```

## 4. 🤔 useCallback 是什么？

`useCallback` 用于缓存函数引用，避免每次渲染都创建新函数。

```typescript
// 基本语法
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])

// 问题场景：函数引用变化导致子组件重新渲染
function Parent() {
  const [count, setCount] = useState(0)

  // ❌ 每次渲染都创建新函数
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child onClick={handleClick} /> {/* ❌ handleClick 每次都是新的 */}
    </div>
  )
}

const Child = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('Child 渲染') // ❌ 每次 Parent 渲染都会执行
  return <button onClick={onClick}>Child Button</button>
})

// ✅ 使用 useCallback 缓存函数
function Parent() {
  const [count, setCount] = useState(0)

  // ✅ 函数引用稳定
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child onClick={handleClick} /> {/* ✅ handleClick 引用不变 */}
    </div>
  )
}
```

常见使用场景：

```typescript
// 场景 1：事件处理函数传递给子组件
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleToggle = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }, []) // ✅ 空依赖，函数永远不变

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </ul>
  )
}

// 场景 2：依赖外部变量的函数
function SearchBox({ category }: { category: string }) {
  const [query, setQuery] = useState('')

  const handleSearch = useCallback(() => {
    fetch(`/api/search?q=${query}&category=${category}`)
      .then((res) => res.json())
      .then(console.log)
  }, [query, category]) // ✅ 依赖这两个值

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchButton onClick={handleSearch} />
    </div>
  )
}

// 场景 3：useEffect 依赖的函数
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  const fetchUser = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`)
    const data = await response.json()
    setUser(data)
  }, [userId])

  useEffect(() => {
    fetchUser()
  }, [fetchUser]) // ✅ fetchUser 稳定

  return <div>{user?.name}</div>
}
```

## 5. 🆚 useMemo vs useCallback

| 特性 | useMemo | useCallback |
| --- | --- | --- |
| 缓存内容 | 计算结果（任何值） | 函数引用 |
| 返回值 | 计算函数的返回值 | 函数本身 |
| 使用场景 | 昂贵的计算、对象/数组 | 事件处理函数 |
| 典型用法 | `useMemo(() => value, deps)` | `useCallback(() => {}, deps)` |
| 等价关系 | - | `useCallback(fn, deps)` = `useMemo(() => fn, deps)` |

```typescript
// 它们的关系
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b])

// useCallback 实际上是 useMemo 的语法糖
const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b)
}, [a, b])

// 实际例子
function Component() {
  // useMemo：缓存计算结果
  const sortedList = useMemo(() => {
    return data.sort((a, b) => a - b)
  }, [data])

  // useCallback：缓存函数
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return <div>{/* ... */}</div>
}
```

## 6. 🤔 何时使用这些优化？

根据实际性能问题决定是否使用。

```typescript
// 场景 1：昂贵的计算
function PrimeCalculator({ max }: { max: number }) {
  // ✅ 计算质数是昂贵操作，值得优化
  const primes = useMemo(() => {
    const result = []
    for (let i = 2; i <= max; i++) {
      let isPrime = true
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          isPrime = false
          break
        }
      }
      if (isPrime) result.push(i)
    }
    return result
  }, [max])

  return <div>{primes.length} 个质数</div>
}

// 场景 2：引用相等性很重要
function Parent() {
  const [text, setText] = useState('')

  // ✅ config 作为 props 传递，需要保持引用稳定
  const config = useMemo(
    () => ({
      maxLength: 100,
      placeholder: '请输入',
    }),
    []
  )

  return <ExpensiveChild config={config} />
}

const ExpensiveChild = React.memo(({ config }: { config: Config }) => {
  return <div>{/* ... */}</div>
})

// 场景 3：大列表渲染
function UserList({ users }: { users: User[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  // ✅ 过滤大量数据，值得优化
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])

  const handleDelete = useCallback((id: string) => {
    // 删除逻辑
  }, [])

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <UserItem key={user.id} user={user} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  )
}
```

使用指南：应该使用的情况包括计算成本高、引用相等性影响子组件渲染、依赖项变化频率低、创建对象或数组作为其他 Hook 的依赖；不应该使用的情况包括简单的计算、每次都会变化的依赖项、没有子组件依赖这些值、过度优化导致代码复杂。

## 7. 🤔 何时不应该使用？

过度使用会增加复杂度且无益。

```typescript
// ❌ 不必要的优化示例

// 1. 简单计算
function Component({ a, b }: { a: number; b: number }) {
  // ❌ 不需要：加法很快
  const sum = useMemo(() => a + b, [a, b])

  // ✅ 直接计算即可
  const sum2 = a + b
}

// 2. 基本类型
function Component({ name }: { name: string }) {
  // ❌ 不需要：字符串已经是不可变的
  const uppercaseName = useMemo(() => name.toUpperCase(), [name])

  // ✅ 直接操作即可
  const uppercaseName2 = name.toUpperCase()
}

// 3. 没有子组件依赖
function Component() {
  // ❌ 不需要：没有传递给任何组件
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  // ✅ 直接定义即可（除非传给 memo 子组件）
  const handleClick2 = () => {
    console.log('clicked')
  }

  return <button onClick={handleClick2}>Click</button>
}

// 4. 依赖项总是变化
function Component({ data }: { data: Data[] }) {
  // ❌ 不需要：data 每次都变化，缓存无意义
  const processed = useMemo(() => processData(data), [data])
}

// 5. 过度嵌套
function Component() {
  // ❌ 过度优化，难以维护
  const value1 = useMemo(() => compute1(), [])
  const value2 = useMemo(() => compute2(value1), [value1])
  const value3 = useMemo(() => compute3(value2), [value2])

  // ✅ 简单直接
  const finalValue = compute3(compute2(compute1()))
}
```

性能分析优先：先测量，再优化。步骤包括先不优化观察性能、使用 React DevTools Profiler 分析、确认是计算导致的问题后再添加 useMemo、再次测量确认优化有效。

## 8. 🤔 如何与 React.memo 配合？

必须配合使用才能真正避免重新渲染。

```typescript
// React.memo 基础
const Child = React.memo(function Child({ name }: { name: string }) {
  console.log('Child 渲染')
  return <div>{name}</div>
})

// ❌ 错误：没有使用 useMemo/useCallback
function Parent() {
  const [count, setCount] = useState(0)

  const config = { theme: 'dark' } // ❌ 每次都是新对象
  const handleClick = () => console.log('clicked') // ❌ 每次都是新函数

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoChild config={config} onClick={handleClick} />
      {/* ❌ 即使使用了 React.memo，仍然每次都重新渲染 */}
    </div>
  )
}

const MemoChild = React.memo(function MemoChild({
  config,
  onClick,
}: {
  config: { theme: string }
  onClick: () => void
}) {
  console.log('MemoChild 渲染') // ❌ 每次 Parent 渲染都会执行
  return <div onClick={onClick}>{config.theme}</div>
})

// ✅ 正确：使用 useMemo 和 useCallback
function Parent() {
  const [count, setCount] = useState(0)

  const config = useMemo(() => ({ theme: 'dark' }), []) // ✅ 稳定引用
  const handleClick = useCallback(() => console.log('clicked'), []) // ✅ 稳定引用

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoChild config={config} onClick={handleClick} />
      {/* ✅ count 变化时，MemoChild 不会重新渲染 */}
    </div>
  )
}
```

完整示例：

```typescript
interface User {
  id: string
  name: string
}

interface Props {
  user: User
  onUpdate: (id: string, name: string) => void
  onDelete: (id: string) => void
}

// 子组件使用 React.memo
const UserCard = React.memo(function UserCard({
  user,
  onUpdate,
  onDelete,
}: Props) {
  console.log('UserCard 渲染:', user.id)

  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={() => onUpdate(user.id, 'New Name')}>Update</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  )
})

// 父组件使用 useCallback
function UserList() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ])
  const [count, setCount] = useState(0)

  const handleUpdate = useCallback((id: string, name: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, name } : u)))
  }, [])

  const handleDelete = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
      {/* ✅ count 变化时，UserCard 不会重新渲染 */}
    </div>
  )
}
```

## 9. 🤔 有哪些常见错误？

```typescript
// 错误 1：遗漏依赖项
function Component({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  // ❌ fetchUser 使用了 userId，但没在依赖项中
  const fetchUser = useCallback(async () => {
    const data = await fetch(`/api/users/${userId}`).then((r) => r.json())
    setUser(data)
  }, []) // ❌ 缺少 userId

  // ✅ 添加依赖
  const fetchUser2 = useCallback(async () => {
    const data = await fetch(`/api/users/${userId}`).then((r) => r.json())
    setUser(data)
  }, [userId])
}

// 错误 2：依赖项过多导致频繁重新创建
function Component({ data }: { data: Data }) {
  // ❌ data 每次都变化，useMemo 失去意义
  const processed = useMemo(() => processData(data), [data])

  // ✅ 只依赖需要的属性
  const processed2 = useMemo(() => processData(data), [data.id, data.value])
}

// 错误 3：在循环中使用
function Component({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map((item) => {
        // ❌ 不要在循环中使用 Hooks
        const value = useMemo(() => item.value * 2, [item.value])
        return <li key={item.id}>{value}</li>
      })}
    </ul>
  )
}

// 错误 4：过度使用导致性能下降
function Component() {
  // ❌ useMemo 本身也有成本
  const a = useMemo(() => 1 + 1, [])
  const b = useMemo(() => 2 + 2, [])

  // ✅ 简单计算直接写
  const a2 = 1 + 1
  const b2 = 2 + 2
}

// 错误 5：忘记 React.memo
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  // ❌ Child 没有用 React.memo，useCallback 没有意义
  return <Child onClick={handleClick} />
}

function Child({ onClick }: { onClick: () => void }) {
  console.log('Child 渲染') // 还是会每次渲染
  return <button onClick={onClick}>Click</button>
}

// ✅ 配合 React.memo
const MemoChild = React.memo(Child)
```

## 10. 🔗 引用

- [useMemo 官方文档][1]
- [useCallback 官方文档][2]
- [React.memo 官方文档][3]
- [性能优化指南][4]

[1]: https://react.dev/reference/react/useMemo
[2]: https://react.dev/reference/react/useCallback
[3]: https://react.dev/reference/react/memo
[4]: https://react.dev/learn/render-and-commit
