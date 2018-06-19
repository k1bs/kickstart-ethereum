import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'

class CampaignShow extends Component {
  static async getInitialProps (props) {
    const campaign = Campaign(props.query.address)

    const summary = await campaign.methods.getSummary().call()

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approverCount: summary[3],
      manager: summary[4]
    }
  }

  renderCards () {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approverCount
    } = this.props

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can create requests to withdraw funds.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to become an Approver.'
      },
      {
        header: requestCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw money from the contract. Requests must be approved by Approvers'
      },
      {
        header: approverCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have donated to this campaign and can approve Requests.'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'Spendable funds remaining in the Campaign.'
      }
    ]

    return <Card.Group items={items} />
  }

  render () {
    return (
      <Layout>
        <h3>Campaign Details</h3>
        {this.renderCards()}
      </Layout>
    )
  }
}

export default CampaignShow