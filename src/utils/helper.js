import { FACTORY, L_CENTER } from '../config/config'
import { coinbase, loadAbiByName, getContract } from './web3'

export function getCoreAddress() {
  let factory
  return loadAbiByName('Core')
    .then((abi) => {
      factory = getContract(abi, FACTORY);
      return loadAbiByName('BuilderDAO')
    })
    .then((abi) => {
      const builder = getContract(abi, factory.getModule('Aira BuilderDAO'));
      const address = builder.getLastContract({ from: coinbase() });
      if (address !== '0x0000000000000000000000000000000000000000' && address !== '0x') {
        return address
      }
      return ''
    })
}

export function getAirBalance() {
  const tokenairAbi = [{ constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], type: 'function' }, { constant: false, inputs: [{ name: '_address', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'approve', outputs: [], type: 'function' }, { constant: true, inputs: [], name: 'getBalance', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transferFrom', outputs: [{ name: '', type: 'bool' }], type: 'function' }, { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], type: 'function' }, { constant: false, inputs: [{ name: '_value', type: 'uint256' }], name: 'burn', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_value', type: 'uint256' }], name: 'emission', outputs: [], type: 'function' }, { constant: false, inputs: [{ name: '_owner', type: 'address' }], name: 'delegate', outputs: [], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], type: 'function' }, { constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], type: 'function' }, { constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ name: '', type: 'bool' }], type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'address' }], name: 'allowance', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: true, inputs: [{ name: '_address', type: 'address' }], name: 'getBalance', outputs: [{ name: '', type: 'uint256' }], type: 'function' }, { constant: false, inputs: [{ name: '_address', type: 'address' }], name: 'unapprove', outputs: [], type: 'function' }, { inputs: [{ name: '_name', type: 'string' }, { name: '_symbol', type: 'string' }, { name: '_decimals', type: 'uint8' }, { name: '_start_count', type: 'uint256' }], type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, name: '_from', type: 'address' }, { indexed: true, name: '_to', type: 'address' }, { indexed: false, name: '_value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: '_owner', type: 'address' }, { indexed: true, name: '_spender', type: 'address' }, { indexed: false, name: '_value', type: 'uint256' }], name: 'Approval', type: 'event' }];
  return loadAbiByName('Core')
    .then((abi) => {
      const learningCenter = getContract(abi, L_CENTER);
      const tokenair = getContract(tokenairAbi, learningCenter.getModule('Air token'));
      return tokenair.getBalance({ from: coinbase() })
    })
}
