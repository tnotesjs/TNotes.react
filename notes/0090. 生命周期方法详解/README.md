# [0090. 生命周期方法详解](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0090.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%96%B9%E6%B3%95%E8%AF%A6%E8%A7%A3)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 什么是生命周期方法？](#2-什么是生命周期方法)
- [3. 挂载阶段有哪些生命周期方法？](#3-挂载阶段有哪些生命周期方法)
  - [3.1. constructor](#31-constructor)
  - [3.2. getDerivedStateFromProps](#32-getderivedstatefromprops)
  - [3.3. componentDidMount](#33-componentdidmount)
- [4. 更新阶段有哪些生命周期方法？](#4-更新阶段有哪些生命周期方法)
  - [4.1. shouldComponentUpdate](#41-shouldcomponentupdate)
  - [4.2. getSnapshotBeforeUpdate](#42-getsnapshotbeforeupdate)
  - [4.3. componentDidUpdate](#43-componentdidupdate)
- [5. 卸载阶段有哪些生命周期方法？](#5-卸载阶段有哪些生命周期方法)
  - [5.1. componentWillUnmount](#51-componentwillunmount)
- [6. 哪些生命周期方法已经废弃？](#6-哪些生命周期方法已经废弃)
- [7. 如何使用错误边界生命周期？](#7-如何使用错误边界生命周期)
- [8. 常用生命周期方法对比](#8-常用生命周期方法对比)
- [9. 引用](#9-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 生命周期方法的概念与分类
- 挂载阶段的生命周期方法
- 更新阶段的生命周期方法
- 卸载阶段的生命周期方法
- 已废弃的生命周期方法
- 错误边界生命周期的使用
- 常用生命周期方法的对比

生命周期方法是 React 类组件的核心概念，用于在组件的不同阶段执行特定的逻辑，但在函数组件中已被 Hooks 替代。

- 生命周期方法仅适用于类组件，函数组件应使用 `useEffect` 等 Hooks
- `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 是最常用的三个生命周期方法
- React 16.3 废弃了 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate`，引入了 `getDerivedStateFromProps` 和 `getSnapshotBeforeUpdate`
- 错误边界使用 `componentDidCatch` 和 `getDerivedStateFromError` 来捕获子组件错误
- 现代 React 开发推荐使用函数组件和 Hooks，生命周期方法主要用于维护旧代码

## 2. 什么是生命周期方法？

生命周期方法是 React 类组件在不同阶段自动调用的特殊方法，允许开发者在特定时机执行代码。

```tsx
// 生命周期方法的基本示例
class LifecycleDemo extends React.Component<{}, { count: number }> {
  state = { count: 0 };

  // 挂载阶段
  constructor(props: {}) {
    super(props);
    console.log("1. constructor - 组件初始化");
  }

  componentDidMount() {
    console.log("3. componentDidMount - 组件挂载完成");
  }

  // 更新阶段
  shouldComponentUpdate(nextProps: {}, nextState: { count: number }) {
    console.log("4. shouldComponentUpdate - 是否更新");
    return true;
  }

  componentDidUpdate(prevProps: {}, prevState: { count: number }) {
    console.log("6. componentDidUpdate - 组件更新完成");
  }

  // 卸载阶段
  componentWillUnmount() {
    console.log("7. componentWillUnmount - 组件即将卸载");
  }

  render() {
    console.log("2/5. render - 渲染组件");
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          增加
        </button>
      </div>
    );
  }
}
```

**生命周期三大阶段：**

```tsx
// 阶段 1：挂载（Mounting）
// constructor → getDerivedStateFromProps → render → componentDidMount

// 阶段 2：更新（Updating）
// getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate

// 阶段 3：卸载（Unmounting）
// componentWillUnmount
```

## 3. 挂载阶段有哪些生命周期方法？

挂载阶段是组件实例被创建并插入 DOM 的过程，依次执行以下生命周期方法。

### 3.1. constructor

构造函数，用于初始化状态和绑定方法。

```tsx
class MyComponent extends React.Component<
  { initialCount: number },
  { count: number }
> {
  constructor(props: { initialCount: number }) {
    super(props); // 必须首先调用

    // 初始化 state
    this.state = {
      count: props.initialCount,
    };

    // 绑定方法（如果使用普通函数）
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>Count: {this.state.count}</button>
    );
  }
}
```

### 3.2. getDerivedStateFromProps

静态方法，根据 props 派生 state，在每次渲染前调用。

```tsx
class EmailInput extends React.Component<
  { email: string },
  { email: string; prevPropsEmail: string }
> {
  state = {
    email: this.props.email,
    prevPropsEmail: this.props.email,
  };

  static getDerivedStateFromProps(
    props: { email: string },
    state: { email: string; prevPropsEmail: string },
  ) {
    // 当 props.email 变化时，重置 state.email
    if (props.email !== state.prevPropsEmail) {
      return {
        email: props.email,
        prevPropsEmail: props.email,
      };
    }
    return null; // 不更新 state
  }

  render() {
    return (
      <input
        value={this.state.email}
        onChange={(e) => this.setState({ email: e.target.value })}
      />
    );
  }
}
```

### 3.3. componentDidMount

组件挂载完成后调用，适合执行 DOM 操作、数据获取、订阅等副作用。

```tsx
class UserProfile extends React.Component<{ userId: number }, { user: any }> {
  state = { user: null };

  componentDidMount() {
    // 1. 数据获取
    fetch(`/api/users/${this.props.userId}`)
      .then((res) => res.json())
      .then((user) => this.setState({ user }));

    // 2. DOM 操作
    document.title = "用户资料";

    // 3. 添加事件监听
    window.addEventListener("resize", this.handleResize);

    // 4. 启动定时器
    this.timer = setInterval(() => {
      console.log("定时任务");
    }, 1000);
  }

  componentWillUnmount() {
    // 清理副作用
    window.removeEventListener("resize", this.handleResize);
    clearInterval(this.timer);
  }

  handleResize = () => {
    console.log("窗口大小变化");
  };

  timer?: NodeJS.Timeout;

  render() {
    return <div>{this.state.user?.name}</div>;
  }
}
```

## 4. 更新阶段有哪些生命周期方法？

更新阶段发生在 props 或 state 变化时，组件会重新渲染。

### 4.1. shouldComponentUpdate

决定组件是否需要重新渲染，返回 `false` 可跳过渲染以优化性能。

```tsx
class OptimizedList extends React.Component<
  { items: string[] },
  { filter: string }
> {
  state = { filter: "" };

  shouldComponentUpdate(
    nextProps: { items: string[] },
    nextState: { filter: string },
  ) {
    // 仅当 items 或 filter 变化时才重新渲染
    return (
      this.props.items !== nextProps.items ||
      this.state.filter !== nextState.filter
    );
  }

  render() {
    console.log("渲染"); // 优化后减少渲染次数
    const filteredItems = this.props.items.filter((item) =>
      item.includes(this.state.filter),
    );
    return (
      <div>
        <input
          value={this.state.filter}
          onChange={(e) => this.setState({ filter: e.target.value })}
        />
        <ul>
          {filteredItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}
```

### 4.2. getSnapshotBeforeUpdate

在 DOM 更新前调用，返回值将作为 `componentDidUpdate` 的第三个参数。

```tsx
class ScrollList extends React.Component<{ messages: string[] }, {}> {
  listRef = React.createRef<HTMLDivElement>();

  getSnapshotBeforeUpdate(prevProps: { messages: string[] }) {
    // 如果有新消息，记录滚动位置
    if (prevProps.messages.length < this.props.messages.length) {
      const list = this.listRef.current;
      return list ? list.scrollHeight - list.scrollTop : null;
    }
    return null;
  }

  componentDidUpdate(
    prevProps: { messages: string[] },
    prevState: {},
    snapshot: number | null,
  ) {
    // 根据快照调整滚动位置，保持用户查看位置
    if (snapshot !== null) {
      const list = this.listRef.current;
      if (list) {
        list.scrollTop = list.scrollHeight - snapshot;
      }
    }
  }

  render() {
    return (
      <div ref={this.listRef} style={{ height: "200px", overflow: "auto" }}>
        {this.props.messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
    );
  }
}
```

### 4.3. componentDidUpdate

组件更新完成后调用，可用于 DOM 操作或根据 props 变化执行副作用。

```tsx
class UserDetail extends React.Component<{ userId: number }, { user: any }> {
  state = { user: null };

  componentDidMount() {
    this.fetchUser(this.props.userId);
  }

  componentDidUpdate(prevProps: { userId: number }) {
    // 当 userId 变化时重新获取数据
    if (this.props.userId !== prevProps.userId) {
      this.fetchUser(this.props.userId);
    }
  }

  fetchUser(userId: number) {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((user) => this.setState({ user }));
  }

  render() {
    return <div>{this.state.user?.name}</div>;
  }
}
```

## 5. 卸载阶段有哪些生命周期方法？

卸载阶段只有一个生命周期方法，用于清理副作用。

### 5.1. componentWillUnmount

组件卸载前调用，用于清理定时器、取消网络请求、移除事件监听等。

```tsx
class Timer extends React.Component<{}, { time: number }> {
  state = { time: 0 };
  timerId?: NodeJS.Timeout;

  componentDidMount() {
    // 启动定时器
    this.timerId = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);

    // 添加事件监听
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  componentWillUnmount() {
    // ✅ 清理定时器
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    // ✅ 移除事件监听
    window.removeEventListener("beforeunload", this.handleBeforeUnload);

    // ✅ 取消网络请求（如果使用 AbortController）
    // this.abortController.abort();
  }

  handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  render() {
    return <div>时间：{this.state.time}秒</div>;
  }
}
```

**清理副作用的典型场景：**

```tsx
class WebSocketComponent extends React.Component {
  ws?: WebSocket;

  componentDidMount() {
    // 建立 WebSocket 连接
    this.ws = new WebSocket("ws://example.com");
    this.ws.onmessage = this.handleMessage;
  }

  componentWillUnmount() {
    // 关闭 WebSocket 连接
    if (this.ws) {
      this.ws.close();
    }
  }

  handleMessage = (event: MessageEvent) => {
    console.log("收到消息：", event.data);
  };

  render() {
    return <div>WebSocket 组件</div>;
  }
}
```

## 6. 哪些生命周期方法已经废弃？

React 16.3 废弃了三个生命周期方法，因为它们在异步渲染中可能导致问题。

```tsx
// ❌ 已废弃：componentWillMount
class OldComponent extends React.Component {
  componentWillMount() {
    // 问题：在服务端渲染时会执行，但 DOM 操作无效
    // 问题：可能被多次调用（异步渲染）
    console.log("即将挂载");
  }

  // ✅ 替代方案：使用 constructor 或 componentDidMount
  constructor(props: {}) {
    super(props);
    console.log("初始化");
  }

  componentDidMount() {
    console.log("挂载完成");
  }
}
```

```tsx
// ❌ 已废弃：componentWillReceiveProps
class OldPropsHandler extends React.Component<
  { userId: number },
  { loading: boolean }
> {
  state = { loading: false };

  componentWillReceiveProps(nextProps: { userId: number }) {
    // 问题：初始渲染也会调用
    // 问题：props 未变化也可能调用
    if (nextProps.userId !== this.props.userId) {
      this.setState({ loading: true });
    }
  }

  // ✅ 替代方案：使用 getDerivedStateFromProps 或 componentDidUpdate
  static getDerivedStateFromProps(
    props: { userId: number },
    state: { loading: boolean; prevUserId?: number },
  ) {
    if (props.userId !== state.prevUserId) {
      return { loading: true, prevUserId: props.userId };
    }
    return null;
  }
}
```

```tsx
// ❌ 已废弃：componentWillUpdate
class OldUpdateHandler extends React.Component {
  componentWillUpdate(nextProps: any, nextState: any) {
    // 问题：可能被多次调用而不渲染
    console.log("即将更新");
  }

  // ✅ 替代方案：使用 getSnapshotBeforeUpdate 或 componentDidUpdate
  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log("更新前快照");
    return null;
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    console.log("更新完成");
  }
}
```

## 7. 如何使用错误边界生命周期？

错误边界是捕获子组件错误的特殊组件，使用 `componentDidCatch` 和 `getDerivedStateFromError`。

```tsx
// 错误边界组件
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = {
    hasError: false,
    error: null,
  };

  // 捕获错误并更新 state
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  // 记录错误信息
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("捕获到错误：", error);
    console.error("错误堆栈：", errorInfo.componentStack);

    // 可以上报错误到监控服务
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>出错了！</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// 使用错误边界
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

function BuggyComponent() {
  const [count, setCount] = useState(0);

  if (count > 5) {
    throw new Error("崩溃了！");
  }

  return <button onClick={() => setCount(count + 1)}>点击次数：{count}</button>;
}
```

**错误边界的注意事项：**

```tsx
// ⚠️ 错误边界无法捕获以下错误：
// 1. 事件处理器中的错误
// 2. 异步代码（setTimeout、Promise）
// 3. 服务端渲染
// 4. 错误边界自身的错误

class ErrorBoundaryLimitations extends React.Component {
  handleClick = () => {
    try {
      throw new Error("事件错误"); // ❌ 错误边界无法捕获
    } catch (error) {
      console.error("手动捕获：", error); // ✅ 需要手动捕获
    }
  };

  componentDidMount() {
    // ❌ 错误边界无法捕获异步错误
    setTimeout(() => {
      throw new Error("异步错误");
    }, 1000);

    // ✅ 需要手动捕获
    setTimeout(() => {
      try {
        throw new Error("异步错误");
      } catch (error) {
        console.error("手动捕获：", error);
      }
    }, 1000);
  }

  render() {
    return <button onClick={this.handleClick}>点击</button>;
  }
}
```

## 8. 常用生命周期方法对比

| 生命周期方法 | 调用时机 | 常见用途 | 注意事项 |
| --- | --- | --- | --- |
| `constructor` | 组件创建时 | 初始化 state、绑定方法 | 必须调用 `super(props)` |
| `componentDidMount` | 组件挂载后 | 数据获取、DOM 操作、订阅 | 只调用一次 |
| `shouldComponentUpdate` | 更新前 | 性能优化 | 返回 `false` 阻止渲染 |
| `componentDidUpdate` | 组件更新后 | 根据 props 变化执行操作 | 需要条件判断避免死循环 |
| `componentWillUnmount` | 组件卸载前 | 清理副作用 | 清理定时器、取消订阅 |
| `getDerivedStateFromProps` | 渲染前 | 根据 props 派生 state | 静态方法，少用 |
| `getSnapshotBeforeUpdate` | DOM 更新前 | 捕获更新前的信息 | 返回值传给 `componentDidUpdate` |
| `componentDidCatch` | 子组件错误时 | 错误边界 | 只捕获子组件错误 |

**函数组件与 Hooks 对比：**

```tsx
// 类组件生命周期
class ClassComponent extends React.Component {
  componentDidMount() {
    console.log("挂载");
  }

  componentDidUpdate() {
    console.log("更新");
  }

  componentWillUnmount() {
    console.log("卸载");
  }

  render() {
    return <div>类组件</div>;
  }
}

// 函数组件 Hooks 等价实现
function FunctionComponent() {
  useEffect(() => {
    console.log("挂载");

    return () => {
      console.log("卸载");
    };
  }, []); // 空数组表示只在挂载时执行

  useEffect(() => {
    console.log("更新");
  }); // 无依赖数组表示每次更新都执行

  return <div>函数组件</div>;
}
```

## 9. 引用

- [React 文档 - 生命周期方法][1]
- [React 生命周期图谱][2]
- [React 文档 - 错误边界][3]

[1]: https://react.dev/reference/react/Component#reference
[2]: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
[3]: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
