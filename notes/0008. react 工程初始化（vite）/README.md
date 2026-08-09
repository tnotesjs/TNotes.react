# [0008. react 工程初始化（vite）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0008.%20react%20%E5%B7%A5%E7%A8%8B%E5%88%9D%E5%A7%8B%E5%8C%96%EF%BC%88vite%EF%BC%89)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 示例：使用 pnpm 初始化一个 React 实验环境](#2-示例使用-pnpm-初始化一个-react-实验环境)
  - [2.1. 初始化流程](#21-初始化流程)
  - [2.2. 最终产物](#22-最终产物)
  - [2.3. vite 内置模板 `template-react`](#23-vite-内置模板-template-react)
- [3. `pnpm create vite@latest` 的工作原理简介](#3-pnpm-create-vitelatest-的工作原理简介)
  - [3.1. 命令转换与临时下载](#31-命令转换与临时下载)
  - [3.2. 为什么不用 `git clone`？](#32-为什么不用-git-clone)
  - [3.3. 脚手架的本地执行与释放](#33-脚手架的本地执行与释放)
- [4. 引用](#4-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 使用 vite 快速初始化一个 react 工程
- 了解 `pnpm create vite@latest` 的工作原理

需要知道如何通过 vite 来快速初始化一个 react 工程。以便后续学习 react 相关知识点的时候，能在快速（比如 `1min` 内）搭建好一个最基础的本地 react 实验环境。

## 2. 示例：使用 pnpm 初始化一个 React 实验环境

这一小节的核心命令：

- `pnpm create vite`
- `pnpm create vite@latest my-react-app --template react`

### 2.1. 初始化流程

1. `pnpm create vite`
2. 输入项目名称，比如 `demo`
3. 选择模板，比如 `React`
4. `cd demo`
5. `pnpm i`
6. `pnpm run dev`

其中，1+2+3 也可以用一个命令来完成，就是 `pnpm create vite@latest my-react-app --template react`。

::: code-group

```bash [1+2+3]
pnpm create vite@latest my-react-app --template react
# 使用 pnpm 包管理器执行 create 命令
# vite@latest - 指定使用最新版本的 Vite 脚手架工具
# my-react-app - 自定义项目名称（可替换为其他名称）
# --template react - 指定项目模板为 React 框架
```

:::

- `pnpm create` pnpm 包管理器的项目创建命令，等效于 `npm create` 或 `yarn create`
- `vite@latest`
  - `vite`: Vite 前端构建工具
  - `@latest`: 显式指定使用最新版本
- `my-react-app` 自定义项目目录名称（可按需修改）
- `--template react` 关键参数，指定使用 React 框架模板，其他可选模板包括：
  - `vanilla` (原生 JS)
  - `vue`
  - `preact`
  - `lit`
  - `svelte`

对于这条命令 `pnpm create vite@latest my-react-app --template react` 需要能够理解各部分的含义。如果记不住的话，直接运行命令 `pnpm create vite` 然后根据命令行提示来配置即可。

你可以通过查阅 vite 官网，了解 `npm create vite` 相关详情。

### 2.2. 最终产物

这一小节的最终产物记录在了 `demos/1` 目录下：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs-2026@main/2026-08-09-11-10-55.png)

目录结构简介：

```bash
$ tree
# my-react-app                # 自定义的项目名称
# ├── eslint.config.js        # ESLint 配置，用于代码规范检查
# ├── index.html              # 入口 HTML，Vite 以此为页面入口挂载应用
# ├── package.json            # 项目元信息、脚本与依赖声明
# ├── pnpm-lock.yaml          # pnpm 锁文件，锁定依赖精确版本
# ├── public                  # 静态资源目录，构建时原样拷贝到输出目录
# │   └── vite.svg            # 示例静态图标（可通过 /vite.svg 直接访问）
# ├── README.md               # 项目说明文档
# ├── src                     # 业务源码目录
# │   ├── App.css             # App 组件样式
# │   ├── App.jsx             # 根组件
# │   ├── assets              # 会被打包处理的资源（如图片、字体）
# │   │   └── react.svg       # 示例 React logo
# │   ├── index.css           # 全局样式
# │   └── main.jsx            # JS 入口，负责把 App 挂载到 DOM
# └── vite.config.js          # Vite 构建与开发服务器配置
```

### 2.3. vite 内置模板 `template-react`

```bash
pnpm create vite my-react-app --template react
# 也可以使用其他的包管理器来初始化项目
# npm create vite@latest my-react-app --template react
# yarn create vite my-react-app --template react
# bun create vite my-react-app --template react
```

实际上拉取的是 [vite/packages/create-vite/template-react][3] 这个位置的模板。

想要学习的话，可以瞅瞅这个模板结构下的源码，主要就是安装好必要的依赖，完成简单的初始配置。

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-55-27.png)

启动用 vite 创建的 react 工程：

```bash
# Done. Now run:
cd my-react-app
pnpm install
pnpm run dev
```

成功启动后，使用浏览器打开链接，将看到如下默认页面：

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-56-18.png)

## 3. `pnpm create vite@latest` 的工作原理简介

::: tip 💡 错误理解 vs 正确理解

- 错误：实际上是通过 `git clone` 命令去仓库中拉取模板。
- 正确：`create-vite` 这个 `npm` 包里面本身就内置了所有框架的模板文件，执行命令只是把包里的模板文件复制到你的项目目录下而已。

:::

执行该命令时，核心工作原理并不是通过 `git clone` 去远程克隆 GitHub 仓库，而是通过 npm 注册表下载并执行一个特定的 Node.js 脚本工具，在本地释放预分发的模板文件。

其底层核心流程可以拆解为以下几个步骤：

### 3.1. 命令转换与临时下载

当你运行 `pnpm create vite` 时，`pnpm` 会在底层将其翻译为：

```bash
pnpm dlx create-vite@latest
# 注：在 npm 中等价于 npx create-vite@latest
```

`dlx`（或 `npx`）的作用是去 npm 官方镜像源上，把名为 `create-vite` 的 npm 包临时下载到本地的缓存目录中，并直接运行该包内指定的脚手架可执行脚本。

### 3.2. 为什么不用 `git clone`？

不采用系统 Git 命令去远程拉取，主要基于以下考量：

- 免环境依赖：用户电脑无需安装或配置 `git` 客户端及环境变量，如果走 `git clone` 的方式，那么当用户本地没有安装 `git` 环境时，就无法通过 `pnpm create vite` 创建项目了。
- 拉取成本高：vite 官方内置的模板是位于 `vitejs/vite` 仓库内统一维护的，vite 核心源码仓库是一个庞大的 Monorepo 仓库，包含大量无关的历史记录和核心源码。
- 后处理成本高：拉完之后还需要做一系列的后处理，比如删除不必要的文件，根据用户输入的命令参数挑选出需要的模板，npm 包里几乎只剩模板和脚本，不用先面对整个 Monorepo，走 `git clone` 的成本远比走内置模板的方案高不少。

### 3.3. 脚手架的本地执行与释放

`create-vite` 脚本在本地启动后，实际执行的是本地文件复制与字符串替换：

- 模板预打包：在 GitHub 上看到的 `packages/create-vite/template-react` 等模板文件夹，在 Vite 团队发布 `create-vite` 这个 npm 包时，就已经完整打包在其中了。下载了该包，意味着所有模板都已经存在于你的本地缓存中。
- 收集交互信息：脚本通过命令行交互（如 `prompts` 库）询问用户项目名称、选择的框架（React/Vue 等）以及是否启用 TypeScript。
- 本地释放文件：确定选项后，脚本利用 Node.js 的文件系统模块（`fs`），直接将缓存中对应模板（如 `template-react`）里的文件复制到用户指定的项目目录下。
- 动态微调：
  - 将模板里的 `_gitignore` 动态重命名为 `.gitignore`（因为 npm 发布时默认会忽略 `.gitignore`，源码中故意用下划线开头做规避）。
  - 动态修改生成出的 `package.json` 中的 `"name"` 字段为用户自定义的项目名。

整个过程完全不依赖 Git 软件，只要能正常连接 npm 镜像源，即可在几秒钟内瞬间完成项目骨架的搭建。

## 4. 引用

- [vite 官方文档][1]
- [vite github][2]
- [vite/packages/create-vite/template-react][3]

[1]: https://vitejs.dev/guide/
[2]: https://github.com/vitejs/vite
[3]: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react
