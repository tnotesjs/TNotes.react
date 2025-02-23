/**
 * reducer/index.js
 */
import * as actionTypes from '../action/action-type'

export default (state, action) => {
  if (action.type === actionTypes.INCREASE) {
    return state + 1
  } else if (action.type === actionTypes.DECREASE) {
    return state - 1
  } else if (action.type === actionTypes.SET) {
    return action.payload
  }
  return state
}
