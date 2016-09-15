/* eslint new-cap: 0 */

import { Promise } from 'es6-promise'
import { loadAbiByName, getContract, blockchain, tx } from '../../../utils/web3'
import { getCore } from './helper'

export default function (setProgress, params) {
  const marketAgentSign = marketRegulator => (
    new Promise((resolve, reject) => {
      marketRegulator.MarketAgentSign({}, '', (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.args.agent);
      })
    })
  )
  let core
  let newContract = false
  return getCore()
    .then((contract) => {
      core = contract
      const address = core.getModule('Market agent')
      if (address !== '0x0000000000000000000000000000000000000000') {
        newContract = address
        return false
      }
      return loadAbiByName('DAOMarketRegulator')
    })
    .then((abi) => {
      if (newContract !== false) {
        return false
      }
      const marketRegulator = getContract(abi, params[0]);
      tx(marketRegulator, 'sign', [])
      return marketAgentSign(marketRegulator)
    })
    .then((address) => {
      setProgress(0, 2)
      setProgress(1, 1)
      if (newContract !== false) {
        return false
      }
      newContract = address
      return tx(core, 'setModule', ['Market agent', address, 'github://airalab/core/market/DAOMarketAgent.sol', true])
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
