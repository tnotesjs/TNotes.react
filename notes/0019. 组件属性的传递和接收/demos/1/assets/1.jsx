import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'

// 函数组件
function FuncComp(props) {
  // 在函数组件中，属性会自动注入到函数组件的第一个参数中。
  console.log('FunComp props:', props)
  return <div>函数组件</div>
}

// 类组件
class ClassComp extends Component {
  render() {
    // 在类组件中，可以通过 this.props 获取属性
    console.log('ClassComp props:', this.props)
    return <div>类组件</div>
  }
}

function App() {
  return (
    <>
      {/* props 的值是非常灵活的，使用 jsx {} 语法，你可以传递任意类型的值
      比如：
        数字 - 123
        字符串 - 'abc'
        对象 - { foo: 1, bar: 2 } */}
      <FuncComp a={123} b={'abc'} c={{ foo: 1, bar: 2 }} />
      <ClassComp aa={123} bb={'abc'} cc={{ foo: 1, bar: 2 }} />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
