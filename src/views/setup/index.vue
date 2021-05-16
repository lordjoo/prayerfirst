<template>
  <div id="setup" class="text-right">
    <div class="container-fluid py-3 px-4 centering">
      <div class="row h-100 align-items-center">
        <div class="col-md-8">
          <h3 class="h4 font-weight-bold">مرحبا بك في برنامج صلاتي أولا</h3>
          <p>
            تطبيق صلاتي أولا هو تطبيق يهدف الي تذكير المسلمين بالصلاة خصوصا امثالي من هم جالسون امام الكمبيوتر لفترات طويلة بحسب طبيعة عملي
            <br>
            يقوم التطبيق بتذكيرك بوقت الصلاة و محاولة منعك من القيام بأي شىء علي الكمبيوتر لمدة من الوقت حتي تقوم و تؤدي  صلاتك اخي المسلم . طبعا لا ننسى انا هذا فقط سبب و انت اخي عليك الجهد الاكبر في مقوامة نفسك و التغلب عليها
          </p>
          <router-link :to="{name:'setup-2'}" class="btn young-passion-gradient btn-rounded white-text">
            <span class="h6 mb-0">            التالي
            </span>
          </router-link>
        </div>
        <div class="col-md-4">
          <img width="250" src="/media/img_1.png" alt="" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setup",
  mounted() {
    this.$store.commit("SET_TITLE","مرحبا في صلاتي أولا")
  }
}
</script>

<style scoped>

</style>