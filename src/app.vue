<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    watch: {
      '$route' (to, from) {
        console.log('router change');
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
