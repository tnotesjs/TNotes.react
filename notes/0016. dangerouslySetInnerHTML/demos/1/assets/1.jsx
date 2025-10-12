import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const htmlContent = '<p>This is a <strong>bold</strong> text.</p>'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>{htmlContent}</div>
    {/* 此时 htmlContent 会被视作普通的 html 字符串（普通文本），而不是作为 HTML 内容（真实 DOM）被解析。 */}
  </StrictMode>
)
