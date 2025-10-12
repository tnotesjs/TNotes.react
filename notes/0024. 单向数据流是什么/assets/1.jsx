import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1)
  }

  return (
    <div>
      <Display count={count} />
      <Button onClick={incrementCount} count={count}>
        Increment
      </Button>
    </div>
  )
}

// 显示组件 - 接收 count 作为 prop
function Display({ count }) {
  return <p>Count: {count}</p>
}

// 按钮组件 - 接收 onClick 回调 和 count 作为 prop
function Button({ onClick, children, count }) {
  return (
    <div>
      <button onClick={onClick}>{children}</button>
      <p>Current count in Button: {count}</p>
    </div>
  )
}
