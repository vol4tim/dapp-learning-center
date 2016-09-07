import { Promise } from 'es6-promise'
import axios from 'axios'
import Blockchain from './blockchain'

export function getWeb3() {
	if (typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else if (typeof Web3 !== 'undefined') {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  } else if(typeof web3 == 'undefined' && typeof Web3 == 'undefined') {
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
		from: from,
		to: to,
		value: (isEther) ? web3.toWei(value, 'ether') : value,
		gas: 3000000
	})
}

export function getTransaction(tx) {
  return web3.eth.getTransaction(tx);
}

export function getContract(abi, address) {
  return web3.eth.contract(abi).at(address)
}

export function getUrlAbi(contract) {
  contract = contract.split(' ')
  contract = contract.pop()
  if (/builder/i.test(contract)) {
    return 'https://raw.githubusercontent.com/airalab/core/master/abi/builder/'+ contract +'.json'
  } else {
    return 'https://raw.githubusercontent.com/airalab/core/master/abi/modules/'+ contract +'.json'
  }
}

function loadAbi(url) {
  return axios.get(url).
		then((results)=>{
			return results.data;
		});
}

export function loadAbiByName(name) {
  return loadAbi(getUrlAbi(name));
}

export function tx(cotract, func, params) {
  return new Promise(function(resolve) {
		params = params.concat([
      {
        from: web3.eth.accounts[0],
        gas: 3000000
      }
    ]);
    var tx = cotract[func].apply(cotract, params);
		resolve(tx);
    // blockchain.subscribeTx(tx).
		// 	then(()=>{
		// 		resolve(tx);
		// 	}).
		// 	catch(function(e) {
		// 		console.log(e);
		// 	});
  });
}

export const blockchain = new Blockchain(getWeb3())

export function createModule(args, builder) {
  return new Promise(function(resolve, reject) {
    args = args.concat([
      {
        from: web3.eth.accounts[0],
        gas:  3000000,
        value: builder.buildingCostWei()
      }
    ]);

    builder.Builded({}, '', function(error, result){
      if (error) {
        reject(error);
      }
      resolve(result.args.instance);
    })

    builder.create.apply(builder, args);
  });
}
