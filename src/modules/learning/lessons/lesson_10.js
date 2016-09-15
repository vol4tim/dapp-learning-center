import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress) {
  let factory
  let core
  let builder
  let marketRegulator
  let assset1Addr = false
  let assset2Addr = false
  let service1Addr = false
  let service2Addr = false
  return loadAbiByName('Core')
    .then((abi) => {
      factory = getContract(abi, FACTORY);
      return getCore()
    })
    .then((contract) => {
      core = contract
      const address = core.getModule('Token emission builder')
      if (address !== '0x0000000000000000000000000000000000000000') {
        return false
      }
      return tx(core, 'setModule', ['Token emission builder', factory.getModule('Aira BuilderTokenEmission'), 'github://airalab/core/builder/BuilderTokenEmission.sol', true])
    })
    .then((txId) => {
      if (txId === false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(0, 2)
      const address = core.getModule('Assset 1 token')
      if (address !== '0x0000000000000000000000000000000000000000') {
        assset1Addr = address
      }
      return loadAbiByName('BuilderTokenEmission')
    })
    .then((abi) => {
      setProgress(1, 1)
      builder = getContract(abi, core.getModule('Token emission builder'));
      if (assset1Addr !== false) {
        return false
      }
      return createModule(['Assset 1', 'A1', 0, 100], builder)
    })
    .then((address) => {
      setProgress(1, 2)
      setProgress(2, 1)
      if (assset1Addr !== false) {
        return false
      }
      assset1Addr = address
      return tx(core, 'setModule', ['Assset 1 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
    })
    .then((txId) => {
      if (txId === false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(2, 2)
      setProgress(3, 1)
      const address = core.getModule('Assset 2 token')
      if (address !== '0x0000000000000000000000000000000000000000') {
        assset2Addr = address
        return false
      }
      return createModule(['Assset 2', 'A2', 0, 100], builder)
    })
    .then((address) => {
      setProgress(3, 2)
      setProgress(4, 1)
      if (assset2Addr !== false) {
        return false
      }
      assset2Addr = address
      return tx(core, 'setModule', ['Assset 2 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
    })
    .then((txId) => {
      if (txId === false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(4, 2)
      setProgress(5, 1)
      const address = core.getModule('Service 1 token')
      if (address !== '0x0000000000000000000000000000000000000000') {
        service1Addr = address
        return false
      }
      return createModule(['Service 1', 'S1', 0, 100], builder)
    })
    .then((address) => {
      setProgress(5, 2)
      setProgress(6, 1)
      if (service1Addr !== false) {
        return false
      }
      service1Addr = address
      return tx(core, 'setModule', ['Service 1 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
    })
    .then((txId) => {
      if (txId === false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(6, 2)
      setProgress(7, 1)
      const address = core.getModule('Service 2 token')
      if (address !== '0x0000000000000000000000000000000000000000') {
        service2Addr = address
        return false
      }
      return createModule(['Service 2', 'S2', 0, 100], builder)
    })
    .then((address) => {
      setProgress(7, 2)
      setProgress(8, 1)
      if (service2Addr !== false) {
        return false
      }
      service2Addr = address
      return tx(core, 'setModule', ['Service 2 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
    })
    .then((txId) => {
      if (txId === false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(8, 2)
      return loadAbiByName('DAOMarketRegulator')
    })
    .then((abi) => {
      setProgress(9, 1)
      marketRegulator = getContract(abi, core.getModule('Market regulator'));
      return tx(marketRegulator, 'sale', [assset1Addr, 1, 2])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(9, 2)
      setProgress(10, 1)
      return tx(marketRegulator, 'buy', [assset2Addr, 2, 1])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(10, 2)
      setProgress(11, 1)
      return tx(marketRegulator, 'sale', [service1Addr, 1, 5])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(11, 2)
      setProgress(12, 1)
      return tx(marketRegulator, 'buy', [service2Addr, 4, 2])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(12, 2)
      return {
      }
    })
}
