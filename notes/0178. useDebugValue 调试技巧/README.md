# [0178. useDebugValue 调试技巧](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0178.%20useDebugValue%20%E8%B0%83%E8%AF%95%E6%8A%80%E5%B7%A7)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. useDebugValue 是什么？](#2-usedebugvalue-是什么)
- [3. 如何使用 useDebugValue？](#3-如何使用-usedebugvalue)
- [4. 如何格式化显示值？](#4-如何格式化显示值)
- [5. 有哪些实际应用场景？](#5-有哪些实际应用场景)
- [6. 如何调试复杂的自定义 Hook？](#6-如何调试复杂的自定义-hook)
- [7. 有哪些最佳实践？](#7-有哪些最佳实践)
- [8. 有哪些常见问题？](#8-有哪些常见问题)
- [9. 引用](#9-引用)

<!-- endregion:toc -->

## 1. 本节内容

- useDebugValue 的基本概念
- 在自定义 Hook 中使用
- 格式化显示值
- 实际应用场景
- 性能优化技巧
- 最佳实践
- 常见问题和解决方案

这篇笔记讲解 React 中用于在 React DevTools 中显示自定义 Hook 调试信息的 Hook：useDebugValue。

- useDebugValue 只能在自定义 Hook 内部使用，用于在 React DevTools 中显示调试信息
- 主要用于开发阶段调试自定义 Hook，帮助开发者快速了解 Hook 的内部状态
- 支持格式化函数，可以延迟计算显示值，避免影响性能
- 在生产环境中会被忽略，不会影响应用性能
- 不应该用于组件内部，只用于自定义 Hook
- 适度使用，只为复杂的自定义 Hook 添加调试信息

## 2. useDebugValue 是什么？

`useDebugValue` 用于在 React DevTools 中为自定义 Hook 添加标签。

```typescript
// 基本语法
useDebugValue(value)
useDebugValue(value, format)

// 参数说明：
// - value: 要在 DevTools 中显示的值
// - format: 可选的格式化函数

// 不使用 useDebugValue
function useOnline(): boolean {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

// 使用 useDebugValue
function useOnline(): boolean {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // ✅ 在 DevTools 中显示："Online" 或 "Offline"
  useDebugValue(isOnline ? 'Online' : 'Offline')

  return isOnline
}

// 在组件中使用
function App() {
  const isOnline = useOnline()

  return <div>{isOnline ? '在线' : '离线'}</div>
}

// 在 React DevTools 中会显示：
// App
//   ├─ useOnline: "Online"  ← useDebugValue 的输出
//   └─ useState
```

基本特性：

```typescript
// 特性 1：只在开发环境生效
function useExample() {
  const [value, setValue] = useState(0)

  // ✅ 开发环境：在 DevTools 中显示
  // ✅ 生产环境：被忽略，不影响性能
  useDebugValue(`Count: ${value}`)

  return [value, setValue] as const
}

// 特性 2：只能在自定义 Hook 中使用
function MyComponent() {
  const [count, setCount] = useState(0)

  // ❌ 错误：不能在组件中直接使用
  // useDebugValue(count);

  return <div>{count}</div>
}

// ✅ 正确：在自定义 Hook 中使用
function useCounter() {
  const [count, setCount] = useState(0)

  useDebugValue(count)

  return [count, setCount] as const
}

// 特性 3：可以显示任何值
function useDebugExample() {
  const [data, setData] = useState({ name: 'John', age: 30 })

  // 显示字符串
  useDebugValue('User data loaded')

  // 显示数字
  useDebugValue(data.age)

  // 显示对象（会被序列化）
  useDebugValue(data)

  // 显示数组
  useDebugValue([data.name, data.age])

  return data
}
```

## 3. 如何使用 useDebugValue？

在自定义 Hook 中添加调试信息。

```typescript
// 示例 1：表单输入 Hook
function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  // 显示当前值和长度
  useDebugValue(`"${value}" (${value.length} chars)`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
}

// 示例 2：数据获取 Hook
interface User {
  id: number;
  name: string;
}

function useUser(userId: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  // 显示加载状态
  useDebugValue(
    loading
      ? "Loading..."
      : error
        ? `Error: ${error.message}`
        : `User: ${user?.name || "Unknown"}`,
  );

  return { user, loading, error };
}

// 示例 3：本地存储 Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // 显示存储的键和值
  useDebugValue(`${key}: ${JSON.stringify(storedValue)}`);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// 示例 4：防抖 Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // 显示是否在等待
  useDebugValue(
    value === debouncedValue ? "Stable" : `Debouncing (${delay}ms)`,
  );

  return debouncedValue;
}

// 示例 5：媒体查询 Hook
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  // 显示查询和匹配状态
  useDebugValue(`${query}: ${matches ? "✓" : "✗"}`);

  return matches;
}
```

## 4. 如何格式化显示值？

使用格式化函数延迟计算，提升性能。

```typescript
// 格式化函数的基本用法
function useExpensiveHook(value: number) {
  // 第二个参数是格式化函数
  useDebugValue(value, (val) => {
    // 这个函数只在 DevTools 打开时才执行
    return `Formatted: ${val.toFixed(2)}`;
  });

  return value;
}

// 示例 1：格式化日期
function useCurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ✅ 使用格式化函数
  useDebugValue(time, (date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  });

  return time;
}

// 示例 2：格式化对象
interface UserData {
  id: number;
  name: string;
  email: string;
  roles: string[];
  createdAt: Date;
}

function useUserData(userId: number) {
  const [user, setUser] = useState<UserData | null>(null);

  // ✅ 避免在每次渲染时执行昂贵的序列化
  useDebugValue(user, (data) => {
    if (!data) return "No user";

    return {
      id: data.id,
      name: data.name,
      roles: data.roles.join(", "),
      memberFor: `${Math.floor(
        (Date.now() - data.createdAt.getTime()) / (1000 * 60 * 60 * 24),
      )} days`,
    };
  });

  return user;
}

// 示例 3：格式化数组
function useList<T>(items: T[]) {
  // ✅ 格式化大数组
  useDebugValue(items, (list) => {
    if (list.length === 0) return "Empty list";
    if (list.length <= 3) return `[${list.join(", ")}]`;
    return `[${list.slice(0, 3).join(", ")}, ... +${list.length - 3} more]`;
  });

  return items;
}

// 示例 4：条件格式化
function useApiState<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDebugValue({ data, loading, error }, (state) => {
    if (state.loading) return "⏳ Loading...";
    if (state.error) return `❌ Error: ${state.error.message}`;
    if (state.data) return "✅ Data loaded";
    return "⚪ Idle";
  });

  return { data, loading, error };
}

// 示例 5：性能统计
function usePerformanceMonitor(key: string) {
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState(Date.now());

  useEffect(() => {
    setRenderCount((c) => c + 1);
    setLastRenderTime(Date.now());
  });

  useDebugValue({ key, renderCount, lastRenderTime }, (stats) => {
    const timeSinceLastRender = Date.now() - stats.lastRenderTime;
    return `${stats.key}: ${stats.renderCount} renders (last: ${timeSinceLastRender}ms ago)`;
  });
}
```

## 5. 有哪些实际应用场景？

```typescript
// 场景 1：状态机 Hook
type State = "idle" | "loading" | "success" | "error";

function useStateMachine(initialState: State = "idle") {
  const [state, setState] = useState<State>(initialState);
  const [history, setHistory] = useState<State[]>([initialState]);

  const transition = (newState: State) => {
    setState(newState);
    setHistory((prev) => [...prev, newState]);
  };

  useDebugValue({ state, history }, (data) => {
    return `Current: ${data.state} | History: ${data.history.join(" → ")}`;
  });

  return { state, transition, history };
}

// 场景 2：表单验证 Hook
interface FormErrors {
  [key: string]: string[];
}

function useFormValidation(rules: Record<string, (value: any) => string[]>) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  useDebugValue({ errors, touched }, (data) => {
    const errorCount = Object.keys(data.errors).length;
    const touchedCount = data.touched.size;

    if (errorCount === 0) return "✅ Valid";
    return `❌ ${errorCount} errors (${touchedCount} fields touched)`;
  });

  const validate = (field: string, value: any) => {
    const fieldErrors = rules[field]?.(value) || [];
    setErrors((prev) => ({
      ...prev,
      [field]: fieldErrors,
    }));
  };

  return { errors, touched, validate };
}

// 场景 3：WebSocket 连接 Hook
type ConnectionState = "connecting" | "connected" | "disconnected" | "error";

function useWebSocket(url: string) {
  const [state, setState] = useState<ConnectionState>("disconnected");
  const [messageCount, setMessageCount] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    setState("connecting");
    const ws = new WebSocket(url);

    ws.onopen = () => setState("connected");
    ws.onclose = () => setState("disconnected");
    ws.onerror = () => setState("error");
    ws.onmessage = () => setMessageCount((c) => c + 1);

    wsRef.current = ws;

    return () => ws.close();
  }, [url]);

  useDebugValue({ state, messageCount, url }, (data) => {
    const stateEmoji = {
      connecting: "🔄",
      connected: "🟢",
      disconnected: "🔴",
      error: "❌",
    }[data.state];

    return `${stateEmoji} ${data.state} | ${data.messageCount} messages | ${data.url}`;
  });

  return { state, messageCount, ws: wsRef.current };
}

// 场景 4：分页 Hook
interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

function usePagination(initialPageSize: number = 10) {
  const [state, setState] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
  });

  useDebugValue(state, (data) => {
    const totalPages = Math.ceil(data.total / data.pageSize);
    const start = (data.page - 1) * data.pageSize + 1;
    const end = Math.min(data.page * data.pageSize, data.total);

    return `Page ${data.page}/${totalPages} | Showing ${start}-${end} of ${data.total}`;
  });

  const goToPage = (page: number) => {
    setState((prev) => ({ ...prev, page }));
  };

  const setTotal = (total: number) => {
    setState((prev) => ({ ...prev, total }));
  };

  return { ...state, goToPage, setTotal };
}

// 场景 5：权限检查 Hook
interface Permission {
  resource: string;
  action: string;
}

function usePermissions(userPermissions: Permission[]) {
  const checkPermission = (resource: string, action: string): boolean => {
    return userPermissions.some(
      (p) => p.resource === resource && p.action === action,
    );
  };

  useDebugValue(userPermissions, (permissions) => {
    const resources = new Set(permissions.map((p) => p.resource));
    return `${permissions.length} permissions across ${resources.size} resources`;
  });

  return { checkPermission, permissions: userPermissions };
}
```

## 6. 如何调试复杂的自定义 Hook？

```typescript
// 组合多个 useDebugValue
function useComplexHook() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 可以使用多个 useDebugValue
  useDebugValue(loading ? "Loading" : "Idle", (label) => `Status: ${label}`);
  useDebugValue(error?.message || "No error", (msg) => `Error: ${msg}`);
  useDebugValue(data ? "Has data" : "No data", (status) => `Data: ${status}`);

  return { data, loading, error };
}

// 嵌套 Hook 的调试
function useNestedHook() {
  const online = useOnline(); // 内部有 useDebugValue
  const user = useUser(1); // 内部有 useDebugValue

  // 外层 Hook 也可以有自己的 useDebugValue
  useDebugValue(
    { online, userLoaded: !!user.user },
    (state) => `Online: ${state.online}, User: ${state.userLoaded ? "✓" : "✗"}`,
  );

  return { online, user };
}

// 带时间戳的调试
function useTimestampedHook<T>(value: T) {
  const [history, setHistory] = useState<
    Array<{ value: T; timestamp: number }>
  >([]);

  useEffect(() => {
    setHistory((prev) => [...prev, { value, timestamp: Date.now() }].slice(-5)); // 只保留最近 5 次
  }, [value]);

  useDebugValue(history, (h) => {
    if (h.length === 0) return "No history";

    const changes = h.map((item, index) => {
      if (index === 0) return `Initial: ${item.value}`;
      const timeDiff = item.timestamp - h[index - 1].timestamp;
      return `→ ${item.value} (+${timeDiff}ms)`;
    });

    return changes.join(" ");
  });

  return value;
}

// 性能监控
function usePerformanceDebug(name: string) {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(Date.now());
  const renderTimesRef = useRef<number[]>([]);

  renderCountRef.current += 1;

  useEffect(() => {
    const now = Date.now();
    const renderTime = now - lastRenderTimeRef.current;
    renderTimesRef.current.push(renderTime);
    lastRenderTimeRef.current = now;

    // 只保留最近 10 次
    if (renderTimesRef.current.length > 10) {
      renderTimesRef.current.shift();
    }
  });

  useDebugValue(
    {
      name,
      count: renderCountRef.current,
      times: renderTimesRef.current,
    },
    (data) => {
      const avg =
        data.times.length > 0
          ? (data.times.reduce((a, b) => a + b, 0) / data.times.length).toFixed(
              2,
            )
          : "0";

      return `${data.name}: ${data.count} renders | Avg: ${avg}ms`;
    },
  );
}
```

## 7. 有哪些最佳实践？

```typescript
// 实践 1：只为复杂的 Hook 添加调试信息
// ❌ 不必要：简单的 Hook
function useSimpleCounter() {
  const [count, setCount] = useState(0);

  // ❌ 太简单，不需要
  useDebugValue(count);

  return [count, setCount] as const;
}

// ✅ 必要：复杂的 Hook
function useComplexDataFetcher(url: string, options: RequestOptions) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
    retryCount: 0,
  });

  // ✅ 复杂状态，需要调试信息
  useDebugValue(state, (s) => {
    return `${url} | ${s.loading ? "⏳" : s.error ? "❌" : "✅"} | Retries: ${
      s.retryCount
    }`;
  });

  return state;
}

// 实践 2：使用有意义的标签
// ❌ 不好：标签不清晰
function useBadLabel() {
  const [value, setValue] = useState(0);

  useDebugValue(value); // 只显示数字，不清楚含义

  return value;
}

// ✅ 好：标签清晰
function useGoodLabel() {
  const [retryCount, setRetryCount] = useState(0);

  useDebugValue(`Retry count: ${retryCount}`); // 清楚含义

  return retryCount;
}

// 实践 3：使用格式化函数优化性能
// ❌ 不好：每次渲染都执行昂贵的操作
function useBadPerformance(items: any[]) {
  // ❌ 每次渲染都序列化，即使 DevTools 没打开
  useDebugValue(JSON.stringify(items));

  return items;
}

// ✅ 好：只在需要时执行
function useGoodPerformance(items: any[]) {
  // ✅ 只在 DevTools 需要时才序列化
  useDebugValue(items, (list) => JSON.stringify(list));

  return items;
}

// 实践 4：使用表情符号增强可读性
function useVisualDebug() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useDebugValue(status, (s) => {
    const emoji = {
      idle: "⚪",
      loading: "🔄",
      success: "✅",
      error: "❌",
    }[s];

    return `${emoji} ${s.toUpperCase()}`;
  });

  return status;
}

// 实践 5：组合多个状态
function useCombinedDebug() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState(false);

  // ✅ 组合多个状态到一个调试标签
  useDebugValue({ count, name, enabled }, (state) => {
    return `Count: ${state.count} | Name: "${state.name}" | ${
      state.enabled ? "🟢" : "🔴"
    }`;
  });

  return { count, name, enabled };
}

// 实践 6：条件显示
function useConditionalDebug(items: any[]) {
  useDebugValue(items, (list) => {
    // 根据数据量显示不同信息
    if (list.length === 0) {
      return "📭 Empty";
    } else if (list.length < 10) {
      return `📬 ${list.length} items: [${list.join(", ")}]`;
    } else {
      return `📦 ${list.length} items (too many to display)`;
    }
  });

  return items;
}
```

## 8. 有哪些常见问题？

```typescript
// 问题 1：在组件中使用
function WrongComponent() {
  const [count, setCount] = useState(0)

  // ❌ 错误：不能在组件中使用
  // useDebugValue(count);

  return <div>{count}</div>
}

// ✅ 正确：在自定义 Hook 中使用
function useCounter() {
  const [count, setCount] = useState(0)

  useDebugValue(count)

  return [count, setCount] as const
}

// 问题 2：过度使用
// ❌ 不好：为每个状态都添加
function useOverDebug() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)

  useDebugValue(a)
  useDebugValue(b)
  useDebugValue(c)

  return { a, b, c }
}

// ✅ 好：只显示关键信息
function useBetterDebug() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)

  useDebugValue({ a, b, c }, (state) => {
    return `Sum: ${state.a + state.b + state.c}`
  })

  return { a, b, c }
}

// 问题 3：忘记使用格式化函数
// ❌ 不好：昂贵的操作直接执行
function useExpensiveWithoutFormat(data: any[]) {
  // ❌ 每次渲染都执行，即使 DevTools 没打开
  const formatted = data.map((item) => ({
    ...item,
    computed: expensiveCalculation(item),
  }))

  useDebugValue(formatted)

  return data
}

// ✅ 好：使用格式化函数
function useExpensiveWithFormat(data: any[]) {
  useDebugValue(data, (list) => {
    // 只在 DevTools 需要时才执行
    return list.map((item) => ({
      ...item,
      computed: expensiveCalculation(item),
    }))
  })

  return data
}

// 问题 4：显示过多信息
// ❌ 不好：信息过载
function useTooMuchInfo(items: any[]) {
  useDebugValue(items.map((item) => JSON.stringify(item)).join(', '))

  return items
}

// ✅ 好：简洁明了
function useJustEnough(items: any[]) {
  useDebugValue(items, (list) => {
    return `${list.length} items${
      list.length > 0 ? ` (first: ${list[0]?.name})` : ''
    }`
  })

  return items
}

// 问题 5：不处理空值
// ❌ 不好：可能出错
function useNoNullCheck(data: any) {
  useDebugValue(data.name) // ❌ data 可能为 null

  return data
}

// ✅ 好：处理边界情况
function useWithNullCheck(data: any) {
  useDebugValue(data, (d) => (d ? d.name : 'No data'))

  return data
}
```

## 9. 引用

- [useDebugValue 官方文档][1]
- [React DevTools 使用指南][2]
- [自定义 Hook 最佳实践][3]
- [React 调试技巧][4]

[1]: https://react.dev/reference/react/useDebugValue
[2]: https://react.dev/learn/react-developer-tools
[3]: https://react.dev/learn/reusing-logic-with-custom-hooks
[4]: https://react.dev/learn/debugging
