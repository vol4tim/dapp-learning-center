import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress, params) {
	var factory, core, builder, new_contract, market, coaching_addr
	return loadAbiByName('Core').
		then((abi)=>{
			factory = getContract(abi, FACTORY);
			return getCore()
		}).
		then((contract)=>{
			core = contract
			return loadAbiByName('BuilderDAOMarketRegulator')
		}).
		then((abi)=>{
			builder = getContract(abi, factory.getModule('Aira BuilderDAOMarketRegulator'));
			return createModule([core.getModule(params[0]), core.address, core.getModule('Market'), core.getModule(params[1])], builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			new_contract = address
			return tx(core, 'setModule', ['Market regulator', address, 'github://airalab/core/market/DAOMarketRegulator.sol', true])
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
			market = getContract(abi, core.getModule('Market'));
			return tx(market, 'setRegulator', [true])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(2, 2)
			setProgress(3, 1)
			return tx(market, 'delegate', [new_contract])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(3, 2)
			return loadAbiByName('BuilderTokenEmission')
		}).
		then((abi)=>{
			setProgress(4, 1)
			builder = getContract(abi, factory.getModule('Aira BuilderTokenEmission'));
			return createModule([params[2], params[3], params[4], params[5]], builder)
		}).
		then((address)=>{
			setProgress(4, 2)
			setProgress(5, 1)
			coaching_addr = address
			return tx(core, 'setModule', ['Сoaching token', address, 'github://airalab/core/token/TokenEmission.sol', true])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(5, 2)
			return loadAbiByName('MarketRegulator')
		}).
		then((abi)=>{
			setProgress(6, 1)
			var marketRegulator = getContract(abi, new_contract);
			return tx(marketRegulator, 'sale', [coaching_addr, params[6], params[7]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(6, 2)
			return {
				address: new_contract
			}
		})
}
