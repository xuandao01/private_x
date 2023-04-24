// component dùng để hiển thị data dưới dạng grid với dữ liệu được truyền vào thông qua api
// Props: data bao gồm dữ liệu về tên các cột cần có, modelName tương ứng với các cột, loại cột, độ rộng cột.
// @author  Xuân Đào (12/03/2023)
<template>
  <div class="grid-viewer" ref="gridViewer" @click="getClickedPosition">
    <div class="grid-viewer__scroll">
      <table class="grid-table" ref="gridTable">
        <thead ref="tableThead">
          <tr class="grid-title">
            <th
              class="multiple-select"
              :class="{ 'fix-start': isFixedStart }"
              v-if="muiltipleSelect"
            >
              <MCheckbox ref="parentCheckbox" @click="parentCheckBoxOnClick"></MCheckbox>
              <div class="rightBorder"></div>
            </th>
            <th
              :class="item.dataType"
              v-for="(item, index) in data"
              :key="index"
              :title="item.tooltip"
            >
              {{ item.title }}
            </th>
            <th
              class="editable"
              :class="{ 'fix-end': isFixedEnd }"
              v-if="editable"
            >
              Chức năng
              <div class="leftBorder"></div>
            </th>
          </tr>
        </thead>
        <tbody ref="tableBody">
          <MGridDataLoading v-if="showLoading"></MGridDataLoading>
          <tr v-for="(item, index) in gridData" :key="index" 
          @click="itemOnClick(item, index)"
          :class="{'tr-selected': index == 0 && isFocusFirst}"
          >
            <td
              v-if="muiltipleSelect"
              :class="{ 'fix-start': isFixedStart }"
              v-show="showData"
            >
              <MCheckbox @click="checkBoxOnClick(item)">
              </MCheckbox>
              <div class="rightBorder"></div>
            </td>
            <td
              :class="[value.dataType] "
              v-for="(value, index) in data"
              :key="index"
              v-show="showData"
              @dblclick="editOnDbClick(item)"
            >
            <!-- <input class="grid-input" :class="{'disable-editor': !canEditValue, 'enable-editor': canEditValue}" type="text" :value="item[value.dataField]"> -->
            {{ item[value.dataField] }}
            </td>
            <td
              class="editable"
              :class="{ 'fix-end': isFixedEnd }"
              v-if="editable"
              v-show="showData"
            >
              <div class="edit">
                <div class="edit-text" @click="editOnDbClick(item)">Sửa</div>
                <div
                  tabindex="0"
                  class="edit-icon"
                  @click="editOnClick(item)"
                  @blur="editOnBlur"
                ></div>
              </div>
              <div class="leftBorder"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <MContextMenu
      ref="context"
      @deleteEvent="deleteRowData"
      @duplicateEvent="duplicateData"
      v-show="showContext"
    ></MContextMenu>
  </div>
</template>
<script>
import MGridDataLoading from "../unit-components/MGridDataLoading.vue";
import MContextMenu from "./MContextMenu.vue";
import MCheckbox from "./MCheckbox.vue";
import { deleteType } from '../unit-components/MConfirmDeleteDialog.vue';
import { multipleSelectedData } from "@/store/multipleDeleteEmployee";
import { loader } from "@/store/loader";

export default {
  name: "MGridData",

  emits: ['update:totalRecord', 'update:enableMultipleEditor'],

  setup(){
    const SelectedList = multipleSelectedData()
    const Loader = loader()
    return {
      SelectedList, Loader
    }
  },

  components: {
    MContextMenu,
    MGridDataLoading,
    MCheckbox,
  },

  props: {
    // Api lấy dữ liệu cho grid data
    api: {
      type: String,
      required: true,
    },

    // Dữ liệu mapping với api
    data: {
      type: Object,
      required: true,
    },

    // Fix cột đầu tiên trong grid
    isFixedStart: {
      type: Boolean,
      required: false,
      default: false,
    },

    // Fix cột cuối cùng trong grid
    isFixedEnd: {
      type: Boolean,
      required: false,
      default: false,
    },

    // Grid ao gồm gột chọn nhiều hay không
    muiltipleSelect: {
      type: Boolean,
      required: false,
      default: false,
    },

    // Grid gồm gột chức năng hay không
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },

    canEditValue: {
      type: Boolean,
      required: false,
      default: false,
    },

    isFocusFirst:{
      type: Boolean,
      requried: false,
      default: false,
    }
  },
  /**
   * Lấy dữ liệu từ api và đổ vào data
   *
   * @author  Xuân Đào(12/03/2023)
   */
  created() {
    this.getApiData();
  },

  /**
   * Định dạng dữ liệu tiêu đề
   *
   * @author  Xuân Đào(12/03/2023)
   */
  mounted() {
    let totalWidth = 0;
    if (!this.muiltipleSelect) {
      for (let i = 0; i < this.data.length; i++) {
        this.$refs.tableThead.children[0].children[i].style.width =
          this.data[i].colWidth + "px";
        if (parseInt(this.data[i].colWidth))
          totalWidth += parseInt(this.data[i].colWidth);
        if (this.data[i].dataType == "date") {
          this.$refs.tableThead.children[0].children[i].classList.add(
            "align-center"
          );
        }
      }
    } else {
      for (let i = 0; i < this.data.length; i++) {
        this.widthList.push(this.data[i].colWidth);
        this.$refs.tableThead.children[0].children[i + 1].style.width =
          this.data[i].colWidth + "px";
        if (parseInt(this.data[i].colWidth))
          totalWidth += parseInt(this.data[i].colWidth);
        if (this.data[i].dataType == "date") {
          this.$refs.tableThead.children[0].children[i + 1].classList.add(
            "align-center"
          );
        }
      }
    }
    this.$refs.gridViewer.style.minWidth = totalWidth + "px";
    //
    /*eslint-disable no-debugger */
    // debugger
  },

  watch: {
    api: function(){
      this.getApiData();
    }
  },

  data() {
    return {
      gridData: null,
      showContext: false,
      cursor_y: 0,
      formated: false,
      showLoading: true,
      showData: true,
      selected: null,
      selectedData: null,
      apiString: null,
      selectedMultiple: [],
      selectedMultipleRow: [],
      widthList:[],
    };
  },
  methods: {

    formatMoney(amount, decimalCount = 0, decimal = "", thousands = ".") {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      const negativeSign = amount < 0 ? "-" : "";
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    },

    async getApiData(){
    if(this.api){
      this.showLoading = true;
      try {
        let data = await (await fetch(this.api)).json();
        this.gridData = data.data;
        if (this.gridData[0]){
          let total_record = this.gridData[0]['total_record'];
          this.$emit('refresh', total_record);
          for(let i=0;i<this.data.length;i++){
            if (this.data[i]['dataType'] === 'date'){
              for(let j=0;j<this.gridData.length;j++){
                this.gridData[j][this.data[i]['dataField']] = this.dateFormator(this.gridData[j][this.data[i]['dataField']]);
                this.gridData[j].re_no = j;
              }
            }
            if (this.data[i]['dataType'] === 'd-money'){
              for(let j=0;j<this.gridData.length;j++){
                this.gridData[j][this.data[i]['dataField']] = this.formatMoney(this.gridData[j][this.data[i]['dataField']]);
              }
            }
          }
          for(let j=0;j<this.gridData.length;j++){
            this.gridData[j].re_no = j;
          }
        }
        this.showLoading = false;
        this.gridOnLoaded();
        this.apiString = this.api;
      } catch (ex) {
        console.log(ex);
      }
    }
    },

    gridOnLoaded(){
      this.$emit("loadCompleted");
      if (this.isFocusFirst){
        this.selected = this.$refs.tableBody.children[0];
        this.selected.classList.add("tr-selected");
        this.selectedData = this.gridData[0];
      }
    },

    /**
     * Hàm xử lý checkbox gridData
     * 
     * @author Xuân Đào (04/04/2023)
     */

    handleCheckboxOnLoad(data){
      let elm = [];
      if (this.$refs.tableBody)
        elm = this.$refs.tableBody.children;
      for(let i=0;i<elm.length;i++){
        elm[i].classList.remove("checked-item");
        elm[i].children[0].children[0].classList.remove("checked");
      }
      for(let i=0;i<this.SelectedList.selectedItemList.length;i++){
        if (this.isExitsItemInArray(data, this.SelectedList.selectedItemList[i]) !== -1){
          elm[this.isExitsItemInArray(data, this.SelectedList.selectedItemList[i])].classList.add("checked-item");
          elm[this.isExitsItemInArray(data, this.SelectedList.selectedItemList[i])].children[0].children[0].classList.add("checked");
        }
      }
    },

    /**
     * Hàm kiểm tra item có tồn tại trong array
     * 
     * @author Xuân Đào (04/04/2023)
     */
    isExitsItemInArray(arr, item){
      for (let i=0;i<arr.length;i++){
        if (arr[i]['EmployeeId'] == item['EmployeeId']) return i;
      }
      return -1
    },

    /**
     * Hàm nhân bản dữ liệu 
     * 
     * @author Xuân Đào (04/04/2023)
     */
    duplicateData(){
      this.$emit("duplicateData", this.selectedData);
    },

    /**
     * Hàm xử lý ô checkbox cha
     * 
     * @author Xuân Đào (04/04/2023)
     */
    parentCheckBoxOnClick(){
      let data = this.$refs.tableBody.children;
      if (this.$refs.parentCheckbox.checked){
        for (let i=0;i<data.length;i++){
          data[i].classList.add("checked-item");
          data[i].children[0].children[0].classList.add("checked");
          if (!this.selectedMultipleRow.includes(data[i])){
            this.selectedMultipleRow.push(data[i]);
            this.SelectedList.addItem(this.gridData[i]);
          }
        }
      } else {
        for (let i=0;i<data.length;i++){
          data[i].classList.remove("checked-item");
          data[i].children[0].children[0].classList.remove("checked");
          if (this.selectedMultipleRow.includes(data[i])){
            this.selectedMultipleRow = this.removeItemFromArr(this.selectedMultipleRow, this.selectedMultipleRow.indexOf(data[i]));
            this.SelectedList.selectedItemList = [];
          }
        }
      }
      this.$emit('selectMultiple', this.selectedMultipleRow.length);
    },

    getSelectedList(){
      return this.SelectedList.selectedItemList;
    },

    /**
     * Hàm xóa các hàng được chọn
     * 
     * @author Xuân Đào (04/04/2023)
     */
    deleteSelectedMultipleRow(){
      this.selectedMultipleRow.forEach(el => {
        el.remove();
      })
      this.selectedMultipleRow = [];
      this.SelectedList.selectedItemList = [];
    },

    /**
     * Hàm xóa 1 hàng
     * 
     * @author Xuân Đào (04/04/2023)
     */
    deleteSelectedRow(){
      this.selected.remove();
    },
    
    /**
     * Hàm click checkbox
     * 
     * @author Xuân Đào (04/04/2023)
     */
    checkBoxOnClick(item) {
      let targetEl = event.target.parentElement.parentElement
      if (this.SelectedList.selectedItemList.includes(item)) {
        this.selectedMultipleRow = this.removeItemFromArr(this.selectedMultipleRow, this.SelectedList.selectedItemList.indexOf(item));
        this.SelectedList.removeItemFromList(this.SelectedList.selectedItemList.indexOf(item));
        targetEl.classList.remove("checked-item");
      } else {
        this.SelectedList.addItem(item);
        this.selectedMultipleRow[this.selectedMultipleRow.length] = targetEl;
        targetEl.classList.add("checked-item");
      }
      this.$emit('selectMultiple', this.selectedMultipleRow.length);
    },

    /**
     * Hàm xóa 1 item khỏi array
     * 
     * @author Xuân Đào (04/04/2023)
     */
    removeItemFromArr(proxy, index) {
      let arr = [];
      for (let i = 0; i < proxy.length; i++) {
        if (i !== index) {
          arr.push(proxy[i]);
        }
      }
      return arr;
    },

    /**
     * Hàm lấy giới tính theo mã
     * @param {mã giới tính} genderCode
     * @author Xuân Đào (20/03/2023)
     */

    getGenderName(genderCode) {
      switch (genderCode) {
        case 0:
          return "Nữ";
        case 1:
          return "Nam";
        case 2:
          return "Khác";
        case 3:
          return "";
      }
    },

    /**
     * Ẩn context menu
     *
     * @author Xuân Đào (20/03/2023)
     */

    editOnBlur() {
      event.target.parentElement.classList.remove("tr-selected");
      setTimeout(() => {
        this.showContext = false;
      }, 300);
    },

    /**
     * Set vị trí hiển thị cho con text menu
     *
     * @author Xuân Đào (20/03/2023)
     */

    editOnClick(item) {
      this.getClickedPosition(event);
      this.$refs.context.setPosition(50, this.cursor_y + 15);
      this.showContext = true;
      this.selectedData = item;
      this.selected = event.target.parentElement.parentElement.parentElement;
    },

    /**
     * Xử lý sự kiện click vào các hàng trong table
     *
     * @author  Xuân Đào (14/03/2023x)
     */
    itemOnClick(item, index) {
      /*eslint-disable no-debugger */
      // debugger
      this.$refs.tableBody.children[0].classList.remove("tr-selected");
      if (this.selected === null) this.selected = this.$refs.tableBody.children[index];
      else {
        this.selected.classList.remove("tr-selected");
        this.selected = this.$refs.tableBody.children[index];
      }
      this.selected.classList.add("tr-selected");
      this.selectedData = item;
      this.$emit("gridItemClicked", item);
    },
    /**
     * Hàm định dạng dữ liệu ngày tháng
     *
     * @author  Xuân Đào (12/03/2023)
     */
    dateFormator(date) {
      const data = new Date(date);
      if (data.toDateString() !== "Invalid Date") {
        let dateVal = data.getDay() + 1;
        let month = data.getMonth() + 1;
        const year = data.getFullYear();
        dateVal = dateVal < 10 ? "0"+dateVal:dateVal;
        month = month < 10 ? "0"+month:month;
        return `${dateVal}/${month}/${year}`;
      } else return "";
    },

    /**
     * Hàm hiển thị contextmenu
     *
     * @author  Xuân Đào (12/03/2023)
     */
    showContextMenu() {
      this.showContext = true;
    },

    /**
     * Hàm ẩn contextmenu
     *
     * @author  Xuân Đào (12/03/2023)
     */
    hideContextMenu() {
      this.showContext = false;
    },

    /**
     * Hàm lấy dữ liệu vị trí click chuột
     *
     * @author  Xuân Đào (12/03/2023)
     */
    getClickedPosition(event) {
      this.cursor_y = event.clientY;
    },

    /**
     * Hàm ẩn animation loading khi load xong dữ liệu
     *
     * @author  Xuân Đào (12/03/2023)
     */
    hideLoadingSkeleton() {
      this.showLoading = false;
    },

    /**
     * Hàm làm mới dữ liệu
     *
     * @author  Xuân Đào (12/03/2023)
     */
    async refreshData(api) {
      try {
        this.apiString = api;
        this.showLoading = true;
        this.showData = false;
        let rawData = await (await fetch(this.apiString)).json();
        this.gridData = await rawData.data;
        this.$emit('refresh', rawData.totalRecord.TotalRecord);
        this.showLoading = false;
        setTimeout(() => {
          this.handleCheckboxOnLoad(this.gridData);
        }, 100);
        this.showData = true;
      } catch (ex) {
        console.log(ex);
      }
    },

    /**
     * Hàm hiển thị form sửa khi nhấn double click
     *
     * @author  Xuân Đào (12/03/2023)
     */
    editOnDbClick(item) {
      this.$emit("dbClicked", item);
    },

    /**
     * Hàm xóa một bản ghi
     *
     * @author  Xuân Đào (12/03/2023)
     */
    deleteRowData() {
      this.$emit("deleteRc", this.selectedData, deleteType.singleDelete);
    },

    /**
     * Hàm kiểm tra số hàng còn lại trong grid
     *
     * @author  Xuân Đào (12/03/2023)
     */
    getRemainingRow(){
      return this.$refs.tableBody.children.length;
    }
  },
};
</script>
<style scoped>

.first-data{
  border-left: unset;
}

.multiple-select {
  width: 30px;
}

.editable {
  width: 150px;
  text-align: center;
}

.edit-text {
  cursor: pointer;
  margin-left: 15px;
}

.checked-item, .checked-item td:first-child, .checked-item td:last-child{
    background-color: #e5f3ff;
    z-index: 3;
}

.rightBorder{
  height: 100%;
  width: 0.5px !important;
  background-color: #bfbfbf;
  z-index: 99;
  top: 0;
  right: -1px;
  position: absolute;
}

/* tr td:first-child{
  border-right: unset;
} */

.leftBorder{
  height: 100%;
  width: 0.5px;
  background-color: #bfbfbf;
  z-index: 999;
  top: 0;
  left: -0.5px;
  position: absolute;
}

.disable-editor{
  pointer-events: none;
  padding: 0 !important;
}

.enable-editor:focus{
  border: solid #2ca01c 1px;
  border-radius: 4px;
  background-color: #fff;
}

.grid-input{
  border: unset;
  outline: unset;
  line-height: 26px;
  height: 26px;
  padding-left: 8px;
  background-color: unset;
  font-size: 14px;
  font-family: Notosans;
}

</style>