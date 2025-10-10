import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ✅ 解决办法1：在外层包裹一个 div 元素作为根节点。
const divContainer = (
  <div>
    <div>div 1</div>
    <div>div 2</div>
    <div>div 3</div>
  </div>
)
// 这种做法虽然在此 demo 中能够避免报错，并且能够正常渲染出 div 1、div 2、div 3，但是在实际的开发中，却未必能够顺利解决你的需求。
// 因为这种法子破坏了元素结构，在外层多套了一个实际的元素 div。
// 如果你既想成功渲染 3 个 div，又不想破坏元素结构，那么可以考虑使用 React.Fragment。

const root = createRoot(document.getElementById('root'))

root.render(<StrictMode>{divContainer}</StrictMode>)
