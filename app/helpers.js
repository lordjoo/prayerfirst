import {app, Notification} from 'electron'
import path from "path";
import fs from "fs";
import axios from "axios";
import paths from "./paths";

let Helpers = {};
Helpers.LOG_PATH = path.resolve(app.getPath("userData") + "/logs/");

Helpers.writeLog = function (log, msg) {
    let log_msg = `[${new Date().getHours() + ":" + new Date().getMinutes() + " | " + new Date().toDateString()}] \n ${msg}`;
    fs.writeFileSync(`${Helpers.LOG_PATH}/${log}`, log_msg, {flag: "a"});
}

Helpers.getPrayerTimes = async function (location, school = 5) {
    if (location.lon && location.lat) {
        let url = `https://api.pray.zone/v2/times/today.json?latitude=${location.lat}&longitude=${location.lon}&method=${school}`;
        try {
            let {data} = await axios.get(url)
            data = data.results.datetime[0].times
            let prayers = [
                {
                    time: data.Fajr,
                    text_ar: "الفجر",
                    text_en: "Fajr",
                },
                {
                    time: data.Dhuhr,
                    text_en: "Dhuhr",
                    text_ar: "الظهر"
                },
                {
                    time: data.Asr,
                    text_en: "Asr",
                    text_ar: "العصر",
                },
                {
                    time: data.Maghrib,
                    text_en: "Maghrib",
                    text_ar: "المغرب"
                },
                {
                    time: data.Isha,
                    text_ar: "العشاء",
                    text_en: "Isha",
                }
            ];
            let prayers_path = paths.prayers_path;
            fs.writeFileSync(prayers_path, JSON.stringify(prayers));
        } catch (e) {
            console.log(e);
            throw new Error('Failed To Fetch Prayer Times');
        }
    }
    throw new Error('Location can\'t be null')
}

Helpers.notify = function ({title,body = null,icon= null}) {
    const notification = {
        title: title,
        body: body || "",
        icon: icon || path.resolve(__dirname + "/../build/icons/icon.png")
    }
    new Notification(notification).show()
}


export default Helpers
