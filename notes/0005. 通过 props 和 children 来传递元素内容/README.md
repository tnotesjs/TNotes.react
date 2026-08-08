# [0005. 通过 props 和 children 来传递元素内容](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0005.%20%E9%80%9A%E8%BF%87%20props%20%E5%92%8C%20children%20%E6%9D%A5%E4%BC%A0%E9%80%92%E5%85%83%E7%B4%A0%E5%86%85%E5%AE%B9)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. `props.children` 是什么？](#2-propschildren-是什么)
- [3. 对比 vue 组件中的 slot 插槽](#3-对比-vue-组件中的-slot-插槽)
- [4. “传递元素内容”是什么意思？](#4-传递元素内容是什么意思)
- [5. demos.1 - 传递元素内容的简单示例](#5-demos1---传递元素内容的简单示例)

<!-- endregion:toc -->

## 1. 本节内容

- `props.children`

- `props.children` 可以用来传递元素内容。

## 2. `props.children` 是什么？

- `props.children` 可以接收任何可渲染的 React 元素，并且可以通过检查其是否为空，来针对性地提供默认内容。
- 除了 `children`，还可以使用其他 `props`（如 `content1` 和 `content2`）来传递特定的内容，并为这些 `props` 定义默认值。

## 3. 对比 vue 组件中的 slot 插槽

- 默认插槽：在 React 中，可以通过 `props.children` 传递默认插槽内容，类似于 Vue 中的默认插槽；
- 具名插槽：通过 `props.propName` 属性传递具名插槽内容，其中 `propName` 是我们自定义的属性名，类似于 Vue 中的具名插槽；
- react 组件中的 `props.children` - 相当于 vue 中的默认插槽
- react 组件中的 `props.xxx` - 相当于 vue 中的具名插槽

## 4. “传递元素内容”是什么意思？

- 这里所说的“元素内容”，指的是 react 中的元素，也就是通过 `React.createElement` 创建的元素。
- 使用 jsx 语法糖编写的 html 模板，其实也是通过 `React.createElement` 创建的元素。
- 我们可以使用类似于 vue 中的默认插槽的写法来传递元素内容。

```jsx
<Comp>
  {/* 这么写，意味着会将其作为 props.children 传递给 Comp 组件 */}
  <h2>test</h2>
</Comp>
// 在 Comp 组件内部
// 可以通过 props.children 获取到父组件在调用 Comp 时传递的内容 <h2>test</h2>
```

- 也可以将元素内容作为组件的 props 传递给组件。

```jsx
<Comp content1={<h2>test1</h2>} content2={<h2>test2</h2>} />
// 在 Comp 组件中
// 可以通过 props.content1 和 props.content2 获取到
// 父组件在调用 Comp 时传递的内容 <h2>test1</h2> 和 <h2>test2</h2>
```

## 5. demos.1 - 传递元素内容的简单示例

::: code-group

<<< ./demos/1/assets/1.jsx [main.jsx]

```css [Comp.css]
.comp div {
  border: 1px solid red;
  margin: 2rem;
}
```

:::

- 不同调用方式分别对应的最终效果：

::: code-group

```jsx [1]
<Comp>
  <div>children</div>
</Comp>
```

```jsx [2]
<Comp content1={<div>c1</div>} content2={<div>c2</div>} />
```

```jsx [3]
<Comp />
```

:::

::: swiper

![1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-20-15-01.png)

![2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-20-15-08.png)

![3](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-27-20-15-16.png)

:::
