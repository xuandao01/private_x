<template>
  <div class="content" ref="content">
    <!-- Phần hiển thị nội dung của bảng -->
    <div class="content-header">
      <div class="content-title">Nhân viên</div>
      <div class="content-button">
        <!-- Button thêm mới nhân viên -->
        <button class="btn-add" id="add_employee" @click="showNewPopup">
          <div class="text">Thêm mới nhân viên</div>
        </button>
      </div>
    </div>
    <!-- Phần hiển thị nội dung chính của table -->
    <div class="content-main">
      <div class="content-main__header">
        <div class="input-component">
          <input
            type="text"
            class="search"
            placeholder="Tìm theo mã, tên nhân viên"
          />
          <div class="icon search-icon"></div>
        </div>
        <div @click="renewData" title="Tải lại" class="icon reload-icon"></div>
      </div>
      <div class="content-main__data">
        <MGridData
          ref="gridData"
          api="https://localhost:7006/api/Employees/Filter?pageSize=20&pageNumber=1"
          :data="[
            {
              title: 'Mã nhân viên',
              dataField: 'EmployeeCode',
              dataType: 'text',
              colWidth: '150',
            },
            {
              title: 'Tên nhân viên',
              dataField: 'FullName',
              dataType: 'text',
              colWidth: '300',
            },
            {
              title: 'Giới tính',
              dataField: 'GenderName',
              dataType: 'text',
              colWidth: '150',
            },
            {
              title: 'Ngày sinh',
              dataField: 'DateOfBirth',
              dataType: 'date',
              colWidth: '200',
            },
            {
              title: 'Số CMND',
              dataField: 'IdentityNumber',
              dataType: 'text',
              colWidth: '200',
            },
            {
              title: 'Ngày cấp',
              dataField: 'IdentityDate',
              dataType: 'date',
              colWidth: '200',
            },
            {
              title: 'Nơi cấp',
              dataField: 'IdentityPlace',
              dataType: 'text',
              colWidth: '200',
            },
            {
              title: 'Chức danh',
              dataField: 'PositionName',
              dataType: 'text',
              colWidth: '200',
            },
            {
              title: 'Tên đơn vị',
              dataField: 'DepartmentName',
              dataType: 'text',
              colWidth: '300',
            },
            {
              title: 'Số tài khoản',
              dataField: '',
              dataType: 'text',
              colWidth: '200',
            },
            {
              title: 'Tên ngân hàng',
              dataField: '',
              dataType: 'text',
              colWidth: '200',
            },
            {
              title: 'Chi nhánh tài khoàn ngân hàng',
              dataField: '',
              dataType: 'text',
              colWidth: '300',
            },
          ]"
          :isFixedStart="true"
          :isFixedEnd="true"
          @deleteRc="this.deleteRecord"
          @dbClicked="editOnDbClick"
          :muiltiple-select="true"
          :editable="true"
        ></MGridData>
      </div>
      <div class="content-main__footer">
        <MPagination></MPagination>
      </div>
    </div>
    <MEmployeeDetail
      ref="empDetail"
      v-if="isShowPopup"
      @hidePopup="closePopup"
      :employeeSelected="selectedEmployee"
      @enableToast="showToastMessage"
      @refreshData="reloadData"
    ></MEmployeeDetail>
    <MDeleteConfirmDialog
      v-if="deleteDialog"
      @hideDeleteDialog="this.closeDeleteDialog()"
      @hideAndDelete="this.closeAndDelete()"
      :empName="this.selectedEmployee.EmployeeCode"
    ></MDeleteConfirmDialog>
  </div>
</template>
<script>
import MGridData from "../base-component/MGridData.vue";
// import { ToastType } from '../base-component/MToastItem.vue';
import MDeleteConfirmDialog from "./MConfirmDeleteDialog.vue";
import { toastControl } from '@/store/toast'
import MEmployeeDetail from "./MEmployeeDetail.vue";
import { ToastType } from '../base-component/MToastItem.vue';
import MPagination from "../base-component/MPagination.vue";
export default {
  // inject:['showToastMsg'],
  setup(){
    const ToastControl = toastControl();
    return {
      ToastControl
    }
  },
  components: {
    MGridData,
    MDeleteConfirmDialog,
    MEmployeeDetail,
    MPagination
  },
  created() {
    fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
      .then((res) => res.json())
      .then((data) => {
        this.employees = data;
      });
    window.addEventListener("keydown", this.handleKeyDown);
  },

  unmounted() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  watch:{
    data: function(newVal){
      console.log(newVal);
    }
  },

  methods: {
    /**
     * Hàm format việc hiển thị ngày tháng đúng định dạng
     * @param data dữ liệu ngày cần format
     *
     * Author: Xuân Đào (02/03/2023)
     */
    formatDate(data) {
      const dateVal = new Date(data);
      const date = dateVal.getDate();
      const month = dateVal.getMonth() + 1;
      const fyear = dateVal.getFullYear();
      return `${date}/${month}/${fyear}`;
    },
    /**
     * Hàm hiển thị popup thêm nhân viên
     * @author Xuân Đào 02.03.2023
     */
    showPopup() {
      this.isShowPopup = true;
    },

    /**
     * Hàm hiển thị popup thêm nhân viên
     * Author: Xuân Đào (02/03/2023)
     */
    showNewPopup() {
      // this.showToastMsg(ToastType.Success, "Thêm mới thành công !");
      this.selectedEmployee = null;
      this.isShowPopup = true;
    },

    /**
     * Hàm làm mới dữ liệu
     */
    reloadData() {
      this.$refs.gridData.loadData();
    },

    renewData() {
      this.$refs.gridData.refreshData();
    },

    reloadDataWithoutLoading() {
      fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
        .then((res) => res.json())
        .then((data) => {
          this.employees = data;
        });
    },

    /**
     * Hàm đóng thị popup thêm nhân viên
     * Author: Xuân Đào (02/03/2023)
     */
    closePopup() {
      this.isShowPopup = false;
    },

    /**
     * Hàm double click để sửa 1 nhân viên
     * @param employee Lấy ra nhân viên được click
     * Author: Xuân Đào (02/03/2023)
     */
    editOnDbClick(employee) {
      this.selectedEmployee = employee;
      this.showPopup();
    },

    /**
     * Hàm hiển thị context menu
     *
     * Author: Xuân Đào
     */
    editOnClick(event) {
      event.target.nextElementSibling.style.display = "block";
      event.target.addEventListener("focusout", () => {
        setTimeout(() => {
          event.target.nextElementSibling.style.display = "none";
        }, 300);
      });
    },
    /**
     * Hàm xử lý phím tắt
     */
    handleKeyDown(event) {
      // console.log(event.keyCode);
      if (!this.lastKeyPress) {
        this.lastKeyPress = event.keyCode;
        this.lastTimePress = new Date();
      } else {
        if (new Date() - this.lastTimePress < 1000) {
          if (this.lastKeyPress == 17 && event.keyCode == 49) {
            // ctrl + 1
            event.preventDefault();
            this.showPopup();
          }
        } else {
          this.lastKeyPress = event.keyCode;
          this.lastTimePress = new Date();
        }
      }
    },

    /**
     * Hàm hiển thị thông báo toast
     */
    showToastMessage(toastKind, toastMess) {
      this.toastKind = toastKind;
      this.toastMess = toastMess;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 5000);
    },

    /**
     * Hàm xóa một bản ghi trong database
     *
     * Author: Xuân Đào (07/03/2023)
     */
    deleteRecord(employee) {
      this.showDeleteDialog();
      this.selectedEmployee = employee;
      console.log("a");
    },
    /**
     * Hàm hiển thị xác nhận xóa
     *
     * Author: Xuân Đào (08/03/2023)
     */
    showDeleteDialog() {
      this.deleteDialog = true;
    },

    /**
     * Ẩn popup xác nhận xóa
     *
     * Author: Xuân Đào (08/03/2023)
     */
    closeDeleteDialog() {
      this.deleteDialog = false;
    },

    /**
     * Ẩn popup và xóa record
     */
    async closeAndDelete() {
      this.closeDeleteDialog();
      try {
        const apiString =
          "https://apidemo.laptrinhweb.edu.vn/api/v1/Employees/" +
          this.selectedEmployee.EmployeeId;
        const options = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        const res = await fetch(apiString, options);
        if (res.status === 200) {
          this.ToastControl.showToastMsg(ToastType.Success, "Xoá thành công!");
          this.renewData();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      employees: [],
      isShowPopup: false,
      selectedEmployee: null,
      showLoading: true,
      lastKeyPress: null,
      lastTimePress: null,
      showToast: false,
      // toastKind: ToastType.Success,
      toastMess: "",
      deleteDialog: false,
      showData: true,
    };
  },
};
</script>
<style scoped>
</style>