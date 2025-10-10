# [0035. 在 vscode 中，让 Emmet 语法支持 JSX](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0035.%20%E5%9C%A8%20vscode%20%E4%B8%AD%EF%BC%8C%E8%AE%A9%20Emmet%20%E8%AF%AD%E6%B3%95%E6%94%AF%E6%8C%81%20JSX)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 💻 具体配置流程](#3--具体配置流程)
  - [3.1. 【做法 1】通过设置面板来配置](#31-做法-1通过设置面板来配置)
  - [3.2. 【做法 2】通过配置文件 `.vscode/settings.json` 来配置](#32-做法-2通过配置文件-vscodesettingsjson-来配置)
- [4. 💻 demos.1 - 在 vscode 中，让 Emmet 语法支持 JSX](#4--demos1---在-vscode-中让-emmet-语法支持-jsx)
- [5. 🔗 引用](#5--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- Emmet 语法支持

## 2. 🫧 评价

- 介绍如何配置 VSCode，让 Emmet 语法支持 JSX。
- JSX 是在 React 中用于描述页面结构的 JS 扩展语法。

## 3. 💻 具体配置流程

### 3.1. 【做法 1】通过设置面板来配置

1. 打开 VSCode 设置
2. 搜索 `emmet.includeLanguages`
3. 加上 `"javascript": "javascriptreact"` 键值对

![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-50-59.png)

### 3.2. 【做法 2】通过配置文件 `.vscode/settings.json` 来配置

在项目的根目录创建 `.vscode/settings.json` 文件，添加如下内容：

```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## 4. 💻 demos.1 - 在 vscode 中，让 Emmet 语法支持 JSX

::: swiper

![示例](./assets/1.gif)

:::

- 输入：`div>span`
  - ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-52-57.png)
  - 按下回车，将会快速生成：`<div><span></span></div>`
  - ![图 2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-23-21-53-18.png)
- 输入：`.foo`
  - 按下回车，将会快速生成：`<div className="foo"></div>`

## 5. 🔗 引用

- [Medium - Enable Emmet support for JSX in Visual Studio Code | React][1]
- [stackoverflow - Configure Emmet for JSX in VSCode][2]

[1]: https://eshwaren.medium.com/enable-emmet-support-for-jsx-in-visual-studio-code-react-f1f5dfe8809c
[2]: https://stackoverflow.com/questions/56311467/configure-emmet-for-jsx-in-vscode
