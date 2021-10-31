import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Input,
} from 'reactstrap'
import LaddaButton, { ZOOM_OUT } from 'react-ladda'
import 'ladda/dist/ladda-themeless.min.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import { collegeData } from '../../../data/collegeData/data'

const Register = (props) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [type, setType] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    setTimeout(() => {
      setSubmitLoading(false)
    }, 1500)
  }
  return (
    <div className='app flex-row align-items-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col md='8'>
            <Card className='mx-4'>
              <CardBody className='p-4'>
                <Form onSubmit={onSubmit}>
                  <h1>Register</h1>
                  <p className='text-muted'>Create your account</p>
                  <Row>
                    <Col md='4' sm='6'>
                      <FormGroup>
                        <label htmlFor='fname'>First Name</label>
                        <Input
                          type='text'
                          placeholder='Enter first name'
                          id='fname'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='4' sm='6'>
                      <FormGroup>
                        <label htmlFor='mname'>Middle Name</label>
                        <Input
                          type='text'
                          placeholder='Enter middle name'
                          id='mname'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='4' sm='6'>
                      <FormGroup>
                        <label htmlFor='lname'>Last Name</label>
                        <Input
                          type='text'
                          placeholder='Enter last name'
                          id='lname'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6' sm='6'>
                      <FormGroup>
                        <label htmlFor='email'>Email</label>
                        <Input
                          type='email'
                          placeholder='Enter email'
                          id='email'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6' sm='6'>
                      <FormGroup>
                        <label htmlFor='password'>Password</label>
                        <Input
                          type='password'
                          placeholder='Enter password'
                          id='password'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='12' sm='6'>
                      <FormGroup>
                        <label htmlFor='type'>Type</label>
                        <Input
                          type='select'
                          name='select'
                          id='type'
                          onChange={(e) => setType(e.target.value)}
                          value={type}>
                          <option value={''}>Select type</option>
                          <option value={1}>Student</option>
                          <option value={2}>Teacher</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    {type === '2' && (
                      <Col md='12' sm='12'>
                        <fieldset className='scheduler-border'>
                          <legend className='scheduler-border'>Teacher</legend>
                          <Row>
                            <Col md='6' sm='6'>
                              <FormGroup>
                                <label htmlFor='department'>Department</label>
                                {/* <Input type="text" placeholder=''></Input> */}
                                <Select options={collegeData} />
                              </FormGroup>
                            </Col>
                            <Col md='6' sm='6'>
                              <FormGroup>
                                <label htmlFor='date'>Joining Date</label>
                                <DatePicker
                                  id='date'
                                  className='form-control'
                                  selected={startDate}
                                  dateFormat='MM/yyyy'
                                  showMonthYearPicker
                                  onChange={(date) => setStartDate(date)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </fieldset>
                      </Col>
                    )}
                    {type === '1' && (
                      <Col md='12' sm='12'>
                        <fieldset className='scheduler-border'>
                          <legend className='scheduler-border'>Student</legend>
                          <Row>
                            <Col md='6' sm='6'>
                              <FormGroup>
                                <label htmlFor='department'>College</label>

                                <Select options={collegeData} />
                              </FormGroup>
                            </Col>
                            <Col md='6' sm='6'>
                              <FormGroup>
                                <label htmlFor='date'>Admission Date</label>
                                <DatePicker
                                  id='date'
                                  className='form-control'
                                  selected={startDate}
                                  dateFormat='MM/yyyy'
                                  showMonthYearPicker
                                  onChange={(date) => setStartDate(date)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </fieldset>
                      </Col>
                    )}
                  </Row>
                  <LaddaButton
                    className='btn btnColor px-4 btn-ladda btn-block'
                    loading={submitLoading}
                    data-color='blue'
                    data-style={ZOOM_OUT}>
                    Create Account
                  </LaddaButton>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

Register.propTypes = {}

export default Register
