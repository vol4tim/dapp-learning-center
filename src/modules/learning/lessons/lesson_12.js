import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx, coinbase } from '../../../utils/web3'
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
			return loadAbiByName('BuilderCrowdSale')
		}).
		then((abi)=>{
			builder = getContract(abi, factory.getModule('Aira BuilderCrowdSale'));
			return createModule([coinbase(), core.getModule(params[0]), core.getModule(params[1]), 1467972466, 3600, params[2], params[2], 3600, params[3], params[3]], builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			new_contract = address
			return loadAbiByName('TokenEmission')
		}).
		then((abi)=>{
			setProgress(2, 1)
			var credits = getContract(abi, core.getModule(params[1]));
			return tx(credits, 'transfer', [new_contract, params[3]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			return loadAbiByName('TokenEther')
		}).
		then((abi)=>{
			setProgress(2, 1)
			var ether_credits = getContract(abi, core.getModule(params[0]));
			return tx(ether_credits, 'approve', [new_contract, params[3]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			return loadAbiByName('CrowdSale')
		}).
		then((abi)=>{
			setProgress(2, 1)
			var crowdSale = getContract(abi, new_contract);
			return tx(crowdSale, 'deal', [])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(4, 2)
			return {
				address: new_contract
			}
		})``
}
