import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress, params) {
  var factory
  var core
  var builder
  var market
  var newContract = false
  var coachingAddr = false
  return loadAbiByName('Core')
    .then((abi) => {
      factory = getContract(abi, FACTORY);
      return getCore()
    })
    .then((contract) => {
      core = contract
      const address = core.getModule('Market regulator')
      if (address !== '0x0000000000000000000000000000000000000000') {
        newContract = address
        return false
      }
      return loadAbiByName('BuilderDAOMarketRegulator')
    })
    .then((abi) => {
      if (newContract !== false) {
        return false
      }
      builder = getContract(abi, factory.getModule('Aira BuilderDAOMarketRegulator'));
      return createModule([core.getModule(params[0]), core.address, core.getModule('Market'), core.getModule(params[1])], builder)
    })
    .then((address) => {
      setProgress(0, 2)
      setProgress(1, 1)
      if (newContract !== false) {
        return false
      }
      newContract = address
      return tx(core, 'setModule', ['Market regulator', address, 'github://airalab/core/market/DAOMarketRegulator.sol', true])
    })
    .then((txId) => {
      if (newContract !== false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(1, 2)
      return loadAbiByName('Market')
    })
    .then((abi) => {
      setProgress(2, 1)
      market = getContract(abi, core.getModule('Market'));
      return tx(market, 'setRegulator', [true])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(2, 2)
      setProgress(3, 1)
      return tx(market, 'delegate', [newContract])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(3, 2)
      const address = core.getModule('Сoaching token')
      if (address !== '0x0000000000000000000000000000000000000000') {
        coachingAddr = address
        return false
      }
      return loadAbiByName('BuilderTokenEmission')
    })
    .then((abi) => {
      setProgress(4, 1)
      if (coachingAddr !== false) {
        return false
      }
      builder = getContract(abi, factory.getModule('Aira BuilderTokenEmission'));
      return createModule([params[2], params[3], params[4], params[5]], builder)
    })
    .then((address) => {
      setProgress(4, 2)
      setProgress(5, 1)
      if (coachingAddr !== false) {
        return false
      }
      coachingAddr = address
      return tx(core, 'setModule', ['Сoaching token', address, 'github://airalab/core/token/TokenEmission.sol', true])
    })
    .then((txId) => {
      if (coachingAddr !== false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(5, 2)
      return loadAbiByName('DAOMarketRegulator')
    })
    .then((abi) => {
      setProgress(6, 1)
      const marketRegulator = getContract(abi, newContract);
      return tx(marketRegulator, 'sale', [coachingAddr, params[6], params[7]])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(6, 2)
      return {
        address: newContract
      }
    })
}
