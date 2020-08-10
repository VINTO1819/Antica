import React from "react"
import "./../App.css"
import Button from "../components/Button"
import ScreenSettingModal, { ScreenType } from "../components/AnticaModal"
import AnticaModal from "../components/AnticaModal"
import SelectScreen from "./modalViews/SelectScreen"

interface state{
    isShowScreenModal:boolean //스크린을 정하는 모달이 열려있는지
    Screens:Array<any>
    selectedScreen:{ScreenID:string, ScreenName:string}
}

export default class Main extends React.Component<any, state>{
    componentWillMount(){
        this.setState({
            Screens:[],
            isShowScreenModal:false,
            selectedScreen:{ScreenID:"", ScreenName:""}
        })
        require("./../renderers/StreamingRender").getScreens((screens:any) => {
            console.log(screens)
            this.setState({Screens:screens})
        })
    }

    render(){
        return(
            <div className="ViewContainer" style={{display:"flex", flexDirection:"column"}}>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <h1 style={{marginTop:10}}>Streaming</h1>
                <div style={{display:"flex"}}>
                    <video id="videoPreviewer" className="videoViewer" style={{backgroundColor:"black", borderRadius:2.5}}/>
                    <div style={{flex:1, display:"flex", flexDirection:"column"}}>
                        <input type="text" placeholder="제목" color="white" style={{color:"white"}}/>
                        <textarea placeholder="설명" style={{flex:1, fontSize:16, color:"white", resize:"none"}}></textarea>
                    </div>
                </div>
                <p style={{fontSize:16, marginBottom:"15px"}}><strong>{(this.state.selectedScreen.ScreenID + this.state.selectedScreen.ScreenName != "") ? `설정된 화면 : ${this.state.selectedScreen.ScreenName}()` : "화면 미설정됨"}</strong></p>

                <div>

                </div>
                <Button text="화면 설정" onclick={() => {this.setState({isShowScreenModal:!this.state.isShowScreenModal})}}/>

                <div style={{display:"flex", marginBottom:"15px", marginTop:10}}>
                    <div className="card blue-grey darken-1" style={{padding:10, flex:3, height:"100%"}}>
                        <h5 style={{margin:0}}>채팅</h5>

                    </div>
                    <div style={{marginLeft:5, marginRight:5}}></div>
                    <div className="card blue-grey darken-1" style={{padding:10, flex:3, height:"100%"}}>
                        <h5 style={{margin:0}}>방송</h5>

                    </div>
                </div>

                <AnticaModal Title="화면 설정" onPressCloseButton={() => {this.setState({isShowScreenModal:false})}} visible={this.state.isShowScreenModal} isForcing={true}>
                    <SelectScreen RunningProcesses={this.state.Screens} onSubmit={(ScreenID:string, ScreenName:string) => {
                        this.setState({isShowScreenModal:false})
                        this.setState({selectedScreen:{ScreenID:ScreenID, ScreenName:ScreenName}})
                        require("./../renderers/StreamingRender").startRenderScreen(ScreenID)
                    }}/>
                </AnticaModal>
            </div>
        )
    }
}