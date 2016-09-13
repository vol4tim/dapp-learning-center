import { L_CENTER } from '../../../config/config'
import { loadAbiByName, getContract, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress, params) {
  var core
  var shares
  var learningCenter
  return getCore()
    .then((contract) => {
      core = contract
      return loadAbiByName('TokenEmission')
    })
    .then((abi) => {
      shares = getContract(abi, core.getModule(params[0]));
      return loadAbiByName('Core')
    })
    .then((abi) => {
      learningCenter = getContract(abi, L_CENTER);
    })
    .then(() => tx(shares, 'approve', [learningCenter.getModule('Lesson_2'), params[1]]))
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(0, 2)
      return {
        _shares_name: params[0],
        _amount: params[1]
      }
    })
}
