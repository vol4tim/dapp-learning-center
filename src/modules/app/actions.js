import _ from 'lodash'
import { FLASH_MESSAGE, SET_DAO_ADDRESS, SET_BALANCE } from './actionTypes'

export function flashMessage(message) {
  return {
    type: FLASH_MESSAGE,
    payload: message
  }
}

export function setDaoAddress(address) {
  return {
    type: SET_DAO_ADDRESS,
    payload: address
  }
}

export function setBalance(balance) {
  return {
    type: SET_BALANCE,
    payload: _.toNumber(balance)
  }
}
