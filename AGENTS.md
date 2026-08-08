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

## 约束

- 不要默认通读整个参考仓库；按主题定位相关文件后小范围阅读
- 不要把 `references/` 下的克隆内容提交进本仓库
