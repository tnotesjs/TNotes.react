# [0055. 为什么说 React 更加原生【AI】](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0055.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%20React%20%E6%9B%B4%E5%8A%A0%E5%8E%9F%E7%94%9F%E3%80%90AI%E3%80%91)

<!-- region:toc -->

- [1. 🫧 评价](#1--评价)
- [2. 🤖 为什么说 React 更加原生？（可以对比 vue 来说明）](#2--为什么说-react-更加原生可以对比-vue-来说明)
  - [2.1. 🧩 原生实现](#21--原生实现)
  - [2.2. 🧱 不依赖宿主环境](#22--不依赖宿主环境)
  - [2.3. ⚖️ 对比 Vue](#23-️-对比-vue)
    - [2.3.1. 🧩 Vue 早期的设计](#231--vue-早期的设计)
    - [2.3.2. 🧭 Vue 2 的架构重构](#232--vue-2-的架构重构)
    - [2.3.3. 🧱 Vue 3 的彻底模块化](#233--vue-3-的彻底模块化)
  - [2.4. 🧪 如何验证宿主依赖的变化](#24--如何验证宿主依赖的变化)
    - [2.4.1. 验证 Vue 1.x / 2.0 的差异](#241-验证-vue-1x--20-的差异)
    - [2.4.2. 验证 Vue 3 的模块化](#242-验证-vue-3-的模块化)
  - [2.5. ✅ 总结](#25--总结)

<!-- endregion:toc -->

## 1. 🫧 评价

- 可以作为一个扩展内容来看，以助于加深对前端框架 react、vue 的理解。

## 2. 🤖 为什么说 React 更加原生？（可以对比 vue 来说明）

### 2.1. 🧩 原生实现

- React 的核心几乎完全由 原生 JavaScript 编写，不依赖第三方库。
- 它自身不内置任何浏览器特性调用（例如 `window`、`document` 等），而是通过抽象层来与宿主环境交互。

### 2.2. 🧱 不依赖宿主环境

- React 的核心库（`react` 包）只依赖语言层面的特性，不依赖具体运行环境。
- 它通过“渲染器”（Renderer）机制将核心逻辑与宿主绑定，例如：
  - 浏览器环境 → `react-dom`
  - 移动端 → `react-native`
  - 桌面端（如 Electron）→ 仍可复用 React 核心。
- 这种设计让 React 可以在多平台无缝复用其核心机制（如组件模型、虚拟 DOM、调度器等）。

### 2.3. ⚖️ 对比 Vue

#### 2.3.1. 🧩 Vue 早期的设计

- 在 Vue 1.x 时期，框架核心直接依赖浏览器宿主 API（如 `document`、`window`），内部包含 DOM 操作逻辑。
- 因此，Vue 1.x 无法脱离浏览器环境运行。

#### 2.3.2. 🧭 Vue 2 的架构重构

- 从 Vue 2.0（2016）开始，Vue 重写了内部架构，引入虚拟 DOM，并在源码中正式分离核心逻辑与平台逻辑。
- 源码结构变为：

  ```
  src/
  ├─ core/              // 响应式系统、渲染器、调度器等核心逻辑
  ├─ platforms/
  │  ├─ web/            // 浏览器特定实现（DOM patch、事件系统）
  │  └─ weex/           // 移动端 Weex 特定实现
  ```

- 从此版本开始，Vue 的核心实现（`src/core`）不再直接访问浏览器 API，而是通过 `platforms/web` 的桥接层与宿主交互。
- 这意味着 Vue 从 2.0 起在架构上已经实现了对宿主环境的解耦。

#### 2.3.3. 🧱 Vue 3 的彻底模块化

- 到 Vue 3（2020），Vue 进一步将核心逻辑打包为独立模块：

  - `@vue/reactivity`（响应式系统）
  - `@vue/runtime-core`（平台无关的运行时）
  - `@vue/runtime-dom`（DOM 渲染层）
  - `@vue/compiler-core` / `@vue/compiler-dom`（编译器）

- 这种包级别的拆分让 Vue 的“核心 + 渲染器”模式完全与 React 类似，也使 Vue 能真正意义上做到：

  > “核心无平台依赖，渲染器决定宿主环境”。

### 2.4. 🧪 如何验证宿主依赖的变化

#### 2.4.1. 验证 Vue 1.x / 2.0 的差异

1. 安装旧版本 Vue：

   ```bash
   pnpm i vue@1.0
   pnpm i vue@2.0
   ```

2. 查看源码或构建文件：

   - 在 `vue@1.x` 的 `dist/vue.js` 中搜索 `document` 或 `window`，可见大量直接 DOM 操作。
   - 在 `vue@2.0` 的源码结构中（`src/core`），已无浏览器 API 调用，平台代码被移至 `src/platforms/web/`。

#### 2.4.2. 验证 Vue 3 的模块化

1. 安装 Vue 3：

   ```bash
   pnpm i vue@3
   ```

2. 查看包结构：

   - 你会看到多个 npm 包：`@vue/reactivity`、`@vue/runtime-core`、`@vue/runtime-dom`。
   - 在 `@vue/runtime-core` 源码中同样找不到 `document` / `window` 的引用，说明核心确实独立。

### 2.5. ✅ 总结

| 框架 | 核心是否依赖宿主环境 | 何时实现抽离 | 抽离方式 | 对应模块示例 |
| --- | --- | --- | --- | --- |
| React | ❌ 从诞生起即独立 | 自 React 0.3 起（2013） | 核心 + 渲染器（`react` / `react-dom`） | `react`、`react-dom` |
| Vue | ✅ Vue 1.x 依赖浏览器 API | 从 Vue 2.0 起实现架构抽离（2016） | 源码层面 `core` / `platforms` 分离 | `src/core`、`src/platforms/web` |
| Vue 3 | ❌ 完全独立 | Vue 3（2020） | npm 包级别模块化 | `@vue/runtime-core`、`@vue/runtime-dom` |
