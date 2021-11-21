import React, { useEffect, useState } from 'react'
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
// import { collegeData } from '../../../data/collegeData/data'
import { collegeDropDown } from '../../../actions/collegeAction'
import { connect } from 'react-redux'
import FormHooks from '../../../Hooks/FormHook'
import classNames from 'classnames'
import { register } from '../../../actions/authAction'
import { format } from 'date-fns'
import { useHistory } from 'react-router-dom'

const Register = (props) => {
  //
  const history = useHistory()
  const [
    valuesObj,
    InputChange,
    OnSubmit,
    setDefaultValue,
    InputError,
    DefaultError,
  ] = FormHooks({
    first_name: {
      rule: 'required|max:55',
      field: 'First Name',
    },
    middle_name: {
      rule: 'required|max:55',
      field: 'Middle Name',
    },
    last_name: {
      rule: 'required|max:55',
      field: 'Last Name',
    },
    email: {
      rule: 'required|email',
      field: 'Email',
    },
    password: {
      rule: 'required|min:4|max:15',
      field: 'Password',
    },
    role: {
      rule: 'required',
      field: 'Role',
    },
  })

  //
  const { collegeDropDown } = props
  const [submitLoading, setSubmitLoading] = useState(false)

  const [startDate, setStartDate] = useState(new Date())
  const [collegeList, setCollegeList] = useState([])
  const [college, setCollege] = useState('')
  // const [error_date, setError_date] = useState('')
  const [error_college, setError_college] = useState('')

  //
  useEffect(() => {
    collegeDropDown().then((res) => {
      let result = res.data.result.map((s) => {
        return {
          value: s._id,
          label: s.title,
        }
      })
      setCollegeList(result)
    })
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const validationFlag = await OnSubmit()
    let validation = true
    if (!college) {
      validation = false
      setError_college('Please select college')
    } else {
      setError_college('')
    }
    if (validationFlag && validation) {
      setSubmitLoading(true)
      valuesObj.college = college
      valuesObj.join_date = format(new Date(startDate), 'yyy-MM-dd')
      props.register(valuesObj).then((res) => {
        setSubmitLoading(false)
        history.push('/email-verify')
      })
      // setSubmitLoading(true)
      // setTimeout(() => {
      //   setSubmitLoading(false)
      // }, 1500)
    }
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
                          name='first_name'
                          onChange={InputChange}
                          value={
                            valuesObj.first_name ? valuesObj.first_name : ''
                          }
                          className={classNames({
                            'is-invalid': InputError.first_name,
                          })}
                        />
                        {InputError.first_name &&
                        InputError.first_name.length > 0 ? (
                          <div className='invalid-feedback capital'>
                            <em>{InputError.first_name}</em>
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md='4' sm='6'>
                      <FormGroup>
                        <label htmlFor='mname'>Middle Name</label>
                        <Input
                          type='text'
                          placeholder='Enter middle name'
                          id='mname'
                          name='middle_name'
                          onChange={InputChange}
                          value={
                            valuesObj.middle_name ? valuesObj.middle_name : ''
                          }
                          className={classNames({
                            'is-invalid': InputError.middle_name,
                          })}
                        />
                        {InputError.middle_name &&
                        InputError.middle_name.length > 0 ? (
                          <div className='invalid-feedback capital'>
                            <em>{InputError.middle_name}</em>
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md='4' sm='6'>
                      <FormGroup>
                        <label htmlFor='lname'>Last Name</label>
                        <Input
                          type='text'
                          placeholder='Enter last name'
                          id='lname'
                          name='last_name'
                          onChange={InputChange}
                          value={valuesObj.last_name ? valuesObj.last_name : ''}
                          className={classNames({
                            'is-invalid': InputError.last_name,
                          })}
                        />
                        {InputError.last_name &&
                        InputError.last_name.length > 0 ? (
                          <div className='invalid-feedback capital'>
                            <em>{InputError.last_name}</em>
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md='6' sm='6'>
                      <FormGroup>
                        <label htmlFor='email'>Email</label>
                        <Input
                          type='email'
                          placeholder='Enter email'
                          id='email'
                          name='email'
                          onChange={InputChange}
                          value={valuesObj.email ? valuesObj.email : ''}
                          className={classNames({
                            'is-invalid': InputError.email,
                          })}
                        />
                        {InputError.email && InputError.email.length > 0 ? (
                          <div className='invalid-feedback capital'>
                            <em>{InputError.email}</em>
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md='6' sm='6'>
                      <FormGroup>
                        <label htmlFor='password'>Password</label>
                        <Input
                          type='password'
                          placeholder='Enter password'
                          id='password'
                          name='password'
                          onChange={InputChange}
                          value={valuesObj.password ? valuesObj.password : ''}
                          className={classNames({
                            'is-invalid': InputError.password,
                          })}
                        />
                        {InputError.password &&
                        InputError.password.length > 0 ? (
                          <div className='invalid-feedback capital'>
                            <em>{InputError.password}</em>
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md='12' sm='6'>
                      <FormGroup>
                        <label htmlFor='type'>Type</label>
                        <Input
                          type='select'
                          id='type'
                          name='role'
                          onChange={InputChange}
                          // value={type}
                          value={valuesObj.role ? valuesObj.role : ''}
                          className={classNames({
                            'is-invalid': InputError.role,
                          })}>
                          <option value={''}>Select type</option>
                          <option value={3}>Student</option>
                          <option value={2}>Teacher</option>
                        </Input>
                        {InputError.role && InputError.role.length > 0 ? (
                          <div className='invalid-feedback capital'>
                            <em>{InputError.role}</em>
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    {valuesObj.role === '2' && (
                      <Col md='12' sm='12'>
                        <fieldset className='scheduler-border'>
                          <legend className='scheduler-border'>Teacher</legend>
                          <Row>
                            <Col md='6' sm='6'>
                              <FormGroup>
                                <label htmlFor='department'>Department</label>

                                <Select
                                  options={collegeList}
                                  placeholder='Select college '
                                  onChange={(e) => setCollege(e.value)}
                                  className={classNames({
                                    'is-invalid': error_college,
                                  })}
                                />
                                {error_college.length > 0 ? (
                                  <div className='invalid-feedback capital'>
                                    <em>{error_college}</em>
                                  </div>
                                ) : null}
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
                    {valuesObj.role === '3' && (
                      <Col md='12' sm='12'>
                        <fieldset className='scheduler-border'>
                          <legend className='scheduler-border'>Student</legend>
                          <Row>
                            <Col md='6' sm='6'>
                              <FormGroup>
                                <label htmlFor='department'>Department</label>

                                <Select
                                  options={collegeList}
                                  placeholder='Select college '
                                  onChange={(e) => setCollege(e.value)}
                                  className={classNames({
                                    'is-invalid': error_college,
                                  })}
                                />
                                {error_college.length > 0 ? (
                                  <div className='invalid-feedback capital'>
                                    <em>{error_college}</em>
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md='6' sm='6'>
                              <FormGroup>
                                <label htmlFor='date'>Admission Date</label>
                                <DatePicker
                                  id='date'
                                  selected={startDate}
                                  dateFormat='MM/yyyy'
                                  showMonthYearPicker
                                  className='form-control'
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

export default connect(null, { collegeDropDown, register })(Register)
