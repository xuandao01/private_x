// component dùng để hiển thị data dưới dạng gridtree với dữ liệu được truyền vào thông qua api
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
              <MCheckbox
                ref="parentCheckbox"
                @click="parentCheckBoxOnClick"
              ></MCheckbox>
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
          <MGridDataLoading
            v-if="showLoading"
            :numOfColumn="this.data.length + 1"
          ></MGridDataLoading>
          <tr
            v-for="(item, index) in sortedData"
            :key="index"
            :ref="'item' + index"
            :class="{
              subElement: item.isSub,
              rootElement: !item.isSub,
              haveSub: item.haveSub,
            }"
            @click="itemOnClick(item, index)"
          >
            <td
              v-if="muiltipleSelect"
              :class="{ 'fix-start': isFixedStart }"
              v-show="showData"
            >
              <MCheckbox @click="checkBoxOnClick(item)"> </MCheckbox>
              <div class="rightBorder"></div>
            </td>
            <td
              v-for="(value, inx) in data"
              :key="inx"
              @dblclick="editOnDbClick(item)"
              :class="{
                subElm: item.isSub && inx == 0,
                subElm2: item.isSub && inx == 0 && item['DataLevel'] == 2,
                subElm3: item.isSub && inx == 0 && item['DataLevel'] >= 3,
              }"
            >
              <div class="td-contain">
                <MExpandCheckbox
                  @clicked="checkboxClicked(index)"
                  v-if="inx == 0"
                  :isShow="item.haveSub"
                ></MExpandCheckbox>
                {{ item[value.dataField] }}
              </div>
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
import { deleteType } from "../unit-components/MConfirmDeleteDialog.vue";
import MExpandCheckbox from "./MExpandCheckbox.vue";
import { sortedArray } from "@/store/sortedData";
import {
  AccountProperty,
  accountStatus,
} from "@/views/DI/MAccountList.vue";
import resources from "@/js/resources.js";

export default {
  name: "MGridData",

  emits: ["update:totalRecord", "update:enableMultipleEditor"],

  setup() {
    const SortedArray = sortedArray();
    return {
      SortedArray,
    };
  },

  components: {
    MContextMenu,
    MGridDataLoading,
    MCheckbox,
    MExpandCheckbox,
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
  },
  /**
   * Lấy dữ liệu từ api và đổ vào data
   *
   * @author  Xuân Đào(12/03/2023)
   */
  created() {
    try {
      this.getApiData();
      this.apiString = this.api;
    } catch (ex) {
      console.log(ex);
    }
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
  },

  data() {
    return {
      resources: resources,
      gridData: null,
      showContext: false,
      cursor_y: 0,
      showLoading: true,
      showData: true,
      selected: null,
      selectedData: null,
      apiString: null,
      sortedData: [],
      rootData: [],
      subData: [],
    };
  },
  methods: {
    checkboxClicked(index) {
      let i = index + 1;
      let next = true;
      const arrElement = this.$refs.tableBody.children;
      const mode = {
        collase: 0,
        expand: 1,
      }
      let actionMode = mode.expand;
      if (!this.isClassExist(event.target.classList, "collase")) actionMode = mode.collase;
      
      while (next) {
        if (actionMode == mode.expand){
          if (this.sortedData[index]["DataLevel"] === this.sortedData[i]["DataLevel"] - 1) {
            arrElement[i].classList.remove("subElement");
          }
        } else {
          if (this.sortedData[index]["DataLevel"] < this.sortedData[i]["DataLevel"]) {
            arrElement[i].classList.add("subElement");
            arrElement[i].children[0].firstChild.firstChild.classList.remove("collase");
          }
        }
        if (this.sortedData[index]["DataLevel"] === this.sortedData[i]["DataLevel"]) {
            next = false;
        }
        i++;
      }
    },

    isClassExist(list, className) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] == className) return true;
      }
      return false;
    },

    async getApiData() {
      let data = await (await fetch(this.api)).json();
      data.forEach((el) => {
        switch (el["status"]) {
          case accountStatus.using: {
            el.statusname = this.resources.vi.accountList.status.using;
            break;
          }
          case accountStatus.unuse: {
            el.statusname = this.resources.vi.accountList.status.unuse;
            break;
          }
        }
        switch (el["property"]) {
          case AccountProperty.Debt: {
            el.propertyname = this.resources.vi.accountList.props.Debt;
            break;
          }
          case AccountProperty.Excess: {
            el.propertyname = this.resources.vi.accountList.props.Excess;
            break;
          }
          case AccountProperty.Hermaphrodite: {
            el.propertyname = this.resources.vi.accountList.props.Hermaphrodite;
            break;
          }
          case AccountProperty.NoBalance: {
            el.propertyname = this.resources.vi.accountList.props.NoBalance;
            break;
          }
        }
        if (!el["dependency"]) {
          this.rootData.push(el);
          el.isSub = false;
          el.haveSub = false;
          el.DataLevel = 0;
          this.sortedData.push(el);
          // this.sortedArray.addItem(el);
        } else {
          this.subData.push(el);
        }
      });

      this.subData.forEach((el) => {
        let index = this.findParent(this.sortedData, el["dependency"]);
        /*eslint-disable no-debugger */
        // debugger
        this.sortedData[index].haveSub = true;
        el.haveSub = false;
        el.isSub = true;
        el.DataLevel = this.sortedData[index].DataLevel + 1;
        this.sortedData = this.insertToPosition(this.sortedData, index, el);
      });

      this.gridData = data;
      this.$emit("loadCompleted")
      this.showLoading = false;
    },

    findParent(arr, data) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]["accountid"] === data) return i;
      }
    },

    insertToPosition(arr, index, data) {
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        if (i != index) {
          result.push(arr[i]);
        } else {
          result.push(arr[i]);
          result.push(data);
        }
      }
      return result;
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
      let trList = this.$refs.tableBody.children;
      /* eslint-disable no-debugger */
      // debugger;
      if (this.selected === null){
        this.selected = trList[index];
        this.selected.classList.add("tr-selected");
      } 
      else {
        this.selected.classList.remove("tr-selected");
        this.selected = trList[index];
        this.selected.classList.add("tr-selected");
      }
      this.selectedData = item;
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
        dateVal = dateVal < 10 ? "0" + dateVal : dateVal;
        month = month < 10 ? "0" + month : month;
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
        this.$emit("refresh", rawData.totalRecord.TotalRecord);
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
    getRemainingRow() {
      return this.$refs.tableBody.children.length;
    },
  },
};
</script>
<style scoped>
.date {
  text-align: center;
  padding: 0;
}

.multiple-select {
  width: 40px;
}

.editable {
  width: 150px;
  text-align: center;
}

.edit-text {
  cursor: pointer;
  margin-left: 15px;
}

.checked-item,
.checked-item td:first-child,
.checked-item td:last-child {
  background-color: #e5f3ff;
  z-index: 3;
}

.rightBorder {
  height: 100%;
  width: 0.5px;
  background-color: #e0e0e0;
  z-index: 999;
  top: 0;
  right: -1px;
  position: absolute;
}

.leftBorder {
  height: 100%;
  width: 0.5px;
  background-color: #d0d0d0;
  z-index: 999;
  top: 0;
  left: -1px;
  position: absolute;
}

.subElement {
  display: none;
}

.displaySubElement {
  display: block;
}

.td-check {
  display: flex;
  height: 100%;
  width: 100%;
  line-height: 36px;
}

.td-contain {
  display: flex;
  column-gap: 8px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.haveSub {
  font-weight: 600;
}

.subElm::before {
  content: "";
  position: relative;
  height: 20px;
  width: 15px;
  display: block;
  float: left;
}

.subElm2::before {
  content: "";
  position: relative;
  height: 20px;
  width: 30px;
  display: block;
  float: left;
}
.subElm3::before {
  content: "";
  position: relative;
  height: 20px;
  width: 45px;
  display: block;
  float: left;
}
</style>