import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx, coinbase } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress, params) {
  var factory
  var core
  var builder
  var newContract
  return loadAbiByName('Core')
    .then((abi) => {
      factory = getContract(abi, FACTORY);
      return getCore()
    })
    .then((contract) => {
      core = contract
      return loadAbiByName('BuilderCrowdSale')
    })
    .then((abi) => {
      builder = getContract(abi, factory.getModule('Aira BuilderCrowdSale'));
      return createModule([
        coinbase(),
        core.getModule(params[0]),
        core.getModule(params[1]),
        Math.floor(Date.now() / 1000),
        3600,
        params[2],
        params[2],
        3600,
        params[3],
        params[3]], builder)
    })
    .then((address) => {
      setProgress(0, 2)
      setProgress(1, 1)
      newContract = address
      return loadAbiByName('TokenEmission')
    })
    .then((abi) => {
      setProgress(2, 1)
      return tx(getContract(abi, core.getModule(params[1])), 'transfer', [newContract, params[3]])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => loadAbiByName('TokenEther'))
    .then((abi) => {
      setProgress(2, 1)
      const etherCredits = getContract(abi, core.getModule(params[0]));
      return tx(etherCredits, 'approve', [newContract, params[3]])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => loadAbiByName('CrowdSale'))
    .then((abi) => {
      setProgress(2, 1)
      const crowdSale = getContract(abi, newContract);
      return tx(crowdSale, 'deal', [])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(4, 2)
      return {
        address: newContract
      }
    })
}
