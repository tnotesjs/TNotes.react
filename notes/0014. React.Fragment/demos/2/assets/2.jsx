import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const items = [
    { id: 1, title: 'Item 1', description: 'This is the first item.' },
    { id: 2, title: 'Item 2', description: 'This is the second item.' },
    { id: 3, title: 'Item 3', description: 'This is the third item.' },
  ]

  return (
    <>
      {items.map((item) => (
        <>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </>
      ))}
    </>
  )
  // ❌ 报错
  // Each child in a list should have a unique "key" prop.
  // Check the render method of `App`. See https://react.dev/link/warning-keys for more information.

  // return (
  //   <>
  //     {items.map(item => (
  //       <div key={item.id}>
  //         <h2>{item.title}</h2>
  //         <p>{item.description}</p>
  //       </div>
  //     ))}
  //   </>
  // );
  // ❌ 虽然可以正常渲染，但是会影响到真实 DOM，不符合要求。
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
