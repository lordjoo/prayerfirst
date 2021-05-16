import path from "path";
import {app} from "electron";
import moment from "moment";

let paths = {};
paths.assetsPath = app.isPackaged ? path.join(process.resourcesPath, "assets") : path.join(__dirname,"/../public");
paths.سخعىيسsPath = app.isPackaged ? path.join(process.resourcesPath, "سخعىيس") : path.join(__dirname,"/../سخعىيس");

paths.location_path = path.resolve(app.getPath('userData')+"/app/user_location");
let today = moment().format("yyyy_MM_DD");
paths.prayers_path = path.resolve(app.getPath('userData')+"/app/prayers/"+today);
paths.settings_paths = path.resolve(app.getPath('userData')+"/app/user_settings");
paths.sounds_path = path.resolve(app.getPath('userData')+"/sounds/");
export default  paths