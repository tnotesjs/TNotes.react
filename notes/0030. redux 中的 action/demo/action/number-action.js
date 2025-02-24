/**
 * action/number-action.js
 */
import * as actionTypes from './action-type'

export function createIncreaseAction() {
  return {
    type: actionTypes.INCREASE,
  }
}

export function createDecreaseAction() {
  return {
    type: actionTypes.DECREASE,
  }
}

export function createSetAction(newNumber) {
  return {
    type: actionTypes.SET,
    payload: newNumber,
  }
}
