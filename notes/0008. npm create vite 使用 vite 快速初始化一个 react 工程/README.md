# [0008. npm create vite 使用 vite 快速初始化一个 react 工程](https://github.com/Tdahuyou/TNotes.react/tree/main/notes/0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B)

<!-- region:toc -->

- [1. 📝 概述](#1--概述)
- [2. 📒 使用 pnpm 的实际操作流程](#2--使用-pnpm-的实际操作流程)
- [3. 💻 demos.1 - 使用 vite 创建 react 工程并启动](#3--demos1---使用-vite-创建-react-工程并启动)
- [4. 🔗 References](#4--references)

<!-- endregion:toc -->

## 1. 📝 概述

- 知道如何通过 vite 来快速初始化一个 react 工程。

## 2. 📒 使用 pnpm 的实际操作流程

1. pnpm create vite
2. 输入项目名称，比如 demo
3. 选择模板，比如 React
4. cd demo
5. pnpm i
6. pnpm run dev

---

- 其中，1+2+3 也可以用一个命令来完成，就是 `pnpm create vite@latest my-react-app --template react`。

```bash
$ pnpm create vite@latest my-react-app --template react
# 使用 pnpm 包管理器执行 create 命令
# vite@latest - 指定使用最新版本的 Vite 脚手架工具
# my-react-app - 自定义项目名称（可替换为其他名称）
# --template react - 指定项目模板为 React 框架
```

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

---

- 对于这条命令 `pnpm create vite@latest my-react-app --template react` 需要能够理解各部分的含义。
- 如果记不住的话，直接运行命令 `pnpm create vite` 然后根据命令行提示来配置即可。

## 3. 💻 demos.1 - 使用 vite 创建 react 工程并启动

```bash
$ pnpm create vite my-react-app --template react
# 也可以使用其他的包管理器来初始化项目
$ npm create vite@latest my-react-app --template react
$ yarn create vite my-react-app --template react
$ bun create vite my-react-app --template react
```

- 实际上拉取的是 https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react 这个位置的模板。
  - ![图 0](https://cdn.jsdelivr.net/gh/Tdahuyou/imgs@main/2025-06-23-21-55-27.png)
- 启动用 vite 创建的 react 工程：

```bash
# Done. Now run:
$ cd my-react-app
$ pnpm install
$ pnpm run dev
```

- 成功启动后，使用浏览器打开链接，将看到如下默认页面。
  - ![图 1](https://cdn.jsdelivr.net/gh/Tdahuyou/imgs@main/2025-06-23-21-56-18.png)

## 4. 🔗 References

- 你可以通过查阅 vite 官网，了解 npm create vite 相关详情。
  - https://vitejs.dev/guide/
    - vite 官方文档
  - https://github.com/vitejs/vite
    - vite github
