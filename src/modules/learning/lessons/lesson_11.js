import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx, coinbase } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress, params) {
	var factory, core, builder, bod, voting_token, voting
	var bod_address = false
	var voting_address = false
	return loadAbiByName('Core').
		then((abi)=>{
			factory = getContract(abi, FACTORY);
			return getCore()
		}).
		then((contract)=>{
			core = contract
			var address = core.getModule('Board of Directors')
			if (address!=0) {
				bod_address = address
				return false
			}
			return loadAbiByName('BuilderBoardOfDirectors')
		}).
		then((abi)=>{
			if (bod_address!=false) {
				return false
			}
			builder = getContract(abi, factory.getModule('Aira BuilderBoardOfDirectors'));
			return createModule([core.address, core.getModule(params[0]), core.getModule(params[1])], builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			if (bod_address!=false) {
				return false
			}
			bod_address = address
			return tx(core, 'setModule', ['Board of Directors', address, 'github://airalab/core/cashflow/BoardOfDirectors.sol', true])
		}).
		then((tx)=>{
			if (bod_address!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(1, 2)
			var address = core.getModule('Voting token')
			if (address!=0) {
				voting_address = address
				return false
			}
			return loadAbiByName('BuilderTokenEmission')
		}).
		then((abi)=>{
			setProgress(2, 1)
			if (voting_address!=false) {
				return false
			}
			builder = getContract(abi, core.getModule('Token emission builder'));
			return createModule([params[2], params[3], params[4], params[5]], builder)
		}).
		then((address)=>{
			setProgress(2, 2)
			setProgress(3, 1)
			if (voting_address!=false) {
				return false
			}
			voting_address = address
			return tx(core, 'setModule', ['Voting token', address, 'github://airalab/core/token/TokenEmission.sol', true])
		}).
		then((tx)=>{
			if (voting_address!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(3, 2)
			return loadAbiByName('TokenEmission')
		}).
		then((abi)=>{
			setProgress(4, 1)
			voting_token = getContract(abi, voting_address);
			return tx(voting_token, 'transfer', [params[6], 10])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(4, 2)
			setProgress(5, 1)
			return tx(voting_token, 'transfer', [params[7], 10])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(5, 2)
			return loadAbiByName('BoardOfDirectors')
		}).
		then((abi)=>{
			setProgress(6, 1)
			bod = getContract(abi, bod_address);
			return tx(bod, 'pollUp', [voting_address, 1])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(6, 2)
			setProgress(7, 1)
			return tx(bod, 'fund', [coinbase(), 1, params[8], 1467968200, 1467971988])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(7, 2)
			return loadAbiByName('TokenEther')
		}).
		then((abi)=>{
			setProgress(8, 1)
			var ether_credits = getContract(abi, core.getModule('Ether funds'));
			return tx(ether_credits, 'transfer', [bod_address, params[9]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(8, 2)
			setProgress(9, 1)
			return tx(voting_token, 'approve', [bod.voting(), params[10]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(9, 2)
			setProgress(10, 1)
			return tx(voting_token, 'approve', [bod.voting(), params[10]])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(10, 2)
			return loadAbiByName('Voting')
		}).
		then((abi)=>{
			setProgress(11, 1)
			voting = getContract(abi, bod.voting());
			return tx(voting, 'vote', [params[10]], {from:params[6]})
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(11, 2)
			setProgress(12, 1)
			return tx(voting, 'vote', [params[10]], {from:params[7]})
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(12, 2)
			return {
				address: bod_address
			}
		})
}
