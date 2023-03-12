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
    }
}
</script>
<style scoped>
    
</style>