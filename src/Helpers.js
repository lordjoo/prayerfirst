import axios from 'axios'

let Helpers = {};

Helpers.getLocation = async function () {
    try {
        let {data} = await axios.get("https://extreme-ip-lookup.com/json/")
        return {
            lon: data.lon,
            lat: data.lat,
            country: data.country,
            city: data.city,
        };
    } catch (e) {
        throw new Error('Failed To Fetch Location');
    }
}

Helpers.getPrayerTimes = async function (location,school = 5) {
    if (location.lon && location.lat) {
        let url = `https://api.pray.zone/v2/times/today.json?latitude=${location.lat}&longitude=${location.lon}&method=${school}`;
        try {
            let { data } = await axios.get(url)
            data = data.results.datetime[0].times
            return [
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
                    time:data.Maghrib,
                    text_en: "Maghrib",
                    text_ar: "المغرب"
                },
                {
                    time:data.Isha,
                    text_ar: "العشاء",
                    text_en: "Isha",
                }
            ]
        } catch (e) {
            throw new Error('Failed To Fetch Prayer Times');
        }
    }
    throw new Error('Location can\'t be null')
}

export default Helpers