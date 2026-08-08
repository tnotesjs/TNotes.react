# [0032. React 简介](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0032.%20React%20%E7%AE%80%E4%BB%8B)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. React 简介](#2-react-简介)
  - [2.1. React 是什么？](#21-react-是什么)
  - [2.2. React 官网链接是？](#22-react-官网链接是)
  - [2.3. React 的 GitHub 仓库链接是？](#23-react-的-github-仓库链接是)
  - [2.4. React 都有哪些特点？](#24-react-都有哪些特点)
- [3. 轻量](#3-轻量)
  - [3.1. development 版本](#31-development-版本)
  - [3.2. production 版本](#32-production-版本)
    - [为什么这个 `react` 核心包这么小？](#为什么这个-react-核心包这么小)
    - [真正干“脏活累活”的大头在哪里？](#真正干脏活累活的大头在哪里)
    - [为什么要这么拆分？（为了跨平台）](#为什么要这么拆分为了跨平台)
  - [3.3. 如何验证](#33-如何验证)
- [4. 原生](#4-原生)
  - [4.1. 原生 JS 书写](#41-原生-js-书写)
  - [4.2. 不依赖宿主环境](#42-不依赖宿主环境)
- [5. 灵活](#5-灵活)
- [6. 单向数据流](#6-单向数据流)
- [7. 库](#7-库)
  - [7.1. 库 vs. 框架（React vs. Vue）](#71-库-vs-框架react-vs-vue)
  - [7.2. “库”和“框架”的定义](#72-库和框架的定义)
  - [7.3. 一个著名的软件工程核心概念：控制反转（Inversion of Control，简称 IoC）](#73-一个著名的软件工程核心概念控制反转inversion-of-control简称-ioc)
  - [7.4. 其它角度：从“侵入性”角度来对比](#74-其它角度从侵入性角度来对比)
  - [7.5. 小结](#75-小结)
    - [react](#react)
    - [vue](#vue)
- [8. 引用](#8-引用)

<!-- endregion:toc -->

## 1. 本节内容

- React 简介
- React 官网
- React 源码仓库
- React 的轻量核心
- React 的灵活性
- 单向数据流
- React vs. Vue
- 库
- 框架
- 侵入性
- 控制反转（Inversion of Control，简称 IoC）
- 好莱坞原则（Hollywood Principle）

本节内容是对 React 的一个简单介绍，以及 React 和 Vue 的对比。

## 2. React 简介

### 2.1. React 是什么？

React 是由 Facebook 研发的、用于 解决 UI 复杂度 的开源 JavaScript 库，目前由 React 联合社区维护。

React 不是框架，只是为了解决 UI 复杂度而诞生的一个库。只不过我们平时在提到 React 时，往往会将其称之为前端框架。

官方定义：

- The library for web and native user interfaces
- 用于构建 Web 和原生交互界面的库

::: swiper

![en](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-29-52.png)

![zh-cn](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-30-01.png)

:::

### 2.2. React 官网链接是？

- 英文原版：https://react.dev/
- 简体中文翻译版：https://zh-hans.react.dev/

### 2.3. React 的 GitHub 仓库链接是？

- GitHub 源码仓库：https://github.com/facebook/react
- deepwiki 文档：https://deepwiki.com/facebook/react
  - 由 Cognition AI 开发的辅助阅读源码的 AI 文档
- zreadai 文档：https://zread.ai/facebook/react
  - 由智谱开发的辅助阅读源码的 AI 文档

::: tip 提示

如果有纠结细节想要明确正确性，建议走 deepwiki 文档去咨询 AI，可以从源码实现层面给出详细答案，相对来说更加权威一些。

:::

### 2.4. React 都有哪些特点？

React 具有以下核心特点：

| 特点 | 说明 |
| --- | --- |
| 轻量 | 开发版源码仅 3k 行，生产版体积仅 7KB，空间成本开销极小 |
| 原生 | 完全使用原生 JavaScript 编写，不依赖其他库，可跨平台运行（浏览器、桌面、移动端） |
| 灵活 | 封装程度低，易于扩展和定制，支持渐进式改造现有项目 |
| 单向数据流 | 数据自顶向下流动，状态变化可控，便于调试和维护 |
| 组件化 | UI 拆分为独立、可复用的组件，提升开发效率 |
| 声明式 | 使用 JSX 描述界面，代码更直观易读 |
| 虚拟 DOM | 高效的 diff 算法，减少真实 DOM 操作，提升性能 |
| 社区生态强大 | 丰富的第三方库和工具链支持 |

## 3. 轻量

### 3.1. development 版本

React 的开发版（也就是 development 版本）所有源码（包含注释）仅 3k 行左右。

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-35-36.png)

### 3.2. production 版本

React 的运行版（也就是 production 版本）所有源码体积仅 7KB 左右。

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-35-52.png)

::: tip React 的核心（Core）

这个 7KB 的包是 React 的纯逻辑核心（Core），但它并不是 React 的全部，它只负责“描述 UI”和“状态逻辑”。

但在实际开发 Web 应用时，你最终打包进项目的体积是 `react` (7KB) + `react-dom` (几百KB)，所以整体的运行时体积并没有看起来的那么小。

:::

#### 为什么这个 `react` 核心包这么小？

因为这个 7KB 的包只负责“描述 UI”和“状态逻辑”。

它里面只包含了你平时写的 `useState`、`useEffect`、`Component` 类、以及创建虚拟 DOM（Virtual DOM）的逻辑。它根本不知道什么是浏览器的 HTML 标签（如 `<div>`、`<span>`），也不知道怎么把东西画到屏幕上。 它就像一个“大脑”或者“总设计师”，只负责出图纸。

#### 真正干“脏活累活”的大头在哪里？

真正把 React 的虚拟 DOM 转换成浏览器里真实 DOM 元素的，是另一个包：`react-dom`。

```js
import { StrictMode } from "react"; // 这是 React 核心
import { createRoot } from "react-dom/client"; // 这是大头

function App() {
  return <h1>Hello World</h1>;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

你会发现，`react-dom` 相关文件通常在几百 KB。这才是包含了大量浏览器兼容性处理、事件合成机制（SyntheticEvent）、以及真正操作 DOM 节点的“施工队”。

#### 为什么要这么拆分？（为了跨平台）

如果把 React 和 DOM 绑死在一起，那 React 就只能写网页了。拆分之后，这个 7KB 的“大脑（`react`）”就可以搭配不同的“施工队（Renderer）”去干不同的活：

- `react` + `react-dom` = 开发 Web 网页
- `react` + `react-native` = 开发 iOS / Android 原生 App
- `react` + `react-three-fiber` = 开发 WebGL 3D 游戏/场景
- `react` + `ink` = 开发命令行终端界面 (CLI)

### 3.3. 如何验证

上述截图中的内容，你可以使用 vite 来快速搭建一个 react 工程，然后到 node_modules 中查看。

具体做法示例：使用 `pnpm create vite` 命令来快速创建一个 react 工程，目前 `24.11` 创建的 react 的最新版本是 `"version": "18.3.1"`。若你想要验证上述描述是否准确，可以自行创建一个工程来瞅一瞅。

## 4. 原生

### 4.1. 原生 JS 书写

所有的 React 的代码几乎都是用原生 JS 书写而成的，不依赖其他任何库。

### 4.2. 不依赖宿主环境

React 只依赖原生 JS 语言，几乎不依赖任何其他库，同时也没有具体的运行环境依赖，比如没有浏览器宿主环境下的 window，document 访问。因此，它可以被轻松的移植到浏览器、桌面应用（如使用 Electron）、移动端（如 React Native）。

这一点在介绍“轻量”时就已经提及到了，这也是为什么 React 核心只有几 KB 的原因。

## 5. 灵活

| 特点 | 说明 |
| --- | --- |
| 易扩展 | React 对代码的封装程度较低，也没有过多的使用魔法，所以 React 中的很多功能都可以扩展。 |
| 渐进式 | React 并非框架，对整个工程没有强制约束力。这对于那些已存在的工程，可以逐步地将其改造为 React，而不需要全盘重写。 |
| JSX | 让你用 JS 代码声明界面，非常灵活。 |
| 组件化 | 这也是其他大多数框架所具备的特点。 |

## 6. 单向数据流

提到灵活性，想到有必要再提一嘴“单向数据流”。

单向数据流：所有的数据自顶而下的流动。

这种模式使得状态数据的变化变得更为可控，管理起来也会更为简单。

这也是其他大多数框架所具备的特点，是我们在做组件化开发时需要遵循的一套默认规范。

单向数据流的核心目的可以理解为：“让灵活性不失控，始终有一套规范约束我们的数据流”。当你在追某个状态的变更时，往往只需要沿着组件树的结构一层层往下追即可，默认认为这个数据不会反向流动。

::: tip 提示

单向数据流可以先有个大致的概念即可，在后续笔记中的一些代码示例中，都会遵循这一原则。

:::

## 7. 库

思考：为什么官方特别强调 React 是一个库，而非框架呢？

### 7.1. 库 vs. 框架（React vs. Vue）

库 vs. 框架 -> 作为对比，我们可以先看看 vue 官方对 vue 的定义：

![图 5](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-38-41.png)

可以看到，官方明确表示，vue 是一个渐进式 JavaScript 框架。

### 7.2. “库”和“框架”的定义

下面再来看看“库”和“框架”的定义：

- “库”是一组预先编写的代码，用于解决特定的问题或提供特定的功能。库通常提供一组函数、类或对象，开发者可以在自己的代码中调用这些函数或对象。
- “框架”是一组预先编写的代码，提供了一种结构化的解决方案，用于开发特定类型的应用程序。框架通常定义了一套规则和约定，开发者需要遵循这些规则来构建应用程序。

::: tip 提示

上述定义参考维基百科：

- [维基百科 - 函数库 - library][7]
- [维基百科 - 软件框架 - software framework][8]

你会发现，单从“定义”角度来看，我们不太好区分开“库”和“框架”这两个词。

其实，在前端领域，react、vue 的主要作用都是用于解决 UI 复杂度的问题，它们的作用是非常类似的。所以也会有不少人将它们统一称之为前端框架。其实也没必要死扣字眼，认定“react 是框架”这种说法是错误的，与其死扣字眼，不如想想官方特地这么强调可能有哪些用意。

:::

### 7.3. 一个著名的软件工程核心概念：控制反转（Inversion of Control，简称 IoC）

计算机科学/软件工程层面更为“权威”和根本的区别，通常业界公认的核心标准是控制权的方向。

在软件工程中，区分“库”和“框架”最关键的技术标准，也就是经典的好莱坞原则（Hollywood Principle）：“Don't call us, we'll call you.（不要打电话给我们，我们会打给你）”。

符合好莱坞原则（“不要给我们打电话，我们会打给你”）的是框架（Framework）。

- 库（Library） => 你控制库 React => 是你打电话过去（你调用它）
  - 是你（开发者）的代码掌控着程序的执行主干流程。
  - 当你的程序运行到需要某项能力时，由你主动去调用库提供的方法。
  - 在 React 中，是你自己写入口文件，然后通过 `ReactDOM.createRoot().render()` 主动让 React 去执行渲染工作。
- 框架（Framework） => 框架 Vue 控制你 => 是它打电话给你（它调用你）
  - 框架本身提供并掌控了整个程序的执行主干生命周期。
  - 你的代码只是框架挖好的“洞（钩子/Lifecycle Hooks）”里的填空题。
  - 是框架在特定的时机主动来调用你的代码。

可以结合控制反转的概念来理解：

- 库（Library）：你掌控整个程序的执行流程，需要特定功能时，你主动去调用库里的函数。
- 框架（Framework）：框架掌控着程序的主流程和生命周期，你只需要在框架留好的“钩子（Hooks/回调）”里填上代码，当系统运行到那个阶段时，框架会自动来调用你的代码。 这就是典型的控制反转（IoC）。

React 强调自己是个库，是因为它最初的设计只负责 MVC 中的 View（视图层）。它不负责路由（Router）、不负责状态请求（如 axios）、不强制你如何组织项目结构。开发者随时可以在任意现有的（哪怕是用 jQuery 写的）老项目中，抠出一小块区域用 React 这个“纯计算视图的库”来接管，这种即插即用、且控制权在开发者手里的特性，正是“库”的典型特征。

### 7.4. 其它角度：从“侵入性”角度来对比

| 库 vs. 框架 | 侵入性 | 灵活性 | 提供的额外语法支持 |
| ----------- | ------ | ------ | ------------------ |
| 框架        | 强     | 弱     | 多                 |
| 库          | 弱     | 强     | 少                 |

- 库：开发者拥有更多的控制权、更高的灵活性，可以自由地决定何时何地调用库中的功能，通常更适用于需要高度定制化和灵活性的项目。
- 框架：框架控制了应用程序的流程，开发者需要按照框架的规则编写代码，因此会牺牲一部分的灵活性，你只需要按照框架约束的规则来走，即可获得一站式的解决方案，通常更适用于需要快速开发且愿意遵循框架规则的项目。

### 7.5. 小结

回答最开始的思考题，可以猜想一下，说 react 是一个库，说 vue 是一个框架，官方可能是想要表达：

#### react

我只帮你做了一些必要的工作，帮你解决最核心的一些痛点问题，其余还有很多工作需要交给你自己去解决。

不过我的侵入性很低，可以和很多其它库结合使用，虽然很多问题我没有去处理，但我的生态很强大，有很多库能够与我结合使用，帮你快速解决这些问题。

#### vue

除了一些痛点问题之外，我还在想办法尽可能帮你解决更多的问题，让你写起来更便捷。比如，我们会事先明确好一些语法规则，你需要按照我们指定的规则来走，这意味着我的侵入性会更高一些，虽然这可能牺牲了一部分的灵活性，但在某些程度上确实能够让你写更少的代码就能解决很多常见问题。

## 8. 引用

- [react 官网][1]
- [vue 官网][3]
- [react github 仓库][2]
  - [deepwiki][4]
  - [zread.ai][5]
- [维基百科 - 函数库 - library][7]
- [维基百科 - 软件框架 - software framework][8]
- [维基百科 - 控制反转][6]

[1]: https://react.dev/
[2]: https://github.com/facebook/react
[3]: https://cn.vuejs.org/
[4]: https://deepwiki.com/facebook/react
[5]: https://zread.ai/facebook/react
[6]: https://zh.wikipedia.org/zh-hans/%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC
[7]: https://zh.wikipedia.org/wiki/%E5%87%BD%E5%BC%8F%E5%BA%AB
[8]: https://zh.wikipedia.org/wiki/%E8%BB%9F%E9%AB%94%E6%A1%86%E6%9E%B6
