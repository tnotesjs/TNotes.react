# [0163. Render Props 模式](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0163.%20Render%20Props%20%E6%A8%A1%E5%BC%8F)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 什么是 Render Props？](#3-什么是-render-props)
  - [3.1. 基本概念](#31-基本概念)
  - [3.2. 使用 children 作为函数](#32-使用-children-作为函数)
  - [3.3. 命名的 Render Props](#33-命名的-render-props)
- [4. Render Props 有什么优势？](#4-render-props-有什么优势)
  - [4.1. 优势 1：逻辑复用](#41-优势-1逻辑复用)
  - [4.2. 优势 2：灵活的控制](#42-优势-2灵活的控制)
  - [4.3. 优势 3：避免命名冲突](#43-优势-3避免命名冲突)
- [5. 如何使用 Render Props？](#5-如何使用-render-props)
  - [5.1. 实践 1：数据获取](#51-实践-1数据获取)
  - [5.2. 实践 2：表单状态管理](#52-实践-2表单状态管理)
  - [5.3. 实践 3：列表虚拟化](#53-实践-3列表虚拟化)
  - [5.4. 实践 4：权限控制](#54-实践-4权限控制)
- [6. Render Props vs Hooks？](#6-render-props-vs-hooks)
  - [6.1. 对比表格](#61-对比表格)
  - [6.2. 同一逻辑的两种实现](#62-同一逻辑的两种实现)
  - [6.3. 何时仍使用 Render Props](#63-何时仍使用-render-props)
  - [6.4. 迁移到 Hooks](#64-迁移到-hooks)
- [7. 引用](#7-引用)

<!-- endregion:toc -->

## 1. 本节内容

- Render Props 的定义
- Render Props 的优势
- 使用方法和实践
- 与 Hooks 的对比

## 2. 评价

Render Props 是 React 中实现代码复用的经典模式，通过函数 prop 来共享逻辑。

- Render Props 可以灵活地控制渲染内容，实现逻辑与 UI 的分离
- 在 Hooks 出现之前，是实现逻辑复用的主要方式
- 现在大多数场景可以用 Hooks 替代，但某些情况下仍有价值
- 理解这个模式有助于理解 React 的组件设计思想

## 3. 什么是 Render Props？

### 3.1. 基本概念

Render Props 是指使用值为函数的 prop 来控制组件渲染内容的技术。

```jsx
// ✅ 基本的 Render Props 模式
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // ✅ 调用 render 函数，传入 position
  return render(position)
}

// 使用
function App() {
  return (
    <Mouse
      render={(position) => (
        <div>
          鼠标位置：{position.x}, {position.y}
        </div>
      )}
    />
  )
}
```

### 3.2. 使用 children 作为函数

```jsx
// ✅ children 也可以是 Render Props
function Mouse({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return children(position)
}

// 使用
function App() {
  return (
    <Mouse>
      {(position) => (
        <div>
          当前位置：X={position.x}, Y={position.y}
        </div>
      )}
    </Mouse>
  )
}
```

### 3.3. 命名的 Render Props

```jsx
// ✅ 使用明确的命名
function DataFetcher({ url, renderLoading, renderError, renderData }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  if (loading) return renderLoading()
  if (error) return renderError(error)
  return renderData(data)
}

// 使用
function App() {
  return (
    <DataFetcher
      url="/api/users"
      renderLoading={() => <div>加载中...</div>}
      renderError={(error) => <div>错误：{error.message}</div>}
      renderData={(users) => (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    />
  )
}
```

## 4. Render Props 有什么优势？

### 4.1. 优势 1：逻辑复用

```jsx
// ✅ 同一个逻辑，不同的 UI
function WindowSize({ children }) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return children(size)
}

// 不同的使用方式
function App() {
  return (
    <>
      {/* UI 1 */}
      <WindowSize>
        {(size) => (
          <div>
            窗口大小：{size.width} x {size.height}
          </div>
        )}
      </WindowSize>

      {/* UI 2 */}
      <WindowSize>
        {(size) => (
          <div className={size.width < 768 ? 'mobile' : 'desktop'}>
            响应式内容
          </div>
        )}
      </WindowSize>
    </>
  )
}
```

### 4.2. 优势 2：灵活的控制

```jsx
// ✅ 完全控制渲染逻辑
function Toggle({ children }) {
  const [on, setOn] = useState(false)

  return children({
    on,
    toggle: () => setOn(!on),
    setOn,
    setOff: () => setOn(false),
  })
}

// 使用：可以自由决定如何使用这些状态和方法
function App() {
  return (
    <Toggle>
      {({ on, toggle, setOff }) => (
        <div>
          <p>开关状态：{on ? '开' : '关'}</p>
          <button onClick={toggle}>切换</button>
          <button onClick={setOff}>关闭</button>
        </div>
      )}
    </Toggle>
  )
}
```

### 4.3. 优势 3：避免命名冲突

```jsx
// ✅ 不需要固定的 prop 名称
function App() {
  return (
    <DataFetcher url="/api/posts">
      {(posts) => (
        <DataFetcher url="/api/users">
          {(users) => (
            // ✅ 两个数据源，命名清晰
            <div>
              <PostList posts={posts} />
              <UserList users={users} />
            </div>
          )}
        </DataFetcher>
      )}
    </DataFetcher>
  )
}
```

## 5. 如何使用 Render Props？

### 5.1. 实践 1：数据获取

```jsx
// ✅ 封装数据获取逻辑
function Fetch({ url, children }) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    setState({ data: null, loading: true, error: null })

    fetch(url)
      .then((res) => res.json())
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => setState({ data: null, loading: false, error }))
  }, [url])

  return children(state)
}

// 使用
function UserList() {
  return (
    <Fetch url="/api/users">
      {({ data, loading, error }) => {
        if (loading) return <div>加载中...</div>
        if (error) return <div>错误：{error.message}</div>
        return (
          <ul>
            {data.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )
      }}
    </Fetch>
  )
}
```

### 5.2. 实践 2：表单状态管理

```jsx
// ✅ 封装表单逻辑
function Form({ initialValues = {}, onSubmit, children }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    // 清除错误
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(values)
  }

  return children({
    values,
    errors,
    handleChange,
    handleSubmit,
  })
}

// 使用
function LoginForm() {
  return (
    <Form
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <input
            value={values.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
          <input
            type="password"
            value={values.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <button type="submit">登录</button>
        </form>
      )}
    </Form>
  )
}
```

### 5.3. 实践 3：列表虚拟化

```jsx
// ✅ 封装虚拟滚动逻辑
function VirtualList({ items, itemHeight, children }) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerHeight = 400

  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight)
  const visibleItems = items.slice(startIndex, endIndex)

  return children({
    visibleItems,
    totalHeight: items.length * itemHeight,
    offsetY: startIndex * itemHeight,
    onScroll: (e) => setScrollTop(e.target.scrollTop),
  })
}

// 使用
function App() {
  const items = Array.from({ length: 10000 }, (_, i) => `项目 ${i}`)

  return (
    <VirtualList items={items} itemHeight={40}>
      {({ visibleItems, totalHeight, offsetY, onScroll }) => (
        <div style={{ height: 400, overflow: 'auto' }} onScroll={onScroll}>
          <div style={{ height: totalHeight }}>
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              {visibleItems.map((item, index) => (
                <div key={index} style={{ height: 40 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </VirtualList>
  )
}
```

### 5.4. 实践 4：权限控制

```jsx
// ✅ 封装权限检查逻辑
function Permission({ require, children }) {
  const user = useUser()

  const hasPermission = user?.permissions?.includes(require)

  return children({
    hasPermission,
    user,
  })
}

// 使用
function AdminPanel() {
  return (
    <Permission require="admin">
      {({ hasPermission }) =>
        hasPermission ? <div>管理员面板</div> : <div>无权限访问</div>
      }
    </Permission>
  )
}
```

## 6. Render Props vs Hooks？

### 6.1. 对比表格

| 特性       | Render Props       | Hooks       |
| ---------- | ------------------ | ----------- |
| 语法       | JSX 嵌套           | 函数调用    |
| 可读性     | 嵌套多时难读       | 更清晰      |
| 类组件支持 | ✅ 支持            | ❌ 不支持   |
| 性能       | 每次渲染都创建函数 | 更优        |
| 组合       | 嵌套地狱           | 平铺调用    |
| 当前推荐   | 少用               | ✅ 优先使用 |

### 6.2. 同一逻辑的两种实现

::: code-group

```jsx [Render Props]
// ❌ 嵌套较深
function App() {
  return (
    <Mouse>
      {(mouse) => (
        <WindowSize>
          {(size) => (
            <DataFetcher url="/api/user">
              {({ data, loading }) => {
                if (loading) return <div>加载中...</div>
                return (
                  <div>
                    鼠标：{mouse.x}, {mouse.y}
                    窗口：{size.width}x{size.height}
                    用户：{data.name}
                  </div>
                )
              }}
            </DataFetcher>
          )}
        </WindowSize>
      )}
    </Mouse>
  )
}
```

```jsx [✅ Hooks]
// ✅ 更清晰
function App() {
  const mouse = useMouse()
  const size = useWindowSize()
  const { data, loading } = useFetch('/api/user')

  if (loading) return <div>加载中...</div>

  return (
    <div>
      鼠标：{mouse.x}, {mouse.y}
      窗口：{size.width}x{size.height}
      用户：{data.name}
    </div>
  )
}
```

:::

### 6.3. 何时仍使用 Render Props

```jsx
// ✅ 需要在 JSX 中决定渲染内容时
function List({ items, renderItem, renderEmpty }) {
  if (items.length === 0) {
    return renderEmpty()
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item, index)}</li>
      ))}
    </ul>
  )
}

// 使用
;<List
  items={users}
  renderItem={(user) => <UserCard user={user} />}
  renderEmpty={() => <div>暂无数据</div>}
/>
```

### 6.4. 迁移到 Hooks

::: code-group

```jsx [Render Props 版本]
function Mouse({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return children(position)
}

function App() {
  return (
    <Mouse>
      {(pos) => (
        <div>
          位置：{pos.x}, {pos.y}
        </div>
      )}
    </Mouse>
  )
}
```

```jsx [✅ Hooks 版本]
function useMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return position
}

function App() {
  const pos = useMouse()
  return (
    <div>
      位置：{pos.x}, {pos.y}
    </div>
  )
}
```

:::

## 7. 引用

- [React 官方文档 - Render Props][1]
- [Michael Jackson - Use a Render Prop][2]
- [Kent C. Dodds - Render Props vs Hooks][3]

[1]: https://react.dev/reference/react/Component#providing-a-fallback-for-server-errors-and-client-errors
[2]: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
[3]: https://kentcdodds.com/blog/react-hooks-whats-going-to-happen-to-render-props
