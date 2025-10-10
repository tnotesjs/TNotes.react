# [0009. 在 JSX 中使用 JS 表达式](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0009.%20%E5%9C%A8%20JSX%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20JS%20%E8%A1%A8%E8%BE%BE%E5%BC%8F)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 如何在 JSX 中使用 JS 表达式？](#3--如何在-jsx-中使用-js-表达式)
- [4. 💻 demos.1 - 官方示例 - 渲染头像](#4--demos1---官方示例---渲染头像)
- [5. 💻 demos.2 - 在表达式中无法渲染的一些特殊值](#5--demos2---在表达式中无法渲染的一些特殊值)
- [6. 💻 demos.3 - 无法渲染普通对象，可以渲染 react 元素对象](#6--demos3---无法渲染普通对象可以渲染-react-元素对象)
- [7. 🔗 引用](#7--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- 在 JSX 中使用 JS 表达式

## 2. 🫧 评价

- 快速把 demos 过一遍即可。
- 需要注意的是：
  - 有些特殊值（比如 null、undefined、false、true、空字符串、注释、空数组）无法渲染
  - 有些特殊值（比如 对象）渲染会报错
- 官方文档 -> [在 JSX 中通过大括号使用 JavaScript][1] 也是在介绍「在 JSX 中使用 JS 表达式」，可以读一读，并且结尾有几个简单的练习题，可以刷一下练练手。

## 3. 🤔 如何在 JSX 中使用 JS 表达式？

- JSX 让你可以在 Jaavascript 中嵌入 HTML 语法，而大括号可以让你在 JSX 中 “回到” JavaScript 中，这样你就可以从你的代码中嵌入一些变量并展示给用户。
- 嵌入表达式意味着将表达式的返回值作为 JSX 内容的一部分插入到 JSX 中。
  - 类似于 vue 中的指令 v-bind 的作用。
- 嵌入表达式的语法非常简单，使用一对大括号来包裹即可 `{xxx}`，xxx 就是我们嵌入的表达式。
- 例如，下面 👇 这将显示 `user.name`：

```jsx{3}
return (
  <h1>
    {user.name}
  </h1>
);
```

- 你还可以将 JSX 属性 “转义到 JavaScript”，但你必须使用 大括号 而非引号。
- 注意：
  - react 中元素的属性名应该使用小驼峰命名法。
  - 需要注意一些特殊属性名（和 js 关键字冲突的一些值）的写法，比如：
    - `class` 属性，需要写为 `className`；
    - 表单中的 `<label>` 的 `for` 属性，需要写为 `htmlFor`；
    - ……
- 例如：
  - `className="avatar"` 是将 "avatar" 字符串传递给 className，作为 CSS 的 class。
  - `src={user.imageUrl}` 会读取 JavaScript 的 `user.imageUrl` 变量，然后将该值作为 src 属性。

```jsx{4}
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```

- 你也可以把更为复杂的表达式放入 JSX 的大括号内。
- 示例：字符串拼接

```jsx{14}
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

## 4. 💻 demos.1 - 官方示例 - 渲染头像

::: code-group

<<< ./demos/1/assets/1.jsx {16,19-24} [main.jsx]

<<< ./demos/1/assets/1.css [Profile.css]

:::

- 最终渲染效果如下：
  - ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-49-42.png)

::: details 🔍 扩展 - Hedy Lamarr 是谁？

- 本节笔记中提到的 Hedy Lamarr 来自于 react 官方文档。由于不认识这个人，就简单搜了一下，总之是个了不起的人就对了。
- ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-49-20.png)
- https://www.douban.com/personage/27246464/
  - 豆瓣 - 海蒂·拉玛 Hedy Lamarr
- https://en.wikipedia.org/wiki/Hedy_Lamarr
  - wiki - Hedy Lamarr
- Hedy Lamarr（1914 年 11 月 9 日—2000 年 1 月 19 日），原名海德维希·爱娃·玛丽亚·基斯勒（Hedwig Eva Maria Kiesler），是一位奥地利裔美国女演员，同时也是一位发明家。她在电影界的生涯跨越了从无声电影到有声电影的时代，并在好莱坞黄金时代成为了一位著名的影星。
- Lamarr 出生于奥地利维也纳的一个犹太家庭，在她的早期职业生涯中，她在欧洲电影界崭露头角。18 岁时，她出演了争议性的电影《狂喜》（Ecstasy, 1933），该片因其大胆的裸露场景而引起了轰动。随后，她与一位比她年长很多的军火商弗里茨·曼德尔结婚，这段婚姻并不幸福，最终她逃离了丈夫，并前往巴黎，后来移居美国。
- 在美国，Lamarr 更名为 Hedy Lamarr 并开始了她的好莱坞生涯。她出演了许多成功的电影，包括《齐格菲女郎》（Ziegfeld Girl, 1941）和《塞缪尔·戈德温的天堂》（Heavenly Partners, 1947）等。
- 除了她的演艺事业外，Lamarr 还是一名才华横溢的发明家。她对技术非常感兴趣，并与音乐家乔治·安泰尔共同开发了一种称为“频率跳变”（frequency hopping）的技术，这项技术最初是为了帮助盟军在第二次世界大战期间对抗德国潜艇的干扰信号。虽然当时这项专利没有被广泛使用，但它的原理后来成为了现代无线通信技术的基础之一，包括 Wi-Fi、蓝牙以及手机网络等。
- 直到晚年，Hedy Lamarr 的科学贡献才逐渐被人们所认识。1997 年，她获得了电子前沿基金会（Electronic Frontier Foundation, EFF）颁发的先锋奖，以表彰她在扩展频谱通信领域的贡献。尽管她的名字可能不如她的银幕形象那样广为人知，但她作为一位先驱女性科学家的地位是不可否认的。

:::

## 5. 💻 demos.2 - 在表达式中无法渲染的一些特殊值

<<< ./demos/2/assets/1.jsx {16-22}

- 最终渲染结果如下：
  - ![图 2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-56-06.png)
  - ![图 3](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-56-15.png)
- 在 JSX 的大括号中插入 `null`、`undefined`、`false`、`ture`、`""`、`[]`、`注释` 这些值是不会显示的。
- 如果要显示的话则不应该丢到大括号中，应该直接书写，将其事做普通的字符串来显示。
- ⚠️ 注意
  - 上述罗列的这些值不一定全面，可能还有其它特殊值也是不会显示的。
  - 需要掌握的是：当你发现有些特殊值在页面上没有渲染出来，如果你想要在页面中展示这些不会渲染的特殊值（比如 `null`、`undefined`、……），可以采用字符串的形式来书写。
    - `{null}`、`{undefined}` 在页面上不会被渲染。
    - `{'null'}`、`{'undefined'}` 在页面上可以被渲染。或者直接作为元素内容插入，而非 jsx 表达式插入，比如该 demo 中的写法。

## 6. 💻 demos.3 - 无法渲染普通对象，可以渲染 react 元素对象

::: code-group

<<< ./demos/3/assets/1.jsx {11} [❌ 无法渲染普通对象]

<<< ./demos/3/assets/2.jsx {13-16} [✅ 可以渲染 react 元素对象]

:::

- 最终渲染结果如下：
  - ![图 4](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-57-32.png)
  - ![图 5](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-06-24-14-57-41.png)
- 在 JSX 的大括号内使用 JavaScript 对象
  - ❌ 普通对象
    - 普通对象不可以作为子元素。
    - 在 JSX 的大括号中插入普通对象（比如 `{ foo: 123, bar: 'abc' }`）是无法渲染的，会报错。
  - ✅ React 元素对象是 ok 的。

## 7. 🔗 引用

- [官方文档 - 在 JSX 中通过大括号使用 JavaScript][1]
  - 这篇文档介绍了以下这些点：
  - 如何使用引号传递字符串
  - 在 JSX 的大括号内引用 JavaScript 变量
  - 在 JSX 的大括号内调用 JavaScript 函数
  - 在 JSX 的大括号内使用 JavaScript 对象

[1]: https://zh-hans.react.dev/learn/javascript-in-jsx-with-curly-braces
