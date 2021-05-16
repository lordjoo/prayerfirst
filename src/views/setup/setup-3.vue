<template>
  <div id="setup-2" class="text-right">
    <div class="container-fluid py-3 px-4 centering">
      <div class="row h-100 align-items-center">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-12">
              <h4 v-if="location" class="h4 font-weight-bold">
                <span class="mdi mdi-map-marker"></span>
                موقعك الحالي
                {{ location.country }}
                {{ location.city }}
              </h4>
              <h4 v-else-if="error" class="h4 font-weight-bold red-text">
                <span class="red-text mdi mdi-alert"></span>
                تغذر تحديد الموقع
              </h4>
              <h4 v-else class="h4 font-weight-bold">
                <span class="mdi mdi-loading"></span>
                جاري تحديد الموقع
              </h4>

            </div>
            <div class="col-md-12 py-3"></div>
            <div class="col-md-12">
              <button v-bind:disabled="!location && !prayer_times" @click="next" class="btn btn-rounded young-passion-gradient white-text btn-md">
                <span class="h6">
                    بدأ الاستخدام
                    <span class="mdi mdi-arrow-left"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4 centering-y">
          <img width="250" src="/media/img_3.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setup-3",
  mounted() {
    this.getLocation();
    this.$store.commit("SET_TITLE", "تهيئة الاعدادات")
  },
  methods: {
    getLocation: function () {
      this.$http.get("https://extreme-ip-lookup.com/json/")
          .then(response => {
            this.location = {
              lon:response.body.lon,
              lat:response.body.lat,
              country:response.body.country,
              city:response.body.city,
            };
          }, response => {
            this.error = true;
            console.log(response)
          });
    },

    getPrayerTimes: function () {
      if (this.location) {
        let url = `https://api.pray.zone/v2/times/today.json?latitude=${this.location.lat}&longitude=${this.location.lon}&method=${this.school}`;
        this.$http.get(url).then(res => {
          let data = res.body.results.datetime[0].times
          this.prayer_times = [
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
        })
      }
    },
    next:function () {
      // send location info
      this.$router.push({name:"Home"})
    }
  },
  data() {
    return {
      location: null,
      school:5,
      error:null,
      prayer_times:null,
    };
  },
  watch:{
    location:function () {
      this.getPrayerTimes();
      this.$store.commit("SET_LOCATION",this.location)
    },
    prayer_times:function () {
      if (this.prayer_times) {
        this.$store.commit('SET_PRAYER_TIMES',this.prayer_times)
      }
    }
  }
}
</script>

<style scoped>

</style>