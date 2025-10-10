// const span = React.createElement("span", {
//   title: '这是一个 span 元素'
// }, "this is a span element");
// const img = React.createElement('img', { src: 'https://avatars.githubusercontent.com/u/125541114?v=4', width: '100px' });
// const div = React.createElement("div", {}, "123", img, span);

// 最终要渲染的元素是由 React.createElement 创建的。
// 但是使用 React.createElement 创建的话，写起来不是很舒服，和传统的 html 写法不太一样。
// 因此，React 还给我们提供了 JSX 的语法。
// 比如上述结构，我们如果改用 JSX 的写法来改写，最终页面上渲染出来的效果是完全等效的。
// 在实际开发中，我们更多使用的也是 JSX 的语法来写我们的 React 组件。
const div = (
  <div>
    123
    <img
      src="https://avatars.githubusercontent.com/u/125541114?v=4"
      width="100px"
    />
    <span title="这是一个 span 元素">this is a span element</span>
  </div>
)

ReactDOM.render(div, document.getElementById('root'))
