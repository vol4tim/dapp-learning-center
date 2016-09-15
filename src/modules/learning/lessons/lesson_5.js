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
      const address = core.getModule(params[0])
      if (address !== '0x0000000000000000000000000000000000000000') {
        newContract = address
        return false
      }
      return loadAbiByName('BuilderTokenEmission')
    })
    .then((abi) => {
      if (newContract !== false) {
        return false
      }
      builder = getContract(abi, factory.getModule('Aira BuilderTokenEmission'));
      return createModule(params, builder)
    })
    .then((address) => {
      setProgress(0, 2)
      setProgress(1, 1)
      if (newContract !== false) {
        return false
      }
      newContract = address
      return tx(core, 'setModule', [params[0], address, 'github://airalab/core/token/TokenEmission.sol', true])
    })
    .then((txId) => {
      if (txId === false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(1, 2)
      return {
        address: newContract
      }
    })
}
