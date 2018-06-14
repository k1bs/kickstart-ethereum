import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xad305f1D2d53A570a94984101D7b6CCB38B6dDA7'
)

export default instance
