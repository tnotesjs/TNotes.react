import { useState, useCallback, memo } from 'react'

function ParentComponent() {
  const [count, setCount] = useState(0)

  // 使用 useCallback 缓存函数引用
  const handleClick = useCallback(() => {
    console.log('Button clicked')
  }, []) // 空依赖数组，永远返回同一个函数

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

// 使用 React.memo 进一步优化
const ChildComponent = memo(({ onClick }) => {
  console.log('ChildComponent 渲染了')
  return <button onClick={onClick}>Click me</button>
})

function App() {
  return <ParentComponent />
}

export default App

// ----------------------------------
// 🤔 为什么 ChildComponent 需要使用 memo 优化？
// handleClick 不是已经使用 useCallback 缓存了吗？
// ----------------------------------

// React 默认的渲染行为：
// React 组件在父组件重新渲染时，默认会无条件地重新渲染子组件
// 除非子组件是纯组件或使用了 React.memo

// 代码执行流程：
// 点击 "Count: {count}" 按钮后：
// 1. setCount(count + 1) 触发状态更新
// 2. ParentComponent 重新渲染（因为 count 变化）
// 3. 重新执行 ParentComponent 函数体
// 4. useCallback 返回缓存的函数（相同引用）✓
// 5. 但 ChildComponent 函数会被重新调用！
//    → console.log('ChildComponent 渲染了') 执行

// useCallback 只是缓存了函数引用，但它不会阻止子组件的渲染。
// 它只确保了：
// 传递给子组件的 onClick prop 是同一个函数引用
// 但这不意味着 React 会跳过子组件的渲染

// useCallback 单独使用：只解决了"函数引用稳定性"问题，但不会阻止子组件函数执行
// React.memo 的作用：通过浅比较 props，决定是否跳过组件函数的执行
// 最佳实践：useCallback + React.memo 配合使用才能达到完整的优化效果
// 性能影响：即使子组件重新执行了函数，如果虚拟 DOM 没有变化，React 不会更新真实 DOM，但函数执行本身也有成本
