import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const divFun = () => <div>this is a div function</div>
/*
函数返回 JSX，但不符合组件命名规范
正确引用方式：{divFun()}
应使用大驼峰命名：DivFun

很鸡肋的一种写法
从值的层面来看 () => <div>this is a div function</div>，这是一个函数组件
从命名层面来看 divFun，这是一个 HTML 元素变量的引用。
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 正确写法： */}
    {divFun()}

    {/* ❌ 错误写法： */}
    {/* <divFun /> */}
    {/* 报错：
    Warning: <divFun /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
    警告：<divFun /> 使用了错误的大小写，应该使用 PascalCase（大驼峰）来定义 React 组件，或者使用小写来定义 HTML 元素。 */}

    {/* {divFun} */}
    {/* 报错：
    Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
    警告：函数不能作为 React 子元素。这可能是因为您返回了一个组件而不是 <Component /> 而导致。或者您可能想调用此函数，而不是返回它。 */}
  </StrictMode>
)
