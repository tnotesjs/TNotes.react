// 创建一个 span 元素
const span = React.createElement(
  'span',
  {
    title: '这是一个 span 元素',
  },
  'this is a span element'
)

// 创建一个 img 元素
const img = React.createElement('img', {
  // 素材：github 头像
  src: 'https://avatars.githubusercontent.com/u/125541114?v=4',
  width: '100px',
})

// 创建一个 div 元素
const div = React.createElement('div', {}, '123', img, span)
// 123、img、span 这些都会成为该 div 的子元素

ReactDOM.render(div, document.getElementById('root'))
