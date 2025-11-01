# [0146. Git 版本控制基础](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0146.%20Git%20%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 为什么 React 项目需要版本控制？](#3--为什么-react-项目需要版本控制)
- [4. 🤔 Git 的基本工作流程是什么？](#4--git-的基本工作流程是什么)
- [5. 🤔 如何初始化一个 Git 仓库？](#5--如何初始化一个-git-仓库)
- [6. 🤔 如何暂存和提交代码？](#6--如何暂存和提交代码)
- [7. 🤔 其他常见的 git 命令操作都有哪些？](#7--其他常见的-git-命令操作都有哪些)
  - [7.1. 查看提交历史](#71-查看提交历史)
  - [7.2. 创建和切换分支](#72-创建和切换分支)
  - [7.3. 合并分支](#73-合并分支)
  - [7.4. 连接远程仓库](#74-连接远程仓库)
  - [7.5. 推送和拉取代码](#75-推送和拉取代码)
- [8. 🤔 .gitignore 文件的作用是什么？](#8--gitignore-文件的作用是什么)
- [9. 💻 React 项目的完整 Git 工作流示例](#9--react-项目的完整-git-工作流示例)
- [10. 💻 项目开发过程中的一些常见工作场景](#10--项目开发过程中的一些常见工作场景)
- [11. 🔗 引用](#11--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- Git 版本控制的重要性
- Git 基本工作流程
- 常用 Git 命令
- 分支管理
- 远程仓库操作
- React 项目中的 Git 实践

## 2. 🫧 评价

本笔记介绍了 Git 版本控制的基础知识，对于 React 开发者来说，掌握 Git 是团队协作的必备技能。

- 版本控制不是可选项，而是现代前端开发的标配，建议从项目第一行代码开始就使用 Git
- 在实际开发中，分支策略（如 Git Flow）能够让多人协作更加顺畅
- 养成频繁提交、编写清晰提交信息的习惯，能够帮助团队追踪问题和代码变更
- 对于 React 项目，务必正确配置 `.gitignore`，避免将 `node_modules` 等目录提交到仓库

在 tnotesjs 组织中有一个 TNotes.git-notes 知识库，这里边儿会纪录有关 Git 的更多详细说明。

## 3. 🤔 为什么 React 项目需要版本控制？

- 代码历史追踪
  - 记录每次修改的内容、时间和作者
  - 可以随时回退到之前的任何版本
  - 方便查找 bug 是在哪次提交中引入的
- 团队协作
  - 多人可以同时开发不同功能
  - 通过分支隔离不同的开发任务
  - 冲突解决机制保证代码的完整性
- 备份与恢复
  - 代码存储在远程仓库，避免本地丢失
  - 误删文件可以轻松恢复
- 持续集成与部署
  - 配合 CI/CD 工具实现自动化构建和部署
  - 基于特定分支或标签触发部署流程

## 4. 🤔 Git 的基本工作流程是什么？

Git 的工作流程可以简化为以下几个阶段：

```mermaid
graph TB
    A[工作区<br/>Working Directory] -->|git add| B[暂存区<br/>Staging Area]
    B -->|git commit| C[本地仓库<br/>Local Repository]
    C -->|git push| D[远程仓库<br/>Remote Repository]
    D -->|git pull| A
```

- 工作区（Working Directory）
  - 你实际编辑代码的目录
  - 包含项目的所有文件和文件夹
- 暂存区（Staging Area / Index）
  - 临时存储即将提交的修改
  - 使用 `git add` 将修改添加到暂存区
- 本地仓库（Local Repository）
  - 存储项目完整的历史记录
  - 使用 `git commit` 将暂存区的内容提交到本地仓库
- 远程仓库（Remote Repository）
  - 托管在 GitHub、GitLab 等平台
  - 使用 `git push` 推送到远程，使用 `git pull` 拉取更新

## 5. 🤔 如何初始化一个 Git 仓库？

在 React 项目根目录下执行：

```bash
# 初始化 Git 仓库
git init

# 查看当前状态
git status
```

执行 `git init` 后，Git 会在项目根目录创建一个隐藏的 `.git` 文件夹，用于存储版本控制信息。

如果使用 `create-react-app` 或 `vite` 创建项目，通常会自动初始化 Git 仓库。

## 6. 🤔 如何暂存和提交代码？

```bash
# 查看文件状态
git status

# 添加单个文件到暂存区
git add src/App.jsx

# 添加所有修改到暂存区
git add .

# 提交到本地仓库
git commit -m "feat: 添加用户登录功能"

# 添加并提交（合并操作）
git commit -am "fix: 修复按钮点击 bug"
```

提交信息规范建议：

- `feat: 新功能`
- `fix: 修复 bug`
- `docs: 文档更新`
- `style: 代码格式调整`
- `refactor: 重构代码`
- `test: 测试相关`
- `chore: 构建或辅助工具变动`

如果团队开发规范明确了具体的 commit message 规范要求，按照团队开发规范要求来走即可。

## 7. 🤔 其他常见的 git 命令操作都有哪些？

### 7.1. 查看提交历史

```bash
# 查看完整提交历史
git log

# 查看简洁版本（推荐）
git log --oneline

# 查看最近 5 条提交
git log -5

# 查看图形化分支历史
git log --oneline --graph --all

# 查看某个文件的修改历史
git log src/App.jsx
```

### 7.2. 创建和切换分支

```bash
# 查看所有分支
git branch

# 创建新分支
git branch feature-login

# 切换到指定分支
git checkout feature-login

# 创建并切换到新分支（推荐）
git checkout -b feature-login

# Git 2.23+ 新命令（更直观）
git switch feature-login
git switch -c feature-login
```

分支命名建议：

- `main` / `master` - 主分支
- `develop` - 开发分支
- `feature/功能名` - 功能分支
- `bugfix/问题描述` - 修复分支
- `hotfix/紧急修复` - 紧急修复分支

### 7.3. 合并分支

```bash
# 切换到目标分支（如 main）
git checkout main

# 合并指定分支到当前分支
git merge feature-login

# 如果有冲突，需要手动解决后提交
git add .
git commit -m "merge: 合并 feature-login 分支"

# 删除已合并的分支
git branch -d feature-login

# 强制删除分支（即使未合并）
git branch -D feature-login
```

### 7.4. 连接远程仓库

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/username/repo.git

# 或使用 SSH
git remote add origin git@github.com:username/repo.git

# 修改远程仓库地址
git remote set-url origin https://github.com/username/new-repo.git

# 删除远程仓库
git remote remove origin
```

也可以直接修改 `.git/config` 配置文件。

### 7.5. 推送和拉取代码

```bash
# 推送到远程仓库
git push origin main

# 首次推送，设置上游分支
git push -u origin main

# 之后可以简写为
git push

# 拉取远程更新
git pull origin main

# 拉取并变基（保持提交历史整洁）
git pull --rebase origin main

# 获取远程更新但不合并
git fetch origin
```

## 8. 🤔 .gitignore 文件的作用是什么？

`.gitignore` 用于指定 Git 应该忽略的文件和目录，避免将不必要的文件提交到仓库。

React 项目典型的 `.gitignore` 配置：

<<< ./assets/1.gitignore

## 9. 💻 React 项目的完整 Git 工作流示例

假设你正在开发一个 React 项目，以下是一个完整的工作流示例：

<<< ./assets/1.bash

## 10. 💻 项目开发过程中的一些常见工作场景

::: code-group

<<< ./assets/2.bash [1]

<<< ./assets/3.bash [2]

<<< ./assets/4.bash [3]

<<< ./assets/5.bash [4]

<<< ./assets/6.bash [5]

<<< ./assets/7.bash [6]

<<< ./assets/8.bash [7]

:::

## 11. 🔗 引用

- [Git 官方文档][1]
- [GitHub Docs - Git 基础][2]
- [Pro Git 电子书（中文版）][3]
- [Git 可视化学习工具][4]
- [常用 Git 命令清单][5]

[1]: https://git-scm.com/doc
[2]: https://docs.github.com/zh/get-started/using-git/about-git
[3]: https://git-scm.com/book/zh/v2
[4]: https://learngitbranching.js.org/?locale=zh_CN
[5]: https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html
