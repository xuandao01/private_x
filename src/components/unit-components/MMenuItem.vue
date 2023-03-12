// Component hiển thị một menu item trong menu chính
// Author: Xuân Đào (05/03/2023)
<template>
  <div class="menu-item">
    <!-- Phần hiển thị icon -->
    <div class="menu-item__icon">
      <MIcon :class="'icon ' + {iconName}" />
    </div>
    <!-- Phần hiển thị text -->
    <div class="menu-item__context">{{ menuText }}</div>
  </div>
</template>
<script>
import MIcon from '../base-component/MIcon.vue';
export default {
    components:{
      MIcon
    },
    created(){
      
    },
    props:['iconName', 'menuText']
};
</script>
<style>
</style>