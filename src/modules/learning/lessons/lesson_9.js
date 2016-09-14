import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress, params) {
  let factory
  let core
  let builder
  let newContract = false
  return loadAbiByName('Core')
    .then((abi) => {
      factory = getContract(abi, FACTORY);
      return getCore()
    })
    .then((contract) => {
      core = contract
      const address = core.getModule('Market rule constant')
      if (address !== '0x0000000000000000000000000000000000000000') {
        newContract = address
        return false
      }
      return loadAbiByName('BuilderMarketRuleConstant')
    })
    .then((abi) => {
      if (newContract !== false) {
        return false
      }
      builder = getContract(abi, factory.getModule('Aira BuilderMarketRuleConstant'));
      return createModule([params[0]], builder)
    })
    .then((address) => {
      setProgress(0, 2)
      setProgress(1, 1)
      if (newContract !== false) {
        return false
      }
      newContract = address
      return tx(core, 'setModule', ['Market rule constant', address, 'github://airalab/core/market/MarketRuleConstant.sol', true])
    })
    .then((txId) => {
      if (txId === false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(1, 2)
      return loadAbiByName('TokenEmission')
    })
    .then((abi) => {
      setProgress(2, 1)
      const shares = getContract(abi, core.getModule(params[1]));
      return tx(shares, 'approve', [core.getModule('Market regulator'), params[2]])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(2, 2)
      return loadAbiByName('DAOMarketRegulator')
    })
    .then((abi) => {
      setProgress(3, 1)
      const marketRegulator = getContract(abi, core.getModule('Market regulator'));
      return tx(marketRegulator, 'pollUp', [core.getModule(params[3]), newContract, 1])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(3, 2)
      return loadAbiByName('DAOMarketRegulator')
    })
    .then((abi) => {
      setProgress(4, 1)
      const credits = getContract(abi, core.getModule(params[3]));
      return tx(credits, 'delegate', [newContract])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(4, 2)
      return {
        address: newContract
      }
    })
}
