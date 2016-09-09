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
	var core
	var new_contract = false
	return getCore().
		then((contract)=>{
			core = contract
			var address = core.getModule('Market agent')
			if (address!=0) {
				new_contract = address
				return false
			}
			return loadAbiByName('DAOMarketRegulator')
		}).
		then((abi)=>{
			setProgress(6, 1)
			if (new_contract!=false) {
				return false
			}
			var marketRegulator = getContract(abi, params[0]);
			tx(marketRegulator, 'sign', [])
			return marketAgentSign(marketRegulator)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			if (new_contract!=false) {
				return false
			}
			new_contract = address
			return tx(core, 'setModule', ['Market agent', address, 'github://airalab/core/market/DAOMarketAgent.sol', true])
		}).
		then((tx)=>{
			if (new_contract!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(3, 2)
			return {
				address: new_contract
			}
		})
}
