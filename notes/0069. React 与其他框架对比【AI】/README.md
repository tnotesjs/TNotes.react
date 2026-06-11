# [0069. React 与其他框架对比【AI】](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0069.%20React%20%E4%B8%8E%E5%85%B6%E4%BB%96%E6%A1%86%E6%9E%B6%E5%AF%B9%E6%AF%94%E3%80%90AI%E3%80%91)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. React vs Vue](#3-react-vs-vue)
- [4. 为什么说 React 比 Vue 更加“原生”？](#4-为什么说-react-比-vue-更加原生)
  - [4.1. 核心对比：React 与 Vue 的解耦演进](#41-核心对比react-与-vue-的解耦演进)
  - [4.2. 真正的纯逻辑核心](#42-真正的纯逻辑核心)
  - [4.3. 宿主无关性（及其边界）](#43-宿主无关性及其边界)
  - [4.4. Vue 的跨端演进之路](#44-vue-的跨端演进之路)
  - [4.5. 如何验证这种解耦？](#45-如何验证这种解耦)
- [5. React vs Angular](#5-react-vs-angular)
- [6. React vs Svelte](#6-react-vs-svelte)
- [7. 如何选择合适的框架？](#7-如何选择合适的框架)
- [8. 总结](#8-总结)
- [9. 引用](#9-引用)

<!-- endregion:toc -->

## 1. 本节内容

- React 与 Vue 对比
- React 与 Angular 对比
- React 与 Svelte 对比
- 框架选型建议

## 2. 评价

这篇笔记主要是记录 AI 返回的一些内容，如果有其它框架如果想要和 React 对比，也可以自行询问 AI。

个人主要在使用的是 Vue、React 这两个框架，其它的基本都没咋用。并且从国内的就业环境来看，React 和 Vue 的岗位更多，Angular 和 Svelte 的岗位比较少见。

## 3. React vs Vue

核心差异对比：

| 对比维度        | React                          | Vue                      |
| --------------- | ------------------------------ | ------------------------ |
| 定位            | UI 库                          | 渐进式框架               |
| 模板语法        | JSX（JS 中写 HTML）            | 模板语法（类 HTML）      |
| 数据绑定        | 单向数据流                     | 双向数据绑定（v-model）  |
| 状态管理        | 需要第三方库（Redux、Zustand） | 官方支持（Vuex、Pinia）  |
| 学习曲线        | 较陡峭（需要掌握 JSX、Hooks）  | 较平缓（模板语法更直观） |
| 灵活性          | 非常高（自由度大）             | 中等（有约定）           |
| 生态系统        | 非常庞大                       | 庞大但相对统一           |
| 性能优化        | 手动优化（memo、useMemo）      | 自动优化（响应式系统）   |
| TypeScript 支持 | 优秀                           | 优秀（Vue 3 用 TS 重写） |
| 社区规模        | 非常大                         | 大                       |

代码风格对比：

::: code-group

```jsx [React]
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

```vue [Vue 3]
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
```

:::

React 的优势：

- JSX 更加灵活，可以使用完整的 JavaScript 能力
- 生态系统更庞大，第三方库更丰富
- 更适合复杂的业务逻辑处理
- React Native 支持移动端开发

Vue 的优势：

- 模板语法更直观，学习曲线更平缓
- 官方提供完整的解决方案（路由、状态管理）
- 双向绑定在表单处理时更方便
- 性能优化更自动化

## 4. 为什么说 React 比 Vue 更加“原生”？

这里的“原生”并不是指运行在 Native 环境，而是指 React 的核心逻辑是用原生 JavaScript 纯粹实现的，与具体的宿主环境（如浏览器 DOM）高度解耦。

我们可以通过对比 Vue 的架构演进，来更好地理解这种“平台无关”的设计思路。

### 4.1. 核心对比：React 与 Vue 的解耦演进

| 框架 | 核心是否直接操作宿主 API | 关键解耦节点 | 核心架构拆分 | 核心要点说明 |
| --- | --- | --- | --- | --- |
| React | 否（核心不碰 DOM） | v0.14（拆分出 `react-dom`） | `react` 核心 + 各宿主渲染器（Renderer） | 平台无关是设计初衷；宿主行为由渲染器注入。 |
| Vue 1.x | 是 | 无 | 单体包 | 框架内混杂大量 DOM 操作逻辑，极难跨端移植。 |
| Vue 2 | 大部分否（内部源码分层） | 2.0（引入虚拟 DOM） | `core` (框架核心) + `platforms/*` (具体宿主) | 减少了对宿主 API 的直接依赖，但自定义渲染器未正式公开。 |
| Vue 3 | 否 | 3.0（完全的包级拆分） | `@vue/runtime-core` + `@vue/runtime-dom` 等 | 官方提供 `createRenderer` API，架构理念与 React 高度对齐。 |

所谓“更原生”，本质上是指其核心抽象（组件模型、调度算法、状态管理）可以完全迁移，而平台差异则通过不同的渲染器（Renderer）来抹平。React 在这方面起步更早并形成了繁荣的多端生态，而 Vue 在 3.0 版本后也全面补齐并强化了这一特性。

### 4.2. 真正的纯逻辑核心

- 最小依赖面：React 的核心本质上只是组件模型和协调（Reconciliation）算法，全由纯原生 JavaScript 实现，不涉及任何具体的 UI 渲染 API。
- 物理拆分：React 早期（v0.13 及之前）也将 DOM 逻辑写在核心中，但从 v0.14（2015年）开始，React 实现了物理和逻辑的双重拆分，将 DOM 渲染彻底剥离到了独立的 `react-dom` 包中。

### 4.3. 宿主无关性（及其边界）

- 多端运行：如今的 `react` 包内没有对 `window` 或 `document` 的直接访问。你在浏览器里用 `react-dom`，在移动端用 `react-native`，甚至可以编写自定义 Renderer 渲染到 Canvas（如 React Three Fiber）或终端命令行（如 Ink）。
- 边界说明：说“完全不依赖环境”其实不够严谨。为了驱动其内部的异步调度（Fiber 架构），React 的 `scheduler` 包依然需要宿主环境提供基本的异步原语（如 `setTimeout`、`MessageChannel` 或 `requestAnimationFrame`），但这种依赖停留在底层 JS 运行时层面，而不是 UI 层面。

### 4.4. Vue 的跨端演进之路

Vue 在拥抱“平台无关性”的演进上，经历了三个阶段：

1. Vue 1.x（强绑定）：内部直接操作 `document` 和绑定原生事件，属于纯粹的 Web 框架，缺乏宿主层抽象。
2. Vue 2.0（源码解耦）：引入虚拟 DOM 并在源码上将 `core/` 和 `platforms/web/` 分离。核心逻辑减少了对浏览器的直接依赖，但这一能力更多用在内部重构和跨端方案（如 Weex）上，没有完全释放给普通开发者。
3. Vue 3.0（架构彻底解耦）：实现了彻底的包级别的模块化拆分（`runtime-core` 与 `runtime-dom` 分离）。通过暴露出强悍的 `createRenderer` 接口，Vue 真正实现了和 React 类似的多宿主渲染体系。

### 4.5. 如何验证这种解耦？

如果你想亲眼验证 Vue 架构的变化，可以通过 NPM 和源码观察：

- 验证 Vue 1.x vs 2.x：分别下载 Vue v1.0.28 和 v2.0.0 的源码或分析其 NPM 包。在 1.x 的核心文件中，你能轻易搜到对 `document` 的直接引用；而在 2.x 源码的 `src/core` 目录中，DOM API 基本绝迹，全被移至 `src/platforms` 中。
- 验证 Vue 3.x：直接查看本地的 `node_modules`，会发现 Vue 变成了 `@vue/reactivity`、`@vue/runtime-core`、`@vue/runtime-dom` 等多个子包。如果你在 `@vue/runtime-core` 的源码里搜索 `document`，会发现零匹配——这是因为它完全不感知具体环境，彻底剥离了宿主 API。

## 5. React vs Angular

核心差异对比：

| 对比维度 | React                   | Angular            |
| -------- | ----------------------- | ------------------ |
| 定位     | UI 库                   | 完整框架           |
| 语言     | JavaScript / TypeScript | TypeScript（必须） |
| 架构模式 | 组件化                  | MVC / MVVM         |
| 数据绑定 | 单向                    | 双向               |
| 学习曲线 | 中等                    | 陡峭               |
| 灵活性   | 高                      | 低（强约定）       |
| 包大小   | 小（~42KB）             | 大（~500KB+）      |
| 依赖注入 | 无内置支持              | 内置支持           |
| CLI 工具 | 第三方（Vite、CRA）     | 官方 Angular CLI   |
| 适用场景 | 中小型到大型项目        | 大型企业级应用     |

代码风格对比：

::: code-group

```jsx [React]
import { useState } from 'react'

function UserProfile() {
  const [user, setUser] = useState({ name: 'John' })

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => setUser({ name: 'Jane' })}>Change Name</button>
    </div>
  )
}
```

```typescript [Angular]
import { Component } from '@angular/core'

@Component({
  selector: 'app-user-profile',
  template: `
    <div>
      <h1>{{ user.name }}</h1>
      <button (click)="changeName()">Change Name</button>
    </div>
  `,
})
export class UserProfileComponent {
  user = { name: 'John' }

  changeName() {
    this.user.name = 'Jane'
  }
}
```

:::

React 的优势：

- 更轻量，学习曲线相对平缓
- 更灵活，不强制特定的架构模式
- 生态系统更丰富
- 适合快速迭代的项目

Angular 的优势：

- 提供完整的解决方案，开箱即用
- 强类型支持，适合大型项目
- 依赖注入系统利于测试
- 官方工具链完善

## 6. React vs Svelte

核心差异对比：

| 对比维度 | React                | Svelte           |
| -------- | -------------------- | ---------------- |
| 运行时   | 需要虚拟 DOM         | 无运行时（编译） |
| 包大小   | 较大（~42KB）        | 极小（~2KB）     |
| 性能     | 优秀                 | 更优秀           |
| 响应式   | 手动触发（setState） | 自动响应式       |
| 学习曲线 | 中等                 | 较平缓           |
| 生态系统 | 非常庞大             | 较小但在增长     |
| 工作原理 | 运行时框架           | 编译时框架       |
| 代码量   | 较多                 | 更少             |

代码风格对比：

::: code-group

```jsx [React]
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const doubled = count * 2

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

```svelte [Svelte]
<script>
  let count = 0
  $: doubled = count * 2
</script>

<div>
  <p>Count: {count}</p>
  <p>Doubled: {doubled}</p>
  <button on:click={() => count++}>
    Increment
  </button>
</div>
```

:::

React 的优势：

- 成熟的生态系统
- 大量的学习资源和社区支持
- 企业级应用的验证
- 丰富的第三方库

Svelte 的优势：

- 更小的包体积
- 更好的性能（无虚拟 DOM）
- 更简洁的代码
- 更直观的响应式语法

## 7. 如何选择合适的框架？

选型考虑因素：

| 因素 | 说明 | 建议 |
| --- | --- | --- |
| 项目规模 | 小型、中型、大型 | 大型企业项目考虑 Angular，其他选 React 或 Vue |
| 团队技能 | 团队成员的技术背景 | 新手团队推荐 Vue，有经验团队选 React |
| 性能要求 | 是否对性能有极致要求 | 追求极致性能可选 Svelte |
| 生态需求 | 是否需要丰富的第三方库 | 需要丰富生态选 React |
| 开发效率 | 项目迭代速度要求 | 快速开发选 Vue，灵活性选 React |
| 长期维护 | 项目生命周期长短 | 长期项目选择成熟稳定的 React 或 Vue |

不同场景的推荐：

- 创业公司、快速原型
  - 推荐：Vue 或 Svelte
  - 理由：开发效率高，学习成本低
- 中大型 Web 应用
  - 推荐：React
  - 理由：生态丰富，灵活性高，人才储备充足
- 大型企业级应用
  - 推荐：Angular 或 React
  - 理由：完整的解决方案，适合大团队协作
- 性能敏感应用
  - 推荐：Svelte 或 React
  - 理由：包体积小，运行时性能好
- 移动端开发
  - 推荐：React
  - 理由：React Native 支持

总结：

- React：灵活、生态丰富，适合中大型项目
- Vue：易学易用，渐进式，适合快速开发
- Angular：完整方案，适合大型企业应用
- Svelte：轻量高效，适合性能要求高的项目

最重要的是：选择团队熟悉且能长期维护的框架，而不是盲目追求新技术。

## 8. 总结

本笔记对比了主流前端框架的特点，帮助开发者更好地理解 React 的定位和优势。

- 没有绝对最好的框架，只有最适合项目需求的框架
- React 的核心优势在于灵活性和强大的生态系统
- Vue 更易上手，Angular 更适合大型企业级应用，Svelte 追求极致性能
- 选择框架时，应综合考虑团队技术栈、项目规模、性能要求等因素

## 9. 引用

- [React 官网][1]
- [Vue 官网][2]
- [Angular 官网][3]
- [Svelte 官网][4]
- [2024 JavaScript 框架现状调查][5]

[1]: https://react.dev/
[2]: https://cn.vuejs.org/
[3]: https://angular.dev/
[4]: https://svelte.dev/
[5]: https://2023.stateofjs.com/zh-Hans/libraries/front-end-frameworks/
