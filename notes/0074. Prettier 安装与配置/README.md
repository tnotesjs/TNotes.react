# [0074. Prettier 安装与配置](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0074.%20Prettier%20%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. prettier 是什么？](#2-prettier-是什么)
- [3. prettier 官方文档是？](#3-prettier-官方文档是)
- [4. 如何安装 prettier？](#4-如何安装-prettier)
- [5. 如何在 VS Code 中配置 Prettier 为默认格式化工具?](#5-如何在-vs-code-中配置-prettier-为默认格式化工具)
- [6. VSCode 中格式化的快捷方式是？](#6-vscode-中格式化的快捷方式是)
- [7. prettier 和 eslint 之间的区别是？](#7-prettier-和-eslint-之间的区别是)
- [8. 如何快速在线体验 prettier 的功能？](#8-如何快速在线体验-prettier-的功能)
- [9. prettier 的配置文件是？](#9-prettier-的配置文件是)
- [10. prettier 的常用配置主要都有哪些？](#10-prettier-的常用配置主要都有哪些)
- [11. 如何配置保存时自动格式化?](#11-如何配置保存时自动格式化)
- [12. 引用](#12-引用)

<!-- endregion:toc -->

## 1. 本节内容

- prettier 简介
- prettier 的安装
- prettier 的配置
- 在 VSCode 中开启保存自动格式化功能
- prettier Playground

安装好 VSCode 插件 [Prettier - Code formatter][1]，完成基本的配置，接下来编写 React 代码，你只管写就行了，格式的问题交给 prettier 去做即可。

## 2. prettier 是什么？

prettier 是一个代码格式化工具，支持多种编程语言的代码美化，可用于统一团队代码风格。

这一类工具主要解决的问题是：

- 自动格式化代码，保持统一风格
- 减少代码审查时的格式争议
- 提高开发效率，避免手动调整代码格式的繁琐工作

## 3. prettier 官方文档是？

- [prettier 官方文档][3]，你可以在这里查看 prettier 的具体使用说明。

## 4. 如何安装 prettier？

- 在 VSCode 扩展市场搜索 [Prettier - Code formatter][1]
- 点击安装即可
- 或使用命令 `npm install -g prettier` 全局安装

## 5. 如何在 VS Code 中配置 Prettier 为默认格式化工具?

- 打开 VSCode 设置（Ctrl/Cmd + ,）
- 搜索 "default formatter"
- 选择 "Prettier - Code formatter" 作为默认格式化工具
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-17-16-55-16.png)
- 或在项目中创建 `.vscode/settings.json` 文件配置

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 6. VSCode 中格式化的快捷方式是？

- Windows/Linux：`Shift + Alt + F`
- Mac：`Shift + Option + F`

## 7. prettier 和 eslint 之间的区别是？

- Prettier 专注于代码格式化
- ESLint 专注于代码质量和潜在错误检测
- 两者可以配合使用，功能互补

## 8. 如何快速在线体验 prettier 的功能？

- [prettier playground][4]
- 核心功能：
  - 支持可视化的配置
  - 导出 json 配置
  - 在线体验配置的效果
  - ……
- ![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-17-17-10-57.png)

## 9. prettier 的配置文件是？

prettier 的配置信息可以写在很多地方，比如以下这些文件：

- `.prettierrc` 或 `.prettierrc.json`
- `prettier.config.js`
- `package.json`
- ……

这部分的具体细节可以查阅 [prettier 官方文档][3]，只要 prettier 会去解析，你想写哪都行。

## 10. prettier 的常用配置主要都有哪些？

```js
// prettier.config.js
module.exports = {
  semi: false, // 不在语句末尾添加分号
  singleQuote: true, // 使用单引号而不是双引号
  tabWidth: 2, // 缩进宽度为2个空格
  useTabs: false, // 使用空格而不是tab缩进
  trailingComma: "es5", // 在ES5允许的地方添加尾随逗号
};
```

::: tip 💡 个人配置

默默打开了自己的 prettier 配置，发现原来就配了俩字段：

```json
{
  "semi": false,
  "singleQuote": true
}
```

其它全都用的默认配置。

:::

## 11. 如何配置保存时自动格式化?

在 VSCode 设置中启用“Format On Save”，或在 `.vscode/settings.json` 中添加配置:

```json
{
  "editor.formatOnSave": true
}
```

## 12. 引用

- [Prettier - Code formatter -- VSCode 插件][1]
- [prettier 官网][2]
- [prettier 官方文档][3]
- [prettier playground][4]
- [prettier github][5]

[1]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[2]: https://prettier.io/
[3]: https://prettier.io/docs/
[4]: https://prettier.io/playground/
[5]: https://github.com/prettier/prettier
