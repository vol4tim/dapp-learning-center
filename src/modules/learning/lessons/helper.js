import { FACTORY } from '../../../config/config'
import { coinbase, loadAbiByName, getContract } from '../../../utils/web3'

export function getCore() {
  let factory
  let coreAbi
  return loadAbiByName('Core')
    .then((abi) => {
      coreAbi = abi
      factory = getContract(abi, FACTORY);
      return loadAbiByName('BuilderDAO')
    })
    .then((abi) => {
      const builder = getContract(abi, factory.getModule('Aira BuilderDAO'));
      const address = builder.getLastContract({ from: coinbase() });
      if (address !== '0x0000000000000000000000000000000000000000' && address !== '0x') {
        return getContract(coreAbi, address);
      }
      return false
    })
}
