import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 实现一个计数器
let num = 0

setInterval(() => {
  // ✅ 正确做法：可以在更新 num 的值之后，重新创建一个新的 react element —— counter，然后渲染新的 counter。
  num++
  const counter = <span>{num}</span>
  createRoot(document.getElementById('root')).render(
    <StrictMode>计数器：{counter}</StrictMode>
  )
}, 1000)
