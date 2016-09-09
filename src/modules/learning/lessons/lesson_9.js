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
			var address = core.getModule('Market rule constant')
			if (address!=0) {
				new_contract = address
				return false
			}
			return loadAbiByName('BuilderMarketRuleConstant')
		}).
		then((abi)=>{
			if (new_contract!=false) {
				return false
			}
			builder = getContract(abi, factory.getModule('Aira BuilderMarketRuleConstant'));
			return createModule([params[0]], builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			if (new_contract!=false) {
				return false
			}
			new_contract = address
			return tx(core, 'setModule', ['Market rule constant', address, 'github://airalab/core/market/MarketRuleConstant.sol', true])
		}).
		then((tx)=>{
			if (new_contract!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(1, 2)
			return loadAbiByName('TokenEmission')
		}).
		then((abi)=>{
			setProgress(2, 1)
			var shares = getContract(abi, core.getModule(params[1]));
			return tx(shares, 'approve', [core.getModule('Market regulator'), params[2]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(2, 2)
			return loadAbiByName('DAOMarketRegulator')
		}).
		then((abi)=>{
			setProgress(3, 1)
			var marketRegulator = getContract(abi, core.getModule('Market regulator'));
			return tx(marketRegulator, 'pollUp', [core.getModule(params[3]), new_contract, 1])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(3, 2)
			return loadAbiByName('DAOMarketRegulator')
		}).
		then((abi)=>{
			setProgress(4, 1)
			var credits = getContract(abi, core.getModule(params[3]));
			return tx(credits, 'delegate', [new_contract])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(4, 2)
			return {
				address: new_contract
			}
		})
}
