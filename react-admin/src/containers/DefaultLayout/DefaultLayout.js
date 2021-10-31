import React, { Component, Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
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
import { Route } from 'react-router-dom'
// sidebar nav config
import navigation from '../../_nav'
// routes config
import routes from '../../routes'

// const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'))
const DefaultHeader = React.lazy(() => import('./DefaultHeader'))

class DefaultLayout extends Component {
  loading = () => (
    <div className='animated fadeIn pt-1 text-center'>
      <div className='sk-spinner sk-spinner-pulse'></div>
    </div>
  )

  render() {
    // if (loading === true) {
    //   return <div />
    // }

    return (
      <div className='app'>
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className='app-body'>
          <AppSidebar fixed display='lg'>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className='main'>
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null
                  })}
                  <Redirect from='/' to='/appraisal' />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    )
  }
}

export default DefaultLayout
