import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const DivEle2 = <div>this is a div element 2</div>
/*
不推荐写法：将 JSX 元素赋值给大写变量
技术上可行：{DivEle2} 能渲染
但会误导 React 将其识别为组件类型
应避免这种命名方式 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 技术可行但不推荐： */}
    {DivEle2} {/* 应避免 */}
    {/* ❌ 错误写法： */}
    {/* <DivEle2 /> */}
    {/* 报错：
    Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: <div />. Did you accidentally export a JSX literal instead of a component?
    React.jsx: type 是无效的 -- 预期应该是一个字符串（用于内置组件）或一个类/函数（用于组合组件），但实际是：<div />。 您是否意外导出了一个 JSX 引用，而不是一个组件？

    Uncaught Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
    未捕获的错误：元素类型无效：期望的是字符串（对于内置组件）或类/函数（对于复合组件），但得到了对象。
    */}
  </StrictMode>
)
