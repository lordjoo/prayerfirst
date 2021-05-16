import fs from "fs";
import Helpers from "./helpers";
import paths from "./paths";
import moment from "moment";
import AdaanScreen from "./windows/adaan";

class Scheduler {
    constructor() {
        this.playing = false;
    }

    async start() {
        this.prayers = await this.getPrayers();
        setInterval(() => {
            let now = moment().format("HH:mm");
            let current = this.prayers.filter(p => {
                return p.time === now;
            })
            if (current.length) {
                if (now === current[0].time && !this.playing) {
                    console.log("It's time for",current[0].text_en);
                    AdaanScreen.create();
                    this.playing = true;
                } else if (now !== current[0].time) {
                    this.playing = false;
                }
            }
        },1000);
    }

    async getPrayers() {
        // get prayers if this a new day
        if (!fs.existsSync(paths.prayers_path)) {
            let location_ = await fs.readFileSync(paths.location_path).toString();
            await Helpers.getPrayerTimes(JSON.parse(location_))
        }
        let prayers_ = fs.readFileSync(paths.prayers_path).toString();
        return JSON.parse(prayers_);
    }

}

export default Scheduler;