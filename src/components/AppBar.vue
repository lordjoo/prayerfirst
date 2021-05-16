<template>
<div id="app-bar">
  <!--Navbar-->
  <nav class="navbar navbar-expand-lg navbar-light white shadow-sm d-flex justify-content-between align-items-center  px-1 py-1">
    <!-- Navbar brand -->
    <div class="navbar-brand d-flex align-items-center">
      <img width="45" src="/assets/img/icon.svg" alt="">
      <h5 class="mb-0 mx-3 app-bar-title">{{ $store.state.title }}</h5>
    </div>
    <!-- Collapse button -->
    <div class="actions">
      <button class="btn btn-link px-0 py-0" type="button">
        <span class="mdi mdi-cog-outline mdi-24px"></span>
      </button>

      <button @click="closeWindow" class="btn btn-link px-0 py-0" type="button">
        <span class="mdi mdi-close-circle-outline mdi-24px red-text"></span>
      </button>
    </div>

  </nav>
  <!--/.Navbar-->
</div>
</template>

<script>
export default {
  name: "AppBar",
  methods:{
    closeWindow:function () {
      window.ipcRenderer.send("close_window")
    }
  }
}
</script>

<style scoped>

#app-bar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

#app-bar a,#app-bar button {
  -webkit-app-region: no-drag;
}

</style>