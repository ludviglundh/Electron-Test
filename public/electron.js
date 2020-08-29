const { app, BrowserWindow, Tray } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const iconPath = path.join(__dirname, '../public/logo192.png')
let tray
let window

function getWindowPosition() {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2,
  )

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 3)

  return { x, y }
}

function showWindow() {
  const position = getWindowPosition()
  window.setPosition(position.x, position.y)
  window.show()
  window.focus()
}

function toggleWindow() {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

function CreateTray() {
  tray = new Tray(iconPath)

  tray.on('click', () => toggleWindow())
}

function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    width: 300,
    height: 510,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
  })

  window.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${join(__dirname, '../build/index.html')}`,
  )
}
app.whenReady().then(CreateTray).then(createWindow)
