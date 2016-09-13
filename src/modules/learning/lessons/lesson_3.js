import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, tx, blockchain, transfer, coinbase } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress, params) {
  var factory
  var core
  var builder
  var newTokken = false
  return loadAbiByName('Core')
    .then((abi) => {
      factory = getContract(abi, FACTORY);
      return getCore()
    })
    .then((contract) => {
      core = contract
      const address = core.getModule(params[0])
      if (address !== '0x0000000000000000000000000000000000000000') {
        newTokken = address
        return false
      }
      return loadAbiByName('BuilderTokenEther')
    })
    .then((abi) => {
      if (newTokken !== false) {
        return false
      }
      builder = getContract(abi, factory.getModule('Aira BuilderTokenEther'));
      return createModule(params, builder)
    })
    .then((address) => {
      setProgress(0, 2)
      setProgress(1, 1)
      if (newTokken !== false) {
        return false
      }
      newTokken = address
      return tx(core, 'setModule', [params[0], address, 'github://airalab/core/token/TokenEther.sol', true])
    })
    .then((txId) => {
      if (txId === false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(1, 2)
      setProgress(2, 1)
      return transfer(coinbase(), core.getModule(params[0]), '0.1')
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(2, 2)
      return {
        address: newTokken
      }
    })
}
