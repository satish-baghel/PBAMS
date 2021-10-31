import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardBody,
  CardFooter,
  Table,
  CardHeader,
  Col,
  Row,
  CardText,
  Button,
} from 'reactstrap'

const ViewDetails = (props) => {
  return (
    <div className='animated fadeIn'>
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <i className='fa fa-user'></i>
              <strong>View</strong>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <tbody>
                  <tr>
                    <th>Full Name</th>
                    <td>Satish K. Baghel</td>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <td>MCA</td>
                  </tr>
                  <tr>
                    <th>Joining Date </th>
                    <td>July-21</td>
                  </tr>
                  <tr>
                    <th>Role Type</th>
                    <td>Student</td>
                  </tr>
                  <tr>
                    <th>Profile Image </th>
                    <td>
                      <img src='/assets/img/avatars/7.jpg' alt='' />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Row>
                <Col md={12}>
                  <h3>Certificate</h3>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <Card className='border-primary'>
                    <CardHeader>Certificate of ....</CardHeader>
                    <CardBody>
                      <CardText>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      Preview Certificate
                      <div className='card-header-actions'>
                        <Button size={'sm'} className='btn-brand btn-twitter'>
                          <i className='fa fa-eye '></i>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <Card className='border-primary'>
                    <CardHeader>Certificate of ....</CardHeader>
                    <CardBody>
                      <CardText>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      Preview Certificate
                      <div className='card-header-actions'>
                        <Button size={'sm'} className='btn-brand btn-twitter'>
                          <i className='fa fa-eye '></i>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <Card className='border-primary'>
                    <CardHeader>Certificate of ....</CardHeader>
                    <CardBody>
                      <CardText>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      Preview Certificate
                      <div className='card-header-actions'>
                        <Button size={'sm'} className='btn-brand btn-twitter'>
                          <i className='fa fa-eye '></i>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <Card className='border-primary'>
                    <CardHeader>Certificate of ....</CardHeader>
                    <CardBody>
                      <CardText>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      Preview Certificate
                      <div className='card-header-actions'>
                        <Button size={'sm'} className='btn-brand btn-twitter'>
                          <i className='fa fa-eye '></i>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <Card className='border-primary'>
                    <CardHeader>Certificate of ....</CardHeader>
                    <CardBody>
                      <CardText>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      Preview Certificate
                      <div className='card-header-actions'>
                        <Button size={'sm'} className='btn-brand btn-twitter'>
                          <i className='fa fa-eye '></i>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <Card className='border-primary'>
                    <CardHeader>Certificate of ....</CardHeader>
                    <CardBody>
                      <CardText>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      Preview Certificate
                      <div className='card-header-actions'>
                        <Button size={'sm'} className='btn-brand btn-twitter'>
                          <i className='fa fa-eye '></i>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <Card className='border-primary'>
                    <CardHeader>Certificate of ....</CardHeader>
                    <CardBody>
                      <CardText>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      Preview Certificate
                      <div className='card-header-actions'>
                        <Button size={'sm'} className='btn-brand btn-twitter'>
                          <i className='fa fa-eye '></i>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

ViewDetails.propTypes = {}

export default ViewDetails
