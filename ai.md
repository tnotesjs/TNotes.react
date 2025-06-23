- `pnpm create` pnpm 包管理器的项目创建命令，等效于 `npm create` 或 `yarn create`
- `vite@latest`
  - `vite`: Vite 前端构建工具
  - `@latest`: 显式指定使用最新版本
- `my-react-app` 自定义项目目录名称（可按需修改）
- `--template react` 关键参数，指定使用 React 框架模板，其他可选模板包括：
  - `vanilla` (原生 JS)
  - `vue`
  - `preact`
  - `lit`
  - `svelte`

### 执行效果：

此命令会从 Vite 官方仓库拉取 React 模板（来源：[github.com/vitejs/vite/tree/main/packages/create-vite/template-react](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)），在本地创建包含基础 React 配置的项目结构。
