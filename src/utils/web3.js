import { Promise } from 'es6-promise'
import _ from 'lodash'
import axios from 'axios'
import Blockchain from './blockchain'

export function getWeb3() {
  if (typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else if (typeof Web3 !== 'undefined') {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  } else if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
    return false
  }
  return web3
}

export function getAccounts() {
  return web3.eth.accounts
}

export function coinbase() {
  return web3.eth.accounts[0]
}

export function getBalance(address) {
  return parseFloat(web3.fromWei(web3.eth.getBalance(address), 'ether').toString())
}

export function isAccounts() {
  if (web3.eth.accounts.length > 0) {
    return true
  }
  return false
}

export function transfer(from, to, value, isEther = true) {
  return web3.eth.sendTransaction({
    from,
    to,
    value: (isEther) ? web3.toWei(value, 'ether') : value,
    gas: 3000000
  })
}

export function getTransaction(txId) {
  return web3.eth.getTransaction(txId);
}

export function getContract(abi, address) {
  return web3.eth.contract(abi).at(address)
}

export function getUrlAbi(contract) {
  const contractNew = contract.split(' ').pop()
  if (/builder/i.test(contractNew)) {
    return 'https://raw.githubusercontent.com/airalab/core/master/abi/builder/' + contractNew + '.json'
  }
  return 'https://raw.githubusercontent.com/airalab/core/master/abi/modules/' + contractNew + '.json'
}

function loadAbi(url) {
  return axios.get(url)
    .then(results => results.data);
}

export function loadAbiByName(name) {
  if (name === 'BoardOfDirectors') {
    return [{ constant: true, inputs: [], name: 'shares', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'credits', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_count', type: 'uint256' }], name: 'pollDown', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_index', type: 'uint256' }], name: 'proposalDone', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_name', type: 'string' }, { name: '_description', type: 'string' }, { name: '_start_time', type: 'uint256' }, { name: '_duration_sec', type: 'uint256' }], name: 'removeCoreModule', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: false, inputs: [{ name: '_name', type: 'string' }, { name: '_module', type: 'address' }, { name: '_interface', type: 'string' }, { name: '_constant', type: 'bool' }, { name: '_description', type: 'string' }, { name: '_start_time', type: 'uint256' }, { name: '_duration_sec', type: 'uint256' }], name: 'setCoreModule', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_target', type: 'address' }, { name: '_value', type: 'uint256' }, { name: '_description', type: 'string' }, { name: '_start_time', type: 'uint256' }, { name: '_duration_sec', type: 'uint256' }], name: 'fund', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_new_voting', type: 'address' }, { name: '_count', type: 'uint256' }], name: 'pollUp', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'minVotingShares', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'voting', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'dao_core', outputs: [{ name: '', type: 'address' }], type: 'function' }, { inputs: [{ name: '_dao_core', type: 'address' }, { name: '_shares', type: 'address' }, { name: '_credits', type: 'address' }], type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, name: 'new_token', type: 'address' }], name: 'VotingTokenChanged', type: 'event' }]
  }
  return loadAbi(getUrlAbi(name));
}

export function tx(cotract, func, args, txArgs = {}) {
  return new Promise((resolve) => {
    const params = args.concat([
      _.merge({
        from: web3.eth.accounts[0],
        gas: 3000000
      }, txArgs)
    ]);
    console.log('tx', func);
    console.log(params);
    resolve(cotract[func](...params));
  });
}

export const blockchain = new Blockchain(getWeb3())

export function createModule(args, builder) {
  return new Promise((resolve, reject) => {
    const params = args.concat([
      {
        from: web3.eth.accounts[0],
        gas: 3000000,
        value: builder.buildingCostWei()
      }
    ]);

    builder.Builded({}, '', (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result.args.instance);
    })

    builder.create(...params);
  });
}
