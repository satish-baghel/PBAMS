import React from 'react'
import Loadable from 'react-loadable'

// import DefaultLayout from './containers/DefaultLayout'

function Loading() {
  return <div>Loading...</div>
}

const Appraisal = Loadable({
  loader: () => import('./views/Appraisal/Appraisal'),
  loading: Loading,
})
const AppraisalView = Loadable({
  loader: () => import('./views/Appraisal/ViewDetails'),
  loading: Loading,
})
const routes = [
  { path: '/appraisal', exact: true, name: 'Appraisal', component: Appraisal },
  {
    path: '/appraisal/view',
    name: 'Appraisal Detail',
    exact: true,
    component: AppraisalView,
  },
]

export default routes
