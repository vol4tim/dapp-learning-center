import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, tx, blockchain, transfer, coinbase } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress, params) {
	var factory, core, builder
	var new_tokken = false
	return loadAbiByName('Core').
		then((abi)=>{
			factory = getContract(abi, FACTORY);
			return getCore()
		}).
		then((contract)=>{
			core = contract
			var address = core.getModule(params[0])
			if (address!=0) {
				new_tokken = address
				return false
			}
			return loadAbiByName('BuilderTokenEther')
		}).
		then((abi)=>{
			if (new_tokken!=false) {
				return false
			}
			builder = getContract(abi, factory.getModule('Aira BuilderTokenEther'));
			return createModule(params, builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			if (new_tokken!=false) {
				return false
			}
			new_tokken = address
			return tx(core, 'setModule', [params[0], address, 'github://airalab/core/token/TokenEther.sol', true])
		}).
		then((tx)=>{
			if (new_tokken!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(1, 2)
			setProgress(2, 1)
			return transfer(coinbase(), core.getModule(params[0]), '0.1')
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(2, 2)
			return {
				address: new_tokken
			}
		})
}
