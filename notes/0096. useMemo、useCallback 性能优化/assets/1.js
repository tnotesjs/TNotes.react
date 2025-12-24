//  useCallback 是一个 React Hook，它允许你在重新渲染之间缓存函数定义。

// const cachedFn = useCallback(fn, dependencies)

// React 编译器会自动对值和函数进行记忆化处理，减少手动调用 useCallback 的需求。
// 您可以使用编译器来自动处理记忆化。

// 在组件的顶层调用 useCallback 来在重新渲染之间缓存函数定义：
import { useCallback } from 'react'

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback(
    (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails,
      })
    },
    [productId, referrer]
  )
}
