import React from "react"
import SimplePeer from "simple-peer"
import SocketIO from "socket.io-client"

const { desktopCapturer, remote, ipcRenderer } = window.require("electron")

//Video Capture
console.log("start Capturing..")

export function startRenderScreen(ScreenID: string) {
  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async (sources: any) => {
    for (const source of sources) {
      console.log(source)
      if (source.id === ScreenID) {
        console.log("app find")
        try {
          const stream = await (<any>navigator.mediaDevices).getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id,
                minWidth: 1280,
                maxWidth: 3840,
                minHeight: 720,
                maxHeight: 2160
              }
            }
          }) as MediaStream
          handleStream(stream)
          console.log(stream)
        } catch (e) {
          handleError(e)
        }
        return
      }
    }
  })
}

export function startRenderPreview(ScreenID: string) {
  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async (sources: any) => {
    for (const source of sources) {
      console.log(source)
      if (source.id === ScreenID) {
        console.log("app find")
        try {
          const stream = await (<any>navigator.mediaDevices).getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id,
                minWidth: 1280,
                maxWidth: 3840,
                minHeight: 720,
                maxHeight: 2160
              }
            }
          }) as MediaStream
          const video = document.getElementById('videoSelectPreviewer')!! as HTMLVideoElement
          console.log(video)
          video.srcObject = stream
          video.onloadedmetadata = (e) => video.play()
          console.log(stream)
        } catch (e) {
          handleError(e)
        }
        return
      }
    }
  })
}

export function getScreens(onReceiveScreen: (data: any) => {}) {
  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async (sources: any) => {
    onReceiveScreen(sources)
  })
}

interface SignalInterface{
  Signal:any,
  ID:string
}

/*const StreamPeerList:Array<PeerItem> = []
var nowStream:MediaStream | undefined = undefined

interface PeerItem{
  ID:string,
  Peer:SimplePeer.Instance
}

var RendererSocket = SocketIO.connect("http://localhost:9503")
console.log("앱이 서버에 연결")
RendererSocket.on("toRenderer", (InputSignal: SignalInterface) => {
  console.log("ID는 " + InputSignal.ID)
  console.log("클라이언트에게서 요청을 받았습니다!")
  let StreamPeer = new SimplePeer({ initiator: false, stream: nowStream })
  StreamPeer.signal(InputSignal.Signal) //내가 받았던 데이터를 적용
  StreamPeer.on("signal", StreamSignal => {
    console.log("스트리밍 연결 데이터를 클라이언트에게 전송합니다")
    RendererSocket.emit("toClient", StreamSignal) //내 연결 데이터를 전송
  })
  StreamPeerList.push({ID: InputSignal.ID, Peer:StreamPeer})
  console.log(StreamPeerList.length)
})*/

function handleStream(stream: MediaStream) {
  const video = document.getElementById('videoPreviewer')!! as HTMLVideoElement
  console.log(video)
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()

  /*StreamPeerList.forEach(it => {
    console.log("스트림 처리중")
    if(nowStream != undefined){
      it.Peer.removeStream(nowStream)
    }
    it.Peer.addStream(stream)
  })
  
  nowStream = stream*/

  //for TEST
  var StreamPeer = new SimplePeer({ initiator: false, stream: stream })

  var RendererSocket = SocketIO.connect("http://localhost:9503")
  console.log("앱이 서버에 연결")
  /*RendererSocket.on("toRenderer", (ClientSignal: any) => {
    console.log("클라이언트에게서 요청을 받았습니다!")
    StreamPeer.signal(ClientSignal)
  })*/

  RendererSocket.on("toRenderer", (InputSignal: SignalInterface) => {
    StreamPeer.signal(InputSignal.Signal)
  })


  StreamPeer.on("signal", StreamSignal => {
    RendererSocket.emit("toClient", StreamSignal) //내 연결 데이터를 전송
  })

}

function handleError(e: any) {
  console.log(e)
}

