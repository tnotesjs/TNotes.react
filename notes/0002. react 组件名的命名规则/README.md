# [0002. react 组件名的命名规则](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0002.%20react%20%E7%BB%84%E4%BB%B6%E5%90%8D%E7%9A%84%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 查看 react 官方对组件名的命名规则的描述](#2-查看-react-官方对组件名的命名规则的描述)
- [3. demos.1 - react 组件名的命名规则](#3-demos1---react-组件名的命名规则)
- [4. 关于组件命名规范，大家都是怎么做的？](#4-关于组件命名规范大家都是怎么做的)
- [5. 引用](#5-引用)

<!-- endregion:toc -->

## 1. 本节内容

- react 组件命名规范

- 一句话：组件名必须以大写字母开头

## 2. 查看 react 官方对组件名的命名规则的描述

- 官方文档 [react 快速开始][1] 原话 -> `React component names must always start with a capital letter, while HTML tags must be lowercase.`
- ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-21-44-59.png)

## 3. demos.1 - react 组件名的命名规则

<<< ./demos/1//assets/1.jsx

- `<h1>` 是 html 的标签，在使用的时候必须以小写开头，如果使用大写的 `<H1>` 会报错。
- `<MyButton>` 是自定义的组件，在使用的时候必须以大写开头，如果使用小写开头 `<myButton>` 会警告。

## 4. 关于组件命名规范，大家都是怎么做的？

- 大驼峰命名（强制）
- 注意组件名称的语义（强烈建议）
- 单词数量 >= 2（建议）
- ……

## 5. 引用

- [react 快速开始][1]

[1]: https://react.dev/learn
