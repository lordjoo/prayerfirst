<template>
  <div id="app">
    <app-bar />
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import AppBar from "./components/AppBar";
import Helpers from "./Helpers";
export default {
  components: {AppBar},
  async mounted() {
    await window.ipcRenderer.invoke('read-app-data').then((e)=>{
      this.$store.commit("FETCH_FROM_DISK",e);
      this.updateData();
    }).catch( (e) =>{
      console.log(e);
      this.$router.push({name:"Setup"})
    })
    console.log("From A App Main Component",new Date().getTime())
  },

  methods:{
    updateData:async function () {
      let new_location = await Helpers.getLocation();
      let prayer_times = await Helpers.getPrayerTimes(new_location,5);
      this.$store.commit('SET_LOCATION',new_location);
      this.$store.commit('SET_PRAYER_TIMES',prayer_times)
    }
  }
}
</script>

<style lang="scss">
.slide-leave,.slide-enter {
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
</style>
