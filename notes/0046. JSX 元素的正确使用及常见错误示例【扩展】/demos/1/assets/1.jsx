import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const divEle = <div>this is a div element</div> // ✨
/*
常见写法：将 JSX 元素赋值给变量

正确引用方式：{divEle}

注意：这不是组件，不能使用 <divEle /> 方式引用

React 通过首字母大小写区分元素类型：
  小写开头：内置 HTML 元素
  大写开头：自定义组件
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 正确写法： */}
    {divEle} {/* ✨ 推荐写法 */}
    {/* ❌ 错误写法： */}
    {/* <divEle /> */}
    {/* 报错：
    Warning: <divEle /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
    警告：<divEle /> 使用了错误的大小写，应该使用 PascalCase（大驼峰）来定义 React 组件，或者使用小写来定义 HTML 元素。 */}
  </StrictMode>
)
