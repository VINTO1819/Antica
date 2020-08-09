import "materialize-css/dist/css/materialize.css"
import React from "react"

export default class Button extends React.Component<{text:string, onclick:()=>void}, any>{
    render(){
        return(
            <div>
                <button onClick={this.props.onclick} className="waves-effect waves-light btn">{this.props.text}</button>
            </div>
            
        )
    }
}