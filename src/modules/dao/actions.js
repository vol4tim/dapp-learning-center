import { ADD } from './actionTypes'
import { getCore } from '../../utils/learning'

export function addModule(name, address) {
	return dispatch => {
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
  return dispatch => {
		getCore().
			then((contract)=>{
				for (var address = contract.firstModule(); address != 0; address = contract.nextModule(address))
					dispatch(addModule(contract.getModuleName(address), address))
			})
	}
}
