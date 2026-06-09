# [0157. 组件拆分原则与最佳实践](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0157.%20%E7%BB%84%E4%BB%B6%E6%8B%86%E5%88%86%E5%8E%9F%E5%88%99%E4%B8%8E%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 为什么要拆分组件？](#3-为什么要拆分组件)
  - [3.1. 提高代码可维护性](#31-提高代码可维护性)
  - [3.2. 提高代码复用性](#32-提高代码复用性)
  - [3.3. 便于测试和调试](#33-便于测试和调试)
  - [3.4. 优化性能](#34-优化性能)
- [4. 何时应该拆分组件？](#4-何时应该拆分组件)
  - [4.1. 拆分信号](#41-拆分信号)
  - [4.2. 实际案例：判断是否需要拆分](#42-实际案例判断是否需要拆分)
- [5. 如何拆分组件？](#5-如何拆分组件)
  - [5.1. 按职责拆分](#51-按职责拆分)
  - [5.2. 按功能模块拆分](#52-按功能模块拆分)
  - [5.3. 提取可复用的 UI 组件](#53-提取可复用的-ui-组件)
  - [5.4. 提取自定义 Hooks](#54-提取自定义-hooks)
- [6. 常见的拆分模式有哪些？](#6-常见的拆分模式有哪些)
  - [6.1. 容器组件与展示组件](#61-容器组件与展示组件)
  - [6.2. 组合组件模式](#62-组合组件模式)
  - [6.3. 布局组件与内容组件](#63-布局组件与内容组件)
  - [6.4. 高阶组件与 Hooks](#64-高阶组件与-hooks)
- [7. 组件拆分的常见误区是什么？](#7-组件拆分的常见误区是什么)
  - [7.1. 误区 1：过度拆分](#71-误区-1过度拆分)
  - [7.2. 误区 2：按 UI 结构拆分](#72-误区-2按-ui-结构拆分)
  - [7.3. 误区 3：提前优化](#73-误区-3提前优化)
  - [7.4. 误区 4：忽略性能影响](#74-误区-4忽略性能影响)
  - [7.5. 拆分原则总结](#75-拆分原则总结)
- [8. 引用](#8-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 组件拆分的必要性
- 拆分时机判断标准
- 拆分方法和技巧
- 常见拆分模式
- 拆分误区避免
- 实战案例分析

## 2. 评价

本笔记系统讲解了 React 组件拆分的原则和最佳实践，帮助开发者写出更易维护的代码。

- 组件拆分是提高代码可维护性的关键手段，但不是越细越好
- 优先按功能和职责拆分，而不是按 UI 结构拆分
- 合理的组件大小应该是一个函数能在一屏内看完主要逻辑
- 过度拆分会增加理解成本和性能开销，需要在复用性和简洁性之间权衡

## 3. 为什么要拆分组件？

### 3.1. 提高代码可维护性

::: code-group

```jsx [❌ 未拆分的大组件]
function UserDashboard() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('posts')

  useEffect(() => {
    fetchUserData()
    fetchPosts()
    fetchComments()
    fetchFollowers()
    fetchFollowing()
  }, [])

  // 数百行代码...

  return (
    <div className="dashboard">
      {/* 用户信息 - 50 行 */}
      <div className="user-info">
        <img src={user?.avatar} />
        <h1>{user?.name}</h1>
        <p>{user?.bio}</p>
        <div className="stats">
          <span>帖子：{posts.length}</span>
          <span>关注者：{followers.length}</span>
          <span>关注中：{following.length}</span>
        </div>
        <button onClick={handleFollow}>关注</button>
        <button onClick={handleMessage}>私信</button>
      </div>

      {/* 标签页 - 30 行 */}
      <div className="tabs">
        <button onClick={() => setActiveTab('posts')}>帖子</button>
        <button onClick={() => setActiveTab('comments')}>评论</button>
        <button onClick={() => setActiveTab('followers')}>关注者</button>
      </div>

      {/* 内容区 - 100+ 行 */}
      <div className="content">
        {activeTab === 'posts' && (
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div className="actions">
                  <button onClick={() => handleLike(post.id)}>点赞</button>
                  <button onClick={() => handleComment(post.id)}>评论</button>
                  <button onClick={() => handleShare(post.id)}>分享</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* 更多内容... */}
      </div>
    </div>
  )
}
```

```jsx [✅ 拆分后的组件]
// 主组件 - 只负责数据获取和组合
function UserDashboard() {
  const { user, loading } = useUser()
  const [activeTab, setActiveTab] = useState('posts')

  if (loading) return <Loading />

  return (
    <div className="dashboard">
      <UserInfo user={user} />
      <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
      <TabContent tab={activeTab} userId={user.id} />
    </div>
  )
}

// 用户信息组件
function UserInfo({ user }) {
  const { handleFollow, handleMessage } = useUserActions()

  return (
    <div className="user-info">
      <Avatar src={user.avatar} size="large" />
      <UserProfile user={user} />
      <UserStats user={user} />
      <UserActions onFollow={handleFollow} onMessage={handleMessage} />
    </div>
  )
}

// 其他子组件...
```

:::

### 3.2. 提高代码复用性

```jsx
// ✅ 可复用的小组件
function Avatar({ src, size = 'medium', alt }) {
  const sizeMap = {
    small: '32px',
    medium: '48px',
    large: '96px'
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        borderRadius: '50%'
      }}
    />
  )
}

// 多处使用
<Avatar src={user.avatar} size="small" />
<Avatar src={author.avatar} size="large" />
```

### 3.3. 便于测试和调试

```jsx
// ✅ 拆分后的组件更容易测试
describe('UserCard', () => {
  it('应该显示用户名', () => {
    render(<UserCard user={{ name: '张三' }} />)
    expect(screen.getByText('张三')).toBeInTheDocument()
  })

  it('点击关注按钮应该触发回调', () => {
    const onFollow = jest.fn()
    render(<UserCard user={user} onFollow={onFollow} />)
    fireEvent.click(screen.getByText('关注'))
    expect(onFollow).toHaveBeenCalled()
  })
})
```

### 3.4. 优化性能

```jsx
// ✅ 小组件可以单独优化
const UserCard = memo(function UserCard({ user }) {
  console.log('UserCard 渲染')
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  )
})

// 当父组件重新渲染时，UserCard 不会重新渲染（如果 user 没变）
```

## 4. 何时应该拆分组件？

### 4.1. 拆分信号

| 信号                    | 说明                                 | 拆分建议 |
| ----------------------- | ------------------------------------ | -------- |
| 代码行数超过 200-300 行 | 组件过大，难以理解                   | 强烈建议 |
| 有重复代码              | 相似的 UI 或逻辑出现多次             | 建议     |
| 单个函数功能过多        | 职责不单一                           | 建议     |
| JSX 嵌套层级过深        | 超过 5-6 层                          | 建议     |
| 难以命名                | 组件做的事情太多，难以用简短名称描述 | 强烈建议 |
| 难以测试                | 需要 mock 很多东西才能测试           | 建议     |

### 4.2. 实际案例：判断是否需要拆分

::: code-group

```jsx [场景 1：代码过长]
// ❌ 300+ 行的组件
function ProductPage() {
  // 100 行状态和副作用
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [recommendations, setRecommendations] = useState([])
  // ...更多状态

  // 100 行事件处理函数
  const handleAddToCart = () => {
    /* ... */
  }
  const handleBuyNow = () => {
    /* ... */
  }
  const handleReview = () => {
    /* ... */
  }
  // ...更多函数

  // 100+ 行 JSX
  return <div>...</div>
}

// ✅ 拆分后
function ProductPage() {
  const { product, loading } = useProduct()

  if (loading) return <Loading />

  return (
    <>
      <ProductHeader product={product} />
      <ProductImages images={product.images} />
      <ProductInfo product={product} />
      <ProductReviews productId={product.id} />
      <ProductRecommendations productId={product.id} />
    </>
  )
}
```

```jsx [场景 2：有重复代码]
// ❌ 重复的卡片 UI
function Dashboard() {
  return (
    <div>
      <div className="card">
        <h3>今日访问</h3>
        <p className="number">1,234</p>
        <span className="trend up">+12%</span>
      </div>

      <div className="card">
        <h3>总用户数</h3>
        <p className="number">5,678</p>
        <span className="trend up">+5%</span>
      </div>

      <div className="card">
        <h3>销售额</h3>
        <p className="number">¥12,345</p>
        <span className="trend down">-3%</span>
      </div>
    </div>
  )
}

// ✅ 提取公共组件
function StatCard({ title, value, trend }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="number">{value}</p>
      <span className={`trend ${trend.direction}`}>{trend.value}</span>
    </div>
  )
}

function Dashboard() {
  const stats = [
    {
      title: '今日访问',
      value: '1,234',
      trend: { direction: 'up', value: '+12%' },
    },
    {
      title: '总用户数',
      value: '5,678',
      trend: { direction: 'up', value: '+5%' },
    },
    {
      title: '销售额',
      value: '¥12,345',
      trend: { direction: 'down', value: '-3%' },
    },
  ]

  return (
    <div>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
```

```jsx [场景 3：嵌套过深]
// ❌ JSX 嵌套过深
function CommentList() {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <div className="comment-header">
            <div className="user-info">
              <div className="avatar">
                <img src={comment.user.avatar} />
              </div>
              <div className="user-details">
                <span className="username">{comment.user.name}</span>
                <span className="date">{comment.date}</span>
              </div>
            </div>
            <div className="actions">
              <button>点赞</button>
              <button>回复</button>
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ✅ 拆分减少嵌套
function CommentList({ comments }) {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

function Comment({ comment }) {
  return (
    <div className="comment">
      <CommentHeader user={comment.user} date={comment.date} />
      <CommentBody text={comment.text} />
    </div>
  )
}

function CommentHeader({ user, date }) {
  return (
    <div className="comment-header">
      <UserInfo user={user} date={date} />
      <CommentActions />
    </div>
  )
}
```

:::

## 5. 如何拆分组件？

### 5.1. 按职责拆分

```jsx
// ✅ 按职责拆分：容器组件 vs 展示组件
// 容器组件：负责数据和逻辑
function UserListContainer() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter((u) => u.id !== id))
    })
  }

  return <UserList users={users} loading={loading} onDelete={handleDelete} />
}

// 展示组件：只负责 UI 渲染
function UserList({ users, loading, onDelete }) {
  if (loading) return <Loading />

  return (
    <ul>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} onDelete={onDelete} />
      ))}
    </ul>
  )
}
```

### 5.2. 按功能模块拆分

```jsx
// ✅ 按功能模块拆分
function ShoppingCart() {
  return (
    <div className="cart">
      <CartHeader />
      <CartItemList />
      <CartSummary />
      <CartActions />
    </div>
  )
}

function CartHeader() {
  return (
    <div className="cart-header">
      <h2>购物车</h2>
      <CartItemCount />
    </div>
  )
}

function CartItemList() {
  const { items } = useCart()

  return (
    <div className="cart-items">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  )
}

function CartSummary() {
  const { total, discount } = useCart()

  return (
    <div className="cart-summary">
      <div>小计：¥{total}</div>
      <div>优惠：-¥{discount}</div>
      <div>总计：¥{total - discount}</div>
    </div>
  )
}
```

### 5.3. 提取可复用的 UI 组件

```jsx
// ✅ 提取通用的 UI 组件
function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// 多处使用
<Button variant="primary">确定</Button>
<Button variant="secondary" size="small">取消</Button>
<Button variant="danger" disabled>删除</Button>
```

### 5.4. 提取自定义 Hooks

```jsx
// ✅ 提取逻辑到自定义 Hook
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    // 验证逻辑
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return { values, errors, handleChange, validate }
}

// 在组件中使用
function LoginForm() {
  const { values, errors, handleChange, validate } = useForm({
    username: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      login(values)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.username}
        onChange={(e) => handleChange('username', e.target.value)}
      />
      {errors.username && <span>{errors.username}</span>}
      {/* 更多字段 */}
    </form>
  )
}
```

## 6. 常见的拆分模式有哪些？

### 6.1. 容器组件与展示组件

```jsx
// 容器组件 - 处理数据和逻辑
function TodoListContainer() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  return <TodoList todos={todos} onAdd={addTodo} onToggle={toggleTodo} />
}

// 展示组件 - 纯粹的 UI
function TodoList({ todos, onAdd, onToggle }) {
  const [input, setInput] = useState('')

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button
        onClick={() => {
          onAdd(input)
          setInput('')
        }}
      >
        添加
      </button>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
        ))}
      </ul>
    </div>
  )
}
```

### 6.2. 组合组件模式

```jsx
// ✅ 组合组件：提供灵活性
function Card({ children }) {
  return <div className="card">{children}</div>
}

Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>
}

Card.Body = function CardBody({ children }) {
  return <div className="card-body">{children}</div>
}

Card.Footer = function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>
}

// 使用时非常灵活
function UserProfile() {
  return (
    <Card>
      <Card.Header>
        <h2>用户信息</h2>
      </Card.Header>
      <Card.Body>
        <p>姓名：张三</p>
        <p>邮箱：zhangsan@example.com</p>
      </Card.Body>
      <Card.Footer>
        <button>编辑</button>
      </Card.Footer>
    </Card>
  )
}
```

### 6.3. 布局组件与内容组件

```jsx
// ✅ 布局组件：处理布局
function PageLayout({ children }) {
  return (
    <div className="page-layout">
      <Header />
      <Sidebar />
      <main className="content">{children}</main>
      <Footer />
    </div>
  )
}

// 内容组件：关注业务逻辑
function UserPage() {
  return (
    <PageLayout>
      <UserProfile />
      <UserPosts />
    </PageLayout>
  )
}

function ProductPage() {
  return (
    <PageLayout>
      <ProductDetails />
      <ProductReviews />
    </PageLayout>
  )
}
```

### 6.4. 高阶组件与 Hooks

```jsx
// ✅ 使用自定义 Hook 代替 HOC
function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth().then((userData) => {
      setUser(userData)
      setLoading(false)
    })
  }, [])

  return { user, loading }
}

// 在组件中使用
function ProtectedPage() {
  const { user, loading } = useAuth()

  if (loading) return <Loading />
  if (!user) return <Redirect to="/login" />

  return <div>受保护的内容</div>
}
```

## 7. 组件拆分的常见误区是什么？

### 7.1. 误区 1：过度拆分

::: code-group

```jsx [❌ 过度拆分]
// 拆分得太细，反而增加理解成本
function UserCard({ user }) {
  return (
    <div className="card">
      <UserCardAvatar src={user.avatar} />
      <UserCardName name={user.name} />
      <UserCardEmail email={user.email} />
      <UserCardPhone phone={user.phone} />
    </div>
  )
}

// 这些组件太简单，没有复用价值
function UserCardName({ name }) {
  return <h3>{name}</h3>
}

function UserCardEmail({ email }) {
  return <p>{email}</p>
}

function UserCardPhone({ phone }) {
  return <p>{phone}</p>
}
```

```jsx [✅ 合理拆分]
// 保持适当的粒度
function UserCard({ user }) {
  return (
    <div className="card">
      <Avatar src={user.avatar} size="large" />
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
    </div>
  )
}

// 只拆分有复用价值的组件
function Avatar({ src, size = 'medium' }) {
  return <img src={src} className={`avatar avatar-${size}`} />
}
```

:::

### 7.2. 误区 2：按 UI 结构拆分

```jsx
// ❌ 机械地按 UI 结构拆分
function Page() {
  return (
    <div>
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </div>
  )
}

// ✅ 按功能和职责拆分
function ProductPage() {
  return (
    <div>
      <ProductHeader />
      <ProductGallery />
      <ProductDetails />
      <ProductReviews />
      <RelatedProducts />
    </div>
  )
}
```

### 7.3. 误区 3：提前优化

```jsx
// ❌ 还没开始写就想着拆分
// 先写出可工作的代码，再根据需要拆分

// ✅ 先实现功能，再重构
// 1. 写出可工作的组件
function TodoList() {
  // 实现功能...
  return <div>...</div>
}

// 2. 发现问题后再拆分
// - 组件太大？拆分！
// - 有重复代码？提取！
// - 难以测试？拆分！
```

### 7.4. 误区 4：忽略性能影响

```jsx
// ⚠️ 过度拆分可能影响性能
function ExpensiveList({ items }) {
  return (
    <div>
      {items.map((item) => (
        // 每个 item 都是一个组件，可能导致大量重渲染
        <ExpensiveItem key={item.id} item={item} />
      ))}
    </div>
  )
}

// ✅ 使用 memo 优化
const ExpensiveItem = memo(function ExpensiveItem({ item }) {
  return <div>{item.name}</div>
})

// 或者在合适的情况下不拆分
function SimpleList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

### 7.5. 拆分原则总结

| 原则       | 说明                               |
| ---------- | ---------------------------------- |
| 单一职责   | 每个组件只做一件事                 |
| 合理粒度   | 不要拆得太细或太粗                 |
| 复用优先   | 优先拆分可复用的部分               |
| 性能考虑   | 注意拆分对性能的影响               |
| 可测试性   | 拆分后应该更容易测试               |
| 渐进式重构 | 不要提前优化，根据实际需要逐步拆分 |
| 命名清晰   | 组件名应该清楚地表达其功能         |
| 保持一致性 | 团队内保持统一的拆分风格           |

## 8. 引用

- [React 官方文档 - 组件与组合][1]
- [React 官方文档 - 提取组件][2]
- [Thinking in React][3]
- [组件设计原则][4]

[1]: https://react.dev/learn/thinking-in-react
[2]: https://react.dev/learn/extracting-state-logic-into-a-reducer
[3]: https://react.dev/learn
[4]: https://kentcdodds.com/blog/when-to-break-up-a-component-into-multiple-components
