const { BrowserWindow,protocol } = require("electron")
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])
let SplashScreen = {};

SplashScreen.options = {
    width:400,
    height:200,
};

SplashScreen.create = function () {
    SplashScreen.window = new BrowserWindow({
        center:true,
        show:false,
        movable:true,
        frame:false,
        alwaysOnTop:true,
        ...SplashScreen.options,
    });
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        SplashScreen.window.loadURL(__dirname+"/../public/splash_screen/index.html")
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
      } else {
        createProtocol('app')
        SplashScreen.window.loadURL("app://./splash_screen/index.html")
    }
    SplashScreen.window.webContents.on('did-finish-load', () => {
        SplashScreen.window.show();
    });
}

export default SplashScreen;