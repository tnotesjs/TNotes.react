# [0179. useId（React 18+）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0179.%20useId%EF%BC%88React%2018%2B%EF%BC%89)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 useId 是什么？](#3--useid-是什么)
- [4. 🤔 为什么需要 useId？](#4--为什么需要-useid)
- [5. � 如何使用 useId？](#5--如何使用-useid)
- [6. 🤔 如何在列表中使用？](#6--如何在列表中使用)
- [7. 🤔 SSR 环境下如何保证一致性？](#7--ssr-环境下如何保证一致性)
- [8. 🤔 有哪些常见使用场景？](#8--有哪些常见使用场景)
- [9. 🤔 有哪些最佳实践？](#9--有哪些最佳实践)
- [10. 🤔 有哪些常见错误？](#10--有哪些常见错误)
- [11. 🔗 引用](#11--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- useId 的基本概念
- 解决的问题和使用场景
- 与传统 ID 生成方式的对比
- 在表单、无障碍、列表中的应用
- SSR 环境下的 ID 一致性
- 最佳实践和注意事项
- 常见错误和解决方案

## 2. 🫧 评价

这篇笔记讲解 React 18 中新增的用于生成唯一 ID 的 Hook：useId。

- useId 是 React 18 新增的 Hook，用于生成在客户端和服务端保持一致的唯一 ID
- 主要用于无障碍属性（如 `aria-describedby`）和表单元素（如 `htmlFor`）的关联
- 解决了 SSR 环境下客户端和服务端 ID 不一致导致的 hydration 错误
- 不能用作列表的 key，因为 key 应该基于数据而不是渲染顺序
- 每次调用 useId 都会生成新的 ID，需要在组件顶层调用
- 生成的 ID 包含 `:` 字符，不适合用在 CSS 选择器中

## 3. 🤔 useId 是什么？

`useId` 用于生成在服务端和客户端保持一致的唯一 ID。

```typescript
// 基本语法
const id = useId()

// 返回值：字符串形式的唯一 ID
// 格式类似：":r1:" 或 ":r2:" 等

// 基本示例
function Form() {
  const emailId = useId()
  const passwordId = useId()

  return (
    <form>
      <div>
        <label htmlFor={emailId}>邮箱</label>
        <input id={emailId} type="email" />
      </div>
      <div>
        <label htmlFor={passwordId}>密码</label>
        <input id={passwordId} type="password" />
      </div>
    </form>
  )
}

// 每次调用 useId 都会生成不同的 ID
function Example() {
  const id1 = useId() // ":r1:"
  const id2 = useId() // ":r2:"
  const id3 = useId() // ":r3:"

  console.log(id1 === id2) // false

  return <div />
}

// ID 在组件的整个生命周期保持不变
function Counter() {
  const id = useId()
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('ID remains same:', id)
  }, [count]) // ID 不会改变

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count} (ID: {id})
    </button>
  )
}

// 同一个组件的不同实例有不同的 ID
function App() {
  return (
    <div>
      <Form /> {/* 内部 ID: ":r1:", ":r2:" */}
      <Form /> {/* 内部 ID: ":r3:", ":r4:" */}
    </div>
  )
}
```

特性说明：

```typescript
// 特性 1：服务端和客户端 ID 一致
function SSRComponent() {
  const id = useId()

  // 服务端渲染：id = ":r1:"
  // 客户端 hydration：id = ":r1:" (相同！)

  return <div id={id}>内容</div>
}

// 特性 2：在同一渲染树中唯一
function UniqueIds() {
  const id1 = useId()
  const id2 = useId()
  const id3 = useId()

  // 保证在当前应用中唯一
  console.log(new Set([id1, id2, id3]).size === 3) // true

  return <div />
}

// 特性 3：包含冒号字符
function IdFormat() {
  const id = useId()

  console.log(id) // ":r1:" 或类似格式
  console.log(id.includes(':')) // true

  // ⚠️ 不适合用在 CSS 选择器中
  // document.querySelector(`#${id}`); // 可能出错

  return <div id={id} />
}

// 特性 4：不依赖随机数
function Deterministic() {
  const id1 = useId()
  const id2 = useId()

  // ✅ 每次渲染顺序相同，ID 相同
  // ❌ 不像 Math.random()，每次都不同

  return <div />
}
```

## 4. 🤔 为什么需要 useId？

解决传统 ID 生成方式在 SSR 环境下的问题。

```typescript
// 问题 1：使用随机数的问题
let globalId = 0

function BadForm() {
  // ❌ 服务端和客户端会生成不同的 ID
  const [emailId] = useState(() => `email-${Math.random()}`)
  const [passwordId] = useState(() => `password-${Math.random()}`)

  // 服务端渲染：emailId = "email-0.123"
  // 客户端 hydration：emailId = "email-0.456"
  // ⚠️ Hydration mismatch 错误！

  return (
    <form>
      <label htmlFor={emailId}>邮箱</label>
      <input id={emailId} type="email" />
    </form>
  )
}

// ✅ 使用 useId 解决
function GoodForm() {
  const emailId = useId()
  const passwordId = useId()

  // ✅ 服务端和客户端 ID 一致
  // 服务端渲染：emailId = ":r1:"
  // 客户端 hydration：emailId = ":r1:"

  return (
    <form>
      <label htmlFor={emailId}>邮箱</label>
      <input id={emailId} type="email" />
    </form>
  )
}

// 问题 2：全局计数器的问题
function BadCounter() {
  // ❌ 多个组件实例共享全局计数器
  const [id] = useState(() => `field-${globalId++}`)

  // 第一个实例：id = "field-0"
  // 第二个实例：id = "field-1"
  // ⚠️ 但服务端和客户端的渲染顺序可能不同！

  return <input id={id} />
}

// 问题 3：硬编码 ID 的问题
function HardcodedId() {
  // ❌ 多个实例会有相同的 ID
  return (
    <div>
      <label htmlFor="email">邮箱</label>
      <input id="email" type="email" />
    </div>
  )
}

function App() {
  return (
    <div>
      <HardcodedId /> {/* id="email" */}
      <HardcodedId /> {/* id="email" ⚠️ 重复！ */}
    </div>
  )
}

// ✅ useId 解决所有问题
function GoodComponent() {
  const id = useId()

  // ✅ 每个实例有唯一 ID
  // ✅ 服务端和客户端一致
  // ✅ 不依赖全局状态

  return (
    <div>
      <label htmlFor={id}>邮箱</label>
      <input id={id} type="email" />
    </div>
  )
}
```

## 5. � 如何使用 useId？

在表单和无障碍属性中使用。

```typescript
// 用法 1：表单 label 和 input 关联
function LoginForm() {
  const emailId = useId()
  const passwordId = useId()

  return (
    <form>
      <div>
        <label htmlFor={emailId}>邮箱：</label>
        <input id={emailId} type="email" name="email" required />
      </div>
      <div>
        <label htmlFor={passwordId}>密码：</label>
        <input id={passwordId} type="password" name="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
  )
}

// 用法 2：生成多个相关 ID
function FormField({ label, type = 'text' }: { label: string; type?: string }) {
  const id = useId()

  // 基于同一个 ID 生成多个相关 ID
  const inputId = `${id}-input`
  const errorId = `${id}-error`
  const descId = `${id}-desc`

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type={type}
        aria-describedby={descId}
        aria-errormessage={errorId}
      />
      <span id={descId}>请输入{label}</span>
      <span id={errorId} role="alert"></span>
    </div>
  )
}

// 用法 3：无障碍属性
function AccessibleDialog() {
  const titleId = useId()
  const descId = useId()

  return (
    <div role="dialog" aria-labelledby={titleId} aria-describedby={descId}>
      <h2 id={titleId}>确认删除</h2>
      <p id={descId}>此操作不可恢复，确定要删除吗？</p>
      <button>确定</button>
      <button>取消</button>
    </div>
  )
}

// 用法 4：单选按钮组
function RadioGroup() {
  const groupId = useId()

  return (
    <fieldset>
      <legend>选择颜色</legend>
      <div>
        <input type="radio" id={`${groupId}-red`} name="color" value="red" />
        <label htmlFor={`${groupId}-red`}>红色</label>
      </div>
      <div>
        <input type="radio" id={`${groupId}-blue`} name="color" value="blue" />
        <label htmlFor={`${groupId}-blue`}>蓝色</label>
      </div>
      <div>
        <input
          type="radio"
          id={`${groupId}-green`}
          name="color"
          value="green"
        />
        <label htmlFor={`${groupId}-green`}>绿色</label>
      </div>
    </fieldset>
  )
}

// 用法 5：复杂表单
function ComplexForm() {
  const formId = useId()

  const fieldIds = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    phone: `${formId}-phone`,
    address: `${formId}-address`,
  }

  return (
    <form>
      <div>
        <label htmlFor={fieldIds.name}>姓名</label>
        <input id={fieldIds.name} type="text" />
      </div>
      <div>
        <label htmlFor={fieldIds.email}>邮箱</label>
        <input id={fieldIds.email} type="email" />
      </div>
      <div>
        <label htmlFor={fieldIds.phone}>电话</label>
        <input id={fieldIds.phone} type="tel" />
      </div>
      <div>
        <label htmlFor={fieldIds.address}>地址</label>
        <textarea id={fieldIds.address} />
      </div>
    </form>
  )
}
```

## 6. 🤔 如何在列表中使用？

不能用作 key，但可以用于元素的 id 属性。

```typescript
// ❌ 错误：不要用作 key
function WrongList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => {
        const id = useId() // ❌ 不能在循环中调用 Hook
        return <li key={id}>{item}</li>
      })}
    </ul>
  )
}

// ❌ 错误：即使在外部生成也不应该用作 key
function StillWrong({ items }: { items: string[] }) {
  const ids = items.map(() => useId()) // ❌ 不能在循环中调用

  return (
    <ul>
      {items.map((item, index) => (
        <li key={ids[index]}>{item}</li>
      ))}
    </ul>
  )
}

// ✅ 正确：使用数据中的唯一标识作为 key
function CorrectList({
  items,
}: {
  items: Array<{ id: string; name: string }>
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li> // ✅ 使用数据的 id
      ))}
    </ul>
  )
}

// ✅ 正确：useId 用于其他用途
function ListWithLabels({
  items,
}: {
  items: Array<{ id: string; name: string }>
}) {
  const listId = useId() // 为整个列表生成 ID

  return (
    <ul id={listId} aria-label="用户列表">
      {items.map((item) => (
        <li key={item.id}>
          {' '}
          {/* ✅ key 使用数据的 id */}
          <span id={`${listId}-item-${item.id}`}>
            {' '}
            {/* ✅ 元素 id 可以组合 */}
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  )
}

// 封装列表项组件
function ListItem({ item }: { item: { id: string; name: string } }) {
  const itemId = useId() // 每个列表项组件有自己的 ID
  const labelId = `${itemId}-label`
  const descId = `${itemId}-desc`

  return (
    <div aria-labelledby={labelId} aria-describedby={descId}>
      <h3 id={labelId}>{item.name}</h3>
      <p id={descId}>{item.description}</p>
    </div>
  )
}

function List({ items }: { items: Array<{ id: string; name: string }> }) {
  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.id} item={item} /> // ✅ key 用数据 id
      ))}
    </div>
  )
}
```

## 7. 🤔 SSR 环境下如何保证一致性？

useId 自动处理 SSR 环境的 ID 一致性。

```typescript
// React 18 之前的做法
function OldWay() {
  const [id, setId] = useState<string>()

  // ❌ 问题：服务端返回 null，客户端才生成 ID
  useEffect(() => {
    setId(`id-${Math.random()}`)
  }, [])

  if (!id) {
    // 服务端渲染时返回 null
    return null
  }

  return (
    <div>
      <label htmlFor={id}>输入框</label>
      <input id={id} />
    </div>
  )
}

// React 18 的做法
function NewWay() {
  const id = useId()

  // ✅ 服务端和客户端都能正确生成一致的 ID
  return (
    <div>
      <label htmlFor={id}>输入框</label>
      <input id={id} />
    </div>
  )
}

// SSR 示例：服务端代码
import { renderToString } from 'react-dom/server'

function ServerComponent() {
  const id = useId() // 服务端生成：":r1:"

  return <input id={id} />
}

const html = renderToString(<ServerComponent />)
// html = '<input id=":r1:"/>'

// SSR 示例：客户端 hydration
import { hydrateRoot } from 'react-dom/client'

function ClientComponent() {
  const id = useId() // 客户端也生成：":r1:"

  return <input id={id} />
}

hydrateRoot(container, <ClientComponent />)
// ✅ 客户端生成的 ID 与服务端一致，不会报 hydration 错误

// 多个组件实例
function MultipleInstances() {
  return (
    <div>
      <FormField label="用户名" /> {/* 内部 useId: ":r1:" */}
      <FormField label="密码" /> {/* 内部 useId: ":r2:" */}
      <FormField label="邮箱" /> {/* 内部 useId: ":r3:" */}
    </div>
  )
}

// 服务端和客户端渲染顺序相同，ID 完全一致
```

## 8. 🤔 有哪些常见使用场景？

```typescript
// 场景 1：可复用的表单组件
interface InputProps {
  label: string
  type?: string
  error?: string
  helperText?: string
}

function Input({ label, type = 'text', error, helperText }: InputProps) {
  const id = useId()
  const errorId = error ? `${id}-error` : undefined
  const helperId = helperText ? `${id}-helper` : undefined

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={helperId}
        aria-errormessage={errorId}
      />
      {helperText && <span id={helperId}>{helperText}</span>}
      {error && (
        <span id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

// 场景 2：工具提示组件
interface TooltipProps {
  content: string
  children: React.ReactNode
}

function Tooltip({ content, children }: TooltipProps) {
  const tooltipId = useId()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <button
        aria-describedby={isVisible ? tooltipId : undefined}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </button>
      {isVisible && (
        <div id={tooltipId} role="tooltip">
          {content}
        </div>
      )}
    </div>
  )
}

// 场景 3：手风琴组件
interface AccordionItemProps {
  title: string
  content: string
}

function AccordionItem({ title, content }: AccordionItemProps) {
  const id = useId()
  const buttonId = `${id}-button`
  const panelId = `${id}-panel`
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        {content}
      </div>
    </div>
  )
}

// 场景 4：选项卡组件
function Tabs({ tabs }: { tabs: Array<{ label: string; content: string }> }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const id = useId()

  return (
    <div>
      <div role="tablist">
        {tabs.map((tab, index) => {
          const tabId = `${id}-tab-${index}`
          const panelId = `${id}-panel-${index}`

          return (
            <button
              key={index}
              id={tabId}
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={panelId}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {tabs.map((tab, index) => {
        const tabId = `${id}-tab-${index}`
        const panelId = `${id}-panel-${index}`

        return (
          <div
            key={index}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={activeIndex !== index}
          >
            {tab.content}
          </div>
        )
      })}
    </div>
  )
}

// 场景 5：复选框组
function CheckboxGroup({
  label,
  options,
}: {
  label: string
  options: Array<{ value: string; label: string }>
}) {
  const groupId = useId()
  const [selected, setSelected] = useState<Set<string>>(new Set())

  return (
    <fieldset>
      <legend id={`${groupId}-legend`}>{label}</legend>
      {options.map((option, index) => {
        const optionId = `${groupId}-option-${index}`

        return (
          <div key={option.value}>
            <input
              id={optionId}
              type="checkbox"
              value={option.value}
              checked={selected.has(option.value)}
              onChange={(e) => {
                const newSelected = new Set(selected)
                if (e.target.checked) {
                  newSelected.add(option.value)
                } else {
                  newSelected.delete(option.value)
                }
                setSelected(newSelected)
              }}
            />
            <label htmlFor={optionId}>{option.label}</label>
          </div>
        )
      })}
    </fieldset>
  )
}
```

## 9. 🤔 有哪些最佳实践？

```typescript
// 实践 1：在组件顶层调用
function GoodComponent() {
  const id = useId() // ✅ 在顶层调用
  const [value, setValue] = useState('')

  return (
    <div>
      <label htmlFor={id}>输入</label>
      <input id={id} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

// ❌ 不要在条件语句中调用
function BadComponent({ showInput }: { showInput: boolean }) {
  const [value, setValue] = useState('')

  if (showInput) {
    const id = useId() // ❌ 错误：在条件中调用
    return (
      <div>
        <label htmlFor={id}>输入</label>
        <input
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    )
  }

  return null
}

// 实践 2：使用前缀组合多个 ID
function GoodPrefix() {
  const baseId = useId()

  // ✅ 好：使用前缀区分不同用途
  const inputId = `${baseId}-input`
  const errorId = `${baseId}-error`
  const helperId = `${baseId}-helper`

  return (
    <div>
      <input
        id={inputId}
        aria-describedby={helperId}
        aria-errormessage={errorId}
      />
      <span id={helperId}>帮助文本</span>
      <span id={errorId}>错误信息</span>
    </div>
  )
}

// 实践 3：不要用于 CSS 选择器
function AvoidInCSS() {
  const id = useId()

  // ❌ 不好：ID 包含冒号，CSS 选择器会出问题
  // document.querySelector(`#${id}`); // 可能失败

  // ✅ 好：使用 ref 或 class
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.classList.add('active')
  }, [])

  return <div ref={ref} id={id} />
}

// 实践 4：为复用组件生成唯一 ID
function ReusableInput({ name }: { name: string }) {
  const id = useId() // ✅ 每个实例都有唯一 ID

  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <input id={id} name={name} />
    </div>
  )
}

function Form() {
  return (
    <form>
      <ReusableInput name="username" /> {/* id: ":r1:" */}
      <ReusableInput name="email" /> {/* id: ":r2:" */}
      <ReusableInput name="password" /> {/* id: ":r3:" */}
    </form>
  )
}

// 实践 5：结合 TypeScript 类型安全
interface FormFieldProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel'
  required?: boolean
  'aria-label'?: string
}

function TypeSafeFormField({
  label,
  type = 'text',
  required = false,
  'aria-label': ariaLabel,
}: FormFieldProps) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && <span aria-label="必填">*</span>}
      </label>
      <input id={id} type={type} required={required} aria-label={ariaLabel} />
    </div>
  )
}
```

## 10. 🤔 有哪些常见错误？

```typescript
// 错误 1：用作列表的 key
// ❌ 错误
function WrongKey({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => {
        const id = useId() // ❌ 不能在循环中调用
        return <li key={id}>{item}</li>
      })}
    </ul>
  )
}

// ✅ 正确：使用数据的唯一标识
function CorrectKey({ items }: { items: Array<{ id: string; text: string }> }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  )
}

// 错误 2：在条件语句中使用
// ❌ 错误
function ConditionalHook({ show }: { show: boolean }) {
  if (show) {
    const id = useId() // ❌ 违反 Hook 规则
    return <input id={id} />
  }
  return null
}

// ✅ 正确：始终调用 Hook
function AlwaysCallHook({ show }: { show: boolean }) {
  const id = useId() // ✅ 总是调用

  if (!show) {
    return null
  }

  return <input id={id} />
}

// 错误 3：期望固定的 ID 格式
// ❌ 错误：依赖 ID 的具体格式
function BadIdUsage() {
  const id = useId()

  // ❌ 不要假设 ID 的格式
  if (id.startsWith(':r')) {
    console.log('This is a useId ID')
  }

  // ❌ 不要解析或修改 ID
  const numericId = parseInt(id.replace(/\D/g, ''))

  return <div id={id} />
}

// ✅ 正确：将 ID 视为不透明字符串
function GoodIdUsage() {
  const id = useId()

  // ✅ 直接使用，不依赖格式
  return <div id={id} />
}

// 错误 4：在循环外为列表项生成 ID
// ❌ 错误
function BadListIds({ items }: { items: string[] }) {
  const ids = items.map(() => useId()) // ❌ 不能在循环中调用

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} id={ids[index]}>
          {item}
        </li>
      ))}
    </ul>
  )
}

// ✅ 正确：将 useId 放在子组件中
function ListItem({ text }: { text: string }) {
  const id = useId() // ✅ 在组件中调用

  return <li id={id}>{text}</li>
}

function GoodListIds({
  items,
}: {
  items: Array<{ id: string; text: string }>
}) {
  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id} text={item.text} />
      ))}
    </ul>
  )
}

// 错误 5：在自定义 Hook 外使用
// ❌ 错误：导出 ID 值
function useExportId() {
  const id = useId()
  return id // ❌ 每次调用都会生成新的 ID
}

function BadHookUsage() {
  const id1 = useExportId()
  const id2 = useExportId()

  console.log(id1 === id2) // false，不是同一个 ID

  return <div />
}

// ✅ 正确：在组件中直接使用
function GoodHookUsage() {
  const id = useId() // ✅ 直接在组件中调用

  return <div id={id} />
}
```

## 11. 🔗 引用

- [useId 官方文档][1]
- [React 18 新特性][2]
- [无障碍最佳实践][3]
- [SSR 与 Hydration][4]

[1]: https://react.dev/reference/react/useId
[2]: https://react.dev/blog/2022/03/29/react-v18
[3]: https://www.w3.org/WAI/ARIA/apg/
[4]: https://react.dev/reference/react-dom/server
