import React from "react"
//import {Menu, MenuItem} from "electron"
const {Menu, MenuItem} = window.require("electron").remote

const isMacOS = (process.platform === "darwin")

const AnticaMenu = new Menu()
AnticaMenu.append(new MenuItem({label:"Antica 정보"})) //app info button
AnticaMenu.append(new MenuItem({label:"Exit", role: isMacOS ? "close" : "quit"})) //close button

const DeveloperMenu = new Menu()
DeveloperMenu.append(new MenuItem({role: "toggleDevTools" })) //developer mode

const MainMenu = new Menu()
MainMenu.append(new MenuItem({label:"Antica", submenu:AnticaMenu}))
MainMenu.append(new MenuItem({label:"Developer", submenu:DeveloperMenu}))

Menu.setApplicationMenu(MainMenu)