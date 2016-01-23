import React from 'react'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Main from 'layouts/Main'
import Heart from 'routes/Heart'
import Create from 'routes/Create'

// function requireAuth (nextState, replaceState) {
//   if (!localStorage.user) {
//     replaceState({ nextPathname: nextState.location.pathname }, '/login')
//   }
// }
//
// function skipAuth (nextState, replaceState) {
//   if (localStorage.user) {
//     replaceState({ nextPathname: nextState.location.pathname }, '/')
//   }
// }

module.exports = (
  <Router history={createBrowserHistory()}>
    <Route component={Main}>
      <Route path='/' component={Heart} />
      <Route path='/new' component={Create} />
    </Route>
  </Router>
)
