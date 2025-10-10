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

createRoot(document.getElementById('root')).render(
  <StrictMode>{imgEle}</StrictMode>
)
