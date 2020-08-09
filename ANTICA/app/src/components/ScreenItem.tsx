import React from "react"

interface props{
    ScreenID:string
    ScreenName:string

    onSelect:(ScreenID:string, ScreenName:string) => void
}

export default class ScreenItem extends React.Component<props, any>{
    render(){
        return(
            <div className="row">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text" style={{padding:5}} onClick={() => {this.props.onSelect(this.props.ScreenID, this.props.ScreenName)}}>
                    <span className="card-title" style={{fontSize:24, marginBottom:0}}>{this.props.ScreenName}</span>
                    <p style={{fontSize:18}}>{this.props.ScreenID}</p>
                </div>
              </div>
            </div>
          </div>
        )
    }
}