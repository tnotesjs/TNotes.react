import { StrictMode, Fragment } from 'react'
import { createRoot } from 'react-dom/client'

// ✅ 解决办法1：在外层包裹一个 div 元素作为根节点。
// const divContainer = (
//   <div>
//     <div>div 1</div>
//     <div>div 2</div>
//     <div>div 3</div>
//   </div>
// )

// ✅ 解决办法3：使用 <React.Fragment> 来包裹多个根节点。
// <React.Fragment> 并不会被渲染出来，并不会破坏 html 结构。
// <React.Fragment> 是一个特殊的 react 内置组件，专门用于解决 jsx 中多个根节点的书写问题。
const divContainer = (
  <Fragment>
    <div>div 1</div>
    <div>div 2</div>
    <div>div 3</div>
  </Fragment>
)
// 从数据结构层面来看，React.Fragment 是一个 symbol 类型。
console.log(Fragment, typeof Fragment) // Symbol(react.fragment) 'symbol'
// 由此也可以得出一个结论：
// 🤔 React 组件一定都是对象类型，这句话对吗？
// 不对，比如 Fragment 这个内置组件，它就是 symbol 类型。

const root = createRoot(document.getElementById('root'))

root.render(<StrictMode>{divContainer}</StrictMode>)
