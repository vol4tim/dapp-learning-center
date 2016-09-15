import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, coinbase, tx, transfer } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress, params) {
  let factory
  let core
  let builder
  let shares
  let newContract
  return loadAbiByName('Core')
    .then((abi) => {
      factory = getContract(abi, FACTORY);
      return getCore()
    })
    .then((contract) => {
      core = contract
      return loadAbiByName('BuilderShareSale')
    })
    .then((abi) => {
      builder = getContract(abi, factory.getModule('Aira BuilderShareSale'));
      return createModule([
        coinbase(),
        core.getModule(params[0]),
        core.getModule(params[1]),
        1000000000000000], builder)
    })
    .then((address) => {
      setProgress(0, 2)
      setProgress(1, 1)
      newContract = address
      return loadAbiByName('TokenEmission')
    })
    .then((abi) => {
      shares = getContract(abi, core.getModule(params[1]));
      return tx(shares, 'transfer', [newContract, 100])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(1, 2)
      setProgress(2, 1)
      return loadAbiByName('ShareSale')
    })
    .then((abi) => {
      const shareSale = getContract(abi, newContract);
      console.log('balanceOf', shares.balanceOf(newContract));
      console.log('priceWei', shareSale.priceWei());
      console.log('all', (shares.balanceOf(newContract) * shareSale.priceWei()));
      return transfer(
        coinbase(), newContract, (shares.balanceOf(newContract) * shareSale.priceWei()), false
      )
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(2, 2)
      return {
        address: newContract
      }
    })
}
