# [0007. 菜鸟教程](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0007.%20%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 菜鸟教程上的 React 教程的内容大纲](#2-菜鸟教程上的-react-教程的内容大纲)
- [3. 菜鸟教程中使用的 React 版本是？](#3-菜鸟教程中使用的-react-版本是)
- [4. 学完如何自测？](#4-学完如何自测)
- [5. 菜鸟教程中的 32 道 React 测试题](#5-菜鸟教程中的-32-道-react-测试题)
  - [5.1. React 是什么？](#51-react-是什么)
  - [5.2. React 主要用于开发什么？](#52-react-主要用于开发什么)
  - [5.3. React 组件的返回值通常是什么？](#53-react-组件的返回值通常是什么)
  - [5.4. 在 React 中，更新组件状态应该使用什么？](#54-在-react-中更新组件状态应该使用什么)
  - [5.5. React 的虚拟 DOM 的作用是？](#55-react-的虚拟-dom-的作用是)
  - [5.6. React 中用于条件渲染的常用方法是？](#56-react-中用于条件渲染的常用方法是)
  - [5.7. React 组件的 props 是？](#57-react-组件的-props-是)
  - [5.8. React 中的 useState 是什么？](#58-react-中的-usestate-是什么)
  - [5.9. React 的 useEffect 用于？](#59-react-的-useeffect-用于)
  - [5.10. React 中 key 属性的作用是？](#510-react-中-key-属性的作用是)
  - [5.11. React Router 用于？](#511-react-router-用于)
  - [5.12. React 中的 Fragment 作用是？](#512-react-中的-fragment-作用是)
  - [5.13. React 组件名称的命名规范是？](#513-react-组件名称的命名规范是)
  - [5.14. React 中如何传递事件处理函数？](#514-react-中如何传递事件处理函数)
  - [5.15. React 的 Context 用于？](#515-react-的-context-用于)
  - [5.16. React 的 useRef 用于？](#516-react-的-useref-用于)
  - [5.17. React 中的 memo 作用是？](#517-react-中的-memo-作用是)
  - [5.18. React 的 useCallback 用于？](#518-react-的-usecallback-用于)
  - [5.19. React 的 useMemo 用于？](#519-react-的-usememo-用于)
  - [5.20. React 中如何实现列表渲染？](#520-react-中如何实现列表渲染)
  - [5.21. React 中的 defaultProps 用于？](#521-react-中的-defaultprops-用于)
  - [5.22. React 的 PropTypes 用于？](#522-react-的-proptypes-用于)
  - [5.23. React 的 StrictMode 作用是？](#523-react-的-strictmode-作用是)
  - [5.24. React 的生命周期函数 componentDidMount 何时调用？](#524-react-的生命周期函数-componentdidmount-何时调用)
  - [5.25. React 的事件绑定语法通常是？](#525-react-的事件绑定语法通常是)
  - [5.26. React 的 state 可以直接修改吗？](#526-react-的-state-可以直接修改吗)
  - [5.27. React 的父组件如何向子组件传递数据？](#527-react-的父组件如何向子组件传递数据)
  - [5.28. React 的 useContext 用于？](#528-react-的-usecontext-用于)
  - [5.29. React 的 useLayoutEffect 与 useEffect 区别是？](#529-react-的-uselayouteffect-与-useeffect-区别是)
  - [5.30. React 的 forwardRef 用于？](#530-react-的-forwardref-用于)
  - [5.31. React 的 Suspense 主要用于？](#531-react-的-suspense-主要用于)
  - [5.32. React 的 Error Boundary 用于？](#532-react-的-error-boundary-用于)
- [6. 引用](#6-引用)

<!-- endregion:toc -->

## 1. 本节内容

- React 菜鸟教程简介
- 记录了 React 菜鸟教程中的相关测试题以及答案

[React 菜鸟教程][1] 是一个在线的 React 教程，直接通过链接去看即可，比较适合适合快速入门。

刷完教程之后，可以在结尾的测试章节中自测一下是否掌握了 React 相关知识。

## 2. 菜鸟教程上的 React 教程的内容大纲

通过大纲，能帮我们快速了解到这篇教程中都介绍了哪些内容。

目前 `25.11` 大纲的具体内容如下：

- React 教程
- React 安装(NPM)
- React 安装(CDN)
- React AI 编程助手
- React 创建第一个项目
- React 项目说明
- React 元素渲染
- React JSX
- React 组件
- React 组件状态
- React Props
- React 事件处理
- React 条件渲染
- React 列表 & Keys
- React 组件 API
- React 组件生命周期
- React AJAX
- React 表单与事件
- React Refs
- React 条件判断
- React 路由
- React Memo
- React CSS
- React Sass
- React Tailwind CSS
- React Hooks
- React 参考手册
- React 测验

## 3. 菜鸟教程中使用的 React 版本是？

`v18.2.0`

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-17-14-53-18.png)

## 4. 学完如何自测？

结尾有一个【React 测试】章节，这里边儿有一些 React 相关的测试练习题，可以刷一刷自测。

![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-17-14-57-19.png)

## 5. 菜鸟教程中的 32 道 React 测试题

::: tip

下面是菜鸟教程中的 32 道 React 测试题内容，附带了答案和简要的解释说明。

:::

### 5.1. React 是什么？

- A. 一种数据库
- B. 一种前端框架
- C. 一种操作系统
- D. 一种后端语言

::: details 答案

选：B

React 是一个用于构建用户界面的 JavaScript 库，由 Meta（原 Facebook）开发并开源。

:::

### 5.2. React 主要用于开发什么？

- A. 数据库
- B. 服务器
- C. 用户界面
- D. 操作系统

::: details 答案

选：C

React 的核心定位是构建用户界面（UI），它通过组件化的方式高效地渲染和更新页面视图。

:::

### 5.3. React 组件的返回值通常是什么？

- A. HTML 字符串
- B. JSX 元素
- C. JSON 对象
- D. CSS 样式

::: details 答案

选：B

React 组件通过 JSX 语法返回 JSX 元素，JSX 是 JavaScript 的语法扩展，最终会被编译为 `React.createElement()` 调用。

:::

### 5.4. 在 React 中，更新组件状态应该使用什么？

- A. setState
- B. updateState
- C. changeState
- D. modifyState

::: details 答案

选：A

在类组件中通过 `this.setState()` 更新状态，在函数组件中通过 `useState` 返回的 setter 函数更新状态。

:::

### 5.5. React 的虚拟 DOM 的作用是？

- A. 提升性能
- B. 存储数据
- C. 管理样式
- D. 路由跳转

::: details 答案

选：A

虚拟 DOM 通过在内存中维护一棵轻量级的 DOM 树，对比新旧状态的差异后只将变化部分更新到真实 DOM，从而减少不必要的 DOM 操作以提升性能。

:::

### 5.6. React 中用于条件渲染的常用方法是？

- A. if/else
- B. switch
- C. 三元运算符
- D. for 循环

::: details 答案

选：C

在 JSX 中，三元运算符 `condition ? A : B` 是最常用的条件渲染方式，因为它可以直接嵌入 JSX 表达式中。虽然 if/else 也可以使用，但需要写在 JSX 外部。

:::

### 5.7. React 组件的 props 是？

- A. 组件内部状态
- B. 父组件传递的数据
- C. 生命周期方法
- D. 样式表

::: details 答案

选：B

props（properties）是父组件向子组件传递数据的方式，子组件通过读取 props 来获取外部数据，props 是只读的，子组件不能直接修改。

:::

### 5.8. React 中的 useState 是什么？

- A. 生命周期函数
- B. 路由方法
- C. 定义响应式状态的 Hook
- D. 样式管理工具

::: details 答案

选：C

`useState` 是 React 内置的 Hook，用于在函数组件中定义和管理响应式状态，当状态发生变化时，组件会重新渲染。

:::

### 5.9. React 的 useEffect 用于？

- A. 管理样式
- B. 处理副作用
- C. 定义路由
- D. 创建组件

::: details 答案

选：B

`useEffect` 用于处理组件的副作用，如数据请求、手动操作 DOM、订阅等。它在组件渲染完成后执行，可以通过依赖数组控制执行时机。

:::

### 5.10. React 中 key 属性的作用是？

- A. 唯一标识列表项
- B. 绑定事件
- C. 设置样式
- D. 传递数据

::: details 答案

选：A

`key` 用于在列表渲染中唯一标识每个列表项，帮助 React 高效地识别哪些元素发生了变化、新增或删除，从而优化 diff 算法的性能。

:::

### 5.11. React Router 用于？

- A. 状态管理
- B. 路由管理
- C. 样式管理
- D. 数据请求

::: details 答案

选：B

React Router 是 React 生态中最常用的路由库，用于实现单页应用（SPA）的页面导航和 URL 管理。

:::

### 5.12. React 中的 Fragment 作用是？

- A. 管理样式
- B. 数据请求
- C. 生命周期管理
- D. 支持多个根节点

::: details 答案

选：D

`React.Fragment` 允许组件返回多个元素而无需添加额外的 DOM 节点，解决了 JSX 要求单根元素的限制。

:::

### 5.13. React 组件名称的命名规范是？

- A. 小写字母开头
- B. 下划线开头
- C. 大写字母开头
- D. 数字开头

::: details 答案

选：C

React 约定组件名称必须以大写字母开头，以便与原生 HTML 元素区分。小写字母开头的标签会被视为原生 DOM 元素。

:::

### 5.14. React 中如何传递事件处理函数？

- A. 通过 props
- B. 通过 state
- C. 通过 context
- D. 通过 ref

::: details 答案

选：A

事件处理函数通常由父组件定义，通过 props 传递给子组件，子组件在触发事件时调用该函数，实现子向父的通信。

:::

### 5.15. React 的 Context 用于？

- A. 样式管理
- B. 全局状态管理
- C. 生命周期管理
- D. 路由管理

::: details 答案

选：B

Context 提供了一种在组件树中跨层级共享数据的方式，无需逐层通过 props 传递，适用于全局状态管理（如主题、语言、用户信息等）。

:::

### 5.16. React 的 useRef 用于？

- A. 保存可变数据
- B. 定义样式
- C. 管理路由
- D. 处理副作用

::: details 答案

选：A

`useRef` 用于保存可变的引用数据，其 `.current` 属性的变化不会触发组件重新渲染，也常用于访问 DOM 元素。

:::

### 5.17. React 中的 memo 作用是？

- A. 管理样式
- B. 处理副作用
- C. 定义路由
- D. 缓存组件，避免不必要的渲染

::: details 答案

选：D

`React.memo` 是一个高阶组件，用于缓存函数组件的渲染结果，当 props 没有变化时跳过重新渲染，从而提升性能。

:::

### 5.18. React 的 useCallback 用于？

- A. 缓存组件
- B. 管理样式
- C. 缓存函数
- D. 定义路由

::: details 答案

选：C

`useCallback` 用于缓存函数引用，只有在依赖项发生变化时才会重新创建函数，避免子组件因父组件渲染而导致的不必要渲染。

:::

### 5.19. React 的 useMemo 用于？

- A. 缓存计算结果
- B. 缓存组件
- C. 管理样式
- D. 定义路由

::: details 答案

选：A

`useMemo` 用于缓存复杂计算的结果，只有在依赖项发生变化时才重新计算，避免每次渲染都执行耗时运算。

:::

### 5.20. React 中如何实现列表渲染？

- A. 使用 v-for
- B. 使用 map
- C. 使用 forEach
- D. 使用 for 循环

::: details 答案

选：B

React 使用数组的 `map()` 方法将数据数组转换为 JSX 元素数组来实现列表渲染，注意每个列表项需要设置唯一的 `key` 属性。

:::

### 5.21. React 中的 defaultProps 用于？

- A. 设置默认状态
- B. 设置默认属性值
- C. 设置默认样式
- D. 设置默认事件

::: details 答案

选：B

`defaultProps` 用于为组件的 props 设置默认值，当父组件没有传递对应的 prop 时，组件会使用默认值。

:::

### 5.22. React 的 PropTypes 用于？

- A. 类型检查
- B. 样式管理
- C. 生命周期管理
- D. 路由管理

::: details 答案

选：A

`PropTypes` 是一个类型检查库，用于在运行时验证组件 props 的类型是否正确，有助于提前发现传参错误。

:::

### 5.23. React 的 StrictMode 作用是？

- A. 管理样式
- B. 定义路由
- C. 缓存组件
- D. 帮助发现潜在问题

::: details 答案

选：D

`StrictMode` 是一个开发工具，会在开发环境中对组件进行额外的检查，帮助发现潜在的问题（如不安全的生命周期方法、废弃的 API 使用等）。

:::

### 5.24. React 的生命周期函数 componentDidMount 何时调用？

- A. 组件挂载后
- B. 组件卸载后
- C. 组件更新后
- D. 组件渲染前

::: details 答案

选：A

`componentDidMount` 在组件第一次渲染并挂载到 DOM 后调用，常用于发起数据请求、订阅事件等初始化操作。

:::

### 5.25. React 的事件绑定语法通常是？

- A. onClick=\{handleClick\}
- B. onclick='handleClick()'
- C. on-click=\{handleClick\}
- D. click=\{handleClick\}

::: details 答案

选：A

React 使用驼峰命名的事件属性（如 `onClick`），并通过花括号传入函数引用，而不是字符串形式的事件处理器。

:::

### 5.26. React 的 state 可以直接修改吗？

- A. 可以
- B. 不可以
- C. 部分可以
- D. 无所谓

::: details 答案

选：B

state 是不可变的，直接修改 state 不会触发组件重新渲染。必须通过 `setState`（类组件）或 setter 函数（函数组件）来创建新的 state 值。

:::

### 5.27. React 的父组件如何向子组件传递数据？

- A. 通过 props
- B. 通过 state
- C. 通过 context
- D. 通过 ref

::: details 答案

选：A

父组件通过在子组件标签上添加属性来传递 props，子组件在函数参数中接收。这是 React 中最基本的数据传递方式。

:::

### 5.28. React 的 useContext 用于？

- A. 访问 context 数据
- B. 管理样式
- C. 定义路由
- D. 缓存组件

::: details 答案

选：A

`useContext` 是一个 Hook，用于在函数组件中直接读取 Context 的值，简化了 Context 的消费方式，无需使用 Consumer 组件。

:::

### 5.29. React 的 useLayoutEffect 与 useEffect 区别是？

- A. useLayoutEffect 同步执行
- B. useLayoutEffect 异步执行
- C. 没有区别
- D. useEffect 只能用在类组件

::: details 答案

选：A

`useLayoutEffect` 在 DOM 变更后同步执行（在浏览器绘制之前），而 `useEffect` 在浏览器绘制之后异步执行。适用于需要同步读取或修改 DOM 的场景。

:::

### 5.30. React 的 forwardRef 用于？

- A. 转发 ref 到子组件
- B. 转发 props
- C. 缓存组件
- D. 定义路由

::: details 答案

选：A

`React.forwardRef` 用于将 ref 转发到子组件，使父组件能够直接访问子组件的 DOM 节点或组件实例。

:::

### 5.31. React 的 Suspense 主要用于？

- A. 管理样式
- B. 定义路由
- C. 处理异步加载
- D. 缓存组件

::: details 答案

选：C

`React.Suspense` 用于处理异步组件的加载状态，在异步组件尚未加载完成时可以显示 fallback 内容（如 Loading...），常与 `React.lazy` 搭配使用。

:::

### 5.32. React 的 Error Boundary 用于？

- A. 捕获子组件错误
- B. 管理样式
- C. 定义路由
- D. 缓存组件

::: details 答案

选：A

Error Boundary（错误边界）是一种 React 组件，可以捕获其子组件树中的 JavaScript 错误并展示降级 UI，防止整个应用因单个组件的错误而崩溃。

:::

## 6. 引用

- [菜鸟教程 - React 教程][1]

[1]: https://www.runoob.com/react/react-tutorial.html
