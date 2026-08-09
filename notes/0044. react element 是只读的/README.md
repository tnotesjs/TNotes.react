# [0044. React Element 是只读的](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0044.%20React%20Element%20%E6%98%AF%E5%8F%AA%E8%AF%BB%E7%9A%84)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. demos.1 - react element 是只读的](#2-demos1---react-element-是只读的)
- [3. 对比 demos.1 中的两种正确做法](#3-对比-demos1-中的两种正确做法)

<!-- endregion:toc -->

## 1. 本节内容

通过一个实验示例来认识只读的 React Element。

永远不要尝试去修改 React Element 的属性，正确的做法是通过渲染新的 React Element 或使用 React 的状态管理机制（state 或 props）来更新 UI。

## 2. demos.1 - react element 是只读的

::: code-group

<<< ./demos/1/assets/1.jsx [渲染头像]

<<< ./demos/1/assets/2.jsx [❌ 尝试修改 element.src 替换图片]

:::

- 最终渲染结果：
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-09-58-39.png)
- `imgEle.props.src = '...'` ❌
  - 当执行到这条语句的时候，我们可能是想要替换图片的 src，换成其他的图片，但是这种写法是错误的。
  - 如果执行到这条语句，则会抛出错误提示：`Uncaught TypeError: Cannot assign to read only property 'src' of object '#<Object>'`，提醒我们不能给只读的属性赋值。
  - ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-09-58-47.png)
- 再来看一个计数器的示例：

::: code-group

<<< ./demos/1/assets/3.jsx [❌ 错误做法]

:::

- `counter` 结构：
  - ![图 4](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-10-04-05.png)
  - 在错误做法中，试图修改 `counter.props.children` 来改变计数器的值，这会导致错误，因为 react element 是只读的。

::: code-group

<<< ./demos/1/assets/4.jsx [✅ 正确做法-1]

:::

- 正确做法最终渲染结果：
  - ![图 2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-09-59-01.png)
- 虽然上述提到的正确做法可以让计数器 demo 正常工作，但是，上述写法其实还是存在一些问题的。
  - 每次重新 `render`，都会打印这条消息。
    - ![图 3](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-09-59-15.png)
  - 在程序的运行过程中，出现的这条警告信息表明你正在尝试在一个已经被 `createRoot` 初始化的容器上调用 `createRoot`。React 不允许对同一个容器多次调用 `createRoot`，而是应该保留对根实例的引用，并在需要更新时调用其 `render` 方法。
- 修改建议：
  - 创建一次根实例并保存引用：将 `createRoot` 的调用移出定时器外部，并保存返回的根实例。
  - 使用状态管理：推荐使用 React 的状态管理功能（如 `useState`）来处理组件内部的状态变化，而不是使用全局变量。
- 下面是改进后的计数器 demo 的代码示例：

::: code-group

<<< ./demos/1/assets/5.jsx [✅ 正确做法-2]

:::

- 改进点：
  - 状态管理：使用 `useState` 来管理计数器的状态。
  - 副作用处理：使用 `useEffect` 来设置和清除定时器，确保组件卸载时清理定时器。
  - 单次初始化：只调用一次 `createRoot` 并保存其引用，避免重复初始化。
- 这样可以避免警告，并且代码更加符合 React 的最佳实践。

## 3. 对比 demos.1 中的两种正确做法

- 如果你习惯命令式编程，又不熟悉 react 特性，很可能会写出类似 1 这样的程序，虽说也能跑不假，但是这么做在实际项目中是非常不推荐的。
- 下面是从不同维度对两种写法进行的对比：

| 维度                    | 1                                                        | 2                                      |
| ----------------------- | -------------------------------------------------------- | -------------------------------------- |
| 写法类型                | 纯 JS + React API 手动渲染                               | React 组件式写法                       |
| 范式                    | 命令式（反模式）                                         | 声明式（更符合 React 思想）            |
| 是否使用 React 状态机制 | ❌ 否                                                    | ✅ 是                                  |
| 是否触发 React diff     | ❌ 否                                                    | ✅ 是                                  |
| 状态存储                | 由外部变量 `num` 保存                                    | 使用 React 状态 `useState` 保存        |
| 渲染机制                | 每次 `setInterval` 都重新创建 root 并强制渲染整个 DOM 树 | React 根据状态变化触发内部 diff 和更新 |
| 是否复用 React Fiber 树 | ❌ 否，每次重建 Fiber 树                                 | ✅ 是，React 内部会 diff、复用节点     |
| 性能                    | 很差，每秒销毁并重建 DOM                                 | 高效，仅更新变化部分                   |
| 是否有副作用清理机制    | ❌ 无清理，会不断叠加 root                               | ✅ 有 `useEffect` 清理逻辑             |
