import { run } from './helper'
import { loadAbiByName, getContract } from '../../../utils/web3'

export default function(params) {
	return loadAbiByName('Core').
		then((abi)=>{
			var core = getContract(abi, params[0]);
			return run('Lesson_11', [core.getModule('Board of Directors')])
		})
}
