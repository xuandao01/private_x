<template>
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
</template>
<script>
import MGridData from '../base-component/MGridData.vue'
export default {
    components: {
        MGridData
    }
}
</script>
<style scoped>
    
</style>