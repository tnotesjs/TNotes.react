# [0180. useDeferredValue（React 18+）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0180.%20useDeferredValue%EF%BC%88React%2018%2B%EF%BC%89)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. useDeferredValue 是什么？](#2-usedeferredvalue-是什么)
- [3. 为什么需要 useDeferredValue？](#3-为什么需要-usedeferredvalue)
- [4. 如何使用 useDeferredValue？](#4-如何使用-usedeferredvalue)
- [5. useDeferredValue vs useTransition](#5-usedeferredvalue-vs-usetransition)
- [6. 有哪些实际应用场景？](#6-有哪些实际应用场景)
- [7. 如何优化搜索和过滤？](#7-如何优化搜索和过滤)
- [8. 有哪些最佳实践？](#8-有哪些最佳实践)
- [9. 有哪些常见问题？](#9-有哪些常见问题)
- [10. 引用](#10-引用)

<!-- endregion:toc -->

## 1. 本节内容

- useDeferredValue 的基本概念
- 延迟更新的工作原理
- 与 useTransition 的对比
- 搜索、过滤等场景的应用
- 性能优化技巧
- 最佳实践和注意事项
- 常见问题和解决方案

这篇笔记讲解 React 18 中新增的用于延迟更新值的 Hook：useDeferredValue。

- useDeferredValue 是 React 18 新增的并发特性，用于延迟更新非关键的 UI 部分
- 主要用于优化高频更新场景，让关键 UI 保持响应，非关键 UI 延迟更新
- 典型场景包括搜索框、过滤器、实时预览等需要即时反馈的交互
- 与 useTransition 类似但使用场景不同：useDeferredValue 用于你无法控制的值，useTransition 用于你可以控制的更新
- 延迟更新是可中断的，当新值到来时会放弃旧的延迟更新
- 需要配合 React.memo 或 useMemo 使用才能真正提升性能

## 2. useDeferredValue 是什么？

`useDeferredValue` 用于延迟更新部分 UI，让高优先级的更新先完成。

```typescript
// 基本语法
const deferredValue = useDeferredValue(value)

// 参数：
// - value: 要延迟的值（任何类型）

// 返回值：
// - 在初始渲染时，返回值等于传入的值
// - 在更新时，React 会先用旧值重新渲染，然后在后台用新值重新渲染

// 基本示例
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query)

  // query 立即更新（高优先级）
  // deferredQuery 延迟更新（低优先级）

  return (
    <div>
      <p>当前输入：{query}</p>
      <p>搜索结果基于：{deferredQuery}</p>
      <Results query={deferredQuery} />
    </div>
  )
}

// 工作流程示例
function Demo() {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)

  // 用户输入 "hello"：
  // 1. text = "h"，deferredText = ""（使用旧值）
  // 2. text = "he"，deferredText = "h"（使用上一次的值）
  // 3. text = "hel"，deferredText = "he"
  // 4. text = "hell"，deferredText = "hel"
  // 5. text = "hello"，deferredText = "hell"
  // 6. 输入停止后，deferredText = "hello"（最终同步）

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>即时：{text}</p>
      <p>延迟：{deferredText}</p>
    </div>
  )
}
```

核心特性：

```typescript
// 特性 1：延迟是可中断的
function InterruptibleUpdate() {
  const [input, setInput] = useState('')
  const deferredInput = useDeferredValue(input)

  // 当用户快速输入时：
  // - 每次输入都会中断之前的延迟更新
  // - 只有最后一次输入的延迟更新会完成

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <ExpensiveComponent value={deferredInput} />
    </div>
  )
}

// 特性 2：需要配合 memo 使用
const ExpensiveList = memo(function ExpensiveList({
  items,
}: {
  items: string[]
}) {
  // ✅ 使用 memo 包裹，只有 items 真正改变时才重新渲染
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
})

function OptimizedSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredItems = useMemo(() => {
    return largeList.filter((item) =>
      item.toLowerCase().includes(deferredQuery.toLowerCase())
    )
  }, [deferredQuery])

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ExpensiveList items={filteredItems} /> {/* ✅ memo 组件 */}
    </div>
  )
}

// 特性 3：初始值立即可用
function InitialValue() {
  const [value, setValue] = useState('initial')
  const deferredValue = useDeferredValue(value)

  // 首次渲染：value === deferredValue === 'initial'
  // 更新时：value 先变，deferredValue 后变

  console.log('Value:', value)
  console.log('Deferred:', deferredValue)
  console.log('Is outdated:', value !== deferredValue)

  return <div />
}

// 特性 4：自动批处理
function AutoBatching() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const deferredQuery = useDeferredValue(query)
  const deferredFilter = useDeferredValue(filter)

  // React 会智能地批处理延迟更新

  return <Results query={deferredQuery} filter={deferredFilter} />
}
```

## 3. 为什么需要 useDeferredValue？

解决高频更新导致的性能问题。

```typescript
// 问题场景：实时搜索卡顿
function SlowSearch() {
  const [query, setQuery] = useState('')

  // ❌ 问题：每次输入都会触发昂贵的计算
  const results = useMemo(() => {
    return hugeList.filter((item) =>
      item.text.toLowerCase().includes(query.toLowerCase())
    )
  }, [query]) // query 每次输入都变化

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // ⚠️ 输入时会卡顿，因为要等待过滤完成
      />
      <div>
        {results.map((item) => (
          <div key={item.id}>{item.text}</div>
        ))}
      </div>
    </div>
  )
}

// 解决方案 1：使用 useDeferredValue
function FastSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  // ✅ 输入框立即响应（使用 query）
  // ✅ 搜索结果延迟更新（使用 deferredQuery）
  const results = useMemo(() => {
    return hugeList.filter((item) =>
      item.text.toLowerCase().includes(deferredQuery.toLowerCase())
    )
  }, [deferredQuery]) // 使用延迟的值

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // ✅ 输入流畅，不会卡顿
      />
      <div>
        {results.map((item) => (
          <div key={item.id}>{item.text}</div>
        ))}
      </div>
    </div>
  )
}

// 解决方案 2：添加防抖对比
function DebounceSearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // ❌ 传统防抖：有固定延迟
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300) // 固定 300ms 延迟

    return () => clearTimeout(timer)
  }, [query])

  // ⚠️ 即使计算很快，也要等 300ms
  // ⚠️ 即使计算很慢，也只等 300ms（可能还是卡）

  return <div>{/* ... */}</div>
}

function DeferredSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  // ✅ useDeferredValue：智能延迟
  // - 如果计算快，延迟很短
  // - 如果计算慢，自动延长延迟
  // - 如果有新输入，中断旧的计算

  return <div>{/* ... */}</div>
}
```

## 4. 如何使用 useDeferredValue？

基本使用模式。

```typescript
// 模式 1：搜索过滤
function SearchFilter() {
  const [searchText, setSearchText] = useState('')
  const deferredSearchText = useDeferredValue(searchText)

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(deferredSearchText.toLowerCase())
    )
  }, [deferredSearchText])

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="搜索..."
      />
      {/* 显示加载状态 */}
      {searchText !== deferredSearchText && <div>正在搜索...</div>}
      <List items={filteredData} />
    </div>
  )
}

// 模式 2：实时预览
function LivePreview() {
  const [code, setCode] = useState('')
  const deferredCode = useDeferredValue(code)

  return (
    <div style={{ display: 'flex' }}>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ flex: 1 }}
      />
      <div style={{ flex: 1 }}>
        {/* 预览使用延迟的代码 */}
        <Preview code={deferredCode} />
      </div>
    </div>
  )
}

// 模式 3：大列表渲染
function BigList({ items }: { items: any[] }) {
  const [sortBy, setSortBy] = useState('name')
  const deferredSortBy = useDeferredValue(sortBy)

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      return a[deferredSortBy] > b[deferredSortBy] ? 1 : -1
    })
  }, [items, deferredSortBy])

  return (
    <div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">名称</option>
        <option value="date">日期</option>
        <option value="size">大小</option>
      </select>
      {sortBy !== deferredSortBy && <div>排序中...</div>}
      <VirtualizedList items={sortedItems} />
    </div>
  )
}

// 模式 4：多个延迟值
function MultipleDeferred() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('name')

  const deferredQuery = useDeferredValue(query)
  const deferredFilter = useDeferredValue(filter)
  const deferredSort = useDeferredValue(sort)

  const processedData = useMemo(() => {
    let result = data.filter((item) => item.name.includes(deferredQuery))

    if (deferredFilter !== 'all') {
      result = result.filter((item) => item.category === deferredFilter)
    }

    result.sort((a, b) => (a[deferredSort] > b[deferredSort] ? 1 : -1))

    return result
  }, [deferredQuery, deferredFilter, deferredSort])

  const isOutdated =
    query !== deferredQuery ||
    filter !== deferredFilter ||
    sort !== deferredSort

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">全部</option>
        <option value="active">活动</option>
        <option value="inactive">非活动</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="name">名称</option>
        <option value="date">日期</option>
      </select>
      {isOutdated && <div>更新中...</div>}
      <ResultsList items={processedData} />
    </div>
  )
}

// 模式 5：条件延迟
function ConditionalDeferred({ enableDefer }: { enableDefer: boolean }) {
  const [value, setValue] = useState('')
  const deferredValue = useDeferredValue(value)

  // 根据条件选择使用哪个值
  const displayValue = enableDefer ? deferredValue : value

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <ExpensiveComponent value={displayValue} />
    </div>
  )
}
```

## 5. useDeferredValue vs useTransition

两者的区别和选择。

```typescript
// useDeferredValue：用于你不能控制的值
function UseDeferredValueExample({ externalQuery }: { externalQuery: string }) {
  // ✅ 适合：props 传入的值，你无法控制更新时机
  const deferredQuery = useDeferredValue(externalQuery)

  return <Results query={deferredQuery} />
}

// useTransition：用于你可以控制的更新
function UseTransitionExample() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ✅ 适合：你可以控制 state 的更新时机
    const value = e.target.value
    startTransition(() => {
      setQuery(value)
    })
  }

  return (
    <div>
      <input onChange={handleChange} />
      {isPending && <div>搜索中...</div>}
      <Results query={query} />
    </div>
  )
}

// 对比表格
/*
| 特性              | useDeferredValue        | useTransition           |
|-------------------|-------------------------|-------------------------|
| 使用场景          | 延迟外部传入的值        | 延迟自己触发的更新      |
| 控制权            | 无法控制值的来源        | 可以控制更新时机        |
| pending 状态      | 需要手动判断            | 自动提供 isPending      |
| 典型用途          | props、外部状态         | 本地 state 更新         |
| 示例              | 搜索框的 props          | 点击按钮切换 tab        |
*/

// 实际对比示例
interface Item {
  id: number
  name: string
}

// 场景 1：使用 useDeferredValue（接收 props）
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(deferredQuery.toLowerCase())
    )
  }, [deferredQuery])

  return (
    <div>
      {query !== deferredQuery && <div>搜索中...</div>}
      <List items={results} />
    </div>
  )
}

function ParentWithDeferredValue() {
  const [query, setQuery] = useState('')

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchResults query={query} /> {/* 传递 props */}
    </div>
  )
}

// 场景 2：使用 useTransition（控制 state）
function SearchWithTransition() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  const results = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setQuery(e.target.value)
    })
  }

  return (
    <div>
      <input onChange={handleChange} />
      {isPending && <div>搜索中...</div>}
      <List items={results} />
    </div>
  )
}

// 何时使用哪个？
function WhenToUse() {
  // ✅ 使用 useDeferredValue：
  // - 延迟来自 props 的值
  // - 延迟来自第三方库的值
  // - 你无法控制值的更新时机
  // ✅ 使用 useTransition：
  // - 延迟自己的 setState
  // - 需要知道是否在 pending 状态
  // - 你可以控制更新时机
}
```

## 6. 有哪些实际应用场景？

```typescript
// 场景 1：自动完成搜索框
function Autocomplete() {
  const [input, setInput] = useState('')
  const deferredInput = useDeferredValue(input)

  const suggestions = useMemo(() => {
    if (!deferredInput) return []

    return database
      .filter((item) =>
        item.toLowerCase().startsWith(deferredInput.toLowerCase())
      )
      .slice(0, 10)
  }, [deferredInput])

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入搜索..."
      />
      {input !== deferredInput && <div className="loading">搜索中...</div>}
      <ul>
        {suggestions.map((item, i) => (
          <li key={i} onClick={() => setInput(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// 场景 2：代码编辑器语法高亮
function CodeEditor() {
  const [code, setCode] = useState('')
  const deferredCode = useDeferredValue(code)

  const highlightedCode = useMemo(() => {
    // 昂贵的语法高亮计算
    return syntaxHighlight(deferredCode)
  }, [deferredCode])

  return (
    <div className="editor">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="editor-input"
      />
      <div
        className="editor-preview"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  )
}

// 场景 3：图表数据可视化
function DataVisualization() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const deferredRange = useDeferredValue(dateRange)

  const chartData = useMemo(() => {
    return processChartData(rawData, deferredRange)
  }, [deferredRange])

  const isUpdating = dateRange !== deferredRange

  return (
    <div>
      <DateRangePicker value={dateRange} onChange={setDateRange} />
      {isUpdating && <div className="overlay">更新图表中...</div>}
      <Chart data={chartData} />
    </div>
  )
}

// 场景 4：表格过滤和排序
function DataTable() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
  })
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc',
  })

  const deferredFilters = useDeferredValue(filters)
  const deferredSort = useDeferredValue(sortConfig)

  const processedData = useMemo(() => {
    let result = [...rawData]

    // 过滤
    if (deferredFilters.search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(deferredFilters.search.toLowerCase())
      )
    }
    if (deferredFilters.category !== 'all') {
      result = result.filter(
        (item) => item.category === deferredFilters.category
      )
    }
    if (deferredFilters.status !== 'all') {
      result = result.filter((item) => item.status === deferredFilters.status)
    }

    // 排序
    result.sort((a, b) => {
      const aVal = a[deferredSort.key]
      const bVal = b[deferredSort.key]
      const modifier = deferredSort.direction === 'asc' ? 1 : -1
      return aVal > bVal ? modifier : -modifier
    })

    return result
  }, [deferredFilters, deferredSort])

  return (
    <div>
      <TableFilters filters={filters} onChange={setFilters} />
      <Table data={processedData} sort={sortConfig} onSort={setSortConfig} />
    </div>
  )
}

// 场景 5：实时 Markdown 预览
function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('')
  const deferredMarkdown = useDeferredValue(markdown)

  const html = useMemo(() => {
    return markdownToHtml(deferredMarkdown)
  }, [deferredMarkdown])

  return (
    <div className="markdown-editor">
      <div className="editor-pane">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="输入 Markdown..."
        />
      </div>
      <div className="preview-pane">
        {markdown !== deferredMarkdown && (
          <div className="preview-loading">渲染中...</div>
        )}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
```

## 7. 如何优化搜索和过滤？

完整的搜索优化方案。

```typescript
// 优化策略 1：配合 memo 使用
const SearchResultItem = memo(function SearchResultItem({
  item,
}: {
  item: Item
}) {
  console.log('Rendering:', item.name)
  return <div className="result-item">{item.name}</div>
})

function OptimizedSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    return largeDataset.filter((item) =>
      item.name.toLowerCase().includes(deferredQuery.toLowerCase())
    )
  }, [deferredQuery])

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {results.map((item) => (
        <SearchResultItem key={item.id} item={item} />
      ))}
    </div>
  )
}

// 优化策略 2：显示加载状态
function SearchWithStatus() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const isStale = query !== deferredQuery

  const results = useMemo(() => {
    return data.filter((item) => item.name.includes(deferredQuery))
  }, [deferredQuery])

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className={isStale ? 'results-stale' : 'results-fresh'}>
        {isStale && <div className="loading-indicator">更新中...</div>}
        {results.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  )
}

// 优化策略 3：防抖 + useDeferredValue
function HybridOptimization() {
  const [rawInput, setRawInput] = useState('')
  const [debouncedInput, setDebouncedInput] = useState('')
  const deferredInput = useDeferredValue(debouncedInput)

  // 先防抖，再延迟
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(rawInput)
    }, 300)

    return () => clearTimeout(timer)
  }, [rawInput])

  const results = useMemo(() => {
    return data.filter((item) => item.name.includes(deferredInput))
  }, [deferredInput])

  return (
    <div>
      <input value={rawInput} onChange={(e) => setRawInput(e.target.value)} />
      <ResultsList items={results} />
    </div>
  )
}

// 优化策略 4：虚拟化长列表
function VirtualizedSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredItems = useMemo(() => {
    return hugeList.filter((item) =>
      item.name.toLowerCase().includes(deferredQuery.toLowerCase())
    )
  }, [deferredQuery])

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <VirtualList
        items={filteredItems}
        height={600}
        itemHeight={50}
        renderItem={(item) => <div>{item.name}</div>}
      />
    </div>
  )
}
```

## 8. 有哪些最佳实践？

```typescript
// 实践 1：总是配合 memo 或 useMemo
// ❌ 不好：没有优化，每次都重新渲染
function BadPractice() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  // ❌ 没有使用 memo，useDeferredValue 没有意义
  return <ExpensiveList query={deferredQuery} />
}

// ✅ 好：使用 memo 避免不必要的渲染
const MemoizedList = memo(ExpensiveList)

function GoodPractice() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  return <MemoizedList query={deferredQuery} />
}

// 实践 2：显示过渡状态
function ShowTransition() {
  const [value, setValue] = useState('')
  const deferredValue = useDeferredValue(value)

  const isStale = value !== deferredValue

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {isStale && (
        <div className="loading-indicator">
          <Spinner /> 更新中...
        </div>
      )}
      <Results value={deferredValue} />
    </div>
  )
}

// 实践 3：合理使用延迟粒度
// ❌ 不好：过度延迟
function OverDeferred() {
  const [input, setInput] = useState('')
  const deferred1 = useDeferredValue(input)
  const deferred2 = useDeferredValue(deferred1) // ❌ 多次延迟
  const deferred3 = useDeferredValue(deferred2) // ❌ 没有必要

  return <div>{deferred3}</div>
}

// ✅ 好：适度延迟
function ProperDeferred() {
  const [input, setInput] = useState('')
  const deferredInput = useDeferredValue(input) // ✅ 一次延迟足够

  return <ExpensiveComponent value={deferredInput} />
}

// 实践 4：结合其他优化手段
function CombinedOptimizations() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  // 结合 useMemo
  const results = useMemo(() => {
    return data.filter((item) => item.name.includes(deferredQuery))
  }, [deferredQuery])

  // 结合虚拟化
  const virtualizedResults = useVirtualizer({
    count: results.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 50,
  })

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <VirtualList items={results} virtualizer={virtualizedResults} />
    </div>
  )
}

// 实践 5：TypeScript 类型安全
interface SearchProps<T> {
  items: T[]
  searchKey: keyof T
  renderItem: (item: T) => React.ReactNode
}

function TypeSafeSearch<T extends { id: string }>({
  items,
  searchKey,
  renderItem,
}: SearchProps<T>) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const value = String(item[searchKey])
      return value.toLowerCase().includes(deferredQuery.toLowerCase())
    })
  }, [items, searchKey, deferredQuery])

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {filteredItems.map((item) => (
        <div key={item.id}>{renderItem(item)}</div>
      ))}
    </div>
  )
}
```

## 9. 有哪些常见问题？

```typescript
// 问题 1：忘记使用 memo
// ❌ 错误：没有优化效果
function NoOptimization() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  // ❌ ExpensiveList 没有用 memo 包裹
  // 每次 query 变化都会导致重新渲染
  return <ExpensiveList query={deferredQuery} />
}

// ✅ 正确：使用 memo
const MemoExpensiveList = memo(ExpensiveList)

function WithOptimization() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  return <MemoExpensiveList query={deferredQuery} />
}

// 问题 2：延迟不需要延迟的内容
// ❌ 错误：输入框本身不应该延迟
function BadDelay() {
  const [value, setValue] = useState('')
  const deferredValue = useDeferredValue(value)

  return (
    <div>
      {/* ❌ 输入框使用延迟值，会感觉卡顿 */}
      <input value={deferredValue} onChange={(e) => setValue(e.target.value)} />
      <Results query={deferredValue} />
    </div>
  )
}

// ✅ 正确：只延迟结果显示
function GoodDelay() {
  const [value, setValue] = useState('')
  const deferredValue = useDeferredValue(value)

  return (
    <div>
      {/* ✅ 输入框使用即时值 */}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {/* ✅ 只有结果使用延迟值 */}
      <Results query={deferredValue} />
    </div>
  )
}

// 问题 3：误用 useTransition
// ❌ 错误：应该使用 useDeferredValue
function WrongHook({ externalQuery }: { externalQuery: string }) {
  const [query, setQuery] = useState(externalQuery)
  const [isPending, startTransition] = useTransition()

  // ❌ 不合适：无法控制 props 的更新
  useEffect(() => {
    startTransition(() => {
      setQuery(externalQuery)
    })
  }, [externalQuery])

  return <Results query={query} />
}

// ✅ 正确：直接使用 useDeferredValue
function RightHook({ externalQuery }: { externalQuery: string }) {
  const deferredQuery = useDeferredValue(externalQuery)

  return <Results query={deferredQuery} />
}

// 问题 4：过早优化
// ❌ 不必要：数据很少时不需要
function UnnecessaryDefer() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    // ❌ 只有 10 条数据，不需要延迟
    return ['a', 'b', 'c', 'd', 'e'].filter((item) =>
      item.includes(deferredQuery)
    )
  }, [deferredQuery])

  return <div>{results}</div>
}

// ✅ 合适：数据很多时才使用
function NecessaryDefer() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    // ✅ 10000+ 条数据，需要延迟
    return hugeDataset.filter((item) => item.includes(deferredQuery))
  }, [deferredQuery])

  return <div>{results}</div>
}

// 问题 5：期望固定的延迟时间
// ❌ 误解：useDeferredValue 不是固定延迟
function MisunderstandDelay() {
  const [value, setValue] = useState('')
  const deferredValue = useDeferredValue(value)

  // ❌ 错误理解：deferredValue 不是在固定时间后更新
  // 它会根据系统负载自动调整延迟

  return <div />
}
```

## 10. 引用

- [useDeferredValue 官方文档][1]
- [React 18 并发特性][2]
- [useTransition vs useDeferredValue][3]
- [性能优化最佳实践][4]

[1]: https://react.dev/reference/react/useDeferredValue
[2]: https://react.dev/blog/2022/03/29/react-v18
[3]: https://react.dev/learn/keeping-components-pure
[4]: https://react.dev/learn/render-and-commit
