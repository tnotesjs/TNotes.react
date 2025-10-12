import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const divEle = <div>this is a div element</div>
const DivEle2 = <div>this is a div element 2</div>
const divFun = () => <div>this is a div function</div>
const DivComp = () => <div>this is a div comp</div>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ 正确写法： */}
    {divEle} {/* ✨ 推荐 */}
    {DivEle2} {/* 不推荐，名称应该改为小驼峰形式。 */}
    {divFun()} {/* 不推荐，名称应该改为大驼峰形式。 */}
    <DivComp /> {/* ✨ 推荐 */}
    {condition && DivComp()} {/* ✨ 推荐 */}
    {/* ❌ 错误写法： */}
    {/* <divEle /> */}
    {/* <DivEle2 /> */}
    {/* <divFun /> */}
    {/* {divFun} */}
  </StrictMode>
)
