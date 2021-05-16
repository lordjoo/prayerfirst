
"use strict";
import electron, {app, BrowserWindow, Menu, Tray} from "electron"
import path from "path";
import MainScreen from "./windows/main"
import fs from 'fs'
import Helpers from "./helpers";
import paths from "./paths";

const IpcMain = electron.ipcMain;

let tray;
function createTray(){
    if (!tray) {
        tray = new Tray(path.join(paths.assetsPath,"icon.png"));
        let menu = Menu.buildFromTemplate([
            {
                label:"Open",
                click:()=>{MainScreen.window.show()},
            },
            {
                label:"Exit App",
                click: () => { app.quit() }
            }
        ])
        tray.setContextMenu(menu);
    }
}

IpcMain.on('close_window',function () {
    // let windows = BrowserWindow.getAllWindows().filter(b => {
    //     return b.isVisible()
    // });
    // windows.forEach(w=>{
    //     // if (w.isFocused())
    //     //     w.hide();
    // });
    let focusedWindow = BrowserWindow.getFocusedWindow();
    focusedWindow.hide();
    // Create Tay
    createTray()
})

IpcMain.handle("read-app-data",async () => {
    if (fs.existsSync(paths.settings_paths) && fs.existsSync(paths.location_path)) {
        let location_ = await fs.readFileSync(paths.location_path).toString();
        // get prayers if this a new day
        if (!fs.existsSync(paths.prayers_path)) {
            await Helpers.getPrayerTimes(location_)
        }
        let prayers_ = await fs.readFileSync(paths.prayers_path).toString();

        return {
            settings: await fs.readFileSync(paths.settings_paths).toString(),
            location: location_,
            prayers: prayers_,
            sounds:paths.sounds_path
        }
    } else {
        return Promise.reject(new Error('FIRST_TIME'));
    }
})

IpcMain.handle('set_location',function (event , location) {
    try {
        fs.writeFileSync(paths.location_path,JSON.stringify(location));
        return true;
    } catch (e) {
        Helpers.writeLog("ipc_save_location",e);
        return false;
    }
})

IpcMain.handle('update_settings',function (event , settings) {
    try {
        fs.writeFileSync(paths.settings_paths,JSON.stringify(settings));
        return true;
    } catch (e) {
        Helpers.writeLog("ipc_update_settings",e);
        return false;
    }
})

IpcMain.handle('update_prayer_times',function (event , times) {
    try {
        fs.writeFileSync(paths.prayers_path,JSON.stringify(times));
        return true;
    } catch (e) {
        Helpers.writeLog("ipc_update_prayer_times",e);
        return false;
    }
})
