# react

<!-- region:toc -->

- [react](#react)
  - [1. 学习资料](#1-学习资料)
  - [2. 环境准备](#2-环境准备)
  - [3. 初始 React](#3-初始-react)
  - [4. 第一个 react 应用](#4-第一个-react-应用)
  - [5. JSX](#5-jsx)
  - [6. 组件基础](#6-组件基础)
  - [7. Props](#7-props)
  - [8. State](#8-state)
  - [9. 组件通信](#9-组件通信)
  - [10. 生命周期](#10-生命周期)
  - [11. Hooks](#11-hooks)
  - [12. ref](#12-ref)
  - [13. 事件处理](#13-事件处理)
  - [14. 表单处理](#14-表单处理)
  - [15. 高阶组件（HOC）](#15-高阶组件hoc)
  - [16. Context](#16-context)
  - [17. Redux / 状态管理](#17-redux--状态管理)
  - [18. 路由（React Router）](#18-路由react-router)
  - [19. 第三方库集成](#19-第三方库集成)
  - [20. 工程化与脚手架](#20-工程化与脚手架)
  - [21. UI 组件库](#21-ui-组件库)
  - [22. 测试与调试](#22-测试与调试)
  - [23. 性能优化](#23-性能优化)
  - [24. React 的不同版本与重大变更](#24-react-的不同版本与重大变更)
  - [25. 占位模板](#25-占位模板)

<!-- endregion:toc -->

## 1. 学习资料

- [x] [0101. react roadmap](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0101.%20react%20roadmap/README.md)
- [x] [0007. 菜鸟教程](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0007.%20%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B/README.md)

## 2. 环境准备

- [x] [0064. 环境准备](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0064.%20%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87/README.md)
- [x] [0070. Node.js 安装与配置](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0070.%20Node.js%20%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/README.md)
- [x] [0071. NPM 包管理工具](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0071.%20NPM%20%E5%8C%85%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7/README.md)
- [x] [0072. VSCode 安装与配置](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0072.%20VSCode%20%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/README.md)
- [ ] [0073. 本地开发服务器](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0073.%20%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91%E6%9C%8D%E5%8A%A1%E5%99%A8/README.md)
- [ ] [0074. Prettier 安装与配置](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0074.%20Prettier%20%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/README.md)
- [x] [0034. eslint 安装与配置](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0034.%20eslint%20%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/README.md)
- [x] [0035. Emmet 语法支持](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0035.%20Emmet%20%E8%AF%AD%E6%B3%95%E6%94%AF%E6%8C%81/README.md)
- [x] [0008. react 工程初始化（vite）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0008.%20react%20%E5%B7%A5%E7%A8%8B%E5%88%9D%E5%A7%8B%E5%8C%96%EF%BC%88vite%EF%BC%89/README.md)

## 3. 初始 React

- [x] [0032. react 是什么](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0032.%20react%20%E6%98%AF%E4%BB%80%E4%B9%88/README.md)
- [x] [0055. 为什么说 React 更加原生【AI】](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0055.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%20React%20%E6%9B%B4%E5%8A%A0%E5%8E%9F%E7%94%9F%E3%80%90AI%E3%80%91/README.md)
- [x] [0040. react 官方文档的基本结构](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0040.%20react%20%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84/README.md)
- [ ] [0067. React 发展历史](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0067.%20React%20%E5%8F%91%E5%B1%95%E5%8E%86%E5%8F%B2/README.md)
- [ ] [0068. React 设计理念](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0068.%20React%20%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5/README.md)
- [ ] [0069. React 与其他框架对比](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0069.%20React%20%E4%B8%8E%E5%85%B6%E4%BB%96%E6%A1%86%E6%9E%B6%E5%AF%B9%E6%AF%94/README.md)
- [ ] [0075. React 官方文档导航](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0075.%20React%20%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3%E5%AF%BC%E8%88%AA/README.md)
- [ ] [0076. React 核心 API 概览](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0076.%20React%20%E6%A0%B8%E5%BF%83%20API%20%E6%A6%82%E8%A7%88/README.md)
- [ ] [0077. React 生态系统介绍](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0077.%20React%20%E7%94%9F%E6%80%81%E7%B3%BB%E7%BB%9F%E4%BB%8B%E7%BB%8D/README.md)

## 4. 第一个 react 应用

- [x] [0063. 第一个 react 应用](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0063.%20%E7%AC%AC%E4%B8%80%E4%B8%AA%20react%20%E5%BA%94%E7%94%A8/README.md)
- [x] [0042. Hello World（v16）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0042.%20Hello%20World%EF%BC%88v16%EF%BC%89/README.md)
- [x] [0001. Hello World（v19）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0001.%20Hello%20World%EF%BC%88v19%EF%BC%89/README.md)

## 5. JSX

- [x] [0062. JSX](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0062.%20JSX/README.md)
- [x] [0013. 初始 JSX](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0013.%20%E5%88%9D%E5%A7%8B%20JSX/README.md)
- [x] [0048. React Element 的多种叫法](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0048.%20React%20Element%20%E7%9A%84%E5%A4%9A%E7%A7%8D%E5%8F%AB%E6%B3%95/README.md)
- [x] [0061. React Element 与 React Fiber 的关系【扩展】](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0061.%20React%20Element%20%E4%B8%8E%20React%20Fiber%20%E7%9A%84%E5%85%B3%E7%B3%BB%E3%80%90%E6%89%A9%E5%B1%95%E3%80%91/README.md)
- [x] [0044. react element 是只读的](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0044.%20react%20element%20%E6%98%AF%E5%8F%AA%E8%AF%BB%E7%9A%84/README.md)
- [x] [0045. jsx 必须单根](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0045.%20jsx%20%E5%BF%85%E9%A1%BB%E5%8D%95%E6%A0%B9/README.md)
- [x] [0014. React.Fragment](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0014.%20React.Fragment/README.md)
- [x] [0003. html to jsx 在线转换](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0003.%20html%20to%20jsx%20%E5%9C%A8%E7%BA%BF%E8%BD%AC%E6%8D%A2/README.md)
- [x] [0015. 在 JSX 中使用注释](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0015.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%B3%A8%E9%87%8A/README.md)
- [x] [0009. 在 JSX 中使用 JS 表达式](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F/README.md)
- [x] [0017. 在 JSX 中书写内联样式 style](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0017.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%B9%A6%E5%86%99%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F%20style/README.md)
- [x] [0004. 使用 className 给元素添加 class](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0004.%20%E4%BD%BF%E7%94%A8%20className%20%E7%BB%99%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%20class/README.md)
- [x] [0046. JSX 元素的正确使用及常见错误示例【扩展】](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0046.%20JSX%20%E5%85%83%E7%B4%A0%E7%9A%84%E6%AD%A3%E7%A1%AE%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%E7%A4%BA%E4%BE%8B%E3%80%90%E6%89%A9%E5%B1%95%E3%80%91/README.md)
- [x] [0010. 条件渲染](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0010.%20%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93/README.md)
- [x] [0011. 列表渲染](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0011.%20%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93/README.md)
- [x] [0016. dangerouslySetInnerHTML](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0016.%20dangerouslySetInnerHTML/README.md)
- [x] [0054. DOMPurify](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0054.%20DOMPurify/README.md)

## 6. 组件基础

- [x] [0065. 组件](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0065.%20%E7%BB%84%E4%BB%B6/README.md)
- [x] [0021. 组件的基本组成及核心概念](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0021.%20%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%84%E6%88%90%E5%8F%8A%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/README.md)
- [x] [0002. react 组件名的命名规则](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0002.%20react%20%E7%BB%84%E4%BB%B6%E5%90%8D%E7%9A%84%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99/README.md)
- [x] [0022. 认识函数组件和 Hooks](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0022.%20%E8%AE%A4%E8%AF%86%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E5%92%8C%20Hooks/README.md)
- [x] [0023. 认识类组件](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0023.%20%E8%AE%A4%E8%AF%86%E7%B1%BB%E7%BB%84%E4%BB%B6/README.md)
- [x] [0024. 单向数据流是什么](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0024.%20%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E6%98%AF%E4%BB%80%E4%B9%88/README.md)

## 7. Props

- [x] [0049. 函数组件不同调用方式](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0049.%20%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E4%B8%8D%E5%90%8C%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F/README.md)
- [x] [0066. 初始属性](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0066.%20%E5%88%9D%E5%A7%8B%E5%B1%9E%E6%80%A7/README.md)
- [x] [0019. 组件属性的传递和接收](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0019.%20%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%A0%E9%80%92%E5%92%8C%E6%8E%A5%E6%94%B6/README.md)
- [x] [0025. 布尔属性](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0025.%20%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7/README.md)
- [x] [0026. 属性默认值](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0026.%20%E5%B1%9E%E6%80%A7%E9%BB%98%E8%AE%A4%E5%80%BC/README.md)
- [x] [0005. 通过 props 和 children 来传递元素内容](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0005.%20%E9%80%9A%E8%BF%87%20props%20%E5%92%8C%20children%20%E6%9D%A5%E4%BC%A0%E9%80%92%E5%85%83%E7%B4%A0%E5%86%85%E5%AE%B9/README.md)
- [ ] [0081. props 类型校验](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0081.%20props%20%E7%B1%BB%E5%9E%8B%E6%A0%A1%E9%AA%8C/README.md)

## 8. State

- [ ] [0082. state 初始化](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0082.%20state%20%E5%88%9D%E5%A7%8B%E5%8C%96/README.md)
- [ ] [0083. state 更新机制](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0083.%20state%20%E6%9B%B4%E6%96%B0%E6%9C%BA%E5%88%B6/README.md)
- [ ] [0084. 异步更新与批处理](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0084.%20%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E4%B8%8E%E6%89%B9%E5%A4%84%E7%90%86/README.md)
- [ ] [0085. useState、useReducer 对比](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0085.%20useState%E3%80%81useReducer%20%E5%AF%B9%E6%AF%94/README.md)

## 9. 组件通信

- [ ] [0086. 父子组件通信](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0086.%20%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1/README.md)
- [ ] [0087. 兄弟组件通信](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0087.%20%E5%85%84%E5%BC%9F%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1/README.md)
- [ ] [0088. 跨层级通信](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0088.%20%E8%B7%A8%E5%B1%82%E7%BA%A7%E9%80%9A%E4%BF%A1/README.md)
- [ ] [0089. 事件传递与回调](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0089.%20%E4%BA%8B%E4%BB%B6%E4%BC%A0%E9%80%92%E4%B8%8E%E5%9B%9E%E8%B0%83/README.md)

## 10. 生命周期

- [ ] [0027. 生命周期](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0027.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/README.md)
- [ ] [0090. 生命周期方法详解](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0090.%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%96%B9%E6%B3%95%E8%AF%A6%E8%A7%A3/README.md)
- [ ] [0091. 挂载、更新、卸载流程](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0091.%20%E6%8C%82%E8%BD%BD%E3%80%81%E6%9B%B4%E6%96%B0%E3%80%81%E5%8D%B8%E8%BD%BD%E6%B5%81%E7%A8%8B/README.md)
- [ ] [0092. useEffect 与生命周期对比](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0092.%20useEffect%20%E4%B8%8E%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%AF%B9%E6%AF%94/README.md)

## 11. Hooks

- [ ] [0093. 常用 Hooks（useState、useEffect、useRef）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0093.%20%E5%B8%B8%E7%94%A8%20Hooks%EF%BC%88useState%E3%80%81useEffect%E3%80%81useRef%EF%BC%89/README.md)
- [ ] [0094. 自定义 Hooks](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0094.%20%E8%87%AA%E5%AE%9A%E4%B9%89%20Hooks/README.md)
- [ ] [0095. Hooks 规则与陷阱](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0095.%20Hooks%20%E8%A7%84%E5%88%99%E4%B8%8E%E9%99%B7%E9%98%B1/README.md)
- [ ] [0096. useMemo、useCallback 性能优化](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0096.%20useMemo%E3%80%81useCallback%20%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/README.md)

## 12. ref

- [ ] [0097. ref 基本用法](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0097.%20ref%20%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95/README.md)
- [ ] [0098. forwardRef 转发](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0098.%20forwardRef%20%E8%BD%AC%E5%8F%91/README.md)
- [ ] [0099. ref 与 DOM 操作](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0099.%20ref%20%E4%B8%8E%20DOM%20%E6%93%8D%E4%BD%9C/README.md)
- [x] [0018. 实现图片自动轮播的效果](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0018.%20%E5%AE%9E%E7%8E%B0%E5%9B%BE%E7%89%87%E8%87%AA%E5%8A%A8%E8%BD%AE%E6%92%AD%E7%9A%84%E6%95%88%E6%9E%9C/README.md)

## 13. 事件处理

- [ ] [0020. 合成事件机制](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0020.%20%E5%90%88%E6%88%90%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6/README.md)
- [ ] [0039. 事件绑定与解绑](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0039.%20%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E4%B8%8E%E8%A7%A3%E7%BB%91/README.md)
- [ ] [0050. 事件对象与参数传递](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0050.%20%E4%BA%8B%E4%BB%B6%E5%AF%B9%E8%B1%A1%E4%B8%8E%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92/README.md)
- [ ] [0051. 事件委托](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0051.%20%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98/README.md)

## 14. 表单处理

- [ ] [0052. 表单元素受控与非受控](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0052.%20%E8%A1%A8%E5%8D%95%E5%85%83%E7%B4%A0%E5%8F%97%E6%8E%A7%E4%B8%8E%E9%9D%9E%E5%8F%97%E6%8E%A7/README.md)
- [ ] [0053. 表单校验](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0053.%20%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C/README.md)
- [ ] [0102. 多表单域处理](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0102.%20%E5%A4%9A%E8%A1%A8%E5%8D%95%E5%9F%9F%E5%A4%84%E7%90%86/README.md)
- [ ] [0103. 文件上传](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0103.%20%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0/README.md)

## 15. 高阶组件（HOC）

- [ ] [0104. 高阶组件定义](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0104.%20%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6%E5%AE%9A%E4%B9%89/README.md)
- [ ] [0105. HOC 应用场景](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0105.%20HOC%20%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF/README.md)
- [ ] [0106. HOC 与 Hooks 对比](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0106.%20HOC%20%E4%B8%8E%20Hooks%20%E5%AF%B9%E6%AF%94/README.md)

## 16. Context

- [ ] [0107. Context 创建与使用](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0107.%20Context%20%E5%88%9B%E5%BB%BA%E4%B8%8E%E4%BD%BF%E7%94%A8/README.md)
- [ ] [0108. 多层嵌套与 Provider](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0108.%20%E5%A4%9A%E5%B1%82%E5%B5%8C%E5%A5%97%E4%B8%8E%20Provider/README.md)
- [ ] [0109. Context 性能优化](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0109.%20Context%20%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/README.md)

## 17. Redux / 状态管理

- [ ] [0047. Redux 基本概念](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0047.%20Redux%20%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/README.md)
- [ ] [0028. redux 的基本使用](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0028.%20redux%20%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/README.md)
- [ ] [0029. 为什么说前端的 mvc 已死](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0029.%20%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4%E5%89%8D%E7%AB%AF%E7%9A%84%20mvc%20%E5%B7%B2%E6%AD%BB/README.md)
- [ ] [0030. redux 中的 action](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0030.%20redux%20%E4%B8%AD%E7%9A%84%20action/README.md)
- [ ] [0031. 在 redux 中，store、reducer、action 三者之间的关系](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0031.%20%E5%9C%A8%20redux%20%E4%B8%AD%EF%BC%8Cstore%E3%80%81reducer%E3%80%81action%20%E4%B8%89%E8%80%85%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB/README.md)
- [ ] [0110. Redux Toolkit](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0110.%20Redux%20Toolkit/README.md)
- [ ] [0111. 中间件（thunk、saga）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0111.%20%E4%B8%AD%E9%97%B4%E4%BB%B6%EF%BC%88thunk%E3%80%81saga%EF%BC%89/README.md)
- [ ] [0112. 状态持久化](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0112.%20%E7%8A%B6%E6%80%81%E6%8C%81%E4%B9%85%E5%8C%96/README.md)
- [ ] [0113. 与 React 集成](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0113.%20%E4%B8%8E%20React%20%E9%9B%86%E6%88%90/README.md)

## 18. 路由（React Router）

- [ ] [0114. 路由基础](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0114.%20%E8%B7%AF%E7%94%B1%E5%9F%BA%E7%A1%80/README.md)
- [ ] [0115. 动态路由](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0115.%20%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1/README.md)
- [ ] [0116. 路由守卫](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0116.%20%E8%B7%AF%E7%94%B1%E5%AE%88%E5%8D%AB/README.md)
- [ ] [0117. 嵌套路由](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0117.%20%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1/README.md)
- [ ] [0118. 路由懒加载](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0118.%20%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD/README.md)

## 19. 第三方库集成

- [ ] [0119. 常用第三方库推荐](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0119.%20%E5%B8%B8%E7%94%A8%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93%E6%8E%A8%E8%8D%90/README.md)
- [ ] [0120. 状态管理库对比](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0120.%20%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E5%BA%93%E5%AF%B9%E6%AF%94/README.md)
- [ ] [0121. UI 库集成方法](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0121.%20UI%20%E5%BA%93%E9%9B%86%E6%88%90%E6%96%B9%E6%B3%95/README.md)
- [ ] [0122. 国际化库集成](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0122.%20%E5%9B%BD%E9%99%85%E5%8C%96%E5%BA%93%E9%9B%86%E6%88%90/README.md)
- [x] [0006. react-modal](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0006.%20react-modal/README.md)
- [x] [0012. react-monaco-editor](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0012.%20react-monaco-editor/README.md)
- [ ] [0033. react-tooltip](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0033.%20react-tooltip/README.md)
- [ ] [0038. react-intl](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0038.%20react-intl/README.md)

## 20. 工程化与脚手架

- [ ] [0036. 快速搭建一个基于 vite、antd 的 react 项目](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0036.%20%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%9F%BA%E4%BA%8E%20vite%E3%80%81antd%20%E7%9A%84%20react%20%E9%A1%B9%E7%9B%AE/README.md)
- [ ] [0123. 脚手架工具（create-react-app、vite）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0123.%20%E8%84%9A%E6%89%8B%E6%9E%B6%E5%B7%A5%E5%85%B7%EF%BC%88create-react-app%E3%80%81vite%EF%BC%89/README.md)
- [ ] [0124. 项目配置优化](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0124.%20%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE%E4%BC%98%E5%8C%96/README.md)
- [ ] [0125. 环境变量管理](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0125.%20%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E7%AE%A1%E7%90%86/README.md)
- [ ] [0126. 自动化部署](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0126.%20%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2/README.md)

## 21. UI 组件库

- [ ] [0037. 学习 antd Message 组件的使用](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0037.%20%E5%AD%A6%E4%B9%A0%20antd%20Message%20%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8/README.md)
- [ ] [0127. 主流 UI 组件库（Ant Design、MUI）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0127.%20%E4%B8%BB%E6%B5%81%20UI%20%E7%BB%84%E4%BB%B6%E5%BA%93%EF%BC%88Ant%20Design%E3%80%81MUI%EF%BC%89/README.md)
- [ ] [0128. 组件库选型](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0128.%20%E7%BB%84%E4%BB%B6%E5%BA%93%E9%80%89%E5%9E%8B/README.md)
- [ ] [0129. 组件二次封装](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0129.%20%E7%BB%84%E4%BB%B6%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85/README.md)
- [ ] [0130. 主题定制](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0130.%20%E4%B8%BB%E9%A2%98%E5%AE%9A%E5%88%B6/README.md)

## 22. 测试与调试

- [ ] [0131. 单元测试（Jest、React Testing Library）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0131.%20%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%EF%BC%88Jest%E3%80%81React%20Testing%20Library%EF%BC%89/README.md)
- [ ] [0132. 端到端测试（Cypress）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0132.%20%E7%AB%AF%E5%88%B0%E7%AB%AF%E6%B5%8B%E8%AF%95%EF%BC%88Cypress%EF%BC%89/README.md)
- [ ] [0133. 调试技巧](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0133.%20%E8%B0%83%E8%AF%95%E6%8A%80%E5%B7%A7/README.md)
- [ ] [0134. 错误边界与异常处理](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0134.%20%E9%94%99%E8%AF%AF%E8%BE%B9%E7%95%8C%E4%B8%8E%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86/README.md)

## 23. 性能优化

- [ ] [0135. 性能分析工具](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0135.%20%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90%E5%B7%A5%E5%85%B7/README.md)
- [ ] [0136. 渲染优化技巧](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0136.%20%E6%B8%B2%E6%9F%93%E4%BC%98%E5%8C%96%E6%8A%80%E5%B7%A7/README.md)
- [ ] [0137. 虚拟化列表](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0137.%20%E8%99%9A%E6%8B%9F%E5%8C%96%E5%88%97%E8%A1%A8/README.md)
- [ ] [0138. 代码分割与懒加载](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0138.%20%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2%E4%B8%8E%E6%87%92%E5%8A%A0%E8%BD%BD/README.md)

## 24. React 的不同版本与重大变更

- [ ] [0056. react releases](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0056.%20react%20releases/README.md)
- [ ] [0057. react v16](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0057.%20react%20v16/README.md)
- [ ] [0058. react v17](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0058.%20react%20v17/README.md)
- [ ] [0059. react v18](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0059.%20react%20v18/README.md)
- [ ] [0060. react v19](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0060.%20react%20v19/README.md)
- [x] [0043. ReactDOM.render](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0043.%20ReactDOM.render/README.md)
- [ ] [0100. 并发渲染（Concurrent Rendering）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0100.%20%E5%B9%B6%E5%8F%91%E6%B8%B2%E6%9F%93%EF%BC%88Concurrent%20Rendering%EF%BC%89/README.md)
- [x] [0041. 不再支持 UMD，推荐使用 ESM](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0041.%20%E4%B8%8D%E5%86%8D%E6%94%AF%E6%8C%81%20UMD%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20ESM/README.md)
- [ ] [0139. React 版本迭代历史](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0139.%20React%20%E7%89%88%E6%9C%AC%E8%BF%AD%E4%BB%A3%E5%8E%86%E5%8F%B2/README.md)
- [ ] [0140. 新特性解读（Concurrent Mode、Suspense）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0140.%20%E6%96%B0%E7%89%B9%E6%80%A7%E8%A7%A3%E8%AF%BB%EF%BC%88Concurrent%20Mode%E3%80%81Suspense%EF%BC%89/README.md)
- [ ] [0142. 未来发展趋势](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0142.%20%E6%9C%AA%E6%9D%A5%E5%8F%91%E5%B1%95%E8%B6%8B%E5%8A%BF/README.md)

## 25. 占位模板

- [ ] [0141. Fiber 架构](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0141.%20Fiber%20%E6%9E%B6%E6%9E%84/README.md)
- [ ] [0078. 项目结构设计](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0078.%20%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1/README.md)
- [ ] [0079. 入口文件解析](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0079.%20%E5%85%A5%E5%8F%A3%E6%96%87%E4%BB%B6%E8%A7%A3%E6%9E%90/README.md)
- [ ] [0080. 渲染流程分析](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0080.%20%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B%E5%88%86%E6%9E%90/README.md)
- [ ] [0143. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0143.%20xxx/README.md)
- [ ] [0144. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0144.%20xxx/README.md)
- [ ] [0145. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0145.%20xxx/README.md)
- [ ] [0146. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0146.%20xxx/README.md)
- [ ] [0147. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0147.%20xxx/README.md)
- [ ] [0148. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0148.%20xxx/README.md)
- [ ] [0149. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0149.%20xxx/README.md)
- [ ] [0150. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0150.%20xxx/README.md)
- [ ] [0151. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0151.%20xxx/README.md)
- [ ] [0152. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0152.%20xxx/README.md)
- [ ] [0153. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0153.%20xxx/README.md)
- [ ] [0154. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0154.%20xxx/README.md)
- [ ] [0155. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0155.%20xxx/README.md)
- [ ] [0156. xxx](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0156.%20xxx/README.md)
