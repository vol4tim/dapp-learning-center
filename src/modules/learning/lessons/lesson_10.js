import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function(setProgress) {
	var factory, core, builder, marketRegulator, assset1_addr, assset2_addr, service1_addr, service2_addr
	var is_module = false
	return loadAbiByName('Core').
		then((abi)=>{
			factory = getContract(abi, FACTORY);
			return getCore()
		}).
		then((contract)=>{
			core = contract
			var address = core.getModule('Token emission builder')
			if (address!=0) {
				is_module = true
				return false
			}
			return tx(core, 'setModule', ['Token emission builder', factory.getModule('Aira BuilderTokenEmission'), 'github://airalab/core/builder/BuilderTokenEmission.sol', true])
		}).
		then((tx)=>{
			if (is_module!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(0, 2)
			var address = core.getModule('Assset 1 token')
			if (address!=0) {
				assset1_addr = address
				return false
			}
			return loadAbiByName('BuilderTokenEmission')
		}).
		then((abi)=>{
			setProgress(1, 1)
			builder = getContract(abi, core.getModule('Token emission builder'));
			if (assset1_addr!=false) {
				return false
			}
			return createModule(['Assset 1', 'A1', 0, 100], builder)
		}).
		then((address)=>{
			setProgress(1, 2)
			setProgress(2, 1)
			if (assset1_addr!=false) {
				return false
			}
			assset1_addr = address
			return tx(core, 'setModule', ['Assset 1 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
		}).
		then((tx)=>{
			if (assset1_addr!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(2, 2)
			setProgress(3, 1)
			var address = core.getModule('Assset 2 token')
			if (address!=0) {
				assset2_addr = address
				return false
			}
			return createModule(['Assset 2', 'A2', 0, 100], builder)
		}).
		then((address)=>{
			setProgress(3, 2)
			setProgress(4, 1)
			if (assset2_addr!=false) {
				return false
			}
			assset2_addr = address
			return tx(core, 'setModule', ['Assset 2 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
		}).
		then((tx)=>{
			if (assset2_addr!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(4, 2)
			setProgress(5, 1)
			var address = core.getModule('Service 1 token')
			if (address!=0) {
				service1_addr = address
				return false
			}
			return createModule(['Service 1', 'S1', 0, 100], builder)
		}).
		then((address)=>{
			setProgress(5, 2)
			setProgress(6, 1)
			if (service1_addr!=false) {
				return false
			}
			service1_addr = address
			return tx(core, 'setModule', ['Service 1 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
		}).
		then((tx)=>{
			if (service1_addr!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(6, 2)
			setProgress(7, 1)
			var address = core.getModule('Service 2 token')
			if (address!=0) {
				service2_addr = address
				return false
			}
			return createModule(['Service 2', 'S2', 0, 100], builder)
		}).
		then((address)=>{
			setProgress(7, 2)
			setProgress(8, 1)
			if (service2_addr!=false) {
				return false
			}
			service2_addr = address
			return tx(core, 'setModule', ['Service 2 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
		}).
		then((tx)=>{
			if (service2_addr!=false) {
				return false
			}
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(8, 2)
			return loadAbiByName('DAOMarketRegulator')
		}).
		then((abi)=>{
			setProgress(9, 1)
			marketRegulator = getContract(abi, core.getModule('Market regulator'));
			return tx(marketRegulator, 'sale', [assset1_addr, 1, 2])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(9, 2)
			setProgress(10, 1)
			return tx(marketRegulator, 'buy', [assset2_addr, 2, 1])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(10, 2)
			setProgress(11, 1)
			return tx(marketRegulator, 'sale', [service1_addr, 1, 5])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(11, 2)
			setProgress(12, 1)
			return tx(marketRegulator, 'buy', [service2_addr, 4, 2])
		}).
		then((tx)=>{
			return blockchain.subscribeTx(tx)
		}).
		then(()=>{
			setProgress(12, 2)
			return {
			}
		})
}
