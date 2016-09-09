import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule } from '../../../utils/web3'

export default function(setProgress, params) {
	var factory
	return loadAbiByName('Core').
		then((abi)=>{
			factory = getContract(abi, FACTORY);
			return loadAbiByName('BuilderDAO')
		}).
		then((abi)=>{
			var builder = getContract(abi, factory.getModule('Aira BuilderDAO'));
			return createModule(params, builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			return {
				address
			}
		})
}
