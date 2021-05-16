<template>
  <div id="setup-2" class="text-right">
    <div class="container-fluid py-3 px-4 centering">
      <div class="row h-100 align-items-center">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-12">
              <h5 class="h4 font-weight-bold">
                كم من الوقت يلزم للوصول لاقرب مسجد ؟
              </h5>
              <div class="options mt-3">
                <div class="form-check">
                  <input type="radio" class="form-check-input"
                         v-model="mosque_distance"
                         id="le5" value="le5" name="mosque_distance">
                  <label class="form-check-label" for="le5">
                    اقل من 5 دقائق سيراَ
                  </label>
                </div>
                <div class="form-check">
                  <input type="radio" class="form-check-input"
                         v-model="mosque_distance"
                         id="mo5" value="mo5" name="mosque_distance">
                  <label class="form-check-label" for="mo5">
                    تقريبا 5 دقائق سيراَ
                  </label>
                </div>
                <div class="form-check">
                  <input type="radio" class="form-check-input"
                         v-model="mosque_distance"
                         id="eq10" value="eq10" name="mosque_distance">
                  <label class="form-check-label" for="eq10">
                    تقريبا 10 دقائق سيراَ
                  </label>
                </div>
                <div class="form-check">
                  <input type="radio" class="form-check-input"
                         v-model="mosque_distance"
                         id="mo10" value="mo10" name="mosque_distance">
                  <label class="form-check-label" for="mo10">
                    اكثر من 10 دقائق سيراَ
                  </label>
                </div>
              </div>

            </div>
            <div class="col-md-12 py-3"></div>
            <div class="col-md-12">
              <button @click="nextStep" class="btn btn-rounded blue-gradient btn-md">
                <span class="h6">
                    التالي
                    <span class="mdi mdi-arrow-left"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <img width="250" src="/media/img_2.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setup-2",
  mounted() {
    this.$store.commit("SET_TITLE", "تهيئة الاعدادات")
  },
  methods: {
    nextStep:function () {
      this.$store.commit('SET_MOSQUE_DISTANCE',this.mosque_distance);
      this.$router.push({name:"setup-3"});
    }
  },
  data() {
    return {
      mosque_distance: "le5",
    };
  },
}
</script>

<style scoped>

</style>