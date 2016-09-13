import { ADD } from './actionTypes'
import { getCore } from '../learning/lessons/helper'

export function addModule(name, address) {
  return (dispatch) => {
    dispatch({
      type: ADD,
      payload: {
        name,
        address
      }
    })
  }
}

export function loadDao() {
  return (dispatch) => {
    getCore()
      .then((contract) => {
        for (
          let address = contract.firstModule();
          address !== '0x0000000000000000000000000000000000000000';
          address = contract.nextModule(address)
        ) {
          dispatch(addModule(contract.getModuleName(address), address))
        }
      })
  }
}
