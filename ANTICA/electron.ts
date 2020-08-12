import { app, BrowserWindow, ipcMain } from 'electron'
import * as isDev from 'electron-is-dev'
import * as path from 'path'
import SimplePeer from "simple-peer"

process.on("uncaughtException", (err) => {
  console.error(err)
})

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    frame: false,
    titleBarStyle: "hidden",
    //fullscreen: true,
    kiosk: !isDev,
    resizable: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, './index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined!
  })

  require("./AnticaStream/AnticaRelay")
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})