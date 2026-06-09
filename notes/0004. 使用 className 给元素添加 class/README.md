# [0004. 使用 className 给元素添加 class](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0004.%20%E4%BD%BF%E7%94%A8%20className%20%E7%BB%99%E5%85%83%E7%B4%A0%E6%B7%BB%E5%8A%A0%20class)

<!-- region:toc -->

- [1. 评价](#1-评价)
- [2. 查看 react 官方对“添加样式”的说明](#2-查看-react-官方对添加样式的说明)
- [3. 如果在添加样式的时候，不小心写成了 `class`，样式还能正常添加吗？](#3-如果在添加样式的时候不小心写成了-class样式还能正常添加吗)
- [4. demos.1 - 添加样式](#4-demos1---添加样式)
- [5. demos.2 - 在 JSX 中也可以使用 class 添加样式](#5-demos2---在-jsx-中也可以使用-class-添加样式)
- [6. 为什么不能直接使用 `class` 来添加样式，而是使用 `className` 呢？【扩展】](#6-为什么不能直接使用-class-来添加样式而是使用-classname-呢扩展)
- [7. 引用](#7-引用)

<!-- endregion:toc -->

## 1. 评价

- 在 React 中，我们通过使用 JSX 语法来定义组件模板，在组件模板中，我们可以使用 className 来指定一个 CSS 的 class。
  - ✅ `<img className="avatar" />`
  - ❌ `<img class="avatar" />` - 虽然是错误的，但是 react 在抛出错误的同时，也对这种写法做了特殊处理，最终也是能够正常识别的。

## 2. 查看 react 官方对“添加样式”的说明

- [react 快速入门 - 添加样式][2]
- ![图 5](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-15-16-14.png)

## 3. 如果在添加样式的时候，不小心写成了 `class`，样式还能正常添加吗？

- 可以。
- 但是，根据官方文档以及最佳实践，你应该始终使用 className 来指定元素的 CSS 类。这样可以确保代码的一致性和未来的兼容性，并避免潜在的错误或混淆。

## 4. demos.1 - 添加样式

::: code-group

<<< ./demos/1/assets/1.jsx {15,25} [main.jsx]

<<< ./demos/1/assets/1.css [test.css]

:::

- 如果直接写 class 的话，在本节的 demo 中测试结果是可以正常渲染出来的。
- 但是需要知道这种写法其实是错误的，eslint 和 react 内部都会抛出错误提示。
- 这些错误提示都是在提醒我们，直接使用 class 的写法在 react 的 jsx 中给元素添加样式的行为是不正确的。

::: swiper

![最终渲染结果](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-15-10-20.png)

![react 报错](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-15-11-29.png)

![eslint 报错](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-15-11-45.png)

:::

## 5. demos.2 - 在 JSX 中也可以使用 class 添加样式

::: code-group

<<< ./demos/2/1.html {19-23,29}

<<< ./demos/2/1.js {10,15}

<<< ./demos/2/2.html {17-21,27}

<<< ./demos/2/2.js {11,16}

:::

::: swiper

![最终渲染结果](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-15-15-05.png)

![打印的警告信息](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-15-15-15.png)

:::

- 🤔 使用 `class` 也能添加样式类名，这是因为 Babel 在做 jsx 转换的时候帮我们做了特殊处理吗？比如将识别到的错误的 `class` 转为了 `className`？
- 答：并非如此……
- 从最终渲染结果来看 `2.html` 和 `1.html` 等效。
- 由于 2 也能正常渲染，这也就说明 `createElement` 是能够识别 `class` 这种写法的，并非是 `babel` 在编译 `jsx` 的过程中，帮我们将 `class` 转为了 `className`。
- 或者你也可以到 [Babel 的在线环境][1] 中，将 `1.jsx` 丢进去看一下最终的转换效果。
- ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-12-09-45-52.png)

## 6. 为什么不能直接使用 `class` 来添加样式，而是使用 `className` 呢？【扩展】

::: warning

- 这是在学习 react 时在网上经常看到的一个问题，但是实际结果来看，该问题的题干本身就是有问题的！
- 更准确一些的说法应该是 —— 不是不能用 `class` 而是不建议用 `class`。

:::

- 为什么不能直接使用 `class` 来添加样式？
  - 这个问题描述本身就是一个问题，其实不是不能使用 `class`，硬要用也是有办法实现的。
  - 并且你如果直接在 React 中只是用 class 来添加样式的话，也是可以正常添加上去的（不过控制台会抛出 `warning` 警告）。
  - 在更为轻量的 [preact][3] 中，官方就表示你 [可以直接使用 class 来添加样式][4]，这也说明直接使用 class 来添加样式，并非什么技术上的卡点。
- 通过查阅相关资料，目前普遍的一种说法是：
  - JSX 是一种嵌入 JavaScript 的语法，最终还是会被编译为纯 JavaScript 的，而在 JavaScript 中，`class` 是一个用于定义类的关键字，如果在 JSX 中直接使用 `class` 来添加样式的话，可能会导致 JSX 的解析成本增加。
  - 除了 `class` 这个特殊的值之外，还有 `for`，在 HTML 的 `label` 标签中，`for` 是它的一个属性，可是在 JS 中，`for` 是一个关键字，因此，如果你要在 JSX 中给 `label` 标签添加 `for` 属性，应该写 `htmlFor`。
  - 可能是为了与 JS 关键字区分开，也为了方便 JSX 的解析，就需要为这些特殊的属性值制定一个统一的标准。
- React 的设计目标 - 标准化处理：
  - React 的设计目标之一是提供一种声明式的、与 JavaScript 深度集成的方式来构建用户界面。
  - 为了实现这一目标，React 在 JSX 中对一些 HTML 属性进行了标准化处理，以避免与 JavaScript 的保留关键字或语言特性发生冲突。
  - 其他常见的标准化处理的例子：
    - `class` -> `className`
    - `for`（HTML 中的 `<label>` 属性） -> `htmlFor`
    - `tabindex` -> `tabIndex`
    - ……

## 7. 引用

- [react 快速入门 - 添加样式][2]
- [babel][1]
- [preact][3]
  - [Raw HTML attribute/property names][4]

[1]: https://babeljs.io/
[2]: https://zh-hans.react.dev/learn#adding-styles
[3]: https://github.com/preactjs/preact
[4]: https://preactjs.com/guide/v10/differences-to-react/#raw-html-attributeproperty-names
