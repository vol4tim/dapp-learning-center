import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract, createModule, blockchain, tx, coinbase } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress, params) {
  var factory
  var core
  var builder
  var bod
  var votingToken
  var voting
  var bodAddress = false
  var votingAddress = false
  return loadAbiByName('Core')
    .then((abi) => {
      factory = getContract(abi, FACTORY);
      return getCore()
    })
    .then((contract) => {
      core = contract
      const address = core.getModule('Board of Directors')
      if (address !== '0x0000000000000000000000000000000000000000') {
        bodAddress = address
        return false
      }
      return loadAbiByName('BuilderBoardOfDirectors')
    })
    .then((abi) => {
      if (bodAddress !== false) {
        return false
      }
      builder = getContract(abi, factory.getModule('Aira BuilderBoardOfDirectors'));
      return createModule([
        core.address,
        core.getModule(params[0]), core.getModule(params[1])], builder)
    })
    .then((address) => {
      setProgress(0, 2)
      setProgress(1, 1)
      if (bodAddress !== false) {
        return false
      }
      bodAddress = address
      return tx(core, 'setModule', ['Board of Directors', address, 'github://airalab/core/cashflow/BoardOfDirectors.sol', true])
    })
    .then((txId) => {
      if (bodAddress !== false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(1, 2)
      const address = core.getModule('Voting token')
      if (address !== '0x0000000000000000000000000000000000000000') {
        votingAddress = address
        return false
      }
      return loadAbiByName('BuilderTokenEmission')
    })
    .then((abi) => {
      setProgress(2, 1)
      if (votingAddress !== false) {
        return false
      }
      builder = getContract(abi, core.getModule('Token emission builder'));
      return createModule([params[2], params[3], params[4], params[5]], builder)
    })
    .then((address) => {
      setProgress(2, 2)
      setProgress(3, 1)
      if (votingAddress !== false) {
        return false
      }
      votingAddress = address
      return tx(core, 'setModule', ['Voting token', address, 'github://airalab/core/token/TokenEmission.sol', true])
    })
    .then((txId) => {
      if (votingAddress !== false) {
        return false
      }
      return blockchain.subscribeTx(txId)
    })
    .then(() => {
      setProgress(3, 2)
      return loadAbiByName('TokenEmission')
    })
    .then((abi) => {
      setProgress(4, 1)
      votingToken = getContract(abi, votingAddress);
      return tx(votingToken, 'transfer', [params[6], 10])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(4, 2)
      setProgress(5, 1)
      return tx(votingToken, 'transfer', [params[7], 10])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(5, 2)
      return loadAbiByName('BoardOfDirectors')
    })
    .then((abi) => {
      setProgress(6, 1)
      bod = getContract(abi, bodAddress);
      return tx(bod, 'pollUp', [votingAddress, 1])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(6, 2)
      setProgress(7, 1)
      return tx(bod, 'fund', [coinbase(), 1, params[8], 1467968200, 1467971988])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(7, 2)
      return loadAbiByName('TokenEther')
    })
    .then((abi) => {
      setProgress(8, 1)
      return tx(getContract(abi, core.getModule('Ether funds')), 'transfer', [bodAddress, params[9]])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(8, 2)
      setProgress(9, 1)
      return tx(votingToken, 'approve', [bod.voting(), params[10]])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(9, 2)
      setProgress(10, 1)
      return tx(votingToken, 'approve', [bod.voting(), params[10]])
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(10, 2)
      return loadAbiByName('Voting')
    })
    .then((abi) => {
      setProgress(11, 1)
      voting = getContract(abi, bod.voting());
      return tx(voting, 'vote', [params[10]], { from: params[6] })
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(11, 2)
      setProgress(12, 1)
      return tx(voting, 'vote', [params[10]], { from: params[7] })
    })
    .then(txId => blockchain.subscribeTx(txId))
    .then(() => {
      setProgress(12, 2)
      return {
        address: bodAddress
      }
    })
}
