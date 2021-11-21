import PropTypes from 'prop-types'
import { emailVerify } from '../../../actions/emailAction'
import { connect } from 'react-redux'
import queryString from 'query-string'

import React, { Component } from 'react'
import { Card, Col, Container, Row } from 'reactstrap'

class Index extends Component {
  componentDidMount() {
    let queries = queryString.parse(this.props.location.search)

    if (queries.token) {
      this.props
        .emailVerify(queries.token)
        .then((res) => {
          this.props.history.push('/login')
          // return <Redirect to='/login' />
        })
        .catch((err) => {})
    }
  }

  render() {
    return (
      <div className='animated fadeIn'>
        <Container>
          <Row
            className='d-flex  justify-content-center'
            style={{ marginTop: '40vh' }}>
            <Col md='6'>
              <Card
                body
                style={{ width: '100%', height: '200px' }}
                className='d-flex  justify-content-center align-items-center'>
                <h3>Please Verify you email</h3>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default connect(null, { emailVerify })(Index)
