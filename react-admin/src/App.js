import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './App.scss'
import store from './store'
import setAuthToken from './Helpers/setAuthToken.js'
import { Provider } from 'react-redux'
// Containers
import { DefaultLayout } from './containers'
// Pages
import { Login, Page404, Page500, Register } from './views/Pages'
import EmailVerify from './views/Pages/emailVerify'
//  Actions
import { loadUser } from './actions/authAction'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
// import { renderRoutes } from 'react-router-config';
const loading = () => (
  <div className='animated fadeIn pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
)
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path='/login' name='Login Page' component={Login} />
              <Route
                exact
                path='/register'
                name='Register Page'
                component={Register}
              />
              <Route
                exact
                path='/email-verify'
                name='Email Verify'
                component={EmailVerify}
              />
              <Route exact path='/404' name='Page 404' component={Page404} />
              <Route exact path='/500' name='Page 500' component={Page500} />

              <Route path='/' name='Home' component={DefaultLayout} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </Provider>
    )
  }
}

export default App
