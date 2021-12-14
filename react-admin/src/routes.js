import React from 'react'
import Loadable from 'react-loadable'

// import DefaultLayout from './containers/DefaultLayout'

function Loading() {
  return (
    <div className='animated fadeIn pt-3 text-center'>
      <div className='sk-spinner sk-spinner-pulse'></div>
    </div>
  )
}

const Appraisal = Loadable({
  loader: () => import('./views/Appraisal/Appraisal'),
  loading: Loading,
})
const AppraisalView = Loadable({
  loader: () => import('./views/Appraisal/ViewDetails'),
  loading: Loading,
})
const StudentList = Loadable({
  loader: () => import('./views/Students'),
  loading: Loading,
})
const Teacher = Loadable({
  loader: () => import('./views/Teacher'),
  loading: Loading,
})
const ApproveRequest = Loadable({
  loader: () => import('./views/ApproveRequest'),
  loading: Loading,
})
const College = Loadable({
  loader: () => import('./views/College'),
  loading: Loading,
})
const routes = [
  {
    path: '/appraisal',
    exact: true,
    name: 'Appraisal',
    role: 1,
    component: Appraisal,
  },
  {
    path: '/user-approve',
    exact: true,
    name: 'Approve Request',
    role: 1,
    component: ApproveRequest,
  },
  {
    path: '/appraisal/view',
    name: 'Appraisal Detail',
    role: 1,
    exact: true,
    component: AppraisalView,
  },
  {
    path: '/student',
    name: 'Student',
    role: 1,
    exact: true,
    component: StudentList,
  },

  {
    path: '/teacher',
    name: 'Teacher',
    role: 1,
    exact: true,
    component: Teacher,
  },
  {
    path: '/college',
    name: 'Colleges',
    role: 1,
    exact: true,
    component: College,
  },
  {
    path: '/teacher/appraisal',
    name: 'Appraisal Detail',
    role: 2,
    exact: true,
    component: AppraisalView,
  },
  {
    path: '/teacher/student',
    name: 'Student',
    role: 2,
    exact: true,
    component: StudentList,
  },
]

export default routes
