# [0168. 惰性初始化 State](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0168.%20%E6%83%B0%E6%80%A7%E5%88%9D%E5%A7%8B%E5%8C%96%20State)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 什么是惰性初始化？](#2-什么是惰性初始化)
  - [2.1. 基本概念](#21-基本概念)
  - [2.2. 执行时机对比](#22-执行时机对比)
- [3. 为什么需要惰性初始化？](#3-为什么需要惰性初始化)
  - [3.1. 问题 1：避免重复计算](#31-问题-1避免重复计算)
  - [3.2. 问题 2：避免昂贵的计算](#32-问题-2避免昂贵的计算)
  - [3.3. 问题 3：避免副作用重复执行](#33-问题-3避免副作用重复执行)
- [4. 如何实现惰性初始化？](#4-如何实现惰性初始化)
  - [4.1. useState 的惰性初始化](#41-usestate-的惰性初始化)
  - [4.2. useReducer 的惰性初始化](#42-usereducer-的惰性初始化)
  - [4.3. 完整示例：购物车](#43-完整示例购物车)
- [5. 惰性初始化的适用场景？](#5-惰性初始化的适用场景)
  - [5.1. 场景 1：读取本地存储](#51-场景-1读取本地存储)
  - [5.2. 场景 2：复杂数据处理](#52-场景-2复杂数据处理)
  - [5.3. 场景 3：生成唯一 ID](#53-场景-3生成唯一-id)
  - [5.4. 场景 4：初始化复杂对象](#54-场景-4初始化复杂对象)
  - [5.5. 场景 5：从 URL 读取参数](#55-场景-5从-url-读取参数)
- [6. � 惰性初始化的常见错误？](#6--惰性初始化的常见错误)
  - [6.1. 错误 1：调用函数而不是传递函数](#61-错误-1调用函数而不是传递函数)
  - [6.2. 错误 2：在初始化函数中使用外部变量](#62-错误-2在初始化函数中使用外部变量)
  - [6.3. 错误 3：在初始化函数中有副作用](#63-错误-3在初始化函数中有副作用)
  - [6.4. 错误 4：过度使用惰性初始化](#64-错误-4过度使用惰性初始化)
  - [6.5. 错误 5：混淆惰性初始化和 useMemo](#65-错误-5混淆惰性初始化和-usememo)
  - [6.6. 错误 6：在 useReducer 中传递错误的参数](#66-错误-6在-usereducer-中传递错误的参数)
- [7. 引用](#7-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 惰性初始化的概念和原理
- 惰性初始化解决的问题
- useState 和 useReducer 的惰性初始化
- 惰性初始化的性能优化
- 惰性初始化的常见错误

惰性初始化是 React 中重要的性能优化技巧，能避免昂贵的初始化计算在每次渲染时执行。

- 惰性初始化只在组件首次渲染时执行一次
- 通过传递函数而不是值来实现
- 适用于需要复杂计算或读取存储的初始值
- 能显著提升组件性能，特别是初始化成本高的场景
- useState 和 useReducer 都支持惰性初始化

## 2. 什么是惰性初始化？

### 2.1. 基本概念

惰性初始化是指将初始化逻辑延迟到真正需要时才执行，在 React 中通过传递函数来实现。

::: code-group

```jsx [❌ 普通初始化]
function Component() {
  // ❌ 每次渲染都会执行计算
  const [state, setState] = useState(expensiveCalculation());

  return <div>{state}</div>;
}

// 即使 state 已经有值，expensiveCalculation() 仍会执行
```

```jsx [✅ 惰性初始化]
function Component() {
  // ✅ 只在首次渲染时执行一次
  const [state, setState] = useState(() => expensiveCalculation());

  return <div>{state}</div>;
}

// expensiveCalculation() 只在组件挂载时执行
```

:::

### 2.2. 执行时机对比

```jsx
function TimingComparison() {
  console.log("组件渲染");

  // ❌ 每次渲染都执行
  const [count1, setCount1] = useState(
    (() => {
      console.log("普通初始化执行");
      return 0;
    })(),
  );

  // ✅ 只在首次渲染执行
  const [count2, setCount2] = useState(() => {
    console.log("惰性初始化执行");
    return 0;
  });

  return (
    <div>
      <button onClick={() => setCount1(count1 + 1)}>普通：{count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>惰性：{count2}</button>
    </div>
  );
}

// 首次渲染：
// 组件渲染
// 普通初始化执行
// 惰性初始化执行

// 点击按钮后：
// 组件渲染
// 普通初始化执行  ❌ 不应该执行
// （惰性初始化不执行） ✅
```

## 3. 为什么需要惰性初始化？

### 3.1. 问题 1：避免重复计算

::: code-group

```jsx [❌ 性能问题]
function BadComponent() {
  // ❌ 每次渲染都读取 localStorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}"),
  );

  // 每次状态更新，都会重新读取 localStorage
  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => setUser({ ...user, age: 18 })}>更新</button>
    </div>
  );
}
```

```jsx [✅ 惰性初始化]
function GoodComponent() {
  // ✅ 只在首次渲染读取 localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : {};
  });

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => setUser({ ...user, age: 18 })}>更新</button>
    </div>
  );
}
```

:::

### 3.2. 问题 2：避免昂贵的计算

```jsx
// 昂贵的初始化函数
function createInitialTodos(count = 1000) {
  console.log("创建初始 todos");
  const todos = [];
  for (let i = 0; i < count; i++) {
    todos.push({
      id: i,
      text: `Todo ${i}`,
      done: false,
    });
  }
  return todos;
}

// ❌ 每次渲染都创建
function BadTodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  const [filter, setFilter] = useState("all");

  // 更新 filter 会导致组件重新渲染
  // createInitialTodos() 会再次执行（浪费性能）

  return <div>...</div>;
}

// ✅ 只创建一次
function GoodTodoList() {
  const [todos, setTodos] = useState(() => createInitialTodos());
  const [filter, setFilter] = useState("all");

  // 更新 filter 时，createInitialTodos() 不会执行

  return <div>...</div>;
}
```

### 3.3. 问题 3：避免副作用重复执行

```jsx
let counter = 0;

// ❌ 副作用重复执行
function BadComponent() {
  const [id, setId] = useState(++counter);

  // 每次渲染 counter 都会增加
  console.log("ID:", id, "Counter:", counter);

  return <button onClick={() => setId(id)}>重新渲染</button>;
}

// 首次：ID: 1, Counter: 1
// 重新渲染：ID: 1, Counter: 2 ❌ counter 不应该变化

// ✅ 副作用只执行一次
function GoodComponent() {
  const [id, setId] = useState(() => ++counter);

  // counter 只在首次渲染增加
  console.log("ID:", id, "Counter:", counter);

  return <button onClick={() => setId(id)}>重新渲染</button>;
}

// 首次：ID: 1, Counter: 1
// 重新渲染：ID: 1, Counter: 1 ✅ counter 保持不变
```

## 4. 如何实现惰性初始化？

### 4.1. useState 的惰性初始化

```jsx
function UseStateExample() {
  // ✅ 传递函数
  const [state, setState] = useState(() => {
    // 这里的代码只在首次渲染执行
    console.log("初始化 state");
    return initialValue;
  });

  // ✅ 从 localStorage 读取
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // ✅ 复杂计算
  const [data, setData] = useState(() => {
    return processLargeDataset(rawData);
  });

  return <div>...</div>;
}
```

### 4.2. useReducer 的惰性初始化

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// 惰性初始化函数
function init(initialCount) {
  console.log("初始化 reducer state");
  return { count: initialCount };
}

function Counter({ initialCount }) {
  // ✅ useReducer 的第三个参数是初始化函数
  const [state, dispatch] = useReducer(
    reducer,
    initialCount, // 传递给 init 的参数
    init, // 惰性初始化函数
  );

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

### 4.3. 完整示例：购物车

```jsx
function ShoppingCart() {
  // ✅ 从 localStorage 惰性加载购物车
  const [cart, setCart] = useState(() => {
    console.log("加载购物车");
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("加载购物车失败", error);
      return [];
    }
  });

  // 保存到 localStorage
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addItem = (item) => {
    saveCart([...cart, item]);
  };

  const removeItem = (id) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h3>购物车（{cart.length}）</h3>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => removeItem(item.id)}>删除</button>
        </div>
      ))}
    </div>
  );
}
```

## 5. 惰性初始化的适用场景？

### 5.1. 场景 1：读取本地存储

```jsx
function UserPreferences() {
  // ✅ 从 localStorage 读取
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "zh-CN";
  });

  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("fontSize");
    return saved ? parseInt(saved) : 16;
  });

  // 保存设置
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <div>...</div>;
}
```

### 5.2. 场景 2：复杂数据处理

```jsx
function DataAnalysis({ rawData }) {
  // ✅ 处理大量数据
  const [processedData, setProcessedData] = useState(() => {
    console.log("处理数据中...");
    return rawData.map((item) => ({
      ...item,
      normalized: normalizeValue(item.value),
      category: categorizeItem(item),
      score: calculateScore(item),
    }));
  });

  // ✅ 生成统计信息
  const [statistics, setStatistics] = useState(() => {
    console.log("计算统计信息...");
    return {
      total: processedData.length,
      average: getAverage(processedData),
      median: getMedian(processedData),
      stdDev: getStandardDeviation(processedData),
    };
  });

  return <div>...</div>;
}
```

### 5.3. 场景 3：生成唯一 ID

```jsx
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function Item() {
  // ✅ 生成唯一 ID
  const [id] = useState(() => generateId());

  // ⚠️ 注意：这个 ID 在组件生命周期内保持不变
  // 如果需要在每次渲染更新，应该使用 useRef

  return <div data-id={id}>Item {id}</div>;
}
```

### 5.4. 场景 4：初始化复杂对象

```jsx
function GameBoard() {
  // ✅ 初始化游戏状态
  const [gameState, setGameState] = useState(() => {
    console.log("初始化游戏");
    return {
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      moveHistory: [],
      startTime: Date.now(),
    };
  });

  // ✅ 初始化配置
  const [config] = useState(() => {
    const saved = sessionStorage.getItem("gameConfig");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      difficulty: "medium",
      soundEnabled: true,
      animationSpeed: "normal",
    };
  });

  return <div>...</div>;
}
```

### 5.5. 场景 5：从 URL 读取参数

```jsx
function SearchPage() {
  // ✅ 从 URL 参数初始化搜索
  const [searchParams, setSearchParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      query: params.get("q") || "",
      category: params.get("category") || "all",
      sortBy: params.get("sort") || "relevance",
    };
  });

  // ✅ 解析复杂的查询参数
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const filtersStr = params.get("filters");
    return filtersStr ? JSON.parse(filtersStr) : {};
  });

  return <div>...</div>;
}
```

## 6. � 惰性初始化的常见错误？

### 6.1. 错误 1：调用函数而不是传递函数

::: code-group

```jsx [❌ 错误写法]
function BadExample() {
  // ❌ 调用了函数，返回值被传递
  const [data, setData] = useState(fetchData());

  // fetchData() 每次渲染都执行
  return <div>{data}</div>;
}
```

```jsx [✅ 正确写法]
function GoodExample() {
  // ✅ 传递函数本身
  const [data, setData] = useState(() => fetchData());

  // fetchData() 只在首次渲染执行
  return <div>{data}</div>;
}
```

:::

### 6.2. 错误 2：在初始化函数中使用外部变量

```jsx
function DependencyExample({ userId }) {
  // ❌ userId 变化时，初始化函数不会重新执行
  const [user, setUser] = useState(() => {
    return fetchUser(userId);
  });

  // userId 从 1 变为 2，user 仍然是 userId=1 的数据

  // ✅ 应该使用 useEffect
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return <div>...</div>;
}
```

### 6.3. 错误 3：在初始化函数中有副作用

```jsx
// ❌ 在初始化中修改外部状态
let globalCounter = 0;

function BadSideEffect() {
  const [id, setId] = useState(() => {
    // ❌ 副作用：修改全局变量
    globalCounter++;
    // ❌ 副作用：DOM 操作
    document.title = `Count: ${globalCounter}`;
    // ❌ 副作用：发送请求
    fetch("/api/track", { method: "POST" });

    return globalCounter;
  });

  return <div>{id}</div>;
}

// ✅ 副作用应该放在 useEffect 中
function GoodSideEffect() {
  const [id, setId] = useState(() => ++globalCounter);

  useEffect(() => {
    document.title = `Count: ${id}`;
    fetch("/api/track", { method: "POST" });
  }, [id]);

  return <div>{id}</div>;
}
```

### 6.4. 错误 4：过度使用惰性初始化

```jsx
function OverUse() {
  // ❌ 不需要：简单值
  const [count, setCount] = useState(() => 0);

  // ❌ 不需要：简单计算
  const [doubled, setDoubled] = useState(() => 2 * 2);

  // ❌ 不需要：简单字符串
  const [name, setName] = useState(() => "John");

  // ✅ 直接传值即可
  const [count2, setCount2] = useState(0);
  const [doubled2, setDoubled2] = useState(4);
  const [name2, setName2] = useState("John");
}
```

### 6.5. 错误 5：混淆惰性初始化和 useMemo

```jsx
function Confusion() {
  // ❌ 错误理解：认为惰性初始化会缓存计算结果
  const [data, setData] = useState(() => expensiveCalculation());

  // 这只在首次渲染执行一次
  // 如果 setData 更新了值，不会重新计算

  // ✅ 如果需要缓存派生值，使用 useMemo
  const [source, setSource] = useState([]);
  const processed = useMemo(() => expensiveCalculation(source), [source]);
}
```

### 6.6. 错误 6：在 useReducer 中传递错误的参数

::: code-group

```jsx [❌ 错误写法]
function reducer(state, action) {
  // ...
}

function init(initialValue) {
  return { value: initialValue };
}

function BadReducer() {
  // ❌ 第三个参数应该是函数，不是函数调用结果
  const [state, dispatch] = useReducer(
    reducer,
    0,
    init(0), // ❌ 调用了函数
  );
}
```

```jsx [✅ 正确写法]
function GoodReducer() {
  // ✅ 传递函数本身
  const [state, dispatch] = useReducer(
    reducer,
    0, // 传递给 init 的参数
    init, // 初始化函数
  );

  // 等价于：useState(() => init(0))
}
```

:::

## 7. 引用

- [React 官方文档 - useState][1]
- [React 官方文档 - useReducer][2]
- [React 性能优化最佳实践][3]

[1]: https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state
[2]: https://react.dev/reference/react/useReducer#specifying-the-initial-state
[3]: https://react.dev/learn/render-and-commit
