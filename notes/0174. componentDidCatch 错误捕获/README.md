# [0174. componentDidCatch 错误捕获](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0174.%20componentDidCatch%20%E9%94%99%E8%AF%AF%E6%8D%95%E8%8E%B7)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 componentDidCatch 是什么？](#3--componentdidcatch-是什么)
  - [3.1. 基本定义](#31-基本定义)
  - [3.2. 工作原理](#32-工作原理)
  - [3.3. 捕获的错误类型](#33-捕获的错误类型)
- [4. 🤔 如何实现错误边界？](#4--如何实现错误边界)
  - [4.1. 基础错误边界](#41-基础错误边界)
  - [4.2. 增强版错误边界](#42-增强版错误边界)
  - [4.3. 使用示例](#43-使用示例)
- [5. � 如何上报错误日志？](#5--如何上报错误日志)
  - [5.1. 集成 Sentry](#51-集成-sentry)
  - [5.2. 自定义日志服务](#52-自定义日志服务)
- [6. 🤔 如何设计错误边界的层级结构？](#6--如何设计错误边界的层级结构)
  - [6.1. 三层错误边界架构](#61-三层错误边界架构)
  - [6.2. 关键组件的独立错误边界](#62-关键组件的独立错误边界)
  - [6.3. 路由级错误边界](#63-路由级错误边界)
- [7. 🤔 错误边界有哪些局限性？](#7--错误边界有哪些局限性)
  - [7.1. 无法捕获的错误](#71-无法捕获的错误)
  - [7.2. 解决方案](#72-解决方案)
- [8. 🤔 如何在生产环境中使用错误边界？](#8--如何在生产环境中使用错误边界)
  - [8.1. 环境区分](#81-环境区分)
  - [8.2. 错误恢复策略](#82-错误恢复策略)
- [9. 🆚 componentDidCatch vs getDerivedStateFromError](#9--componentdidcatch-vs-getderivedstatefromerror)
  - [9.1. 配合使用示例](#91-配合使用示例)
- [10. 🔗 引用](#10--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- componentDidCatch 的定义和工作原理
- 错误边界的实现方式
- 错误日志的上报机制
- 错误边界的层级设计
- 错误边界的局限性
- 生产环境的错误处理策略

## 2. 🫧 评价

这篇笔记详细讲解 React 错误边界的实现和最佳实践，帮助构建更健壮的应用。

- 错误边界是 React 16 引入的重要特性，防止局部错误导致整个应用崩溃
- 目前只能在类组件中实现，函数组件暂无官方支持
- 必须配合 `getDerivedStateFromError` 使用，前者更新 UI，后者记录日志
- 合理的错误边界层级设计能提供更好的用户体验和错误定位

## 3. 🤔 componentDidCatch 是什么？

`componentDidCatch` 是一个生命周期方法，用于捕获子组件树中的 JavaScript 错误。

### 3.1. 基本定义

```typescript
interface ErrorInfo {
  componentStack: string
}

class ErrorBoundary extends React.Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 参数 1：抛出的错误对象
    // 参数 2：包含组件调用栈的信息对象

    console.log('捕获到错误:', error)
    console.log('错误堆栈:', error.stack)
    console.log('组件堆栈:', errorInfo.componentStack)

    // ✅ 在这里记录错误日志
    // ✅ 上报到错误监控服务
  }

  render() {
    return this.props.children
  }
}
```

### 3.2. 工作原理

```typescript
interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  }

  // 步骤 1：静态方法更新 state
  static getDerivedStateFromError(error: Error): State {
    console.log('1. getDerivedStateFromError 被调用')

    // ✅ 返回新 state，触发重新渲染
    return {
      hasError: true,
      error,
    }
  }

  // 步骤 2：实例方法记录错误
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('2. componentDidCatch 被调用')
    console.log('error:', error)
    console.log('errorInfo:', errorInfo)

    // ✅ 执行副作用：记录日志、上报错误
    this.logErrorToService(error, errorInfo)
  }

  logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // 上报到错误监控服务
    console.error('上报错误:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    })
  }

  render() {
    if (this.state.hasError) {
      // ✅ 显示降级 UI
      return <h1>出错了！</h1>
    }

    return this.props.children
  }
}

// 使用
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  )
}
```

### 3.3. 捕获的错误类型

```typescript
// ✅ 可以捕获的错误

// 1. 渲染期间的错误
class RenderError extends React.Component {
  render() {
    throw new Error('渲染错误')
    return <div />
  }
}

// 2. 生命周期方法中的错误
class LifecycleError extends React.Component {
  componentDidMount() {
    throw new Error('生命周期错误')
  }

  render() {
    return <div />
  }
}

// 3. 构造函数中的错误
class ConstructorError extends React.Component {
  constructor(props: Props) {
    super(props)
    throw new Error('构造函数错误')
  }

  render() {
    return <div />
  }
}

// ❌ 无法捕获的错误

// 1. 事件处理器中的错误
class EventError extends React.Component {
  handleClick = () => {
    // ❌ 不会被错误边界捕获
    throw new Error('事件处理器错误')
  }

  render() {
    return <button onClick={this.handleClick}>点击</button>
  }
}

// 2. 异步代码中的错误
class AsyncError extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      // ❌ 不会被错误边界捕获
      throw new Error('异步错误')
    }, 1000)
  }

  render() {
    return <div />
  }
}

// 3. 服务端渲染的错误
// ❌ SSR 中的错误不会被捕获

// 4. 错误边界自身的错误
// ❌ 错误边界内部抛出的错误无法自己捕获
```

## 4. 🤔 如何实现错误边界？

创建一个通用的错误边界组件。

### 4.1. 基础错误边界

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 保存错误信息到 state
    this.setState({
      errorInfo,
    })

    // 记录到控制台
    console.error('错误边界捕获到错误:')
    console.error('错误对象:', error)
    console.error('错误消息:', error.message)
    console.error('错误堆栈:', error.stack)
    console.error('组件堆栈:', errorInfo.componentStack)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px' }}>
          <h2>糟糕，出错了！</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>点击查看错误详情</summary>
            <p style={{ color: 'red' }}>{this.state.error?.message}</p>
            <p>{this.state.error?.stack}</p>
            <p>{this.state.errorInfo?.componentStack}</p>
          </details>
          <button onClick={this.handleReset}>重试</button>
        </div>
      )
    }

    return this.props.children
  }
}
```

### 4.2. 增强版错误边界

```typescript
interface EnhancedErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  level?: 'app' | 'page' | 'component'
}

interface EnhancedErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
  errorCount: number
}

class EnhancedErrorBoundary extends React.Component<
  EnhancedErrorBoundaryProps,
  EnhancedErrorBoundaryState
> {
  state: EnhancedErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
    errorCount: 0,
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<EnhancedErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState((prevState) => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }))

    // ✅ 调用外部错误处理函数
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // ✅ 根据错误级别采取不同策略
    const { level = 'component' } = this.props

    console.error(`[${level.toUpperCase()}] 错误边界捕获到错误:`, {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      level,
      errorCount: this.state.errorCount + 1,
    })

    // ✅ 自动上报错误
    this.reportError(error, errorInfo)
  }

  reportError(error: Error, errorInfo: React.ErrorInfo) {
    // 发送到错误监控服务
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        level: this.props.level,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch((err) => {
      console.error('错误上报失败:', err)
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      // ✅ 使用自定义 fallback
      if (this.props.fallback) {
        return this.props.fallback
      }

      // ✅ 错误次数过多，显示严重错误信息
      if (this.state.errorCount >= 3) {
        return (
          <div style={{ padding: '20px', backgroundColor: '#fee' }}>
            <h2>应用遇到严重错误</h2>
            <p>请刷新页面或联系技术支持</p>
          </div>
        )
      }

      // ✅ 默认错误 UI
      return (
        <div style={{ padding: '20px' }}>
          <h2>出错了</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>重试</button>
        </div>
      )
    }

    return this.props.children
  }
}
```

### 4.3. 使用示例

```typescript
function App() {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // 自定义错误处理逻辑
    console.log('应用层错误处理:', error)
  }

  return (
    <EnhancedErrorBoundary
      level="app"
      onError={handleError}
      fallback={<div>应用出错了</div>}
    >
      <Header />

      <EnhancedErrorBoundary level="page">
        <MainContent />
      </EnhancedErrorBoundary>

      <EnhancedErrorBoundary level="component">
        <Sidebar />
      </EnhancedErrorBoundary>
    </EnhancedErrorBoundary>
  )
}
```

## 5. � 如何上报错误日志？

集成第三方错误监控服务。

### 5.1. 集成 Sentry

```typescript
interface SentryErrorBoundaryProps {
  children: React.ReactNode
}

interface SentryErrorBoundaryState {
  hasError: boolean
  eventId: string | null
}

class SentryErrorBoundary extends React.Component<
  SentryErrorBoundaryProps,
  SentryErrorBoundaryState
> {
  state: SentryErrorBoundaryState = {
    hasError: false,
    eventId: null,
  }

  static getDerivedStateFromError(): Partial<SentryErrorBoundaryState> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // ✅ 使用 Sentry 捕获错误
    const eventId = Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    })

    this.setState({ eventId })

    console.error('错误已上报到 Sentry, Event ID:', eventId)
  }

  handleReportFeedback = () => {
    // ✅ 打开 Sentry 用户反馈对话框
    if (this.state.eventId) {
      Sentry.showReportDialog({
        eventId: this.state.eventId,
        title: '应用出错了',
        subtitle: '我们的团队已收到通知',
        subtitle2: '如果您愿意，可以告诉我们发生了什么',
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px' }}>
          <h2>出错了</h2>
          <p>我们已经收到错误报告</p>
          <button onClick={this.handleReportFeedback}>提供反馈</button>
        </div>
      )
    }

    return this.props.children
  }
}

// 初始化 Sentry
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: process.env.NODE_ENV,
  beforeSend(event, hint) {
    // 可以在这里过滤或修改事件
    console.log('发送错误到 Sentry:', event)
    return event
  },
})
```

### 5.2. 自定义日志服务

```typescript
class LoggerService {
  private static endpoint = '/api/logs'

  static async logError(
    error: Error,
    errorInfo: React.ErrorInfo,
    context?: Record<string, any>
  ) {
    const errorData = {
      // 错误基本信息
      message: error.message,
      stack: error.stack,
      name: error.name,

      // React 组件堆栈
      componentStack: errorInfo.componentStack,

      // 环境信息
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      platform: navigator.platform,

      // 用户信息（如果有）
      userId: this.getUserId(),
      sessionId: this.getSessionId(),

      // 自定义上下文
      context: context || {},
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      })

      if (!response.ok) {
        throw new Error(`日志上报失败: ${response.status}`)
      }

      console.log('错误日志已上报')
    } catch (err) {
      // ✅ 上报失败时的降级处理
      console.error('日志上报失败:', err)
      this.fallbackLog(errorData)
    }
  }

  private static fallbackLog(errorData: any) {
    // ✅ 保存到 localStorage 作为降级方案
    try {
      const logs = JSON.parse(localStorage.getItem('error_logs') || '[]')
      logs.push(errorData)

      // 只保留最近 10 条
      const recentLogs = logs.slice(-10)
      localStorage.setItem('error_logs', JSON.stringify(recentLogs))
    } catch (err) {
      console.error('降级日志存储失败:', err)
    }
  }

  private static getUserId(): string | null {
    // 从认证系统获取用户 ID
    return localStorage.getItem('userId')
  }

  private static getSessionId(): string {
    let sessionId = sessionStorage.getItem('sessionId')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random()}`
      sessionStorage.setItem('sessionId', sessionId)
    }
    return sessionId
  }
}

// 使用
class LoggingErrorBoundary extends React.Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // ✅ 调用日志服务
    LoggerService.logError(error, errorInfo, {
      component: 'LoggingErrorBoundary',
      props: this.props,
    })
  }

  render() {
    // ...
  }
}
```

## 6. 🤔 如何设计错误边界的层级结构？

根据应用结构设置多层错误边界。

### 6.1. 三层错误边界架构

```typescript
// 第一层：应用级错误边界
function App() {
  return (
    <EnhancedErrorBoundary
      level="app"
      fallback={
        <div className="app-error">
          <h1>应用出错了</h1>
          <p>请刷新页面重试</p>
        </div>
      }
    >
      <Router>
        <Layout />
      </Router>
    </EnhancedErrorBoundary>
  )
}

// 第二层：页面级错误边界
function Layout() {
  return (
    <div>
      <Header />
      <EnhancedErrorBoundary
        level="page"
        fallback={
          <div className="page-error">
            <h2>页面加载失败</h2>
            <button onClick={() => window.location.reload()}>刷新页面</button>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </EnhancedErrorBoundary>
      <Footer />
    </div>
  )
}

// 第三层：组件级错误边界
function HomePage() {
  return (
    <div>
      <EnhancedErrorBoundary
        level="component"
        fallback={<div>推荐内容加载失败</div>}
      >
        <RecommendationList />
      </EnhancedErrorBoundary>

      <EnhancedErrorBoundary
        level="component"
        fallback={<div>评论加载失败</div>}
      >
        <CommentSection />
      </EnhancedErrorBoundary>
    </div>
  )
}
```

### 6.2. 关键组件的独立错误边界

```typescript
function Dashboard() {
  return (
    <div className="dashboard">
      {/* 关键统计数据 - 独立错误边界 */}
      <EnhancedErrorBoundary
        fallback={<div className="stats-error">统计数据暂时无法显示</div>}
      >
        <Statistics />
      </EnhancedErrorBoundary>

      {/* 图表区域 - 独立错误边界 */}
      <EnhancedErrorBoundary
        fallback={<div className="chart-error">图表加载失败</div>}
      >
        <ChartArea />
      </EnhancedErrorBoundary>

      {/* 数据表格 - 独立错误边界 */}
      <EnhancedErrorBoundary
        fallback={
          <div className="table-error">
            表格数据加载失败
            <button onClick={() => window.location.reload()}>重新加载</button>
          </div>
        }
      >
        <DataTable />
      </EnhancedErrorBoundary>
    </div>
  )
}
```

### 6.3. 路由级错误边界

```typescript
function RouterWithErrorBoundary() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <EnhancedErrorBoundary fallback={<HomeErrorPage />}>
              <HomePage />
            </EnhancedErrorBoundary>
          }
        />
        <Route
          path="/admin/*"
          element={
            <EnhancedErrorBoundary fallback={<AdminErrorPage />}>
              <AdminRoutes />
            </EnhancedErrorBoundary>
          }
        />
        <Route
          path="/user/*"
          element={
            <EnhancedErrorBoundary fallback={<UserErrorPage />}>
              <UserRoutes />
            </EnhancedErrorBoundary>
          }
        />
      </Routes>
    </Router>
  )
}
```

## 7. 🤔 错误边界有哪些局限性？

了解错误边界无法处理的场景。

### 7.1. 无法捕获的错误

```typescript
class LimitationsDemo extends React.Component {
  state = { count: 0 }

  // ❌ 事件处理器中的错误
  handleClick = () => {
    try {
      // 需要手动 try-catch
      throw new Error('事件处理器错误')
    } catch (error) {
      console.error('手动捕获:', error)
      this.setState({ error })
    }
  }

  // ❌ 异步代码中的错误
  async componentDidMount() {
    try {
      // 需要手动 try-catch
      const data = await fetch('/api/data').then((r) => r.json())
      this.setState({ data })
    } catch (error) {
      console.error('手动捕获异步错误:', error)
      this.setState({ error })
    }
  }

  // ❌ setTimeout 中的错误
  componentDidMount() {
    setTimeout(() => {
      try {
        throw new Error('定时器错误')
      } catch (error) {
        console.error('手动捕获定时器错误:', error)
      }
    }, 1000)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>触发事件错误</button>
      </div>
    )
  }
}
```

### 7.2. 解决方案

```typescript
// 方案 1：全局错误处理
window.addEventListener('error', (event) => {
  console.error('全局错误:', event.error)
  // 上报错误
  LoggerService.logError(event.error, { type: 'global' })
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 拒绝:', event.reason)
  // 上报错误
  LoggerService.logError(event.reason, { type: 'promise' })
})

// 方案 2：封装异步操作
class SafeAsyncComponent extends React.Component<Props, State> {
  mounted = false

  componentDidMount() {
    this.mounted = true
    this.fetchData()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  async fetchData() {
    try {
      const data = await fetch('/api/data').then((r) => r.json())

      // ✅ 检查组件是否仍然挂载
      if (this.mounted) {
        this.setState({ data })
      }
    } catch (error) {
      if (this.mounted) {
        this.setState({ error })
      }
      // ✅ 手动上报错误
      LoggerService.logError(error, { component: 'SafeAsyncComponent' })
    }
  }

  render() {
    // ...
  }
}

// 方案 3：自定义 Hook 处理异步错误
function useAsyncError() {
  const [, setError] = React.useState()

  return React.useCallback(
    (error: Error) => {
      setError(() => {
        throw error // 抛出错误让错误边界捕获
      })
    },
    [setError]
  )
}

function AsyncComponent() {
  const throwError = useAsyncError()

  React.useEffect(() => {
    fetch('/api/data')
      .then((r) => r.json())
      .catch((error) => {
        // ✅ 将异步错误转换为同步错误
        throwError(error)
      })
  }, [throwError])

  return <div>内容</div>
}
```

## 8. 🤔 如何在生产环境中使用错误边界？

生产环境需要特殊处理。

### 8.1. 环境区分

```typescript
interface ProductionErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ProductionErrorBoundary extends React.Component<
  Props,
  ProductionErrorBoundaryState
> {
  state: ProductionErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<ProductionErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const isDevelopment = process.env.NODE_ENV === 'development'

    if (isDevelopment) {
      // ✅ 开发环境：显示详细错误信息
      console.error('开发环境错误详情:')
      console.error('错误:', error)
      console.error('组件堆栈:', errorInfo.componentStack)
    } else {
      // ✅ 生产环境：隐藏敏感信息，上报错误
      console.error('生产环境错误:', error.message)

      // 上报到监控服务
      this.reportToMonitoring(error, errorInfo)
    }
  }

  reportToMonitoring(error: Error, errorInfo: React.ErrorInfo) {
    // 上报到 Sentry、DataDog 等服务
    fetch('/api/monitoring/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        version: process.env.REACT_APP_VERSION,
        buildId: process.env.REACT_APP_BUILD_ID,
      }),
    })
  }

  render() {
    if (this.state.hasError) {
      const isDevelopment = process.env.NODE_ENV === 'development'

      if (isDevelopment) {
        // ✅ 开发环境：显示完整错误信息
        return (
          <div style={{ padding: '20px', backgroundColor: '#fee' }}>
            <h2>开发环境错误</h2>
            <details>
              <summary>错误详情</summary>
              <pre>{this.state.error?.message}</pre>
              <pre>{this.state.error?.stack}</pre>
            </details>
          </div>
        )
      }

      // ✅ 生产环境：显示友好错误信息
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>抱歉，出现了一些问题</h2>
          <p>我们正在处理这个问题</p>
          <button onClick={() => window.location.reload()}>刷新页面</button>
        </div>
      )
    }

    return this.props.children
  }
}
```

### 8.2. 错误恢复策略

```typescript
interface RecoverableErrorBoundaryState {
  hasError: boolean
  errorCount: number
  lastErrorTime: number
}

class RecoverableErrorBoundary extends React.Component<
  Props,
  RecoverableErrorBoundaryState
> {
  state: RecoverableErrorBoundaryState = {
    hasError: false,
    errorCount: 0,
    lastErrorTime: 0,
  }

  static getDerivedStateFromError(): Partial<RecoverableErrorBoundaryState> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const now = Date.now()
    const timeSinceLastError = now - this.state.lastErrorTime

    this.setState((prevState) => ({
      errorCount: timeSinceLastError < 5000 ? prevState.errorCount + 1 : 1,
      lastErrorTime: now,
    }))

    // ✅ 错误频率过高，禁止自动恢复
    if (this.state.errorCount >= 3) {
      console.error('错误频率过高，停止自动恢复')
      return
    }

    // ✅ 自动恢复（适用于偶发错误）
    setTimeout(() => {
      console.log('尝试自动恢复...')
      this.setState({
        hasError: false,
        errorCount: 0,
      })
    }, 2000)
  }

  render() {
    if (this.state.hasError) {
      if (this.state.errorCount >= 3) {
        return (
          <div>
            <h2>出现严重错误</h2>
            <p>请刷新页面</p>
          </div>
        )
      }

      return (
        <div>
          <p>出现临时错误，正在恢复...</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

## 9. 🆚 componentDidCatch vs getDerivedStateFromError

| 特性           | componentDidCatch | getDerivedStateFromError |
| -------------- | ----------------- | ------------------------ |
| 方法类型       | 实例方法          | 静态方法                 |
| 调用时机       | 渲染阶段之后      | 渲染阶段期间             |
| 可以执行副作用 | ✅ 可以           | ❌ 不可以                |
| 可以访问 this  | ✅ 可以           | ❌ 不可以                |
| 返回值         | 无                | 返回新 state             |
| 主要用途       | 记录错误日志      | 更新 UI 显示降级内容     |
| 是否必须       | ❌ 可选           | ✅ 必须（配合使用）      |
| 参数           | error, errorInfo  | error                    |

### 9.1. 配合使用示例

```typescript
class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
    error: null,
  }

  // ✅ 静态方法：更新 state，触发重新渲染
  static getDerivedStateFromError(error: Error) {
    console.log('1. getDerivedStateFromError - 更新 UI')
    return {
      hasError: true,
      error,
    }
  }

  // ✅ 实例方法：执行副作用，记录日志
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('2. componentDidCatch - 记录日志')

    // 可以访问 this
    console.log('组件 props:', this.props)

    // 可以执行副作用
    this.logError(error, errorInfo)
  }

  logError(error: Error, errorInfo: React.ErrorInfo) {
    // 上报错误
  }

  render() {
    if (this.state.hasError) {
      return <div>出错了</div>
    }
    return this.props.children
  }
}
```

## 10. 🔗 引用

- [Error Boundaries 官方文档][1]
- [componentDidCatch API 参考][2]
- [Sentry React 错误监控][3]
- [React 错误处理最佳实践][4]

[1]: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
[2]: https://react.dev/reference/react/Component#componentdidcatch
[3]: https://docs.sentry.io/platforms/javascript/guides/react/
[4]: https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react
