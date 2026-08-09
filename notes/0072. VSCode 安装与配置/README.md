# [0072. VSCode 安装与配置](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0072.%20VSCode%20%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. VSCode 是什么？](#2-vscode-是什么)
- [3. 如何安装 VSCode？](#3-如何安装-vscode)
- [4. 如何汉化？](#4-如何汉化)
- [5. 推荐安装哪些插件呢？](#5-推荐安装哪些插件呢)
- [6. 引用](#6-引用)

<!-- endregion:toc -->

## 1. 本节内容

- VSCode 简介
- VSCode 安装
- VSCode 汉化

VSCode 就是一个编辑器，没啥好说的，装好一些必要的插件，然后就可以准备开始写代码了。

该笔记只纪录了 VSCode 最基础的安装和配置（汉化），若想要了解 VSCode 详情的话，可以瞅瞅 tnotesjs 组织下的 [TNotes.vscode][3] 知识库，这里边儿会纪录有关 VSCode 的更多内容。

::: tip 💡 使用建议

- 编辑器选择：不一定非得是 VSCode，比如 Cursor、Kiro、…… 等等，也都是可以的，它们很多都是基于 VSCode 二次开发而来。
- 编辑器配置：不要一开始就去学习 VSCode 的复杂配置，等你在使用过程中发现一些痛点之后，可以再去翻一翻 VSCode 的官方文档，支持的配置项有很多，大概率是可以通过配置或者一些社区的插件来解决你的痛点问题的。
- 真遇到了一些必须要解决的环境问题时，可以向 AI 描述你的问题，并寻求解决方案，可以自行手动处理，或者直接让 Agent 处理，比如：
  - 帮你修改好配置（Agent 会自行去修改 `settings.json` 这个 VSCode 的配置文件）
  - 帮你安装好必要的插件，VSCode 本身是内置了对应的 `code --install-extension <扩展ID>` 命令来快速安装插件的。

:::

## 2. VSCode 是什么？

Visual Studio Code（简称 VSCode）是由微软开发并开源的免费代码编辑器，支持 Windows、macOS 和 Linux 系统。它具有轻量、快速、可扩展的特点，内置 Git 支持、智能代码补全、语法高亮、调试功能等，通过丰富的插件生态可以支持几乎所有主流编程语言和开发框架。

## 3. 如何安装 VSCode？

直接上 [VSCode 官网][2] 安装即可。

安装过程全程下一步即可。

## 4. 如何汉化？

打开 VSCode 后，使用快捷键 `Ctrl+Shift+X`（Mac 用户使用 `Cmd+Shift+X`）打开扩展面板

在搜索框中输入“Chinese”或“中文”

找到“Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code”扩展：

![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-17-16-30-47.png)

- 点击安装按钮进行安装
- 安装完成后，重启 VSCode
- 重启后界面就会变成中文显示

如果你想要切换为英文，可以使用 `Ctrl+Shift+P`（Mac 用户使用 `Cmd+Shift+P`）打开命令面板，输入“Configure Display Language”来手动切换语言。

![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-17-16-32-14.png)

## 5. 推荐安装哪些插件呢？

因人而异，具体得看你的需求，后面在介绍到相关技术栈的时候，如果有对应的插件需要安装的话，会在笔记中记录和介绍。

::: tip 💡 建议

你可以让 AI 给你推荐一些插件，输入提示词：“我刚安装好了 VSCode，接下来我准备学习 React，请给我推荐一些好用的 VSCode 插件。”

:::

## 6. 引用

- [vscode 官网][2]
- [vscode 中文网][1]
- [TNotes.vscode][3]

[1]: https://vscode.js.cn/
[2]: https://code.visualstudio.com/
[3]: https://tnotesjs.github.io/TNotes.vscode/
