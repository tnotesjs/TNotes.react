# [0159. 组件组合 vs 组件继承](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0159.%20%E7%BB%84%E4%BB%B6%E7%BB%84%E5%90%88%20vs%20%E7%BB%84%E4%BB%B6%E7%BB%A7%E6%89%BF)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🆚 基本概念对比](#3--基本概念对比)
  - [3.1. 核心差异](#31-核心差异)
  - [3.2. 组合定义](#32-组合定义)
  - [3.3. 继承定义](#33-继承定义)
- [4. 🆚 实现方式对比](#4--实现方式对比)
  - [4.1. 场景：实现不同类型的对话框](#41-场景实现不同类型的对话框)
  - [4.2. 场景：实现专门化组件](#42-场景实现专门化组件)
- [5. 🤔 为什么 React 推荐组合而非继承？](#5--为什么-react-推荐组合而非继承)
  - [5.1. 原因 1：组合更灵活](#51-原因-1组合更灵活)
  - [5.2. 原因 2：避免深层继承链](#52-原因-2避免深层继承链)
  - [5.3. 原因 3：组合更符合 React 理念](#53-原因-3组合更符合-react-理念)
  - [5.4. 原因 4：更容易测试和维护](#54-原因-4更容易测试和维护)
- [6. 🤔 如何使用组合模式？](#6--如何使用组合模式)
  - [6.1. 方式 1：使用 children 属性](#61-方式-1使用-children-属性)
  - [6.2. 方式 2：使用具名插槽](#62-方式-2使用具名插槽)
  - [6.3. 方式 3：使用 Render Props](#63-方式-3使用-render-props)
  - [6.4. 方式 4：使用高阶组件（HOC）](#64-方式-4使用高阶组件hoc)
  - [6.5. 方式 5：使用自定义 Hooks](#65-方式-5使用自定义-hooks)
  - [6.6. 实战示例：可配置的表格组件](#66-实战示例可配置的表格组件)
- [7. � 什么时候可以考虑继承？](#7--什么时候可以考虑继承)
  - [7.1. 场景 1：扩展第三方类组件](#71-场景-1扩展第三方类组件)
  - [7.2. 场景 2：抽象基类（很少使用）](#72-场景-2抽象基类很少使用)
  - [7.3. 推荐：用组合替代继承](#73-推荐用组合替代继承)
- [8. 🔗 引用](#8--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 组合和继承的定义
- 实现方式的差异
- React 推荐组合的原因
- 组合模式的实践方法
- 继承的适用场景

## 2. 🫧 评价

React 官方明确推荐使用组合而非继承来实现组件间的代码复用。

- 组合模式更符合 React 的设计理念，提供更好的灵活性
- 通过 `props` 和 `children` 可以实现几乎所有的复用场景
- 继承会带来紧耦合，降低组件的可维护性
- 在 React 生态中，很少看到使用继承的实践案例

## 3. 🆚 基本概念对比

### 3.1. 核心差异

| 特性       | 组合           | 继承           |
| ---------- | -------------- | -------------- |
| 关系       | `has-a` 关系   | `is-a` 关系    |
| 耦合度     | 低耦合         | 高耦合         |
| 灵活性     | 高，运行时可变 | 低，编译时确定 |
| 代码复用   | 通过组件嵌套   | 通过类继承     |
| React 推荐 | ✅ 推荐        | ❌ 不推荐      |

### 3.2. 组合定义

组合是通过将小组件组装成大组件来实现代码复用。

```jsx
// ✅ 组合：Dialog 包含 Button
function Dialog({ children }) {
  return (
    <div className="dialog">
      {children}
      <Button>关闭</Button>
    </div>
  )
}

function App() {
  return (
    <Dialog>
      <h1>标题</h1>
      <p>内容</p>
    </Dialog>
  )
}
```

### 3.3. 继承定义

继承是通过创建基类的子类来实现代码复用。

```jsx
// ❌ 继承：WelcomeDialog 继承自 Dialog
class Dialog extends React.Component {
  render() {
    return <div className="dialog">{this.props.children}</div>
  }
}

class WelcomeDialog extends Dialog {
  render() {
    return (
      <div>
        <h1>欢迎</h1>
        {super.render()}
      </div>
    )
  }
}
```

## 4. 🆚 实现方式对比

### 4.1. 场景：实现不同类型的对话框

::: code-group

```jsx [❌ 继承方式]
// ❌ 使用继承，耦合度高
class BaseDialog extends React.Component {
  render() {
    return (
      <div className="dialog">
        <div className="dialog-content">{this.renderContent()}</div>
        <div className="dialog-footer">
          <button onClick={this.props.onClose}>关闭</button>
        </div>
      </div>
    )
  }

  renderContent() {
    // ❌ 子类必须实现
    throw new Error('必须实现 renderContent 方法')
  }
}

class WelcomeDialog extends BaseDialog {
  renderContent() {
    return (
      <>
        <h1>欢迎</h1>
        <p>欢迎使用我们的应用</p>
      </>
    )
  }
}

class ConfirmDialog extends BaseDialog {
  renderContent() {
    return (
      <>
        <h1>确认</h1>
        <p>确定要删除吗？</p>
      </>
    )
  }
}
```

```jsx [✅ 组合方式]
// ✅ 使用组合，灵活度高
function Dialog({ title, content, onClose, footer }) {
  return (
    <div className="dialog">
      <div className="dialog-content">
        <h1>{title}</h1>
        <div>{content}</div>
      </div>
      <div className="dialog-footer">
        {footer || <button onClick={onClose}>关闭</button>}
      </div>
    </div>
  )
}

// ✅ 通过 props 定制不同对话框
function WelcomeDialog({ onClose }) {
  return (
    <Dialog
      title="欢迎"
      content={<p>欢迎使用我们的应用</p>}
      onClose={onClose}
    />
  )
}

function ConfirmDialog({ onClose, onConfirm }) {
  return (
    <Dialog
      title="确认"
      content={<p>确定要删除吗？</p>}
      onClose={onClose}
      footer={
        <>
          <button onClick={onConfirm}>确定</button>
          <button onClick={onClose}>取消</button>
        </>
      }
    />
  )
}
```

:::

### 4.2. 场景：实现专门化组件

::: code-group

```jsx [❌ 继承方式]
// ❌ 使用继承，难以扩展
class Button extends React.Component {
  render() {
    return (
      <button className={this.getClassName()} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }

  getClassName() {
    return 'button'
  }
}

class PrimaryButton extends Button {
  getClassName() {
    return 'button button-primary'
  }
}

class DangerButton extends Button {
  getClassName() {
    return 'button button-danger'
  }
}
```

```jsx [✅ 组合方式]
// ✅ 使用组合，易于扩展
function Button({ variant = 'default', children, ...props }) {
  const className = `button button-${variant}`

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}

// ✅ 使用时更简洁
function App() {
  return (
    <>
      <Button variant="primary">主要按钮</Button>
      <Button variant="danger">危险按钮</Button>
      <Button>默认按钮</Button>
    </>
  )
}
```

:::

## 5. 🤔 为什么 React 推荐组合而非继承？

### 5.1. 原因 1：组合更灵活

```jsx
// ✅ 组合可以动态改变行为
function Panel({ variant, children }) {
  // 可以根据 props 动态决定渲染逻辑
  const Icon = variant === 'success' ? SuccessIcon : ErrorIcon

  return (
    <div className={`panel panel-${variant}`}>
      <Icon />
      {children}
    </div>
  )
}

// ❌ 继承在编译时就固定了
class Panel extends React.Component {
  // 子类必须在编译时确定
}
```

### 5.2. 原因 2：避免深层继承链

```jsx
// ❌ 继承容易形成复杂的继承链
class Component extends React.Component {}
class BaseButton extends Component {}
class StyledButton extends BaseButton {}
class IconButton extends StyledButton {}
class PrimaryIconButton extends IconButton {} // 难以维护

// ✅ 组合保持扁平结构
function PrimaryIconButton({ icon, children, ...props }) {
  return (
    <Button variant="primary" {...props}>
      <Icon name={icon} />
      {children}
    </Button>
  )
}
```

### 5.3. 原因 3：组合更符合 React 理念

```jsx
// ✅ 组合利用 props 和 children，符合 React 数据流
function Card({ header, footer, children }) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// 使用时非常直观
function App() {
  return (
    <Card header={<h2>标题</h2>} footer={<Button>操作</Button>}>
      <p>内容区域</p>
    </Card>
  )
}
```

### 5.4. 原因 4：更容易测试和维护

```jsx
// ✅ 组合的组件职责单一，易于测试
function Avatar({ src, size = 'medium' }) {
  return <img src={src} className={`avatar-${size}`} />
}

function UserInfo({ user }) {
  return (
    <div>
      <Avatar src={user.avatar} size="large" />
      <span>{user.name}</span>
    </div>
  )
}

// ❌ 继承的组件耦合度高，难以测试
class UserInfo extends BaseUserInfo {
  // 必须了解父类的实现细节
}
```

## 6. 🤔 如何使用组合模式？

### 6.1. 方式 1：使用 children 属性

```jsx
// ✅ 最基本的组合方式
function Container({ children }) {
  return <div className="container">{children}</div>
}

function App() {
  return (
    <Container>
      <h1>标题</h1>
      <p>内容</p>
    </Container>
  )
}
```

### 6.2. 方式 2：使用具名插槽

```jsx
// ✅ 通过 props 传递多个组件
function Layout({ header, sidebar, content, footer }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <div className="layout-main">
        <aside>{sidebar}</aside>
        <main>{content}</main>
      </div>
      <footer>{footer}</footer>
    </div>
  )
}

function App() {
  return (
    <Layout
      header={<Header />}
      sidebar={<Sidebar />}
      content={<Content />}
      footer={<Footer />}
    />
  )
}
```

### 6.3. 方式 3：使用 Render Props

```jsx
// ✅ 通过函数 props 实现灵活组合
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [url])

  return render({ data, loading })
}

function App() {
  return (
    <DataFetcher
      url="/api/users"
      render={({ data, loading }) =>
        loading ? <Loading /> : <UserList users={data} />
      }
    />
  )
}
```

### 6.4. 方式 4：使用高阶组件（HOC）

```jsx
// ✅ HOC 也是组合的一种形式
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <Loading />
    return <Component {...props} />
  }
}

const UserListWithLoading = withLoading(UserList)

function App() {
  const [loading, setLoading] = useState(true)

  return <UserListWithLoading isLoading={loading} users={users} />
}
```

### 6.5. 方式 5：使用自定义 Hooks

```jsx
// ✅ Hooks 是最现代的组合方式
function useUser(userId) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser(userId).then((data) => {
      setUser(data)
      setLoading(false)
    })
  }, [userId])

  return { user, loading }
}

function UserProfile({ userId }) {
  const { user, loading } = useUser(userId)

  if (loading) return <Loading />
  return <div>{user.name}</div>
}
```

### 6.6. 实战示例：可配置的表格组件

```jsx
// ✅ 通过组合实现高度可配置的表格
function Table({ columns, data, renderRow }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) =>
          renderRow ? (
            renderRow(row, index)
          ) : (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

// 使用：自定义行渲染
function UserTable({ users }) {
  return (
    <Table
      columns={[
        { key: 'name', title: '姓名' },
        { key: 'email', title: '邮箱' },
      ]}
      data={users}
      renderRow={(user) => (
        <tr key={user.id} className={user.active ? 'active' : ''}>
          <td>
            <Avatar src={user.avatar} />
            {user.name}
          </td>
          <td>{user.email}</td>
        </tr>
      )}
    />
  )
}
```

## 7. � 什么时候可以考虑继承？

### 7.1. 场景 1：扩展第三方类组件

```jsx
// ✅ 扩展第三方库的类组件时可以使用继承
import { PureComponent } from 'react'

class OptimizedComponent extends PureComponent {
  // 添加额外的优化逻辑
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateChart()
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
```

### 7.2. 场景 2：抽象基类（很少使用）

```jsx
// ⚠️ 极少使用：需要强制子类实现某些方法时
class BaseForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const isValid = this.validate()
    if (isValid) {
      this.submit()
    }
  }

  validate() {
    // 子类必须实现
    throw new Error('必须实现 validate 方法')
  }

  submit() {
    // 子类必须实现
    throw new Error('必须实现 submit 方法')
  }
}

class LoginForm extends BaseForm {
  validate() {
    return this.state.username && this.state.password
  }

  submit() {
    api.login(this.state.username, this.state.password)
  }
}
```

### 7.3. 推荐：用组合替代继承

```jsx
// ✅ 更好的方案：使用组合
function Form({ validate, onSubmit, children }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit()
    }
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const validate = () => username && password
  const handleSubmit = () => api.login(username, password)

  return (
    <Form validate={validate} onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">登录</button>
    </Form>
  )
}
```

## 8. 🔗 引用

- [React 官方文档 - 组合 vs 继承][1]
- [React 官方文档 - 组件组合][2]
- [MDN - 对象组合][3]

[1]: https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state
[2]: https://react.dev/learn/passing-props-to-a-component
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
