# [0068. React 设计理念](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0068.%20React%20%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 设计理念](#2-设计理念)
  - [2.1. 概念](#21-概念)
  - [2.2. 重要性](#22-重要性)
- [3. 声明式](#3-声明式)
  - [3.1. 声明式与命令式的核心区别](#31-声明式与命令式的核心区别)
    - [类比：用一个生活化的例子来理解，假设你要让一个灯泡亮起来](#类比用一个生活化的例子来理解假设你要让一个灯泡亮起来)
    - [小结](#小结)
  - [3.2. 在 React 中的实际应用](#32-在-react-中的实际应用)
  - [3.3. React 选择“声明式”的原因](#33-react-选择声明式的原因)
  - [3.4. 关于“体验”和“性能”的思考](#34-关于体验和性能的思考)
- [4. 组件化](#4-组件化)
  - [4.1. 组件化的核心思想](#41-组件化的核心思想)
  - [4.2. 示例：电商页面的组件化拆分](#42-示例电商页面的组件化拆分)
  - [4.3. 组件化的优势](#43-组件化的优势)
  - [4.4. 组件化的实践原则](#44-组件化的实践原则)
- [5. 单向数据流](#5-单向数据流)
  - [5.1. 先给答案](#51-先给答案)
  - [5.2. 单向数据流的定义](#52-单向数据流的定义)
  - [5.3. 数据流向示意图](#53-数据流向示意图)
  - [5.4. 代码示例](#54-代码示例)
  - [5.5. 单向数据流的优势](#55-单向数据流的优势)
- [6. 理解 UI](#6-理解-ui)
- [7. 纯函数](#7-纯函数)
  - [7.1. 纯函数的定义](#71-纯函数的定义)
  - [7.2. 副作用应该放在哪里？](#72-副作用应该放在哪里)
  - [7.3. React 为什么需要纯函数？](#73-react-为什么需要纯函数)
  - [7.4. 实践建议](#74-实践建议)
- [8. 虚拟 DOM](#8-虚拟-dom)
  - [8.1. 虚拟 DOM 解决的核心问题](#81-虚拟-dom-解决的核心问题)
  - [8.2. 虚拟 DOM 的工作流程](#82-虚拟-dom-的工作流程)
  - [8.3. 为什么需要虚拟 DOM？](#83-为什么需要虚拟-dom)
- [9. 总结](#9-总结)
  - [9.1. React 的设计哲学可以用一句话总结吗？](#91-react-的设计哲学可以用一句话总结吗)
  - [9.2. 极易踩坑点：“单向数据流”和“纯函数”](#92-极易踩坑点单向数据流和纯函数)
  - [9.3. 开发时的检查清单](#93-开发时的检查清单)
- [10. 引用](#10-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 声明式
- 组件化
- 单向数据流
- 状态驱动
- 纯函数
- 虚拟DOM

本笔记深入探讨了 React 的核心设计理念，帮助理解 React 为什么这样工作。

- 理解设计理念比记住 API 更重要，它能帮助你在遇到问题时找到正确的解决方向
- React 的设计哲学一脉相承，从初版到现在，核心理念几乎没有变化
- 在实际开发中，时刻思考这些理念，能让你写出更优雅、更易维护的代码
- 当你真正理解“为什么”，就能更好地掌握“怎么做”

::: tip 💡 通用性

这一篇笔记主要介绍 React 的一些设计理念，而设计理念这玩意儿本身就具备一定的通用性，好的设计规范，在很多主流框架中都是有体现的。比如：声明式、数据驱动 => 状态决定 UI 视图，组件化，单向数据流，等等。了解这些理念之后，再去学习其它框架的使用，基本都是类似的套路。

:::

## 2. 设计理念

### 2.1. 概念

这里提到的“设计理念”是指 React 项目遵循的核心原则：

- 这些原则贯穿 React 的整个发展历史
- 从 React 初版到现在，核心理念几乎没有变化
- 所有功能和 API 的设计都围绕这些理念展开

### 2.2. 重要性

理解“设计理念”的重要性：

- 帮助你理解 React 为什么这样设计
- 在遇到问题时能找到符合 React 思想的解决方案
- 避免写出“反模式”的代码
- 让你真正“懂” React，而不是机械地使用

## 3. 声明式

思考题：

- 什么是“声明式”？
- 为什么 React 是“声明式”的，而不是“命令式”的？
- “命令式”和“声明式”具体有啥区别？

::: tip 💡 通用做法

“声明式”也是其它主流框架的通用做法，比如在 Vue 中也是一样的，Vue 也是采用声明式的方式来描述 UI。

:::

### 3.1. 声明式与命令式的核心区别

- 命令式（How）：告诉计算机“怎么做”，关注实现步骤
- 声明式（What）：告诉计算机“要什么”，关注最终状态

#### 类比：用一个生活化的例子来理解，假设你要让一个灯泡亮起来

- 命令式写法
  - 步骤 1：找到灯泡
  - 步骤 2：检查是否通电
  - 步骤 3：如果没亮就打开开关
  - 步骤 4：验证是否已亮
  - 这种方式需要关注每一步操作，容易出错且难以维护
- 声明式写法
  - “灯泡应该是亮的”
  - 你只描述最终状态，React 会自动处理“怎么实现”

#### 小结

| 维度     | 声明式       | 命令式         |
| -------- | ------------ | -------------- |
| 关注点   | 描述“是什么” | 描述“怎么做”   |
| 代码量   | 更少         | 更多           |
| 可读性   | 更好         | 较差           |
| 可维护性 | 更容易       | 较困难         |
| 出错概率 | 更低         | 更高           |
| 性能控制 | 由框架优化   | 开发者手动优化 |

### 3.2. 在 React 中的实际应用

::: code-group

```jsx [声明式（React）]
function Greeting({ isLoggedIn }) {
  return isLoggedIn ? <h1>欢迎回来</h1> : <h1>请登录</h1>;
}

// 你只需要描述 UI 应该是什么样子
// React 会自动处理 DOM 更新
```

```js [命令式（原生 JS）]
// 需要手动操作 DOM
const greeting = document.getElementById("greeting");

if (isLoggedIn) {
  greeting.textContent = "欢迎回来";
  greeting.className = "logged-in";
} else {
  greeting.textContent = "请登录";
  greeting.className = "logged-out";
}

// 还需要考虑：
// - 元素是否存在
// - 是否需要创建新元素
// - 如何清理旧的事件监听
// - 如何避免内存泄漏
```

:::

### 3.3. React 选择“声明式”的原因

- 让开发者站在更高的抽象层思考问题
- 底层依旧是命令式执行，只是开发者不需要关心细节
- React 作为“助手”，帮你处理复杂的 DOM 操作
- 开发者体验更好，代码更易维护

### 3.4. 关于“体验”和“性能”的思考

理论上，精心优化的命令式代码可以达到最优性能，但实际开发中：

- 手动优化命令式代码容易出错
- React 的声明式 + 虚拟 DOM 机制已经足够高效
- React 团队持续优化性能，让声明式代码越来越接近最优解
- 对于绝大多数应用，React 的性能已经足够好

## 4. 组件化

思考题：

- 什么是“组件化”？
- 为什么 React 要“组件化”？

::: tip 💡 通用规范

“组件化”也是其它框架的通用规范，比如在 Vue 中也是一样的，我们的 UI 视图本质上就是一颗组件树，从 App 根组件出发，挂载各个子组件，形成一棵树形结构。

:::

### 4.1. 组件化的核心思想

- 将复杂的 UI 拆分成独立、可复用的小单元
- 每个组件都是一个独立的功能单元
- 组件可以组合成更复杂的界面

### 4.2. 示例：电商页面的组件化拆分

核心理念：UI = 组件树 = 组件的组合

```mermaid
graph TD
    A[App 应用] --> B[Header 头部]
    A --> C[Main 主体]
    A --> D[Footer 底部]
    C --> E[ProductList 商品列表]
    C --> F[ShoppingCart 购物车]
    E --> G[ProductCard 商品卡片]
    E --> H[ProductCard 商品卡片]
    E --> I[ProductCard 商品卡片]
```

示例代码：

```jsx
function App() {
  return (
    <div>
      <Header title="我的商店" />
      <Main>
        <ProductList products={products} />
        <ShoppingCart items={cartItems} />
      </Main>
      <Footer />
    </div>
  );
}

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>¥{product.price}</p>
    </div>
  );
}

function ShoppingCart({ items }) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="shopping-cart">
      <h3>购物车</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity} — ¥{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>总计：¥{total}</p>
    </div>
  );
}
```

### 4.3. 组件化的优势

| 优势 | 说明 | 实际应用 |
| --- | --- | --- |
| 代码复用 | 同一个组件可以在多处使用 | `<Button>` 可以用在表单、对话框、导航栏等 |
| 职责分离 | 每个组件只关注自己的功能 | `<ProductCard>` 只负责展示商品信息 |
| 团队协作 | 多人可以同时开发不同组件 | A 开发 `<Header>`，B 开发 `<ProductList>` |
| 易于测试 | 组件可以独立测试 | 可以单独测试 `<ShoppingCart>` 的加减功能 |
| 易于维护 | 修改某个组件不影响其他部分 | 修改 `<Footer>` 不会影响 `<Header>` |
| 关注点分离 | UI、逻辑、样式可以分离 | 组件内部管理自己的状态和样式 |

### 4.4. 组件化的实践原则

- 单一职责原则
  - 每个组件只做一件事
  - 如果组件变得复杂，考虑拆分
- 合理的抽象层次
  - 不要过度拆分（会增加复杂度）
  - 不要拆分不足（会降低复用性）
- 明确的组件边界
  - 通过 props 传递数据
  - 通过回调传递行为

## 5. 单向数据流

思考题：

- 什么是“单向数据流”？
- 为什么 React 要坚持“单向数据流”？

::: tip 💡 通用规范

坚持“单向数据流”也是其它主流框架遵循的基本原则，核心目的是确保程序状态的可预测性。这个原则的核心是数据由谁生产，就应该由谁来维护（可写），其它消费者在消费数据时不能修改数据（只读）。

:::

### 5.1. 先给答案

坚持单向数据流是为了保证应用状态的可预测性和单一数据源，避免复杂交互下数据流向混乱，从而让代码更易于追踪、理解和调试。

### 5.2. 单向数据流的定义

- 数据只能从父组件流向子组件
- 通过 props 向下传递数据
- 子组件不能直接修改 props
- 如需修改，需通过回调函数通知父组件

### 5.3. 数据流向示意图

```mermaid
graph TD
    A[父组件<br/>拥有 state] -->|props 传递数据| B[子组件 A]
    A -->|props 传递数据| C[子组件 B]
    B -.->|通过回调通知| A
    C -.->|通过回调通知| A
```

### 5.4. 代码示例

```jsx
// 父组件
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Display count={count} />
      <Controls
        onIncrement={() => setCount(count + 1)}
        onDecrement={() => setCount(count - 1)}
      />
    </div>
  );
}

// 子组件 1：只展示数据
function Display({ count }) {
  return <h2>当前计数：{count}</h2>;
}

// 子组件 2：通过回调修改数据
function Controls({ onIncrement, onDecrement }) {
  return (
    <div>
      <button onClick={onIncrement}>+1</button>
      <button onClick={onDecrement}>-1</button>
    </div>
  );
}
```

### 5.5. 单向数据流的优势

| 优势         | 说明                             |
| ------------ | -------------------------------- |
| 可预测性     | 数据流向清晰，容易追踪数据变化   |
| 易于调试     | 出现问题时，可以快速定位数据来源 |
| 避免混乱     | 防止多个组件同时修改同一数据     |
| 状态集中管理 | 数据源头明确，便于管理           |
| 便于理解     | 数据流向一目了然，新人容易上手   |

- 数据变化路径明确
- 便于添加验证逻辑
- 更容易实现复杂的交互逻辑

## 6. 理解 UI

思考题：

- 在 React 中如何描述页面 UI？
- 为什么说“UI 是状态的函数”？

::: tip 💡 数据驱动模式

不管业务多复杂，写界面的思维一定要从“操作DOM”转变成“只管改数据（状态），让框架自己去刷UI”。

:::

React 的核心数学公式：$UI = f(state)$

这个公式的含义：

- UI（用户界面）是状态的函数
- 给定相同的 state，总会得到相同的 UI
- state 变化，UI 自动更新

代码示例：

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // UI 完全由 count 决定
  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

当 `count` 从 0 变成 1：

- 你不需要手动修改 `<p>` 标签的文本
- React 自动重新执行 `Counter` 函数
- 生成新的 UI 并更新到页面

这种设计的优势：开发者的心智模型转变，开发者只关心数据，React 负责更新 UI。

核心收益：

- 开发者只需关心“状态 state 是什么”，不必操心“DOM 怎么变”。
- React 会自动帮你处理所有的 UI 更新逻辑，就是帮你完成 state => DOM 的映射。

```jsx
// ❌ 命令式思维（手动更新 DOM）
button.addEventListener("click", () => {
  count++;
  document.getElementById("count").textContent = count;
  if (count > 10) {
    button.disabled = true;
  }
});

// ✅ 声明式思维（通过 state 描述 UI 应该是什么样子，DOM 的更新交给 React）
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p id="count">{count}</p>
      <button onClick={() => setCount(count + 1)} disabled={count > 10}>
        +1
      </button>
    </div>
  );
}
```

## 7. 纯函数

思考题：

- “纯函数”是什么？
- 为什么 React 要强调“纯函数”？

### 7.1. 纯函数的定义

- 相同的输入，总是得到相同的输出
- 不产生副作用（不修改外部变量、不发送请求等）
- 不依赖外部可变状态

在 React 中的体现：相同的 props + state => 相同的 UI

代码对比：

::: code-group

```jsx [✅ 纯函数组件（推荐）]
function Greeting({ name }) {
  // 输入固定，输出固定
  return <h1>你好，{name}</h1>;
}

function Product({ price }) {
  // 计算派生值，不修改原数据
  const discountPrice = price * 0.8;
  return (
    <div>
      原价：{price}，折扣价：{discountPrice}
    </div>
  );
}
```

```jsx [❌ 非纯函数（不推荐）]
let renderCount = 0;

function BadComponent({ name }) {
  // ❌ 修改外部变量
  renderCount++;

  // ❌ 在渲染期间产生副作用
  console.log("组件渲染了");

  // ❌ 直接操作 DOM
  document.title = `你好，${name}`;

  // ❌ 发送网络请求
  fetch("/api/log");

  return <h1>你好，{name}</h1>;
}
```

:::

纯函数的优势：

| 优势     | 说明                                       |
| -------- | ------------------------------------------ |
| 可预测性 | 输入确定，输出就确定，便于推理             |
| 易于测试 | 测试就是验证输入输出，不需要 mock 复杂环境 |
| 易于调试 | 不依赖外部状态，问题定位更简单             |
| 并发安全 | React 可以安全地多次调用、暂停、恢复渲染   |
| 优化潜力 | React 可以跳过纯组件的重复渲染             |

### 7.2. 副作用应该放在哪里？

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ✅ 副作用放在 useEffect 中
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  // ❌ 不要在这里发送请求
  // fetch(`/api/users/${userId}`)

  if (!user) return <div>加载中...</div>;
  return <div>{user.name}</div>;
}
```

### 7.3. React 为什么需要纯函数？

- React 18 引入的并发渲染
  - React 可能会多次调用组件函数
  - 可能会暂停渲染，稍后继续
  - 如果组件不纯，可能导致意外的副作用
- 性能优化
  - React 可以跳过纯组件的重复渲染
  - `React.memo` 等优化手段依赖纯函数
- 服务端渲染
  - 纯函数可以在服务端安全地执行
  - 不会产生浏览器特有的副作用

### 7.4. 实践建议

- 组件函数体内只做计算和返回 JSX
- 副作用统一放在 `useEffect` 中
- 不要在渲染期间修改 props 或 state
- 避免在组件内部访问全局可变变量

## 8. 虚拟 DOM

思考题：

- “虚拟 DOM”是什么？
- 为什么 React 需要“虚拟 DOM”？

::: tip 💡 虚拟 DOM

说实话，日常写业务你基本感知不到它的存在。除了用来应付面试八股文，或者做极限性能优化时需要考虑一下它的渲染开销，平时直接把它当个底层黑盒就行，不用死磕。

:::

### 8.1. 虚拟 DOM 解决的核心问题

核心问题：如何在保持声明式编程的同时，提供高性能的 DOM 更新？

虚拟 DOM 让“写起来简单、跑得也快”成为可能。

- “写起来简单”：让开发者享受声明式开发
- “跑得快”：React 借助虚拟 DOM 机制负责性能优化工作，实现高效的 DOM 更新

### 8.2. 虚拟 DOM 的工作流程

```mermaid
graph TB
    A[状态变化] --> B[生成新虚拟 DOM]
    B --> C[与旧虚拟 DOM 对比<br/>Diffing]
    C --> D[计算最小变更]
    D --> E[批量更新真实 DOM]
```

详细步骤：

1. React 在内存中维护一个虚拟的 UI 树（用 JS 对象表示）
2. 当状态变化时，生成新的虚拟树
3. React 比较新旧树的差异（Diffing 算法）
4. 只把真正变化的部分更新到真实 DOM

### 8.3. 为什么需要虚拟 DOM？

| 原因         | 说明                                      |
| ------------ | ----------------------------------------- |
| DOM 操作昂贵 | 直接操作 DOM 性能开销大，尤其是频繁更新时 |
| 批量更新     | 虚拟 DOM 可以收集多个变更，一次性更新     |
| 跨平台能力   | 虚拟 DOM 是平台无关的，可以渲染到不同目标 |
| 声明式开发   | 开发者不需要关心如何更新 DOM，只需描述 UI |

虚拟 DOM 的跨平台能力：

```mermaid
graph TD
    A[React 组件] --> B[虚拟 DOM]
    B --> C[ReactDOM<br/>浏览器]
    B --> D[React Native<br/>移动端]
    B --> E[React Test Renderer<br/>测试环境]
```

虚拟 DOM 机制能帮我们规避掉一些低效的原生 DOM 操作：

```jsx
// 假设有这样的状态变化
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "学习 React" },
    { id: 2, text: "学习 Vue" },
  ]);

  // 添加一个新任务
  const addTodo = () => {
    setTodos([...todos, { id: 3, text: "学习 Angular" }]);
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
      <button onClick={addTodo}>添加</button>
    </div>
  );
}
```

当点击添加按钮时：

- 原生 DOM 操作（低效）
  - 删除整个列表
  - 重新创建所有元素
  - 重新添加到页面
- 虚拟 DOM 优化（高效）
  - 对比前后两个虚拟树
  - 发现只是新增了一个元素
  - 只创建并插入这一个新元素

虚拟 DOM 本身也有开销（创建对象、对比差异），但相比直接操作 DOM：

- 对于大量 DOM 更新，虚拟 DOM 更高效
- 对于少量精确的 DOM 操作，原生可能更快
- React 的优势在于开发体验和可维护性的平衡

## 9. 总结

### 9.1. React 的设计哲学可以用一句话总结吗？

React 的核心哲学：用声明式、组件化的方式，通过状态驱动 UI，实现可预测、可维护、高性能的用户界面。

这句话包含了 React 的核心设计理念：

- 声明式：描述“是什么”，而不是“怎么做”
- 组件化：UI 是组件的组合
- 状态驱动：$UI = f(state)$
- 可预测：纯函数，相同输入=得到相同输出
- 可维护：清晰的数据流和组件边界
- 高性能：虚拟 DOM 优化更新

### 9.2. 极易踩坑点：“单向数据流”和“纯函数”

初学者最爱犯两个错：

- 一是在子组件里直接去改父组件传过来的 props
- 二是把发网络请求、改外部变量这种操作直接写在组件函数里

记住：数据谁产出谁维护，所有的副作用老老实实丢到 `useEffect` 或者事件处理函数里，不然各种“幽灵 Bug”查到你怀疑人生！

### 9.3. 开发时的检查清单

当你写 React 代码时，问自己这些问题：

- 我是在描述 UI 的目标状态，还是在命令 DOM？（声明式）
- 这个界面能否拆成更小的组件？（组件化）
- 数据是不是只从父组件往下传？（单向数据流）
- UI 是否只是状态的映射？（状态驱动）
- 我的组件有没有副作用？（纯函数）

当这些问题都能清晰回答时，你就真正理解了 React 的设计哲学。

## 10. 引用

- [React 官方文档 - 核心概念][1]
- [React 设计原则][2]
- [React 哲学][3]
- [声明式编程 vs 命令式编程][4]

[1]: https://zh-hans.react.dev/learn
[2]: https://legacy.reactjs.org/docs/design-principles.html
[3]: https://zh-hans.react.dev/learn/thinking-in-react
[4]: https://www.freecodecamp.org/chinese/news/imperative-vs-declarative-programming/
