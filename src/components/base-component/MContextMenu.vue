// Component tạo context menu

<template>
  <div ref="main" class="edit-menu">
    <div class="edit-menu__item item1">Nhân bản</div>
    <div class="edit-menu__item item2 deleteRecord" @click="deleteAction">Xóa</div>
    <div class="edit-menu__item item3">Ngừng sử dụng</div>
  </div>
</template>
<script>
export default {
  name:"MContextMenu",
  methods: {
    /**
     * Hàm set vị trí hiển thị cho context menu
     * @param x x
     * @param y y
     * Author: Xuân Đào (12/03/2023)
     */
    setPosition(x, y){
      this.$refs.main.style.right = x + "px";
      this.$refs.main.style.top = y + "px";
    },
    deleteAction(){
      this.$emit("deleteAction");
    }
  },
  data() {
    return {
      showContext: false
    }
  },
};
</script>
<style scoped>
.edit-menu {
  position: fixed;
  width: 175px;
  right: 0px;
  top: 0px;
  background-color: #fff;
  z-index: 10;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  display: block;
  overflow: auto;
}

.edit-menu__item {
  top: 0px;
  height: 32px;
  position: relative;
  padding: 8px 8px 0px 8px;
}

.edit-menu__item:hover {
  background-color: rgba(80, 184, 60, 0.1);
  cursor: pointer;
}


</style>