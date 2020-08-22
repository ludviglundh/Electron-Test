const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { WINDOW_DIMENSIONS } = require("../src/features/app/constants");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: WINDOW_DIMENSIONS.WIDTH,
    height: WINDOW_DIMENSIONS.height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.whenReady().then(createWindow);
