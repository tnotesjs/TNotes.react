/**
 * main.js
 *
 * bindActionCreators 作用是将 action 创建函数（action creators）跟 dispatch 方法进行绑定。
 * 目的是为了简化代码，绑定后就可以直接调用返回的对象身上的函数来分发 action 了。
 *
 * bindActionCreators 的参数
 *   第一个参数：是 action 创建函数合并的对象
 *   第二个参数：是仓库的 dispatch 函数
 *
 * bindActionCreators 的返回值：是一个对象，对象中的每个属性名与 action 创建函数名一致，属性值是 action 创建函数经过 bindActionCreators 处理后的函数。
 */
import { createStore, bindActionCreators } from 'redux'
import reducer from './reducer'
import * as numberActions from './action/number-action'


const store = createStore(reducer, 10)

console.log('store.getState() =>', store.getState())

// 得到一个新的对象，新对象中的属性名与第一个参数的属性名一致
const boundActions = bindActionCreators(numberActions, store.dispatch)

// 得到一个 increase action 并直接分发
boundActions.createIncreaseAction() // 向仓库分发 action
// 等效写法：
// store.dispatch(numberActions.createIncreaseAction())

console.log('store.getState() =>', store.getState())

boundActions.createSetAction(3)

console.log('store.getState() =>', store.getState())

/*
最终打印结果：
store.getState() => 10
store.getState() => 11
store.getState() => 3
*/