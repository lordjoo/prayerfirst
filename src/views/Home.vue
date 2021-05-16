<template>
 <div id="home" class="text-right">
   <div class="mt-3 container-fluid py-3 px-4 centering">
     <div class="row h-100 align-items-center justify-content-around">
       <div v-if="next_prayer" :style="`background-image:url(${backgroundForTime(next_prayer.index)})`" class="title-w-img">
         <div class="texts centering w-100 mx-auto text-center">
           <h2 v-if="next_prayer" class="h2 font-weight-bold w-100">
             صلاة
             {{ next_prayer.text_ar }}
           </h2>
           <h1 class="h1">
             {{ remaining_time }}
           </h1>
         </div>
       </div>
       <div v-if="allPrayers" class="time-table">
         <div class="row mb-4">
           <div class="col-md-12">
             <h4 class="h4">
               الساعة الأن :
               {{ time }}
             </h4>
           </div>
         </div>
         <table class="time-table-t table">
           <tbody>
           <tr v-for="(pray, index) in allPrayers"
               :class="{
                'passed text-muted':(next_prayer && next_prayer.index > index),
               up_coming:(next_prayer && next_prayer.index < index),
               'next shadow mb-4 purple white-text':(next_prayer && next_prayer.index === index)}"
               :key="pray.text_en">
             <td class="cel_name">{{ pray.text_ar }}</td>
             <td class="cel_time">{{ moment(pray.time,"HH:mm").format('hh:mm') }}</td>
           </tr>
           </tbody>
         </table>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';


export default {
  name: 'Home',
  data(){
    return {
      time:moment().locale('ar').format('hh:mm A'),
      next_prayer: null,
      remaining_time:null,
    }
  },
  methods:{
    backgroundForTime: function (prayer_num) {
      let imgs = {
        0:"/media/back/fajr.jpg", // fajr
        1:"/media/back/duhur.jpg", // duhur
        2:"/media/back/asr.jpg", // asr
        3:"/media/back/majrb.jpg", // majrb
        4:"/media/back/isha.jpg", // isha
      }
      return imgs[prayer_num];
    },
    nextPrayer:function () {
      if (this.allPrayers) {
        let now = moment().format('HH:mm')
        let sorted = this.allPrayers.sort((a,b) => {
          return a.time.localeCompare(b.time)
        });
        for (let i = 0;i < sorted.length; i++) {
          if (now < sorted[i].time) {
            let next_prayer = sorted[i];
            next_prayer.index = i;
            this.next_prayer = next_prayer;
            return;
          }
        }
        let next_prayer = sorted[0];
        next_prayer.index = 0;
        this.next_prayer = next_prayer;
      }
    },
    remainingTime: function () {
      if (this.next_prayer) {
        let next_time = this.next_prayer.time;
        let now = moment();
        let diff;
        if (next_time < now.format("HH:mm")) {
          diff = moment(next_time,"HH:mm").add({day:1}).diff(now)
        } else {
          diff = moment(next_time,"HH:mm").diff(now)
        }
        diff = moment.duration(diff);
        if (diff.milliseconds()<0) {
          this.nextPrayer();
        }
        this.remaining_time = diff.hours()+":"+diff.minutes()+":"+diff.seconds();
      }
    }
  },
  mounted() {
    setInterval(()=>{
      this.time = moment().locale('ar').format('hh:mm A')
    },1000);
    setTimeout(()=>{
      this.nextPrayer()
    },100);
    setInterval(() => {
      this.nextPrayer();
    },60*1000);
    setInterval( () => {
      this.remainingTime();
    },1000)
  },
  computed:{
    allPrayers:function () {
      return this.$store.state.prayer_times
    },
  },
}
</script>
<style lang="scss">
.time-table {
  width: 350px;
  .time-table-t {
    td {
      font-size: 1.5em;
      padding: 5px 20px;
    }
    .cel_name {
      width: 200px;
    }
  }
}

.title-w-img {
  width: 350px;
  height: 350px;
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
    opacity: 0.2;
    top: 0;
  }
}
</style>