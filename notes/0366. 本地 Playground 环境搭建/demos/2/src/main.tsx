import { createRoot } from 'react-dom/client'

function App() {
  return <h1>Hello World</h1>
}

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root container missing in index.html')
}

createRoot(root).render(<App />)
