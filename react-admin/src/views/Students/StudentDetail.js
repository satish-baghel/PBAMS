import React, { useEffect, useState } from 'react'
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import { userDetail, userCertificate } from '../../actions/authAction'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import Moment from 'react-moment'

const StudentDetail = (props) => {
  const { id } = useParams()
  const { userDetail, userCertificate } = props
  //
  const [userDetails, setUserDetails] = useState({})
  const [loadingData, setLoadingData] = useState(true)
  const [certificateData, setCertificateData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [certificateDetail, setCertificateDetail] = useState({})

  useEffect(() => {
    userDetail(id).then((res) => {
      setUserDetails(res.data.result[0])
      setLoadingData(false)
    })
    userCertificate(id).then((res) => {
      setCertificateData(res.data.result)
    })
  }, [id])

  const onClick = (data) => {
    setCertificateDetail(data)
    setShowModal(true)
  }
  return (
    <div className='animated fadeIn'>
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <i className='fa fa-user'></i>
              <strong>Student Detail</strong>
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <tbody>
                  {!loadingData ? (
                    <>
                      <tr>
                        <th>Full Name</th>
                        <td>
                          {userDetails.first_name} {userDetails.middle_name}{' '}
                          {userDetail.last_name}
                        </td>
                      </tr>
                      <tr>
                        <th>College Name</th>
                        <td>{userDetails.collegeData.title}</td>
                      </tr>
                      <tr>
                        <th>Joining Date </th>
                        <td>
                          <Moment format='MMM-YYYY'>
                            {userDetails.join_date}
                          </Moment>
                        </td>
                      </tr>
                      <tr>
                        <th>Role Type</th>
                        <td>
                          {userDetails.role === 2 ? 'Teacher' : 'Student'}
                        </td>
                      </tr>
                      <tr>
                        <th>Profile Image </th>
                        <td>
                          <img
                            src={userDetails.profilePic}
                            alt=''
                            width='60px'
                          />
                        </td>
                      </tr>
                    </>
                  ) : null}
                </tbody>
              </Table>
              <Row>
                <Col md={12}>
                  <h3>Certificate</h3>
                </Col>
                {certificateData.length > 0 ? (
                  certificateData.map((cert) => (
                    <Col md={4} sm={6} xs={12}>
                      <Card className='border-primary'>
                        <CardHeader>{cert.course_title}</CardHeader>
                        <CardBody>
                          <CardText>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit
                          </CardText>
                        </CardBody>
                        <CardFooter>
                          Preview Certificate
                          <div className='card-header-actions'>
                            <Button
                              onClick={() => onClick(cert)}
                              size={'sm'}
                              className='btn-brand btn-twitter'>
                              <i className='fa fa-eye '></i>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col md={12} sm={12} xs={12}>
                    <div className='text-center'>
                      <h4>No Certificate found</h4>
                    </div>
                  </Col>
                )}
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Modal isOpen={showModal}>
          <ModalHeader toggle={(e) => setShowModal(!showModal)}>
            {' '}
            Certificate
          </ModalHeader>
          <ModalBody>
            <div className='image-responsive'>
              <img src={certificateDetail.document} alt='' />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={(e) => setShowModal(!showModal)}>Close</Button>
          </ModalFooter>
        </Modal>
      </Row>
    </div>
  )
}

StudentDetail.propTypes = {}

export default connect(null, { userDetail, userCertificate })(StudentDetail)
