import { FLASH_MESSAGE, SET_DAO_ADDRESS, SET_BALANCE } from './actionTypes'

const initialState = {
  title: 'Dapp airalab',
  flash_message: '',
  dao_address: '',
  balance: 0
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case FLASH_MESSAGE:
      return { ...state, flash_message: action.payload}

    case SET_DAO_ADDRESS:
      return { ...state, dao_address: action.payload}

    case SET_BALANCE:
      return { ...state, balance: action.payload}

    default:
			return state;
  }
}
