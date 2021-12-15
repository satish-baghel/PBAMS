import React, { useEffect, useState } from 'react'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { AppSwitch } from '@coreui/react'

import FormHooks from '../../Hooks/FormHook'
import FileHooks from '../../Hooks/FileHook'
import classNames from 'classnames'
import { connect, useSelector } from 'react-redux'
import { getAllCollege, statusChangeCollege } from '../../actions/collegeAction'
import Loader from 'react-loader-spinner'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LaddaButton, { ZOOM_OUT } from 'react-ladda'
import 'ladda/dist/ladda-themeless.min.css'
import swal from 'sweetalert'
import {
  getAllCertificate,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from '../../actions/certificateAction'

const Index = (props) => {
  const [file, onChange, FilePreview, error, DefaultFileError, DefaultFile] =
    FileHooks({
      validation: ['png', 'JPEG', 'PNG', 'jpeg', 'jpg', 'JPG'],
      size: 10,
    })

  const [
    valuesObj,
    InputChange,
    OnSubmit,
    setDefaultValue,
    InputError,
    DefaultError,
  ] = FormHooks({
    title: {
      rule: 'required|max:55',
      field: 'Course',
    },
  })
  const [pageLength, setPageLength] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const certificate = useSelector((state) => state.certificate)
  const [search, setSearch] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  let { certificateList, loading } = certificate
  const [_id, set_id] = useState('')

  //

  useEffect(() => {
    props.getAllCertificate(1, pageLength, search)
  }, [pageLength, search])
  const collegeEdit = (data) => {
    defaultValue()
    set_id(data._id)
    setDefaultValue([{ title: data.course_title }])
    DefaultFile([data.document])
    setShowModal(true)
    DefaultError('')
    DefaultFileError('')
  }
  const defaultValue = () => {
    setDefaultValue([{ title: '' }])
    DefaultFile([''])
  }

  const collegeDelete = (data) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure? You are sure you want delete ${data.course_title}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        props.deleteCertificate(data._id).then((res) => {
          props.getAllCertificate(certificateList.page, pageLength, search)
          toast.success(res.data.message)
        })
      }
    })
  }
  //
  const submitForm = async () => {
    const validationFlag = await OnSubmit()
    if (validationFlag) {
      setSubmitLoading(true)
      let formData = new FormData()
      formData.append('course_title', valuesObj.title)
      for (let i = 0; i < file.length; i++) {
        formData.append('document', file[i])
      }

      if (!_id) {
        props
          .addCertificate(formData)
          .then((res) => {
            setSubmitLoading(false)
            setShowModal(!showModal)
            toast.success(res.data.message)
            props.getAllCertificate(certificateList.page, pageLength, search)

            defaultValue()
          })
          .catch((err) => {
            toast.error(err.response.data.message)

            setSubmitLoading(false)
            setShowModal(!showModal)
          })
      } else {
        props
          .updateCertificate(_id, formData)
          .then((res) => {
            setSubmitLoading(false)
            setShowModal(!showModal)
            toast.success(res.data.message)
            props.getAllCertificate(certificateList.page, pageLength, search)
            defaultValue()
          })
          .catch((err) => {
            toast.error(err.response.data.message)

            setSubmitLoading(false)
            setShowModal(!showModal)
          })
      }
    }
  }

  return (
    <div className='animated fadeIn'>
      <ToastContainer />
      <Row>
        <Col xs='12'>
          <Card>
            <CardHeader>
              <i className='fas fa-certificate'></i>
              <strong>Certificates</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md='6' sm={6} xs='12'>
                  <InlineTag>
                    <label htmlFor='pageLength'>Show</label>
                    <select
                      type='text'
                      name='pageLength'
                      id='pageLength'
                      value={pageLength}
                      onChange={(e) => setPageLength(e.target.value)}
                      className='form-control '>
                      <option value={10}>10 </option>
                      <option value={20}>20 </option>
                      <option value={50}>50 </option>
                      <option value={100}>100 </option>
                    </select>
                    <span>Entries </span>
                  </InlineTag>
                </Col>

                <Col md='6' sm={12} xs='12'>
                  <InlineTag displayed={true}>
                    <label htmlFor='search'>Search</label>
                    <Input
                      type='search'
                      placeholder='search here'
                      className='ml-1'
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </InlineTag>
                </Col>
                <Col md='12' sm={12} xs='12' className='text-right my-2'>
                  <Button
                    size='md'
                    color='primary'
                    className='btn-brand'
                    onClick={(e) => {
                      defaultValue()
                      set_id('')
                      setShowModal(true)
                    }}>
                    <i className='fas fa-add'></i> <span>Add</span>
                  </Button>
                </Col>
                <Col md='12'>
                  <Table hover striped responsive size='sm'>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Certificate</th>
                        <th>Certificate Name</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading && certificateList.docs.length > 0 ? (
                        certificateList.docs.map((certificate, i) => (
                          <tr key={i}>
                            <td>
                              {(certificateList.page - 1) * pageLength +
                                (i + 1)}
                            </td>
                            <td>
                              <img
                                src={certificate.document}
                                alt={certificate.course_title}
                                width='60px'
                              />
                            </td>
                            <td>{certificate.course_title}</td>

                            <td>
                              <Button
                                className='btn-brand btn-behance mr-1 '
                                onClick={() => collegeEdit(certificate)}>
                                <i className='fa fa-pencil'></i>
                              </Button>
                              <Button
                                className='btn-brand btn-youtube  '
                                onClick={() => collegeDelete(certificate)}>
                                <i className='fa fa-trash'></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : certificateList.docs.length === 0 ? (
                        <tr>
                          <td colSpan={'4'} className='text-center'>
                            No certificate found
                          </td>
                        </tr>
                      ) : (
                        loading && (
                          <tr>
                            <td colSpan='4' className='text-center'>
                              <Loader
                                type='Puff'
                                color='#00BFFF'
                                height={100}
                                width={100}
                                timeout={3000} //3 secs
                              />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                    <tfoot>
                      <th>No</th>
                      <th>Certificate</th>
                      <th>Certificate Name</th>
                      <th>Action</th>
                    </tfoot>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Modal isOpen={showModal}>
            <ModalHeader toggle={(e) => setShowModal(!showModal)}>
              {_id ? 'Edit certificate' : 'Add certificate'}
            </ModalHeader>
            <ModalBody>
              <label htmlFor='fname'>Course Name</label>
              <Input
                placeholder='Enter Course name'
                onChange={InputChange}
                name='title'
                value={valuesObj.title ? valuesObj.title : ''}
                className={classNames({
                  'is-invalid': InputError.title,
                })}
              />
              {InputError.title && InputError.title.length > 0 ? (
                <div className='invalid-feedback capital'>
                  <em>{InputError.title}</em>
                </div>
              ) : null}
              <label>Certificate</label>
              <Input type='file' onChange={onChange} />
              {FilePreview.map((image, i) => (
                <div style={{ width: '100px', marginRight: '10px' }} key={i}>
                  <img src={image} alt='' width='100%' />
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <LaddaButton
                className='btn btnColor px-4 btn-ladda'
                loading={submitLoading}
                data-color='blue'
                onClick={submitForm}
                data-style={ZOOM_OUT}>
                {_id ? 'Update' : 'Submit'}
              </LaddaButton>
              {/* <Button color='primary' onClick={submitForm}>
                {_id ? 'Update' : 'Submit'}
              </Button>{' '} */}
              <Button onClick={(e) => setShowModal(!showModal)}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </div>
  )
}

Index.propTypes = {}

export default connect(null, {
  getAllCertificate,
  addCertificate,
  updateCertificate,
  deleteCertificate,
})(Index)

const InlineTag = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  justify-content: ${(props) => props.displayed && 'flex-end'};
  input {
    width: ${(props) => props.displayed && '50%'};
  }
  @media (max-width: 786px) {
    justify-content: ${(props) => props.displayed && 'none'};

    input {
      width: ${(props) => props.displayed && '100%'};
    }
  }

  label {
    margin-bottom: 0px;
  }
  select {
    margin: 0px 4px;
    width: 75px;
  }

  @media (max-width: 575px) {
    display: flex;
    align-items: center;
    select {
      width: 100%;
    }
  }
`
