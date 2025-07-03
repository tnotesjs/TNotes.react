import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import src1 from './assets/week-1.png'
import src2 from './assets/week-2.png'
import src3 from './assets/week-3.png'
const srcs = [src1, src2, src3]

function ImageSlider() {
  const [index, setIndex] = useState(0)
  let timer = null

  // console.log('render', index, timer)
  // 在每次组件重新渲染的时候，都会执行这条打印语句。
  // 状态 index 的变化会导致组件重新渲染。
  // 每当 index 变化，timer 都会被重新赋值为 null。

  const start = () => {
    stop()
    timer = setInterval(() => {
      // console.log('change')
      setIndex((prevIndex) => (prevIndex + 1) % srcs.length)
    }, 1000)
    console.log('start', timer)
  }

  const stop = () => {
    console.log('stop', timer)
    clearInterval(timer)
  }

  useEffect(() => {
    start() // 在组件挂载后启动轮播

    return () => {
      stop() // 在组件即将被卸载时停止轮播
    }
  }, [])

  return (
    <div className="card-box" onMouseEnter={stop} onMouseLeave={start}>
      <img src={srcs[index]} alt="" />
      <p>{index}</p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImageSlider />
  </StrictMode>
)
