<template>
  <div class="app">
    <TheMenu/>
    <TheHeader/>
    <TheContent/>
  </div>
</template>

<script>
import TheContent from './layout/TheContent.vue'
import TheHeader from './layout/TheHeader.vue'
import TheMenu from './layout/TheMenu.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheMenu,
    TheContent
  }
}
</script>

<style>
  @import url("./css/main.css");
</style>
