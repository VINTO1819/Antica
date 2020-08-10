import React from "react"
import ScreenItem from "../../components/ScreenItem"
import Button from "../../components/Button"

interface state{
    selectedItem:{ScreenID:string, ScreenName:string}
}

interface props{
    RunningProcesses:Array<any>
    onSubmit:(ScreenID:string, ScreenName:string) => void
}

export default class SelectScreen extends React.Component<props, state>{
    componentWillMount(){
        this.setState({selectedItem:{ScreenID:"", ScreenName:""}})
        console.log(this.props.RunningProcesses)
    }

    render(){
        return(
            <div style={{overflow:"hidden", display:"flex", flexDirection:"column", height:"100%"}}>
                <div style={{flex:2}}>
                    <video id="videoSelectPreviewer" style={{width:"100%", borderRadius:2.5, backgroundColor:"black", overflow:"hidden"}}/>
                    <select name="fluit" style={{backgroundColor:"blue", width:"100%"}}>
                        <option value="0">일반 앱</option>
                        <optgroup label="게임">
                            <option value="1">일반 게임</option>
                            <option value="2">Flight Simulator</option>
                        </optgroup>
                        <option value="3">개발 도구</option>
                    </select>
                </div>
                <div style={{overflowY:"scroll", flex:1.5}}>
                    {this.props.RunningProcesses.map(it => <ScreenItem ScreenID={it.id} ScreenName={it.name} onSelect={(ScreenID:string, ScreenName:string) => {
                        this.setState({selectedItem:{ScreenID:ScreenID, ScreenName:ScreenName}})
                        require("./../../renderers/StreamingRender").startRenderPreview(ScreenID)
                    }}/>)}
                </div>
                <div style={{flex:0.5, textAlign:"center"}}>
                    <Button text="Submit" onclick={() => {
                        if(this.state.selectedItem.ScreenID + this.state.selectedItem.ScreenName != ""){
                            this.props.onSubmit(this.state.selectedItem.ScreenID, this.state.selectedItem.ScreenName)
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