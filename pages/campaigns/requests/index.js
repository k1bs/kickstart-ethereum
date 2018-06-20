import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends Component {
  static async getInitialProps (props) {
    const { address } = props.query
    const campaign = Campaign(address)

    const approversCount = await campaign.methods.approversCount().call()

    const requestCount = await campaign.methods.getRequestsCount().call()

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((elem, index) => {
        return campaign.methods.requests(index).call()
      })
    )

    return { address, requests, requestCount, approversCount }
  }

  renderRows () {
    return this.props.requests.map((elem, index) => {
      return <RequestRow key={index} id={index} request={elem} address={this.props.address} approversCount={this.props.approversCount} />
    })
  }

  render () {
    const { Header, Row, HeaderCell, Body } = Table

    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
      </Layout>
    )
  }
}

export default RequestIndex
