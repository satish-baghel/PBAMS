import React, { Component } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap'
import LaddaButton, { ZOOM_OUT } from 'react-ladda'
import 'ladda/dist/ladda-themeless.min.css'
import {
  checkEmailValidation,
  checkRequiredValidationWithMinMax,
} from '../../../Helpers/Validation'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Alert from '../../../component/Alert'
import { login } from '../../../actions/authAction'
import classnames from 'classnames'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {
        error_email: '',
        error_password: '',
      },
      loginLoading: false,
    }
  }
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  onSubmitForm = async (e) => {
    e.preventDefault()
    let { email, password, errors } = this.state
    let validationFlag = true
    let error

    error = checkEmailValidation(email, 'email', 1, 50)
    if (error) {
      validationFlag = false
      errors.error_email = error
    }
    error = checkRequiredValidationWithMinMax(password, 'password', 1, 25)
    if (error) {
      validationFlag = false
      errors.error_password = error
    }

    if (validationFlag === true) {
      this.setState({
        loginLoading: true,
      })
      await this.props.login({ email, password }).then((res) => {
        this.setState({
          loginLoading: false,
        })
      })
    } else {
      this.setState({
        errors: errors,
      })
    }
  }
  render() {
    const { email, password, errors, loginLoading } = this.state
    const { isAuthenticated, loading, admin } = this.props.auth

    if (isAuthenticated === true && loading === false && admin?.role) {
      if (admin.role === 1) {
        return <Redirect to='/teacher' />
      }
      if (admin.role === 2) {
        return <Redirect to='/teacher/student' />
      }
      if (admin.role === 3) {
        return <Redirect to='/certificate' />
      }
    }
    return (
      <div className='app flex-row align-items-center'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='8'>
              <CardGroup>
                <Card className='p-4'>
                  <CardBody>
                    <Alert />
                    <Form onSubmit={this.onSubmitForm}>
                      <h1>Login</h1>
                      <p className='text-muted'>Sign In to your account</p>
                      <InputGroup className='mb-3'>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='icon-user'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type='text'
                          placeholder='Email'
                          name='email'
                          value={email}
                          onChange={(e) => this.onInputChange(e)}
                          className={classnames(
                            { input: true },
                            {
                              'is-invalid': errors.error_email.length > 0,
                            }
                          )}
                        />
                        {errors.error_email ? (
                          <em
                            id='email-error'
                            className='error invalid-feedback'>
                            {errors.error_email}
                          </em>
                        ) : null}
                      </InputGroup>

                      <InputGroup className='mb-4'>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='icon-lock'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type='password'
                          placeholder='Password'
                          name='password'
                          value={password}
                          onChange={(e) => this.onInputChange(e)}
                          className={classnames(
                            { input: true },
                            {
                              'is-invalid': errors.error_password.length > 0,
                            }
                          )}
                        />
                        {errors.error_password ? (
                          <em
                            id='email-error'
                            className='error invalid-feedback'>
                            {errors.error_password}
                          </em>
                        ) : null}
                      </InputGroup>
                      <Row>
                        <Col xs='6'>
                          <LaddaButton
                            className='btn btnColor px-4 btn-ladda'
                            loading={loginLoading}
                            data-color='blue'
                            data-style={ZOOM_OUT}>
                            Login
                          </LaddaButton>
                        </Col>
                        {/* <Col xs='6' className='text-right'>
                          <Link
                            to='forgot-password'
                            color='link'
                            className='px-0'>
                            Forgot password?
                          </Link>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className='text-white bg-primary py-5 d-md-down-none'
                  style={{ width: 44 + '%' }}>
                  <CardBody className='text-center'>
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to='register'>
                        <Button color='primary' className='mt-3' active>
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {
  login,
})(Login)
