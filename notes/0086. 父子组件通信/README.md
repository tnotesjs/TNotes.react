# [0086. 父子组件通信](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0086.%20%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 父组件如何向子组件传递数据？](#3--父组件如何向子组件传递数据)
  - [3.1. 基本用法：通过 props](#31-基本用法通过-props)
  - [3.2. 传递不同类型的数据](#32-传递不同类型的数据)
  - [3.3. 使用展开运算符传递 props](#33-使用展开运算符传递-props)
  - [3.4. 设置默认值](#34-设置默认值)
- [4. 🤔 子组件如何向父组件传递数据？](#4--子组件如何向父组件传递数据)
  - [4.1. 通过回调函数](#41-通过回调函数)
  - [4.2. 传递多个参数](#42-传递多个参数)
  - [4.3. 常见的回调命名模式](#43-常见的回调命名模式)
  - [4.4. 实战示例：表单组件](#44-实战示例表单组件)
- [5. 🤔 如何传递 JSX 元素给子组件？](#5--如何传递-jsx-元素给子组件)
  - [5.1. 使用 children](#51-使用-children)
  - [5.2. 具名插槽（命名的 props）](#52-具名插槽命名的-props)
  - [5.3. 条件渲染 children](#53-条件渲染-children)
  - [5.4. 渲染 props 模式](#54-渲染-props-模式)
  - [5.5. children 作为函数](#55-children-作为函数)
- [6. 🤔 如何使用 ref 访问子组件？](#6--如何使用-ref-访问子组件)
  - [6.1. 函数组件：使用 forwardRef](#61-函数组件使用-forwardref)
  - [6.2. 使用 useImperativeHandle 自定义暴露的方法](#62-使用-useimperativehandle-自定义暴露的方法)
  - [6.3. 类组件：直接使用 ref](#63-类组件直接使用-ref)
  - [6.4. 实战示例：表单验证](#64-实战示例表单验证)
- [7. 🤔 父子组件通信的最佳实践？](#7--父子组件通信的最佳实践)
  - [7.1. 原则 1：保持单向数据流](#71-原则-1保持单向数据流)
  - [7.2. 原则 2：props 应该是只读的](#72-原则-2props-应该是只读的)
  - [7.3. 原则 3：避免过度使用 ref](#73-原则-3避免过度使用-ref)
  - [7.4. 原则 4：合理拆分组件](#74-原则-4合理拆分组件)
  - [7.5. 原则 5：使用 TypeScript 增强类型安全](#75-原则-5使用-typescript-增强类型安全)
- [8. 🤔 父子组件通信的常见错误？](#8--父子组件通信的常见错误)
  - [8.1. 错误 1：直接修改 props](#81-错误-1直接修改-props)
  - [8.2. 错误 2：在子组件中初始化 state](#82-错误-2在子组件中初始化-state)
  - [8.3. 错误 3：忘记传递必要的回调](#83-错误-3忘记传递必要的回调)
  - [8.4. 错误 4：在回调中使用过期的 state](#84-错误-4在回调中使用过期的-state)
  - [8.5. 错误 5：过度传递 props](#85-错误-5过度传递-props)
- [9. 🔗 引用](#9--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 父组件向子组件传递数据（props）
- 子组件向父组件传递数据（回调函数）
- 传递 JSX 元素（children 和具名插槽）
- 使用 ref 访问子组件实例
- 父子组件通信的最佳实践

## 2. 🫧 评价

父子组件通信是 React 中最基础、最常用的通信方式，掌握它是学习 React 的关键。

- 父传子通过 props，这是单向数据流的体现
- 子传父通过回调函数，保持数据流向的清晰
- children 是特殊的 props，用于传递 JSX 内容
- ref 用于特殊场景，但应尽量避免直接操作子组件
- 优先使用 props 和回调，保持组件的可预测性

## 3. 🤔 父组件如何向子组件传递数据？

### 3.1. 基本用法：通过 props

```jsx
// 父组件传递数据
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* ✅ 通过 props 传递数据 */}
      <Child count={count} name="张三" isActive={true} items={[1, 2, 3]} />
    </div>
  )
}

// 子组件接收数据
function Child({ count, name, isActive, items }) {
  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <p>Active: {isActive ? '是' : '否'}</p>
      <p>Items: {items.join(', ')}</p>
    </div>
  )
}
```

### 3.2. 传递不同类型的数据

```jsx
function Parent() {
  const user = {
    name: '张三',
    age: 25,
    email: 'zhang@example.com'
  }

  const handleClick = () => {
    console.log('点击了')
  }

  return (
    <Child
      {/* ✅ 字符串 */}
      title="用户信息"

      {/* ✅ 数字 */}
      count={100}

      {/* ✅ 布尔值 */}
      isVisible={true}

      {/* ✅ 对象 */}
      user={user}

      {/* ✅ 数组 */}
      tags={['React', 'JavaScript']}

      {/* ✅ 函数 */}
      onClick={handleClick}

      {/* ✅ JSX 元素 */}
      icon={<span>🔥</span>}
    />
  )
}

function Child({ title, count, isVisible, user, tags, onClick, icon }) {
  return (
    <div>
      <h2>{icon} {title}</h2>
      <p>数量：{count}</p>
      {isVisible && <p>可见</p>}
      <p>用户：{user.name}</p>
      <p>标签：{tags.join(', ')}</p>
      <button onClick={onClick}>点击</button>
    </div>
  )
}
```

### 3.3. 使用展开运算符传递 props

```jsx
function Parent() {
  const userProps = {
    name: '张三',
    age: 25,
    email: 'zhang@example.com',
  }

  return (
    <div>
      {/* ✅ 展开对象传递 props */}
      <UserInfo {...userProps} />

      {/* ✅ 可以覆盖或添加额外的 props */}
      <UserInfo {...userProps} age={30} role="admin" />
    </div>
  )
}

function UserInfo({ name, age, email, role = 'user' }) {
  return (
    <div>
      <p>姓名：{name}</p>
      <p>年龄：{age}</p>
      <p>邮箱：{email}</p>
      <p>角色：{role}</p>
    </div>
  )
}
```

### 3.4. 设置默认值

::: code-group

```jsx [方式 1：参数默认值]
function Child({ name = '默认名称', count = 0, isActive = false }) {
  return (
    <div>
      {name} - {count}
    </div>
  )
}
```

```jsx [方式 2：defaultProps]
function Child({ name, count, isActive }) {
  return (
    <div>
      {name} - {count}
    </div>
  )
}

Child.defaultProps = {
  name: '默认名称',
  count: 0,
  isActive: false,
}
```

```jsx [方式 3：解构时赋值]
function Child(props) {
  const { name = '默认名称', count = 0, isActive = false } = props

  return (
    <div>
      {name} - {count}
    </div>
  )
}
```

:::

## 4. 🤔 子组件如何向父组件传递数据？

### 4.1. 通过回调函数

```jsx
// 父组件定义回调函数
function Parent() {
  const [message, setMessage] = useState('')

  // ✅ 定义回调函数
  const handleMessage = (msg) => {
    setMessage(msg)
    console.log('收到消息：', msg)
  }

  return (
    <div>
      <p>父组件收到：{message}</p>
      {/* ✅ 传递回调函数给子组件 */}
      <Child onMessage={handleMessage} />
    </div>
  )
}

// 子组件调用回调函数
function Child({ onMessage }) {
  const sendMessage = () => {
    // ✅ 调用父组件传入的回调
    onMessage('Hello from Child')
  }

  return <button onClick={sendMessage}>发送消息</button>
}
```

### 4.2. 传递多个参数

```jsx
function Parent() {
  const handleSubmit = (name, age, email) => {
    console.log('提交表单：', { name, age, email })
  }

  return <Form onSubmit={handleSubmit} />
}

function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // ✅ 传递多个参数
    onSubmit(formData.name, formData.age, formData.email)

    // 或者传递整个对象
    // onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="submit">提交</button>
    </form>
  )
}
```

### 4.3. 常见的回调命名模式

```jsx
function TodoList() {
  const [todos, setTodos] = useState([])

  return (
    <div>
      {/* ✅ on + 动作：表示事件处理 */}
      <TodoInput onAdd={(text) => setTodos([...todos, text])} />

      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          {/* ✅ on + 动作：表示回调函数 */}
          onDelete={() => setTodos(todos.filter((_, i) => i !== index))}
          onToggle={() => handleToggle(index)}
          onChange={(newText) => handleChange(index, newText)}
        />
      ))}
    </div>
  )
}
```

### 4.4. 实战示例：表单组件

```jsx
function Parent() {
  const [userData, setUserData] = useState(null)
  const [errors, setErrors] = useState(null)

  const handleSubmit = (data) => {
    console.log('表单数据：', data)
    setUserData(data)
  }

  const handleError = (errors) => {
    console.error('表单错误：', errors)
    setErrors(errors)
  }

  const handleChange = (field, value) => {
    console.log(`${field} 变化为：${value}`)
  }

  return (
    <UserForm
      onSubmit={handleSubmit}
      onError={handleError}
      onChange={handleChange}
    />
  )
}

function UserForm({ onSubmit, onError, onChange }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  })

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    // ✅ 通知父组件值变化
    onChange?.(field, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 验证
    const errors = validate(formData)
    if (Object.keys(errors).length > 0) {
      // ✅ 通知父组件有错误
      onError?.(errors)
      return
    }

    // ✅ 通知父组件提交成功
    onSubmit?.(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <button type="submit">提交</button>
    </form>
  )
}
```

## 5. 🤔 如何传递 JSX 元素给子组件？

### 5.1. 使用 children

```jsx
// 父组件传递 children
function Parent() {
  return (
    <Card>
      {/* ✅ children：标签内的内容 */}
      <h2>标题</h2>
      <p>这是卡片内容</p>
    </Card>
  )
}

// 子组件接收 children
function Card({ children }) {
  return (
    <div className="card">
      <div className="card-body">
        {/* ✅ 渲染 children */}
        {children}
      </div>
    </div>
  )
}
```

### 5.2. 具名插槽（命名的 props）

```jsx
function Parent() {
  return (
    <Layout
      {/* ✅ 具名插槽：传递不同位置的内容 */}
      header={<Header />}
      sidebar={<Sidebar />}
      footer={<Footer />}
    >
      {/* children：主要内容区 */}
      <MainContent />
    </Layout>
  )
}

function Layout({ header, sidebar, footer, children }) {
  return (
    <div className="layout">
      <div className="header">{header}</div>
      <div className="container">
        <div className="sidebar">{sidebar}</div>
        <div className="main">{children}</div>
      </div>
      <div className="footer">{footer}</div>
    </div>
  )
}
```

### 5.3. 条件渲染 children

```jsx
function Dialog({ title, children, footer, onClose }) {
  return (
    <div className="dialog">
      {/* ✅ 标题：可选 */}
      {title && (
        <div className="dialog-header">
          <h3>{title}</h3>
          <button onClick={onClose}>×</button>
        </div>
      )}

      {/* ✅ 内容：必需 */}
      <div className="dialog-body">{children}</div>

      {/* ✅ 底部：可选 */}
      {footer && <div className="dialog-footer">{footer}</div>}
    </div>
  )
}

// 使用
function App() {
  return (
    <Dialog
      title="确认删除"
      footer={
        <>
          <button>取消</button>
          <button>确认</button>
        </>
      }
    >
      <p>确定要删除这条记录吗？</p>
    </Dialog>
  )
}
```

### 5.4. 渲染 props 模式

```jsx
function DataProvider({ render, data }) {
  return <div>{render(data)}</div>
}

function Parent() {
  const data = { name: '张三', age: 25 }

  return (
    <DataProvider
      data={data}
      {/* ✅ 通过 render prop 自定义渲染 */}
      render={(data) => (
        <div>
          <h2>{data.name}</h2>
          <p>年龄：{data.age}</p>
        </div>
      )}
    />
  )
}
```

### 5.5. children 作为函数

```jsx
function DataList({ data, children }) {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {/* ✅ children 是函数，传递数据给它 */}
          {children(item)}
        </li>
      ))}
    </ul>
  )
}

function Parent() {
  const users = [
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
  ]

  return (
    <DataList data={users}>
      {/* ✅ children 是函数 */}
      {(user) => (
        <div>
          <strong>{user.name}</strong> - {user.age}岁
        </div>
      )}
    </DataList>
  )
}
```

## 6. 🤔 如何使用 ref 访问子组件？

### 6.1. 函数组件：使用 forwardRef

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react'

// 子组件：使用 forwardRef 暴露 ref
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />
})

// 父组件：通过 ref 访问子组件
function Parent() {
  const inputRef = useRef(null)

  const focusInput = () => {
    // ✅ 访问子组件的 DOM
    inputRef.current.focus()
  }

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  )
}
```

### 6.2. 使用 useImperativeHandle 自定义暴露的方法

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null)

  // ✅ 自定义暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus()
    },
    clear() {
      inputRef.current.value = ''
    },
    getValue() {
      return inputRef.current.value
    },
  }))

  return <input ref={inputRef} {...props} />
})

function Parent() {
  const inputRef = useRef(null)

  const handleClick = () => {
    // ✅ 调用子组件暴露的方法
    inputRef.current.focus()
    console.log(inputRef.current.getValue())
    inputRef.current.clear()
  }

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>操作</button>
    </div>
  )
}
```

### 6.3. 类组件：直接使用 ref

```jsx
class ChildClass extends React.Component {
  state = { count: 0 }

  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }

  getCount = () => {
    return this.state.count
  }

  render() {
    return <div>Count: {this.state.count}</div>
  }
}

function Parent() {
  const childRef = useRef(null)

  const handleClick = () => {
    // ✅ 访问子组件实例
    childRef.current.increment()
    console.log(childRef.current.getCount())
  }

  return (
    <div>
      <ChildClass ref={childRef} />
      <button onClick={handleClick}>增加</button>
    </div>
  )
}
```

### 6.4. 实战示例：表单验证

```jsx
const FormField = forwardRef(({ label, ...props }, ref) => {
  const inputRef = useRef(null)
  const [error, setError] = useState('')

  useImperativeHandle(ref, () => ({
    validate() {
      const value = inputRef.current.value
      if (!value) {
        setError('此字段不能为空')
        return false
      }
      setError('')
      return true
    },
    getValue() {
      return inputRef.current.value
    },
    clear() {
      inputRef.current.value = ''
      setError('')
    },
  }))

  return (
    <div>
      <label>{label}</label>
      <input ref={inputRef} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  )
})

function Form() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // ✅ 调用子组件的验证方法
    const isNameValid = nameRef.current.validate()
    const isEmailValid = emailRef.current.validate()

    if (isNameValid && isEmailValid) {
      const data = {
        name: nameRef.current.getValue(),
        email: emailRef.current.getValue(),
      }
      console.log('提交数据：', data)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField ref={nameRef} label="姓名" />
      <FormField ref={emailRef} label="邮箱" type="email" />
      <button type="submit">提交</button>
    </form>
  )
}
```

## 7. 🤔 父子组件通信的最佳实践？

### 7.1. 原则 1：保持单向数据流

```jsx
// ✅ 好的做法：数据从父组件流向子组件
function Parent() {
  const [count, setCount] = useState(0)

  return <Child count={count} onIncrement={() => setCount(count + 1)} />
}

function Child({ count, onIncrement }) {
  return (
    <div>
      <p>{count}</p>
      <button onClick={onIncrement}>增加</button>
    </div>
  )
}

// ❌ 避免：子组件直接修改 props
function BadChild({ count }) {
  return (
    <button onClick={() => count++}>
      {' '}
      {/* ❌ 不要这样做 */}
      {count}
    </button>
  )
}
```

### 7.2. 原则 2：props 应该是只读的

```jsx
// ❌ 错误：直接修改 props
function BadChild({ user }) {
  const handleUpdate = () => {
    user.name = '新名字' // ❌ 不要修改 props
  }

  return <button onClick={handleUpdate}>更新</button>
}

// ✅ 正确：通过回调通知父组件
function GoodChild({ user, onUpdate }) {
  const handleUpdate = () => {
    onUpdate({ ...user, name: '新名字' }) // ✅ 传递新对象
  }

  return <button onClick={handleUpdate}>更新</button>
}
```

### 7.3. 原则 3：避免过度使用 ref

::: code-group

```jsx [❌ 过度使用 ref]
function BadParent() {
  const childRef = useRef(null)

  const handleClick = () => {
    // ❌ 通过 ref 直接操作子组件
    childRef.current.setValue('new value')
  }

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>更新</button>
    </div>
  )
}
```

```jsx [✅ 使用 props]
function GoodParent() {
  const [value, setValue] = useState('')

  return (
    <div>
      {/* ✅ 通过 props 传递数据 */}
      <Child value={value} onChange={setValue} />
      <button onClick={() => setValue('new value')}>更新</button>
    </div>
  )
}
```

:::

### 7.4. 原则 4：合理拆分组件

```jsx
// ❌ 组件职责不清
function BadForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={address} onChange={(e) => setAddress(e.target.value)} />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />
    </form>
  )
}

// ✅ 拆分为多个组件
function GoodForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  })

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <form>
      <FormInput
        label="姓名"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
      />
      <FormInput
        label="邮箱"
        value={formData.email}
        onChange={(value) => handleChange('email', value)}
      />
    </form>
  )
}
```

### 7.5. 原则 5：使用 TypeScript 增强类型安全

```typescript
// ✅ 定义 props 类型
interface UserCardProps {
  user: {
    id: number
    name: string
    email: string
  }
  onEdit?: (user: UserCardProps['user']) => void
  onDelete?: (id: number) => void
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && <button onClick={() => onEdit(user)}>编辑</button>}
      {onDelete && <button onClick={() => onDelete(user.id)}>删除</button>}
    </div>
  )
}
```

## 8. 🤔 父子组件通信的常见错误？

### 8.1. 错误 1：直接修改 props

```jsx
// ❌ 错误
function BadChild({ items }) {
  const handleAdd = () => {
    items.push('new item') // ❌ 直接修改 props
    // 不会触发重新渲染
  }

  return <button onClick={handleAdd}>添加</button>
}

// ✅ 正确
function GoodChild({ items, onAdd }) {
  const handleAdd = () => {
    onAdd('new item') // ✅ 通过回调
  }

  return <button onClick={handleAdd}>添加</button>
}

function Parent() {
  const [items, setItems] = useState([])

  return (
    <GoodChild items={items} onAdd={(item) => setItems([...items, item])} />
  )
}
```

### 8.2. 错误 2：在子组件中初始化 state

```jsx
// ❌ 错误：从 props 初始化 state
function BadChild({ initialValue }) {
  // ❌ initialValue 变化时不会更新
  const [value, setValue] = useState(initialValue)

  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}

// ✅ 方案 1：使用受控组件
function GoodChild1({ value, onChange }) {
  return <input value={value} onChange={onChange} />
}

// ✅ 方案 2：使用 key 重置
function GoodChild2({ initialValue }) {
  const [value, setValue] = useState(initialValue)
  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}

// 使用时添加 key
;<GoodChild2 key={someId} initialValue={someValue} />

// ✅ 方案 3：使用 useEffect 同步
function GoodChild3({ initialValue }) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}
```

### 8.3. 错误 3：忘记传递必要的回调

```jsx
// ❌ 子组件调用了不存在的回调
function BadChild({ onSubmit }) {
  const handleClick = () => {
    onSubmit() // ❌ 如果父组件没传，会报错
  }

  return <button onClick={handleClick}>提交</button>
}

// ✅ 检查回调是否存在
function GoodChild({ onSubmit }) {
  const handleClick = () => {
    onSubmit?.() // ✅ 可选链
    // 或者
    if (onSubmit) {
      onSubmit()
    }
  }

  return <button onClick={handleClick}>提交</button>
}
```

### 8.4. 错误 4：在回调中使用过期的 state

```jsx
// ❌ 错误
function BadParent() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1) // ❌ 使用了当前的 count
  }

  return <Child onIncrement={handleIncrement} />
}

// 如果快速点击，可能会丢失更新

// ✅ 正确：使用函数式更新
function GoodParent() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((prev) => prev + 1) // ✅ 基于前一个值
  }

  return <Child onIncrement={handleIncrement} />
}
```

### 8.5. 错误 5：过度传递 props

```jsx
// ❌ props 层层传递
function App() {
  const [theme, setTheme] = useState('light')
  return <Level1 theme={theme} setTheme={setTheme} />
}

function Level1({ theme, setTheme }) {
  return <Level2 theme={theme} setTheme={setTheme} />
}

function Level2({ theme, setTheme }) {
  return <Level3 theme={theme} setTheme={setTheme} />
}

function Level3({ theme, setTheme }) {
  return <button onClick={() => setTheme('dark')}>{theme}</button>
}

// ✅ 使用 Context 或状态管理
const ThemeContext = createContext()

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Level1 />
    </ThemeContext.Provider>
  )
}

function Level3() {
  const { theme, setTheme } = useContext(ThemeContext)
  return <button onClick={() => setTheme('dark')}>{theme}</button>
}
```

## 9. 🔗 引用

- [React 官方文档 - Props][1]
- [React 官方文档 - 组件间通信][2]
- [React 官方文档 - Ref 转发][3]

[1]: https://react.dev/learn/passing-props-to-a-component
[2]: https://react.dev/learn/sharing-state-between-components
[3]: https://react.dev/reference/react/forwardRef
