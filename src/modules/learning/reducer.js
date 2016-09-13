import _ from 'lodash'
import { LOAD_IS_EXECUTE, SET_RESULT_FORM, SET_RESULT_FORM_CHECK, SET_PROGRESS_FORM } from './actionTypes'
import initialState from './initialState/index'

function replaceArray(string, find, replace) {
  var stringNew = ''
  for (let i = 0; i < find.length; i += 1) {
    stringNew = string.replace(new RegExp(find[i], 'g'), replace[i]);
  }
  return stringNew;
}

function replaceObj(string, obj) {
  const find = [];
  const replace = [];
  _.forEach(obj, (value, key) => {
    find.push(`%${key}%`)
    replace.push(value)
  });
  return replaceArray(string, find, replace);
}

export default function learning(state = initialState, action) {
  switch (action.type) {
    case SET_RESULT_FORM: {
      const items = state.items.map((item) => {
        if (item.number === action.payload.number) {
          return {
            ...item,
            formResult: {
              ...item.formResult,
              status: 1,
              message:
              replaceObj(item.formResult.template, action.payload.result)
            }
          }
        }
        return item
      })
      return { ...state, items }
    }

    case SET_RESULT_FORM_CHECK: {
      const items = state.items.map((item) => {
        if (item.number === action.payload.number) {
          return {
            ...item,
            isExecute: action.payload.result,
            formCheckResult: {
              ...item.formCheckResult,
              status: (action.payload.result) ? 1 : 2
            }
          }
        }
        return item
      })
      return { ...state, items }
    }

    case SET_PROGRESS_FORM: {
      const items = state.items.map((item) => {
        if (item.number === action.payload.number) {
          const progress = item.progress.map((item1, index) => {
            if (index === action.payload.step) {
              return { ...item1, status: action.payload.status }
            }
            return item1
          })
          return { ...item, progress }
        }
        return item
      })
      return { ...state, items }
    }

    case LOAD_IS_EXECUTE: {
      const items = state.items.map((item) => {
        if (item.number === action.payload.number) {
          return { ...item, isExecute: action.payload.isExecute }
        }
        return item
      })
      return { ...state, items }
    }

    default:
      return state;
  }
}
