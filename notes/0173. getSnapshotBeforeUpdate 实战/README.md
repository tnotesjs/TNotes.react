# [0173. getSnapshotBeforeUpdate 实战](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0173.%20getSnapshotBeforeUpdate%20%E5%AE%9E%E6%88%98)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 getSnapshotBeforeUpdate 是什么？](#3--getsnapshotbeforeupdate-是什么)
  - [3.1. 基本定义](#31-基本定义)
  - [3.2. 执行时机](#32-执行时机)
  - [3.3. 典型使用场景](#33-典型使用场景)
- [4. 🤔 如何实现聊天消息列表自动滚动？](#4--如何实现聊天消息列表自动滚动)
  - [4.1. 基础实现](#41-基础实现)
  - [4.2. 完整聊天应用](#42-完整聊天应用)
- [5. 🤔 如何保持列表滚动位置？](#5--如何保持列表滚动位置)
  - [5.1. 实现方案](#51-实现方案)
  - [5.2. 社交媒体动态流示例](#52-社交媒体动态流示例)
- [6. 🤔 如何实现无限滚动加载？](#6--如何实现无限滚动加载)
  - [6.1. 双向无限滚动](#61-双向无限滚动)
- [7. 🤔 如何测量 DOM 变化？](#7--如何测量-dom-变化)
  - [7.1. 测量元素尺寸](#71-测量元素尺寸)
  - [7.2. 测量多个元素](#72-测量多个元素)
- [8. 🤔 如何在函数组件中实现类似功能？](#8--如何在函数组件中实现类似功能)
  - [8.1. 聊天列表（函数组件版）](#81-聊天列表函数组件版)
  - [8.2. 保持滚动位置（函数组件版）](#82-保持滚动位置函数组件版)
  - [8.3. 自定义 Hook 封装](#83-自定义-hook-封装)
- [9. 🆚 getSnapshotBeforeUpdate vs useLayoutEffect](#9--getsnapshotbeforeupdate-vs-uselayouteffect)
  - [9.1. 时序对比](#91-时序对比)
- [10. 🔗 引用](#10--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- getSnapshotBeforeUpdate 的定义和执行时机
- 聊天消息列表的滚动控制
- 列表插入数据时保持滚动位置
- 无限滚动的实现
- DOM 尺寸测量
- 函数组件的等价实现

## 2. 🫧 评价

这篇笔记通过实战案例展示 `getSnapshotBeforeUpdate` 的实际应用，解决 DOM 更新前后的状态同步问题。

- 这是 React 中唯一能在 DOM 更新前获取信息的生命周期方法
- 主要用于处理滚动位置、元素尺寸等需要在更新前后对比的场景
- 必须配合 `componentDidUpdate` 使用，返回值会作为第三个参数传递
- 函数组件中使用 `useLayoutEffect` 可以实现类似功能

## 3. 🤔 getSnapshotBeforeUpdate 是什么？

在 DOM 更新前捕获信息，返回值传递给 `componentDidUpdate`。

### 3.1. 基本定义

```typescript
class MyComponent extends React.Component<Props, State> {
  getSnapshotBeforeUpdate(prevProps: Props, prevState: State): Snapshot | null {
    // 在 DOM 更新前调用
    // 返回值会传递给 componentDidUpdate
    return null
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: Snapshot | null
  ) {
    // 在 DOM 更新后调用
    // snapshot 就是 getSnapshotBeforeUpdate 的返回值
  }

  render() {
    return <div>内容</div>
  }
}
```

### 3.2. 执行时机

```typescript
class TimingDemo extends React.Component<Props, State> {
  componentDidMount() {
    console.log('4. componentDidMount - DOM 已挂载')
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    console.log('5. getSnapshotBeforeUpdate - render 后，DOM 更新前')
    console.log('此时虚拟 DOM 已更新，真实 DOM 还未更新')

    // ✅ 可以读取即将被替换的 DOM
    const element = document.getElementById('my-element')
    return element ? element.scrollHeight : null
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: number | null
  ) {
    console.log('6. componentDidUpdate - DOM 已更新')
    console.log('snapshot:', snapshot)

    // ✅ 可以使用 snapshot 中的信息
    if (snapshot !== null) {
      console.log('之前的 scrollHeight:', snapshot)
      console.log(
        '现在的 scrollHeight:',
        document.getElementById('my-element')?.scrollHeight
      )
    }
  }

  render() {
    console.log('1/3. render')
    return <div id="my-element">{this.props.content}</div>
  }
}

// 控制台输出顺序：
// 初始挂载：
// 1. render
// 4. componentDidMount

// 更新时：
// 3. render
// 5. getSnapshotBeforeUpdate
// 6. componentDidUpdate
```

### 3.3. 典型使用场景

```typescript
interface Snapshot {
  scrollHeight: number
  scrollTop: number
  clientHeight: number
}

class SnapshotExample extends React.Component<Props, State> {
  private containerRef = React.createRef<HTMLDivElement>()

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State): Snapshot | null {
    const container = this.containerRef.current
    if (!container) return null

    // ✅ 场景 1：保存滚动位置
    if (prevProps.items.length < this.props.items.length) {
      return {
        scrollHeight: container.scrollHeight,
        scrollTop: container.scrollTop,
        clientHeight: container.clientHeight,
      }
    }

    return null
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: Snapshot | null
  ) {
    if (snapshot) {
      const container = this.containerRef.current
      if (!container) return

      // ✅ 根据 snapshot 调整滚动位置
      const newScrollHeight = container.scrollHeight
      const heightDiff = newScrollHeight - snapshot.scrollHeight

      container.scrollTop = snapshot.scrollTop + heightDiff
    }
  }

  render() {
    return (
      <div ref={this.containerRef}>
        {this.props.items.map((item) => (
          <div key={item.id}>{item.text}</div>
        ))}
      </div>
    )
  }
}
```

## 4. 🤔 如何实现聊天消息列表自动滚动？

聊天列表需要在新消息到达时自动滚动到底部。

### 4.1. 基础实现

```typescript
interface Message {
  id: string
  text: string
  timestamp: number
}

interface Props {
  messages: Message[]
}

interface State {
  // 空 state
}

class ChatList extends React.Component<Props, State> {
  private listRef = React.createRef<HTMLDivElement>()

  getSnapshotBeforeUpdate(prevProps: Props): boolean {
    const list = this.listRef.current
    if (!list) return false

    // ✅ 判断用户是否在底部
    const isAtBottom =
      list.scrollHeight - list.scrollTop - list.clientHeight < 10

    // ✅ 只有在底部时才返回 true
    return isAtBottom
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: boolean) {
    // ✅ 如果之前在底部，保持在底部
    if (snapshot) {
      const list = this.listRef.current
      if (list) {
        list.scrollTop = list.scrollHeight
      }
    }
  }

  componentDidMount() {
    // 初始加载后滚动到底部
    const list = this.listRef.current
    if (list) {
      list.scrollTop = list.scrollHeight
    }
  }

  render() {
    return (
      <div
        ref={this.listRef}
        style={{
          height: '400px',
          overflow: 'auto',
          border: '1px solid #ccc',
        }}
      >
        {this.props.messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              padding: '10px',
              borderBottom: '1px solid #eee',
            }}
          >
            <div>{msg.text}</div>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    )
  }
}
```

### 4.2. 完整聊天应用

```typescript
interface ChatAppProps {
  currentUserId: string
}

interface ChatAppState {
  messages: Message[]
  inputValue: string
}

class ChatApp extends React.Component<ChatAppProps, ChatAppState> {
  private listRef = React.createRef<HTMLDivElement>()
  private wasAtBottom = true

  state: ChatAppState = {
    messages: [],
    inputValue: '',
  }

  getSnapshotBeforeUpdate(prevProps: ChatAppProps, prevState: ChatAppState) {
    const list = this.listRef.current
    if (!list) return null

    // ✅ 检查是否在底部
    const isAtBottom =
      list.scrollHeight - list.scrollTop - list.clientHeight < 20

    // ✅ 检查是否是自己发的消息
    const addedMessage =
      this.state.messages.length > prevState.messages.length
        ? this.state.messages[this.state.messages.length - 1]
        : null

    const isOwnMessage =
      addedMessage && addedMessage.userId === this.props.currentUserId

    return {
      shouldScroll: isAtBottom || isOwnMessage,
      previousHeight: list.scrollHeight,
    }
  }

  componentDidUpdate(
    prevProps: ChatAppProps,
    prevState: ChatAppState,
    snapshot: { shouldScroll: boolean; previousHeight: number } | null
  ) {
    if (!snapshot) return

    const list = this.listRef.current
    if (!list) return

    if (snapshot.shouldScroll) {
      // ✅ 滚动到底部
      list.scrollTop = list.scrollHeight
    }
  }

  handleSend = () => {
    const { inputValue } = this.state
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      timestamp: Date.now(),
      userId: this.props.currentUserId,
    }

    this.setState({
      messages: [...this.state.messages, newMessage],
      inputValue: '',
    })
  }

  handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      this.handleSend()
    }
  }

  render() {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '500px' }}
      >
        <div
          ref={this.listRef}
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '10px',
            backgroundColor: '#f5f5f5',
          }}
        >
          {this.state.messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent:
                  msg.userId === this.props.currentUserId
                    ? 'flex-end'
                    : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor:
                    msg.userId === this.props.currentUserId
                      ? '#007bff'
                      : '#fff',
                  color:
                    msg.userId === this.props.currentUserId ? '#fff' : '#000',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            padding: '10px',
            borderTop: '1px solid #ccc',
          }}
        >
          <input
            type="text"
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
            onKeyPress={this.handleKeyPress}
            placeholder="输入消息..."
            style={{ flex: 1, padding: '8px', marginRight: '10px' }}
          />
          <button onClick={this.handleSend}>发送</button>
        </div>
      </div>
    )
  }
}
```

## 5. 🤔 如何保持列表滚动位置？

在列表顶部插入数据时保持用户的浏览位置。

### 5.1. 实现方案

```typescript
interface Item {
  id: string
  content: string
}

interface Props {
  items: Item[]
}

class PreserveScrollList extends React.Component<Props> {
  private listRef = React.createRef<HTMLDivElement>()

  getSnapshotBeforeUpdate(prevProps: Props) {
    // ✅ 检查是否在顶部插入了数据
    if (prevProps.items.length < this.props.items.length) {
      const list = this.listRef.current
      if (list) {
        return {
          scrollHeight: list.scrollHeight,
          scrollTop: list.scrollTop,
        }
      }
    }
    return null
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: {},
    snapshot: { scrollHeight: number; scrollTop: number } | null
  ) {
    if (snapshot) {
      const list = this.listRef.current
      if (list) {
        // ✅ 计算新增内容的高度
        const heightDiff = list.scrollHeight - snapshot.scrollHeight

        // ✅ 调整滚动位置，保持用户看到的内容不变
        list.scrollTop = snapshot.scrollTop + heightDiff
      }
    }
  }

  render() {
    return (
      <div
        ref={this.listRef}
        style={{
          height: '400px',
          overflow: 'auto',
          border: '1px solid #ccc',
        }}
      >
        {this.props.items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '20px',
              borderBottom: '1px solid #eee',
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    )
  }
}
```

### 5.2. 社交媒体动态流示例

```typescript
interface Post {
  id: string
  author: string
  content: string
  timestamp: number
}

interface FeedState {
  posts: Post[]
  hasMore: boolean
}

class SocialFeed extends React.Component<{}, FeedState> {
  private listRef = React.createRef<HTMLDivElement>()
  private isLoadingMore = false

  state: FeedState = {
    posts: [],
    hasMore: true,
  }

  getSnapshotBeforeUpdate(prevProps: {}, prevState: FeedState): number | null {
    const list = this.listRef.current
    if (!list) return null

    // ✅ 检测是否向上加载了旧内容
    const addedOldPosts =
      this.state.posts.length > prevState.posts.length &&
      this.state.posts[0].id !== prevState.posts[0]?.id

    if (addedOldPosts) {
      return list.scrollHeight
    }

    return null
  }

  componentDidUpdate(
    prevProps: {},
    prevState: FeedState,
    snapshot: number | null
  ) {
    if (snapshot !== null) {
      const list = this.listRef.current
      if (list) {
        // ✅ 保持滚动位置
        const newHeight = list.scrollHeight
        list.scrollTop += newHeight - snapshot
      }
    }
  }

  handleScroll = () => {
    const list = this.listRef.current
    if (!list || this.isLoadingMore || !this.state.hasMore) return

    // ✅ 检测是否滚动到顶部
    if (list.scrollTop < 100) {
      this.loadMoreOldPosts()
    }
  }

  loadMoreOldPosts = async () => {
    this.isLoadingMore = true

    // 模拟 API 请求
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const oldestPost = this.state.posts[0]
    const newOldPosts: Post[] = Array.from({ length: 10 }, (_, i) => ({
      id: `old-${Date.now()}-${i}`,
      author: `用户${i}`,
      content: `这是更早的动态 ${i}`,
      timestamp: oldestPost.timestamp - (i + 1) * 1000,
    }))

    this.setState((prevState) => ({
      posts: [...newOldPosts, ...prevState.posts],
    }))

    this.isLoadingMore = false
  }

  render() {
    return (
      <div
        ref={this.listRef}
        onScroll={this.handleScroll}
        style={{
          height: '600px',
          overflow: 'auto',
          border: '1px solid #ccc',
        }}
      >
        {this.state.posts.map((post) => (
          <div
            key={post.id}
            style={{
              padding: '15px',
              borderBottom: '1px solid #eee',
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{post.author}</div>
            <div>{post.content}</div>
            <small>{new Date(post.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    )
  }
}
```

## 6. 🤔 如何实现无限滚动加载？

结合滚动位置检测实现无限加载。

### 6.1. 双向无限滚动

```typescript
interface InfiniteScrollState {
  items: Item[]
  loading: boolean
  hasMoreTop: boolean
  hasMoreBottom: boolean
}

class InfiniteScrollList extends React.Component<{}, InfiniteScrollState> {
  private listRef = React.createRef<HTMLDivElement>()
  private loadingTop = false
  private loadingBottom = false

  state: InfiniteScrollState = {
    items: [],
    loading: false,
    hasMoreTop: true,
    hasMoreBottom: true,
  }

  getSnapshotBeforeUpdate(
    prevProps: {},
    prevState: InfiniteScrollState
  ): { type: 'top' | 'bottom'; scrollHeight: number } | null {
    const list = this.listRef.current
    if (!list) return null

    // ✅ 检测是从顶部还是底部加载
    if (this.state.items.length > prevState.items.length) {
      const firstItem = this.state.items[0]
      const prevFirstItem = prevState.items[0]

      if (firstItem.id !== prevFirstItem?.id) {
        // 从顶部加载
        return {
          type: 'top',
          scrollHeight: list.scrollHeight,
        }
      } else {
        // 从底部加载
        return {
          type: 'bottom',
          scrollHeight: list.scrollHeight,
        }
      }
    }

    return null
  }

  componentDidUpdate(
    prevProps: {},
    prevState: InfiniteScrollState,
    snapshot: { type: 'top' | 'bottom'; scrollHeight: number } | null
  ) {
    if (!snapshot) return

    const list = this.listRef.current
    if (!list) return

    if (snapshot.type === 'top') {
      // ✅ 顶部加载：保持滚动位置
      const heightDiff = list.scrollHeight - snapshot.scrollHeight
      list.scrollTop += heightDiff
    }
    // 底部加载不需要调整滚动位置
  }

  handleScroll = () => {
    const list = this.listRef.current
    if (!list) return

    const { scrollTop, scrollHeight, clientHeight } = list

    // ✅ 接近顶部，加载更多旧数据
    if (scrollTop < 200 && !this.loadingTop && this.state.hasMoreTop) {
      this.loadTop()
    }

    // ✅ 接近底部，加载更多新数据
    if (
      scrollHeight - scrollTop - clientHeight < 200 &&
      !this.loadingBottom &&
      this.state.hasMoreBottom
    ) {
      this.loadBottom()
    }
  }

  loadTop = async () => {
    this.loadingTop = true
    this.setState({ loading: true })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const oldestItem = this.state.items[0]
    const newItems: Item[] = Array.from({ length: 20 }, (_, i) => ({
      id: `top-${Date.now()}-${i}`,
      content: `顶部加载的项目 ${i}`,
    }))

    this.setState((prevState) => ({
      items: [...newItems, ...prevState.items],
      loading: false,
    }))

    this.loadingTop = false
  }

  loadBottom = async () => {
    this.loadingBottom = true
    this.setState({ loading: true })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newItems: Item[] = Array.from({ length: 20 }, (_, i) => ({
      id: `bottom-${Date.now()}-${i}`,
      content: `底部加载的项目 ${i}`,
    }))

    this.setState((prevState) => ({
      items: [...prevState.items, ...newItems],
      loading: false,
    }))

    this.loadingBottom = false
  }

  componentDidMount() {
    // 初始加载
    this.loadBottom()
  }

  render() {
    return (
      <div>
        <div
          ref={this.listRef}
          onScroll={this.handleScroll}
          style={{
            height: '500px',
            overflow: 'auto',
            border: '1px solid #ccc',
          }}
        >
          {this.state.loading && (
            <div style={{ padding: '10px', textAlign: 'center' }}>
              加载中...
            </div>
          )}
          {this.state.items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '20px',
                borderBottom: '1px solid #eee',
              }}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
```

## 7. 🤔 如何测量 DOM 变化？

使用 snapshot 记录 DOM 尺寸变化。

### 7.1. 测量元素尺寸

```typescript
interface SizeSnapshot {
  width: number
  height: number
}

class ResizableComponent extends React.Component<Props, State> {
  private containerRef = React.createRef<HTMLDivElement>()

  getSnapshotBeforeUpdate(prevProps: Props): SizeSnapshot | null {
    const container = this.containerRef.current
    if (!container) return null

    // ✅ 记录更新前的尺寸
    return {
      width: container.offsetWidth,
      height: container.offsetHeight,
    }
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: SizeSnapshot | null
  ) {
    if (!snapshot) return

    const container = this.containerRef.current
    if (!container) return

    // ✅ 比较更新前后的尺寸
    const currentWidth = container.offsetWidth
    const currentHeight = container.offsetHeight

    if (currentWidth !== snapshot.width || currentHeight !== snapshot.height) {
      console.log('尺寸发生变化：')
      console.log(`宽度: ${snapshot.width}px -> ${currentWidth}px`)
      console.log(`高度: ${snapshot.height}px -> ${currentHeight}px`)

      // 执行响应尺寸变化的逻辑
      this.handleResize(currentWidth, currentHeight)
    }
  }

  handleResize(width: number, height: number) {
    // 处理尺寸变化
  }

  render() {
    return <div ref={this.containerRef}>{this.props.content}</div>
  }
}
```

### 7.2. 测量多个元素

```typescript
interface ElementsSnapshot {
  header: DOMRect
  content: DOMRect
  footer: DOMRect
}

class LayoutTracker extends React.Component {
  private headerRef = React.createRef<HTMLElement>()
  private contentRef = React.createRef<HTMLElement>()
  private footerRef = React.createRef<HTMLElement>()

  getSnapshotBeforeUpdate(): ElementsSnapshot | null {
    const header = this.headerRef.current
    const content = this.contentRef.current
    const footer = this.footerRef.current

    if (!header || !content || !footer) return null

    // ✅ 记录所有元素的位置和尺寸
    return {
      header: header.getBoundingClientRect(),
      content: content.getBoundingClientRect(),
      footer: footer.getBoundingClientRect(),
    }
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: ElementsSnapshot | null
  ) {
    if (!snapshot) return

    // ✅ 检测布局变化
    const header = this.headerRef.current
    const content = this.contentRef.current

    if (header && content) {
      const currentHeaderRect = header.getBoundingClientRect()
      const currentContentRect = content.getBoundingClientRect()

      // 检测 header 高度变化
      if (currentHeaderRect.height !== snapshot.header.height) {
        console.log(
          'Header 高度变化:',
          snapshot.header.height,
          '->',
          currentHeaderRect.height
        )
      }

      // 检测 content 位置变化
      if (currentContentRect.top !== snapshot.content.top) {
        console.log(
          'Content 位置变化:',
          snapshot.content.top,
          '->',
          currentContentRect.top
        )
      }
    }
  }

  render() {
    return (
      <div>
        <header ref={this.headerRef}>Header</header>
        <main ref={this.contentRef}>Content</main>
        <footer ref={this.footerRef}>Footer</footer>
      </div>
    )
  }
}
```

## 8. 🤔 如何在函数组件中实现类似功能？

使用 `useLayoutEffect` 实现等价功能。

### 8.1. 聊天列表（函数组件版）

```typescript
function ChatListFunc({ messages }: { messages: Message[] }) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const prevMessagesLengthRef = React.useRef(messages.length)

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    // ✅ 检查是否添加了新消息
    const addedMessages = messages.length > prevMessagesLengthRef.current

    if (addedMessages) {
      // 判断是否在底部
      const isAtBottom =
        list.scrollHeight - list.scrollTop - list.clientHeight < 10

      if (isAtBottom) {
        // ✅ 滚动到底部
        list.scrollTop = list.scrollHeight
      }
    }

    // 更新引用
    prevMessagesLengthRef.current = messages.length
  }, [messages])

  return (
    <div
      ref={listRef}
      style={{
        height: '400px',
        overflow: 'auto',
        border: '1px solid #ccc',
      }}
    >
      {messages.map((msg) => (
        <div key={msg.id} style={{ padding: '10px' }}>
          {msg.text}
        </div>
      ))}
    </div>
  )
}
```

### 8.2. 保持滚动位置（函数组件版）

```typescript
function PreserveScrollFunc({ items }: { items: Item[] }) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const prevScrollHeightRef = React.useRef(0)
  const prevItemsLengthRef = React.useRef(items.length)

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    // ✅ 检查是否添加了数据
    if (items.length > prevItemsLengthRef.current) {
      const currentScrollHeight = list.scrollHeight
      const heightDiff = currentScrollHeight - prevScrollHeightRef.current

      // ✅ 调整滚动位置
      if (heightDiff > 0) {
        list.scrollTop += heightDiff
      }
    }

    // 保存当前值
    prevScrollHeightRef.current = list.scrollHeight
    prevItemsLengthRef.current = items.length
  }, [items])

  return (
    <div
      ref={listRef}
      style={{
        height: '400px',
        overflow: 'auto',
        border: '1px solid #ccc',
      }}
    >
      {items.map((item) => (
        <div key={item.id} style={{ padding: '20px' }}>
          {item.content}
        </div>
      ))}
    </div>
  )
}
```

### 8.3. 自定义 Hook 封装

```typescript
function useScrollToBottom(ref: React.RefObject<HTMLElement>, deps: any[]) {
  const prevDepsRef = React.useRef(deps)

  React.useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    // 检查依赖是否变化
    const depsChanged = deps.some((dep, i) => dep !== prevDepsRef.current[i])

    if (depsChanged) {
      const isAtBottom =
        element.scrollHeight - element.scrollTop - element.clientHeight < 10

      if (isAtBottom) {
        element.scrollTop = element.scrollHeight
      }
    }

    prevDepsRef.current = deps
  }, deps)
}

// 使用
function ChatWithHook({ messages }: { messages: Message[] }) {
  const listRef = React.useRef<HTMLDivElement>(null)

  // ✅ 使用自定义 Hook
  useScrollToBottom(listRef, [messages])

  return (
    <div ref={listRef} style={{ height: '400px', overflow: 'auto' }}>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </div>
  )
}
```

## 9. 🆚 getSnapshotBeforeUpdate vs useLayoutEffect

| 特性       | getSnapshotBeforeUpdate   | useLayoutEffect          |
| ---------- | ------------------------- | ------------------------ |
| 组件类型   | 类组件                    | 函数组件                 |
| 执行时机   | render 后，DOM 更新前     | DOM 更新后，浏览器绘制前 |
| 返回值     | 传递给 componentDidUpdate | 无                       |
| 访问旧 DOM | ✅ 可以                   | ❌ 无法直接访问          |
| 访问新 DOM | ❌ 无法直接访问           | ✅ 可以                  |
| 使用难度   | 中等                      | 需要手动保存状态         |
| 性能       | 略好                      | 略差（额外渲染）         |
| 推荐度     | 类组件必选                | 函数组件替代方案         |

### 9.1. 时序对比

```typescript
// 类组件
class ClassComponent extends React.Component {
  getSnapshotBeforeUpdate() {
    console.log('2. snapshot - 虚拟 DOM 已更新，真实 DOM 未更新')
    return null
  }

  componentDidUpdate() {
    console.log('3. didUpdate - 真实 DOM 已更新')
  }

  render() {
    console.log('1. render')
    return <div />
  }
}

// 函数组件
function FunctionComponent() {
  console.log('1. render')

  React.useLayoutEffect(() => {
    console.log('2. layoutEffect - 真实 DOM 已更新，浏览器绘制前')
  })

  return <div />
}
```

## 10. 🔗 引用

- [getSnapshotBeforeUpdate API 文档][1]
- [React 生命周期图谱][2]
- [useLayoutEffect vs useEffect][3]
- [滚动位置保持最佳实践][4]

[1]: https://react.dev/reference/react/Component#getsnapshotbeforeupdate
[2]: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
[3]: https://react.dev/reference/react/useLayoutEffect
[4]: https://web.dev/articles/rendering-performance
