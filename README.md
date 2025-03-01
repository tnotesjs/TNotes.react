# react

<!-- region:toc -->
- [react](#react)
  - [1. 认识 react](#1-认识-react)
  - [2. 官方资料](#2-官方资料)
  - [3. 准备工作](#3-准备工作)
  - [4. 第一个 react 应用](#4-第一个-react-应用)
  - [5. 需要注意的一些和版本相关的问题](#5-需要注意的一些和版本相关的问题)
  - [6. JSX](#6-jsx)
  - [7. dangerouslySetInnerHTML](#7-dangerouslysetinnerhtml)
  - [8. 组件基础知识](#8-组件基础知识)
  - [9. 组件调用](#9-组件调用)
  - [10. 组件属性](#10-组件属性)
  - [11. 组件状态](#11-组件状态)
  - [12. 组件生命周期](#12-组件生命周期)
  - [13. ref](#13-ref)
  - [14. hooks](#14-hooks)
  - [15. hoc](#15-hoc)
  - [16. 内置组件](#16-内置组件)
  - [17. redux](#17-redux)
  - [18. 第三方库](#18-第三方库)
  - [19. 工程化](#19-工程化)
  - [20. UI 组件库](#20-ui-组件库)
  - [21. empty](#21-empty)
<!-- endregion:toc -->

## 1. 认识 react

- [ ] [0032. react 是什么](https://github.com/Tdahuyou/TNotes.react/tree/main/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md) <!-- [locale](./0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md) -->  
  

  - 
  - [1. 🔗 参考链接](https://github.com/Tdahuyou/TNotes.react/tree/main/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#1--参考链接)
  - [2. 📒 react 概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#2--react-概述)
  - [3. 📒 react 的特点](https://github.com/Tdahuyou/TNotes.react/tree/main/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#3--react-的特点)
    - [3.1. 轻量](https://github.com/Tdahuyou/TNotes.react/tree/main/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#31-轻量)
    - [3.2. 原生](https://github.com/Tdahuyou/TNotes.react/tree/main/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#32-原生)
    - [3.3. 灵活](https://github.com/Tdahuyou/TNotes.react/tree/main/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#33-灵活)
    - [3.4. 单向数据流](https://github.com/Tdahuyou/TNotes.react/tree/main/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#34-单向数据流)
  - [4. 📒 库 vs. 框架](https://github.com/Tdahuyou/TNotes.react/tree/main/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#4--库-vs-框架)
  - 了解 react 是什么
  - 了解 react 都有哪些特点
  - 了解 vue、react 之间的一些差异
  - 理解为什么强调 react 是一个库，而非框架
  

## 2. 官方资料

- [ ] [0040. 了解 react 官方文档的基本结构](https://github.com/Tdahuyou/TNotes.react/tree/main/0040.%20%E4%BA%86%E8%A7%A3%20react%20%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84/README.md) <!-- [locale](./0040.%20%E4%BA%86%E8%A7%A3%20react%20%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84/README.md) -->  
  

  - 
  - [1. 📒 react 官方文档结构简介](https://github.com/Tdahuyou/TNotes.react/tree/main/0040.%20%E4%BA%86%E8%A7%A3%20react%20%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84/README.md#1--react-官方文档结构简介)
  - https://react.dev/
    - react 官网链接
  - 本节对 react 官网的结构做了一个简单的介绍。
  - 熟悉 react 官方文档的大体结构是非常有必要的，在学习 react 的过程中，会经常查阅官方文档。
  

- [ ] [0039. react github 仓库链接](https://github.com/Tdahuyou/TNotes.react/tree/main/0039.%20react%20github%20%E4%BB%93%E5%BA%93%E9%93%BE%E6%8E%A5/README.md) <!-- [locale](./0039.%20react%20github%20%E4%BB%93%E5%BA%93%E9%93%BE%E6%8E%A5/README.md) -->  
  - https://github.com/facebook/react
  

## 3. 准备工作


- [ ] [0034. 开发 react 项目之前推荐安装的 vscode 插件 - eslint](https://github.com/Tdahuyou/TNotes.react/tree/main/0034.%20%E5%BC%80%E5%8F%91%20react%20%E9%A1%B9%E7%9B%AE%E4%B9%8B%E5%89%8D%E6%8E%A8%E8%8D%90%E5%AE%89%E8%A3%85%E7%9A%84%20vscode%20%E6%8F%92%E4%BB%B6%20-%20eslint/README.md) <!-- [locale](./0034.%20%E5%BC%80%E5%8F%91%20react%20%E9%A1%B9%E7%9B%AE%E4%B9%8B%E5%89%8D%E6%8E%A8%E8%8D%90%E5%AE%89%E8%A3%85%E7%9A%84%20vscode%20%E6%8F%92%E4%BB%B6%20-%20eslint/README.md) -->  
  

  - 
  - [1. 📒 eslint 概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0034.%20%E5%BC%80%E5%8F%91%20react%20%E9%A1%B9%E7%9B%AE%E4%B9%8B%E5%89%8D%E6%8E%A8%E8%8D%90%E5%AE%89%E8%A3%85%E7%9A%84%20vscode%20%E6%8F%92%E4%BB%B6%20-%20eslint/README.md#1--eslint-概述)
  - [2. 📒 安装 ESLint 插件](https://github.com/Tdahuyou/TNotes.react/tree/main/0034.%20%E5%BC%80%E5%8F%91%20react%20%E9%A1%B9%E7%9B%AE%E4%B9%8B%E5%89%8D%E6%8E%A8%E8%8D%90%E5%AE%89%E8%A3%85%E7%9A%84%20vscode%20%E6%8F%92%E4%BB%B6%20-%20eslint/README.md#2--安装-eslint-插件)
  - [3. 📒 配置 ESLint 基本流程](https://github.com/Tdahuyou/TNotes.react/tree/main/0034.%20%E5%BC%80%E5%8F%91%20react%20%E9%A1%B9%E7%9B%AE%E4%B9%8B%E5%89%8D%E6%8E%A8%E8%8D%90%E5%AE%89%E8%A3%85%E7%9A%84%20vscode%20%E6%8F%92%E4%BB%B6%20-%20eslint/README.md#3--配置-eslint-基本流程)
  - [4. 💻 demos.1 - 约束只能使用单引号，不能使用双引号](https://github.com/Tdahuyou/TNotes.react/tree/main/0034.%20%E5%BC%80%E5%8F%91%20react%20%E9%A1%B9%E7%9B%AE%E4%B9%8B%E5%89%8D%E6%8E%A8%E8%8D%90%E5%AE%89%E8%A3%85%E7%9A%84%20vscode%20%E6%8F%92%E4%BB%B6%20-%20eslint/README.md#4--demos1---约束只能使用单引号不能使用双引号)
  - [5. 📒 注意事项](https://github.com/Tdahuyou/TNotes.react/tree/main/0034.%20%E5%BC%80%E5%8F%91%20react%20%E9%A1%B9%E7%9B%AE%E4%B9%8B%E5%89%8D%E6%8E%A8%E8%8D%90%E5%AE%89%E8%A3%85%E7%9A%84%20vscode%20%E6%8F%92%E4%BB%B6%20-%20eslint/README.md#5--注意事项)
  - vscode 中的 eslint 插件有什么用
  - 如何引入并使用 eslint
  

- [ ] [0035. 在 vscode 中，让 Emmet 语法支持 JSX](https://github.com/Tdahuyou/TNotes.react/tree/main/0035.%20%E5%9C%A8%20vscode%20%E4%B8%AD%EF%BC%8C%E8%AE%A9%20Emmet%20%E8%AF%AD%E6%B3%95%E6%94%AF%E6%8C%81%20JSX/README.md) <!-- [locale](./0035.%20%E5%9C%A8%20vscode%20%E4%B8%AD%EF%BC%8C%E8%AE%A9%20Emmet%20%E8%AF%AD%E6%B3%95%E6%94%AF%E6%8C%81%20JSX/README.md) -->  
  

  - 
  - [1. 🔗 参考资料](https://github.com/Tdahuyou/TNotes.react/tree/main/0035.%20%E5%9C%A8%20vscode%20%E4%B8%AD%EF%BC%8C%E8%AE%A9%20Emmet%20%E8%AF%AD%E6%B3%95%E6%94%AF%E6%8C%81%20JSX/README.md#1--参考资料)
  - [2. 📒 具体配置流程](https://github.com/Tdahuyou/TNotes.react/tree/main/0035.%20%E5%9C%A8%20vscode%20%E4%B8%AD%EF%BC%8C%E8%AE%A9%20Emmet%20%E8%AF%AD%E6%B3%95%E6%94%AF%E6%8C%81%20JSX/README.md#2--具体配置流程)
    - [2.1. 做法 1：通过设置面板来配置](https://github.com/Tdahuyou/TNotes.react/tree/main/0035.%20%E5%9C%A8%20vscode%20%E4%B8%AD%EF%BC%8C%E8%AE%A9%20Emmet%20%E8%AF%AD%E6%B3%95%E6%94%AF%E6%8C%81%20JSX/README.md#21-做法-1通过设置面板来配置)
    - [2.2. 做法 2：通过配置文件 `.vscode/settings.json` 来配置](https://github.com/Tdahuyou/TNotes.react/tree/main/0035.%20%E5%9C%A8%20vscode%20%E4%B8%AD%EF%BC%8C%E8%AE%A9%20Emmet%20%E8%AF%AD%E6%B3%95%E6%94%AF%E6%8C%81%20JSX/README.md#22-做法-2通过配置文件-vscodesettingsjson-来配置)
  - [3. 💻 demos.1 - 在 vscode 中，让 Emmet 语法支持 JSX](https://github.com/Tdahuyou/TNotes.react/tree/main/0035.%20%E5%9C%A8%20vscode%20%E4%B8%AD%EF%BC%8C%E8%AE%A9%20Emmet%20%E8%AF%AD%E6%B3%95%E6%94%AF%E6%8C%81%20JSX/README.md#3--demos1---在-vscode-中让-emmet-语法支持-jsx)
  - 介绍如何配置 VSCode，让 Emmet 语法支持 JSX。
  - JSX 是在 React 中用于描述页面结构的 JS 扩展语法。
  

- [ ] [0008. npm create vite 使用 vite 快速初始化一个 react 工程](https://github.com/Tdahuyou/TNotes.react/tree/main/0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md) <!-- [locale](./0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md) -->  
  

  - 
  - [1. 🔍 查阅 vite 官网，了解 npm create vite 相关详情](https://github.com/Tdahuyou/TNotes.react/tree/main/0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md#1--查阅-vite-官网了解-npm-create-vite-相关详情)
  - [2. 📒 使用 pnpm 的实际操作流程](https://github.com/Tdahuyou/TNotes.react/tree/main/0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md#2--使用-pnpm-的实际操作流程)
  - [3. 💻 demos.1 - 使用 vite 创建 react 工程并启动](https://github.com/Tdahuyou/TNotes.react/tree/main/0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md#3--demos1---使用-vite-创建-react-工程并启动)
  - `npm create vite@latest my-react-app -- --template react` 这是 vite 官方提供的命令，用于创建一个 react 项目。
    - 如果不清楚这条命令的含义，可以参考一下本节中记录的 AI 对此的解释。
  - 上面这条命令太长了，不好记，其实只需要记住：`npm create vite` 即可，其他项目参数（比如项目名称、模板等）根据命令提示自行配置。
  

## 4. 第一个 react 应用


- [ ] [0042. 第一个 react v16 程序 - 通过 CDN 引入 react、react-dom 在页面上渲染出 Hello World](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md) <!-- [locale](./0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md) -->  
  

  - 
  - [1. 🔗 相关链接](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#1--相关链接)
  - [2. 📒 通过 CDN 的方式引入相关依赖](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#2--通过-cdn-的方式引入相关依赖)
  - [3. 📒 API 简介 - `React.createElement`](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#3--api-简介---reactcreateelement)
  - [4. 📒 API 简介 - `React.render`](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#4--api-简介---reactrender)
  - [5. 💻 demos.1 - 在页面上渲染出 Hello World](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#5--demos1---在页面上渲染出-hello-world)
  - [6. 💻 demos.2 - 初步认识 React.createElement 和 JSX](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#6--demos2---初步认识-reactcreateelement-和-jsx)
  - [7. 🤔 `React.createElement` 跟 `document.createElement` 是一样的吗？](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#7--reactcreateelement-跟-documentcreateelement-是一样的吗)
  - [8. 🤔 `react` 核心库和 `react-dom` 库之间的关系是？](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#8--react-核心库和-react-dom-库之间的关系是)
  - [9. 🤔 为什么一旦使用了 `JSX` 语法，就必须要引入 `react` 核心库？](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#9--为什么一旦使用了-jsx-语法就必须要引入-react-核心库)
  - [10. 🤔 通过脚手架（比如 vite、umi、create-react-app）来搭建工程 vs. 通过（.html）页面的方式来直接引入 react 相关的库](https://github.com/Tdahuyou/TNotes.react/tree/main/0042.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v16%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#10--通过脚手架比如-viteumicreate-react-app来搭建工程-vs-通过html页面的方式来直接引入-react-相关的库)
  - 知识点
    - React.createElement 的基本使用
    - React Element 是不可变的
    - ReactDOM.render 的基本使用
    - JSX 其实就是 React.createElement 的简写，是一个语法糖。
  - 本节不使用任何脚手架工具，通过 CDN 引入 react、react-dom，直接在（.html）页面上使用 react，实现一个 demo - 在页面上渲染出 Hello World。并借此 demo 来熟悉 React.createElement 和 ReactDOM.render 的基本用法。
  

- [ ] [0001. 第一个 react v19 程序 - 通过 CDN 引入 react、react-dom 在页面上渲染出 Hello World](https://github.com/Tdahuyou/TNotes.react/tree/main/0001.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v19%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md) <!-- [locale](./0001.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v19%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md) -->  
  

  - 
  - [1. 💻 demos.1 - Hello World](https://github.com/Tdahuyou/TNotes.react/tree/main/0001.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20v19%20%E7%A8%8B%E5%BA%8F%20-%20%E9%80%9A%E8%BF%87%20CDN%20%E5%BC%95%E5%85%A5%20react%E3%80%81react-dom%20%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%8A%E6%B8%B2%E6%9F%93%E5%87%BA%20Hello%20World/README.md#1--demos1---hello-world)
  - 通过 esm 的方式引入 react、react-dom，并使用 ReactDOM.createRoot() 方法将 react 元素渲染到页面上。
  

## 5. 需要注意的一些和版本相关的问题

- [ ] [0043. ReactDOM.render](https://github.com/Tdahuyou/TNotes.react/tree/main/0043.%20ReactDOM.render/README.md) <!-- [locale](./0043.%20ReactDOM.render/README.md) -->  
  

  - 
  - [1. ⚠️ 兼容性问题 - 从 v18 开始，不再支持 ReactDOM.render 这个 API](https://github.com/Tdahuyou/TNotes.react/tree/main/0043.%20ReactDOM.render/README.md#1-️-兼容性问题---从-v18-开始不再支持-reactdomrender-这个-api)
  - [2. 📒 ReactDOM.render 的基本语法](https://github.com/Tdahuyou/TNotes.react/tree/main/0043.%20ReactDOM.render/README.md#2--reactdomrender-的基本语法)
  - [3. 📒 ReactDOM.render 的作用 - 渲染 react 组件到 DOM 中](https://github.com/Tdahuyou/TNotes.react/tree/main/0043.%20ReactDOM.render/README.md#3--reactdomrender-的作用---渲染-react-组件到-dom-中)
  - [4. 💻 demos.1 - ReactDOM.render 的基本使用示例](https://github.com/Tdahuyou/TNotes.react/tree/main/0043.%20ReactDOM.render/README.md#4--demos1---reactdomrender-的基本使用示例)
  - [5. 📒 ReactDOM.render 的替代品：ReactDOM.createRoot](https://github.com/Tdahuyou/TNotes.react/tree/main/0043.%20ReactDOM.render/README.md#5--reactdomrender-的替代品reactdomcreateroot)
  - [6. 💻 demos.2 - ReactDOM.createRoot 的基本使用示例](https://github.com/Tdahuyou/TNotes.react/tree/main/0043.%20ReactDOM.render/README.md#6--demos2---reactdomcreateroot-的基本使用示例)
  - [7. 🤔 为什么弃用 ReactDOM.render？](https://github.com/Tdahuyou/TNotes.react/tree/main/0043.%20ReactDOM.render/README.md#7--为什么弃用-reactdomrender)
  - **`ReactDOM.render` 是 React 17 及之前版本的核心 API**，用于将 React 元素渲染到 DOM 中。
  - **在 React 18 中，它被废弃，推荐使用 `ReactDOM.createRoot`**，以支持更现代化的并发渲染特性。
  - 如果你正在使用 React 18 或更高版本，请迁移到新的 API，以利用 React 的性能优化和新特性。
  

- [ ] [0041. 在 react v19 中，移除了 UMD，推荐使用 ESM](https://github.com/Tdahuyou/TNotes.react/tree/main/0041.%20%E5%9C%A8%20react%20v19%20%E4%B8%AD%EF%BC%8C%E7%A7%BB%E9%99%A4%E4%BA%86%20UMD%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20ESM/README.md) <!-- [locale](./0041.%20%E5%9C%A8%20react%20v19%20%E4%B8%AD%EF%BC%8C%E7%A7%BB%E9%99%A4%E4%BA%86%20UMD%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20ESM/README.md) -->  
  

  - 
  - [1. 🔗 links](https://github.com/Tdahuyou/TNotes.react/tree/main/0041.%20%E5%9C%A8%20react%20v19%20%E4%B8%AD%EF%BC%8C%E7%A7%BB%E9%99%A4%E4%BA%86%20UMD%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20ESM/README.md#1--links)
  - [2. 🤔 什么是 UMD？](https://github.com/Tdahuyou/TNotes.react/tree/main/0041.%20%E5%9C%A8%20react%20v19%20%E4%B8%AD%EF%BC%8C%E7%A7%BB%E9%99%A4%E4%BA%86%20UMD%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20ESM/README.md#2--什么是-umd)
  - [3. 🤔 为什么移除 UMD？](https://github.com/Tdahuyou/TNotes.react/tree/main/0041.%20%E5%9C%A8%20react%20v19%20%E4%B8%AD%EF%BC%8C%E7%A7%BB%E9%99%A4%E4%BA%86%20UMD%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20ESM/README.md#3--为什么移除-umd)
  - [4. 📒 React 19 中的相关的变化及影响](https://github.com/Tdahuyou/TNotes.react/tree/main/0041.%20%E5%9C%A8%20react%20v19%20%E4%B8%AD%EF%BC%8C%E7%A7%BB%E9%99%A4%E4%BA%86%20UMD%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20ESM/README.md#4--react-19-中的相关的变化及影响)
  - [5. 📒 替代方案：使用 ESM](https://github.com/Tdahuyou/TNotes.react/tree/main/0041.%20%E5%9C%A8%20react%20v19%20%E4%B8%AD%EF%BC%8C%E7%A7%BB%E9%99%A4%E4%BA%86%20UMD%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20ESM/README.md#5--替代方案使用-esm)
  - React 19 不再支持 UMD 构建，推动开发者使用更现代的 ESM 模块加载方式。
  - 这种变化有助于减少复杂性，提高性能，并与现代 JavaScript 开发实践保持一致。如果您的项目仍在使用 UMD，需要尽快切换到 ESM。
  

## 6. JSX

- [ ] [0013. JSX 概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0013.%20JSX%20%E6%A6%82%E8%BF%B0/README.md) <!-- [locale](./0013.%20JSX%20%E6%A6%82%E8%BF%B0/README.md) -->  
  

  - 
  - [1. 📒 JSX 概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0013.%20JSX%20%E6%A6%82%E8%BF%B0/README.md#1--jsx-概述)
  - [2. 💻 demos.1 - 一个简单的 React 组件示例](https://github.com/Tdahuyou/TNotes.react/tree/main/0013.%20JSX%20%E6%A6%82%E8%BF%B0/README.md#2--demos1---一个简单的-react-组件示例)
  - 这篇笔记简单介绍了 JSX 的一些基础知识点，有关 JSX 的更多细节，会在其他笔记中介绍。
  

- [ ] [0048. HTML Tag vs. React Element vs. JSX Element](https://github.com/Tdahuyou/TNotes.react/tree/main/0048.%20HTML%20Tag%20vs.%20React%20Element%20vs.%20JSX%20Element/README.md) <!-- [locale](./0048.%20HTML%20Tag%20vs.%20React%20Element%20vs.%20JSX%20Element/README.md) -->  
  

  - 
  - [1. 📒 三者的关系与区别](https://github.com/Tdahuyou/TNotes.react/tree/main/0048.%20HTML%20Tag%20vs.%20React%20Element%20vs.%20JSX%20Element/README.md#1--三者的关系与区别)
  - [2. 📒 React 中的 HTML Tag](https://github.com/Tdahuyou/TNotes.react/tree/main/0048.%20HTML%20Tag%20vs.%20React%20Element%20vs.%20JSX%20Element/README.md#2--react-中的-html-tag)
  - [3. 📒 JSX Element](https://github.com/Tdahuyou/TNotes.react/tree/main/0048.%20HTML%20Tag%20vs.%20React%20Element%20vs.%20JSX%20Element/README.md#3--jsx-element)
  - [4. 📒 React Element](https://github.com/Tdahuyou/TNotes.react/tree/main/0048.%20HTML%20Tag%20vs.%20React%20Element%20vs.%20JSX%20Element/README.md#4--react-element)
  - [5. 🤔 为什么要写这篇笔记？](https://github.com/Tdahuyou/TNotes.react/tree/main/0048.%20HTML%20Tag%20vs.%20React%20Element%20vs.%20JSX%20Element/README.md#5--为什么要写这篇笔记)
  

- [ ] [0044. react element 是只读的](https://github.com/Tdahuyou/TNotes.react/tree/main/0044.%20react%20element%20%E6%98%AF%E5%8F%AA%E8%AF%BB%E7%9A%84/README.md) <!-- [locale](./0044.%20react%20element%20%E6%98%AF%E5%8F%AA%E8%AF%BB%E7%9A%84/README.md) -->  
  

  - 
  - [1. 💻 demos.1 - react element 是只读的](https://github.com/Tdahuyou/TNotes.react/tree/main/0044.%20react%20element%20%E6%98%AF%E5%8F%AA%E8%AF%BB%E7%9A%84/README.md#1--demos1---react-element-是只读的)
  - 永远不要尝试去修改 React Element 的属性，正确的做法是通过渲染新的 React Element 或使用 React 的状态管理机制（state 或 props）来更新 UI。
  

- [ ] [0045. jsx 必须单根](https://github.com/Tdahuyou/TNotes.react/tree/main/0045.%20jsx%20%E5%BF%85%E9%A1%BB%E5%8D%95%E6%A0%B9/README.md) <!-- [locale](./0045.%20jsx%20%E5%BF%85%E9%A1%BB%E5%8D%95%E6%A0%B9/README.md) -->  
  

  - 
  - [1. 💻 demos.1 - jsx 必须单根](https://github.com/Tdahuyou/TNotes.react/tree/main/0045.%20jsx%20%E5%BF%85%E9%A1%BB%E5%8D%95%E6%A0%B9/README.md#1--demos1---jsx-必须单根)
  

- [ ] [0003. html to jsx 在线转换](https://github.com/Tdahuyou/TNotes.react/tree/main/0003.%20html%20to%20jsx%20%E5%9C%A8%E7%BA%BF%E8%BD%AC%E6%8D%A2/README.md) <!-- [locale](./0003.%20html%20to%20jsx%20%E5%9C%A8%E7%BA%BF%E8%BD%AC%E6%8D%A2/README.md) -->  
  

  - 
  - [1. 📒 需求场景描述](https://github.com/Tdahuyou/TNotes.react/tree/main/0003.%20html%20to%20jsx%20%E5%9C%A8%E7%BA%BF%E8%BD%AC%E6%8D%A2/README.md#1--需求场景描述)
  - [2. 🔗 transform - html 转 jsx 在线转换器](https://github.com/Tdahuyou/TNotes.react/tree/main/0003.%20html%20to%20jsx%20%E5%9C%A8%E7%BA%BF%E8%BD%AC%E6%8D%A2/README.md#2--transform---html-转-jsx-在线转换器)
  - [3. 💻 一个简单的 html to jsx 转换示例](https://github.com/Tdahuyou/TNotes.react/tree/main/0003.%20html%20to%20jsx%20%E5%9C%A8%E7%BA%BF%E8%BD%AC%E6%8D%A2/README.md#3--一个简单的-html-to-jsx-转换示例)
  

- [ ] [0015. 在 JSX 中使用注释](https://github.com/Tdahuyou/TNotes.react/tree/main/0015.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%B3%A8%E9%87%8A/README.md) <!-- [locale](./0015.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%B3%A8%E9%87%8A/README.md) -->  
  

  - 
  - [1. 🔗 jsx eslint 注释格式检测](https://github.com/Tdahuyou/TNotes.react/tree/main/0015.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%B3%A8%E9%87%8A/README.md#1--jsx-eslint-注释格式检测)
  - [2. 📒 JSX 中注释的写法](https://github.com/Tdahuyou/TNotes.react/tree/main/0015.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%B3%A8%E9%87%8A/README.md#2--jsx-中注释的写法)
  - [3. 💻 demos.1 - `//` - 错误的注释格式](https://github.com/Tdahuyou/TNotes.react/tree/main/0015.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%B3%A8%E9%87%8A/README.md#3--demos1------错误的注释格式)
  - [4. 💻 demos.2 - 可以使用 jsx-eslint 检查错误的注释格式 `//`](https://github.com/Tdahuyou/TNotes.react/tree/main/0015.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%B3%A8%E9%87%8A/README.md#4--demos2---可以使用-jsx-eslint-检查错误的注释格式-)
  - 在 JSX 中，注释应该被包含在特殊的注释标签中，即 `{/* 这里边是注释内容 */}`。
  

- [ ] [0009. 在 JSX 中使用 JS 表达式](https://github.com/Tdahuyou/TNotes.react/tree/main/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md) <!-- [locale](./0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md) -->  
  

  - 
  - [1. 🔗 官方文档 - 在 JSX 中通过大括号使用 JavaScript](https://github.com/Tdahuyou/TNotes.react/tree/main/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md#1--官方文档---在-jsx-中通过大括号使用-javascript)
  - [2. 📒 在 JSX 中使用 JS 表达式](https://github.com/Tdahuyou/TNotes.react/tree/main/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md#2--在-jsx-中使用-js-表达式)
  - [3. 📒 不会显示的一些特殊值](https://github.com/Tdahuyou/TNotes.react/tree/main/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md#3--不会显示的一些特殊值)
  - [4. 📒 在 JSX 的大括号内使用 JavaScript 对象](https://github.com/Tdahuyou/TNotes.react/tree/main/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md#4--在-jsx-的大括号内使用-javascript-对象)
  - [5. 💻 demos.1 - 官方示例 - 渲染头像](https://github.com/Tdahuyou/TNotes.react/tree/main/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md#5--demos1---官方示例---渲染头像)
    - [5.1. 🔍 扩展 - Hedy Lamarr 是谁？](https://github.com/Tdahuyou/TNotes.react/tree/main/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md#51--扩展---hedy-lamarr-是谁)
  - [6. 💻 demos.2 - 在表达式中无法渲染的一些特殊值](https://github.com/Tdahuyou/TNotes.react/tree/main/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md#6--demos2---在表达式中无法渲染的一些特殊值)
  - [7. 💻 demos.3 - 无法渲染普通对象，可以渲染 react 元素对象](https://github.com/Tdahuyou/TNotes.react/tree/main/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md#7--demos3---无法渲染普通对象可以渲染-react-元素对象)
  

- [ ] [0017. 在 JSX 中书写内联样式 style](https://github.com/Tdahuyou/TNotes.react/tree/main/0017.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%B9%A6%E5%86%99%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F%20style/README.md) <!-- [locale](./0017.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%B9%A6%E5%86%99%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F%20style/README.md) -->  
  

  - 
  - [1. 📒 在 JSX 中书写内联样式 style](https://github.com/Tdahuyou/TNotes.react/tree/main/0017.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%B9%A6%E5%86%99%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F%20style/README.md#1--在-jsx-中书写内联样式-style)
  - [2. 💻 demos.1 - ❌ 错误写法 - 在 JSX 中的 style 写成字符串形式](https://github.com/Tdahuyou/TNotes.react/tree/main/0017.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%B9%A6%E5%86%99%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F%20style/README.md#2--demos1----错误写法---在-jsx-中的-style-写成字符串形式)
  - [3. 💻 demos.2 - ✅ 正确写法 - 采用对象的形式来写，属性名使用小驼峰的形式](https://github.com/Tdahuyou/TNotes.react/tree/main/0017.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%B9%A6%E5%86%99%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F%20style/README.md#3--demos2----正确写法---采用对象的形式来写属性名使用小驼峰的形式)
  - [4. 💻 demos.3 - 动态样式](https://github.com/Tdahuyou/TNotes.react/tree/main/0017.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%B9%A6%E5%86%99%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F%20style/README.md#4--demos3---动态样式)
  - 本文介绍了在 JSX 中书写内联样式 style 的一些注意事项。
  

- [ ] [0004. 在 JSX 中需要使用 className 给元素添加 class](https://github.com/Tdahuyou/TNotes.react/tree/main/0004.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%20className%20%E7%BB%99%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%20class/README.md) <!-- [locale](./0004.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%20className%20%E7%BB%99%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%20class/README.md) -->  
  

  - 
  - [1. 🔍 查看 react 官方对“添加样式”的说明](https://github.com/Tdahuyou/TNotes.react/tree/main/0004.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%20className%20%E7%BB%99%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%20class/README.md#1--查看-react-官方对添加样式的说明)
  - [2. 🤔 为什么不能直接使用 `class` 来添加样式，而是使用 `className` 呢？](https://github.com/Tdahuyou/TNotes.react/tree/main/0004.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%20className%20%E7%BB%99%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%20class/README.md#2--为什么不能直接使用-class-来添加样式而是使用-classname-呢)
  - [3. **🤔 如果在添加样式的时候，不小心写成了 `class`，样式还能正常添加吗？**](https://github.com/Tdahuyou/TNotes.react/tree/main/0004.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%20className%20%E7%BB%99%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%20class/README.md#3--如果在添加样式的时候不小心写成了-class样式还能正常添加吗)
  - [4. 💻 demos.1 - 添加样式](https://github.com/Tdahuyou/TNotes.react/tree/main/0004.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%20className%20%E7%BB%99%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%20class/README.md#4--demos1---添加样式)
  - [5. 💻 demos.2 - 在 JSX 中也可以使用 class 添加样式](https://github.com/Tdahuyou/TNotes.react/tree/main/0004.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%20className%20%E7%BB%99%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%20class/README.md#5--demos2---在-jsx-中也可以使用-class-添加样式)
  - 在 React 中，我们通过使用 JSX 语法来定义组件模板，在组件模板中，我们可以使用 className 来指定一个 CSS 的 class。
    - ✅ `<img className="avatar" />`
    - ❌ `<img class="avatar" />`
  

- [ ] [0046. JSX 元素的正确使用及常见错误示例](https://github.com/Tdahuyou/TNotes.react/tree/main/0046.%20JSX%20%E5%85%83%E7%B4%A0%E7%9A%84%E6%AD%A3%E7%A1%AE%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%E7%A4%BA%E4%BE%8B/README.md) <!-- [locale](./0046.%20JSX%20%E5%85%83%E7%B4%A0%E7%9A%84%E6%AD%A3%E7%A1%AE%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%E7%A4%BA%E4%BE%8B/README.md) -->  
  

  - 
  - [1. 💻 demos.1 - JSX 元素的正确使用及常见错误示例](https://github.com/Tdahuyou/TNotes.react/tree/main/0046.%20JSX%20%E5%85%83%E7%B4%A0%E7%9A%84%E6%AD%A3%E7%A1%AE%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%E7%A4%BA%E4%BE%8B/README.md#1--demos1---jsx-元素的正确使用及常见错误示例)
  

- [ ] [0010. 条件渲染](https://github.com/Tdahuyou/TNotes.react/tree/main/0010.%20%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93/README.md) <!-- [locale](./0010.%20%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93/README.md) -->  
  

  - 
  - [1. 🔍 查看 react 官方文档关于 Conditional rendering 条件渲染的说明](https://github.com/Tdahuyou/TNotes.react/tree/main/0010.%20%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93/README.md#1--查看-react-官方文档关于-conditional-rendering-条件渲染的说明)
  - [2. 💻 demos.1 - 条件渲染示例](https://github.com/Tdahuyou/TNotes.react/tree/main/0010.%20%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93/README.md#2--demos1---条件渲染示例)
  - [3. 📒 对比 vue 中的 v-if 和 v-show](https://github.com/Tdahuyou/TNotes.react/tree/main/0010.%20%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93/README.md#3--对比-vue-中的-v-if-和-v-show)
  - 类似于 vue 中的 v-show、v-if，不过在 react 中，条件渲染是通过纯 js 结合 jsx 语法来实现的，更加的灵活。
  - React 中没有类似 vue 中的 v-if、v-else、v-show 的条件渲染指令，React 中的条件渲染是通过在 JSX 使用原始的 JavaScript 条件逻辑来决定要渲染什么内容的，写起来更加原生，更加直观、更加灵活。
  

- [ ] [0011. 列表渲染](https://github.com/Tdahuyou/TNotes.react/tree/main/0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93/README.md) <!-- [locale](./0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93/README.md) -->  
  

  - 
  - [1. 📒 列表渲染概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93/README.md#1--列表渲染概述)
  - [2. 🔍 查看官方文档对列表渲染的描述](https://github.com/Tdahuyou/TNotes.react/tree/main/0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93/README.md#2--查看官方文档对列表渲染的描述)
  - [3. 💻 demos.1 - 列表渲染](https://github.com/Tdahuyou/TNotes.react/tree/main/0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93/README.md#3--demos1---列表渲染)
  - [4. 💻 demos.2 - 数组渲染](https://github.com/Tdahuyou/TNotes.react/tree/main/0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93/README.md#4--demos2---数组渲染)
  - [5. 🔍 查看官方文档对于列表渲染时为什么要给元素加 `key` 的说明](https://github.com/Tdahuyou/TNotes.react/tree/main/0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93/README.md#5--查看官方文档对于列表渲染时为什么要给元素加-key-的说明)
  - [6. 💼 面试题：你知道为什么列表渲染需要添加 `key` 吗？](https://github.com/Tdahuyou/TNotes.react/tree/main/0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93/README.md#6--面试题你知道为什么列表渲染需要添加-key-吗)
  

## 7. dangerouslySetInnerHTML

- [ ] [0016. dangerouslySetInnerHTML](https://github.com/Tdahuyou/TNotes.react/tree/main/0016.%20dangerouslySetInnerHTML/README.md) <!-- [locale](./0016.%20dangerouslySetInnerHTML/README.md) -->  
  

  - 
  - [1. 📒 dangerouslySetInnerHTML 简介](https://github.com/Tdahuyou/TNotes.react/tree/main/0016.%20dangerouslySetInnerHTML/README.md#1--dangerouslysetinnerhtml-简介)
  - [2. 💻 demos.1 - dangerouslySetInnerHTML 的基本使用](https://github.com/Tdahuyou/TNotes.react/tree/main/0016.%20dangerouslySetInnerHTML/README.md#2--demos1---dangerouslysetinnerhtml-的基本使用)
  - [3. 📒 DOMPurify 简介](https://github.com/Tdahuyou/TNotes.react/tree/main/0016.%20dangerouslySetInnerHTML/README.md#3--dompurify-简介)
  - [4. 💻 demos.2 - 使用 DOMPurify 净化 html 字符串](https://github.com/Tdahuyou/TNotes.react/tree/main/0016.%20dangerouslySetInnerHTML/README.md#4--demos2---使用-dompurify-净化-html-字符串)
  - 在 JSX 中，使用 dangerouslySetInnerHTML 可以在组件中直接插入 html 标签。
  - 可以使用 DOMPurify 库对插入的 html 字符串进行清理和转义，以防止 XSS 攻击。
  

## 8. 组件基础知识

- [ ] [0021. 组件的基本组成](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md) <!-- [locale](./0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md) -->  
  

  - 
  - [1. 📒 组件的 3 大基本组成结构](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#1--组件的-3-大基本组成结构)
  - [2. 📒 认识函数组件和类组件的基本写法](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#2--认识函数组件和类组件的基本写法)
  - [3. 📒 组件的属性 - Props](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#3--组件的属性---props)
  - [4. 📒 组件的状态 - State](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#4--组件的状态---state)
  - [5. 📒 组件的生命周期方法](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#5--组件的生命周期方法)
  - [6. 📒 组件的事件](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#6--组件的事件)
  - [7. 📒 组件模板语法 - 条件渲染、列表渲染](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#7--组件模板语法---条件渲染列表渲染)
  - [8. 📒 组件样式](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#8--组件样式)
  - [9. 📒 组件的 Context API](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#9--组件的-context-api)
  - [10. 📒 组件的 Hooks](https://github.com/Tdahuyou/TNotes.react/tree/main/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90/README.md#10--组件的-hooks)
  

- [ ] [0002. react 组件名的命名规则](https://github.com/Tdahuyou/TNotes.react/tree/main/0002.%20react%20%E7%BB%84%E4%BB%B6%E5%90%8D%E7%9A%84%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99/README.md) <!-- [locale](./0002.%20react%20%E7%BB%84%E4%BB%B6%E5%90%8D%E7%9A%84%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99/README.md) -->  
  

  - 
  - [1. 🔍 查看 react 官方对组件名的命名规则的描述](https://github.com/Tdahuyou/TNotes.react/tree/main/0002.%20react%20%E7%BB%84%E4%BB%B6%E5%90%8D%E7%9A%84%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99/README.md#1--查看-react-官方对组件名的命名规则的描述)
  - [2. 💻 demos.1 - react 组件名的命名规则](https://github.com/Tdahuyou/TNotes.react/tree/main/0002.%20react%20%E7%BB%84%E4%BB%B6%E5%90%8D%E7%9A%84%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99/README.md#2--demos1---react-组件名的命名规则)
  - **React component names must always start with a capital letter, while HTML tags must be lowercase.**
  

- [ ] [0022. 函数组件概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0022.%20%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md) <!-- [locale](./0022.%20%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md) -->  
  

  - 
  - [1. 📒 函数组件的基本形式](https://github.com/Tdahuyou/TNotes.react/tree/main/0022.%20%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md#1--函数组件的基本形式)
  - [2. 📒 可以使用 ES6 的箭头函数来定义函数组件](https://github.com/Tdahuyou/TNotes.react/tree/main/0022.%20%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md#2--可以使用-es6-的箭头函数来定义函数组件)
  - [3. 📒 可以为函数组件设置默认的 props 值](https://github.com/Tdahuyou/TNotes.react/tree/main/0022.%20%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md#3--可以为函数组件设置默认的-props-值)
  - [4. 📒 在函数组件中可以使用 Hooks](https://github.com/Tdahuyou/TNotes.react/tree/main/0022.%20%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md#4--在函数组件中可以使用-hooks)
  - 函数组件是 React 中定义组件的一种方式，它 **使用 JavaScript 函数来创建**。
  - 与类组件不同，**函数组件通常更简洁**，并且在某些情况下性能更好。
  - 自从 React 16.8 引入 Hooks 以来，函数组件的功能得到了极大的增强，现在 **它们可以拥有 state 和生命周期方法**，这使得函数组件成为了许多新项目的首选。
  - **函数组件提供了简洁的方式来定义 React 组件，结合 Hooks，它们现在几乎可以做类组件所能做的所有事情**。由于其简单性和性能优势，函数组件已经成为现代 React 开发中的主流选择。
  

- [ ] [0023. 类组件概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0023.%20%E7%B1%BB%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md) <!-- [locale](./0023.%20%E7%B1%BB%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md) -->  
  

  - 
  - [1. 📒 类组件是什么](https://github.com/Tdahuyou/TNotes.react/tree/main/0023.%20%E7%B1%BB%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md#1--类组件是什么)
  - [2. 📒 类组件的基本形式](https://github.com/Tdahuyou/TNotes.react/tree/main/0023.%20%E7%B1%BB%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md#2--类组件的基本形式)
  - [3. 📒 类组件的状态（State）](https://github.com/Tdahuyou/TNotes.react/tree/main/0023.%20%E7%B1%BB%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md#3--类组件的状态state)
  - [4. 📒 类组件的生命周期方法](https://github.com/Tdahuyou/TNotes.react/tree/main/0023.%20%E7%B1%BB%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md#4--类组件的生命周期方法)
  - [5. 📒 给类组件设置默认的 Props](https://github.com/Tdahuyou/TNotes.react/tree/main/0023.%20%E7%B1%BB%E7%BB%84%E4%BB%B6%E6%A6%82%E8%BF%B0/README.md#5--给类组件设置默认的-props)
  - 随着 React Hooks 的引入，许多原本只能在类组件中完成的任务现在也可以在函数组件中实现，这使得函数组件成为了新的标准。话虽如此，了解类组件仍然是蛮重要的，因为它们在很多现有的 React 旧项目中仍然广泛使用，咱们在看一些开源项目（比如目前 2025 年 1 月 21 日的 [scratch-gui](https://github.com/scratchfoundation/scratch-gui)）的时候，你依旧会看到不少的类组件的使用。
  

- [ ] [0024. 单向数据流是什么](https://github.com/Tdahuyou/TNotes.react/tree/main/0024.%20%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E6%98%AF%E4%BB%80%E4%B9%88/README.md) <!-- [locale](./0024.%20%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E6%98%AF%E4%BB%80%E4%B9%88/README.md) -->  
  

  - 
  - [1. 🤖 什么是单向数据流](https://github.com/Tdahuyou/TNotes.react/tree/main/0024.%20%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E6%98%AF%E4%BB%80%E4%B9%88/README.md#1--什么是单向数据流)
    - [1.1. 单向数据流的优点](https://github.com/Tdahuyou/TNotes.react/tree/main/0024.%20%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E6%98%AF%E4%BB%80%E4%B9%88/README.md#11-单向数据流的优点)
    - [1.2. React 中的单向数据流](https://github.com/Tdahuyou/TNotes.react/tree/main/0024.%20%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E6%98%AF%E4%BB%80%E4%B9%88/README.md#12-react-中的单向数据流)
  - ⏰ pending
  

## 9. 组件调用

- [ ] [0049. React 组件调用方式对比：JSX 渲染 vs 直接函数调用](https://github.com/Tdahuyou/TNotes.react/tree/main/0049.%20React%20%E7%BB%84%E4%BB%B6%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F%E5%AF%B9%E6%AF%94%EF%BC%9AJSX%20%E6%B8%B2%E6%9F%93%20vs%20%E7%9B%B4%E6%8E%A5%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8/README.md) <!-- [locale](./0049.%20React%20%E7%BB%84%E4%BB%B6%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F%E5%AF%B9%E6%AF%94%EF%BC%9AJSX%20%E6%B8%B2%E6%9F%93%20vs%20%E7%9B%B4%E6%8E%A5%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8/README.md) -->  
  

  - 
  - [1. 💻 demos.1 - JSX 渲染 vs 直接函数调用](https://github.com/Tdahuyou/TNotes.react/tree/main/0049.%20React%20%E7%BB%84%E4%BB%B6%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F%E5%AF%B9%E6%AF%94%EF%BC%9AJSX%20%E6%B8%B2%E6%9F%93%20vs%20%E7%9B%B4%E6%8E%A5%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8/README.md#1--demos1---jsx-渲染-vs-直接函数调用)
  

## 10. 组件属性

- [ ] [0019. 组件属性的传递和接收](https://github.com/Tdahuyou/TNotes.react/tree/main/0019.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%A0%E9%80%92%E5%92%8C%E6%8E%A5%E6%94%B6/README.md) <!-- [locale](./0019.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%A0%E9%80%92%E5%92%8C%E6%8E%A5%E6%94%B6/README.md) -->  
  

  - 
  - [1. 📒 props 传递概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0019.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%A0%E9%80%92%E5%92%8C%E6%8E%A5%E6%94%B6/README.md#1--props-传递概述)
  - [2. 💻 demos.1 - 组件属性的传递和接收](https://github.com/Tdahuyou/TNotes.react/tree/main/0019.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%A0%E9%80%92%E5%92%8C%E6%8E%A5%E6%94%B6/README.md#2--demos1---组件属性的传递和接收)
  - [3. 💻 demos.2 - 不同数据类型的属性传递](https://github.com/Tdahuyou/TNotes.react/tree/main/0019.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%A0%E9%80%92%E5%92%8C%E6%8E%A5%E6%94%B6/README.md#3--demos2---不同数据类型的属性传递)
  

- [ ] [0005. 通过 props 和 children 来传递元素内容](https://github.com/Tdahuyou/TNotes.react/tree/main/0005.%20%E9%80%9A%E8%BF%87%20props%20%E5%92%8C%20children%20%E6%9D%A5%E4%BC%A0%E9%80%92%E5%85%83%E7%B4%A0%E5%86%85%E5%AE%B9/README.md) <!-- [locale](./0005.%20%E9%80%9A%E8%BF%87%20props%20%E5%92%8C%20children%20%E6%9D%A5%E4%BC%A0%E9%80%92%E5%85%83%E7%B4%A0%E5%86%85%E5%AE%B9/README.md) -->  
  

  - 
  - [1. 📒 react 组件中的 props.children 相当于 vue 组件中的 slot 插槽](https://github.com/Tdahuyou/TNotes.react/tree/main/0005.%20%E9%80%9A%E8%BF%87%20props%20%E5%92%8C%20children%20%E6%9D%A5%E4%BC%A0%E9%80%92%E5%85%83%E7%B4%A0%E5%86%85%E5%AE%B9/README.md#1--react-组件中的-propschildren-相当于-vue-组件中的-slot-插槽)
  - [2. 📒 传递元素内容](https://github.com/Tdahuyou/TNotes.react/tree/main/0005.%20%E9%80%9A%E8%BF%87%20props%20%E5%92%8C%20children%20%E6%9D%A5%E4%BC%A0%E9%80%92%E5%85%83%E7%B4%A0%E5%86%85%E5%AE%B9/README.md#2--传递元素内容)
  - [3. 💻 demos.1 - 传递元素内容的简单示例](https://github.com/Tdahuyou/TNotes.react/tree/main/0005.%20%E9%80%9A%E8%BF%87%20props%20%E5%92%8C%20children%20%E6%9D%A5%E4%BC%A0%E9%80%92%E5%85%83%E7%B4%A0%E5%86%85%E5%AE%B9/README.md#3--demos1---传递元素内容的简单示例)
  - 在 React 中，可以通过 `props.children` 传递默认插槽内容，类似于 Vue 中的默认插槽；也可以通过 `props.propName` 属性传递具名插槽内容，其中 `propName` 是我们自定义的属性名，类似于 Vue 中的具名插槽。
    - `props.children` 可以接收任何可渲染的 React 元素，并且可以通过检查其是否存在来提供默认内容。
    - 除了 `children`，还可以使用其他 `props`（如 `content1` 和 `content2`）来传递特定的内容，并为这些 `props` 定义默认值。
  

- [ ] [0025. 布尔属性](https://github.com/Tdahuyou/TNotes.react/tree/main/0025.%20%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7/README.md) <!-- [locale](./0025.%20%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7/README.md) -->  
  

  - 
  - [1. 📒 布尔属性概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0025.%20%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7/README.md#1--布尔属性概述)
  - [2. 💻 demos.1 - 布尔属性在 React 中的应用示例](https://github.com/Tdahuyou/TNotes.react/tree/main/0025.%20%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7/README.md#2--demos1---布尔属性在-react-中的应用示例)
  

- [ ] [0020. 组件属性的校验](https://github.com/Tdahuyou/TNotes.react/tree/main/0020.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A0%A1%E9%AA%8C/README.md) <!-- [locale](./0020.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A0%A1%E9%AA%8C/README.md) -->  
  

  - 
  - [1. ⏰ TODO](https://github.com/Tdahuyou/TNotes.react/tree/main/0020.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A0%A1%E9%AA%8C/README.md#1--todo)
  - [2. 📝 Summary](https://github.com/Tdahuyou/TNotes.react/tree/main/0020.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A0%A1%E9%AA%8C/README.md#2--summary)
  - [3. 🔗 links](https://github.com/Tdahuyou/TNotes.react/tree/main/0020.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A0%A1%E9%AA%8C/README.md#3--links)
  - [4. 📒 notes](https://github.com/Tdahuyou/TNotes.react/tree/main/0020.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A0%A1%E9%AA%8C/README.md#4--notes)
  - [5. 💻 demo](https://github.com/Tdahuyou/TNotes.react/tree/main/0020.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A0%A1%E9%AA%8C/README.md#5--demo)
  - [6. 🤖 AI](https://github.com/Tdahuyou/TNotes.react/tree/main/0020.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A0%A1%E9%AA%8C/README.md#6--ai)
  

## 11. 组件状态

## 12. 组件生命周期

- [ ] [0027. 生命周期](https://github.com/Tdahuyou/TNotes.react/tree/main/0027.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/README.md) <!-- [locale](./0027.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/README.md) -->  
  

  - 
  - [1. ⏰ TODO：待完善](https://github.com/Tdahuyou/TNotes.react/tree/main/0027.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/README.md#1--todo待完善)
  - [2. 📝 Summary](https://github.com/Tdahuyou/TNotes.react/tree/main/0027.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/README.md#2--summary)
  - [3. 🔗 links](https://github.com/Tdahuyou/TNotes.react/tree/main/0027.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/README.md#3--links)
  - [4. 📒 notes](https://github.com/Tdahuyou/TNotes.react/tree/main/0027.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/README.md#4--notes)
  - [5. 💻 demo](https://github.com/Tdahuyou/TNotes.react/tree/main/0027.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/README.md#5--demo)
  - [6. 🤖 AI](https://github.com/Tdahuyou/TNotes.react/tree/main/0027.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/README.md#6--ai)
  

## 13. ref

- [ ] [0007. ref](https://github.com/Tdahuyou/TNotes.react/tree/main/0007.%20ref/README.md) <!-- [locale](./0007.%20ref/README.md) -->  
  

  - 
  - [1. ⏰](https://github.com/Tdahuyou/TNotes.react/tree/main/0007.%20ref/README.md#1-)
  

- [ ] [0018. 实现图片自动轮播的效果](https://github.com/Tdahuyou/TNotes.react/tree/main/0018.%20%E5%AE%9E%E7%8E%B0%E5%9B%BE%E7%89%87%E8%87%AA%E5%8A%A8%E8%BD%AE%E6%92%AD%E7%9A%84%E6%95%88%E6%9E%9C/README.md) <!-- [locale](./0018.%20%E5%AE%9E%E7%8E%B0%E5%9B%BE%E7%89%87%E8%87%AA%E5%8A%A8%E8%BD%AE%E6%92%AD%E7%9A%84%E6%95%88%E6%9E%9C/README.md) -->  
  

  - 
  - [1. 💻 demos.1 - 图片自动轮播](https://github.com/Tdahuyou/TNotes.react/tree/main/0018.%20%E5%AE%9E%E7%8E%B0%E5%9B%BE%E7%89%87%E8%87%AA%E5%8A%A8%E8%BD%AE%E6%92%AD%E7%9A%84%E6%95%88%E6%9E%9C/README.md#1--demos1---图片自动轮播)
  - [2. 💻 demos.2 - 来看一个常见的由于定时器混乱错误引发的 bug](https://github.com/Tdahuyou/TNotes.react/tree/main/0018.%20%E5%AE%9E%E7%8E%B0%E5%9B%BE%E7%89%87%E8%87%AA%E5%8A%A8%E8%BD%AE%E6%92%AD%E7%9A%84%E6%95%88%E6%9E%9C/README.md#2--demos2---来看一个常见的由于定时器混乱错误引发的-bug)
  

## 14. hooks

## 15. hoc

## 16. 内置组件

- [ ] [0014. React.Fragment](https://github.com/Tdahuyou/TNotes.react/tree/main/0014.%20React.Fragment/README.md) <!-- [locale](./0014.%20React.Fragment/README.md) -->  
  

  - 
  - [1. 🔗 查看 react 官方文档对内置组件 `React.Fragment` 的描述](https://github.com/Tdahuyou/TNotes.react/tree/main/0014.%20React.Fragment/README.md#1--查看-react-官方文档对内置组件-reactfragment-的描述)
  - [2. 📒 `<Fragment>` 概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0014.%20React.Fragment/README.md#2--fragment-概述)
  - [3. 💻 demos.1 - React.Fragment 并不会生成真实 DOM](https://github.com/Tdahuyou/TNotes.react/tree/main/0014.%20React.Fragment/README.md#3--demos1---reactfragment-并不会生成真实-dom)
  - [4. 💻 demos.2 - 使用 React.Fragment 渲染列表项](https://github.com/Tdahuyou/TNotes.react/tree/main/0014.%20React.Fragment/README.md#4--demos2---使用-reactfragment-渲染列表项)
  

## 17. redux

- [ ] [0047. redux 是什么](https://github.com/Tdahuyou/TNotes.react/tree/main/0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md) <!-- [locale](./0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md) -->  
  

  - 
  - [1. 🔗 redux 官方文档和 github 仓库](https://github.com/Tdahuyou/TNotes.react/tree/main/0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#1--redux-官方文档和-github-仓库)
  - [2. 🔗 redux 作者 - Dan Abramov、Andrew Clark](https://github.com/Tdahuyou/TNotes.react/tree/main/0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#2--redux-作者---dan-abramovandrew-clark)
  - [3. 📒 redux 概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#3--redux-概述)
  - [4. 📒 官方对 redux 的介绍](https://github.com/Tdahuyou/TNotes.react/tree/main/0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#4--官方对-redux-的介绍)
  - [5. 📒 redux 核心概念](https://github.com/Tdahuyou/TNotes.react/tree/main/0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#5--redux-核心概念)
  - [6. 🤔 为什么 Reducer 必须是纯函数（Pure Functions）？](https://github.com/Tdahuyou/TNotes.react/tree/main/0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#6--为什么-reducer-必须是纯函数pure-functions)
  - [7. 🤔 Action 创建函数（Action Creators）是什么？](https://github.com/Tdahuyou/TNotes.react/tree/main/0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#7--action-创建函数action-creators是什么)
  - [8. 📒 redux 常用工具及生态系统](https://github.com/Tdahuyou/TNotes.react/tree/main/0047.%20redux%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md#8--redux-常用工具及生态系统)
  

- [ ] [0028. redux 的基本使用](https://github.com/Tdahuyou/TNotes.react/tree/main/0028.%20redux%20%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/README.md) <!-- [locale](./0028.%20redux%20%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/README.md) -->  
  

  - 
  - [1. 📒 本节会用到的一些依赖](https://github.com/Tdahuyou/TNotes.react/tree/main/0028.%20redux%20%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/README.md#1--本节会用到的一些依赖)
  - [2. 💻 demos.1 - 脱离 react 单独使用 redux 来管理状态数据](https://github.com/Tdahuyou/TNotes.react/tree/main/0028.%20redux%20%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/README.md#2--demos1---脱离-react-单独使用-redux-来管理状态数据)
  - [3. 💻 demos.2 - redux 的基本使用 - createStore 版](https://github.com/Tdahuyou/TNotes.react/tree/main/0028.%20redux%20%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/README.md#3--demos2---redux-的基本使用---createstore-版)
  - [4. 💻 demos.2 - redux 的基本使用 - @reduxjs/toolkit 版](https://github.com/Tdahuyou/TNotes.react/tree/main/0028.%20redux%20%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/README.md#4--demos2---redux-的基本使用---reduxjstoolkit-版)
  - [5. 💻 demos.2 - redux 的基本使用 - @reduxjs/toolkit 版（模块化）](https://github.com/Tdahuyou/TNotes.react/tree/main/0028.%20redux%20%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/README.md#5--demos2---redux-的基本使用---reduxjstoolkit-版模块化)
  

- [ ] [0029. 为什么说前端的 mvc 已死](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md) <!-- [locale](./0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md) -->  
  

  - 
  - [1. 🔗 links](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#1--links)
  - [2. 📒 notes](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#2--notes)
  - [3. 🤖 为什么说前端的 mvc 已死？](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#3--为什么说前端的-mvc-已死)
    - [3.1. **复杂的状态管理**](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#31-复杂的状态管理)
    - [3.2. **组件化**](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#32-组件化)
    - [3.3. **单向数据流**](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#33-单向数据流)
    - [3.4. **虚拟 DOM**](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#34-虚拟-dom)
    - [3.5. **社区和生态系统**](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#35-社区和生态系统)
    - [3.6. **开发体验**](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#36-开发体验)
    - [3.7. 总结](https://github.com/Tdahuyou/TNotes.react/tree/main/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md#37-总结)
  - 理解为什么前端不适用 mvc 模式。
  

- [ ] [0030. redux 中的 action](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md) <!-- [locale](./0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md) -->  
  

  - 
  - [1. 🔗 links](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#1--links)
  - [2. 💻 脱离 react 单独使用 redux 来管理状态数据](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#2--脱离-react-单独使用-redux-来管理状态数据)
  - [3. 📒 action 是什么？有什么用？](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#3--action-是什么有什么用)
  - [4. 📒 redux 部分源码 - 判断 action 是否合法的逻辑](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#4--redux-部分源码---判断-action-是否合法的逻辑)
  - [5. 💻 action 必须是一个平面对象](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#5--action-必须是一个平面对象)
  - [6. 💻 action 的 type 属性必须是 string 类型](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#6--action-的-type-属性必须是-string-类型)
  - [7. 📒 type 的硬编码问题](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#7--type-的硬编码问题)
  - [8. 📒 action 的创建函数](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#8--action-的创建函数)
  - [9. 📒 `bindActionCreators`](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#9--bindactioncreators)
  - [10. 💻 action 的创建函数以及工具方法 `bindActionCreators`](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#10--action-的创建函数以及工具方法-bindactioncreators)
  - [11. 🤖 如何验证一个对象是否是 plain-object？](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#11--如何验证一个对象是否是-plain-object)
  - [12. 🤖 为什么 type 必须是 string 类型，符号类型不行](https://github.com/Tdahuyou/TNotes.react/tree/main/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md#12--为什么-type-必须是-string-类型符号类型不行)
  - 理解 action 的本质
  - 编写 action 时的一些常见写法
  - action 的创建函数
  - 学会使用 `bindActionCreators` 来简化 action 的分发流程
  - 学习 redux 的源码，比如：关于 action 的判断逻辑 `isAction` 的实现、关于 `bindActionCreators` 的实现源码。
  

- [ ] [0031. 在 redux 中，store、reducer、action 三者之间的关系](https://github.com/Tdahuyou/TNotes.react/tree/main/0031.%20%E5%9C%A8%20redux%20%E4%B8%AD%EF%BC%8Cstore%E3%80%81reducer%E3%80%81action%20%E4%B8%89%E8%80%85%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB/README.md) <!-- [locale](./0031.%20%E5%9C%A8%20redux%20%E4%B8%AD%EF%BC%8Cstore%E3%80%81reducer%E3%80%81action%20%E4%B8%89%E8%80%85%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB/README.md) -->  
  

  - 
  - [1. 📒 store](https://github.com/Tdahuyou/TNotes.react/tree/main/0031.%20%E5%9C%A8%20redux%20%E4%B8%AD%EF%BC%8Cstore%E3%80%81reducer%E3%80%81action%20%E4%B8%89%E8%80%85%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB/README.md#1--store)
  - [2. 📒 reducer](https://github.com/Tdahuyou/TNotes.react/tree/main/0031.%20%E5%9C%A8%20redux%20%E4%B8%AD%EF%BC%8Cstore%E3%80%81reducer%E3%80%81action%20%E4%B8%89%E8%80%85%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB/README.md#2--reducer)
  - [3. 📒 action](https://github.com/Tdahuyou/TNotes.react/tree/main/0031.%20%E5%9C%A8%20redux%20%E4%B8%AD%EF%BC%8Cstore%E3%80%81reducer%E3%80%81action%20%E4%B8%89%E8%80%85%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB/README.md#3--action)
  - 了解 redux 中的 3 个核心组成部分 store、reducer、action，并清楚它们之间的关系。
  

## 18. 第三方库

- [ ] [0006. react-modal](https://github.com/Tdahuyou/TNotes.react/tree/main/0006.%20react-modal/README.md) <!-- [locale](./0006.%20react-modal/README.md) -->  
  

  - 
  - [1. 🔗 react-modal 相关链接](https://github.com/Tdahuyou/TNotes.react/tree/main/0006.%20react-modal/README.md#1--react-modal-相关链接)
  - [2. 📒 react-modal 概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0006.%20react-modal/README.md#2--react-modal-概述)
  - [3. 💻 demos.1 - 认识 contentLabel 属性](https://github.com/Tdahuyou/TNotes.react/tree/main/0006.%20react-modal/README.md#3--demos1---认识-contentlabel-属性)
  - [4. 💻 demos.2 - 封装一个简单的 dialog 组件](https://github.com/Tdahuyou/TNotes.react/tree/main/0006.%20react-modal/README.md#4--demos2---封装一个简单的-dialog-组件)
  

- [ ] [0012. react-monaco-editor](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md) <!-- [locale](./0012.%20react-monaco-editor/README.md) -->  
  

  - 
  - [1. 🔗 monaco-react 官方文档](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#1--monaco-react-官方文档)
  - [2. 🔍 Monaco Editor API](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#2--monaco-editor-api)
  - [3. 📒 monaco-react 概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#3--monaco-react-概述)
  - [4. 💻 demos.1 - 安装并引入 Editor 组件](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#4--demos1---安装并引入-editor-组件)
  - [5. 💻 demos.2 - 4 个钩子 onChange、onMount、beforeMount、onValidate](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#5--demos2---4-个钩子-onchangeonmountbeforemountonvalidate)
  - [6. 💻 demos.3 - 获取编辑器的当前值](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#6--demos3---获取编辑器的当前值)
  - [7. 💻 demos.4 - 只读模式](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#7--demos4---只读模式)
  - [8. 💻 demos.5 - 动态设置编辑器中的内容](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#8--demos5---动态设置编辑器中的内容)
  - [9. 💻 demos.6 - 实战练习 - 模仿 matatastudio 的代码预览效果封装一个代码预览组件](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#9--demos6---实战练习---模仿-matatastudio-的代码预览效果封装一个代码预览组件)
  - [10. 📒 实现代码预览功能 - 业务背景 + 遇到的坑 + 解决方案](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#10--实现代码预览功能---业务背景--遇到的坑--解决方案)
    - [10.1. 1️⃣ 在线方案 - 使用代理](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#101-1️⃣-在线方案---使用代理)
    - [10.2. 2️⃣ 在线方案 - 下载资源丢到自己的 CDN 上](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#102-2️⃣-在线方案---下载资源丢到自己的-cdn-上)
    - [10.3. 3️⃣ 离线方案 - 手动下载相关模块](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#103-3️⃣-离线方案---手动下载相关模块)
    - [10.4. 4️⃣ 离线方案 - use monaco-editor as an npm package](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#104-4️⃣-离线方案---use-monaco-editor-as-an-npm-package)
  - [11. 🤖 monaco 名称的由来](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#11--monaco-名称的由来)
  - [12. 🔗 links](https://github.com/Tdahuyou/TNotes.react/tree/main/0012.%20react-monaco-editor/README.md#12--links)
  

- [ ] [0033. react-tooltip](https://github.com/Tdahuyou/TNotes.react/tree/main/0033.%20react-tooltip/README.md) <!-- [locale](./0033.%20react-tooltip/README.md) -->  
  

  - 
  - [1. 🔗 links](https://github.com/Tdahuyou/TNotes.react/tree/main/0033.%20react-tooltip/README.md#1--links)
  - [2. 📒 react-tooltip 概述](https://github.com/Tdahuyou/TNotes.react/tree/main/0033.%20react-tooltip/README.md#2--react-tooltip-概述)
  - [3. 📒 安装 react-tooltip](https://github.com/Tdahuyou/TNotes.react/tree/main/0033.%20react-tooltip/README.md#3--安装-react-tooltip)
  - [4. 📒 核心依赖的版本](https://github.com/Tdahuyou/TNotes.react/tree/main/0033.%20react-tooltip/README.md#4--核心依赖的版本)
  - [5. 📒 引入 react-tooltip](https://github.com/Tdahuyou/TNotes.react/tree/main/0033.%20react-tooltip/README.md#5--引入-react-tooltip)
  - [6. 📒 关于 css 引入的一些注意事项](https://github.com/Tdahuyou/TNotes.react/tree/main/0033.%20react-tooltip/README.md#6--关于-css-引入的一些注意事项)
  - [7. 💻 了解 react-tooltip 的基本使用](https://github.com/Tdahuyou/TNotes.react/tree/main/0033.%20react-tooltip/README.md#7--了解-react-tooltip-的基本使用)
  
  
  

- [ ] [0038. react-intl](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md) <!-- [locale](./0038.%20react-intl/README.md) -->  
  

  - 
  - [1. 🔗 react-intl 相关资料](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#1--react-intl-相关资料)
  - [2. 🔗 ICU 相关资料](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#2--icu-相关资料)
  - [3. 📒 react-intl 简介](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#3--react-intl-简介)
  - [4. 📒 react-intl 库中的一些常用模块](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#4--react-intl-库中的一些常用模块)
  - [5. 🤔 ICU (International Components for Unicode) 是什么？有什么用？](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#5--icu-international-components-for-unicode-是什么有什么用)
  - [6. 💻 demos.1 - react-intl 基本使用](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#6--demos1---react-intl-基本使用)
  - [7. 🔍 如何判断传入的 locale 是否是合法值](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#7--如何判断传入的-locale-是否是合法值)
  - [8. 💻 demos.3 - 特殊的 locale 值](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#8--demos3---特殊的-locale-值)
  - [9. 💻 demos.4 - useIntl、injectIntl - 使用 defineMessages 定义消息](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#9--demos4---useintlinjectintl---使用-definemessages-定义消息)
  - [10. 💻 demos.5 - 通过 intl 对象来获取国际化消息数据](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#10--demos5---通过-intl-对象来获取国际化消息数据)
  - [11. 💻 demos.2 - IntlShape 在 .ts 中的应用](https://github.com/Tdahuyou/TNotes.react/tree/main/0038.%20react-intl/README.md#11--demos2---intlshape-在-ts-中的应用)
  - React-Intl 是一个强大的工具，可帮助开发人员轻松管理和本地化他们的 React 应用程序。
  

## 19. 工程化

- [ ] [0008. npm create vite 使用 vite 快速初始化一个 react 工程](https://github.com/Tdahuyou/TNotes.react/tree/main/0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md) <!-- [locale](./0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md) -->  
  

  - 
  - [1. 🔍 查阅 vite 官网，了解 npm create vite 相关详情](https://github.com/Tdahuyou/TNotes.react/tree/main/0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md#1--查阅-vite-官网了解-npm-create-vite-相关详情)
  - [2. 📒 使用 pnpm 的实际操作流程](https://github.com/Tdahuyou/TNotes.react/tree/main/0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md#2--使用-pnpm-的实际操作流程)
  - [3. 💻 demos.1 - 使用 vite 创建 react 工程并启动](https://github.com/Tdahuyou/TNotes.react/tree/main/0008.%20npm%20create%20vite%20%E4%BD%BF%E7%94%A8%20vite%20%E5%BF%AB%E9%80%9F%E5%88%9D%E5%A7%8B%E5%8C%96%E4%B8%80%E4%B8%AA%20react%20%E5%B7%A5%E7%A8%8B/README.md#3--demos1---使用-vite-创建-react-工程并启动)
  - `npm create vite@latest my-react-app -- --template react` 这是 vite 官方提供的命令，用于创建一个 react 项目。
    - 如果不清楚这条命令的含义，可以参考一下本节中记录的 AI 对此的解释。
  - 上面这条命令太长了，不好记，其实只需要记住：`npm create vite` 即可，其他项目参数（比如项目名称、模板等）根据命令提示自行配置。
  

- [ ] [0036. 快速搭建一个基于 vite、antd 的 react 项目](https://github.com/Tdahuyou/TNotes.react/tree/main/0036.%20%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%9F%BA%E4%BA%8E%20vite%E3%80%81antd%20%E7%9A%84%20react%20%E9%A1%B9%E7%9B%AE/README.md) <!-- [locale](./0036.%20%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%9F%BA%E4%BA%8E%20vite%E3%80%81antd%20%E7%9A%84%20react%20%E9%A1%B9%E7%9B%AE/README.md) -->  
  

  - 
  - [1. 🔗 antd 官方文档 - 在 vite 中使用 antd](https://github.com/Tdahuyou/TNotes.react/tree/main/0036.%20%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%9F%BA%E4%BA%8E%20vite%E3%80%81antd%20%E7%9A%84%20react%20%E9%A1%B9%E7%9B%AE/README.md#1--antd-官方文档---在-vite-中使用-antd)
  - [2. 📒 使用 pnpm 实现安装和初始化的流程](https://github.com/Tdahuyou/TNotes.react/tree/main/0036.%20%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%9F%BA%E4%BA%8E%20vite%E3%80%81antd%20%E7%9A%84%20react%20%E9%A1%B9%E7%9B%AE/README.md#2--使用-pnpm-实现安装和初始化的流程)
  - [3. 💻 demos.1 - 测试按钮组件的使用](https://github.com/Tdahuyou/TNotes.react/tree/main/0036.%20%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%9F%BA%E4%BA%8E%20vite%E3%80%81antd%20%E7%9A%84%20react%20%E9%A1%B9%E7%9B%AE/README.md#3--demos1---测试按钮组件的使用)
  

## 20. UI 组件库

- [ ] [0037. 学习 antd Message 组件的使用](https://github.com/Tdahuyou/TNotes.react/tree/main/0037.%20%E5%AD%A6%E4%B9%A0%20antd%20Message%20%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8/README.md) <!-- [locale](./0037.%20%E5%AD%A6%E4%B9%A0%20antd%20Message%20%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8/README.md) -->  
  

  - 
  - [1. 🔗 Message 全局提示](https://github.com/Tdahuyou/TNotes.react/tree/main/0037.%20%E5%AD%A6%E4%B9%A0%20antd%20Message%20%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8/README.md#1--message-全局提示)
  - [2. 💻 demos.1 - 了解 Message 的基本使用](https://github.com/Tdahuyou/TNotes.react/tree/main/0037.%20%E5%AD%A6%E4%B9%A0%20antd%20Message%20%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8/README.md#2--demos1---了解-message-的基本使用)
  - [3. 💻 demos.2 - 理解 contextHolder 的作用](https://github.com/Tdahuyou/TNotes.react/tree/main/0037.%20%E5%AD%A6%E4%B9%A0%20antd%20Message%20%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8/README.md#3--demos2---理解-contextholder-的作用)
  - [4. 🔗 来自官方文档的回复：为什么 message 不能获取 context、redux 的内容和 ConfigProvider 的 locale/prefixCls/theme 等配置？](https://github.com/Tdahuyou/TNotes.react/tree/main/0037.%20%E5%AD%A6%E4%B9%A0%20antd%20Message%20%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8/README.md#4--来自官方文档的回复为什么-message-不能获取-contextredux-的内容和-configprovider-的-localeprefixclstheme-等配置)
  

## 21. empty


- [ ] [0026. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0026.%20xxx/README.md) <!-- [locale](./0026.%20xxx/README.md) -->  

- [ ] [0050. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0050.%20xxx/README.md) <!-- [locale](./0050.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0051. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0051.%20xxx/README.md) <!-- [locale](./0051.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0052. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0052.%20xxx/README.md) <!-- [locale](./0052.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0053. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0053.%20xxx/README.md) <!-- [locale](./0053.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0054. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0054.%20xxx/README.md) <!-- [locale](./0054.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0055. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0055.%20xxx/README.md) <!-- [locale](./0055.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0056. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0056.%20xxx/README.md) <!-- [locale](./0056.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0057. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0057.%20xxx/README.md) <!-- [locale](./0057.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0058. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0058.%20xxx/README.md) <!-- [locale](./0058.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0059. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0059.%20xxx/README.md) <!-- [locale](./0059.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0060. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0060.%20xxx/README.md) <!-- [locale](./0060.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0061. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0061.%20xxx/README.md) <!-- [locale](./0061.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0062. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0062.%20xxx/README.md) <!-- [locale](./0062.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0063. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0063.%20xxx/README.md) <!-- [locale](./0063.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0064. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0064.%20xxx/README.md) <!-- [locale](./0064.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0065. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0065.%20xxx/README.md) <!-- [locale](./0065.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0066. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0066.%20xxx/README.md) <!-- [locale](./0066.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0067. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0067.%20xxx/README.md) <!-- [locale](./0067.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0068. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0068.%20xxx/README.md) <!-- [locale](./0068.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0069. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0069.%20xxx/README.md) <!-- [locale](./0069.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0070. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0070.%20xxx/README.md) <!-- [locale](./0070.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0071. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0071.%20xxx/README.md) <!-- [locale](./0071.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0072. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0072.%20xxx/README.md) <!-- [locale](./0072.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0073. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0073.%20xxx/README.md) <!-- [locale](./0073.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0074. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0074.%20xxx/README.md) <!-- [locale](./0074.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0075. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0075.%20xxx/README.md) <!-- [locale](./0075.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0076. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0076.%20xxx/README.md) <!-- [locale](./0076.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0077. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0077.%20xxx/README.md) <!-- [locale](./0077.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0078. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0078.%20xxx/README.md) <!-- [locale](./0078.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0079. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0079.%20xxx/README.md) <!-- [locale](./0079.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0080. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0080.%20xxx/README.md) <!-- [locale](./0080.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0081. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0081.%20xxx/README.md) <!-- [locale](./0081.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0082. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0082.%20xxx/README.md) <!-- [locale](./0082.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0083. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0083.%20xxx/README.md) <!-- [locale](./0083.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0084. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0084.%20xxx/README.md) <!-- [locale](./0084.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0085. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0085.%20xxx/README.md) <!-- [locale](./0085.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0086. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0086.%20xxx/README.md) <!-- [locale](./0086.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0087. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0087.%20xxx/README.md) <!-- [locale](./0087.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0088. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0088.%20xxx/README.md) <!-- [locale](./0088.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0089. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0089.%20xxx/README.md) <!-- [locale](./0089.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0090. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0090.%20xxx/README.md) <!-- [locale](./0090.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0091. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0091.%20xxx/README.md) <!-- [locale](./0091.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0092. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0092.%20xxx/README.md) <!-- [locale](./0092.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0093. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0093.%20xxx/README.md) <!-- [locale](./0093.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0094. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0094.%20xxx/README.md) <!-- [locale](./0094.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0095. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0095.%20xxx/README.md) <!-- [locale](./0095.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0096. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0096.%20xxx/README.md) <!-- [locale](./0096.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0097. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0097.%20xxx/README.md) <!-- [locale](./0097.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0098. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0098.%20xxx/README.md) <!-- [locale](./0098.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0099. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0099.%20xxx/README.md) <!-- [locale](./0099.%20xxx/README.md) -->  
  

  - 
  
  

- [ ] [0100. xxx](https://github.com/Tdahuyou/TNotes.react/tree/main/0100.%20xxx/README.md) <!-- [locale](./0100.%20xxx/README.md) -->  
  

  - 
  
  
