// Component hiển thị màn hình danh sách nhân viên
// Author: Xuân Đào (05/03/2023)
<template>
<div>
      <MEmployeeList></MEmployeeList>
  </div>
</template>
<script>

import MEmployeeList from '@/components/unit-components/MEmployeeList.vue';

export default {
  components: {
    MEmployeeList,
  },
  created() {
    // this.reloadData();
    // window.addEventListener("keydown", this.handleKeyDown);
  },

  unmounted() {
    // window.removeEventListener("keydown", this.handleKeyDown);
  },

  // data() {
  //   return {
  //     employees: [],
  //     isShowPopup: false,
  //     selectedEmployee: null,
  //     showLoading: true,
  //     lastKeyPress: null,
  //     lastTimePress: null,
  //     showToast: false,
  //     toastKind: "success",
  //     toastMess: "",
  //     deleteDialog: false,
  //     showData: true,
  //   };
  // },
};
</script>
<style scoped>
.edit-icon:focus {
  border: solid blue 1px;
}
</style>