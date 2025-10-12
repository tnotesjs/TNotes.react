const div = React.createElement(
  'div',
  null,
  React.createElement('img', {
    src: 'https://avatars.githubusercontent.com/u/125541114?v=4',
    width: '100px',
  }),
  React.createElement('img', {
    src: 'https://avatars.githubusercontent.com/u/125541114?v=4',
    width: '100px',
    class: 'round',
  }),
  React.createElement('img', {
    src: 'https://avatars.githubusercontent.com/u/125541114?v=4',
    width: '100px',
    className: 'round',
  })
)
ReactDOM.render(div, document.getElementById('root'))
