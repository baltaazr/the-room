import './index.css'
import Main from './containers/Main'
import * as serviceWorker from './serviceWorker'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

const main = (
  <HashRouter>
    <Main />
  </HashRouter>
)

// document.getElementById('audio').play()

ReactDOM.render(main, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
