import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, coinbase, tx, transfer } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress, params) {
	var factory, core, builder, shares, new_contract
	return loadAbiByName('Core').
		then((abi)=>{
			factory = getContract(abi, FACTORY);
			return getCore()
		}).
		then((contract)=>{
			core = contract
			return loadAbiByName('BuilderShareSale')
		}).
		then((abi)=>{
			builder = getContract(abi, factory.getModule('Aira BuilderShareSale'));
			return createModule([coinbase(), core.getModule(params[0]), core.getModule(params[1]), 1000000000000000], builder)
		}).
		then((address)=>{
			setProgress(0, 2)
			setProgress(1, 1)
			new_contract = address
			return loadAbiByName('TokenEmission')
		}).
		then((abi)=>{
			shares = getContract(abi, core.getModule(params[1]));
			return tx(shares, 'transfer', [new_contract, 100])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(1, 2)
			setProgress(2, 1)
			return loadAbiByName('ShareSale')
		}).
		then((abi)=>{
			var shareSale = getContract(abi, new_contract);
			console.log('balanceOf', shares.balanceOf(new_contract));
			console.log('priceWei', shareSale.priceWei());
			console.log('all',(shares.balanceOf(new_contract) * shareSale.priceWei()));
			return transfer(coinbase(), new_contract, (shares.balanceOf(new_contract) * shareSale.priceWei()), false)
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(2, 2)
			return {
				address: new_contract
			}
		})
}
