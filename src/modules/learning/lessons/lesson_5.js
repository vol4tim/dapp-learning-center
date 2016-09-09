import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress, params) {
	var factory, core, builder
	var new_contract = false
	return loadAbiByName('Core').
		then((abi)=>{
			factory = getContract(abi, FACTORY);
			return getCore()
		}).
		then((contract)=>{
			core = contract
			var address = core.getModule(params[0])
			if (address!=0) {
				new_contract = address
				return false
			}
			return loadAbiByName('BuilderTokenEmission')
		}).
		then((abi)=>{
			if (new_contract!=false) {
				return false
			}
			builder = getContract(abi, factory.getModule('Aira BuilderTokenEmission'));
			return createModule(params, builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			if (new_contract!=false) {
				return false
			}
			new_contract = address
			return tx(core, 'setModule', [params[0], address, 'github://airalab/core/token/TokenEmission.sol', true])
		}).
		then((tx)=>{
			if (new_contract!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(1, 2)
			return {
				address: new_contract
			}
		})
}
