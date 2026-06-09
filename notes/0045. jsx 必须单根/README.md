# [0045. jsx 必须单根](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0045.%20jsx%20%E5%BF%85%E9%A1%BB%E5%8D%95%E6%A0%B9)

<!-- region:toc -->

- [1. 评价](#1-评价)
- [2. demos.1 - jsx 必须单根](#2-demos1---jsx-必须单根)

<!-- endregion:toc -->

## 1. 评价

- jsx 必须只能有一个根节点。
- 当遇到需要渲染多根的情况，可以使用 `Fragment` 将这些节点包裹起来。【最佳实践】

## 2. demos.1 - jsx 必须单根

::: code-group

```jsx [❌ 错误写法]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ❌ 下面这种写法会报错 - JSX 必须得有一个根节点
const divContainer = (
    <div>div 1</div>
    <div>div 2</div>
    <div>div 3</div>
);

const root = createRoot(document.getElementById('root'))

root.render(<StrictMode>{divContainer}</StrictMode>)
```

<<< ./demos/1/assets/1.jsx {6,10} [✅ 解 1]

<<< ./demos/1/assets/2.jsx {4-10,16-25} [✅ 解 2]

<<< ./demos/1/assets/3.jsx {17,21,26,27} [✅ 解 3]

<<< ./demos/1/assets/4.jsx {14,18} [✅ 解 4]

:::

- ❌ 错误写法
  - ![图 3](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-12-45.png)
  - ![图 2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-12-33.png)
- ✅ 解 1
  - 虽然上述提到的解决办法能够正常在页面上渲染出 3 个 div，但是却破坏的元素的结构，多出的这一层 div 很可能并非我们想要的。
  - ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-12-10.png)
- ✅ 解 2
  - 其实就是将 `解1` 中的 jsx 的写法改为 `createElement` 式的写法，它们是等效的。
  - 知道 jsx 是语法糖，掌握好 jsx 的写法即可，实际开发中很少会采用 `createElement` 式的写法来描述 UI。
- ✅ 解 3
  - 采用 `Fragment`。
  - 使用 `Fragment` 渲染出来的结构如下：
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-11-36.png)
  - 会发现这种写法并不会破坏元素结构，这往往是我们开发时更常用的。
- ✅ 解 4
  - 是解法 3 的简写形式。
