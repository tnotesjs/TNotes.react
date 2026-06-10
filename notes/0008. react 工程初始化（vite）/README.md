# [0008. react 工程初始化（vite）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0008.%20react%20%E5%B7%A5%E7%A8%8B%E5%88%9D%E5%A7%8B%E5%8C%96%EF%BC%88vite%EF%BC%89)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 使用 pnpm 的实际操作流程](#3-使用-pnpm-的实际操作流程)
- [4. 使用 vite 创建 react 工程并启动](#4-使用-vite-创建-react-工程并启动)
- [5. `pnpm create vite@latest` 的工作原理简介](#5-pnpm-create-vitelatest-的工作原理简介)
  - [5.1. 命令转换与临时下载](#51-命令转换与临时下载)
  - [5.2. 为什么不用 `git clone`？](#52-为什么不用-git-clone)
  - [5.3. 脚手架的本地执行与释放](#53-脚手架的本地执行与释放)
- [6. 引用](#6-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 使用 vite 快速初始化一个 react 工程
- 了解 `pnpm create vite@latest` 的工作原理

## 2. 评价

需要知道如何通过 vite 来快速初始化一个 react 工程。以便后续学习 react 相关知识点的时候，能在 `1min` 内快速搭建好一个最基本的 react 项目学习环境。

## 3. 使用 pnpm 的实际操作流程

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

## 4. 使用 vite 创建 react 工程并启动

```bash
pnpm create vite my-react-app --template react
# 也可以使用其他的包管理器来初始化项目
# npm create vite@latest my-react-app --template react
# yarn create vite my-react-app --template react
# bun create vite my-react-app --template react
```

实际上拉取的是 [vite/packages/create-vite/template-react][3] 这个位置的模板。

想要学习的话，可以瞅瞅这个模板结构下的源码，主要就是安装好必要的依赖，完成简单的初始配置。

![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-55-27.png)

启动用 vite 创建的 react 工程：

```bash
# Done. Now run:
cd my-react-app
pnpm install
pnpm run dev
```

成功启动后，使用浏览器打开链接，将看到如下默认页面：

![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-56-18.png)

## 5. `pnpm create vite@latest` 的工作原理简介

::: tip

- 错误：通过 `git clone` 去仓库中拉取模板。
- 正确：`create-vite` 这个 npm 包里面本身就内置了所有框架的模板文件，执行命令只是把包里的模板文件复制到你的项目目录下而已。

:::

执行该命令时，核心工作原理并不是通过 `git clone` 去远程克隆 GitHub 仓库，而是通过 npm 注册表下载并执行一个特定的 Node.js 脚本工具，在本地释放预分发的模板文件。

其底层核心流程可以拆解为以下几个步骤：

### 5.1. 命令转换与临时下载

当你运行 `pnpm create vite` 时，`pnpm` 会在底层将其翻译为：

```bash
pnpm dlx create-vite@latest
# 注：在 npm 中等价于 npx create-vite@latest
```

`dlx`（或 `npx`）的作用是去 npm 官方镜像源上，把名为 `create-vite` 的 npm 包临时下载到本地的缓存目录中，并直接运行该包内指定的脚手架可执行脚本。

### 5.2. 为什么不用 `git clone`？

Vite 团队不采用系统 Git 命令去远程拉取，主要基于以下考量：

- 免环境依赖：用户电脑无需安装或配置 `git` 客户端及环境变量。
- 网络性能优化：`vitejs/vite` 是一个庞大的 Monorepo 仓库，包含大量无关的历史记录和核心源码。如果使用 Git 克隆，在国内网络环境下极易超时或失败。

### 5.3. 脚手架的本地执行与释放

`create-vite` 脚本在本地启动后，实际执行的是本地文件复制与字符串替换：

- 模板预打包：在 GitHub 上看到的 `packages/create-vite/template-react` 等模板文件夹，在 Vite 团队发布 `create-vite` 这个 npm 包时，就已经完整打包在其中了。下载了该包，意味着所有模板都已经存在于你的本地缓存中。
- 收集交互信息：脚本通过命令行交互（如 `prompts` 库）询问用户项目名称、选择的框架（React/Vue 等）以及是否启用 TypeScript。
- 本地释放文件：确定选项后，脚本利用 Node.js 的文件系统模块（`fs`），直接将缓存中对应模板（如 `template-react`）里的文件复制到用户指定的项目目录下。
- 动态微调：
  - 将模板里的 `_gitignore` 动态重命名为 `.gitignore`（因为 npm 发布时默认会忽略 `.gitignore`，源码中故意用下划线开头做规避）。
  - 动态修改生成出的 `package.json` 中的 `"name"` 字段为用户自定义的项目名。

整个过程完全不依赖 Git 软件，只要能正常连接 npm 镜像源，即可在几秒钟内瞬间完成项目骨架的搭建。

## 6. 引用

- [vite 官方文档][1]
- [vite github][2]
- [vite/packages/create-vite/template-react][3]

[1]: https://vitejs.dev/guide/
[2]: https://github.com/vitejs/vite
[3]: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react
