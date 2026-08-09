# [0366. 本地 Playground 环境搭建](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0366.%20%E6%9C%AC%E5%9C%B0%20Playground%20%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. templates/demos](#2-templatesdemos)
  - [2.1. 目录 1 中的内容](#21-目录-1-中的内容)
  - [2.2. 目录 2 中的内容](#22-目录-2-中的内容)
- [3. templates/playgrounds](#3-templatesplaygrounds)

<!-- endregion:toc -->

## 1. 本节内容

- 本地 react Playground 环境搭建说明

你可以在 `TNotes.react` 根目录下看到一个名为 `templates` 的文件夹，这个文件夹里面存放的就是最基础的模板文件。

所有的临时测试案例，都可以在 `templates/playgrounds` 目录下进行测试。

## 2. templates/demos

最简化模板：

- 目录 `1`：vite v7 + react v19 + js
- 目录 `2`：vite v7 + react v19 + ts

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-12-25-10-15-18.png)

### 2.1. 目录 1 中的内容

::: code-group

```jsx [src/main.jsx]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  return <h1>Hello World</h1>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

```json [package.json]
{
  "name": "demo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.1",
    "vite": "^7.2.4"
  }
}
```

```js [vite.config.js]
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

:::

### 2.2. 目录 2 中的内容

::: code-group

```tsx [src/main.tsx]
import { createRoot } from 'react-dom/client'

function App() {
  return <h1>Hello World</h1>
}

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root container missing in index.html')
}

createRoot(root).render(<App />)
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo-ts</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

```json [package.json]
{
  "name": "demo-ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "typescript": "^5.7.3",
    "vite": "^7.2.4"
  }
}
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

:::

## 3. templates/playgrounds

![img](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-12-25-10-04-56.png)

playgrounds 目录中的内容是直接从 demos 目录中复制过来的：

- 如果要 react-js 模板，从目录 demos/1 中复制
- 如果需要 react-ts 模板，从目录 demos/2 中复制

临时测试的时候，不需要过分去 care 模块化的问题，可以先将所有测试代码封装在 main.jsx 或 main.tsx 中，将测试逻辑集中在一个单文件中。

测试完之后，也只需要将几个核心文件内容拷贝到对应笔记中即可，以便需要的时候可以随时复用。

注意：由于 `templates/playgrounds` 是本地搭建的临时测试环境，这里边儿的内容会经常变化，没必要同步到 git 仓库。在 `.gitignore` 文件中，已经将 `templates/playgrounds` 目录忽略掉了，所以在这里测试的内容是不会被提交到远程仓库中的。

```bash
# .gitignore
# 忽略本地的 Playground 环境
/templates/playgrounds

# 如果不想要将实验示例套在 templates 目录下，也可以丢到根目录，然后加上忽略规则：
playgrounds
```
