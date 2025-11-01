# [0160. Props 解构与重命名](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0160.%20Props%20%E8%A7%A3%E6%9E%84%E4%B8%8E%E9%87%8D%E5%91%BD%E5%90%8D)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 如何解构 Props？](#3--如何解构-props)
  - [3.1. 基本解构](#31-基本解构)
  - [3.2. 嵌套解构](#32-嵌套解构)
  - [3.3. 数组解构](#33-数组解构)
- [4. 🤔 如何重命名 Props？](#4--如何重命名-props)
  - [4.1. 基本重命名](#41-基本重命名)
  - [4.2. 避免命名冲突](#42-避免命名冲突)
  - [4.3. 重命名后设置默认值](#43-重命名后设置默认值)
- [5. 🤔 如何设置默认值？](#5--如何设置默认值)
  - [5.1. 解构时设置默认值](#51-解构时设置默认值)
  - [5.2. 对象默认值](#52-对象默认值)
  - [5.3. 函数默认值](#53-函数默认值)
  - [5.4. 使用逻辑或运算符](#54-使用逻辑或运算符)
- [6. 🤔 如何处理剩余 Props？](#6--如何处理剩余-props)
  - [6.1. 使用展开运算符](#61-使用展开运算符)
  - [6.2. 过滤特定 Props](#62-过滤特定-props)
  - [6.3. 条件性传递 Props](#63-条件性传递-props)
  - [6.4. 合并 className](#64-合并-classname)
- [7. 🤔 解构的最佳实践是什么？](#7--解构的最佳实践是什么)
  - [7.1. 实践 1：在参数位置解构](#71-实践-1在参数位置解构)
  - [7.2. 实践 2：按使用频率排序](#72-实践-2按使用频率排序)
  - [7.3. 实践 3：避免过度解构](#73-实践-3避免过度解构)
  - [7.4. 实践 4：使用 TypeScript 类型](#74-实践-4使用-typescript-类型)
  - [7.5. 实践 5：解构时进行验证](#75-实践-5解构时进行验证)
  - [7.6. 实践 6：组合默认 Props](#76-实践-6组合默认-props)
- [8. 🔗 引用](#8--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- Props 解构的基本语法
- Props 重命名的方法
- 默认值的设置方式
- 剩余 Props 的处理
- 解构的最佳实践

## 2. 🫧 评价

Props 解构是 React 中常用的技巧，可以让代码更简洁易读。

- 解构可以避免重复书写 `props.xxx`，提高代码可读性
- 重命名功能可以解决命名冲突，让变量名更语义化
- 结合默认值可以简化组件的参数处理
- 合理使用解构能让组件接口更清晰明了

## 3. 🤔 如何解构 Props？

### 3.1. 基本解构

::: code-group

```jsx [❌ 不使用解构]
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <p>{props.age}岁</p>
    </div>
  )
}
```

```jsx [✅ 参数位置解构]
function UserCard({ name, email, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{age}岁</p>
    </div>
  )
}
```

```jsx [✅ 函数体内解构]
function UserCard(props) {
  const { name, email, age } = props

  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{age}岁</p>
    </div>
  )
}
```

:::

### 3.2. 嵌套解构

```jsx
// ✅ 解构嵌套对象
function UserProfile({
  user: {
    name,
    avatar,
    address: { city },
  },
}) {
  return (
    <div>
      <img src={avatar} />
      <h2>{name}</h2>
      <p>来自 {city}</p>
    </div>
  )
}

// 使用
;<UserProfile
  user={{
    name: '张三',
    avatar: '/avatar.jpg',
    address: { city: '北京' },
  }}
/>
```

### 3.3. 数组解构

```jsx
// ✅ 解构数组 props
function ColorPicker({ colors: [primary, secondary, tertiary] }) {
  return (
    <div>
      <div style={{ backgroundColor: primary }}>主色</div>
      <div style={{ backgroundColor: secondary }}>副色</div>
      <div style={{ backgroundColor: tertiary }}>辅色</div>
    </div>
  )
}

// 使用
;<ColorPicker colors={['#ff0000', '#00ff00', '#0000ff']} />
```

## 4. 🤔 如何重命名 Props？

### 4.1. 基本重命名

```jsx
// ✅ 使用冒号重命名
function Button({ className: customClass, children: text }) {
  return <button className={customClass}>{text}</button>
}

// 使用
;<Button className="btn-primary">点击</Button>
```

### 4.2. 避免命名冲突

```jsx
// ✅ 解决与原生属性的冲突
function Input({
  className: wrapperClass,
  inputClassName,
  label,
  ...inputProps
}) {
  return (
    <div className={wrapperClass}>
      <label>{label}</label>
      <input className={inputClassName} {...inputProps} />
    </div>
  )
}

// 使用
;<Input
  className="form-group"
  inputClassName="form-control"
  label="用户名"
  type="text"
  placeholder="请输入"
/>
```

### 4.3. 重命名后设置默认值

```jsx
// ✅ 重命名并设置默认值
function Card({
  title: cardTitle = '默认标题',
  className: wrapperClass = 'card',
  children,
}) {
  return (
    <div className={wrapperClass}>
      <h3>{cardTitle}</h3>
      {children}
    </div>
  )
}
```

## 5. 🤔 如何设置默认值？

### 5.1. 解构时设置默认值

```jsx
// ✅ 在解构时直接设置
function Button({
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children
}) {
  const className = `btn btn-${variant} btn-${size}`

  return (
    <button type={type} className={className} disabled={disabled}>
      {children}
    </button>
  )
}

// 使用时可以不传默认值的 props
<Button>点击</Button>
<Button variant="danger" size="large">删除</Button>
```

### 5.2. 对象默认值

```jsx
// ✅ 嵌套对象的默认值
function UserCard({ user = { name: '匿名用户', avatar: '/default.png' } }) {
  const { name, avatar } = user

  return (
    <div>
      <img src={avatar} />
      <p>{name}</p>
    </div>
  )
}
```

### 5.3. 函数默认值

```jsx
// ✅ 回调函数的默认值
function SearchBox({
  onSearch = () => console.log('未提供搜索函数'),
  placeholder = '请输入关键词',
}) {
  const [value, setValue] = useState('')

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <button onClick={() => onSearch(value)}>搜索</button>
    </div>
  )
}
```

### 5.4. 使用逻辑或运算符

```jsx
// ⚠️ 注意：空字符串、0、false 会被替换
function Title({ text }) {
  // ❌ 如果 text 是 0 或 false，会显示默认值
  return <h1>{text || '默认标题'}</h1>
}

// ✅ 使用空值合并运算符更安全
function Title({ text }) {
  // ✅ 只有 null 或 undefined 才使用默认值
  return <h1>{text ?? '默认标题'}</h1>
}
```

## 6. 🤔 如何处理剩余 Props？

### 6.1. 使用展开运算符

```jsx
// ✅ 提取部分 props，其余传递给子元素
function Input({ label, error, className, ...inputProps }) {
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...inputProps} />
      {error && <span className="error">{error}</span>}
    </div>
  )
}

// 使用：未知的 props 都会传递给 input
;<Input
  label="邮箱"
  type="email"
  placeholder="请输入邮箱"
  required
  maxLength={50}
/>
```

### 6.2. 过滤特定 Props

```jsx
// ✅ 过滤掉自定义 props
function Button({ variant, size, loading, icon, children, ...nativeProps }) {
  return (
    <button
      {...nativeProps}
      className={`btn btn-${variant} btn-${size}`}
      disabled={nativeProps.disabled || loading}
    >
      {loading ? <Spinner /> : icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
```

### 6.3. 条件性传递 Props

```jsx
// ✅ 根据条件决定是否传递某些 props
function Link({ external, newTab, ...props }) {
  const extraProps = {}

  if (external || newTab) {
    extraProps.target = '_blank'
    extraProps.rel = 'noopener noreferrer'
  }

  return <a {...props} {...extraProps} />
}

// 使用
<Link href="/about">关于</Link>
<Link href="https://example.com" external>外部链接</Link>
```

### 6.4. 合并 className

```jsx
// ✅ 合并组件的 className 和传入的 className
function Card({ className, children, ...props }) {
  const cardClass = ['card', className].filter(Boolean).join(' ')

  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  )
}

// 或使用 clsx 库
import clsx from 'clsx'

function Card({ className, variant, children, ...props }) {
  return (
    <div
      className={clsx('card', variant && `card-${variant}`, className)}
      {...props}
    >
      {children}
    </div>
  )
}
```

## 7. 🤔 解构的最佳实践是什么？

### 7.1. 实践 1：在参数位置解构

```jsx
// ✅ 推荐：直接在参数位置解构
function UserCard({ name, email, age }) {
  return <div>{name}</div>
}

// ❌ 不推荐：先接收 props 再解构
function UserCard(props) {
  const { name, email, age } = props
  return <div>{name}</div>
}
```

### 7.2. 实践 2：按使用频率排序

```jsx
// ✅ 常用的放前面，可选的放后面
function Button({
  children, // 必需且常用
  onClick, // 必需且常用
  type = 'button', // 有默认值
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  ...props // 剩余 props 放最后
}) {
  return <button {...props}>{children}</button>
}
```

### 7.3. 实践 3：避免过度解构

```jsx
// ❌ 过度解构，可读性差
function Form({
  user: {
    profile: {
      name,
      email,
      address: { city, street, zipCode },
    },
  },
}) {
  // 难以理解数据结构
}

// ✅ 适度解构
function Form({ user }) {
  const { name, email } = user.profile
  const { city, street } = user.profile.address

  return (
    <div>
      {name} - {city}
    </div>
  )
}
```

### 7.4. 实践 4：使用 TypeScript 类型

```tsx
// ✅ TypeScript 中明确类型
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### 7.5. 实践 5：解构时进行验证

```jsx
// ✅ 解构后立即验证必需参数
function UserProfile({ userId, onUpdate }) {
  if (!userId) {
    throw new Error('userId 是必需参数')
  }

  // 或使用条件渲染
  if (!onUpdate) {
    return <div>缺少 onUpdate 回调</div>
  }

  return <div>用户 {userId}</div>
}
```

### 7.6. 实践 6：组合默认 Props

```jsx
// ✅ 使用对象合并设置复杂默认值
const defaultConfig = {
  theme: 'light',
  showHeader: true,
  showFooter: true,
  maxWidth: 1200,
}

function App({ config = {} }) {
  const finalConfig = { ...defaultConfig, ...config }
  const { theme, showHeader, showFooter, maxWidth } = finalConfig

  return (
    <div className={`theme-${theme}`} style={{ maxWidth }}>
      {showHeader && <Header />}
      <main>内容</main>
      {showFooter && <Footer />}
    </div>
  )
}
```

## 8. 🔗 引用

- [MDN - 解构赋值][1]
- [React 官方文档 - Props][2]
- [JavaScript.info - 解构赋值][3]

[1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[2]: https://react.dev/learn/passing-props-to-a-component
[3]: https://javascript.info/destructuring-assignment
