import Express from "express"
import Http from "http"
import SocketIO from "socket.io"
import SimplePeer from "simple-peer"
const CORS = require("cors")

var ExpressApp = Express().use(CORS)
var Server = Http.createServer(ExpressApp)
var SocketServer = SocketIO(Server)

SocketServer.on("connection", (Socket) => {
    console.log(Socket.id + "가 연결됨")

    Socket.on("toRenderer", (data) => { //렌더러에게 클라이언트의 Simple Peer 정보 전달
        console.log("클라이언트가 앱에게 요청보냄")
        Socket.broadcast.emit("toRenderer", data)
    })

    Socket.on("toClient", (data) => {  //클라이언트에게 렌더러의 Simple Peer 정보 전달
        console.log("앱이 클라이언트에게 응답보냄")
        Socket.broadcast.emit("toClient", data)
    })
})

Server.listen(9503, () => {
    console.log("Server started")
})