import { FACTORY } from '../../../config/config'
import { loadAbiByName, getContract } from '../../../utils/web3'

export function getCore() {
  var factory, coreAbi
  return loadAbiByName('Core').
    then((abi)=>{
      coreAbi = abi
      factory = getContract(abi, FACTORY);
      return loadAbiByName('BuilderDAO')
    }).
    then((abi)=>{
      var builder = getContract(abi, factory.getModule('Aira BuilderDAO'));
      return getContract(coreAbi, builder.getLastContract());
    })
}
