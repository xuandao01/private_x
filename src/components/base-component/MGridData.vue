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
              <MCheckbox></MCheckbox>
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
            </th>
          </tr>
        </thead>
        <tbody ref="tableBody">
          <MGridDataLoading v-if="showLoading"></MGridDataLoading>
          <tr v-for="(item, index) in gridData" :key="index">
            <td
              v-if="muiltipleSelect"
              :class="{ 'fix-start': isFixedStart }"
              v-show="showData"
            >
              <MCheckbox @click="checkBoxOnClick(item)"></MCheckbox>
            </td>
            <td
              :class="value.dataType"
              v-for="(value, index) in data"
              :key="index"
              v-show="showData"
              @dblclick="editOnDbClick(item)"
              @click="itemOnClick(item)"
            >
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <MContextMenu
      ref="context"
      @deleteEvent="deleteRowData"
      v-show="showContext"
    ></MContextMenu>
  </div>
</template>
<script>
import MGridDataLoading from "../unit-components/MGridDataLoading.vue";
import MContextMenu from "./MContextMenu.vue";
import MCheckbox from "./MCheckbox.vue";
export default {
  name: "MGridData",

  emits: ['update:totalRecord', 'update:enableMultipleEditor'],

  components: {
    MContextMenu,
    MGridDataLoading,
    MCheckbox,
  },

  props: {
    api: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    isFixedStart: {
      type: Boolean,
      required: false,
      default: false,
    },
    isFixedEnd: {
      type: Boolean,
      required: false,
      default: false,
    },
    muiltipleSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
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
  async created() {
    let data = await (await fetch(this.api)).json();
    this.gridData = data.data;
    this.$emit('refresh', data.totalRecord.TotalRecord);
    this.showLoading = false;
    this.apiString = this.api;
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
    //
  },

  watch: {
    gridData: function (newVal) {
      for (const item of newVal) {
        item.DateOfBirth = this.dateFormator(item.DateOfBirth);
        item.IdentityDate = this.dateFormator(item.IdentityDate);
        item.GenderName = this.getGenderName(item.Gender);
      }
    },
  },

  /**
   * Định dạng dữ liệu gridData
   *
   * @author  Xuân Đào (12/03/2023)
   */
  // updated() {
  //   // Chỉ định dạng dữ liệu khi data thay đổi lần đầu
  //   if (!this.formated) {
  //     for (let i = 0; i < this.$refs.tableBody.children.length; i++) {
  //       for (let j = 0; j < this.data.length; j++) {
  //         if (this.data[j].dataType == "checkbox") {
  //           this.$refs.tableBody.children[i].children[j].innerHTML =
  //             '<input type = "checkbox" class="checkbox">';
  //         }
  //         if (this.data[j].dataType == "date") {
  //           this.$refs.tableBody.children[i].children[j].innerHTML =
  //             this.dateFormator(
  //               this.$refs.tableBody.children[i].children[j].textContent
  //             );
  //           this.$refs.tableBody.children[i].children[j].classList.add(
  //             "align-center"
  //           );
  //         }
  //         if (this.data[j].dataType == "option") {
  //           this.$refs.tableBody.children[i].children[j].innerHTML =
  //             '<div class="edit"><div class="edit-text">Sửa</div><div tabindex="0" class="edit-icon"</div></div>';
  //           this.$refs.tableBody.children[i].children[j].classList.add(
  //             "align-center"
  //           );
  //         }
  //       }
  //       if (this.isFixedStart)
  //         this.$refs.tableBody.children[i].children[0].classList.add(
  //           "fix-start"
  //         );
  //       if (this.isFixedEnd)
  //         this.$refs.tableBody.children[i].children[
  //           this.data.length - 1
  //         ].classList.add("fix-end");
  //     }
  //     for (let i = 0; i < this.$refs.tableBody.children.length; i++) {
  //       for (let j = 0; j < this.data.length; j++) {
  //         if (this.data[j].dataType == "option") {
  //           this.$refs.tableBody.children[i].children[j].children[0].children[1].addEventListener("click", () => {
  //             this.getClickedPosition(event);
  //             this.$refs.context.setPosition(50, this.cursor_y + 15);
  //             this.showContext = true;
  //           });

  //           this.$refs.tableBody.children[i].children[j].children[0].children[1].addEventListener("blur", () => {
  //             event.target.parentElement.classList.remove("tr-selected");
  //             setTimeout(() => {
  //               this.showContext = false;
  //             }, 300)
  //           });
  //         }
  //       }
  //       this.showLoading = false;
  //       this.formated = true;
  //     }
  //   }
  // },

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
      selectedRow: null,
    };
  },
  methods: {

    deleteSelectedMultipleRow(){
      this.selectedMultipleRow.forEach(el => {
        console.log(el);
      })
    },

    deleteSelectedRow(){
      this.selectedRow.remove();
    },
    
    checkBoxOnClick(item) {
      if (this.selectedMultiple.includes(item)) {
        this.selectedMultipleRow = this.removeItemFromArr(this.selectedMultipleRow, this.selectedMultiple.indexOf(item));
        this.selectedMultiple = this.removeItemFromArr(this.selectedMultiple, this.selectedMultiple.indexOf(item));
      } else {
        this.selectedMultiple.push(item);
        this.selectedMultipleRow[this.selectedMultipleRow.length] = event.target.parentElement.parentElement;
      }
      console.log(this.selectedMultipleRow);
      this.$emit('selectMultiple', this.selectedMultiple.length);
    },

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
      this.selectedRow = event.target.parentElement.parentElement.parentElement;
    },

    /**
     * Xử lý sự kiện click vào các hàng trong table
     *
     * @author  Xuân Đào (14/03/2023x)
     */
    itemOnClick(item) {
      if (this.selected === null) this.selected = event.target.parentElement;
      else {
        this.selected.classList.remove("tr-selected");
        this.selected = event.target.parentElement;
        if (this.selected.tagName !== "DIV") {
          this.selected.classList.add("tr-selected");
        }
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
        const dateVal = data.getDay() + 1;
        const month = data.getMonth() + 1;
        const year = data.getFullYear();
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
     * Hàm load dữ liệu
     *
     * @author  Xuân Đào (12/03/2023)
     */
    loadData() {
      this.showLoading = true;
      fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
        .then((res) => res.json())
        .then((data) => {
          this.gridData = data;
          this.hideLoadingSkeleton();
        });
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
      this.apiString = api;
      this.showLoading = true;
      this.showData = false;
      let rawData = await (await fetch(this.apiString)).json();
      this.gridData = rawData.data;
      this.$emit('refresh', rawData.totalRecord.TotalRecord);
      this.showLoading = false;
      this.showData = true;
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
      this.$emit("deleteRc", this.selectedData);
    },

    contextOnDelete() {},
  },
};
</script>
<style scoped>
.date {
  text-align: center;
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
}
</style>