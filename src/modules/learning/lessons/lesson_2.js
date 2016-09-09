import { L_CENTER } from '../../../config/config'
import { loadAbiByName, getContract, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress, params) {
	var core, shares, learning_center
	return getCore().
		then((contract)=>{
			core = contract
			return loadAbiByName('TokenEmission')
		}).
		then((abi)=>{
			shares = getContract(abi, core.getModule(params[0]));
			return loadAbiByName('Core')
		}).
		then((abi)=>{
			learning_center = getContract(abi, L_CENTER);
		}).
		then(()=>{
			return tx(shares, 'approve', [learning_center.getModule('Lesson_2'), params[1]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(0, 2)
			return {
				_shares_name: params[0],
				_amount: params[1]
			}
		})
}
