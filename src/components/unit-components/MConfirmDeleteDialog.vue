// Component hiển thị cảnh báo xác nhận khi dữ liệu bị thay đổi
// Author: Xuân Đào (05/03/2023)
<template>
    <div class="dialog" id="confirmDialog">
        <div class="dialog-content">
            <div class="dialog-main">
                <div class="dialog-top">
                    <div class="dialog-delete-icon"></div>
                    <div class="dialog-message">
                        <div class="dialog-message__title">
                            <div class="title">{{ `${txtData.confirmDelete} <${this.empName}> không ?` }} </div>
                        </div>
                    </div>
                </div>
                <div class="mess-line"></div>
                <div class="dialog-bottom">
                    <button class="btn-optional" id="cancelBtn" @click="this.closeConfirmDialog()">{{ txtBtn.no }}</button>
                    <div class="btn-group">
                        <button class="btn-default" id="confirmBtn" @click="this.closeAndDelete()" >{{ txtBtn.yes }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import resources from '@/js/resources';
export default {
    name: "DeleteConfirmDialog",
    props: {
        empName: {
            type: String, 
            required: true,
            default: "",
        }
    },
    methods:{
        /**
         * Hàm đóng confirm dialog
         * 
         * Author: Xuân Đào (05/03/2023)
         */
        closeConfirmDialog(){
            this.$emit("hideDeleteDialog");
        },

        /**
         * Hàm đóng confirm dialog, đóng popup và lưu toàn bộ thay đổi 
         * 
         * Author: Xuân Đào (05/03/2023)
         */
        closeAndDelete(){
            this.$emit("hideAndDelete");
        }
    },
    data() {
        return {
            txtData: resources.vi.dialogMessage,
            txtBtn: resources.vi.btnAction
        }
    },
}
</script>
<style scoped>
.dialog {
  height: 100vh;
  width: 100%;
  background-color: rgba(82, 82, 82, 0.5);
  position: fixed;
  z-index: 33;
}

.dialog-content {
  height: 176px;
  width: 550px;
  background-color: #fff;
  position: absolute;
  top: calc((80% - 176px) / 2);
  left: calc((90% - 550px) / 2);
  border-radius: 4px;
}

.dialog-main {
  height: 136px;
  width: 510px;
  position: absolute;
  margin: 20px;
}

.dialog-top {
  height: calc(100% - 60px - 48px);
  width: calc(100% - 48px);
  margin: 22px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  column-gap: 24px;
}

.dialog-icon {
  height: 42px;
  width: 44px;
}

.dialog-message {
  width: calc(100% - 38px - 8px);
  display: flex;
  flex-direction: column;
  row-gap: 22px;
}

.dialog-message__title {
  height: 26px;
  font-size: 16px;
  width: 100%;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  left: -10px;
}

.dialog-message__title .icon {
  margin: 0px;
}

.dialog .mess-line {
  height: 20px;
  width: 100%;
  border-bottom: 1px solid #b8bcc3;
  margin-bottom: 10px;
}

.dialog-bottom {
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 10px;
}

.dialog-bottom button {
  height: 28px;
  padding: 4px 16px;
  font-weight: 600;
}

.dialog-bottom .btn-optional {
  border: solid #e0e0e0 1px;
  color: #212121;
  border-radius: 4px;
  border: 1px solid #babec5;
  color: #111;
  background-color: transparent;
}

.dialog-bottom .btn-optional:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}

.dialog-bottom button:last-child {
  margin-left: 10px;
}
</style>