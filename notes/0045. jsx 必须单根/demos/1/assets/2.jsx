import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'

// const divContainer = (
//   <div>
//     <div>div 1</div>
//     <div>div 2</div>
//     <div>div 3</div>
//   </div>
// )

// JSX 和 createElement
// 始终记住，JSX 实际上是 createElement 的简写形式，是它的语法糖。
// 我们书写的 JSX 表达式，最终都会被 babel 处理，然后得到 createElement 式的写法。
// 比如，上述的 divContainer 经过 babel 解析之后，得到的编译结果类似下面这种写法。
const divContainer = createElement(
  'div',
  {},
  createElement(
    'div',
    {},
    'div 1',
    createElement('div', {}, 'div 2', createElement('div', {}, 'div 3'))
  )
)
// 从编译结果来看，babel 编译后是一个树形结构，最外层的 createElement 的第一个元素是这个树的根节点。
// 不难理解如果存在多个根节点，那么最终生成的结构就不再是一棵树了，在 JSX 转为 createElement 的时候就会出现问题。
// 如果理解了这一点，其实就不难理解 —— 为什么 JSX 必须得是单根了。

const root = createRoot(document.getElementById('root'))

root.render(<StrictMode>{divContainer}</StrictMode>)
