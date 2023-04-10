// Component tạo context menu

<template>
  <div ref="main" class="edit-menu">
    <div class="edit-menu__item item1" @click="duplicateAction">{{ resources.vi.contextMenuAction.duplicate }}</div>
    <div class="edit-menu__item item2 deleteRecord" @click="deleteAction">{{ resources.vi.contextMenuAction.delete }}</div>
    <div class="edit-menu__item item3">{{ resources.vi.contextMenuAction.unuse }}</div>
  </div>
</template>
<script>
import resources from '@/js/resources';
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
      y = y > 800 ? y -= 154 : y;
      this.$refs.main.style.top = y + "px";
    },

    /**
     * Xự kiện xóa
     * 
     * @author Xuân Đào (04/04/2023)
     */
    deleteAction(){
      this.$emit("deleteEvent");
    },

    /**
     * Xự kiện nhân bản
     * 
     * @author Xuân Đào (04/04/2023)
     */
    duplicateAction(){
      this.$emit("duplicateEvent");
    }
  },
  data() {
    return {
      showContext: false,
      resources: resources,
    }
  },
};
</script>
<style scoped>
.edit-menu {
  position: fixed;
  width: 120px;
  right: 0px;
  top: 0px;
  background-color: #fff;
  z-index: 10;
  display: flex;
  flex-direction: column;
  display: block;
  border: solid 1px #b0b0b0;
  overflow: auto;
}

.edit-menu__item {
  top: 0px;
  height: 28px;
  line-height: 28px;
  font-size: 13px;
  position: relative;
  padding-top: 4px;
  padding-left: 8px;
}

.edit-menu__item:hover {
  background-color: rgba(80, 184, 60, 0.1);
  color: #2ca01c;
  cursor: pointer;
}


</style>