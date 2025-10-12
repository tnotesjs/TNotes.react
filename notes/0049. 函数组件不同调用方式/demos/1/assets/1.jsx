import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function MyFuncComp(props) {
  console.log('received props:', props)
  return <div>hello world</div>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyFuncComp a="1" b={2} c />
  </StrictMode>
)
/*
推荐的写法：JSX 渲染组件
这种写法会被 React 视作一个组件。

【1】在 StrictMode 中，组件函数会被额外调用一次（仅开发环境）：
- 额外调用的目的是帮助开发者排查一些潜在的问题，比如副作用（side effects）或不安全的生命周期方法。
- 详情可查阅官方文档对 StrictMode 的描述：https://react.dev/reference/react/StrictMode
- 普通函数调用不会触发这种双重调用机制，因此无法通过 StrictMode 检测到潜在问题。

【2】React 调试工具（如 React DevTools）支持：
- 在 React DevTools 中，能够检测到 React 组件的存在，并解析出组件树。
- 普通函数调用不会被 React DevTools 检测到，这意味着无法使用调试工具提供的功能。

【3】传递属性的方式：
- 传递属性的时候，采用组件的方式传递属性，而非函数调用的形式来传递参数。
- 属性会自动封装成一个 props 对象传递给组件。
- 这种方式更符合 React 的设计哲学，便于维护和扩展。
*/
