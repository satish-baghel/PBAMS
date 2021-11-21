import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Table,
} from 'reactstrap'
import DatePicker from 'react-datepicker'
import Loader from 'react-loader-spinner'

import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import { AppSwitch } from '@coreui/react'
import styled from 'styled-components'
import { userList } from '../../actions/studentAction'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
const Index = (props) => {
  //
  const dispatch = useDispatch()
  const student = useSelector((state) => state.student)
  const { studentList, loading } = student
  //
  const [pageLength, setPageLength] = useState(10)
  const [dateRange, setDateRange] = useState([null, null])
  const [search, setSearch] = useState('')
  const [startDate, endDate] = dateRange
  useEffect(() => {
    dispatch(userList(1, pageLength, search, 3))
  }, [pageLength, search])
  return (
    <div className='animated fadeIn'>
      <Row>
        <Col xs='12'>
          <Card>
            <CardHeader>
              <i className='fas fa-user-graduate'></i>
              <strong>Students</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md='3' sm={6} xs='12'>
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
                <Col md='3' sm={6} xs='12'>
                  <InlineTag>
                    <DatePicker
                      placeholderText='Select Date Range'
                      className='form-control'
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(update) => {
                        setDateRange(update)
                      }}
                      isClearable={true}
                    />
                  </InlineTag>
                </Col>
                <Col md='6' sm={12} xs='12'>
                  <InlineTag displayed={true}>
                    <label htmlFor='search'>Search</label>
                    <Input
                      type='search'
                      placeholder='search here'
                      className='ml-1'
                    />
                  </InlineTag>
                </Col>
                <Col md='12'>
                  <Table hover striped responsive size='sm'>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Profile Pic</th>
                        <th>Full Name</th>
                        <th>Department</th>
                        <th>Joining Date</th>
                        <th>Role Type</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading && studentList.docs.length > 0 ? (
                        studentList.docs.map((teacher, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <img src={teacher.profilePic} alt='' />
                            </td>
                            <td>{teacher.fullName}</td>
                            <td>{teacher.email}</td>

                            <td>
                              <Moment format='MMM-YYYY'>
                                {teacher.join_date}
                              </Moment>
                            </td>
                            <td>
                              {teacher.role === 2 ? 'Teacher' : 'Student'}
                            </td>
                            <td>
                              <AppSwitch
                                className='d-block mt-1'
                                variant='3d'
                                color='primary'
                                name='status'
                                checked={true}
                                label
                                dataOn={'\u2715'}
                                dataOff={'\u2713'}
                                // onClick={() => this.changeActivityFlag(activity)}
                              />
                            </td>
                            <td>
                              <Link to='/appraisal/view'>
                                <Button className='btn-brand btn-twitter'>
                                  <i className='fa fa-eye'></i>
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : studentList.docs.length === 0 ? (
                        <tr>
                          <td colSpan='8' className='text-center'>
                            No approval request found
                          </td>
                        </tr>
                      ) : (
                        loading && (
                          <tr>
                            <td colSpan='8' className='text-center'>
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
                        <th>Profile Pic</th>
                        <th>Full Name</th>
                        <th>Department</th>
                        <th>Joining Date</th>
                        <th>Role Type</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

Index.propTypes = {}

export default Index

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
