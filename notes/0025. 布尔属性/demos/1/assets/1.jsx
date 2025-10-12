import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function App(props) {
  // console.log(props)
  return <p>props.boolProp: {props.boolProp + ''}</p>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App boolProp />
    {/* 这是一种布尔属性的简写形式，相当于 boolProp={true} */}
    <App boolProp={true} />
    <App boolProp={false} />
  </StrictMode>
)
/* 
如果在调用某个组件时，需要传递一个布尔属性，并且值为 true，可以简写属性名，不需要写属性值。
  1. <Comp boolProp />
  2. <Comp boolProp={true} />
  上述两种写法等效。

<p>props.boolProp: {props.boolProp + ''}</p>
  注意：如果直接在页面上渲染一个 true，需要将其转为字符串类型后才能渲染出来。
    {true} 不会渲染出来。
    {'true'} 可以正常渲染。
  这里结尾的 + '' 的目的就是为了将 props.boolProp 转为一个字符串类型，确保 true 也能够正常渲染出来。
*/
