# [0147. 声明式 vs 命令式编程](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0147.%20%E5%A3%B0%E6%98%8E%E5%BC%8F%20vs%20%E5%91%BD%E4%BB%A4%E5%BC%8F%E7%BC%96%E7%A8%8B)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 声明式编程是什么？](#3--声明式编程是什么)
- [4. 🤔 命令式编程是什么？](#4--命令式编程是什么)
- [5. 🆚 声明式 vs 命令式对比](#5--声明式-vs-命令式对比)
  - [5.1. 核心区别对比表](#51-核心区别对比表)
  - [5.2. 不同编程范式的例子](#52-不同编程范式的例子)
  - [5.3. 生活化示例](#53-生活化示例)
  - [5.4. 代码示例对比](#54-代码示例对比)
- [6. 🤔 React 为什么选择声明式？](#6--react-为什么选择声明式)
- [7. 🔗 引用](#7--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 声明式编程的概念
- 命令式编程的概念
- 两种编程范式的对比
- React 选择声明式的原因
- 实际代码示例

## 2. 🫧 评价

本笔记详细对比了声明式和命令式编程，帮助理解 React 的设计哲学。

- 理解声明式和命令式的区别是掌握 React 的关键
- 声明式让代码更易读、更易维护，是现代前端框架的主流选择
- 在实际开发中，应该拥抱声明式思维，描述"是什么"而非"怎么做"
- 命令式并非一无是处，在某些性能敏感场景下仍有其价值

## 3. 🤔 声明式编程是什么？

声明式编程的核心特征：

- 关注"是什么"（What），而不是"怎么做"（How）
- 描述目标状态，而不是达到目标的步骤
- 让框架或运行时决定如何实现
- 代码更接近人类的思维方式

生活中的声明式例子：

- 你在餐厅点餐："我要一份宫保鸡丁"
- 你不需要告诉厨师："先切鸡肉，再准备花生米，然后……"
- 你只需要声明你想要什么，厨师会处理细节

编程中的声明式例子：

```jsx
// 声明式：描述 UI 应该是什么样子
function Greeting({ isLoggedIn }) {
  return isLoggedIn ? <h1>欢迎回来</h1> : <h1>请登录</h1>
}
```

你只需要声明：

- 如果已登录，显示"欢迎回来"
- 如果未登录，显示"请登录"

React 会自动处理 DOM 更新的细节。

## 4. 🤔 命令式编程是什么？

命令式编程的核心特征：

- 关注"怎么做"（How），而不是"是什么"（What）
- 描述达到目标的每一个步骤
- 开发者控制执行流程
- 代码更接近计算机的工作方式

生活中的命令式例子：

- 你在餐厅做菜："先把锅烧热，倒油，放入鸡肉……"
- 你需要明确告诉每一步操作
- 你控制整个烹饪过程

编程中的命令式例子：

```js
// 命令式：描述如何达到目标
function updateGreeting(isLoggedIn) {
  // 步骤 1：找到 DOM 元素
  const greeting = document.getElementById('greeting')

  // 步骤 2：清空内容
  greeting.innerHTML = ''

  // 步骤 3：创建新元素
  const h1 = document.createElement('h1')

  // 步骤 4：设置文本
  h1.textContent = isLoggedIn ? '欢迎回来' : '请登录'

  // 步骤 5：添加到 DOM
  greeting.appendChild(h1)
}
```

你需要告诉计算机每一步怎么做。

## 5. 🆚 声明式 vs 命令式对比

### 5.1. 核心区别对比表

| 维度     | 声明式           | 命令式           |
| -------- | ---------------- | ---------------- |
| 关注点   | 是什么（What）   | 怎么做（How）    |
| 抽象层次 | 高               | 低               |
| 代码量   | 少               | 多               |
| 可读性   | 好               | 较差             |
| 可维护性 | 高               | 较低             |
| 灵活性   | 较低（框架控制） | 高（开发者控制） |
| 性能控制 | 框架优化         | 手动优化         |
| 学习曲线 | 需要理解框架     | 更接近底层       |
| 调试难度 | 可能较难（黑盒） | 相对容易（白盒） |
| 出错概率 | 低               | 高               |

### 5.2. 不同编程范式的例子

| 任务 | 声明式 | 命令式 |
| --- | --- | --- |
| SQL 查询 | `SELECT * FROM users WHERE age > 18` | 遍历数组，检查每个元素 |
| HTML | `<h1>标题</h1>` | `document.createElement('h1')` |
| CSS | `.button { color: red; }` | `element.style.color = 'red'` |
| React | `<Button onClick={handler}>点击</Button>` | 手动添加事件监听器 |

### 5.3. 生活化示例

用点外卖类比声明式和命令式：

命令式点外卖（麻烦）：

```txt
1. 打开美团 APP
2. 点击"外卖"标签
3. 在搜索框输入"肯德基"
4. 点击搜索按钮
5. 等待搜索结果加载
6. 找到第一个肯德基店铺
7. 点击进入
8. 滚动查找"汉堡"分类
9. 点击"香辣鸡腿堡"
10. 点击"加入购物车"
11. 点击购物车图标
12. 点击"去结算"
13. 填写地址
14. 选择支付方式
15. 点击"提交订单"
```

声明式点外卖（简单）：

```
我要一份肯德基的香辣鸡腿堡，送到我家。
```

在 React 中的体现：

::: code-group

```js [命令式（原生 JS）]
// 命令式：告诉计算机每一步怎么做
function showOrderButton() {
  // 找到容器
  const container = document.getElementById('container')

  // 创建按钮
  const button = document.createElement('button')
  button.textContent = '点外卖'
  button.className = 'order-button'

  // 添加点击事件
  button.addEventListener('click', () => {
    alert('正在下单...')
  })

  // 添加到 DOM
  container.appendChild(button)
}
```

```jsx [声明式（React）]
// 声明式：描述按钮应该是什么样子
function OrderButton() {
  const handleClick = () => {
    alert('正在下单...')
  }

  return (
    <button className="order-button" onClick={handleClick}>
      点外卖
    </button>
  )
}
```

:::

### 5.4. 代码示例对比

任务：创建一个待办事项列表

::: code-group

```js [命令式实现]
// 命令式：详细描述每个步骤
let todos = []

function addTodo(text) {
  // 1. 更新数据
  todos.push({ id: Date.now(), text, done: false })

  // 2. 找到列表容器
  const list = document.getElementById('todo-list')

  // 3. 创建新的列表项
  const li = document.createElement('li')
  li.id = `todo-${todos.length - 1}`

  // 4. 创建文本节点
  const span = document.createElement('span')
  span.textContent = text

  // 5. 创建删除按钮
  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = '删除'
  deleteBtn.onclick = () => removeTodo(todos.length - 1)

  // 6. 组装元素
  li.appendChild(span)
  li.appendChild(deleteBtn)

  // 7. 添加到列表
  list.appendChild(li)
}

function removeTodo(index) {
  // 1. 更新数据
  todos.splice(index, 1)

  // 2. 找到 DOM 元素
  const li = document.getElementById(`todo-${index}`)

  // 3. 从 DOM 中移除
  li.remove()

  // 4. 更新后续元素的 ID
  // ... 还需要处理很多细节
}
```

```jsx [声明式实现（React）]
// 声明式：描述 UI 应该是什么样子
function TodoList() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={() => removeTodo(todo.id)}>删除</button>
        </li>
      ))}
    </ul>
  )
}

// React 自动处理：
// - DOM 的创建和删除
// - 事件监听器的绑定和解绑
// - 元素的更新和重排
// - 性能优化
```

:::

代码对比分析：

| 维度 | 命令式 | 声明式（React） |
| --- | --- | --- |
| 代码行数 | ~40 行 | ~15 行 |
| 关注点 | DOM 操作细节 | 数据和 UI 结构 |
| 需要考虑的问题 | - DOM 查找<br/>- 元素创建<br/>- 事件绑定<br/>- 内存泄漏<br/>- ID 管理 | - 数据结构<br/>- 业务逻辑 |
| 修改难度 | 高（牵一发动全身） | 低（只改数据） |
| 出错概率 | 高 | 低 |

## 6. 🤔 React 为什么选择声明式？

React 选择声明式的原因：

- 提升开发效率
  - 写更少的代码
  - 更专注于业务逻辑
  - 减少重复的 DOM 操作代码
- 降低出错概率
  - 不需要手动管理 DOM 状态
  - 框架保证 UI 与数据同步
  - 减少手动操作 DOM 的错误
- 提高代码可读性
  - 代码更接近最终呈现的 UI
  - 更容易理解组件的功能
  - 团队协作更顺畅
- 便于维护和重构
  - UI 结构一目了然
  - 修改逻辑不影响 DOM 操作
  - 组件更容易复用
- 性能优化交给框架
  - React 的虚拟 DOM 机制
  - 自动批量更新
  - 智能 diff 算法

权衡取舍：

- 优势：开发体验好，代码简洁
- 代价：失去部分底层控制权
- 结论：对大多数应用来说，这个取舍是值得的

## 7. 🔗 引用

- [声明式编程 - 维基百科][1]
- [命令式编程 - 维基百科][2]
- [声明式 vs 命令式编程][3]
- [React 设计理念][4]

[1]: https://zh.wikipedia.org/wiki/%E5%AE%A3%E5%91%8A%E5%BC%8F%E7%B7%A8%E7%A8%8B
[2]: https://zh.wikipedia.org/wiki/%E6%8C%87%E4%BB%A4%E5%BC%8F%E7%B7%A8%E7%A8%8B
[3]: https://www.freecodecamp.org/chinese/news/imperative-vs-declarative-programming/
[4]: https://legacy.reactjs.org/docs/design-principles.html
