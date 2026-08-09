# AGENTS

写笔记或回答 React 相关问题时，按下面路由查阅本地资料。资料清单与拉取方式见 `references/README.md`。

## 何时读什么

- 官方文档表述、中文译文、站点内容 → `references/zh-hans.react.dev`
- 实现细节、API 行为、源码定位 → `references/react`
- 本地没有对应目录时 → 先读 `references/README.md`，按其中命令拉取后再查

## 笔记书写规范

- 笔记正文不要使用加粗（`**...**` / `__...__`）
- 不要手动修改 `<!-- region:toc -->` … `<!-- endregion:toc -->` 内的内容；目录由 `@tnotesjs/core` 自动维护
- 发现与事实不符的内容须提醒用户，并以 `references/` 中的 React 源码、官方文档（`zh-hans.react.dev`）为准核对

## Playground 实验示例

本地动手实验放在根目录 `playgrounds/`（整个目录已 gitignore，勿提交）。清单见 `playgrounds/README.md`。

- 来源：用户学习或整理笔记时，让 Agent 针对某篇笔记（或 `references/` 中）的某一段内容生成可动手验证的示例
- 分工：Agent 负责写（搭示例、补说明、落目录、更新导航）；用户负责读、微调并本地跑通
- 命名：`0001`–`9999` + 语义化英文名（如 `0001. esm-cdn-hello-world`）
- 工程模板：需要 Vite + React（JS/TS）时，优先从 `templates/demos/1`（js）或 `templates/demos/2`（ts）拷贝到 `playgrounds/` 对应目录再改；单文件 CDN 类实验除外
- 导航：在 `playgrounds/README.md` 用三列表格追加一行：实验示例｜相关笔记（无则 `-`）｜一句话简介

## 约束

- 不要默认通读整个参考仓库；按主题定位相关文件后小范围阅读
- 不要把 `references/` 下的克隆内容提交进本仓库
