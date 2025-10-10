import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 实现一个计数器
let num = 0

setInterval(() => {
  // ❌ 错误做法：直接修改 react element —— counter 的属性值。
  const counter = <span>{num}</span>
  console.log(counter)

  counter.props.children++ // [!code error]
  // ❌ 报错：Uncaught TypeError: Cannot assign to read only property 'children' of object '#<Object>'

  createRoot(document.getElementById('root')).render(
    <StrictMode>计数器：{counter}</StrictMode>
  )
}, 1000)
