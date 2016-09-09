import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress, params) {
	var factory, core, builder, new_contract
	return loadAbiByName('Core').
		then((abi)=>{
			factory = getContract(abi, FACTORY);
			return getCore()
		}).
		then((contract)=>{
			core = contract
			return loadAbiByName('BuilderTokenEmission')
		}).
		then((abi)=>{
			builder = getContract(abi, factory.getModule('Aira BuilderTokenEmission'));
			return createModule(params, builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			new_contract = address
			return tx(core, 'setModule', [params[0], address, 'github://airalab/core/token/TokenEmission.sol', true])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(1, 2)
			return {
				address: new_contract
			}
		})
}
