import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import Layout from '../../components/Layout'

class CampaignNew extends Component {
  render () {
    return (
      <Layout>
        <h3>Create a New Campaign</h3>
        <Form>
          <Form.Field>
            <label>Minimum Contribution</label>
            <input type='text' />
          </Form.Field>
          <Button primary>Create</Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew
