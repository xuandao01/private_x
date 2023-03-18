<template>
  <div class="app">
    <TheMenu/>
    <TheHeader/>
    <TheContent/>
    <MToastItem :toastMess="ToastControl.toastMess" :kindOfToast="ToastControl.toastType" v-if="ToastControl.isShow" />
  </div>
</template>

<script>
import TheContent from './layout/TheContent.vue'
import TheHeader from './layout/TheHeader.vue'
import TheMenu from './layout/TheMenu.vue'
import MToastItem from '../src/components/base-component/MToastItem.vue'
import { toastControl } from './store/toast.js'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheMenu,
    TheContent,
    MToastItem
  },

  setup(){
    const ToastControl = toastControl();
    return {
      ToastControl
    }
  },

  methods: {
    
  },
  
  data() {
    return {
      isShow: false,
    }
  },

  provide(){
    return {
      // showToastMsg: this.showToast
    }
  },
}
</script>

<style>
  @import url("./css/main.css");
</style>
