import Home from './Home/Home'
import Game from './Game/Game'

import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import React from 'react'

const Main = () => {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/game" component={Game} />
      <Route path="/home" component={Home} />
      <Route path="/" component={() => <Redirect to="/home" />} />
    </Switch>
  )
}

export default withRouter(Main)
