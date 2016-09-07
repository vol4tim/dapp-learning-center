var Promise = require('es6-promise').Promise;
var _ = require('lodash')

export default class Blockchain {
  subscribes = []
  web3 = false
    constructor(web3) {
    this.web3 = web3
    if (this.web3) {
      this.observeLatestBlocks()
    }
    }
  observeLatestBlocks() {
    var self = this
    this.web3.eth.filter('latest').watch(function(e, hash){
      if (!e) {
        var blockInfo = self.web3.eth.getBlock(hash);
        _.forEach(self.subscribes, function(item) {
          if (_.isFunction(item)) {
            item(blockInfo)
          } else {
            if (_.findIndex(blockInfo.transactions, (i)=>i==item.tx) >= 0) {
              var transaction = self.web3.eth.getTransaction(item.tx)
              if (transaction) {
                item.cb(transaction)
                self.removeSubscribeTx(item.tx)
              }
            }
          }
        })
      }
    });
  }
  observeBlock() {
    var self = this
    return new Promise(function(resolve) {
      self.setSubscribe(function() {
        resolve()
      });
    });
  }
    setSubscribe(cb) {
        this.subscribes.push(cb)
    }
  subscribeTx(tx) {
    var self = this
    return new Promise(function(resolve) {
      // console.log(self);
      // setTimeout(()=>{
      //   resolve(tx)
      // }, 8000)
      self.setSubscribe({
        tx: tx,
        cb: function(tx) {
          resolve(tx)
        }
      });
    });
  }
    removeSubscribeTx(tx) {
    _.remove(this.subscribes, function(f) {
      return !_.isFunction(f) && f.tx == tx;
    });
    }
}

// const blockchain = new Blockchain(getWeb3())

// blockchain.subscribeTx('0x111111').
//   then((tx)=>{
//     console.log('tx', tx);
//   }).
//   catch(function(e) {
//     console.log(e);
//   });
//
// blockchain.setSubscribe(()=>{
//   console.log('update 1');
// })
//
// blockchain.setSubscribe(()=>{
//   console.log('update 2');
// })
