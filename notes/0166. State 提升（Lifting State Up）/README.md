# [0166. State 提升（Lifting State Up）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0166.%20State%20%E6%8F%90%E5%8D%87%EF%BC%88Lifting%20State%20Up%EF%BC%89)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 什么是 State 提升？](#3--什么是-state-提升)
  - [3.1. 基本概念](#31-基本概念)
  - [3.2. 数据流向](#32-数据流向)
- [4. 🤔 为什么需要提升 State？](#4--为什么需要提升-state)
  - [4.1. 原因 1：数据同步](#41-原因-1数据同步)
  - [4.2. 原因 2：单一数据源](#42-原因-2单一数据源)
  - [4.3. 原因 3：协调更新](#43-原因-3协调更新)
- [5. � 如何实现 State 提升？](#5--如何实现-state-提升)
  - [5.1. 步骤 1：识别共享状态](#51-步骤-1识别共享状态)
  - [5.2. 步骤 2：移动到共同父组件](#52-步骤-2移动到共同父组件)
  - [5.3. 步骤 3：通过 Props 传递](#53-步骤-3通过-props-传递)
  - [5.4. 完整示例](#54-完整示例)
- [6. 🤔 State 提升的常见场景？](#6--state-提升的常见场景)
  - [6.1. 场景 1：表单输入同步](#61-场景-1表单输入同步)
  - [6.2. 场景 2：列表过滤和排序](#62-场景-2列表过滤和排序)
  - [6.3. 场景 3：多步骤表单](#63-场景-3多步骤表单)
  - [6.4. 场景 4：主从联动](#64-场景-4主从联动)
- [7. 🤔 State 应该提升到哪里？](#7--state-应该提升到哪里)
  - [7.1. 原则：最近共同祖先](#71-原则最近共同祖先)
  - [7.2. 避免过度提升](#72-避免过度提升)
  - [7.3. 使用 Context 避免深层传递](#73-使用-context-避免深层传递)
  - [7.4. 状态位置决策流程](#74-状态位置决策流程)
- [8. 🔗 引用](#8--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- State 提升的概念
- 提升 State 的原因和时机
- State 提升的实现方法
- 常见应用场景
- 提升位置的选择原则

## 2. 🫧 评价

State 提升是 React 中实现组件间数据共享的基本模式，理解它是掌握组件通信的关键。

- 当多个组件需要共享状态时，将状态提升到它们的共同父组件
- 通过 props 向下传递数据，通过回调函数向上传递变更
- 提升位置遵循最近共同祖先原则，避免过度提升
- 状态提升后组件变为受控组件，数据流更清晰
- 过度提升会导致 props drilling 问题，需要配合 Context 或状态管理库

## 3. 🤔 什么是 State 提升？

### 3.1. 基本概念

State 提升是指将多个组件需要共享的状态移动到它们的共同父组件中管理。

::: code-group

```jsx [❌ 各自管理状态]
function TemperatureInput1() {
  const [temperature, setTemperature] = useState('')

  return (
    <input
      value={temperature}
      onChange={(e) => setTemperature(e.target.value)}
    />
  )
}

function TemperatureInput2() {
  const [temperature, setTemperature] = useState('')

  return (
    <input
      value={temperature}
      onChange={(e) => setTemperature(e.target.value)}
    />
  )
}

function App() {
  return (
    <div>
      <TemperatureInput1 />
      <TemperatureInput2 />
      {/* ❌ 两个输入框的值无法同步 */}
    </div>
  )
}
```

```jsx [✅ 提升到父组件]
function TemperatureInput({ value, onChange }) {
  return <input value={value} onChange={onChange} />
}

function App() {
  // ✅ 状态提升到父组件
  const [temperature, setTemperature] = useState('')

  return (
    <div>
      <TemperatureInput
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
      />
      <TemperatureInput
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
      />
      {/* ✅ 两个输入框同步 */}
    </div>
  )
}
```

:::

### 3.2. 数据流向

```jsx
// ✅ State 提升后的数据流
function Parent() {
  const [data, setData] = useState('初始值')

  // 数据向下流动（通过 props）
  return (
    <div>
      <ChildA
        data={data}
        onUpdate={setData} // 更新函数向下传递
      />
      <ChildB data={data} onUpdate={setData} />
    </div>
  )
}

function ChildA({ data, onUpdate }) {
  // 通过回调函数向上通知父组件
  return <button onClick={() => onUpdate('新值A')}>{data}</button>
}

function ChildB({ data, onUpdate }) {
  return <button onClick={() => onUpdate('新值B')}>{data}</button>
}
```

## 4. 🤔 为什么需要提升 State？

### 4.1. 原因 1：数据同步

::: code-group

```jsx [❌ 无法同步]
function FilterInput() {
  const [filter, setFilter] = useState('')

  return <input value={filter} onChange={(e) => setFilter(e.target.value)} />
}

function ItemList() {
  const [items] = useState(['苹果', '香蕉', '橙子'])

  // ❌ 无法获取 filter 的值
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function App() {
  return (
    <div>
      <FilterInput />
      <ItemList />
    </div>
  )
}
```

```jsx [✅ 数据同步]
function FilterInput({ value, onChange }) {
  return <input value={value} onChange={onChange} />
}

function ItemList({ items, filter }) {
  // ✅ 可以获取 filter 的值
  const filtered = items.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <ul>
      {filtered.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [items] = useState(['苹果', '香蕉', '橙子'])

  return (
    <div>
      <FilterInput value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ItemList items={items} filter={filter} />
    </div>
  )
}
```

:::

### 4.2. 原因 2：单一数据源

```jsx
// ✅ 提升 State 确保单一数据源
function Calculator() {
  // 唯一的数据源
  const [celsius, setCelsius] = useState('')

  // 派生值而不是独立状态
  const fahrenheit = celsius ? ((celsius * 9) / 5 + 32).toFixed(1) : ''

  return (
    <div>
      <TemperatureInput
        scale="摄氏度"
        value={celsius}
        onChange={(e) => setCelsius(e.target.value)}
      />
      <TemperatureInput
        scale="华氏度"
        value={fahrenheit}
        onChange={(e) =>
          setCelsius((((e.target.value - 32) * 5) / 9).toFixed(1))
        }
      />
      <p>
        {celsius ? `水${celsius >= 100 ? '沸腾' : '未沸腾'}` : '请输入温度'}
      </p>
    </div>
  )
}
```

### 4.3. 原因 3：协调更新

```jsx
function ShoppingCart() {
  // ✅ 在父组件协调多个子组件
  const [items, setItems] = useState([])
  const [discount, setDiscount] = useState(0)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const finalPrice = total * (1 - discount)

  return (
    <div>
      <ItemList items={items} onUpdate={setItems} />
      <DiscountInput discount={discount} onUpdate={setDiscount} />
      <Summary total={total} discount={discount} finalPrice={finalPrice} />
    </div>
  )
}
```

## 5. � 如何实现 State 提升？

### 5.1. 步骤 1：识别共享状态

```jsx
// 识别需要共享的状态
// 问题：ChildA 和 ChildB 需要共享 count

function ChildA() {
  const [count, setCount] = useState(0) // ❌ 局部状态
  return <div>{count}</div>
}

function ChildB() {
  const [count, setCount] = useState(0) // ❌ 局部状态
  return <div>{count}</div>
}
```

### 5.2. 步骤 2：移动到共同父组件

```jsx
// ✅ 将状态移动到父组件
function Parent() {
  const [count, setCount] = useState(0) // 提升的状态

  return (
    <div>
      <ChildA count={count} setCount={setCount} />
      <ChildB count={count} setCount={setCount} />
    </div>
  )
}

function ChildA({ count, setCount }) {
  return (
    <div>
      <p>A: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}

function ChildB({ count, setCount }) {
  return (
    <div>
      <p>B: {count}</p>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  )
}
```

### 5.3. 步骤 3：通过 Props 传递

```jsx
function Parent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0,
  })

  // ✅ 提供更新函数
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form>
      <NameInput
        value={formData.name}
        onChange={(value) => updateField('name', value)}
      />
      <EmailInput
        value={formData.email}
        onChange={(value) => updateField('email', value)}
      />
      <AgeInput
        value={formData.age}
        onChange={(value) => updateField('age', value)}
      />
      <Summary data={formData} />
    </form>
  )
}
```

### 5.4. 完整示例

```jsx
// 完整的 State 提升示例
function Calculator() {
  const [value, setValue] = useState(0)
  const [operation, setOperation] = useState(null)
  const [memory, setMemory] = useState(0)

  const calculate = (op) => {
    if (memory && operation) {
      const result =
        operation === '+'
          ? memory + value
          : operation === '-'
          ? memory - value
          : operation === '*'
          ? memory * value
          : operation === '/'
          ? memory / value
          : value
      setValue(result)
      setMemory(0)
      setOperation(null)
    } else {
      setMemory(value)
      setOperation(op)
      setValue(0)
    }
  }

  return (
    <div>
      <Display value={value} />
      <NumberPad onNumberClick={(num) => setValue((prev) => prev * 10 + num)} />
      <OperatorPad onOperatorClick={calculate} />
    </div>
  )
}

function Display({ value }) {
  return <div className="display">{value}</div>
}

function NumberPad({ onNumberClick }) {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
        <button key={num} onClick={() => onNumberClick(num)}>
          {num}
        </button>
      ))}
    </div>
  )
}

function OperatorPad({ onOperatorClick }) {
  return (
    <div>
      {['+', '-', '*', '/'].map((op) => (
        <button key={op} onClick={() => onOperatorClick(op)}>
          {op}
        </button>
      ))}
    </div>
  )
}
```

## 6. 🤔 State 提升的常见场景？

### 6.1. 场景 1：表单输入同步

```jsx
function UserForm() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
  })

  // ✅ 派生全名
  const fullName = `${user.firstName} ${user.lastName}`.trim()

  return (
    <div>
      <input
        placeholder="名"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <input
        placeholder="姓"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <p>全名：{fullName}</p>
    </div>
  )
}
```

### 6.2. 场景 2：列表过滤和排序

```jsx
function ProductList() {
  const [products] = useState([
    { id: 1, name: '苹果', price: 5, category: '水果' },
    { id: 2, name: '面包', price: 3, category: '主食' },
    { id: 3, name: '香蕉', price: 4, category: '水果' },
  ])

  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [category, setCategory] = useState('all')

  // ✅ 在父组件协调所有条件
  const filtered = products
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) => p.name.includes(filter))
    .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))

  return (
    <div>
      <SearchBox value={filter} onChange={setFilter} />
      <CategoryFilter value={category} onChange={setCategory} />
      <SortSelector value={sortBy} onChange={setSortBy} />
      <ProductGrid products={filtered} />
    </div>
  )
}
```

### 6.3. 场景 3：多步骤表单

```jsx
function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    personal: { name: '', age: 0 },
    contact: { email: '', phone: '' },
    address: { city: '', street: '' },
  })

  const updatePersonal = (data) => {
    setFormData((prev) => ({ ...prev, personal: data }))
  }

  const updateContact = (data) => {
    setFormData((prev) => ({ ...prev, contact: data }))
  }

  const updateAddress = (data) => {
    setFormData((prev) => ({ ...prev, address: data }))
  }

  return (
    <div>
      {step === 1 && (
        <PersonalInfo
          data={formData.personal}
          onUpdate={updatePersonal}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <ContactInfo
          data={formData.contact}
          onUpdate={updateContact}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <AddressInfo
          data={formData.address}
          onUpdate={updateAddress}
          onSubmit={() => console.log('提交', formData)}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  )
}
```

### 6.4. 场景 4：主从联动

```jsx
function MasterDetail() {
  const [items] = useState([
    { id: 1, name: '项目1', details: '详情1' },
    { id: 2, name: '项目2', details: '详情2' },
  ])

  const [selectedId, setSelectedId] = useState(null)

  // ✅ 在父组件管理选中状态
  const selectedItem = items.find((item) => item.id === selectedId)

  return (
    <div style={{ display: 'flex' }}>
      <ItemList
        items={items}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <DetailPanel item={selectedItem} />
    </div>
  )
}

function ItemList({ items, selectedId, onSelect }) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => onSelect(item.id)}
          style={{
            fontWeight: item.id === selectedId ? 'bold' : 'normal',
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}

function DetailPanel({ item }) {
  return <div>{item ? <p>{item.details}</p> : <p>请选择项目</p>}</div>
}
```

## 7. 🤔 State 应该提升到哪里？

### 7.1. 原则：最近共同祖先

```jsx
// ✅ 只提升到需要的位置
function App() {
  return (
    <div>
      <Header />
      <Main /> {/* SearchBar 和 ResultList 的共同父组件 */}
      <Footer />
    </div>
  )
}

function Main() {
  // ✅ 状态只在 Main 中，不需要提升到 App
  const [query, setQuery] = useState('')

  return (
    <div>
      <SearchBar query={query} onSearch={setQuery} />
      <ResultList query={query} />
    </div>
  )
}
```

### 7.2. 避免过度提升

::: code-group

```jsx [❌ 过度提升]
function App() {
  // ❌ 状态提升到了不需要的位置
  const [modalOpen, setModalOpen] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      <Header /> {/* 不需要这些状态 */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <Content
        modalOpen={modalOpen}
        onModalToggle={setModalOpen}
        tooltipVisible={tooltipVisible}
        onTooltipToggle={setTooltipVisible}
      />
    </div>
  )
}
```

```jsx [✅ 合理位置]
function App() {
  return (
    <div>
      <Header />
      <Sidebar /> {/* 在这里管理 activeTab */}
      <Content /> {/* 在这里管理 modal 和 tooltip */}
    </div>
  )
}

function Sidebar() {
  // ✅ 状态在需要的组件中
  const [activeTab, setActiveTab] = useState(0)

  return <div>...</div>
}

function Content() {
  // ✅ 各自管理自己的状态
  const [modalOpen, setModalOpen] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)

  return <div>...</div>
}
```

:::

### 7.3. 使用 Context 避免深层传递

```jsx
import { createContext, useContext, useState } from 'react'

// ✅ 深层组件需要的状态用 Context
const ThemeContext = createContext()

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  )
}

// 深层组件直接使用 Context
function DeepNestedButton() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      切换主题
    </button>
  )
}
```

### 7.4. 状态位置决策流程

```jsx
// 决策流程
function decideStateLocation() {
  // 1. 只有一个组件使用？
  if (singleComponentUse) {
    return '放在该组件内部'
  }

  // 2. 多个兄弟组件使用？
  if (siblingComponentsUse) {
    return '提升到父组件'
  }

  // 3. 深层嵌套的多个组件使用？
  if (deepNestedComponentsUse) {
    return '使用 Context'
  }

  // 4. 全局使用？
  if (globalUse) {
    return '使用全局状态管理（Redux、Zustand 等）'
  }

  return '默认放在最近的共同祖先'
}
```

## 8. 🔗 引用

- [React 官方文档 - State 提升][1]
- [React 官方文档 - 组件间共享状态][2]
- [React 设计模式 - State 提升][3]

[1]: https://react.dev/learn/sharing-state-between-components
[2]: https://react.dev/learn/managing-state
[3]: https://react.dev/learn/thinking-in-react
