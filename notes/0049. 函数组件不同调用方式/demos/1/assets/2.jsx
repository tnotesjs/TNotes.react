import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function MyFuncComp(props) {
  console.log('received props:', props)
  return <div>hello world</div>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>{MyFuncComp({ a: '1', b: 2, c: true, d: false })}</StrictMode>
)
/*
不推荐的写法：直接函数调用

这种写法是将 MyFuncComp 视作一个普通的函数调用，而不是 React 组件。
非特殊情况，通常不会有人这么写（如果你不想收到来自你同事的亲切问候）。

【1】绕过 React 渲染机制：
- 直接函数调用会执行组件函数，但不会创建 React 组件实例。
- 这种方式虽然可以工作，但绕过了 React 的核心特性，容易引发不可预见的问题。

【2】缺乏调试支持：
- React DevTools 无法追踪直接函数调用的组件树，导致无法查看组件树或调试组件状态。

【3】命名和使用约定：
- 如果我们想要表达“这是一个组件”，应该采用大驼峰命名法（PascalCase），并使用 JSX 渲染它。
- 如果我们想要表达“这是一个普通函数”，则不应该使用大驼峰命名法，而是直接调用它。
*/
