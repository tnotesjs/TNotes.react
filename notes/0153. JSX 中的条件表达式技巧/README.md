# [0153. JSX 中的条件表达式技巧](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0153.%20JSX%20%E4%B8%AD%E7%9A%84%E6%9D%A1%E4%BB%B6%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%8A%80%E5%B7%A7)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 JSX 中有哪些常用的条件渲染方式？](#3--jsx-中有哪些常用的条件渲染方式)
  - [3.1. if/else 语句](#31-ifelse-语句)
  - [3.2. 三元表达式](#32-三元表达式)
  - [3.3. 逻辑与（&&）运算符](#33-逻辑与运算符)
  - [3.4. 空值合并（??）运算符](#34-空值合并运算符)
  - [3.5. 立即执行函数](#35-立即执行函数)
- [4. 🤔 如何避免条件渲染的常见陷阱？](#4--如何避免条件渲染的常见陷阱)
  - [4.1. 陷阱 1：数字 0 的渲染问题](#41-陷阱-1数字-0-的渲染问题)
  - [4.2. 陷阱 2：空字符串的问题](#42-陷阱-2空字符串的问题)
  - [4.3. 陷阱 3：数组长度判断](#43-陷阱-3数组长度判断)
  - [4.4. 陷阱 4：NaN 和 Infinity](#44-陷阱-4nan-和-infinity)
- [5. 🤔 复杂条件如何优雅地处理？](#5--复杂条件如何优雅地处理)
  - [5.1. 策略 1：提取为独立组件](#51-策略-1提取为独立组件)
  - [5.2. 策略 2：使用配置对象](#52-策略-2使用配置对象)
  - [5.3. 策略 3：使用 Map 或对象映射](#53-策略-3使用-map-或对象映射)
  - [5.4. 策略 4：使用自定义 Hook](#54-策略-4使用自定义-hook)
- [6. 🤔 如何处理多重条件渲染？](#6--如何处理多重条件渲染)
  - [6.1. 方法 1：Switch 模式](#61-方法-1switch-模式)
  - [6.2. 方法 2：条件组合](#62-方法-2条件组合)
  - [6.3. 方法 3：渲染函数](#63-方法-3渲染函数)
  - [6.4. 方法 4：多级条件组件](#64-方法-4多级条件组件)
  - [6.5. 方法 5：使用数组过滤](#65-方法-5使用数组过滤)
- [7. 🔗 引用](#7--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- JSX 中的条件渲染方式
- 逻辑运算符的使用技巧
- 三元表达式的最佳实践
- 复杂条件的优化方案
- 常见陷阱与解决方法

## 2. 🫧 评价

本笔记详细讲解了 JSX 中条件表达式的各种技巧和最佳实践，帮助编写更清晰的条件渲染代码。

- 掌握多种条件渲染方式可以让代码更简洁
- 了解各种方法的适用场景能避免滥用
- 注意边界情况可以防止渲染错误
- 复杂条件应该提取到组件或函数中

## 3. 🤔 JSX 中有哪些常用的条件渲染方式？

常用条件渲染方式对比：

| 方式 | 适用场景 | 优点 | 缺点 |
| --- | --- | --- | --- |
| `if/else` | 复杂逻辑 | 清晰易读 | 不能直接在 JSX 中使用 |
| 三元表达式 | 简单二选一 | 简洁 | 嵌套时难读 |
| `&&` 逻辑与 | 单条件显示 | 最简洁 | 容易出现 `0`、`NaN` 等问题 |
| `??` 空值合并 | 处理 `null`/`undefined` | 精确控制 | 不适合布尔值 |
| 立即执行函数 | 复杂多条件 | 灵活 | 略显冗余 |

### 3.1. if/else 语句

```jsx
// ✅ 适合复杂逻辑
function UserGreeting({ user }) {
  // 提前返回模式
  if (!user) {
    return <div>请先登录</div>
  }

  if (user.role === 'admin') {
    return <div>欢迎管理员：{user.name}</div>
  }

  if (user.role === 'vip') {
    return <div>欢迎 VIP 用户：{user.name}</div>
  }

  return <div>欢迎：{user.name}</div>
}
```

```jsx
// ✅ 使用变量存储
function ProductList({ products, loading, error }) {
  let content

  if (loading) {
    content = <Loading />
  } else if (error) {
    content = <Error message={error} />
  } else if (products.length === 0) {
    content = <Empty />
  } else {
    content = <Products list={products} />
  }

  return <div className="container">{content}</div>
}
```

### 3.2. 三元表达式

```jsx
// ✅ 简单二选一
function Status({ isOnline }) {
  return (
    <div className={isOnline ? 'status-online' : 'status-offline'}>
      {isOnline ? '在线' : '离线'}
    </div>
  )
}
```

```jsx
// ⚠️ 避免深度嵌套
// ❌ 难以阅读
function UserInfo({ user }) {
  return (
    <div>
      {user ? (
        user.isPremium ? (
          user.isActive ? (
            <PremiumActiveUser user={user} />
          ) : (
            <PremiumInactiveUser user={user} />
          )
        ) : (
          <RegularUser user={user} />
        )
      ) : (
        <GuestUser />
      )}
    </div>
  )
}

// ✅ 使用提前返回
function UserInfo({ user }) {
  if (!user) return <GuestUser />
  if (!user.isPremium) return <RegularUser user={user} />
  if (user.isActive) return <PremiumActiveUser user={user} />
  return <PremiumInactiveUser user={user} />
}
```

### 3.3. 逻辑与（&&）运算符

```jsx
// ✅ 单条件显示
function Notification({ message }) {
  return <div>{message && <div className="notification">{message}</div>}</div>
}
```

```jsx
// ✅ 多个条件组合
function UserPanel({ user, hasPermission, isVerified }) {
  return (
    <div>
      {user && hasPermission && isVerified && <AdminPanel user={user} />}
    </div>
  )
}
```

### 3.4. 空值合并（??）运算符

```jsx
// ✅ 处理 null/undefined
function UserScore({ score }) {
  return <div>得分：{score ?? '暂无'}</div>
}

// 对比 || 运算符
function Example({ count }) {
  // ❌ 当 count 为 0 时会显示默认值
  return <div>数量：{count || '无'}</div>

  // ✅ 只有 null/undefined 才显示默认值
  return <div>数量：{count ?? '无'}</div>
}
```

### 3.5. 立即执行函数

```jsx
// ✅ 复杂多条件逻辑
function StatusBadge({ status, priority, isUrgent }) {
  return (
    <div>
      {(() => {
        if (isUrgent) {
          return <span className="badge-urgent">紧急</span>
        }

        switch (status) {
          case 'pending':
            return <span className="badge-warning">待处理</span>
          case 'processing':
            return <span className="badge-info">处理中</span>
          case 'done':
            return priority === 'high' ? (
              <span className="badge-success">已完成（高优先级）</span>
            ) : (
              <span className="badge-success">已完成</span>
            )
          default:
            return <span className="badge-default">未知</span>
        }
      })()}
    </div>
  )
}
```

## 4. 🤔 如何避免条件渲染的常见陷阱？

### 4.1. 陷阱 1：数字 0 的渲染问题

```jsx
// ❌ 当 count 为 0 时会渲染出 "0"
function ItemCount({ count }) {
  return <div>{count && <span>{count} 个项目</span>}</div>
}

// ✅ 正确方式 1：显式判断
function ItemCount({ count }) {
  return <div>{count > 0 && <span>{count} 个项目</span>}</div>
}

// ✅ 正确方式 2：转换为布尔值
function ItemCount({ count }) {
  return <div>{Boolean(count) && <span>{count} 个项目</span>}</div>
}

// ✅ 正确方式 3：使用三元表达式
function ItemCount({ count }) {
  return <div>{count ? <span>{count} 个项目</span> : null}</div>
}
```

### 4.2. 陷阱 2：空字符串的问题

```jsx
// ❌ 空字符串会被渲染
function UserName({ name }) {
  return <div>{name && <span>用户名：{name}</span>}</div>
}

// ✅ 检查字符串长度
function UserName({ name }) {
  return <div>{name?.length > 0 && <span>用户名：{name}</span>}</div>
}

// ✅ 使用 trim() 处理
function UserName({ name }) {
  return <div>{name?.trim() && <span>用户名：{name}</span>}</div>
}
```

### 4.3. 陷阱 3：数组长度判断

```jsx
// ❌ 空数组仍会渲染容器
function UserList({ users }) {
  return (
    <div className="user-list">
      {users && users.map((user) => <UserCard key={user.id} user={user} />)}
    </div>
  )
}

// ✅ 判断数组长度
function UserList({ users }) {
  return (
    <div>
      {users?.length > 0 && (
        <div className="user-list">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

// ✅ 提供空状态
function UserList({ users }) {
  if (!users || users.length === 0) {
    return <Empty message="暂无用户" />
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

### 4.4. 陷阱 4：NaN 和 Infinity

```jsx
// ❌ NaN 会被渲染为字符串 "NaN"
function Calculator({ result }) {
  return <div>结果：{result}</div>
}

// ✅ 检查是否为有效数字
function Calculator({ result }) {
  return <div>结果：{Number.isFinite(result) ? result : '计算错误'}</div>
}

// ✅ 使用 isNaN 检查
function Calculator({ result }) {
  return <div>{!isNaN(result) && <span>结果：{result}</span>}</div>
}
```

## 5. 🤔 复杂条件如何优雅地处理？

### 5.1. 策略 1：提取为独立组件

```jsx
// ❌ 复杂的内联条件
function Dashboard({ user, data, settings }) {
  return (
    <div>
      {user && data && settings ? (
        user.role === 'admin' ? (
          <AdminDashboard user={user} data={data} settings={settings} />
        ) : user.role === 'user' ? (
          data.length > 0 ? (
            <UserDashboard user={user} data={data} />
          ) : (
            <EmptyDashboard />
          )
        ) : (
          <GuestDashboard />
        )
      ) : (
        <Loading />
      )}
    </div>
  )
}

// ✅ 提取为组件
function Dashboard({ user, data, settings }) {
  return <DashboardContent user={user} data={data} settings={settings} />
}

function DashboardContent({ user, data, settings }) {
  if (!user || !data || !settings) {
    return <Loading />
  }

  if (user.role === 'admin') {
    return <AdminDashboard user={user} data={data} settings={settings} />
  }

  if (user.role === 'user') {
    return data.length > 0 ? (
      <UserDashboard user={user} data={data} />
    ) : (
      <EmptyDashboard />
    )
  }

  return <GuestDashboard />
}
```

### 5.2. 策略 2：使用配置对象

```jsx
// ✅ 配置驱动
const STATUS_CONFIG = {
  pending: {
    icon: '⏳',
    color: 'yellow',
    text: '待处理',
  },
  processing: {
    icon: '⚙️',
    color: 'blue',
    text: '处理中',
  },
  success: {
    icon: '✅',
    color: 'green',
    text: '已完成',
  },
  error: {
    icon: '❌',
    color: 'red',
    text: '失败',
  },
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending

  return (
    <span className={`badge badge-${config.color}`}>
      {config.icon} {config.text}
    </span>
  )
}
```

### 5.3. 策略 3：使用 Map 或对象映射

```jsx
// ✅ 使用对象映射
function UserRoleBadge({ role }) {
  const roleComponents = {
    admin: <AdminBadge />,
    moderator: <ModeratorBadge />,
    user: <UserBadge />,
    guest: <GuestBadge />,
  }

  return roleComponents[role] || <UnknownBadge />
}

// ✅ 使用 Map
function PaymentStatus({ status }) {
  const statusMap = new Map([
    ['unpaid', <UnpaidIcon />],
    ['paid', <PaidIcon />],
    ['refunded', <RefundedIcon />],
    ['cancelled', <CancelledIcon />],
  ])

  return statusMap.get(status) || <UnknownIcon />
}
```

### 5.4. 策略 4：使用自定义 Hook

```jsx
// ✅ 提取条件逻辑到 Hook
function useUserAccess(user) {
  const canEdit = user?.role === 'admin' || user?.role === 'editor'
  const canDelete = user?.role === 'admin'
  const canView = Boolean(user)

  return { canEdit, canDelete, canView }
}

function DocumentActions({ user, document }) {
  const { canEdit, canDelete, canView } = useUserAccess(user)

  return (
    <div className="actions">
      {canView && <ViewButton document={document} />}
      {canEdit && <EditButton document={document} />}
      {canDelete && <DeleteButton document={document} />}
    </div>
  )
}
```

## 6. 🤔 如何处理多重条件渲染？

### 6.1. 方法 1：Switch 模式

```jsx
// ✅ 使用对象实现 switch
function OrderStatus({ status }) {
  const StatusComponent =
    {
      pending: () => (
        <div className="status-pending">
          <Spinner />
          <span>订单处理中...</span>
        </div>
      ),
      shipped: () => (
        <div className="status-shipped">
          <TruckIcon />
          <span>已发货</span>
        </div>
      ),
      delivered: () => (
        <div className="status-delivered">
          <CheckIcon />
          <span>已送达</span>
        </div>
      ),
      cancelled: () => (
        <div className="status-cancelled">
          <XIcon />
          <span>已取消</span>
        </div>
      ),
    }[status] || (() => <div>未知状态</div>)

  return <StatusComponent />
}
```

### 6.2. 方法 2：条件组合

```jsx
// ✅ 组合多个条件
function ProductCard({ product, user, inStock }) {
  const canBuy = user && inStock && product.price > 0
  const canWishlist = user && !product.inWishlist
  const showDiscount = product.discount > 0

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>

      <div className="price">
        {showDiscount && (
          <span className="original-price">{product.originalPrice}</span>
        )}
        <span className="current-price">{product.price}</span>
      </div>

      <div className="actions">
        {canBuy && <BuyButton product={product} />}
        {canWishlist && <WishlistButton product={product} />}
        {!inStock && <span className="out-of-stock">缺货</span>}
      </div>
    </div>
  )
}
```

### 6.3. 方法 3：渲染函数

```jsx
// ✅ 使用渲染函数
function DataDisplay({ data, loading, error }) {
  const renderContent = () => {
    if (loading) return <Skeleton />
    if (error) return <ErrorMessage error={error} />
    if (!data) return <NoData />
    if (data.length === 0) return <EmptyState />
    return <DataTable data={data} />
  }

  return (
    <div className="data-display">
      <Header />
      {renderContent()}
      <Footer />
    </div>
  )
}
```

### 6.4. 方法 4：多级条件组件

```jsx
// ✅ 条件包装组件
function ConditionalRender({ condition, fallback = null, children }) {
  return condition ? children : fallback
}

function UserProfile({ user }) {
  return (
    <div>
      <ConditionalRender condition={user} fallback={<LoginPrompt />}>
        <ConditionalRender
          condition={user.isVerified}
          fallback={<VerificationPrompt />}
        >
          <ConditionalRender
            condition={user.hasCompletedProfile}
            fallback={<CompleteProfilePrompt />}
          >
            <ProfileContent user={user} />
          </ConditionalRender>
        </ConditionalRender>
      </ConditionalRender>
    </div>
  )
}
```

### 6.5. 方法 5：使用数组过滤

```jsx
// ✅ 动态渲染多个条件元素
function Toolbar({ user, canEdit, canDelete, canShare }) {
  const actions = [
    { show: true, component: <ViewAction /> },
    { show: canEdit, component: <EditAction /> },
    { show: canDelete, component: <DeleteAction /> },
    { show: canShare, component: <ShareAction /> },
    { show: user?.isPremium, component: <PremiumAction /> },
  ].filter((action) => action.show)

  return (
    <div className="toolbar">
      {actions.map((action, index) => (
        <React.Fragment key={index}>{action.component}</React.Fragment>
      ))}
    </div>
  )
}
```

## 7. 🔗 引用

- [React 条件渲染文档][1]
- [JavaScript 逻辑运算符][2]
- [React 最佳实践][3]
- [条件渲染模式][4]

[1]: https://react.dev/learn/conditional-rendering
[2]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators
[3]: https://react.dev/learn/thinking-in-react
[4]: https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx
