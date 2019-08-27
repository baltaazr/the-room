import './index.css'
import Main from './containers/Main'
import * as serviceWorker from './serviceWorker'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

const main = (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
)

document.getElementById('audio').play()

ReactDOM.render(main, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
