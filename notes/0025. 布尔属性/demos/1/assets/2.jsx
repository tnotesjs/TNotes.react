import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  const [isDisabled, setIsDisabled] = useState(false)

  return (
    <>
      <p>
        <span>默认禁用按钮：</span>
        <button disabled>Click Me</button>
      </p>

      <p>
        <span>点击后切换按钮为禁用按钮：</span>
        <button
          disabled={isDisabled}
          onClick={() => setIsDisabled(!isDisabled)}
        >
          Click Me
        </button>
      </p>

      <p>
        <span>只读文本框：</span>
        <input type="text" value="Read-only text" readonly />
      </p>

      <p>
        <span>设置默认选中项：</span>
        <input type="radio" name="choice" id="yes" />
        <label for="yes">Yes</label>
        <input type="radio" name="choice" id="no" checked />
        <label for="no">No</label>
      </p>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
