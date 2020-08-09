import React from 'react'
import logo from './logo.svg'
import './App.css'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HamburgerMenu from './components/HamburgerMenu'

import View_Main from "./views/Main"

export default class extends React.Component {
  componentWillMount(){
    document.title = "ANTICA"
    require("./renderers/DefaultRenderer")
    require("./menu")
  }

  render(){
    return (
      <Router>
        <div className="App no-drag">
          <HamburgerMenu></HamburgerMenu>
          <div className="App-Body">
            <Route exact path="/" component={View_Main}/>
          </div>
        </div>
      </Router>
    )
  }
  
}
