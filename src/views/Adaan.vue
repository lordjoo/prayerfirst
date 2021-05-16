<template>
  <div id="adaan-alert">
    <div class="container-fluid py-3 px-4 ">
      <div class="row">
        <div class="col-md-12">
          <div v-if="currentPrayer" :style="`background-image:url(${backgroundForTime(currentPrayer.index)})`"
               class="title-w-img mx-auto">
            <div class="texts centering w-100 mx-auto text-center">
              <h4 v-if="currentPrayer" class="h3 font-weight-bold w-100">
                حان الان موعد صلاة
                {{ currentPrayer.text_ar }}
              </h4>
            </div>
          </div>
        </div>
        <div class="col-md-12 my-4"></div>
        <div class="col-md-12">
          <div class="actions mx-auto text-center">
            <h4 class="h4">
              الساعة الأن :
              {{ time }}
            </h4>

            <button @click="mute" class="btn btn-sm btn-grey">
              <span class="h6">
                <span class="mdi mdi-volume-mute"></span>
                كتم الصوت
              </span>
            </button>
            <button @click="hide" class="btn btn-sm btn-blue">
              <span class="h6">
                <span class="mdi mdi-close"></span>
                اغلاق
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Howl} from 'howler'
import moment from "moment";

export default {
  name: "Adaan",
  mounted() {
    setTimeout(() => {
      let curremt = this.currentPrayer;
      if (curremt !== null) {
        let sound;
        if (curremt.index !== 0) {
          sound = this.sounds + "/adaan.mp3";
        } else {
          sound = this.sounds + "/adaan_fajr.mp3";
        }
        let player = new Howl({
          src: sound,
        })
        player.play();
        this.player = player
      }
    }, 500);
    setInterval(()=>{
      this.time = moment().locale('ar').format('hh:mm A')
    },1000);
  },
  computed: {
    sounds: function () {
      return this.$store.state.sounds;
    },
    currentPrayer: function () {
      let allPrayers = this.$store.state.prayer_times;
      if (allPrayers) {
        let now = moment().format('HH:mm')
        let sorted = allPrayers.sort((a, b) => {
          return a.time.localeCompare(b.time)
        });
        for (let i = 0; i < sorted.length; i++) {
          if (now === sorted[i].time) {
            let next_prayer = sorted[i];
            next_prayer.index = i;
            return next_prayer;
          }
        }
      }
      return null
    }
  },
  methods: {
    backgroundForTime: function (prayer_num) {
      let imgs = {
        0: "/media/back/fajr.jpg", // fajr
        1: "/media/back/duhur.jpg", // duhur
        2: "/media/back/asr.jpg", // asr
        3: "/media/back/majrb.jpg", // majrb
        4: "/media/back/isha.jpg", // isha
      }
      return imgs[prayer_num];
    },
    mute:function () {
      if (this.player)
        this.player.pause();
      window.ipcRenderer.send("close_window")
    },
    hide:function () {
      window.ipcRenderer.send("close_window")
    }
  },
  data(){
    return {
      time:moment().locale('ar').format('hh:mm A'),
      player:null
    }
  }
}
</script>

<style scoped lang="scss">
.title-w-img {
  width: 230px;
  height: 230px;
  border-radius: 50%;
  overflow: hidden;
  background-size: cover;
  position: relative;
  background-image: url("/media/back/dark.jpg");

  .texts {
    color: white;
    z-index: 10;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    top: 0;
    display: block;
  }
}

</style>
