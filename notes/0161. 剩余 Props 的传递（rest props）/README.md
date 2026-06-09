# [0161. 剩余 Props 的传递（rest props）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0161.%20%E5%89%A9%E4%BD%99%20Props%20%E7%9A%84%E4%BC%A0%E9%80%92%EF%BC%88rest%20props%EF%BC%89)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 什么是剩余 Props？](#3-什么是剩余-props)
  - [3.1. 基本概念](#31-基本概念)
  - [3.2. 与展开运算符的配合](#32-与展开运算符的配合)
- [4. 如何传递剩余 Props？](#4-如何传递剩余-props)
  - [4.1. 直接传递](#41-直接传递)
  - [4.2. 部分覆盖](#42-部分覆盖)
  - [4.3. 条件传递](#43-条件传递)
  - [4.4. 过滤后传递](#44-过滤后传递)
- [5. 使用剩余 Props 的常见场景？](#5-使用剩余-props-的常见场景)
  - [5.1. 场景 1：封装原生元素](#51-场景-1封装原生元素)
  - [5.2. 场景 2：创建包装组件](#52-场景-2创建包装组件)
  - [5.3. 场景 3：实现多态组件](#53-场景-3实现多态组件)
  - [5.4. 场景 4：转发 Props 到子组件](#54-场景-4转发-props-到子组件)
  - [5.5. 场景 5：高阶组件（HOC）](#55-场景-5高阶组件hoc)
- [6. 使用剩余 Props 的注意事项？](#6-使用剩余-props-的注意事项)
  - [6.1. 注意 1：Props 覆盖顺序](#61-注意-1props-覆盖顺序)
  - [6.2. 注意 2：避免传递无效属性](#62-注意-2避免传递无效属性)
  - [6.3. 注意 3：TypeScript 类型定义](#63-注意-3typescript-类型定义)
  - [6.4. 注意 4：性能考虑](#64-注意-4性能考虑)
  - [6.5. 注意 5：调试困难](#65-注意-5调试困难)
  - [6.6. 注意 6：避免无限传递](#66-注意-6避免无限传递)
- [7. 引用](#7-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 剩余 Props 的概念
- 传递剩余 Props 的方法
- 常见使用场景
- 使用时的注意事项

## 2. 评价

剩余 Props 是 React 组件封装中的重要技巧，可以让组件更加灵活。

- 使用剩余运算符可以轻松传递未知的 props，减少重复代码
- 特别适合封装原生 HTML 元素，保持原生属性的完整性
- 需要注意 props 的优先级和命名冲突问题
- 合理使用可以提高组件的可复用性和扩展性

## 3. 什么是剩余 Props？

### 3.1. 基本概念

剩余 Props 是指使用剩余运算符（`...`）收集未被显式解构的所有 props。

```jsx
// ✅ 使用剩余运算符收集其余 props
function Button({ variant, children, ...restProps }) {
  // variant 和 children 被提取
  // restProps 包含所有其他传入的 props
  console.log(restProps) // { onClick: fn, disabled: true, className: "btn" }

  return (
    <button className={`btn-${variant}`} {...restProps}>
      {children}
    </button>
  )
}

// 使用
;<Button
  variant="primary"
  onClick={handleClick}
  disabled={true}
  className="btn"
>
  点击
</Button>
```

### 3.2. 与展开运算符的配合

```jsx
// ✅ 收集（rest）+ 展开（spread）
function Input({ label, wrapperClass, ...inputProps }) {
  return (
    <div className={wrapperClass}>
      <label>{label}</label>
      {/* 将收集的 props 展开传递给 input */}
      <input {...inputProps} />
    </div>
  )
}

// 所有未被解构的 props 都会传给 input
;<Input
  label="用户名"
  wrapperClass="form-group"
  type="text"
  placeholder="请输入"
  maxLength={20}
  required
/>
```

## 4. 如何传递剩余 Props？

### 4.1. 直接传递

```jsx
// ✅ 最简单的方式：直接展开
function CustomButton({ children, ...props }) {
  return <button {...props}>{children}</button>
}

// 保留所有原生 button 属性
;<CustomButton
  type="submit"
  disabled={true}
  onClick={handleClick}
  className="btn"
>
  提交
</CustomButton>
```

### 4.2. 部分覆盖

```jsx
// ✅ 组件自己的 props 会覆盖传入的
function Button({ variant, ...props }) {
  return (
    <button
      {...props}
      className={`btn btn-${variant} ${props.className || ''}`}
      // ✅ 后面的 className 会覆盖 props 中的
    >
      {props.children}
    </button>
  )
}
```

### 4.3. 条件传递

```jsx
// ✅ 根据条件决定传递哪些 props
function Link({ external, ...props }) {
  const extraProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return <a {...props} {...extraProps} />
}

// 使用
<Link href="/about">内部链接</Link>
<Link href="https://example.com" external>外部链接</Link>
```

### 4.4. 过滤后传递

```jsx
// ✅ 过滤掉某些不需要传递的 props
function Input({ label, error, helperText, ...inputProps }) {
  // label、error、helperText 不会传给 input
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
      {error && <span className="error">{error}</span>}
      {helperText && <span className="helper">{helperText}</span>}
    </div>
  )
}
```

## 5. 使用剩余 Props 的常见场景？

### 5.1. 场景 1：封装原生元素

```jsx
// ✅ 封装 input，保留所有原生属性
function TextInput({ label, error, ...inputProps }) {
  return (
    <div className="form-field">
      {label && <label>{label}</label>}
      <input
        {...inputProps}
        className={`input ${error ? 'input-error' : ''} ${
          inputProps.className || ''
        }`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

// 可以使用所有原生 input 属性
;<TextInput
  label="邮箱"
  type="email"
  placeholder="请输入邮箱"
  required
  maxLength={100}
  autoComplete="email"
  error={errors.email}
/>
```

### 5.2. 场景 2：创建包装组件

```jsx
// ✅ 为组件添加额外功能，保留原有 props
function WithLoading({ loading, component: Component, ...props }) {
  if (loading) {
    return <Spinner />
  }

  return <Component {...props} />
}

// 使用
;<WithLoading
  loading={isLoading}
  component={UserProfile}
  userId={123}
  onUpdate={handleUpdate}
/>
```

### 5.3. 场景 3：实现多态组件

```jsx
// ✅ 根据 as 属性渲染不同元素
function Text({ as: Component = 'p', children, ...props }) {
  return <Component {...props}>{children}</Component>
}

// 可以渲染为不同的 HTML 标签
<Text>默认段落</Text>
<Text as="h1">标题</Text>
<Text as="span" className="highlight">高亮文本</Text>
<Text as={Link} to="/about">链接文本</Text>
```

### 5.4. 场景 4：转发 Props 到子组件

```jsx
// ✅ 将 props 转发给特定子组件
function FormField({ label, inputProps, labelProps, containerProps }) {
  return (
    <div {...containerProps}>
      <label {...labelProps}>{label}</label>
      <input {...inputProps} />
    </div>
  )
}

// 使用：为不同部分传递不同的 props
;<FormField
  label="用户名"
  containerProps={{ className: 'form-group' }}
  labelProps={{ className: 'form-label', htmlFor: 'username' }}
  inputProps={{
    id: 'username',
    type: 'text',
    className: 'form-control',
    placeholder: '请输入用户名',
  }}
/>
```

### 5.5. 场景 5：高阶组件（HOC）

```jsx
// ✅ HOC 中转发 props
function withAuth(Component) {
  return function AuthenticatedComponent({ redirectTo, ...props }) {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
      return <Redirect to={redirectTo || '/login'} />
    }

    // ✅ 转发所有 props 给被包装的组件
    return <Component {...props} />
  }
}

const ProtectedProfile = withAuth(UserProfile)

// 使用
<ProtectedProfile userId={123} onUpdate={handleUpdate} />
```

## 6. 使用剩余 Props 的注意事项？

### 6.1. 注意 1：Props 覆盖顺序

```jsx
// ❌ 错误：组件的 props 会被用户传入的覆盖
function Button({ variant, ...props }) {
  return (
    <button
      className={`btn-${variant}`} // 这个会被覆盖
      {...props}
    />
  )
}

;<Button variant="primary" className="custom" />
// 结果：className="custom"，btn-primary 丢失

// ✅ 正确：将固定的 props 放在展开后面
function Button({ variant, ...props }) {
  return (
    <button {...props} className={`btn-${variant} ${props.className || ''}`} />
  )
}
```

### 6.2. 注意 2：避免传递无效属性

```jsx
// ❌ 警告：无效的 DOM 属性
function CustomDiv({ customProp, ...props }) {
  return <div {...props} /> // customProp 也会被传递
}

;<CustomDiv customProp="value" id="box" />
// 警告：customProp 不是有效的 DOM 属性

// ✅ 正确：显式提取自定义 props
function CustomDiv({ customProp, ...domProps }) {
  // 使用 customProp 做些事情
  console.log(customProp)

  return <div {...domProps} />
}
```

### 6.3. 注意 3：TypeScript 类型定义

```tsx
// ✅ TypeScript 中正确定义剩余 Props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

function Button({ variant = 'primary', loading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`btn-${variant} ${props.className || ''}`}
      disabled={props.disabled || loading}
    />
  )
}

// 获得完整的类型提示和检查
;<Button
  variant="primary"
  onClick={handleClick}
  type="submit"
  // 所有 button 的原生属性都有类型提示
/>
```

### 6.4. 注意 4：性能考虑

```jsx
// ⚠️ 每次渲染都创建新对象
function Button({ variant, ...props }) {
  return <button {...props} className={`btn-${variant}`} />
}

// ✅ 如果性能敏感，考虑 memo
const Button = React.memo(({ variant, ...props }) => {
  return <button {...props} className={`btn-${variant}`} />
})
```

### 6.5. 注意 5：调试困难

```jsx
// ⚠️ 不清楚传递了哪些 props
function MyComponent({ ...props }) {
  return <SomeComponent {...props} />
}

// ✅ 在开发时可以打印查看
function MyComponent({ ...props }) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Received props:', props)
  }

  return <SomeComponent {...props} />
}

// ✅ 或使用 TypeScript 明确类型
interface MyComponentProps {
  title: string
  onClick?: () => void
  // ... 其他明确的 props
}
```

### 6.6. 注意 6：避免无限传递

```jsx
// ❌ 危险：可能导致意外的 props 传递
function ParentComponent(props) {
  return <ChildComponent {...props} /> // 传递了所有 props
}

function ChildComponent(props) {
  return <GrandChildComponent {...props} /> // 继续传递所有
}

// ✅ 最佳实践：只传递需要的
function ParentComponent({ title, data, ...otherProps }) {
  return (
    <ChildComponent
      title={title}
      // 只传递 ChildComponent 需要的 props
    />
  )
}
```

## 7. 引用

- [MDN - 剩余参数][1]
- [React 官方文档 - JSX In Depth][2]
- [MDN - 展开语法][3]

[1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/rest_parameters
[2]: https://react.dev/learn/passing-props-to-a-component
[3]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
