# [0089. 事件传递与回调](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0089.%20%E4%BA%8B%E4%BB%B6%E4%BC%A0%E9%80%92%E4%B8%8E%E5%9B%9E%E8%B0%83)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 什么是事件传递与回调？](#2-什么是事件传递与回调)
- [3. 如何在父组件中处理子组件的事件？](#3-如何在父组件中处理子组件的事件)
- [4. 如何传递参数给回调函数？](#4-如何传递参数给回调函数)
- [5. 如何处理多个子组件的事件？](#5-如何处理多个子组件的事件)
- [6. 回调函数的性能优化怎么做？](#6-回调函数的性能优化怎么做)
- [7. 事件传递有哪些常见错误？](#7-事件传递有哪些常见错误)
- [8. 不同回调模式对比](#8-不同回调模式对比)
- [9. 引用](#9-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 事件传递与回调的核心概念
- 父组件处理子组件事件的方法
- 回调函数的参数传递技巧
- 多个子组件事件的统一处理
- 回调函数性能优化策略
- 事件传递的常见错误与解决方案
- 不同回调模式的对比与选型

事件传递与回调是 React 组件通信的核心机制，通过将函数作为 props 传递给子组件，实现子组件向父组件的数据和事件反馈。

- 掌握回调函数是理解 React 单向数据流的关键，避免不必要的状态提升
- 使用 `useCallback` 优化回调函数可以显著提升组件性能，防止子组件无效重渲染
- 传递额外参数时优先使用箭头函数或 `bind`，避免在 JSX 中直接调用函数
- 处理多个子组件事件时，可以通过参数标识或 data 属性统一管理
- 注意回调函数的 `this` 绑定问题（类组件）和闭包陷阱（函数组件）

## 2. 什么是事件传递与回调？

事件传递与回调是 React 中实现子组件向父组件通信的主要方式，父组件将回调函数作为 props 传递给子组件，子组件在特定时机调用这个函数来通知父组件。

```tsx
// 基本的事件回调
function Parent() {
  const handleChildClick = (message: string) => {
    console.log("子组件传来的消息：", message);
  };

  return <Child onButtonClick={handleChildClick} />;
}

function Child({ onButtonClick }: { onButtonClick: (msg: string) => void }) {
  return (
    <button onClick={() => onButtonClick("Hello from Child")}>点击我</button>
  );
}
```

**事件传递的核心原理：**

```tsx
// 数据流向：父 → 子（props），子 → 父（回调）
function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);

  // 父组件定义回调函数
  const handleAddTodo = (newTodo: string) => {
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* 将回调函数作为 props 传递 */}
      <TodoInput onAdd={handleAddTodo} />
      <TodoItems items={todos} onDelete={handleDeleteTodo} />
    </div>
  );
}

function TodoInput({ onAdd }: { onAdd: (todo: string) => void }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim()) {
      onAdd(value); // 子组件调用父组件的回调
      setValue("");
    }
  };

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSubmit}>添加</button>
    </div>
  );
}

function TodoItems({
  items,
  onDelete,
}: {
  items: string[];
  onDelete: (index: number) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item}
          <button onClick={() => onDelete(index)}>删除</button>
        </li>
      ))}
    </ul>
  );
}
```

**使用场景：**

- 表单提交、输入验证
- 列表项的增删改操作
- 模态框的打开关闭
- 选项卡切换
- 任何需要子组件通知父组件的场景

## 3. 如何在父组件中处理子组件的事件？

父组件可以通过定义回调函数并传递给子组件来处理子组件的事件，回调函数中可以访问父组件的状态和方法。

```tsx
// 简单事件处理
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (query: string) => {
    console.log("搜索：", query);
    // 可以在这里调用 API
  };

  return (
    <div>
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
      />
    </div>
  );
}

function SearchInput({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
}) {
  return (
    <div>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
      <button onClick={() => onSearch(value)}>搜索</button>
    </div>
  );
}
```

**复杂状态管理：**

```tsx
// 表单验证场景
interface FormData {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 处理字段变化
  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // 清除该字段的错误
    setErrors({ ...errors, [field]: undefined });
  };

  // 处理表单提交
  const handleSubmit = () => {
    const newErrors: FormErrors = {};

    if (!formData.username) {
      newErrors.username = "用户名不能为空";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "邮箱格式不正确";
    }
    if (formData.password.length < 6) {
      newErrors.password = "密码至少 6 位";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("提交表单：", formData);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormField
        label="用户名"
        value={formData.username}
        error={errors.username}
        onChange={(value) => handleFieldChange("username", value)}
      />
      <FormField
        label="邮箱"
        value={formData.email}
        error={errors.email}
        onChange={(value) => handleFieldChange("email", value)}
      />
      <FormField
        label="密码"
        type="password"
        value={formData.password}
        error={errors.password}
        onChange={(value) => handleFieldChange("password", value)}
      />
      <button type="button" onClick={handleSubmit}>
        注册
      </button>
    </form>
  );
}

function FormField({
  label,
  value,
  error,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}
```

## 4. 如何传递参数给回调函数？

传递参数给回调函数有多种方式，需要根据场景选择合适的方法。

::: code-group

```tsx [箭头函数传参]
function TodoList() {
  const [todos, setTodos] = useState(["学习 React", "写代码"]);

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          {/* 使用箭头函数传递参数 */}
          <button onClick={() => handleDelete(index)}>删除</button>
        </li>
      ))}
    </ul>
  );
}
```

```tsx [bind 方法传参]
function TodoList() {
  const [todos, setTodos] = useState(["学习 React", "写代码"]);

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          {/* 使用 bind 传递参数 */}
          <button onClick={handleDelete.bind(null, index)}>删除</button>
        </li>
      ))}
    </ul>
  );
}
```

```tsx [data 属性传参]
function TodoList() {
  const [todos, setTodos] = useState(["学习 React", "写代码"]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.dataset.index);
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          {/* 使用 data 属性传递参数 */}
          <button data-index={index} onClick={handleDelete}>
            删除
          </button>
        </li>
      ))}
    </ul>
  );
}
```

:::

**传递多个参数：**

```tsx
// 传递多个参数
function ProductList() {
  const handleAddToCart = (
    productId: number,
    quantity: number,
    price: number,
  ) => {
    console.log(
      `添加商品 ${productId}，数量 ${quantity}，总价 ${price * quantity}`,
    );
  };

  return (
    <div>
      {/* 方式 1：箭头函数传递多个参数 */}
      <button onClick={() => handleAddToCart(1, 2, 99.9)}>添加到购物车</button>

      {/* 方式 2：bind 传递多个参数 */}
      <button onClick={handleAddToCart.bind(null, 1, 2, 99.9)}>
        添加到购物车
      </button>
    </div>
  );
}
```

**传递事件对象和额外参数：**

```tsx
function Form() {
  const handleSubmit = (fieldName: string, e: React.FormEvent) => {
    e.preventDefault();
    console.log("提交字段：", fieldName);
  };

  return (
    <form>
      {/* ✅ 正确：先传自定义参数，再传事件对象 */}
      <button onClick={(e) => handleSubmit("username", e)}>提交用户名</button>

      {/* ❌ 错误：这样会立即执行 */}
      <button onClick={handleSubmit("username", e)}>提交用户名</button>
    </form>
  );
}
```

## 5. 如何处理多个子组件的事件？

当有多个相似的子组件需要处理事件时，可以使用统一的回调函数，通过参数区分不同的子组件。

```tsx
// 通过 ID 区分不同的子组件
function TabPanel() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div>
        <Tab
          id="tab1"
          label="首页"
          active={activeTab === "tab1"}
          onClick={handleTabChange}
        />
        <Tab
          id="tab2"
          label="关于"
          active={activeTab === "tab2"}
          onClick={handleTabChange}
        />
        <Tab
          id="tab3"
          label="联系"
          active={activeTab === "tab3"}
          onClick={handleTabChange}
        />
      </div>
      <div>
        {activeTab === "tab1" && <div>首页内容</div>}
        {activeTab === "tab2" && <div>关于内容</div>}
        {activeTab === "tab3" && <div>联系内容</div>}
      </div>
    </div>
  );
}

function Tab({
  id,
  label,
  active,
  onClick,
}: {
  id: string;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        fontWeight: active ? "bold" : "normal",
        borderBottom: active ? "2px solid blue" : "none",
      }}
    >
      {label}
    </button>
  );
}
```

**批量处理事件：**

```tsx
// 列表批量操作
function CheckboxList() {
  const [items] = useState([
    { id: 1, name: "苹果" },
    { id: 2, name: "香蕉" },
    { id: 3, name: "橙子" },
  ]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleSelectAll = () => {
    setSelectedIds(items.map((item) => item.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  return (
    <div>
      <button onClick={handleSelectAll}>全选</button>
      <button onClick={handleDeselectAll}>取消全选</button>
      <ul>
        {items.map((item) => (
          <CheckboxItem
            key={item.id}
            id={item.id}
            name={item.name}
            checked={selectedIds.includes(item.id)}
            onChange={handleCheckboxChange}
          />
        ))}
      </ul>
      <p>已选择：{selectedIds.join(", ")}</p>
    </div>
  );
}

function CheckboxItem({
  id,
  name,
  checked,
  onChange,
}: {
  id: number;
  name: string;
  checked: boolean;
  onChange: (id: number, checked: boolean) => void;
}) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(id, e.target.checked)}
        />
        {name}
      </label>
    </li>
  );
}
```

## 6. 回调函数的性能优化怎么做？

回调函数如果不加优化，每次父组件重渲染时都会创建新的函数引用，导致子组件不必要的重渲染。

```tsx
// ❌ 未优化：每次渲染都创建新函数
function Parent() {
  const [count, setCount] = useState(0);

  // 每次渲染都会创建新的函数引用
  const handleClick = () => {
    console.log("按钮被点击");
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      {/* 每次 count 变化，Child 都会重渲染 */}
      <Child onClick={handleClick} />
    </div>
  );
}

const Child = React.memo(function Child({ onClick }: { onClick: () => void }) {
  console.log("Child 渲染"); // 每次都会执行
  return <button onClick={onClick}>子组件按钮</button>;
});
```

**使用 useCallback 优化：**

```tsx
// ✅ 使用 useCallback 优化
function Parent() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 缓存函数引用
  const handleClick = useCallback(() => {
    console.log("按钮被点击");
  }, []); // 空依赖数组，函数引用永远不变

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      {/* count 变化时，Child 不会重渲染 */}
      <Child onClick={handleClick} />
    </div>
  );
}

const Child = React.memo(function Child({ onClick }: { onClick: () => void }) {
  console.log("Child 渲染"); // 只在首次渲染时执行
  return <button onClick={onClick}>子组件按钮</button>;
});
```

**依赖项管理：**

```tsx
function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");

  // ❌ 错误：缺少依赖项
  const handleAddTodo = useCallback((newTodo: string) => {
    setTodos([...todos, newTodo]); // todos 应该在依赖数组中
  }, []); // ⚠️ 警告：todos 未在依赖数组中

  // ✅ 正确：使用函数式更新，避免依赖 todos
  const handleAddTodoFixed = useCallback((newTodo: string) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []); // 不需要依赖 todos

  // ✅ 正确：包含所有依赖项
  const handleFilteredTodos = useCallback(() => {
    return todos.filter((todo) => {
      if (filter === "all") return true;
      if (filter === "completed") return todo.includes("✓");
      return !todo.includes("✓");
    });
  }, [todos, filter]); // 依赖 todos 和 filter

  return <div>...</div>;
}
```

## 7. 事件传递有哪些常见错误？

事件传递过程中容易出现函数调用时机、参数传递、this 绑定等问题。

```tsx
// ❌ 错误 1：在 JSX 中直接调用函数
function App() {
  const handleClick = () => {
    console.log("点击");
  };

  return (
    <div>
      {/* ❌ 错误：立即执行，不是绑定事件 */}
      <button onClick={handleClick()}>点击</button>

      {/* ✅ 正确：传递函数引用 */}
      <button onClick={handleClick}>点击</button>
    </div>
  );
}
```

```tsx
// ❌ 错误 2：忘记绑定 this（类组件）
class Counter extends React.Component {
  state = { count: 0 };

  handleClick() {
    // ❌ 错误：this 为 undefined
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return <button onClick={this.handleClick}>点击</button>;
  }
}

// ✅ 正确方式 1：在构造函数中绑定
class CounterFixed1 extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return <button onClick={this.handleClick}>点击</button>;
  }
}

// ✅ 正确方式 2：使用箭头函数
class CounterFixed2 extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.handleClick}>点击</button>;
  }
}
```

```tsx
// ❌ 错误 3：闭包陷阱
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // ❌ 错误：闭包捕获的 count 始终是初始值 0
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []); // 空依赖数组

  return <div>Count: {count}</div>;
}

// ✅ 正确：使用函数式更新
function TimerFixed() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>Count: {count}</div>;
}
```

```tsx
// ❌ 错误 4：子组件直接修改 props
function Child({ count }: { count: number }) {
  return (
    <button
      onClick={() => {
        // ❌ 错误：不能直接修改 props
        count++; // 这样做不会触发重渲染
      }}
    >
      Count: {count}
    </button>
  );
}

// ✅ 正确：通过回调通知父组件
function ChildFixed({
  count,
  onIncrement,
}: {
  count: number;
  onIncrement: () => void;
}) {
  return <button onClick={onIncrement}>Count: {count}</button>;
}

function Parent() {
  const [count, setCount] = useState(0);
  return <ChildFixed count={count} onIncrement={() => setCount(count + 1)} />;
}
```

## 8. 不同回调模式对比

| 特性       | 箭头函数   | bind 方法 | data 属性 |
| ---------- | ---------- | --------- | --------- |
| 语法简洁性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐    | ⭐⭐⭐⭐  |
| 性能       | ⭐⭐⭐     | ⭐⭐⭐    | ⭐⭐⭐⭐  |
| 传递多参数 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐  | ⭐⭐      |
| 类型安全   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐  | ⭐⭐⭐    |
| 适用场景   | 列表项操作 | 类组件    | 简单标识  |

**使用建议：**

```tsx
// 1. 列表渲染：优先使用箭头函数
function List() {
  const items = [1, 2, 3];
  const handleClick = (id: number) => console.log(id);

  return (
    <div>
      {items.map((id) => (
        <button key={id} onClick={() => handleClick(id)}>
          {id}
        </button>
      ))}
    </div>
  );
}

// 2. 需要 this 绑定：使用 bind 或类字段
class ClassComponent extends React.Component {
  handleClick(id: number) {
    console.log(id);
  }

  render() {
    return <button onClick={this.handleClick.bind(this, 1)}>点击</button>;
  }
}

// 3. 简单标识：使用 data 属性
function Menu() {
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.dataset.action;
    console.log(action);
  };

  return (
    <div>
      <button data-action="save" onClick={handleMenuClick}>
        保存
      </button>
      <button data-action="delete" onClick={handleMenuClick}>
        删除
      </button>
    </div>
  );
}
```

## 9. 引用

- [React 文档 - 事件处理][1]
- [React 文档 - 将函数传递给组件][2]
- [React 文档 - useCallback][3]

[1]: https://react.dev/learn/responding-to-events
[2]: https://react.dev/learn/passing-props-to-a-component#passing-props-to-a-component
[3]: https://react.dev/reference/react/useCallback
