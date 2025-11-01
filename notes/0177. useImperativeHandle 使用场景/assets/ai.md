# [0177. useImperativeHandle 使用场景](https://github.com/tnotesjs/TNotes.react/tree/main/notes/0177.%20useImperativeHandle%20%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 useImperativeHandle 是什么？](#3--useimperativehandle-是什么)
- [4. 🤔 为什么需要 useImperativeHandle？](#4--为什么需要-useimperativehandle)
- [5. 🤔 如何使用 useImperativeHandle？](#5--如何使用-useimperativehandle)
- [6. 🤔 有哪些常见使用场景？](#6--有哪些常见使用场景)
- [7. 🤔 如何封装表单组件？](#7--如何封装表单组件)
- [8. 🤔 如何封装媒体组件？](#8--如何封装媒体组件)
- [9. 🤔 有哪些最佳实践？](#9--有哪些最佳实践)
- [10. 🤔 有哪些常见错误？](#10--有哪些常见错误)
- [11. 🔗 引用](#11--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- useImperativeHandle 的基本概念
- 与 forwardRef 的配合使用
- 常见使用场景
- 表单组件封装
- 媒体组件封装
- 最佳实践和注意事项
- 常见错误和解决方案

## 2. 🫧 评价

这篇笔记讲解 React 中用于自定义暴露给父组件的实例方法的 Hook：useImperativeHandle。

- useImperativeHandle 必须与 forwardRef 配合使用，用于控制暴露给父组件的内容
- 主要用于封装可复用的组件库，让父组件可以命令式地调用子组件的方法
- 常见场景包括表单验证、焦点管理、媒体控制、动画触发等
- 应该只暴露必要的方法，不要暴露整个 DOM 元素
- 优先使用声明式方式，只在必要时使用命令式 API
- 过度使用会导致组件耦合，违背 React 的声明式理念

## 3. 🤔 useImperativeHandle 是什么？

`useImperativeHandle` 用于自定义通过 ref 暴露给父组件的实例值。

```typescript
// 基本语法
useImperativeHandle(ref, createHandle, [deps])

// 参数说明：
// - ref: 父组件传递的 ref 对象
// - createHandle: 返回要暴露的对象的函数
// - deps: 依赖数组（可选）

// 不使用 useImperativeHandle
const Input = forwardRef<HTMLInputElement>((props, ref) => {
  // ❌ 直接暴露整个 DOM 元素
  return <input ref={ref} />
})

function Parent() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.focus()
    // ⚠️ 但也能访问不应该访问的内容
    inputRef.current?.remove() // 危险！
  }

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={handleClick}>聚焦</button>
    </div>
  )
}

// 使用 useImperativeHandle
interface InputHandle {
  focus: () => void
  clear: () => void
}

const Input = forwardRef<InputHandle>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // ✅ 只暴露特定的方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
  }))

  return <input ref={inputRef} />
})

function Parent() {
  const inputRef = useRef<InputHandle>(null)

  const handleClick = () => {
    // ✅ 只能调用暴露的方法
    inputRef.current?.focus()
    inputRef.current?.clear()
    // ✅ 无法访问 DOM 元素
    // inputRef.current?.remove(); // TypeScript 错误
  }

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={handleClick}>聚焦并清空</button>
    </div>
  )
}
```

完整的类型定义：

```typescript
// 定义暴露的接口
interface CustomHandle {
  method1: () => void
  method2: (arg: string) => void
  getValue: () => string
}

// 组件定义
const CustomComponent = forwardRef<CustomHandle, CustomProps>((props, ref) => {
  const internalRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState('')

  useImperativeHandle(
    ref,
    () => ({
      method1: () => {
        console.log('method1 called')
      },
      method2: (arg: string) => {
        console.log('method2 called with:', arg)
      },
      getValue: () => {
        return state
      },
    }),
    [state] // 依赖数组
  )

  return <div ref={internalRef}>{/* 内容 */}</div>
})
```

## 4. 🤔 为什么需要 useImperativeHandle？

解决直接暴露 DOM 元素的问题。

```typescript
// 问题 1：暴露过多内容
const BadInput = forwardRef<HTMLInputElement>((props, ref) => {
  // ❌ 父组件可以访问所有 DOM API
  return <input ref={ref} />
})

// ⚠️ 父组件可以做任何事情
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus() // 合理
    inputRef.current?.remove() // ❌ 不合理但能执行
  }, [])

  return <BadInput ref={inputRef} />
}

// 解决方案：使用 useImperativeHandle
interface InputHandle {
  focus: () => void
  getValue: () => string
  setValue: (value: string) => void
}

const GoodInput = forwardRef<InputHandle>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // ✅ 只暴露需要的方法
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    getValue: () => inputRef.current?.value || '',
    setValue: (value: string) => {
      if (inputRef.current) {
        inputRef.current.value = value
      }
    },
  }))

  return <input ref={inputRef} />
})

// 问题 2：封装内部实现
interface ModalHandle {
  open: () => void
  close: () => void
}

const Modal = forwardRef<ModalHandle>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // ✅ 暴露高层次的 API，隐藏内部实现
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true)
      // 内部逻辑：处理动画、焦点等
      setTimeout(() => {
        contentRef.current?.querySelector('button')?.focus()
      }, 100)
    },
    close: () => {
      setIsOpen(false)
    },
  }))

  if (!isOpen) return null

  return (
    <div className="modal">
      <div ref={contentRef}>{props.children}</div>
      <button onClick={() => ref.current?.close()}>关闭</button>
    </div>
  )
})
```

## 5. 🤔 如何使用 useImperativeHandle？

必须与 forwardRef 配合使用。

```typescript
// 步骤 1：定义暴露的接口
interface CounterHandle {
  increment: () => void
  decrement: () => void
  reset: () => void
  getValue: () => number
}

// 步骤 2：使用 forwardRef 包装组件
const Counter = forwardRef<CounterHandle>((props, ref) => {
  const [count, setCount] = useState(0)

  // 步骤 3：使用 useImperativeHandle 定义暴露的方法
  useImperativeHandle(
    ref,
    () => ({
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => c - 1),
      reset: () => setCount(0),
      getValue: () => count,
    }),
    [count]
  ) // 步骤 4：添加依赖项

  return <div>Count: {count}</div>
})

// 步骤 5：在父组件中使用
function Parent() {
  const counterRef = useRef<CounterHandle>(null)

  const handleClick = () => {
    counterRef.current?.increment()
    const value = counterRef.current?.getValue()
    console.log('Current value:', value)
  }

  return (
    <div>
      <Counter ref={counterRef} />
      <button onClick={handleClick}>增加</button>
    </div>
  )
}

// 依赖数组的使用
const Example = forwardRef<ExampleHandle>((props, ref) => {
  const [value, setValue] = useState('')
  const [config, setConfig] = useState({ multiplier: 2 })

  useImperativeHandle(
    ref,
    () => ({
      getValue: () => value,
      getDouble: () => value.repeat(config.multiplier),
    }),
    [value, config] // ✅ 包含所有使用的状态
  )

  return <input value={value} onChange={(e) => setValue(e.target.value)} />
})
```

## 6. 🤔 有哪些常见使用场景？

```typescript
// 场景 1：焦点管理
interface FocusableHandle {
  focus: () => void
  blur: () => void
}

const FocusableInput = forwardRef<FocusableHandle>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }))

  return <input ref={inputRef} {...props} />
})

// 场景 2：滚动控制
interface ScrollableHandle {
  scrollToTop: () => void
  scrollToBottom: () => void
  scrollToElement: (id: string) => void
}

const ScrollableList = forwardRef<ScrollableHandle, { items: Item[] }>(
  ({ items }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      scrollToTop: () => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      },
      scrollToBottom: () => {
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        })
      },
      scrollToElement: (id: string) => {
        const element = containerRef.current?.querySelector(`[data-id="${id}"]`)
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      },
    }))

    return (
      <div ref={containerRef} style={{ height: '400px', overflow: 'auto' }}>
        {items.map((item) => (
          <div key={item.id} data-id={item.id}>
            {item.content}
          </div>
        ))}
      </div>
    )
  }
)

// 场景 3：动画控制
interface AnimatableHandle {
  play: () => void
  pause: () => void
  reset: () => void
}

const AnimatedBox = forwardRef<AnimatableHandle>((props, ref) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)

  useImperativeHandle(ref, () => ({
    play: () => {
      if (boxRef.current && !animationRef.current) {
        animationRef.current = boxRef.current.animate(
          [
            { transform: 'translateX(0px)' },
            { transform: 'translateX(200px)' },
          ],
          { duration: 1000, fill: 'forwards' }
        )
      } else {
        animationRef.current?.play()
      }
    },
    pause: () => {
      animationRef.current?.pause()
    },
    reset: () => {
      animationRef.current?.cancel()
      animationRef.current = null
    },
  }))

  return (
    <div
      ref={boxRef}
      style={{ width: '50px', height: '50px', backgroundColor: 'blue' }}
    />
  )
})

// 场景 4：数据访问
interface DataGridHandle {
  getSelectedRows: () => Row[]
  selectAll: () => void
  clearSelection: () => void
}

const DataGrid = forwardRef<DataGridHandle, { data: Row[] }>(
  ({ data }, ref) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    useImperativeHandle(
      ref,
      () => ({
        getSelectedRows: () => {
          return data.filter((row) => selectedIds.has(row.id))
        },
        selectAll: () => {
          setSelectedIds(new Set(data.map((row) => row.id)))
        },
        clearSelection: () => {
          setSelectedIds(new Set())
        },
      }),
      [data, selectedIds]
    )

    return (
      <table>
        {data.map((row) => (
          <tr key={row.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.has(row.id)}
                onChange={() => {
                  const newSet = new Set(selectedIds)
                  if (newSet.has(row.id)) {
                    newSet.delete(row.id)
                  } else {
                    newSet.add(row.id)
                  }
                  setSelectedIds(newSet)
                }}
              />
            </td>
            <td>{row.name}</td>
          </tr>
        ))}
      </table>
    )
  }
)
```

## 7. 🤔 如何封装表单组件？

表单验证是 useImperativeHandle 的经典应用场景。

```typescript
// 表单项接口
interface FormItemHandle {
  validate: () => boolean
  getValue: () => string
  setValue: (value: string) => void
  reset: () => void
  focus: () => void
}

// 封装输入框
const FormInput = forwardRef<
  FormItemHandle,
  {
    label: string
    required?: boolean
    pattern?: RegExp
    errorMessage?: string
  }
>(({ label, required, pattern, errorMessage }, ref) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(
    ref,
    () => ({
      validate: () => {
        if (required && !value.trim()) {
          setError(`${label}不能为空`)
          return false
        }
        if (pattern && !pattern.test(value)) {
          setError(errorMessage || `${label}格式不正确`)
          return false
        }
        setError('')
        return true
      },
      getValue: () => value,
      setValue: (newValue: string) => setValue(newValue),
      reset: () => {
        setValue('')
        setError('')
      },
      focus: () => inputRef.current?.focus(),
    }),
    [value, label, required, pattern, errorMessage]
  )

  return (
    <div>
      <label>{label}</label>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  )
})

// 封装表单
interface FormHandle {
  validate: () => boolean
  submit: () => void
  reset: () => void
}

const Form = forwardRef<FormHandle, { onSubmit: (data: any) => void }>(
  ({ onSubmit }, ref) => {
    const usernameRef = useRef<FormItemHandle>(null)
    const emailRef = useRef<FormItemHandle>(null)
    const passwordRef = useRef<FormItemHandle>(null)

    useImperativeHandle(ref, () => ({
      validate: () => {
        const valid = [
          usernameRef.current?.validate(),
          emailRef.current?.validate(),
          passwordRef.current?.validate(),
        ].every(Boolean)

        if (!valid) {
          usernameRef.current?.focus()
        }

        return valid
      },
      submit: () => {
        if (ref.current?.validate()) {
          const data = {
            username: usernameRef.current?.getValue(),
            email: emailRef.current?.getValue(),
            password: passwordRef.current?.getValue(),
          }
          onSubmit(data)
        }
      },
      reset: () => {
        usernameRef.current?.reset()
        emailRef.current?.reset()
        passwordRef.current?.reset()
      },
    }))

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <FormInput ref={usernameRef} label="用户名" required />
        <FormInput
          ref={emailRef}
          label="邮箱"
          required
          pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
          errorMessage="邮箱格式不正确"
        />
        <FormInput
          ref={passwordRef}
          label="密码"
          required
          pattern={/.{6,}/}
          errorMessage="密码至少 6 位"
        />
        <button type="button" onClick={() => ref.current?.submit()}>
          提交
        </button>
        <button type="button" onClick={() => ref.current?.reset()}>
          重置
        </button>
      </form>
    )
  }
)
```

## 8. 🤔 如何封装媒体组件？

视频和音频控制是另一个常见场景。

```typescript
// 视频播放器
interface VideoPlayerHandle {
  play: () => void
  pause: () => void
  stop: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  getCurrentTime: () => number
  getDuration: () => number
}

const VideoPlayer = forwardRef<VideoPlayerHandle, { src: string }>(
  ({ src }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [playing, setPlaying] = useState(false)

    useImperativeHandle(
      ref,
      () => ({
        play: () => {
          videoRef.current?.play()
          setPlaying(true)
        },
        pause: () => {
          videoRef.current?.pause()
          setPlaying(false)
        },
        stop: () => {
          if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
            setPlaying(false)
          }
        },
        seek: (time: number) => {
          if (videoRef.current) {
            videoRef.current.currentTime = time
          }
        },
        setVolume: (volume: number) => {
          if (videoRef.current) {
            videoRef.current.volume = Math.max(0, Math.min(1, volume))
          }
        },
        getCurrentTime: () => videoRef.current?.currentTime || 0,
        getDuration: () => videoRef.current?.duration || 0,
      }),
      [playing]
    )

    return (
      <video
        ref={videoRef}
        src={src}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    )
  }
)

// 音频播放器
interface AudioPlayerHandle {
  play: () => Promise<void>
  pause: () => void
  toggle: () => void
  setPlaybackRate: (rate: number) => void
}

const AudioPlayer = forwardRef<AudioPlayerHandle, { src: string }>(
  ({ src }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useImperativeHandle(
      ref,
      () => ({
        play: async () => {
          try {
            await audioRef.current?.play()
            setIsPlaying(true)
          } catch (error) {
            console.error('播放失败:', error)
          }
        },
        pause: () => {
          audioRef.current?.pause()
          setIsPlaying(false)
        },
        toggle: () => {
          if (isPlaying) {
            audioRef.current?.pause()
            setIsPlaying(false)
          } else {
            audioRef.current?.play()
            setIsPlaying(true)
          }
        },
        setPlaybackRate: (rate: number) => {
          if (audioRef.current) {
            audioRef.current.playbackRate = rate
          }
        },
      }),
      [isPlaying]
    )

    return <audio ref={audioRef} src={src} />
  }
)
```

## 9. 🤔 有哪些最佳实践？

```typescript
// 实践 1：定义清晰的接口
// ✅ 好的接口设计
interface GoodHandle {
  // 动词开头，语义清晰
  validate: () => boolean
  reset: () => void
  focus: () => void
  getValue: () => string
}

// ❌ 不好的接口设计
interface BadHandle {
  // 暴露内部实现
  inputRef: HTMLInputElement
  state: any
  setState: (value: any) => void
}

// 实践 2：最小化暴露
const MinimalExposure = forwardRef<MinimalHandle>((props, ref) => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // ✅ 只暴露必要的方法
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    getValue: () => value,
  }))

  // ❌ 不要暴露这些
  // inputRef (整个 DOM 元素)
  // setValue (内部状态管理)

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
})

// 实践 3：使用 TypeScript
interface TypedHandle {
  submit: (options?: { validate?: boolean }) => Promise<boolean>
  reset: (fields?: string[]) => void
}

const TypedComponent = forwardRef<TypedHandle>((props, ref) => {
  useImperativeHandle(ref, () => ({
    submit: async (options = {}) => {
      const { validate = true } = options
      return true
    },
    reset: (fields) => {
      // 实现
    },
  }))

  return <div />
})

// 实践 4：文档化方法
interface DocumentedHandle {
  /**
   * 验证表单所有字段
   * @returns 是否验证通过
   */
  validate: () => boolean

  /**
   * 提交表单数据
   * @param silent - 是否静默提交（不显示错误）
   * @returns 提交是否成功
   */
  submit: (silent?: boolean) => Promise<boolean>
}

// 实践 5：处理异步操作
interface AsyncHandle {
  save: () => Promise<boolean>
  load: () => Promise<void>
}

const AsyncComponent = forwardRef<AsyncHandle>((props, ref) => {
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({
    save: async () => {
      setLoading(true)
      try {
        await fetch('/api/save', { method: 'POST' })
        return true
      } catch (error) {
        console.error(error)
        return false
      } finally {
        setLoading(false)
      }
    },
    load: async () => {
      setLoading(true)
      try {
        await fetch('/api/load')
      } finally {
        setLoading(false)
      }
    },
  }))

  return <div>{loading ? '加载中...' : '内容'}</div>
})
```

## 10. 🤔 有哪些常见错误？

```typescript
// 错误 1：忘记 forwardRef
// ❌ 错误：没有使用 forwardRef
const WrongComponent = (props, ref) => {
  useImperativeHandle(ref, () => ({
    method: () => {},
  }))
  return <div />
}

// ✅ 正确：使用 forwardRef
const CorrectComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    method: () => {},
  }))
  return <div />
})

// 错误 2：暴露过多内容
// ❌ 暴露整个状态对象
const OverExposed = forwardRef((props, ref) => {
  const [state, setState] = useState({ a: 1, b: 2, c: 3 })

  useImperativeHandle(ref, () => ({
    state, // ❌ 暴露整个状态
    setState, // ❌ 暴露状态设置函数
    getState: () => state, // ❌ 返回可变对象
  }))

  return <div />
})

// ✅ 只暴露必要的方法
const WellEncapsulated = forwardRef((props, ref) => {
  const [state, setState] = useState({ a: 1, b: 2, c: 3 })

  useImperativeHandle(ref, () => ({
    getA: () => state.a,
    incrementA: () => setState((s) => ({ ...s, a: s.a + 1 })),
  }))

  return <div />
})

// 错误 3：依赖项不正确
// ❌ 缺少依赖项
const MissingDeps = forwardRef((props, ref) => {
  const [count, setCount] = useState(0)

  useImperativeHandle(ref, () => ({
    getCount: () => count, // 使用了 count
  })) // ❌ 没有添加 count 到依赖数组

  return <div />
})

// ✅ 添加正确的依赖项
const CorrectDeps = forwardRef((props, ref) => {
  const [count, setCount] = useState(0)

  useImperativeHandle(
    ref,
    () => ({
      getCount: () => count,
    }),
    [count]
  ) // ✅ 添加依赖项

  return <div />
})

// 错误 4：在循环中使用
// ❌ 不能在循环中直接使用 ref
function WrongUsage() {
  const items = [1, 2, 3]

  return (
    <div>
      {items.map((item) => {
        const ref = useRef() // ❌ 错误
        return <Component key={item} ref={ref} />
      })}
    </div>
  )
}

// ✅ 使用 ref 数组
function CorrectUsage() {
  const items = [1, 2, 3]
  const refs = useRef<(ComponentHandle | null)[]>([])

  return (
    <div>
      {items.map((item, index) => (
        <Component key={item} ref={(el) => (refs.current[index] = el)} />
      ))}
    </div>
  )
}

// 错误 5：过度使用命令式 API
// ❌ 能用声明式就不要用命令式
function Imperative() {
  const modalRef = useRef<ModalHandle>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (showModal) {
      modalRef.current?.open()
    } else {
      modalRef.current?.close()
    }
  }, [showModal])

  return <Modal ref={modalRef} />
}

// ✅ 优先使用声明式
function Declarative() {
  const [showModal, setShowModal] = useState(false)

  return <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
}
```

## 11. 🔗 引用

- [useImperativeHandle 官方文档][1]
- [forwardRef 官方文档][2]
- [Ref 转发详解][3]
- [命令式 vs 声明式][4]

[1]: https://react.dev/reference/react/useImperativeHandle
[2]: https://react.dev/reference/react/forwardRef
[3]: https://react.dev/learn/manipulating-the-dom-with-refs
[4]: https://react.dev/learn/reusing-logic-with-custom-hooks
