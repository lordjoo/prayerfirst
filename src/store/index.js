import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        title: "صلاتي أولا",
        settings: {
            mosque_distance: null,
            school:5,
        },
        location:null,
        prayer_times:null,
        sounds:null
    },
    mutations: {
        SET_TITLE(state, title) {
            state.title = title;
        },
        SET_MOSQUE_DISTANCE(state, distance) {
            state.settings.mosque_distance = distance;
            window.ipcRenderer.invoke('update_settings',state.settings);
        },
        SET_LOCATION(state,location) {
            state.location = location;
            window.ipcRenderer.invoke('set_location', state.location)
        },
        SET_SCHOOL(state,school) {
            state.settings.school = school;
            window.ipcRenderer.invoke('update_settings',state.settings);
        },
        SET_PRAYER_TIMES(state,prayer_times) {
            state.prayer_times = prayer_times;
            window.ipcRenderer.invoke('update_prayer_times',state.prayer_times);
        },
        FETCH_FROM_DISK(state,data) {
            state.settings = JSON.parse(data.settings);
            state.location = JSON.parse(data.location);
            state.prayer_times = JSON.parse(data.prayers);
            state.sounds = data.sounds
        }
    },
    actions: {},
    modules: {}
})
