import React from 'react'
import DOMPurify from 'dompurify'

// 创建一个净化函数
const purify = (dirty) =>
  DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } }) // 使用默认的 HTML 清理配置

function MyComponent() {
  const unsafeHtmlContent =
    '<p>This is a <strong>bold</strong> text. <script>alert("XSS attack!");</script></p>'
  const safeHtmlContent = purify(unsafeHtmlContent)

  return <div dangerouslySetInnerHTML={{ __html: safeHtmlContent }} />
}

export default MyComponent
