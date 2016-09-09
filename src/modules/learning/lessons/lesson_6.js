import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx, coinbase } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress, params) {
	var factory, core, builder, new_contract, market
	return loadAbiByName('Core').
		then((abi)=>{
			factory = getContract(abi, FACTORY);
			return getCore()
		}).
		then((contract)=>{
			core = contract
			return loadAbiByName('BuilderMarket')
		}).
		then((abi)=>{
			builder = getContract(abi, factory.getModule('Aira BuilderMarket'));
			return createModule([], builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			new_contract = address
			return tx(core, 'setModule', ['Market', address, 'github://airalab/core/market/Market.sol', true])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(1, 2)
			return loadAbiByName('Market')
		}).
		then((abi)=>{
			setProgress(2, 1)
			market = getContract(abi, new_contract);
			return tx(market, 'append', [coinbase(), core.getModule(params[0]), core.getModule(params[2]), params[1], params[3]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(2, 2)
			setProgress(3, 1)
			return tx(market, 'append', [coinbase(), core.getModule(params[4]), core.getModule(params[6]), params[5], params[7]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(3, 2)
			return {
				address: new_contract
			}
		})
}
