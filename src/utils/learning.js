import { Promise } from 'es6-promise'
import { loadAbiByName, getContract, createModule, tx, blockchain, coinbase, transfer } from './web3'

var factory_address = '0xa76422591378d14fb6d94c9da48a42498d8b51da'
var learning_center_address = '0x73c5f07b929867951aa2b61f30773dba627d4779'

export const lessons = {
  1: function(setProgress, params) {
    var factory
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return loadAbiByName('BuilderDAO')
      }).
      then((abi)=>{
        var builder = getContract(abi, factory.getModule('Aira BuilderDAO'));
        return createModule(params, builder)
      }).
      then((address)=>{
        setProgress(0, 2)
        return {
          address
        }
      })
  },
  2: function(setProgress, params) {
    var core, shares, learning_center
    return getCore().
      then((contract)=>{
        core = contract
        return loadAbiByName('TokenEmission')
      }).
      then((abi)=>{
        shares = getContract(abi, core.getModule(params[0]));
        return loadAbiByName('Core')
      }).
      then((abi)=>{
        learning_center = getContract(abi, learning_center_address);
      }).
      then(()=>{
        return tx(shares, 'approve', [learning_center.getModule('Lesson_2'), params[1]])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(0, 2)
        return {
          _shares_name: params[0],
          _amount: params[1]
        }
      })
  },
  3: function(setProgress, params) {
    var factory, core, builder, new_tokken
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return getCore()
      }).
      then((contract)=>{
        core = contract
        return loadAbiByName('BuilderTokenEther')
      }).
      then((abi)=>{
        builder = getContract(abi, factory.getModule('Aira BuilderTokenEther'));
        return createModule(params, builder)
      }).
      then((address)=>{
        setProgress(0, 2)
        setProgress(1, 1)
        new_tokken = address
        return tx(core, 'setModule', [params[0], address, 'github://airalab/core/token/TokenEther.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(1, 2)
        setProgress(2, 1)
        return transfer(coinbase(), core.getModule(params[0]), '0.1')
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(2, 2)
        return {
          address: new_tokken
        }
      })
  },
  4: function(setProgress, params) {
    var factory, core, builder, shares, new_contract
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return getCore()
      }).
      then((contract)=>{
        core = contract
        return loadAbiByName('BuilderShareSale')
      }).
      then((abi)=>{
        builder = getContract(abi, factory.getModule('Aira BuilderShareSale'));
        return createModule([coinbase(), core.getModule(params[0]), core.getModule(params[1]), 1000000000000000], builder)
      }).
      then((address)=>{
        setProgress(0, 2)
        setProgress(1, 1)
        new_contract = address
        return loadAbiByName('TokenEmission')
      }).
      then((abi)=>{
        shares = getContract(abi, core.getModule(params[1]));
        return tx(shares, 'transfer', [new_contract, 100])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(1, 2)
        setProgress(2, 1)
        return loadAbiByName('ShareSale')
      }).
      then((abi)=>{
        var shareSale = getContract(abi, new_contract);
        console.log('balanceOf', shares.balanceOf(new_contract));
        console.log('priceWei', shareSale.priceWei());
        console.log('all',(shares.balanceOf(new_contract) * shareSale.priceWei()));
        return transfer(coinbase(), new_contract, (shares.balanceOf(new_contract) * shareSale.priceWei()), false)
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(2, 2)
        return {
          address: new_contract
        }
      })
  },
  5: function(setProgress, params) {
		var factory, core, builder, new_contract
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return getCore()
      }).
      then((contract)=>{
        core = contract
        return loadAbiByName('BuilderTokenEmission')
      }).
      then((abi)=>{
        builder = getContract(abi, factory.getModule('Aira BuilderTokenEmission'));
        return createModule(params, builder)
      }).
      then((address)=>{
        setProgress(0, 2)
        setProgress(1, 1)
        new_contract = address
        return tx(core, 'setModule', [params[0], address, 'github://airalab/core/token/TokenEmission.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(1, 2)
        return {
          address: new_contract
        }
      })
  },
  6: function(setProgress, params) {
		var factory, core, builder, new_contract, market
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return getCore()
      }).
      then((contract)=>{
        core = contract
        return loadAbiByName('BuilderMarket')
      }).
      then((abi)=>{
        builder = getContract(abi, factory.getModule('Aira BuilderMarket'));
        return createModule([], builder)
      }).
      then((address)=>{
        setProgress(0, 2)
        setProgress(1, 1)
        new_contract = address
        return tx(core, 'setModule', ['Market', address, 'github://airalab/core/market/Market.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
				setProgress(1, 2)
        return loadAbiByName('Market')
      }).
      then((abi)=>{
				setProgress(2, 1)
        market = getContract(abi, new_contract);
        return tx(market, 'append', [coinbase(), core.getModule(params[0]), core.getModule(params[2]), params[1], params[3]])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
				setProgress(2, 2)
				setProgress(3, 1)
        return tx(market, 'append', [coinbase(), core.getModule(params[4]), core.getModule(params[6]), params[5], params[7]])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(3, 2)
        return {
          address: new_contract
        }
      })
  },
  7: function(setProgress, params) {
		var factory, core, builder, new_contract, market, coaching_addr
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return getCore()
      }).
      then((contract)=>{
        core = contract
        return loadAbiByName('BuilderDAOMarketRegulator')
      }).
      then((abi)=>{
        builder = getContract(abi, factory.getModule('Aira BuilderDAOMarketRegulator'));
        return createModule([core.getModule(params[0]), core.address(), core.getModule('Market'), core.getModule(params[1])], builder)
      }).
      then((address)=>{
        setProgress(0, 2)
        setProgress(1, 1)
        new_contract = address
        return tx(core, 'setModule', ['Market regulator', address, 'github://airalab/core/market/DAOMarketRegulator.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
				setProgress(1, 2)
        return loadAbiByName('Market')
      }).
      then((abi)=>{
				setProgress(2, 1)
        market = getContract(abi, new_contract);
        return tx(market, 'setRegulator', [true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
				setProgress(2, 2)
				setProgress(3, 1)
        return tx(market, 'delegate', [new_contract])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
				setProgress(3, 2)
        return loadAbiByName('BuilderTokenEmission')
      }).
      then((abi)=>{
				setProgress(4, 1)
        builder = getContract(abi, factory.getModule('Aira BuilderTokenEmission'));
        return createModule([params[2], params[3], params[4], params[5]], builder)
      }).
      then((address)=>{
        setProgress(4, 2)
        setProgress(5, 1)
				coaching_addr = address
        return tx(core, 'setModule', ['Сoaching token', address, 'github://airalab/core/token/TokenEmission.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
				setProgress(5, 2)
        return loadAbiByName('MarketRegulator')
      }).
			then((abi)=>{
				setProgress(6, 1)
        var marketRegulator = getContract(abi, new_contract);
				return tx(marketRegulator, 'sale', [coaching_addr, params[6], params[7]])
			}).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(6, 2)
        return {
          address: new_contract
        }
      })
  },
  8: function(setProgress, params) {
		var marketAgentSign = function(marketRegulator) {
			return new Promise(function(resolve, reject) {
				marketRegulator.MarketAgentSign({}, '', function(error, result){
					if (error) {
						reject(error);
					}
					resolve(result.args.agent);
				})
			});
		}
		var core, new_contract
    return getCore().
      then((contract)=>{
        core = contract
        return loadAbiByName('MarketRegulator')
      }).
			then((abi)=>{
				setProgress(6, 1)
        var marketRegulator = getContract(abi, params[0]);
				tx(marketRegulator, 'sign', [])
				return marketAgentSign(marketRegulator)
			}).
      then((address)=>{
        setProgress(0, 2)
        setProgress(1, 1)
        new_contract = address
        return tx(core, 'setModule', ['Market agent', address, 'github://airalab/core/market/DAOMarketAgent.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(3, 2)
        return {
          address: new_contract
        }
      })
  },
  9: function(setProgress, params) {
		var factory, core, builder, new_contract
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return getCore()
      }).
      then((contract)=>{
        core = contract
        return loadAbiByName('BuilderMarketRuleConstant')
      }).
      then((abi)=>{
        builder = getContract(abi, factory.getModule('Aira BuilderMarketRuleConstant'));
        return createModule([params[0]], builder)
      }).
      then((address)=>{
        setProgress(0, 2)
        setProgress(1, 1)
        new_contract = address
        return tx(core, 'setModule', ['Market rule constant', address, 'github://airalab/core/market/MarketRuleConstant.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
				setProgress(1, 2)
        return loadAbiByName('TokenEmission')
      }).
      then((abi)=>{
				setProgress(2, 1)
        var shares = getContract(abi, core.getModule(params[1]));
        return tx(shares, 'approve', [core.getModule('Market regulator'), params[2]])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
				setProgress(2, 2)
        return loadAbiByName('MarketRegulator')
      }).
      then((abi)=>{
				setProgress(3, 1)
        var marketRegulator = getContract(abi, core.getModule('Market regulator'));
        return tx(marketRegulator, 'pollUp', [core.getModule(params[3]), new_contract, 1])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
				setProgress(3, 2)
        return loadAbiByName('MarketRegulator')
      }).
      then((abi)=>{
				setProgress(4, 1)
        var credits = getContract(abi, core.getModule(params[3]));
        return tx(credits, 'delegate', [new_contract])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(4, 2)
        return {
          address: new_contract
        }
      })
  },
  10: function(setProgress) {
		var factory, core, builder, marketRegulator, assset1_addr, assset2_addr, service1_addr, service2_addr
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return getCore()
      }).
      then((contract)=>{
        core = contract
        return tx(core, 'setModule', ['Token emission builder', factory.getModule('Aira BuilderTokenEmission'), 'github://airalab/core/builder/BuilderTokenEmission.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
        setProgress(0, 2)
        return loadAbiByName('BuilderTokenEmission')
      }).
      then((abi)=>{
        setProgress(1, 1)
        builder = getContract(abi, core.getModule('Token emission builder'));
        return createModule(['Assset 1', 'A1', 0, 100], builder)
      }).
      then((address)=>{
        setProgress(1, 2)
        setProgress(2, 1)
				assset1_addr = address
				return tx(core, 'setModule', ['Assset 1 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(2, 2)
        setProgress(3, 1)
        return createModule(['Assset 2', 'A2', 0, 100], builder)
      }).
      then((address)=>{
        setProgress(3, 2)
        setProgress(4, 1)
				assset2_addr = address
				return tx(core, 'setModule', ['Assset 2 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(4, 2)
        setProgress(5, 1)
        return createModule(['Service 1', 'S1', 0, 100], builder)
      }).
      then((address)=>{
        setProgress(5, 2)
        setProgress(6, 1)
				service1_addr = address
				return tx(core, 'setModule', ['Service 1 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(6, 2)
        setProgress(7, 1)
        return createModule(['Service 2', 'S2', 0, 100], builder)
      }).
      then((address)=>{
        setProgress(7, 2)
        setProgress(8, 1)
				service2_addr = address
				return tx(core, 'setModule', ['Service 2 token', address, 'github://airalab/core/token/TokenEmission.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
        setProgress(8, 2)
        return loadAbiByName('MarketRegulator')
      }).
      then((abi)=>{
        setProgress(9, 1)
        marketRegulator = getContract(abi, core.getModule('Market regulator'));
        return tx(marketRegulator, 'sale', [assset1_addr, 1, 2])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(9, 2)
        setProgress(10, 1)
        return tx(marketRegulator, 'buy', [assset2_addr, 2, 1])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(10, 2)
        setProgress(11, 1)
        return tx(marketRegulator, 'sale', [service1_addr, 1, 5])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(11, 2)
        setProgress(12, 1)
        return tx(marketRegulator, 'buy', [service2_addr, 4, 2])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(12, 2)
        return {
        }
      })
  },
  11: function(setProgress, params) {
		var factory, core, builder, bod_address, bod, voting_address, voting_token, voting
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return getCore()
      }).
      then((contract)=>{
        core = contract
        return loadAbiByName('BuilderBoardOfDirectors')
      }).
      then((abi)=>{
        builder = getContract(abi, factory.getModule('Aira BuilderBoardOfDirectors'));
        return createModule([core.address(), core.getModule(params[0]), core.getModule(params[1])], builder)
      }).
      then((address)=>{
        setProgress(0, 2)
        setProgress(1, 1)
        bod_address = address
        return tx(core, 'setModule', ['Board of Directors', address, 'github://airalab/core/cashflow/BoardOfDirectors.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
        setProgress(1, 2)
        return loadAbiByName('BuilderTokenEmission')
      }).
      then((abi)=>{
        setProgress(2, 1)
        builder = getContract(abi, core.getModule('Token emission builder'));
        return createModule([params[2], params[3], params[4], params[5]], builder)
      }).
      then((address)=>{
        setProgress(2, 2)
				setProgress(3, 1)
        voting_address = address
        return tx(core, 'setModule', ['Voting token', address, 'github://airalab/core/token/TokenEmission.sol', true])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
        setProgress(3, 2)
        return loadAbiByName('TokenEmission')
      }).
      then((abi)=>{
        setProgress(4, 1)
        voting_token = getContract(abi, voting_address);
        return tx(voting_token, 'transfer', [params[6], 10])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(4, 2)
				setProgress(5, 1)
        return tx(voting_token, 'transfer', [params[7], 10])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
        setProgress(5, 2)
        return loadAbiByName('BoardOfDirectors')
      }).
      then((abi)=>{
        setProgress(6, 1)
        bod = getContract(abi, bod_address);
        return tx(bod, 'pollUp', [voting_address, 1])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(6, 2)
				setProgress(7, 1)
        return tx(bod, 'fund', [coinbase(), 1, params[8], 1467968200, 1467971988])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
        setProgress(7, 2)
        return loadAbiByName('TokenEther')
      }).
      then((abi)=>{
        setProgress(8, 1)
        var ether_credits = getContract(abi, core.getModule('Ether funds'));
        return tx(ether_credits, 'transfer', [bod_address, params[9]])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(8, 2)
				setProgress(9, 1)
        return tx(voting_token, 'approve', [bod.voting(), params[10]])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(9, 2)
				setProgress(10, 1)
        return tx(voting_token, 'approve', [bod.voting(), params[10]])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
			then(()=>{
        setProgress(10, 2)
        return loadAbiByName('Voting')
      }).
      then((abi)=>{
        setProgress(11, 1)
        voting = getContract(abi, bod.voting());
        return tx(voting, 'vote', [params[10]], {from:params[6]})
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(11, 2)
				setProgress(12, 1)
        return tx(voting, 'vote', [params[10]], {from:params[7]})
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(12, 2)
        return {
          address: bod_address
        }
      })
  },
  12: function(setProgress, params) {
		var factory, core, builder, new_contract
    return loadAbiByName('Core').
      then((abi)=>{
        factory = getContract(abi, factory_address);
        return getCore()
      }).
      then((contract)=>{
        core = contract
        return loadAbiByName('BuilderCrowdSale')
      }).
      then((abi)=>{
        builder = getContract(abi, factory.getModule('Aira BuilderCrowdSale'));
        return createModule([coinbase(), core.getModule(params[0]), core.getModule(params[1]), 1467972466, 3600, params[2], params[2], 3600, params[3], params[3]], builder)
      }).
      then((address)=>{
        setProgress(0, 2)
        setProgress(1, 1)
        new_contract = address
        return loadAbiByName('TokenEmission')
      }).
      then((abi)=>{
				setProgress(2, 1)
        var credits = getContract(abi, core.getModule(params[1]));
        return tx(credits, 'transfer', [new_contract, params[3]])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        return loadAbiByName('TokenEther')
      }).
      then((abi)=>{
				setProgress(2, 1)
        var ether_credits = getContract(abi, core.getModule(params[0]));
        return tx(ether_credits, 'approve', [new_contract, params[3]])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        return loadAbiByName('CrowdSale')
      }).
      then((abi)=>{
				setProgress(2, 1)
        var crowdSale = getContract(abi, new_contract);
        return tx(crowdSale, 'deal', [])
      }).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      }).
      then(()=>{
        setProgress(4, 2)
        return {
          address: new_contract
        }
      })
  }
}

export const lessonsCheck = {
  getAbi: function(lessonName) {
    const abis = {
      Lesson_1: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_dao','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_2: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_dao','type':'address'},{'name':'_shares_name','type':'string'}],'name':'execute','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_3: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_token','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_4: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_shareSale','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_5: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'constant':false,'inputs':[{'name':'_token_name','type':'string'},{'name':'_dao','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_6: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_market','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_7: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'constant':false,'inputs':[{'name':'_market','type':'address'},{'name':'_regulator','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_8: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'constant':false,'inputs':[{'name':'_market','type':'address'},{'name':'_agent','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_9: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'constant':false,'inputs':[{'name':'_regulator','type':'address'},{'name':'_asset','type':'address'},{'name':'_rule','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_10: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_market','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_11: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_bod','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}],
      Lesson_12: [{'constant':false,'inputs':[{'name':'_air','type':'address'}],'name':'setToken','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'reward','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'air','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':false,'inputs':[{'name':'_reward','type':'uint256'}],'name':'setReward','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_crowdSale','type':'address'}],'name':'execute','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'isPassed','outputs':[{'name':'','type':'bool'}],'type':'function'},{'inputs':[{'name':'_air','type':'address'},{'name':'_reward','type':'uint256'}],'type':'constructor'}]
    }
    return abis[lessonName]
  },
  execute: function(lesson, args) {
    return tx(lesson, 'execute', args).
      then((tx)=>{
        return blockchain.subscribeTx(tx)
      })
  },
  run: function(lessonName, params) {
    var learning_center, lesson
    return loadAbiByName('Core').
      then((abi)=>{
        learning_center = getContract(abi, learning_center_address);
        return this.getAbi(lessonName)
      }).
      then((abi)=>{
        lesson = getContract(abi, learning_center.getModule(lessonName));
        return this.execute(lesson, params)
      }).
      then(()=>{
        return lesson.isPassed(coinbase())
      })
  },
  1: function(params) {
    return this.run('Lesson_1', params)
  },
  2: function(params) {
    return this.run('Lesson_2', params)
  },
  3: function(params) {
    return loadAbiByName('Core').
      then((abi)=>{
        var core = getContract(abi, params[0]);
        return this.run('Lesson_3', [core.getModule(params[1])])
      })
  },
  4: function(params) {
    return this.run('Lesson_4', params)
  },
  5: function(params) {
    return this.run('Lesson_5', [params[1], params[0]])
  },
  6: function(params) {
		return loadAbiByName('Core').
      then((abi)=>{
        var core = getContract(abi, params[0]);
        return this.run('Lesson_6', [core.getModule('Market')])
      })
  },
  7: function(params) {
    return this.run('Lesson_7', params)
  },
  8: function(params) {
		return loadAbiByName('Core').
      then((abi)=>{
        var core = getContract(abi, params[0]);
        return this.run('Lesson_8', [core.getModule('Market'), core.getModule('Market agent')])
      })
  },
  9: function(params) {
		return loadAbiByName('Core').
      then((abi)=>{
        var core = getContract(abi, params[0]);
        return this.run('Lesson_9', [core.getModule('Market regulator'), core.getModule(params[1]), core.getModule('Market rule constant')])
      })
  },
  10: function(params) {
		return loadAbiByName('Core').
      then((abi)=>{
        var core = getContract(abi, params[0]);
        return this.run('Lesson_10', [core.getModule('Market')])
      })
  },
  11: function(params) {
		return loadAbiByName('Core').
      then((abi)=>{
        var core = getContract(abi, params[0]);
        return this.run('Lesson_11', [core.getModule('Board of Directors')])
      })
  },
  12: function(params) {
    return this.run('Lesson_12', params)
  }
}

export function getCore() {
  var factory, coreAbi
  return loadAbiByName('Core').
    then((abi)=>{
      coreAbi = abi
      factory = getContract(abi, factory_address);
      return loadAbiByName('BuilderDAO')
    }).
    then((abi)=>{
      var builder = getContract(abi, factory.getModule('Aira BuilderDAO'));
      return getContract(coreAbi, builder.getLastContract());
    })
}

export function getCoreAddress() {
  var factory
  return loadAbiByName('Core').
    then((abi)=>{
      factory = getContract(abi, factory_address);
      return loadAbiByName('BuilderDAO')
    }).
    then((abi)=>{
      var builder = getContract(abi, factory.getModule('Aira BuilderDAO'));
      return builder.getLastContract();
    })
}

export function getAirBalance() {
  var tokenair_abi = [{'constant':true,'inputs':[],'name':'name','outputs':[{'name':'','type':'string'}],'type':'function'},{'constant':false,'inputs':[{'name':'_address','type':'address'},{'name':'_value','type':'uint256'}],'name':'approve','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'getBalance','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'totalSupply','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[{'name':'_from','type':'address'},{'name':'_to','type':'address'},{'name':'_value','type':'uint256'}],'name':'transferFrom','outputs':[{'name':'','type':'bool'}],'type':'function'},{'constant':true,'inputs':[],'name':'decimals','outputs':[{'name':'','type':'uint8'}],'type':'function'},{'constant':false,'inputs':[{'name':'_value','type':'uint256'}],'name':'burn','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_value','type':'uint256'}],'name':'emission','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_owner','type':'address'}],'name':'delegate','outputs':[],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'balanceOf','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'type':'function'},{'constant':true,'inputs':[],'name':'symbol','outputs':[{'name':'','type':'string'}],'type':'function'},{'constant':false,'inputs':[{'name':'_to','type':'address'},{'name':'_value','type':'uint256'}],'name':'transfer','outputs':[{'name':'','type':'bool'}],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'},{'name':'','type':'address'}],'name':'allowance','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[{'name':'_address','type':'address'}],'name':'getBalance','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[{'name':'_address','type':'address'}],'name':'unapprove','outputs':[],'type':'function'},{'inputs':[{'name':'_name','type':'string'},{'name':'_symbol','type':'string'},{'name':'_decimals','type':'uint8'},{'name':'_start_count','type':'uint256'}],'type':'constructor'},{'anonymous':false,'inputs':[{'indexed':true,'name':'_from','type':'address'},{'indexed':true,'name':'_to','type':'address'},{'indexed':false,'name':'_value','type':'uint256'}],'name':'Transfer','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'_owner','type':'address'},{'indexed':true,'name':'_spender','type':'address'},{'indexed':false,'name':'_value','type':'uint256'}],'name':'Approval','type':'event'}];

  return loadAbiByName('Core').
    then((abi)=>{
      var learning_center = getContract(abi, learning_center_address);
      var tokenair = getContract(tokenair_abi, learning_center.getModule('Air token'));
      return tokenair.getBalance()
    })
}

export function isPassed(number) {
  var learning_center
  var lessonName = 'Lesson_'+ number
  return loadAbiByName('Core').
    then((abi)=>{
      learning_center = getContract(abi, learning_center_address);
      return lessonsCheck.getAbi(lessonName)
    }).
    then((abi)=>{
      var lesson = getContract(abi, learning_center.getModule(lessonName));
      return lesson.isPassed(coinbase())
    })
}
