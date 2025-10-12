import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ✨
const DivComp = () => {
  return <div>this is a div comp</div>
}
/*
标准函数组件写法（大驼峰命名）
推荐引用方式：<DivComp />
{DivComp()} 在条件渲染中可用
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 正确写法： */}
    <DivComp /> {/* ✨ 推荐写法 */}
    {condition && DivComp()} {/* 条件渲染场景 */}
  </StrictMode>
)
