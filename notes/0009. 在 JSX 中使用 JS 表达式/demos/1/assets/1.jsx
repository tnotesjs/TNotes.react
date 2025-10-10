import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Profile.css'

// 由于可以在 jsx 中插入表达式，因此我们可以将非常灵活地处理 JSX 中的一些动态值。
// 可以将相关值存储在变量中，然后在 JSX 中通过表达式将其嵌入进去。
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
}

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Profile />
  </StrictMode>
)
