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

function handleStream(stream: MediaStream) {
  const video = document.getElementById('videoPreviewer')!! as HTMLVideoElement
  console.log(video)
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()

  var StreamPeer = new SimplePeer({ initiator: true, stream: stream })

  var RendererSocket = SocketIO.connect("http://localhost:9503")
  console.log("앱이 서버에 연결")
  RendererSocket.on("toRenderer", (ClientPeer: SimplePeer.Instance) => {
    console.log("클라이언트에게서 요청을 받았습니다!")
    StreamPeer.on("signal", data => {
      ClientPeer.signal(data)
    })
    RendererSocket.emit("toClient", StreamPeer) //내 피어를 전송
  })
}

function handleError(e: any) {
  console.log(e)
}

