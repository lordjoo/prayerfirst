'use strict'

import { app, protocol, Notification } from 'electron'
import SplashScreen from "./windows/splash"
import MainScreen from "./windows/main"
import './ipc_listeners'
import fs from "fs-extra";
import paths from "./paths";
import Scheduler from "./scheduler";

const isDevelopment = process.env.NODE_ENV !== 'production'

if (!fs.existsSync(app.getPath('userData')+"/app")){
  fs.mkdirSync(app.getPath('userData')+"/app")
}
if (!fs.existsSync(app.getPath('userData')+"/logs")){
  fs.mkdirSync(app.getPath('userData')+"/logs")
}
if (!fs.existsSync(app.getPath('userData')+"/app/prayers/")){
  fs.mkdirSync(app.getPath('userData')+"/app/prayers")
}
if (!fs.existsSync(app.getPath('userData')+"/sounds/")) {
  fs.copySync(paths.sounds_path,app.getPath('userData')+"/sounds/")
}



// prevent multiple instances
let lock = app.requestSingleInstanceLock();

if (!lock) {
  app.quit();
} else {
  app.on('second-instance',function () {
    // try to restore the window or create another one
    if (MainScreen.window) {
      MainScreen.window.show().focus();
    } else {
      MainScreen.create();
    }
  })
}



// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
app.setAsDefaultProtocolClient('app',process.execPath);



app.on('ready', async () => {
  // Start Scheduler if the app files is found
  if (fs.existsSync(paths.location_path) && fs.existsSync(paths.settings_paths)) {
    await new Scheduler().start();
  }
  SplashScreen.create()
  setTimeout(() => {
    SplashScreen.window.hide();
    MainScreen.create();
    SplashScreen.window.destroy();
    SplashScreen.window = null;
  }, 1800);
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}