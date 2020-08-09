import React from 'react'
import './../App.css'
import { Link } from 'react-router-dom'

export default class HamburgerMenu extends React.Component{
    render(){
        return(
            <div className="HamburgerMenu">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <Link to="/">
                    <i className="material-icons HamburgerIcon">video_library</i>
                </Link>
                <Link to="/settings">
                    <i className="material-icons HamburgerIcon">settings</i>
                </Link>
            </div>
        )
    }
}