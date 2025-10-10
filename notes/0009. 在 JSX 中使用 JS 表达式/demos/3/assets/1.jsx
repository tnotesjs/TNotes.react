import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const userInfo = {
  name: 'Tdahuyou',
  age: 25,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {userInfo}
    {/*
      ❌ 这种写法会报错
      Objects are not valid as a React child (found: object with keys {name, age}).
    */}
  </StrictMode>
)
