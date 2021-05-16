import {BrowserWindow} from "electron";
import path from "path";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import AdaanScreen from "./adaan";

let MainScreen = {};

MainScreen.window = null;

MainScreen.create = async function () {
    MainScreen.window = new BrowserWindow({
        width: 900,
        height: 500,
        frame:false,
        resizable:false,
        webPreferences: {
            preload:path.resolve(__dirname,"./preload.js")
        },
        show:false,
    })


    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await MainScreen.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        await MainScreen.window.loadURL('app://./index.html')
    }

    setTimeout(()=>{
        MainScreen.window.show()
    },200)

    MainScreen.window.on('closed', () => {
        MainScreen.window = null
    })

}
export default MainScreen