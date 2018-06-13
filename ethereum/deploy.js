const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider('satisfy heart dynamic october unusual course floor reunion prosper fitness check valve',
  'https://rinkeby.infura.io/Sqqy9npQZf1GLGmbkeGW')

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({ data: compiledFactory.bytecode })
      .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)

  // DEPLOYED TO 0xad305f1D2d53A570a94984101D7b6CCB38B6dDA7
}

deploy()
