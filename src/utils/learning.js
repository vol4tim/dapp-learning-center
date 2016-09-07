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
    return {
      params
    }
  },
  6: function(setProgress, params) {
    return {
      params
    }
  },
  7: function(setProgress, params) {
    return {
      params
    }
  },
  8: function(setProgress, params) {
    return {
      params
    }
  },
  9: function(setProgress, params) {
    return {
      params
    }
  },
  10: function(setProgress, params) {
    return {
      params
    }
  },
  11: function(setProgress, params) {
    return {
      params
    }
  },
  12: function(setProgress, params) {
    return {
      params
    }
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
    console.log('args',args);
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
    return this.run('Lesson_5', params)
  },
  6: function(params) {
    return this.run('Lesson_6', params)
  },
  7: function(params) {
    return this.run('Lesson_7', params)
  },
  8: function(params) {
    return this.run('Lesson_8', params)
  },
  9: function(params) {
    return this.run('Lesson_9', params)
  },
  10: function(params) {
    return this.run('Lesson_10', params)
  },
  11: function(params) {
    return this.run('Lesson_11', params)
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
