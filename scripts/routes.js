import React from 'react'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Main from 'layouts/Main'
import Heart from 'routes/Heart'
import Create from 'routes/Create'
import KnightGrams from 'routes/KnightGrams'
import Thanks from 'routes/Thanks'
import Orders from 'routes/Orders'

function requireAuth (nextState, replaceState) {
  if (!localStorage.user) {
    replaceState({ nextPathname: nextState.location.pathname }, '/knightgrams')
  }
}

module.exports = (
  <Router history={createBrowserHistory()}>
    <Route component={Main}>
      <Route path='/' component={Heart} />
      <Route path='/new' component={Create} />
      <Route path='/knightgrams' component={KnightGrams} />

      <Route onEnter={requireAuth}>
        <Route path='/thanks' component={Thanks} />
      </Route>

      <Route path='/:token' component={Orders} />
    </Route>
  </Router>
)
