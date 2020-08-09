import React from "react"

const customTitlebar = window.require('custom-electron-titlebar');

//Title bar
new customTitlebar.Titlebar({
	backgroundColor: customTitlebar.Color.fromHex('#292B36'),
	icon:"./antica.png"
})