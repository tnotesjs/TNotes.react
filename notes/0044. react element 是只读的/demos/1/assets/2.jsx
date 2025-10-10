import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const githubAvatar = 'https://avatars.githubusercontent.com/u/125541114?v=4'

const imgEle = (
  <img
    src={githubAvatar}
    style={{
      width: '100px',
      height: '100px',
      borderRadius: '20%',
      boxShadow: '1rem 1rem 1rem #ddd',
    }}
    alt="github 头像"
  />
)

// 不要尝试修改 react element 对象身上的任何属性，否则会报错，你可以将这个对象视作是只读的。
console.log('before set alt - imgEle.props =>', imgEle.props)

imgEle.props.src = '...' // [!code error]
// ❌ 报错：Uncaught TypeError: Cannot assign to read only property 'alt' of object '#<Object>'

console.log('after set alt - imgEle.props =>', imgEle.props) // 不会执行，因为前一行就报错了。

createRoot(document.getElementById('root')).render(
  <StrictMode>{imgEle}</StrictMode>
)
