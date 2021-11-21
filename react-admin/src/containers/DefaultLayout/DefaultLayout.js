import React, { Component, Suspense, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
// import PrivateRoute from "../../Routing/PrivateRoute";
// import { connect } from "react-redux";
import {
  // AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// sidebar nav config

// routes config
import routes from '../../routes'

import { AdminNav, TeacherNav } from '../../_nav'

// const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'))
const DefaultHeader = React.lazy(() => import('./DefaultHeader'))

const DefaultLayout = (props) => {
  const auth = useSelector((state) => state.auth)
  const { isAuthenticated, loading, admin } = auth
  console.log('file: DefaultLayout.js -> line 35 -> admin', admin)
  const loadingSpinner = () => (
    <div className='animated fadeIn pt-1 text-center'>
      <div className='sk-spinner sk-spinner-pulse'></div>
    </div>
  )
  let navigation = { items: [] }

  if (loading === true) {
    return <div />
  }

  if (admin && admin.role === 1) {
    navigation = AdminNav
  }
  if (admin && admin.role === 2) {
    navigation = TeacherNav
  }
  //
  // useEffect(() => {}, [admin])
  return (
    <div className='app'>
      <AppHeader fixed>
        <Suspense fallback={loadingSpinner()}>
          <DefaultHeader />
        </Suspense>
      </AppHeader>
      <div className='app-body'>
        <AppSidebar fixed display='lg'>
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigation} {...props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className='main'>
          <AppBreadcrumb appRoutes={routes} />
          <Container fluid>
            <Suspense fallback={loadingSpinner()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) =>
                        isAuthenticated === true &&
                        loading === false &&
                        route.role === admin.role ? (
                          <route.component {...props} />
                        ) : (
                          <Redirect to='/login' />
                        )
                      }
                    />
                  ) : null
                })}
                {admin && admin.role === 1 && (
                  <Redirect from='/' to='/appraisal' />
                )}
                {admin && admin.role === 2 && (
                  <Redirect from='/' to='/teacher/appraisal' />
                )}
                {!admin && <Redirect from='/' to='/appraisal' />}
              </Switch>
            </Suspense>
          </Container>
        </main>
      </div>
      <AppFooter>
        <Suspense fallback={loadingSpinner()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  )
}

export default DefaultLayout
