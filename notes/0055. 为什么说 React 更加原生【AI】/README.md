# [0055. 为什么说 React 更加原生【AI】](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0055.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%20React%20%E6%9B%B4%E5%8A%A0%E5%8E%9F%E7%94%9F%E3%80%90AI%E3%80%91)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤖 为什么说 React 更加原生？](#3--为什么说-react-更加原生)
  - [3.1. 原生实现（更准确的表述）](#31-原生实现更准确的表述)
  - [3.2. 不依赖宿主环境（含边界说明）](#32-不依赖宿主环境含边界说明)
  - [3.3. 对比 Vue 的演进](#33-对比-vue-的演进)
  - [3.4. 如何验证 Vue 的“解耦”](#34-如何验证-vue-的解耦)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 记录了 AI 的回复

## 2. 🫧 评价

- 可以作为一个扩展内容来看，以助于加深对前端框架 react、vue 的理解。

## 3. 🤖 为什么说 React 更加原生？

提示：对比 Vue 以说明“平台无关”设计思路。

| 框架 | 核心是否直接操作宿主 API（当前形态） | 关键解耦节点 | 抽离 / 模块化形式 | 说明要点 |
| --- | --- | --- | --- | --- |
| React | 否（核心不触 DOM） | v0.14 拆出 `react-dom`；Fiber 于 16 稳定调度 | `react` + 各 renderer（`react-dom` / `react-native` / 自定义） | 设计初衷平台无关；renderer 注入宿主实现 |
| Vue 1.x | 是 | 尚无 | 单体 | DOM 逻辑混杂，难移植 |
| Vue 2 | 大部分否（源码分层后 core 减少直依赖） | 2.0 分层 | `core` + `platforms/*` | 自定义 renderer 未完全产品化 |
| Vue 3 | 否 | 3.0 包级拆分 + Renderer API | 包级：`@vue/runtime-core` + `runtime-dom` + `reactivity` | 正式提供 `createRenderer`，与 React 思路接近 |

所谓“更原生”本质是：核心抽象（组件/调度/状态）可迁移，宿主差异通过渲染器策略注入；React 更早把这一理念工程化并形成多宿主生态，Vue 在 3 才与之对齐并强化扩展性。

### 3.1. 原生实现（更准确的表述）

- React 的核心（组件模型 + 协调/调度算法）使用原生 JavaScript 实现，尽量保持“最小依赖面”。
- 核心理念：算法与平台解耦，平台差异（DOM / 原生 / 自定义宿主）由“渲染器（Renderer）”注入。
- 注意：早期版本（≤0.13）仍把 DOM 渲染逻辑与核心放在同一个包里，真正“物理拆分”发生在 v0.14（2015）引入 `react-dom`。因此“不依赖宿主”指“设计目标”，而不是“一开始就代码层完全分离”。

### 3.2. 不依赖宿主环境（含边界说明）

- 现在的 `react` 包不直接访问 `window` / `document`，这些由对应渲染器（如 `react-dom`、`react-native`）处理。
- 多端示例：
  - Web → `react-dom`
  - iOS / Android → `react-native`
  - Canvas / 控制台 / 自定义运行时 → 可自写 renderer（社区里 Ink、React Three Fiber 等）。
- 底层调度仍需宿主提供异步原语（`setTimeout` / `MessageChannel` / `requestAnimationFrame` 等），由 `scheduler` 包封装统一策略，因此“完全不依赖环境”并不严谨，准确说法是：核心逻辑不直接耦合具体 UI 宿主 API。
- Fiber（自 16 起）让调度、渲染分阶段化，进一步强化可移植性。

### 3.3. 对比 Vue 的演进

Vue 早期（1.x）

- 直接在核心内操作 DOM（`document`、事件绑定等），缺乏清晰的“核心 vs 平台”分层。
- 无法轻易移植到非浏览器宿主。

---

Vue 2 的架构重构（2016）

- 引入虚拟 DOM，并在源码中分层：

```text
src/
├─ core/              // 响应式、VNode、patch 调度框架（仍带部分假设）
├─ platforms/
│  ├─ web/            // DOM / 事件 / 属性处理
│  └─ weex/           // Weex 相关
```

- `core` 层减少直连浏览器 API，但“自定义 renderer”尚未成为稳定公开能力（更多是内部结构抽象）。

---

Vue 3 的彻底模块化（2020 之后）

- 拆分为多个 npm 包：
  - `@vue/reactivity`
  - `@vue/runtime-core`
  - `@vue/runtime-dom`
  - `@vue/compiler-core` / `@vue/compiler-dom`
- 通过 `createRenderer` 提供正式自定义渲染器接口，真正实现“核心 + 宿主”模式，思路与 React Renderer 体系趋同。

### 3.4. 如何验证 Vue 的“解耦”

验证 Vue 1.x vs 2.0

- 使用明确版本号：

```bash
pnpm add vue@1.0.28
pnpm add vue@2.0.0
```

- 对比：
  - 在 1.x 发布包 `dist/vue.js` 中搜索 `document` / `window` → 可见大量直接 DOM 引用。
  - 查看 2.0 对应 tag 的源码目录（需去 GitHub 仓库）→ `src/core` 基本不再直接使用 DOM，全放在 `src/platforms/web`。
- 注意：npm 包可能不含完整 `src/`，必要时克隆官方仓库并切换 tag。

---

验证 Vue 3 模块化

- 安装：

```bash
pnpm add vue@3
```

- 观察安装的依赖：`@vue/reactivity`、`@vue/runtime-core`、`@vue/runtime-dom` 等。
- 在 `@vue/runtime-core` 内搜索 `document` / `window`（通常无匹配），说明运行时核心未绑定具体 DOM。
- 若想进一步实验，可尝试使用 `createRenderer` 自写一个最小的“字符串渲染器”。
