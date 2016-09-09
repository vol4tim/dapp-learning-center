import { Promise } from 'es6-promise'
import { loadAbiByName, getContract, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress, params) {
	var marketAgentSign = function(marketRegulator) {
		return new Promise(function(resolve, reject) {
			marketRegulator.MarketAgentSign({}, '', function(error, result){
				if (error) {
					reject(error);
				}
				resolve(result.args.agent);
			})
		});
	}
	var core, new_contract
	return getCore().
		then((contract)=>{
			core = contract
			return loadAbiByName('MarketRegulator')
		}).
		then((abi)=>{
			setProgress(6, 1)
			var marketRegulator = getContract(abi, params[0]);
			tx(marketRegulator, 'sign', [])
			return marketAgentSign(marketRegulator)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			new_contract = address
			return tx(core, 'setModule', ['Market agent', address, 'github://airalab/core/market/DAOMarketAgent.sol', true])
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
