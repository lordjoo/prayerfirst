import {BrowserWindow} from "electron";
import path from "path";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import SplashScreen from "./splash";

let AdaanScreen = {};

AdaanScreen.window = null;

AdaanScreen.create = async function () {
    AdaanScreen.window = new BrowserWindow({
        width: 400,
        height: 500,
        frame:false,
        resizable:false,
        webPreferences: {
            preload:path.resolve(__dirname,"./preload.js"),
            webSecurity:false
        },
        show:false,
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await AdaanScreen.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL+"#/adaan")
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        await AdaanScreen.window.loadURL("app://./index.html/#/adaan")
    }

    setTimeout(() => {
        AdaanScreen.window.show();
    },200);

    AdaanScreen.window.on('closed', () => {
        AdaanScreen.window = null
    })

}
export default AdaanScreen