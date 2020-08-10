import React from "react"
import ScreenItem from "../../components/ScreenItem"
import Button from "../../components/Button"

interface state{
    selectedItem:{ScreenID:string, ScreenName:string}
}

interface props{
    RunningProcesses:Array<any>
    onSubmit:(ScreenID:string, ScreenName:string, AppType:number) => void
}

export default class SelectScreen extends React.Component<props, state>{
    componentWillMount(){
        this.setState({selectedItem:{ScreenID:"", ScreenName:""}})
        console.log(this.props.RunningProcesses)
    }

    render(){
        return(
            <div style={{ display:"flex", flexDirection:"column", height:"100%"}}>
                <div>
                    <video id="videoSelectPreviewer" style={{width:"100%", borderRadius:2.5, backgroundColor:"black", overflow:"hidden"}}/>
                    <select id="AppTypeSelector" style={{color:"white", backgroundColor:"#202330", fontSize:18}} className="browser-default">
                        <option value="0">일반 앱</option>
                        <optgroup label="게임">
                            <option value="1">일반 게임</option>
                            <option value="2">Flight Simulator</option>
                        </optgroup>
                        <option value="3">개발 도구</option>
                    </select>
                </div>
                <div style={{overflowY:"scroll", height:"30vh"}}>
                    {this.props.RunningProcesses.map(it => <ScreenItem ScreenID={it.id} ScreenName={it.name} onSelect={(ScreenID:string, ScreenName:string) => {
                        this.setState({selectedItem:{ScreenID:ScreenID, ScreenName:ScreenName}})
                        require("./../../renderers/StreamingRender").startRenderPreview(ScreenID)
                    }}/>)}
                </div>
                <div style={{textAlign:"center"}}>
                    <Button text="Submit" onclick={() => {
                        if(this.state.selectedItem.ScreenID + this.state.selectedItem.ScreenName != ""){
                            var Selector = (document.getElementById("AppTypeSelector") as any)
                            this.props.onSubmit(this.state.selectedItem.ScreenID, this.state.selectedItem.ScreenName, 
                                Selector.options[Selector.selectedIndex].value)
                        }else{
                            alert("화면을 적용하려면 선택해주세요")
                        }
                    }}/>
                </div>
            </div>
        )
    }
}

export enum ScreenType{
    CommonApp,
    CommonGame,
    FlightSimulator,
    DevelopTools
}