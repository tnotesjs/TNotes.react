# [0366. 本地 Playground 环境搭建](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0366.%20%E6%9C%AC%E5%9C%B0%20Playground%20%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. templates/demos](#3-templatesdemos)
  - [3.1. 目录 1](#31-目录-1)
  - [3.2. 目录 2](#32-目录-2)
- [4. templates/playgrounds](#4-templatesplaygrounds)

<!-- endregion:toc -->

## 1. 本节内容

- 本地 react Playground 环境搭建说明

## 2. 评价

你可以在 `TNotes.react` 根目录下看到一个名为 `templates` 的文件夹，这个文件夹里面存放的就是最基础的模板文件。

所有的临时测试案例，都可以在 `templates/playgrounds` 目录下进行测试。

## 3. templates/demos

最简化模板：

- 目录 `1`：vite v7 + react v19 + js
- 目录 `2`：vite v7 + react v19 + ts

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-12-25-10-15-18.png)

### 3.1. 目录 1

::: code-group

<<< ./demos/1/src/main.jsx

<<< ./demos/1/index.html

<<< ./demos/1/package.json

<<< ./demos/1/vite.config.js

:::

### 3.2. 目录 2

::: code-group

<<< ./demos/2/src/main.tsx

<<< ./demos/2/index.html

<<< ./demos/2/package.json

<<< ./demos/2/tsconfig.json

<<< ./demos/2/vite.config.ts

:::

## 4. templates/playgrounds

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-12-25-10-04-56.png)

playgrounds 目录中的内容是直接从 demos 目录中复制过来的，如果要 js 模板，在目录 templates/1 中测试即可，如果需要 ts 模板，在目录 templates/2 中测试即可。

临时测试的时候，不需要过分去 care 模块化的问题，可以先将所有测试代码封装在 main.jsx 或 main.tsx 中，将测试逻辑集中在一个单文件中。

测试完之后，也只需要将几个核心文件拷贝到对应笔记的 `demos.xxx` 中即可，以便需要的时候可以随时复用。

注意：由于 `templates/playgrounds` 是本地搭建的临时测试环境，这里边儿的内容会经常变化，没必要同步到 git 仓库。在 `.gitignore` 文件中，已经将 `templates/playgrounds` 目录忽略掉了，所以在这里测试的内容是不会被提交到远程仓库中的。
