# [0172. getDerivedStateFromProps 使用场景](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0172.%20getDerivedStateFromProps%20%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 getDerivedStateFromProps 是什么？](#3--getderivedstatefromprops-是什么)
  - [3.1. 基本定义](#31-基本定义)
  - [3.2. 关键特点](#32-关键特点)
  - [3.3. 调用时机](#33-调用时机)
- [4. 🤔 什么时候需要使用它？](#4--什么时候需要使用它)
  - [4.1. 场景 1：根据 props 变化重置部分 state](#41-场景-1根据-props-变化重置部分-state)
  - [4.2. 场景 2：props 变化时执行动画](#42-场景-2props-变化时执行动画)
  - [4.3. 场景 3：记录 props 的历史值](#43-场景-3记录-props-的历史值)
- [5. 🤔 如何正确使用这个方法？](#5--如何正确使用这个方法)
  - [5.1. 最佳实践 1：保存 props 的副本](#51-最佳实践-1保存-props-的副本)
  - [5.2. 最佳实践 2：只在必要时更新](#52-最佳实践-2只在必要时更新)
  - [5.3. 最佳实践 3：配合 componentDidUpdate 使用](#53-最佳实践-3配合-componentdidupdate-使用)
- [6. 🤔 有哪些常见错误用法？](#6--有哪些常见错误用法)
  - [6.1. 错误 1：无条件复制 props 到 state](#61-错误-1无条件复制-props-到-state)
  - [6.2. 错误 2：在派生状态中执行副作用](#62-错误-2在派生状态中执行副作用)
  - [6.3. 错误 3：修改 state 对象](#63-错误-3修改-state-对象)
- [7. 🤔 如何避免不必要的派生状态？](#7--如何避免不必要的派生状态)
  - [7.1. 替代方案 1：完全受控组件](#71-替代方案-1完全受控组件)
  - [7.2. 替代方案 2：使用 key 重置组件](#72-替代方案-2使用-key-重置组件)
  - [7.3. 替代方案 3：render 中计算派生值](#73-替代方案-3render-中计算派生值)
- [8. 🤔 如何迁移到函数组件？](#8--如何迁移到函数组件)
  - [8.1. 迁移示例 1：props 变化时重置 state](#81-迁移示例-1props-变化时重置-state)
  - [8.2. 迁移示例 2：记录 props 的前一个值](#82-迁移示例-2记录-props-的前一个值)
- [9. 🆚 派生状态的不同实现方式对比](#9--派生状态的不同实现方式对比)
  - [9.1. 选择指南](#91-选择指南)
- [10. 🔗 引用](#10--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- getDerivedStateFromProps 的定义和特点
- 适合使用的场景
- 正确使用方法和最佳实践
- 常见错误和反模式
- 替代方案和优化技巧
- 函数组件的等价实现

## 2. 🫧 评价

这篇笔记深入讲解 React 中最容易被误用的生命周期方法 `getDerivedStateFromProps`，通过实际案例展示正确用法。

- 这个方法在 React 16.3 引入，用于替代 `componentWillReceiveProps`
- 90% 的场景都不需要使用派生状态，过度使用会导致代码复杂和 bug
- 优先考虑完全受控组件或带 key 的完全不受控组件
- 函数组件中通常用普通计算或 useEffect 替代

## 3. 🤔 getDerivedStateFromProps 是什么？

`getDerivedStateFromProps` 是一个静态方法，用于根据 props 的变化来更新 state。

### 3.1. 基本定义

```typescript
class MyComponent extends React.Component<Props, State> {
  // 静态方法，无法访问 this
  static getDerivedStateFromProps(
    nextProps: Props, // 新的 props
    prevState: State // 当前的 state
  ): Partial<State> | null {
    // 返回对象来更新 state
    // 返回 null 表示不更新
    return null
  }

  render() {
    return <div>{this.state.value}</div>
  }
}
```

### 3.2. 关键特点

```typescript
interface Props {
  value: number
  multiplier: number
}

interface State {
  computedValue: number
  prevPropsValue: number
}

class Calculator extends React.Component<Props, State> {
  state: State = {
    computedValue: 0,
    prevPropsValue: 0,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    console.log('执行 getDerivedStateFromProps')

    // ✅ 特点 1：静态方法，无法访问 this
    // console.log(this.props); // ❌ 错误！

    // ✅ 特点 2：每次渲染前都会调用
    // 包括初始挂载和后续更新

    // ✅ 特点 3：必须返回对象或 null
    if (props.value !== state.prevPropsValue) {
      return {
        computedValue: props.value * props.multiplier,
        prevPropsValue: props.value,
      }
    }

    // ✅ 特点 4：返回 null 表示不更新 state
    return null
  }

  render() {
    return (
      <div>
        <p>输入值: {this.props.value}</p>
        <p>乘数: {this.props.multiplier}</p>
        <p>计算结果: {this.state.computedValue}</p>
      </div>
    )
  }
}
```

### 3.3. 调用时机

```typescript
class TimingDemo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    console.log('1. constructor')
    this.state = { count: 0 }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    console.log('2. getDerivedStateFromProps')
    // ✅ 在 render 之前调用
    // ✅ 初始挂载和每次更新都会调用
    return null
  }

  componentDidMount() {
    console.log('4. componentDidMount')
  }

  componentDidUpdate() {
    console.log('6. componentDidUpdate')
  }

  render() {
    console.log('3/5. render')
    return <div>{this.state.count}</div>
  }
}

// 控制台输出：
// 初始挂载：
// 1. constructor
// 2. getDerivedStateFromProps
// 3. render
// 4. componentDidMount

// 更新时：
// 2. getDerivedStateFromProps
// 5. render
// 6. componentDidUpdate
```

## 4. 🤔 什么时候需要使用它？

只在极少数场景下需要使用派生状态。

### 4.1. 场景 1：根据 props 变化重置部分 state

```typescript
interface Props {
  userId: number
}

interface State {
  email: string
  loading: boolean
  prevUserId: number
}

class UserEmail extends React.Component<Props, State> {
  state: State = {
    email: '',
    loading: false,
    prevUserId: this.props.userId,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // ✅ 当 userId 变化时，重置 email
    if (props.userId !== state.prevUserId) {
      return {
        email: '',
        loading: true,
        prevUserId: props.userId,
      }
    }
    return null
  }

  componentDidUpdate(prevProps: Props) {
    // ✅ userId 变化后加载新数据
    if (this.props.userId !== prevProps.userId) {
      this.fetchEmail(this.props.userId)
    }
  }

  async fetchEmail(userId: number) {
    const email = await fetch(`/api/users/${userId}/email`).then((r) =>
      r.json()
    )
    this.setState({ email, loading: false })
  }

  render() {
    return <div>{this.state.loading ? '加载中...' : this.state.email}</div>
  }
}
```

### 4.2. 场景 2：props 变化时执行动画

```typescript
interface Props {
  isOpen: boolean
}

interface State {
  animating: boolean
  prevIsOpen: boolean
}

class AnimatedPanel extends React.Component<Props, State> {
  state: State = {
    animating: false,
    prevIsOpen: this.props.isOpen,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // ✅ isOpen 变化时触发动画状态
    if (props.isOpen !== state.prevIsOpen) {
      return {
        animating: true,
        prevIsOpen: props.isOpen,
      }
    }
    return null
  }

  componentDidUpdate() {
    if (this.state.animating) {
      // 动画结束后重置状态
      setTimeout(() => {
        this.setState({ animating: false })
      }, 300)
    }
  }

  render() {
    const className = this.state.animating ? 'panel animating' : 'panel'
    return <div className={className}>{this.props.isOpen && '面板内容'}</div>
  }
}
```

### 4.3. 场景 3：记录 props 的历史值

```typescript
interface Props {
  currentPage: number
}

interface State {
  previousPage: number | null
  currentPage: number
}

class PageTracker extends React.Component<Props, State> {
  state: State = {
    previousPage: null,
    currentPage: this.props.currentPage,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // ✅ 保存上一页的页码
    if (props.currentPage !== state.currentPage) {
      return {
        previousPage: state.currentPage,
        currentPage: props.currentPage,
      }
    }
    return null
  }

  render() {
    return (
      <div>
        <p>当前页: {this.state.currentPage}</p>
        {this.state.previousPage !== null && (
          <p>上一页: {this.state.previousPage}</p>
        )}
      </div>
    )
  }
}
```

## 5. 🤔 如何正确使用这个方法？

遵循最佳实践避免常见问题。

### 5.1. 最佳实践 1：保存 props 的副本

```typescript
interface Props {
  externalValue: number
}

interface State {
  value: number
  prevExternalValue: number
}

class ControlledInput extends React.Component<Props, State> {
  state: State = {
    value: this.props.externalValue,
    prevExternalValue: this.props.externalValue,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // ✅ 保存 props 值以便下次比较
    if (props.externalValue !== state.prevExternalValue) {
      return {
        value: props.externalValue,
        prevExternalValue: props.externalValue,
      }
    }
    return null
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 允许本地编辑
    this.setState({ value: Number(e.target.value) })
  }

  render() {
    return (
      <input
        type="number"
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}
```

### 5.2. 最佳实践 2：只在必要时更新

```typescript
interface Props {
  items: string[]
}

interface State {
  filteredItems: string[]
  filterText: string
  prevItems: string[]
}

class FilteredList extends React.Component<Props, State> {
  state: State = {
    filteredItems: this.props.items,
    filterText: '',
    prevItems: this.props.items,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // ✅ 只在 items 引用变化时重新过滤
    if (props.items !== state.prevItems) {
      return {
        filteredItems: props.items.filter((item) =>
          item.includes(state.filterText)
        ),
        prevItems: props.items,
      }
    }
    return null
  }

  handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value
    this.setState({
      filterText,
      filteredItems: this.props.items.filter((item) =>
        item.includes(filterText)
      ),
    })
  }

  render() {
    return (
      <div>
        <input
          value={this.state.filterText}
          onChange={this.handleFilterChange}
          placeholder="过滤..."
        />
        <ul>
          {this.state.filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }
}
```

### 5.3. 最佳实践 3：配合 componentDidUpdate 使用

```typescript
interface Props {
  query: string
}

interface State {
  results: any[]
  loading: boolean
  prevQuery: string
}

class SearchResults extends React.Component<Props, State> {
  state: State = {
    results: [],
    loading: false,
    prevQuery: this.props.query,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // ✅ 标记 query 变化
    if (props.query !== state.prevQuery) {
      return {
        loading: true,
        prevQuery: props.query,
      }
    }
    return null
  }

  componentDidUpdate(prevProps: Props) {
    // ✅ 在这里执行副作用
    if (this.props.query !== prevProps.query) {
      this.search(this.props.query)
    }
  }

  async search(query: string) {
    const results = await fetch(`/api/search?q=${query}`).then((r) => r.json())
    this.setState({ results, loading: false })
  }

  render() {
    const { results, loading } = this.state

    if (loading) return <div>搜索中...</div>

    return (
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    )
  }
}
```

## 6. 🤔 有哪些常见错误用法？

避免这些反模式。

### 6.1. 错误 1：无条件复制 props 到 state

::: code-group

```typescript [❌ 错误示例]
class BadExample extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    // ❌ 每次渲染都更新 state
    return {
      value: props.value,
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ❌ 本地更新会被立即覆盖
    this.setState({ value: e.target.value })
  }

  render() {
    return <input value={this.state.value} onChange={this.handleChange} />
  }
}
```

```typescript [✅ 正确示例]
class GoodExample extends React.Component<Props, State> {
  state = {
    value: this.props.value,
    prevPropsValue: this.props.value,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // ✅ 只在 props 真正变化时更新
    if (props.value !== state.prevPropsValue) {
      return {
        value: props.value,
        prevPropsValue: props.value,
      }
    }
    return null
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ✅ 本地更新不会被覆盖
    this.setState({ value: e.target.value })
  }

  render() {
    return <input value={this.state.value} onChange={this.handleChange} />
  }
}
```

:::

### 6.2. 错误 2：在派生状态中执行副作用

::: code-group

```typescript [❌ 错误示例]
class BadSideEffect extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.userId !== state.prevUserId) {
      // ❌ 不要在这里执行副作用
      fetch(`/api/users/${props.userId}`)

      // ❌ 不要在这里调用回调
      props.onUserChange(props.userId)

      return {
        prevUserId: props.userId,
      }
    }
    return null
  }

  render() {
    return <div />
  }
}
```

```typescript [✅ 正确示例]
class GoodSideEffect extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    // ✅ 只更新 state
    if (props.userId !== state.prevUserId) {
      return {
        prevUserId: props.userId,
        loading: true,
      }
    }
    return null
  }

  componentDidUpdate(prevProps: Props) {
    // ✅ 在这里执行副作用
    if (this.props.userId !== prevProps.userId) {
      fetch(`/api/users/${this.props.userId}`)
      this.props.onUserChange(this.props.userId)
    }
  }

  render() {
    return <div />
  }
}
```

:::

### 6.3. 错误 3：修改 state 对象

```typescript
class MutationError extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    // ❌ 不要直接修改 state
    state.value = props.value
    state.items.push(props.newItem)

    // ❌ 这样返回无效
    return state
  }

  render() {
    return <div />
  }
}

class NoMutation extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    // ✅ 返回新对象
    return {
      value: props.value,
      items: [...state.items, props.newItem],
    }
  }

  render() {
    return <div />
  }
}
```

## 7. 🤔 如何避免不必要的派生状态？

大多数情况下不需要派生状态。

### 7.1. 替代方案 1：完全受控组件

```typescript
// ❌ 不推荐：使用派生状态
class DerivedStateInput extends React.Component<Props, State> {
  state = {
    value: this.props.value,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.value !== state.value) {
      return { value: props.value }
    }
    return null
  }

  render() {
    return <input value={this.state.value} onChange={this.handleChange} />
  }
}

// ✅ 推荐：完全受控
function ControlledInput({ value, onChange }: Props) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />
}
```

### 7.2. 替代方案 2：使用 key 重置组件

```typescript
// ❌ 不推荐：使用派生状态重置
class DerivedStateForm extends React.Component<Props, State> {
  state = {
    email: this.props.user.email,
    prevUserId: this.props.user.id,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.user.id !== state.prevUserId) {
      return {
        email: props.user.email,
        prevUserId: props.user.id,
      }
    }
    return null
  }

  render() {
    return <input value={this.state.email} onChange={this.handleChange} />
  }
}

// ✅ 推荐：使用 key
function UserForm({ user }: Props) {
  return <EmailForm key={user.id} initialEmail={user.email} />
}

function EmailForm({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = React.useState(initialEmail)

  return <input value={email} onChange={(e) => setEmail(e.target.value)} />
}
```

### 7.3. 替代方案 3：render 中计算派生值

```typescript
// ❌ 不推荐：保存派生状态
class DerivedStateSorting extends React.Component<Props, State> {
  state = {
    sortedItems: this.props.items.sort(),
    prevItems: this.props.items,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.items !== state.prevItems) {
      return {
        sortedItems: props.items.sort(),
        prevItems: props.items,
      }
    }
    return null
  }

  render() {
    return (
      <ul>
        {this.state.sortedItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    )
  }
}

// ✅ 推荐：直接计算
function SortedList({ items }: Props) {
  // 每次 render 时计算
  const sortedItems = items.sort()

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

// ✅ 如果计算昂贵，使用 useMemo
function MemoizedSortedList({ items }: Props) {
  const sortedItems = React.useMemo(() => items.sort(), [items])

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

## 8. 🤔 如何迁移到函数组件？

函数组件中很少需要派生状态。

### 8.1. 迁移示例 1：props 变化时重置 state

::: code-group

```typescript [类组件]
class EmailInput extends React.Component<Props, State> {
  state = {
    email: this.props.user.email,
    prevUserId: this.props.user.id,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.user.id !== state.prevUserId) {
      return {
        email: props.user.email,
        prevUserId: props.user.id,
      }
    }
    return null
  }

  render() {
    return <input value={this.state.email} onChange={this.handleChange} />
  }
}
```

```typescript [函数组件 - 方案 1：useEffect]
function EmailInput({ user }: Props) {
  const [email, setEmail] = React.useState(user.email)

  React.useEffect(() => {
    // user.id 变化时重置
    setEmail(user.email)
  }, [user.id])

  return <input value={email} onChange={(e) => setEmail(e.target.value)} />
}
```

```typescript [函数组件 - 方案 2：key]
function UserEmailForm({ user }: Props) {
  // ✅ 使用 key 强制重新挂载
  return <EmailInput key={user.id} initialEmail={user.email} />
}

function EmailInput({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = React.useState(initialEmail)

  return <input value={email} onChange={(e) => setEmail(e.target.value)} />
}
```

:::

### 8.2. 迁移示例 2：记录 props 的前一个值

::: code-group

```typescript [类组件]
class Counter extends React.Component<Props, State> {
  state = {
    prevCount: this.props.count,
    trend: null as 'up' | 'down' | null,
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.count !== state.prevCount) {
      return {
        prevCount: state.prevCount,
        trend: props.count > state.prevCount ? 'up' : 'down',
      }
    }
    return null
  }

  render() {
    return (
      <div>
        <p>当前: {this.props.count}</p>
        <p>趋势: {this.state.trend}</p>
      </div>
    )
  }
}
```

```typescript [函数组件]
function Counter({ count }: Props) {
  const [prevCount, setPrevCount] = React.useState(count)
  const [trend, setTrend] = React.useState<'up' | 'down' | null>(null)

  // ✅ 在 render 中直接更新
  if (count !== prevCount) {
    setPrevCount(count)
    setTrend(count > prevCount ? 'up' : 'down')
  }

  return (
    <div>
      <p>当前: {count}</p>
      <p>趋势: {trend}</p>
    </div>
  )
}

// 或使用自定义 Hook
function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>()

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function CounterWithHook({ count }: Props) {
  const prevCount = usePrevious(count)
  const trend =
    prevCount !== undefined ? (count > prevCount ? 'up' : 'down') : null

  return (
    <div>
      <p>当前: {count}</p>
      <p>趋势: {trend}</p>
    </div>
  )
}
```

:::

## 9. 🆚 派生状态的不同实现方式对比

| 方式 | 适用场景 | 优点 | 缺点 |
| --- | --- | --- | --- |
| getDerivedStateFromProps | 类组件需要根据 props 派生 state | 官方支持的生命周期方法 | 容易误用，代码复杂 |
| 完全受控组件 | state 完全由父组件管理 | 简单直观，数据流清晰 | 需要父组件处理所有逻辑 |
| key 重置组件 | props 变化时完全重置组件 | 简单有效，无需派生逻辑 | 会重新挂载组件 |
| render 中计算 | 派生值可以快速计算 | 代码简洁，易于理解 | 每次 render 都计算 |
| useMemo | 计算成本高的派生值 | 避免重复计算 | 增加内存占用 |
| useEffect | props 变化时更新 state | 灵活，符合函数组件思维 | 会多一次渲染 |

### 9.1. 选择指南

```typescript
// 1. 优先使用完全受控组件
function FullyControlled({ value, onChange }: Props) {
  return <input value={value} onChange={onChange} />
}

// 2. 需要本地 state 时使用 key
function WithKey({ userId }: Props) {
  return <UserForm key={userId} />
}

// 3. 简单计算直接在 render 中进行
function DirectCalculation({ items }: Props) {
  const sortedItems = items.sort()
  return <List items={sortedItems} />
}

// 4. 昂贵计算使用 useMemo
function ExpensiveCalculation({ data }: Props) {
  const processed = React.useMemo(() => expensiveProcessing(data), [data])
  return <Chart data={processed} />
}

// 5. 最后才考虑 getDerivedStateFromProps
class LastResort extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    // 只在确实需要时使用
    return null
  }

  render() {
    return <div />
  }
}
```

## 10. 🔗 引用

- [You Probably Don't Need Derived State][1]
- [getDerivedStateFromProps API 文档][2]
- [React Blog - Update on Async Rendering][3]
- [派生状态的替代方案][4]

[1]: https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
[2]: https://react.dev/reference/react/Component#static-getderivedstatefromprops
[3]: https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html
[4]: https://react.dev/learn/you-might-not-need-an-effect
