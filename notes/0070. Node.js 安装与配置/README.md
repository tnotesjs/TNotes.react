# [0070. Node.js 安装与配置](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0070.%20Node.js%20%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 学习 React 为何要安装 Node.js 呢？](#3--学习-react-为何要安装-nodejs-呢)
- [4. 🤔 如何安装 Node.js？](#4--如何安装-nodejs)
- [5. 🤔 如何验证 Node.js 是否已经安装成功？](#5--如何验证-nodejs-是否已经安装成功)
- [6. 🤔 安装好 Node.js 之后，有什么需要配置的吗？](#6--安装好-nodejs-之后有什么需要配置的吗)
- [7. 🔗 引用](#7--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- Node.js 的安装与配置

## 2. 🫧 评价

- 和 Node.js 相关的更多内容，可以参考 [TNotes.nodejs][1] 知识库。
- 这篇笔记主要介绍在学习 React 时所必须的 Node.js 的环境。

## 3. 🤔 学习 React 为何要安装 Node.js 呢？

简单来说，Node.js 是 React 开发的基础环境，提供了完整的开发、调试、构建工具链支持。

Node.js 在 React 开发中，主要起到的作用是：

- 运行开发工具：React 开发需要 Vite、Webpack 等工具来启动本地服务器，这些工具依赖 Node.js 运行
- 转换 JSX 代码：React 使用的 JSX 语法浏览器不能直接识别，需要通过 Node.js 环境的工具（如 Babel）转换成标准 JavaScript
- 管理项目依赖：通过 npm（Node.js 的包管理器）来安装 React、React Router 等第三方库
- 代码检查和测试：使用 ESLint 检查代码错误、Jest 进行测试等工具都需要 Node.js 环境
- 构建生产版本：开发完成后，需要用 Node.js 工具将代码打包优化，才能部署到线上服务器
- 提升开发效率：Node.js 提供热更新功能，修改代码后浏览器自动刷新，无需手动刷新页面
- ……

作为 React 初学者，现在只需要按照教程安装好 Node.js，不需要深入了解它的具体原理，先专注于学习 React 本身即可。

## 4. 🤔 如何安装 Node.js？

- [NodeJS 下载][2]
- ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-17-15-18-08.png)
- 直接进入官网安装即可。
- 版本直接选择 LTS 版。
- 安全过程全程下一步即可。

## 5. 🤔 如何验证 Node.js 是否已经安装成功？

- 安装完 Node.js 之后，打开终端，输入命令 `node -v` 查看 Node.js 版本。
- 如果成功输出了 Node.js 的版本号，则说明 Node.js 安装成功。

## 6. 🤔 安装好 Node.js 之后，有什么需要配置的吗？

对于 React 初学者，Node.js 的"配置"主要是指安装过程中自动完成的环境设置。用户只需按照安装向导操作，无需进行复杂的手动配置，即可满足 React 开发的基本需求。

---

主要配置内容

- 环境变量配置：Node.js 安装时会自动配置 PATH 环境变量，使 `node` 和 `npm` 命令可以在终端任何位置使用
- npm 配置：npm 作为 Node.js 的包管理器，有一些基本配置项如镜像源、缓存目录等
- 版本管理配置：对于高级用户，可能需要配置 nvm（Node Version Manager）来管理多个 Node.js 版本

对初学者来说

- 几乎无需手动配置：标准安装过程中，安装程序会自动完成所有必要的环境配置
- 开箱即用：安装完成后，直接在终端输入 `node -v` 和 `npm -v` 即可验证安装和配置是否成功
- 后续按需配置：只有在遇到特定需求（如切换版本、修改 npm 镜像源）时才需要额外配置

## 7. 🔗 引用

- [TNotes.nodejs][1]
- [NodeJS 下载][2]

[1]: https://tnotesjs.github.io/TNotes.nodejs/
[2]: https://nodejs.org/zh-cn/download
