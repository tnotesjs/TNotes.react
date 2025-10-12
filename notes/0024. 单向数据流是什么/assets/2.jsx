class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.incrementCount = this.incrementCount.bind(this)
  }

  incrementCount() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }))
  }

  render() {
    return (
      <div>
        <Display count={this.state.count} />
        <Button onClick={this.incrementCount} count={this.state.count}>
          Increment
        </Button>
      </div>
    )
  }
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
