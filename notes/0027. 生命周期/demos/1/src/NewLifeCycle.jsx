import React, { Component } from 'react'

export default class NewLifeCycle extends Component {
  state = {
    n: this.props.n,
  }

  // 触发时机：在 render 之后触发。
  // 在页面更新的前一步调用，获取当前的快照。
  // 此时真实的 DOM 构建完成，但还未实际渲染到页面中。
  // 返回值会作为第三个参数传递给 componentDidUpdate。
  // 通常会在这个钩子中通过 ref 获取真实 DOM，做一些 DOM 操作。
  // 该函数必须跟 componentDidUpdate 一起使用，否则会报错。
  // 该函数必须得有返回值，如果没有写 return 语句会报错。
  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    console.log('getSnapshotBeforeUpdate')
    return 123
  }

  componentDidUpdate(prevProps, prevState, snap) {
    console.log('componentDidUpdate', snap)
  }

  render() {
    return (
      <div>
        <h1>{this.state.n}</h1>
        <p>
          <button
            onClick={() => {
              this.setState({
                n: this.state.n + 1,
              })
            }}
          >
            +1
          </button>
        </p>
      </div>
    )
  }
}
