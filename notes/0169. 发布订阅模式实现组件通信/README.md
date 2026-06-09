# [0169. 发布订阅模式实现组件通信](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0169.%20%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F%E5%AE%9E%E7%8E%B0%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 什么是发布订阅模式？](#3-什么是发布订阅模式)
  - [3.1. 基本概念](#31-基本概念)
  - [3.2. 发布订阅 vs 观察者模式](#32-发布订阅-vs-观察者模式)
  - [3.3. 核心特点](#33-核心特点)
- [4. � 如何实现事件总线？](#4--如何实现事件总线)
  - [4.1. 基础实现](#41-基础实现)
  - [4.2. 增强实现](#42-增强实现)
  - [4.3. TypeScript 实现](#43-typescript-实现)
- [5. 如何在 React 中使用事件总线？](#5-如何在-react-中使用事件总线)
  - [5.1. 基本使用](#51-基本使用)
  - [5.2. 封装自定义 Hook](#52-封装自定义-hook)
  - [5.3. 实战示例：全局通知系统](#53-实战示例全局通知系统)
- [6. 发布订阅模式的应用场景？](#6-发布订阅模式的应用场景)
  - [6.1. 场景 1：跨组件通知](#61-场景-1跨组件通知)
  - [6.2. 场景 2：全局状态同步](#62-场景-2全局状态同步)
  - [6.3. 场景 3：解耦业务逻辑](#63-场景-3解耦业务逻辑)
  - [6.4. 场景 4：实时通信](#64-场景-4实时通信)
  - [6.5. 场景 5：插件系统](#65-场景-5插件系统)
- [7. 发布订阅模式的注意事项？](#7-发布订阅模式的注意事项)
  - [7.1. 注意事项 1：内存泄漏](#71-注意事项-1内存泄漏)
  - [7.2. 注意事项 2：回调依赖问题](#72-注意事项-2回调依赖问题)
  - [7.3. 注意事项 3：事件命名冲突](#73-注意事项-3事件命名冲突)
  - [7.4. 注意事项 4：调试困难](#74-注意事项-4调试困难)
  - [7.5. 注意事项 5：避免循环触发](#75-注意事项-5避免循环触发)
- [8. 发布订阅 vs 其他通信方式](#8-发布订阅-vs-其他通信方式)
  - [8.1. 对比表格](#81-对比表格)
  - [8.2. 各方案对比示例](#82-各方案对比示例)
- [9. 引用](#9-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 发布订阅模式的概念和原理
- 事件总线的实现方法
- React 中使用发布订阅进行组件通信
- 发布订阅模式的适用场景
- 与其他通信方式的对比

## 2. 评价

发布订阅模式是一种解耦的组件通信方式，适用于跨层级、无直接关系的组件间通信。

- 发布订阅解耦了发送方和接收方，组件间无需直接引用
- 适合处理全局事件、跨组件通信、业务解耦等场景
- 需要注意内存泄漏，必须在组件卸载时取消订阅
- 相比 props 和 Context，发布订阅更灵活但也更难追踪
- 现代项目中，更推荐使用状态管理库或 Context

## 3. 什么是发布订阅模式？

### 3.1. 基本概念

发布订阅模式是一种消息传递范式，发布者发布事件，订阅者监听并响应事件，双方通过事件总线解耦。

```jsx
// 发布订阅模式的三个角色：
// 1. 发布者（Publisher）：发布事件
// 2. 订阅者（Subscriber）：订阅事件
// 3. 事件总线（Event Bus）：管理事件

// 发布者
eventBus.emit('userLogin', { userId: 123 })

// 订阅者
eventBus.on('userLogin', (data) => {
  console.log('用户登录：', data)
})
```

### 3.2. 发布订阅 vs 观察者模式

::: code-group

```jsx [观察者模式]
// 观察者模式：主体直接维护观察者列表
class Subject {
  constructor() {
    this.observers = []
  }

  attach(observer) {
    this.observers.push(observer)
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data))
  }
}

class Observer {
  update(data) {
    console.log('收到更新：', data)
  }
}

// ⚠️ 主体和观察者耦合
const subject = new Subject()
const observer = new Observer()
subject.attach(observer)
subject.notify('data')
```

```jsx [发布订阅模式]
// 发布订阅：通过事件总线解耦
class EventBus {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  emit(event, data) {
    const callbacks = this.events[event]
    if (callbacks) {
      callbacks.forEach((cb) => cb(data))
    }
  }
}

// ✅ 发布者和订阅者通过事件名解耦
const bus = new EventBus()
bus.on('message', (data) => console.log(data))
bus.emit('message', 'Hello')
```

:::

### 3.3. 核心特点

```jsx
// 1. 解耦：发布者和订阅者互不知道对方
// 2. 多对多：一个事件可以有多个订阅者
// 3. 异步：事件发布和处理可以是异步的

class EventBus {
  constructor() {
    this.events = {}
  }

  // 订阅事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)

    // ✅ 返回取消订阅函数
    return () => this.off(event, callback)
  }

  // 取消订阅
  off(event, callback) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter((cb) => cb !== callback)
  }

  // 发布事件
  emit(event, ...args) {
    if (!this.events[event]) return
    this.events[event].forEach((callback) => callback(...args))
  }

  // 订阅一次（触发后自动取消）
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args)
      this.off(event, wrapper)
    }
    this.on(event, wrapper)
  }
}
```

## 4. � 如何实现事件总线？

### 4.1. 基础实现

```jsx
// eventBus.js
class EventBus {
  constructor() {
    this.events = {}
  }

  // 订阅事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  // 取消订阅
  off(event, callback) {
    if (!this.events[event]) return

    if (callback) {
      // 取消指定回调
      this.events[event] = this.events[event].filter((cb) => cb !== callback)
    } else {
      // 取消所有回调
      delete this.events[event]
    }
  }

  // 发布事件
  emit(event, ...args) {
    if (!this.events[event]) return
    this.events[event].forEach((callback) => {
      callback(...args)
    })
  }

  // 订阅一次
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args)
      this.off(event, wrapper)
    }
    this.on(event, wrapper)
  }
}

// 导出单例
export default new EventBus()
```

### 4.2. 增强实现

```jsx
// eventBus.enhanced.js
class EnhancedEventBus {
  constructor() {
    this.events = new Map()
  }

  // 订阅事件
  on(event, callback, context = null) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }

    this.events.get(event).push({
      callback,
      context,
      once: false,
    })

    // ✅ 返回取消订阅函数
    return () => this.off(event, callback)
  }

  // 订阅一次
  once(event, callback, context = null) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }

    this.events.get(event).push({
      callback,
      context,
      once: true,
    })
  }

  // 取消订阅
  off(event, callback = null) {
    if (!this.events.has(event)) return

    if (callback) {
      // 取消指定回调
      const listeners = this.events
        .get(event)
        .filter((listener) => listener.callback !== callback)
      this.events.set(event, listeners)
    } else {
      // 取消所有回调
      this.events.delete(event)
    }
  }

  // 发布事件
  emit(event, ...args) {
    if (!this.events.has(event)) return

    const listeners = this.events.get(event)
    const toRemove = []

    listeners.forEach((listener, index) => {
      const { callback, context, once } = listener

      // 执行回调
      callback.apply(context, args)

      // 标记一次性监听器
      if (once) {
        toRemove.push(index)
      }
    })

    // 移除一次性监听器
    if (toRemove.length > 0) {
      toRemove.reverse().forEach((index) => {
        listeners.splice(index, 1)
      })
    }
  }

  // 清空所有事件
  clear() {
    this.events.clear()
  }

  // 获取事件监听器数量
  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0
  }

  // 获取所有事件名
  eventNames() {
    return Array.from(this.events.keys())
  }
}

export default new EnhancedEventBus()
```

### 4.3. TypeScript 实现

```typescript
// eventBus.ts
type Callback = (...args: any[]) => void

interface Listener {
  callback: Callback
  context: any
  once: boolean
}

class EventBus {
  private events: Map<string, Listener[]>

  constructor() {
    this.events = new Map()
  }

  on(event: string, callback: Callback, context?: any): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }

    this.events.get(event)!.push({
      callback,
      context: context || null,
      once: false,
    })

    return () => this.off(event, callback)
  }

  once(event: string, callback: Callback, context?: any): void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }

    this.events.get(event)!.push({
      callback,
      context: context || null,
      once: true,
    })
  }

  off(event: string, callback?: Callback): void {
    if (!this.events.has(event)) return

    if (callback) {
      const listeners = this.events
        .get(event)!
        .filter((listener) => listener.callback !== callback)
      this.events.set(event, listeners)
    } else {
      this.events.delete(event)
    }
  }

  emit(event: string, ...args: any[]): void {
    if (!this.events.has(event)) return

    const listeners = this.events.get(event)!
    const toRemove: number[] = []

    listeners.forEach((listener, index) => {
      listener.callback.apply(listener.context, args)
      if (listener.once) {
        toRemove.push(index)
      }
    })

    toRemove.reverse().forEach((index) => {
      listeners.splice(index, 1)
    })
  }

  clear(): void {
    this.events.clear()
  }
}

export default new EventBus()
```

## 5. 如何在 React 中使用事件总线？

### 5.1. 基本使用

```jsx
// eventBus.js
class EventBus {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    return () => this.off(event, callback)
  }

  off(event, callback) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter((cb) => cb !== callback)
  }

  emit(event, data) {
    if (!this.events[event]) return
    this.events[event].forEach((callback) => callback(data))
  }
}

export default new EventBus()
```

```jsx
// ComponentA.jsx - 发布者
import eventBus from './eventBus'

function ComponentA() {
  const sendMessage = () => {
    eventBus.emit('message', {
      text: 'Hello from A',
      timestamp: Date.now(),
    })
  }

  return <button onClick={sendMessage}>发送消息</button>
}
```

```jsx
// ComponentB.jsx - 订阅者
import { useEffect, useState } from 'react'
import eventBus from './eventBus'

function ComponentB() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // ✅ 订阅事件
    const unsubscribe = eventBus.on('message', (data) => {
      setMessages((prev) => [...prev, data])
    })

    // ✅ 清理：取消订阅
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div>
      <h3>收到的消息：</h3>
      {messages.map((msg, index) => (
        <div key={index}>{msg.text}</div>
      ))}
    </div>
  )
}
```

### 5.2. 封装自定义 Hook

```jsx
// useEventBus.js
import { useEffect, useCallback } from 'react'
import eventBus from './eventBus'

// 订阅事件
export function useEventSubscribe(event, callback) {
  useEffect(() => {
    const unsubscribe = eventBus.on(event, callback)
    return unsubscribe
  }, [event, callback])
}

// 发布事件
export function useEventEmit() {
  return useCallback((event, data) => {
    eventBus.emit(event, data)
  }, [])
}

// 组合 Hook
export function useEventBus(event, callback) {
  useEventSubscribe(event, callback)
  return useEventEmit()
}
```

```jsx
// 使用自定义 Hook
import { useEventSubscribe, useEventEmit } from './useEventBus'

function Sender() {
  const emit = useEventEmit()

  const sendNotification = () => {
    emit('notification', {
      type: 'success',
      message: '操作成功',
    })
  }

  return <button onClick={sendNotification}>发送通知</button>
}

function Receiver() {
  useEventSubscribe('notification', (data) => {
    console.log('收到通知：', data)
    // 显示通知
  })

  return <div>通知接收器</div>
}
```

### 5.3. 实战示例：全局通知系统

```jsx
// notificationBus.js
import eventBus from './eventBus'

export const notificationBus = {
  success(message) {
    eventBus.emit('notification', {
      type: 'success',
      message,
      timestamp: Date.now(),
    })
  },

  error(message) {
    eventBus.emit('notification', {
      type: 'error',
      message,
      timestamp: Date.now(),
    })
  },

  warning(message) {
    eventBus.emit('notification', {
      type: 'warning',
      message,
      timestamp: Date.now(),
    })
  },

  info(message) {
    eventBus.emit('notification', {
      type: 'info',
      message,
      timestamp: Date.now(),
    })
  },
}
```

```jsx
// NotificationCenter.jsx
import { useEffect, useState } from 'react'
import eventBus from './eventBus'

function NotificationCenter() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const unsubscribe = eventBus.on('notification', (data) => {
      const id = Date.now()
      setNotifications((prev) => [...prev, { ...data, id }])

      // 3 秒后自动移除
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }, 3000)
    })

    return unsubscribe
  }, [])

  return (
    <div className="notification-center">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.type}`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  )
}

export default NotificationCenter
```

```jsx
// App.jsx
import NotificationCenter from './NotificationCenter'
import { notificationBus } from './notificationBus'

function App() {
  const handleSave = async () => {
    try {
      await saveData()
      notificationBus.success('保存成功')
    } catch (error) {
      notificationBus.error('保存失败')
    }
  }

  return (
    <div>
      <NotificationCenter />
      <button onClick={handleSave}>保存</button>
    </div>
  )
}
```

## 6. 发布订阅模式的应用场景？

### 6.1. 场景 1：跨组件通知

```jsx
// 用户登录后通知多个组件
function LoginButton() {
  const handleLogin = async () => {
    const user = await login()

    // ✅ 发布登录事件
    eventBus.emit('user:login', user)
  }

  return <button onClick={handleLogin}>登录</button>
}

// 多个组件监听登录事件
function UserProfile() {
  useEventSubscribe('user:login', (user) => {
    // 更新用户资料
  })
}

function ShoppingCart() {
  useEventSubscribe('user:login', (user) => {
    // 加载购物车
  })
}

function MessageCenter() {
  useEventSubscribe('user:login', (user) => {
    // 加载消息
  })
}
```

### 6.2. 场景 2：全局状态同步

```jsx
// 主题切换
function ThemeToggle() {
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    eventBus.emit('theme:change', newTheme)
  }

  return <button onClick={toggleTheme}>切换主题</button>
}

function Header() {
  useEventSubscribe('theme:change', (theme) => {
    // 更新 header 样式
  })
}

function Sidebar() {
  useEventSubscribe('theme:change', (theme) => {
    // 更新 sidebar 样式
  })
}
```

### 6.3. 场景 3：解耦业务逻辑

```jsx
// 订单系统
function OrderForm() {
  const submitOrder = async (orderData) => {
    const order = await createOrder(orderData)

    // ✅ 发布订单创建事件
    eventBus.emit('order:created', order)
  }
}

// 多个模块监听订单事件
function InventoryService() {
  useEventSubscribe('order:created', (order) => {
    // 更新库存
    updateInventory(order.items)
  })
}

function NotificationService() {
  useEventSubscribe('order:created', (order) => {
    // 发送通知
    sendEmail(order.user.email, 'Order Confirmed')
  })
}

function AnalyticsService() {
  useEventSubscribe('order:created', (order) => {
    // 统计分析
    trackEvent('order_created', order)
  })
}
```

### 6.4. 场景 4：实时通信

```jsx
// WebSocket 消息分发
function WebSocketManager() {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      // ✅ 根据消息类型分发
      eventBus.emit(`ws:${data.type}`, data.payload)
    }

    return () => ws.close()
  }, [])
}

// 不同组件监听不同消息类型
function ChatMessages() {
  useEventSubscribe('ws:message', (message) => {
    // 显示聊天消息
  })
}

function OnlineUsers() {
  useEventSubscribe('ws:userOnline', (user) => {
    // 更新在线用户
  })
}

function Notifications() {
  useEventSubscribe('ws:notification', (notification) => {
    // 显示通知
  })
}
```

### 6.5. 场景 5：插件系统

```jsx
// 可扩展的编辑器
function Editor() {
  const handleSave = () => {
    // ✅ 发布保存前事件
    eventBus.emit('editor:beforeSave', content)

    save(content)

    // ✅ 发布保存后事件
    eventBus.emit('editor:afterSave', content)
  }
}

// 插件可以监听编辑器事件
function AutoSavePlugin() {
  useEventSubscribe('editor:afterSave', (content) => {
    localStorage.setItem('draft', content)
  })
}

function WordCountPlugin() {
  useEventSubscribe('editor:beforeSave', (content) => {
    console.log('字数：', content.length)
  })
}

function SyntaxCheckPlugin() {
  useEventSubscribe('editor:beforeSave', (content) => {
    checkSyntax(content)
  })
}
```

## 7. 发布订阅模式的注意事项？

### 7.1. 注意事项 1：内存泄漏

::: code-group

```jsx [❌ 忘记取消订阅]
function BadComponent() {
  useEffect(() => {
    // ❌ 没有返回清理函数
    eventBus.on('event', (data) => {
      console.log(data)
    })
  }, [])

  // 组件卸载后，监听器仍然存在
  // 导致内存泄漏
}
```

```jsx [✅ 正确清理]
function GoodComponent() {
  useEffect(() => {
    const unsubscribe = eventBus.on('event', (data) => {
      console.log(data)
    })

    // ✅ 组件卸载时取消订阅
    return () => {
      unsubscribe()
    }
  }, [])
}
```

:::

### 7.2. 注意事项 2：回调依赖问题

```jsx
// ❌ 回调中使用了过期的 state
function BadComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const unsubscribe = eventBus.on('increment', () => {
      // ❌ 这里的 count 永远是初始值 0
      setCount(count + 1)
    })

    return unsubscribe
  }, []) // ❌ 缺少 count 依赖
}

// ✅ 方案 1：使用函数式更新
function GoodComponent1() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const unsubscribe = eventBus.on('increment', () => {
      // ✅ 使用函数式更新
      setCount((prev) => prev + 1)
    })

    return unsubscribe
  }, [])
}

// ✅ 方案 2：使用 useCallback
function GoodComponent2() {
  const [count, setCount] = useState(0)

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1)
  }, [])

  useEffect(() => {
    const unsubscribe = eventBus.on('increment', handleIncrement)
    return unsubscribe
  }, [handleIncrement])
}
```

### 7.3. 注意事项 3：事件命名冲突

```jsx
// ❌ 全局事件名容易冲突
eventBus.on('update', handler) // 太通用

// ✅ 使用命名空间
eventBus.on('user:update', handler)
eventBus.on('cart:update', handler)
eventBus.on('order:update', handler)

// ✅ 使用常量管理事件名
export const EVENTS = {
  USER_LOGIN: 'user:login',
  USER_LOGOUT: 'user:logout',
  CART_ADD: 'cart:add',
  CART_REMOVE: 'cart:remove',
  ORDER_CREATED: 'order:created',
}

eventBus.on(EVENTS.USER_LOGIN, handler)
```

### 7.4. 注意事项 4：调试困难

```jsx
// ❌ 难以追踪事件流
eventBus.emit('event', data) // 谁在监听？

// ✅ 添加调试功能
class DebugEventBus extends EventBus {
  emit(event, ...args) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[EventBus] Emit: ${event}`, args)
      console.log(`[EventBus] Listeners: ${this.listenerCount(event)}`)
    }
    super.emit(event, ...args)
  }

  on(event, callback) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[EventBus] Subscribe: ${event}`)
    }
    return super.on(event, callback)
  }
}
```

### 7.5. 注意事项 5：避免循环触发

```jsx
// ❌ 事件循环
function BadComponent1() {
  useEventSubscribe('eventA', () => {
    eventBus.emit('eventB', data)
  })
}

function BadComponent2() {
  useEventSubscribe('eventB', () => {
    eventBus.emit('eventA', data) // ❌ 循环触发
  })
}

// ✅ 使用标志位避免循环
let processing = false

function GoodComponent1() {
  useEventSubscribe('eventA', () => {
    if (processing) return
    processing = true
    eventBus.emit('eventB', data)
    processing = false
  })
}
```

## 8. 发布订阅 vs 其他通信方式

### 8.1. 对比表格

| 特性     | 发布订阅   | Props          | Context        | Redux          |
| -------- | ---------- | -------------- | -------------- | -------------- |
| 解耦程度 | 高         | 低             | 中             | 高             |
| 学习成本 | 低         | 低             | 中             | 高             |
| 调试难度 | 高         | 低             | 中             | 低             |
| 性能开销 | 低         | 低             | 中             | 中             |
| 适用场景 | 跨组件事件 | 父子通信       | 跨层级状态     | 全局状态       |
| 类型安全 | 弱         | 强             | 强             | 强             |
| DevTools | 无         | React DevTools | React DevTools | Redux DevTools |

### 8.2. 各方案对比示例

::: code-group

```jsx [Props 传递]
// ✅ 父子组件通信首选
function Parent() {
  const [count, setCount] = useState(0)

  return <Child count={count} onIncrement={() => setCount(count + 1)} />
}

function Child({ count, onIncrement }) {
  return <button onClick={onIncrement}>{count}</button>
}
```

```jsx [Context]
// ✅ 跨层级状态共享
const CountContext = createContext()

function App() {
  const [count, setCount] = useState(0)

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <DeepChild />
    </CountContext.Provider>
  )
}

function DeepChild() {
  const { count, setCount } = useContext(CountContext)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

```jsx [发布订阅]
// ✅ 无直接关系的组件通信
function ComponentA() {
  const notify = () => {
    eventBus.emit('action', data)
  }
  return <button onClick={notify}>通知</button>
}

function ComponentB() {
  useEventSubscribe('action', (data) => {
    console.log(data)
  })
  return <div>监听器</div>
}
```

```jsx [Redux]
// ✅ 复杂全局状态管理
function ComponentA() {
  const dispatch = useDispatch()
  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>增加</button>
}

function ComponentB() {
  const count = useSelector((state) => state.count)
  return <div>{count}</div>
}
```

:::

## 9. 引用

- [观察者模式 vs 发布订阅模式][1]
- [JavaScript 设计模式][2]
- [React 组件通信方式对比][3]

[1]: https://javascript.info/mixins
[2]: https://www.patterns.dev/posts/observer-pattern
[3]: https://react.dev/learn/passing-data-deeply-with-context
