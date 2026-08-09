# [0149. 【AI】常见的基础项目目录结构解析](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0149.%20%E3%80%90AI%E3%80%91%E5%B8%B8%E8%A7%81%E7%9A%84%E5%9F%BA%E7%A1%80%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 提示词](#2-提示词)
- [3. 使用 Vite 创建的 React 项目目录结构是怎样的？](#3-使用-vite-创建的-react-项目目录结构是怎样的)
- [4. 各个目录和文件的作用是什么？](#4-各个目录和文件的作用是什么)
- [5. 如何组织大型项目的目录结构？](#5-如何组织大型项目的目录结构)
- [6. 常见的目录命名规范有哪些？](#6-常见的目录命名规范有哪些)
- [7. 如何处理静态资源文件？](#7-如何处理静态资源文件)
- [8. 总结](#8-总结)
- [9. 引用](#9-引用)

<!-- endregion:toc -->

## 1. 本节内容

- Vite + React 项目的默认目录结构
- 各个目录和文件的职责
- 大型项目的目录组织方案
- 目录命名规范
- 静态资源的管理

我们在实际开发 React 项目时，往往不会直接通过一个简单的 `.html` 文件去创建一个项目，而是借助一些构建工具来搭建一个真实的工程文件夹，这个文件夹的具体内容涉及到的知识点不仅限于 React。

这篇笔记记录了 AI 的回复，目的是让你先大概知道实际的项目结构大概是长什么样的，知道真实开发往往不是一个 `.html` 去实现的。

## 2. 提示词

```
我正在学习 React

我看到有些教程中的示例都很简单
通过一个简单的 .html 文件 + CDN 引入相关 React 资源就可以把一个 React 程序跑起来了

真实的项目开发也是这样的吗？
你能介绍一下真实企业级 React 项目的基本结构吗？
```

## 3. 使用 Vite 创建的 React 项目目录结构是怎样的？

使用 `npm create vite@latest` 创建的基础项目结构：

```txt
my-react-app/
├── node_modules/          # 依赖包目录
├── public/                # 静态资源目录
│   └── vite.svg          # 静态图标
├── src/                   # 源代码目录
│   ├── assets/           # 资源文件
│   │   └── react.svg
│   ├── App.css           # App 组件样式
│   ├── App.jsx           # App 根组件
│   ├── index.css         # 全局样式
│   └── main.jsx          # 应用入口文件
├── .gitignore            # Git 忽略配置
├── eslint.config.js      # ESLint 配置
├── index.html            # HTML 入口文件
├── package.json          # 项目配置文件
├── package-lock.json     # 依赖锁定文件
├── README.md             # 项目说明文档
└── vite.config.js        # Vite 配置文件
```

目录结构的特点：

- 结构简单清晰，适合小型项目
- `src` 目录存放所有源代码
- `public` 目录存放不需要编译的静态资源
- 配置文件都在根目录

## 4. 各个目录和文件的作用是什么？

详细说明：

| 目录/文件          | 作用                | 注意事项                   |
| ------------------ | ------------------- | -------------------------- |
| `node_modules/`    | 存放所有 npm 依赖包 | 不应提交到 Git，体积巨大   |
| `public/`          | 存放静态资源        | 文件会被直接复制到构建目录 |
| `src/`             | 源代码目录          | 所有开发代码都在这里       |
| `src/assets/`      | 需要构建处理的资源  | 图片、字体等会被优化处理   |
| `src/main.jsx`     | 应用入口文件        | 负责渲染根组件到 DOM       |
| `src/App.jsx`      | 根组件              | 应用的主要组件树入口       |
| `index.html`       | HTML 模板           | Vite 的入口 HTML 文件      |
| `vite.config.js`   | Vite 配置           | 配置构建、插件等           |
| `package.json`     | 项目配置            | 依赖、脚本、项目信息       |
| `eslint.config.js` | ESLint 配置         | 代码规范检查规则           |

关键文件内容示例：

::: code-group

```jsx [src/main.jsx]
// 应用入口
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

```html [index.html]
<!-- HTML 入口 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

```javascript [vite.config.js]
// Vite 配置
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

:::

## 5. 如何组织大型项目的目录结构？

推荐的大型项目目录结构：

```txt
my-react-app/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── api/                    # API 接口
│   │   ├── user.js
│   │   └── product.js
│   ├── assets/                 # 静态资源
│   │   ├── images/
│   │   ├── fonts/
│   │   └── styles/
│   │       ├── variables.css
│   │       └── global.css
│   ├── components/             # 公共组件
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js
│   │   └── Modal/
│   │       ├── Modal.jsx
│   │       ├── Modal.module.css
│   │       └── index.js
│   ├── features/               # 功能模块（按业务划分）
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── index.js
│   │   └── dashboard/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── index.js
│   ├── hooks/                  # 自定义 Hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── layouts/                # 布局组件
│   │   ├── MainLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── pages/                  # 页面组件
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   └── About/
│   │       ├── About.jsx
│   │       └── About.module.css
│   ├── routes/                 # 路由配置
│   │   ├── index.jsx
│   │   └── routes.jsx
│   ├── store/                  # 状态管理
│   │   ├── slices/
│   │   │   ├── userSlice.js
│   │   │   └── productSlice.js
│   │   └── index.js
│   ├── utils/                  # 工具函数
│   │   ├── format.js
│   │   └── validation.js
│   ├── constants/              # 常量
│   │   ├── api.js
│   │   └── config.js
│   ├── types/                  # TypeScript 类型定义
│   │   └── user.ts
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.development            # 开发环境变量
├── .env.production             # 生产环境变量
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

目录组织的核心原则：

| 原则       | 说明                 | 示例                           |
| ---------- | -------------------- | ------------------------------ |
| 按功能分组 | 相关代码放在一起     | 组件、样式、测试放在同一目录   |
| 扁平化结构 | 避免过深的嵌套       | 最多 3-4 层目录                |
| 单一职责   | 每个目录有明确的职责 | `components` 只放公共组件      |
| 可扩展性   | 便于添加新功能       | 使用 `features` 目录按业务划分 |

按功能模块组织的示例：

```txt
features/
├── auth/                       # 认证功能模块
│   ├── components/            # 该功能的组件
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── hooks/                 # 该功能的 Hooks
│   │   └── useAuth.js
│   ├── services/              # 该功能的 API
│   │   └── authService.js
│   ├── store/                 # 该功能的状态
│   │   └── authSlice.js
│   └── index.js               # 统一导出
```

## 6. 常见的目录命名规范有哪些？

目录命名规范：

| 目录类型 | 命名规范                 | 示例                     |
| -------- | ------------------------ | ------------------------ |
| 页面目录 | PascalCase（首字母大写） | `Home/`、`UserProfile/`  |
| 组件目录 | PascalCase               | `Button/`、`UserCard/`   |
| 工具目录 | camelCase（小驼峰）      | `utils/`、`helpers/`     |
| 配置目录 | camelCase 或 kebab-case  | `config/`、`api-config/` |
| 功能模块 | camelCase                | `auth/`、`dashboard/`    |

文件命名规范：

| 文件类型 | 命名规范                   | 示例                               |
| -------- | -------------------------- | ---------------------------------- |
| 组件文件 | PascalCase                 | `Button.jsx`、`UserCard.jsx`       |
| 工具文件 | camelCase                  | `formatDate.js`、`validation.js`   |
| 配置文件 | camelCase 或 kebab-case    | `apiConfig.js`、`eslint.config.js` |
| 样式文件 | 与组件同名                 | `Button.module.css`                |
| 测试文件 | 与被测试文件同名 + `.test` | `Button.test.jsx`                  |
| 类型文件 | camelCase + `.d.ts`        | `user.d.ts`                        |

索引文件的使用：

```javascript
// components/Button/index.js
// 用于简化导入路径

export { default } from './Button'
export * from './Button'

// 使用时
import Button from '@/components/Button' // ✅ 简洁
// 而不是
import Button from '@/components/Button/Button' // ❌ 冗余
```

## 7. 如何处理静态资源文件？

静态资源的两种存放方式：

| 存放位置      | 特点                     | 适用场景         | 示例                        |
| ------------- | ------------------------ | ---------------- | --------------------------- |
| `public/`     | 不经过构建处理，直接复制 | 不需要优化的资源 | `favicon.ico`、`robots.txt` |
| `src/assets/` | 经过构建处理，会被优化   | 需要优化的资源   | 图片、字体、SVG             |

使用 `public/` 目录：

```jsx
// public/logo.png
// 访问方式：使用绝对路径
<img src="/logo.png" alt="Logo" />

// 特点：
// 1. URL 不会改变
// 2. 不会被打包工具处理
// 3. 直接从根路径访问
```

使用 `src/assets/` 目录：

```jsx
// src/assets/images/logo.png
// 方式 1：直接导入
import logo from '@/assets/images/logo.png'

function App() {
  return <img src={logo} alt="Logo" />
}

// 方式 2：动态导入
function App() {
  const [image, setImage] = useState(null)

  useEffect(() => {
    import('@/assets/images/logo.png').then((module) => {
      setImage(module.default)
    })
  }, [])

  return image && <img src={image} alt="Logo" />
}

// 特点：
// 1. 文件名会添加 hash（如 logo.abc123.png）
// 2. 小于 4KB 的图片会转为 base64
// 3. 可以利用浏览器缓存
```

图片资源的组织示例：

```txt
src/assets/
├── images/
│   ├── common/                 # 公共图片
│   │   ├── logo.png
│   │   └── avatar-default.png
│   ├── icons/                  # 图标
│   │   ├── close.svg
│   │   └── menu.svg
│   └── backgrounds/            # 背景图
│       └── hero.jpg
├── fonts/                      # 字体文件
│   ├── Roboto-Regular.woff2
│   └── Roboto-Bold.woff2
└── styles/                     # 样式资源
    ├── variables.css
    └── mixins.css
```

SVG 的两种使用方式：

::: code-group

```jsx [作为图片]
import logo from '@/assets/icons/logo.svg'

function App() {
  return <img src={logo} alt="Logo" />
}
```

```jsx [作为组件]
// 需要 vite-plugin-svgr
import { ReactComponent as Logo } from '@/assets/icons/logo.svg'

function App() {
  return <Logo className="logo-icon" />
}
```

:::

配置路径别名简化导入：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
})

// 使用别名
import Button from '@components/Button'
import logo from '@assets/images/logo.png'
import { formatDate } from '@utils/format'
```

## 8. 总结

本笔记详细讲解了 React 项目的目录结构和组织方式，帮助开发者建立良好的项目架构。

- 合理的目录结构是项目可维护性的基础
- 不同规模的项目需要不同的目录组织方式
- 遵循统一的命名规范可以提高团队协作效率
- 静态资源的合理管理能提升项目性能

## 9. 引用

- [Vite 静态资源处理][1]
- [React 项目结构最佳实践][2]
- [前端项目目录规范][3]
- [Bulletproof React 项目结构][4]

[1]: https://vitejs.dev/guide/assets.html
[2]: https://react.dev/learn/thinking-in-react
[3]: https://github.com/elsewhencode/project-guidelines
[4]: https://github.com/alan2207/bulletproof-react
