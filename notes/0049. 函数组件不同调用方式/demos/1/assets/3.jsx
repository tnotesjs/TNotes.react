import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function MyFuncComp(props) {
  console.log('received props:', props)
  return <div>hello world</div>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyFuncComp a="1" b={2} c />
    {MyFuncComp({ a: '1', b: 2, c: true, d: false })}
  </StrictMode>
)
