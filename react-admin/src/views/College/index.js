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
import classNames from 'classnames'
import { connect, useSelector } from 'react-redux'
import {
  addCollege,
  getAllCollege,
  statusChangeCollege,
  updateCollege,
} from '../../actions/collegeAction'
import Loader from 'react-loader-spinner'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LaddaButton, { ZOOM_OUT } from 'react-ladda'
import 'ladda/dist/ladda-themeless.min.css'
import swal from 'sweetalert'

const Index = (props) => {
  const [pageLength, setPageLength] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const college = useSelector((state) => state.college)
  const [search, setSearch] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  let { collegeList, loading } = college
  const [_id, set_id] = useState('')
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
      field: 'College Name',
    },
  })

  //

  useEffect(() => {
    props.getAllCollege(1, pageLength, search)
  }, [pageLength, search])
  const collegeEdit = (data) => {
    set_id(data._id)
    setDefaultValue([{ title: data.title }])
    setShowModal(true)
    DefaultError('')
  }
  const changeStatus = (data) => {
    let newObj = {
      flag: data.flag === 1 ? 2 : 1,
    }
    props.statusChangeCollege(data._id, newObj).then((res) => {
      props.getAllCollege(collegeList.page, pageLength, search)
      toast.success(res.data.message)
    })
  }
  const collegeDelete = (data) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure? You are sure you want delete ${data.title}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let newObj = {
          flag: 3,
        }
        props.statusChangeCollege(data._id, newObj).then((res) => {
          props.getAllCollege(collegeList.page, pageLength, search)
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

      if (!_id) {
        props.addCollege(valuesObj).then((res) => {
          setSubmitLoading(false)
          setShowModal(!showModal)
          toast.success(res.data.message)
          props.getAllCollege(collegeList.page, pageLength, search)
        })
      } else {
        props.updateCollege(_id, valuesObj).then((res) => {
          setSubmitLoading(false)
          setShowModal(!showModal)
          toast.success(res.data.message)
          props.getAllCollege(collegeList.page, pageLength, search)
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
              <i className='fa fa-university'></i>
              <strong>College</strong>
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
                    onClick={(e) => setShowModal(true)}>
                    <i className='fas fa-add'></i> <span>Add</span>
                  </Button>
                </Col>
                <Col md='12'>
                  <Table hover striped responsive size='sm'>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>College Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading && collegeList.docs.length > 0 ? (
                        collegeList.docs.map((college, i) => (
                          <tr key={i}>
                            <td>
                              {(collegeList.page - 1) * pageLength + (i + 1)}
                            </td>
                            <td>{college.title}</td>
                            <td>
                              <AppSwitch
                                className='d-block mt-1'
                                variant='3d'
                                color='primary'
                                name='status'
                                checked={college.flag === 1 ? true : false}
                                label
                                dataOn={'\u2715'}
                                dataOff={'\u2713'}
                                onClick={() => changeStatus(college)}
                              />
                            </td>
                            <td>
                              <Button
                                className='btn-brand btn-behance mr-1 '
                                onClick={() => collegeEdit(college)}>
                                <i className='fa fa-pencil'></i>
                              </Button>
                              <Button
                                className='btn-brand btn-youtube  '
                                onClick={() => collegeDelete(college)}>
                                <i className='fa fa-trash'></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : collegeList.docs.length === 0 ? (
                        <tr>
                          <td colSpan={'4'} className='text-center'>
                            No college found
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
                      <tr>
                        <th>No</th>
                        <th>College Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Modal isOpen={showModal}>
            <ModalHeader toggle={(e) => setShowModal(!showModal)}>
              {_id ? 'Edit College' : 'Add College'}
            </ModalHeader>
            <ModalBody>
              <label htmlFor='fname'>College Name</label>
              <Input
                placeholder='Enter college name'
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
  getAllCollege,
  addCollege,
  updateCollege,
  statusChangeCollege,
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
