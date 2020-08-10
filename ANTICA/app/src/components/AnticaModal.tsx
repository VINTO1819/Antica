import React from "react"

interface props{
    Title:string,
    onPressCloseButton:() => void,
    visible:boolean,
    isForcing:boolean
}

export default class AnticaModal extends React.Component<props>{
    render(){
        return (
            <div style={{visibility:this.props.visible ? "visible" : "hidden", boxSizing:"border-box", display:"block", position:"fixed", backgroundColor:"rgba(0,0,0, 0.6)", zIndex:999, width:"100%", height:"100%"}}>
                <div style={{visibility:this.props.visible ? "visible" : "hidden", boxSizing:"border-box", display:"block", position:"fixed", zIndex:1000, overflow:"auto", outline:0, height:"100%", width:"100%", 
                verticalAlign:"center",justifyContent:"center", alignItems:"center"}}
                onClick={this.props.isForcing ? undefined : this.props.onPressCloseButton}>
                    <div style={{
                        boxSizing:"border-box", position:"relative", backgroundColor:"#202330", width:"65vh",
                        boxShadow:"0 0 6px 0 rgba(0, 0, 0, 0.6)", borderRadius:"2.5px",
                        visibility:this.props.visible ? "visible" : "hidden",
                        padding:"10px", overflow:"hidden", margin: "20px auto",
                        zIndex:1001
                    }}>
                        <div style={{display:"flex"}}>
                            <h4 style={{margin:0}}>{this.props.Title}</h4>
                            <div style={{flex:1,textAlign:"end", marginRight:5}}><h3 style={{margin:0, flex:1, fontSize:18, color:"gray"}} onClick={this.props.onPressCloseButton}>X</h3></div>
                        </div>
                        <div style={{marginTop:10}}/>

                        <div>
                            {this.props.children}
                        </div> 

                    </div>
                </div>
            </div>
        )
    }
}

enum ScreenType{
    Normal,
    Game,
    Develop,
    FlightSimulator
}

export {ScreenType}