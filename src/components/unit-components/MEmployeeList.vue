<template>
  <div class="content">
    <!-- Phần hiển thị nội dung của bảng -->
    <div class="content-header">
      <div class="content-title">Nhân viên</div>
      <div class="content-button">
        <!-- Button thêm mới nhân viên -->
        <button class="btn-add" id="add_employee">
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
        <div
          title="Tải lại"
          class="icon reload-icon"
        ></div>
      </div>
    <div class="content-main__data">
        <MGridData
          api="https://apidemo.laptrinhweb.edu.vn/api/v1/Employees"
          :data="{
            colName:['','Mã nhân viên', 'Tên nhân viên', 'Giới tính', 'Ngày sinh', 'Số CMND', 'Chức danh', 'Tên đơn vị', 'Số tài khoản', 'Tên Ngân hàng', 'Chi nhánh tài khoản ngân hàng','Chức năng'],
            modelName:['','EmployeeCode', 'FullName', 'GenderName', 'DateOfBirth', 'IdentityNumber', 'PositionName', 'DepartmentName', '', '', '',''],
            colType:['checkbox','text', 'text', 'text', 'date', 'text', 'text', 'text','text','text','text','option'],
            colWidth:['40','200', '250', '150', '200', '200', '200', '300','200','200','300','150'],
          }"
          :isFixedStart="true"
          :isFixedEnd="true"
        ></MGridData>
      </div>
      <div class="content-main__footer">
        <div class="part1">
          Tổng số: <b id="numberOfRecord"> 1</b> bản
          ghi
        </div>
        <div class="part2">
          <div>
            <div class="combobox" id="combobox-paging">
              <div
                class="combobox-text"
                tabindex="1"
                @click="showHide"
                id="combobox-selected"
              >
                20 bản ghi 1 trang
              </div>
              <div class="combobox-itemList" id="comboboxOption">
                <div class="combobox-itemList__container">
                  <div class="combobox-item">10 bản ghi 1 trang</div>
                  <div class="combobox-item">20 bản ghi 1 trang</div>
                  <div class="combobox-item">30 bản ghi 1 trang</div>
                  <div class="combobox-item">50 bản ghi 1 trang</div>
                  <div class="combobox-item">100 bản ghi 1 trang</div>
                </div>
              </div>
              <div class="combo-icon">
                <div class="dropdown-icon icon"></div>
              </div>
            </div>
            <!-- <select class="combobox">
                            <option value="">10 bản ghi trên 1 trang</option>
                            <option value="" selected = "true">20 bản ghi trên 1 trang</option>
                            <option value="">30 bản ghi trên 1 trang</option>
                            <option value="">50 bản ghi trên 1 trang</option>
                            <option value="">100 bản ghi trên 1 trang</option>
                        </select> -->
          </div>
          <div class="page-number">
            <div class="previous">Trước</div>
            <div class="number">
              <div class="num page-seleted">1</div>
              <div class="num">2</div>
              <div class="num">3</div>
              <div class="num">...</div>
              <div class="num final">12</div>
            </div>
            <div class="next">Sau</div>
          </div>
        </div>
      </div>

    </div>
      <EmployeeDetail
      ref="empDetail"
      v-if="isShowPopup"
      @hidePopup="closePopup"
      :employeeSelected="selectedEmployee"
      @enableToast="showToastMessage"
      @refreshData="reloadData"
    ></EmployeeDetail>
    <MToastItem
      :kindOfToast="this.toastKind"
      :toastMess="this.toastMess"
      v-if="showToast"
    ></MToastItem>
    <MDeleteConfirmDialog
      v-if="deleteDialog"
      @hideDeleteDialog="this.closeDeleteDialog()"
      @hideAndDelete="this.closeAndDelete()"
      :empName="this.selectedEmployee.EmployeeCode"
    ></MDeleteConfirmDialog>
</div>
</template>
<script>
import MGridData from '../base-component/MGridData.vue'
import EmployeeDetail from "./MEmployeeDetail.vue";
// import MEmployeeLoading from "../components/unit-components/MEmployeeLoading.vue";
import MToastItem from "../base-component/MToastItem.vue";
import MDeleteConfirmDialog from "./MConfirmDeleteDialog.vue";
export default {
    components: {
        MGridData,
        EmployeeDetail,
        // MEmployeeLoading,
        MToastItem,
        MDeleteConfirmDialog,
    },
    created() {
    this.reloadData();
    window.addEventListener("keydown", this.handleKeyDown);
  },

  unmounted() {
    window.removeEventListener("keydown", this.handleKeyDown);
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
     * Author: Xuân Đào (02/03/2023)
     */
    showPopup() {
      this.isShowPopup = true;
      this.$refs.empDetail.actions = 1;
    },

    /**
     * Hàm hiển thị popup thêm nhân viên
     * Author: Xuân Đào (02/03/2023)
     */
    showNewPopup() {
      this.selectedEmployee = null;
      this.isShowPopup = true;
    },

    /**
     * Hàm làm mới dữ liệu
     */
    reloadData() {
      this.showLoadingPage();
      fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            this.employees = data;
            this.hideLoading();
          }, 1000);
        });
    },

    reloadDataNoneLoading() {
      fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            this.employees = data;
          }, 1000);
        });
    },

    refreshData() {
      (this.showData = false), this.showLoadingPage();
      fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            this.employees = data;
            (this.showData = true), this.hideLoading();
          }, 1000);
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
     * Hàm remove loading page
     *
     * Author: Xuân Đào
     */
    hideLoading() {
      this.showLoading = false;
    },

    /**
     * Hàm show loading page
     *
     * Author: Xuân Đào
     */
    showLoadingPage() {
      this.showLoading = true;
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
          this.showToastMessage("success", "Xóa thành công!");
          this.reloadDataNoneLoading();
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
      toastKind: "success",
      toastMess: "",
      deleteDialog: false,
      showData: true,
    }
  },
}
</script>
<style scoped>
    
</style>