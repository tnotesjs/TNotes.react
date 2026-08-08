# [0181. useTransition（React 18+）](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0181.%20useTransition%EF%BC%88React%2018%2B%EF%BC%89)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. useTransition 是什么？](#2-usetransition-是什么)
- [3. 如何使用 useTransition？](#3-如何使用-usetransition)
- [4. startTransition 有什么特点？](#4-starttransition-有什么特点)
- [5. useTransition vs useDeferredValue](#5-usetransition-vs-usedeferredvalue)
- [6. 有哪些实际应用场景？](#6-有哪些实际应用场景)
- [7. 如何优化搜索和过滤？](#7-如何优化搜索和过滤)
- [8. 有哪些最佳实践？](#8-有哪些最佳实践)
- [9. 有哪些常见问题？](#9-有哪些常见问题)
- [10. 引用](#10-引用)

<!-- endregion:toc -->

## 1. 本节内容

- useTransition 基本概念与作用
- startTransition 的使用方法
- isPending 状态管理
- useTransition 与 useDeferredValue 对比
- 实际应用场景（搜索、标签切换、路由跳转）
- 性能优化最佳实践
- 常见问题与解决方案

这篇笔记介绍 React 18 的 useTransition Hook，用于标记非紧急更新，保持界面响应性。

- useTransition 通过降低更新优先级来避免 UI 卡顿
- 适合处理耗时计算、大列表渲染等场景
- isPending 状态可用于显示加载指示器
- 与 useDeferredValue 的主要区别是控制粒度不同
- 正确使用可显著提升用户体验

## 2. useTransition 是什么？

useTransition 是 React 18 引入的 Hook，用于标记非紧急的状态更新。

```js
import { useTransition } from "react";

function App() {
  const [isPending, startTransition] = useTransition();

  // isPending：过渡状态是否进行中
  // startTransition：标记非紧急更新的函数
}
```

核心概念：

```js
// 工作原理
const transition = {
  // 紧急更新：用户输入、点击等
  urgent: {
    priority: "high",
    example: "输入框输入",
    behavior: "立即更新，可能阻塞界面",
  },

  // 过渡更新：通过 startTransition 包裹
  nonUrgent: {
    priority: "low",
    example: "搜索结果渲染",
    behavior: "可中断，让出主线程",
  },
};

// 实际效果
function SearchDemo() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value) => {
    // ✅ 紧急更新：立即更新输入框
    setQuery(value);

    // ✅ 过渡更新：延迟更新搜索结果
    startTransition(() => {
      const filtered = expensiveSearch(value);
      setResults(filtered);
    });
  };

  return (
    <>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="输入搜索..."
      />
      {isPending && <span>搜索中...</span>}
      <ResultList results={results} />
    </>
  );
}
```

为什么需要 useTransition：

```js
// ❌ 没有 useTransition：全部是紧急更新
function SlowList() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // 更新输入框

    // ❌ 耗时计算阻塞输入
    const filtered = items.filter(
      (item) => expensiveMatch(item, value), // 假设很慢
    );
    setItems(filtered); // 更新列表
  };

  return <input onChange={handleChange} />; // 输入会卡顿
}

// ✅ 使用 useTransition：区分优先级
function FastList() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // ✅ 紧急：输入框立即响应

    startTransition(() => {
      // ✅ 非紧急：列表更新可中断
      const filtered = items.filter((item) => expensiveMatch(item, value));
      setItems(filtered);
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Loading />}
      <List items={items} />
    </>
  );
}
```

## 3. 如何使用 useTransition？

基础用法包含两个返回值。

```js
// 基本语法
const [isPending, startTransition] = useTransition();

// isPending：布尔值，表示过渡是否进行中
// startTransition：函数，接收一个回调，标记其中的更新为过渡更新

function TabContainer() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab) => {
    // ✅ 紧急更新：立即切换选中状态
    startTransition(() => {
      // ✅ 非紧急更新：加载新标签内容
      setTab(newTab);
    });
  };

  return (
    <div>
      <button onClick={() => handleTabChange("home")}>首页</button>
      <button onClick={() => handleTabChange("posts")}>文章</button>
      <button onClick={() => handleTabChange("contact")}>联系</button>

      {isPending && <Spinner />}
      <TabContent tab={tab} />
    </div>
  );
}
```

完整示例：

```js
function ProductList() {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState(allProducts);
  const [isPending, startTransition] = useTransition();

  const filterProducts = (cat) => {
    // ✅ 立即更新分类选择器
    setCategory(cat);

    // ✅ 延迟更新产品列表
    startTransition(() => {
      const filtered =
        cat === "all"
          ? allProducts
          : allProducts.filter((p) => p.category === cat);
      setProducts(filtered);
    });
  };

  return (
    <div>
      <select value={category} onChange={(e) => filterProducts(e.target.value)}>
        <option value="all">全部</option>
        <option value="electronics">电子产品</option>
        <option value="books">图书</option>
      </select>

      {/* ✅ 显示加载状态 */}
      {isPending ? (
        <div className="loading">加载中...</div>
      ) : (
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
```

与 setState 的配合：

```js
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const search = (searchTerm) => {
    // ✅ 方式 1：分别更新
    setQuery(searchTerm); // 紧急
    startTransition(() => {
      setResults(performSearch(searchTerm)); // 非紧急
    });

    // ⚠️ 方式 2：全部放入 transition（不推荐）
    // startTransition(() => {
    //   setQuery(searchTerm) // ❌ 输入框也会延迟
    //   setResults(performSearch(searchTerm))
    // })
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="搜索..."
      />
      {isPending && <p>搜索中...</p>}
      <Results data={results} />
    </div>
  );
}
```

## 4. startTransition 有什么特点？

startTransition 函数具有特殊的执行特性。

```js
// 特点 1：可中断性
function HeavyList() {
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  const loadItems = () => {
    startTransition(() => {
      // ✅ 这个更新可以被中断
      // 如果用户再次点击，之前的更新会被取消
      setItems(generateHugeList());
    });
  };

  return <button onClick={loadItems}>加载数据</button>;
}

// 特点 2：无法包含异步操作
function AsyncExample() {
  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();

  const fetchData = () => {
    // ❌ 错误：startTransition 不能包含异步函数
    startTransition(async () => {
      const result = await fetch("/api/data");
      setData(result);
    });

    // ✅ 正确：在外部处理异步
    startTransition(() => {
      fetch("/api/data").then((result) => setData(result));
    });
  };
}

// 特点 3：不会阻塞用户交互
function InteractiveList() {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState(largeDataset);
  const [isPending, startTransition] = useTransition();

  const applyFilter = (value) => {
    setFilter(value); // ✅ 立即更新输入框

    startTransition(() => {
      // ✅ 即使这里很慢，用户仍可继续输入
      const filtered = largeDataset.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
      setItems(filtered);
    });
  };

  return (
    <>
      <input value={filter} onChange={(e) => applyFilter(e.target.value)} />
      {isPending && <p>筛选中...</p>}
      <List items={items} />
    </>
  );
}
```

与普通更新的对比：

```js
// 对比示例
function ComparisonDemo() {
  const [count, setCount] = useState(0);
  const [heavyResult, setHeavyResult] = useState(0);
  const [isPending, startTransition] = useTransition();

  const normalUpdate = () => {
    // ❌ 普通更新：会阻塞界面
    setCount(count + 1);
    setHeavyResult(expensiveCalculation(count));
    // 两个更新都是高优先级，可能导致卡顿
  };

  const transitionUpdate = () => {
    // ✅ 过渡更新：不会阻塞界面
    setCount(count + 1); // 紧急
    startTransition(() => {
      setHeavyResult(expensiveCalculation(count)); // 非紧急
    });
    // 计数器立即更新，重计算不阻塞界面
  };

  return (
    <>
      <p>计数：{count}</p>
      <p>结果：{isPending ? "计算中..." : heavyResult}</p>
      <button onClick={normalUpdate}>普通更新</button>
      <button onClick={transitionUpdate}>过渡更新</button>
    </>
  );
}
```

## 5. useTransition vs useDeferredValue

两者都用于处理非紧急更新，但使用场景不同。

| 特性       | useTransition            | useDeferredValue |
| ---------- | ------------------------ | ---------------- |
| 控制方式   | 主动调用 startTransition | 被动延迟值       |
| 适用场景   | 控制自己的更新逻辑       | 延迟传入的 props |
| isPending  | 提供加载状态             | 无状态标识       |
| 使用复杂度 | 需要手动包裹更新         | 自动延迟         |
| 典型用途   | 标签切换、路由跳转       | 搜索框输入       |

```js
// useTransition：主动控制更新时机
function TabsWithTransition() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <button
        onClick={() => {
          startTransition(() => setTab("posts"));
        }}
      >
        文章 {isPending && "..."}
      </button>
      <TabContent tab={tab} />
    </div>
  );
}

// useDeferredValue：被动延迟值
function SearchWithDeferred({ query }) {
  const deferredQuery = useDeferredValue(query);

  return <Results query={deferredQuery} />;
}

// 组合使用
function CombinedExample() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value); // 紧急更新输入框
          startTransition(() => {
            // 非紧急更新可以配合 deferredQuery 使用
          });
        }}
      />
      {isPending && <Spinner />}
      <Results query={deferredQuery} />
    </>
  );
}
```

选择指南：

```js
// 何时使用 useTransition
const useTransitionCases = {
  tabSwitch: "标签切换：控制切换过程",
  routeChange: "路由跳转：延迟加载新页面",
  filterChange: "筛选条件：延迟列表更新",
  sorting: "排序操作：延迟重排",
};

// 何时使用 useDeferredValue
const useDeferredValueCases = {
  searchInput: "搜索输入：延迟搜索结果",
  sliderChange: "滑块变化：延迟图表更新",
  formInput: "表单输入：延迟验证反馈",
};
```

## 6. 有哪些实际应用场景？

useTransition 适合多种耗时更新场景。

```js
// 场景 1：标签页切换
function TabsComponent() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPending, startTransition] = useTransition();

  const tabs = ["overview", "analytics", "reports", "settings"];

  const switchTab = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div>
      <nav>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => switchTab(tab)} disabled={isPending}>
            {tab}
          </button>
        ))}
      </nav>

      {isPending && <div className="tab-loading">加载中...</div>}
      <TabPanel tab={activeTab} />
    </div>
  );
}

// 场景 2：路由跳转优化
function Navigation() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isPending, startTransition] = useTransition();

  const navigate = (page) => {
    startTransition(() => {
      setCurrentPage(page);
    });
  };

  return (
    <>
      <nav>
        <Link onClick={() => navigate("home")}>首页</Link>
        <Link onClick={() => navigate("about")}>关于</Link>
        <Link onClick={() => navigate("contact")}>联系</Link>
      </nav>

      {isPending && <TopBarProgress />}
      <PageContent page={currentPage} />
    </>
  );
}

// 场景 3：大数据列表筛选
function DataTable() {
  const [data, setData] = useState(largeDataset);
  const [filterValue, setFilterValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const applyFilter = (value) => {
    setFilterValue(value);

    startTransition(() => {
      const filtered = largeDataset.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value.toLowerCase()),
        ),
      );
      setData(filtered);
    });
  };

  return (
    <>
      <input
        value={filterValue}
        onChange={(e) => applyFilter(e.target.value)}
        placeholder="筛选数据..."
      />
      {isPending && <TableSkeleton />}
      <Table data={data} rows={data.length} />
    </>
  );
}
```

## 7. 如何优化搜索和过滤？

搜索是 useTransition 的典型应用场景。

```js
// 完整的搜索组件
function SmartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = (value) => {
    setQuery(value);

    if (!value.trim()) {
      startTransition(() => {
        setResults([]);
      });
      return;
    }

    startTransition(() => {
      // 模拟复杂搜索逻辑
      const searchResults = performComplexSearch(value);
      setResults(searchResults);
      setSearchHistory((prev) => [value, ...prev.slice(0, 4)]);
    });
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="搜索..."
        />
        {isPending && <LoadingSpinner />}
      </div>

      {query && (
        <div className="results">
          {isPending ? <ResultsSkeleton /> : <ResultsList results={results} />}
        </div>
      )}

      {!query && searchHistory.length > 0 && (
        <div className="history">
          <h3>搜索历史</h3>
          {searchHistory.map((term, i) => (
            <button key={i} onClick={() => handleSearch(term)}>
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 带防抖的搜索
function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef(null);

  const handleSearch = (value) => {
    setQuery(value);

    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 设置新的定时器
    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        setResults(performSearch(value));
      });
    }, 300);
  };

  return (
    <>
      <input value={query} onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <Searching />}
      <Results data={results} />
    </>
  );
}
```

## 8. 有哪些最佳实践？

正确使用 useTransition 可以显著提升用户体验。

```js
// 最佳实践 1：只包裹耗时更新
function BestPractice1() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (value) => {
    // ✅ 立即更新输入框
    setInput(value);

    // ✅ 延迟更新列表
    startTransition(() => {
      setList(expensiveFilter(value));
    });

    // ❌ 错误：全部包裹
    // startTransition(() => {
    //   setInput(value) // 输入也会延迟
    //   setList(expensiveFilter(value))
    // })
  };

  return <input value={input} onChange={(e) => handleChange(e.target.value)} />;
}

// 最佳实践 2：提供加载反馈
function BestPractice2() {
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {/* ✅ 使用 isPending 显示状态 */}
      <button disabled={isPending}>
        {isPending ? "加载中..." : "加载数据"}
      </button>

      {isPending && <ProgressBar />}

      {/* ✅ 或显示骨架屏 */}
      {isPending ? <Skeleton /> : <DataList data={data} />}
    </>
  );
}

// 最佳实践 3：避免嵌套 startTransition
function BestPractice3() {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    // ❌ 错误：嵌套调用
    startTransition(() => {
      startTransition(() => {
        setData(newData);
      });
    });

    // ✅ 正确：单层调用
    startTransition(() => {
      setData(newData);
      setOtherData(otherNewData);
    });
  };
}

// 最佳实践 4：配合 Suspense 使用
function BestPractice4() {
  const [page, setPage] = useState("home");
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        onClick={() => {
          startTransition(() => setPage("posts"));
        }}
      >
        文章
      </button>

      {/* ✅ Suspense 处理异步加载 */}
      <Suspense fallback={isPending ? <Loading /> : <Skeleton />}>
        <PageContent page={page} />
      </Suspense>
    </>
  );
}
```

## 9. 有哪些常见问题？

使用 useTransition 时要注意的问题。

```js
// 问题 1：过度使用
function OveruseExample() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  // ❌ 错误：简单更新不需要 transition
  const increment = () => {
    startTransition(() => {
      setCount((c) => c + 1);
    });
  };

  // ✅ 正确：简单更新直接调用
  const incrementCorrect = () => {
    setCount((c) => c + 1);
  };

  // ✅ 只在真正耗时的更新时使用
  const loadData = () => {
    startTransition(() => {
      setData(expensiveComputation());
    });
  };
}

// 问题 2：忘记处理 isPending
function MissingPendingExample() {
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  const loadData = () => {
    startTransition(() => {
      setData(hugeDataset);
    });
  };

  // ❌ 错误：没有显示加载状态
  return (
    <>
      <button onClick={loadData}>加载</button>
      <List data={data} />
    </>
  );

  // ✅ 正确：显示加载状态
  return (
    <>
      <button onClick={loadData} disabled={isPending}>
        {isPending ? "加载中..." : "加载"}
      </button>
      {isPending ? <Skeleton /> : <List data={data} />}
    </>
  );
}

// 问题 3：在异步回调中使用
function AsyncCallbackIssue() {
  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();

  const fetchData = () => {
    // ❌ 错误：异步回调中的更新不受 transition 控制
    startTransition(() => {
      fetch("/api/data").then((result) => {
        setData(result); // 这个更新不在 transition 中
      });
    });

    // ✅ 正确方式 1：使用外部状态
    fetch("/api/data").then((result) => {
      startTransition(() => {
        setData(result);
      });
    });

    // ✅ 正确方式 2：使用 React Query 等库
    const { data, isLoading } = useQuery("/api/data");
  };
}

// 问题 4：性能问题排查
function PerformanceIssue() {
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  // ❌ 问题：组件本身渲染慢
  const slowComponent = () => {
    startTransition(() => {
      setItems(newItems);
    });
  };

  // ✅ 解决方案：优化组件渲染
  // 1. 使用 React.memo
  const MemoizedItem = React.memo(ListItem);

  // 2. 使用虚拟列表
  return <VirtualList items={items} />;

  // 3. 分批渲染
  useEffect(() => {
    const batches = chunk(items, 100);
    batches.forEach((batch, i) => {
      setTimeout(() => {
        startTransition(() => {
          setRenderedItems((prev) => [...prev, ...batch]);
        });
      }, i * 100);
    });
  }, [items]);
}
```

调试技巧：

```js
// 调试 useTransition
function DebugExample() {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    console.time("transition");

    startTransition(() => {
      console.log("开始过渡更新");
      setData(newData);
      console.log("过渡更新结束");
    });

    console.timeEnd("transition");
  };

  // 使用 React DevTools Profiler
  // 查看 transition 的性能影响

  // 使用 isPending 追踪状态
  useEffect(() => {
    console.log("isPending:", isPending);
  }, [isPending]);
}
```

## 10. 引用

- [React useTransition 官方文档][1]
- [React 18 Concurrent Features][2]
- [Patterns for React 18 Transitions][3]
- [useTransition vs useDeferredValue][4]

[1]: https://react.dev/reference/react/useTransition
[2]: https://react.dev/blog/2022/03/29/react-v18#new-feature-transitions
[3]: https://github.com/reactwg/react-18/discussions
[4]: https://react.dev/learn/keeping-components-pure
