# [0154. JSX 属性展开运算符（...props）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0154.%20JSX%20%E5%B1%9E%E6%80%A7%E5%B1%95%E5%BC%80%E8%BF%90%E7%AE%97%E7%AC%A6%EF%BC%88...props%EF%BC%89)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 什么是 JSX 属性展开运算符？](#3--什么是-jsx-属性展开运算符)
- [4. 🤔 如何正确使用属性展开？](#4--如何正确使用属性展开)
  - [4.1. 展开顺序与优先级](#41-展开顺序与优先级)
  - [4.2. 提取和传递特定属性](#42-提取和传递特定属性)
  - [4.3. 有条件的属性展开](#43-有条件的属性展开)
- [5. 🤔 属性展开的常见陷阱有哪些？](#5--属性展开的常见陷阱有哪些)
  - [5.1. 陷阱 1：传递无效的 DOM 属性](#51-陷阱-1传递无效的-dom-属性)
  - [5.2. 陷阱 2：意外覆盖必要属性](#52-陷阱-2意外覆盖必要属性)
  - [5.3. 陷阱 3：key 和 ref 的特殊处理](#53-陷阱-3key-和-ref-的特殊处理)
  - [5.4. 陷阱 4：性能问题](#54-陷阱-4性能问题)
- [6. 🤔 如何选择性地传递属性？](#6--如何选择性地传递属性)
  - [6.1. 方法 1：白名单模式](#61-方法-1白名单模式)
  - [6.2. 方法 2：黑名单模式](#62-方法-2黑名单模式)
  - [6.3. 方法 3：分组传递](#63-方法-3分组传递)
  - [6.4. 方法 4：使用 TypeScript 类型限制](#64-方法-4使用-typescript-类型限制)
  - [6.5. 方法 5：条件展开](#65-方法-5条件展开)
  - [6.6. 实际应用场景](#66-实际应用场景)
- [7. 🔗 引用](#7--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 属性展开运算符的基本用法
- 展开顺序与属性覆盖
- 剩余属性的提取与传递
- 常见陷阱与最佳实践
- 实际应用场景

## 2. 🫧 评价

本笔记详细讲解了 JSX 中属性展开运算符的使用技巧，帮助编写更灵活的组件。

- 属性展开可以简化 props 的传递，减少重复代码
- 理解展开顺序能避免意外的属性覆盖问题
- 合理使用剩余属性可以让组件更通用
- 注意类型安全，避免传递不必要的属性

## 3. 🤔 什么是 JSX 属性展开运算符？

基本概念：

```jsx
// 属性展开运算符使用 ...（三个点）
// 可以将对象的所有属性展开为组件的 props

const props = {
  id: 'btn-1',
  className: 'button',
  onClick: handleClick,
}

// ✅ 使用展开运算符
<button {...props}>点击</button>

// 等价于
<button
  id="btn-1"
  className="button"
  onClick={handleClick}
>
  点击
</button>
```

基本用法对比：

::: code-group

```jsx [手动传递]
// ❌ 繁琐的手动传递
function Input({ value, onChange, placeholder, disabled, type }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
    />
  )
}
```

```jsx [使用展开]
// ✅ 使用展开运算符
function Input(props) {
  return <input {...props} />
}

// 或者解构使用
function Input({ className, ...inputProps }) {
  return (
    <div className={className}>
      <input {...inputProps} />
    </div>
  )
}
```

:::

展开运算符的优势：

| 优势     | 说明               | 示例                                   |
| -------- | ------------------ | -------------------------------------- |
| 代码简洁 | 减少重复代码       | `<Component {...props} />`             |
| 易于扩展 | 支持任意数量的属性 | 自动传递所有属性                       |
| 透明传递 | 不关心具体属性     | 包装组件场景                           |
| 灵活组合 | 可与其他属性混用   | `<div {...props} className="extra" />` |

## 4. 🤔 如何正确使用属性展开？

### 4.1. 展开顺序与优先级

```jsx
// 展开在前：后面的属性会覆盖展开的属性
function Button(props) {
  return (
    <button
      {...props}
      className="btn" // ✅ 总是使用 "btn"
      disabled={false} // ✅ 总是可用
    >
      {props.children}
    </button>
  )
}

// 展开在后：展开的属性会覆盖前面的属性
function Button(props) {
  return (
    <button
      className="btn" // ⚠️ 可能被 props.className 覆盖
      disabled={false} // ⚠️ 可能被 props.disabled 覆盖
      {...props}
    >
      {props.children}
    </button>
  )
}
```

```jsx
// ✅ 合并 className
function Button({ className, ...props }) {
  return (
    <button className={`btn ${className || ''}`} {...props}>
      {props.children}
    </button>
  )
}

// ✅ 使用 clsx 或 classnames 库
import clsx from 'clsx'

function Button({ className, variant = 'primary', ...props }) {
  return (
    <button className={clsx('btn', `btn-${variant}`, className)} {...props}>
      {props.children}
    </button>
  )
}
```

### 4.2. 提取和传递特定属性

```jsx
// ✅ 提取组件自己需要的属性，传递其余属性
function Input({ label, error, ...inputProps }) {
  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <input {...inputProps} className={error ? 'input-error' : 'input'} />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

// 使用
;<Input
  label="用户名"
  error="用户名不能为空"
  type="text"
  placeholder="请输入用户名"
  maxLength={20}
/>
```

```jsx
// ✅ 分别传递给不同的子元素
function Card({ title, children, headerProps, bodyProps, ...cardProps }) {
  return (
    <div className="card" {...cardProps}>
      <div className="card-header" {...headerProps}>
        {title}
      </div>
      <div className="card-body" {...bodyProps}>
        {children}
      </div>
    </div>
  )
}

// 使用
;<Card
  title="卡片标题"
  headerProps={{ className: 'custom-header' }}
  bodyProps={{ style: { padding: 20 } }}
  onClick={handleClick}
>
  卡片内容
</Card>
```

### 4.3. 有条件的属性展开

```jsx
// ✅ 根据条件决定是否展开
function Button({ variant, ...props }) {
  const variantProps =
    variant === 'primary'
      ? { className: 'btn-primary', 'aria-label': '主要按钮' }
      : { className: 'btn-secondary' }

  return (
    <button {...variantProps} {...props}>
      {props.children}
    </button>
  )
}
```

```jsx
// ✅ 过滤掉某些属性后展开
function Link({ external, ...props }) {
  const linkProps = external
    ? { ...props, target: '_blank', rel: 'noopener noreferrer' }
    : props

  return <a {...linkProps}>{props.children}</a>
}
```

## 5. 🤔 属性展开的常见陷阱有哪些？

### 5.1. 陷阱 1：传递无效的 DOM 属性

```jsx
// ❌ 将自定义属性传递给 DOM 元素
function Input({ isValid, ...props }) {
  return (
    <input
      {...props} // ⚠️ 如果 props 包含 isValid，会警告
    />
  )
}

// 使用时
;<Input isValid={true} type="text" value={value} />

// ✅ 明确提取自定义属性
function Input({ isValid, errorMessage, ...inputProps }) {
  return (
    <div>
      <input
        {...inputProps} // ✅ 只传递有效的 DOM 属性
        className={isValid ? '' : 'error'}
      />
      {!isValid && <span>{errorMessage}</span>}
    </div>
  )
}
```

### 5.2. 陷阱 2：意外覆盖必要属性

```jsx
// ❌ 关键属性被覆盖
function SubmitButton(props) {
  return (
    <button
      type="submit"
      {...props} // ⚠️ props.type 会覆盖 "submit"
    >
      提交
    </button>
  )
}

// ✅ 将展开放在前面
function SubmitButton(props) {
  return (
    <button
      {...props}
      type="submit" // ✅ 始终是 "submit"
    >
      提交
    </button>
  )
}

// ✅ 或者提取 type 属性
function SubmitButton({ type, ...props }) {
  return (
    <button
      {...props}
      type={type || 'submit'} // ✅ 允许覆盖但有默认值
    >
      提交
    </button>
  )
}
```

### 5.3. 陷阱 3：key 和 ref 的特殊处理

```jsx
// ⚠️ key 和 ref 不会被展开
function ListItem(props) {
  console.log(props) // ❌ 看不到 key 和 ref

  return <li {...props}>{props.children}</li>
}

// 使用
items.map((item) => (
  <ListItem key={item.id} ref={itemRef}>
    {item.name}
  </ListItem>
))

// ✅ key 和 ref 是特殊属性，由 React 处理
// 不需要也不能手动传递
```

### 5.4. 陷阱 4：性能问题

```jsx
// ❌ 每次渲染都创建新对象
function Button({ size, ...props }) {
  return (
    <button
      {...props}
      style={{ fontSize: size === 'large' ? 18 : 14 }} // ⚠️ 每次创建新对象
    >
      {props.children}
    </button>
  )
}

// ✅ 提取到外部或使用 useMemo
const SIZE_STYLES = {
  small: { fontSize: 12 },
  medium: { fontSize: 14 },
  large: { fontSize: 18 },
}

function Button({ size = 'medium', style, ...props }) {
  return (
    <button
      {...props}
      style={{ ...SIZE_STYLES[size], ...style }} // ✅ 复用预定义对象
    >
      {props.children}
    </button>
  )
}
```

## 6. 🤔 如何选择性地传递属性？

### 6.1. 方法 1：白名单模式

```jsx
// ✅ 只传递允许的属性
const ALLOWED_PROPS = ['onClick', 'onFocus', 'onBlur', 'disabled']

function CustomButton({ children, ...props }) {
  const allowedProps = Object.keys(props)
    .filter((key) => ALLOWED_PROPS.includes(key))
    .reduce((obj, key) => {
      obj[key] = props[key]
      return obj
    }, {})

  return <button {...allowedProps}>{children}</button>
}
```

### 6.2. 方法 2：黑名单模式

```jsx
// ✅ 排除不需要的属性
function Input({ internalState, customValidator, ...inputProps }) {
  // internalState 和 customValidator 不会传递给 input
  return <input {...inputProps} />
}

// 或使用工具函数
function omit(obj, keys) {
  const result = { ...obj }
  keys.forEach((key) => delete result[key])
  return result
}

function Input(props) {
  const inputProps = omit(props, ['internalState', 'customValidator'])
  return <input {...inputProps} />
}
```

### 6.3. 方法 3：分组传递

```jsx
// ✅ 将属性分组传递给不同的子组件
function Modal({ title, children, dialogProps, overlayProps, ...props }) {
  return (
    <div className="modal" {...props}>
      <div className="modal-overlay" {...overlayProps} />
      <div className="modal-dialog" {...dialogProps}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

// 使用
;<Modal
  title="确认操作"
  onClose={handleClose}
  dialogProps={{
    className: 'custom-dialog',
    role: 'dialog',
  }}
  overlayProps={{
    onClick: handleOverlayClick,
  }}
>
  内容
</Modal>
```

### 6.4. 方法 4：使用 TypeScript 类型限制

```tsx
// ✅ 使用 TypeScript 明确允许的属性
import { ButtonHTMLAttributes } from 'react'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}

function CustomButton({
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={clsx('btn', `btn-${variant}`, `btn-${size}`, className)}
      {...props}
    />
  )
}
```

### 6.5. 方法 5：条件展开

```jsx
// ✅ 根据条件决定传递哪些属性
function Button({ href, onClick, ...props }) {
  // 如果有 href，渲染为链接
  if (href) {
    return (
      <a
        href={href}
        {...props}
        // onClick 不传递给 a 标签
      >
        {props.children}
      </a>
    )
  }

  // 否则渲染为按钮
  return (
    <button onClick={onClick} {...props}>
      {props.children}
    </button>
  )
}
```

### 6.6. 实际应用场景

```jsx
// ✅ 表单输入包装器
function FormField({ label, error, helper, required, ...inputProps }) {
  return (
    <div className="form-field">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        {...inputProps}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? 'error' : helper ? 'helper' : undefined}
      />
      {helper && (
        <span id="helper" className="helper">
          {helper}
        </span>
      )}
      {error && (
        <span id="error" className="error">
          {error}
        </span>
      )}
    </div>
  )
}
```

```jsx
// ✅ 可访问的按钮组件
function AccessibleButton({
  children,
  loading,
  disabled,
  'aria-label': ariaLabel,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-label={
        ariaLabel || (typeof children === 'string' ? children : undefined)
      }
      aria-busy={loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}
```

## 7. 🔗 引用

- [React 属性展开文档][1]
- [ES6 展开运算符][2]
- [组件组合最佳实践][3]
- [TypeScript 与 React][4]

[1]: https://react.dev/learn/passing-props-to-a-component
[2]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[3]: https://react.dev/learn/thinking-in-react
[4]: https://react-typescript-cheatsheet.netlify.app/
