import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx, coinbase } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress, params) {
  let factory
  let core
  let builder
  let market
  let newContract = false
  return loadAbiByName('Core')
    .then((abi) => {
      factory = getContract(abi, FACTORY);
      return getCore()
    })
    .then((contract) => {
      core = contract
      const address = core.getModule('Market')
      if (address !== '0x0000000000000000000000000000000000000000') {
        newContract = address
        return false
      }
      return loadAbiByName('BuilderMarket')
    })
    .then((abi) => {
      if (newContract !== false) {
        return false
      }
      builder = getContract(abi, factory.getModule('Aira BuilderMarket'));
      return createModule([], builder)
    })
    .then((address) => {
      setProgress(0, 2)
      setProgress(1, 1)
      if (newContract !== false) {
        return false
      }
      newContract = address
      return tx(core, 'setModule', ['Market', address, 'github://airalab/core/market/Market.sol', true])
    })
    .then((txId) => {
      if (txId === false) {
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
      market = getContract(abi, newContract);
      return tx(market, 'append', [coinbase(), core.getModule(params[0]), core.getModule(params[2]), params[1], params[3]])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(2, 2)
      setProgress(3, 1)
      return tx(market, 'append', [coinbase(), core.getModule(params[4]), core.getModule(params[6]), params[5], params[7]])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(3, 2)
      return {
        address: newContract
      }
    })
}
