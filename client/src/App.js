import React, { Suspense, useEffect } from 'react';
import './App.scss';
import { Provider } from 'react-redux'
import { store } from './store'
import { loadUser } from './actions/authActions'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Profile from './components/Profile'
import Settings from './components/Profile/settings'


import DefaultHeader from './container/DefaultLayout/DefaultHeader'
import DefaultLayout from './container/DefaultLayout/DefaultLayout'

import setAuthorizationToken from './utils/setAuthorizationToken'

import { PrivateRoute } from './privateRouter'

import requireAuth from './utils/requireAuth'

const App = () => {

  // useEffect(() => {

  // })
  // console.log(localStorage.jwtToken)
  if (localStorage.jwtToken) {
    console.log(localStorage.jwtToken, 'jwttoken')
    setAuthorizationToken(localStorage.jwtToken)
    store.dispatch(loadUser());
  }


  return (
    <Provider store={store} >
      <DefaultHeader />
      {/* <Route path="/" component={DefaultLayout} /> */}
      <Route>
        <Route exact path="/user/:profile_name" component={Profile} />
        <Route path="/settings" component={requireAuth(Settings)} />
      </Route>
    </Provider>
  )
}

export default App;
