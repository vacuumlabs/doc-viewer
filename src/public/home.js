import React from 'react'
import ReactDOM from 'react-dom'
import Home from '../home'

// this will be rendered in browser
/* eslint-env browser */

ReactDOM.hydrate(<Home />, document.getElementById('root'))
