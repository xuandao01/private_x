// component dùng để hiển thị data dưới dạng grid với dữ liệu được truyền vào thông qua api
// Props: data bao gồm dữ liệu về tên các cột cần có, modelName tương ứng với các cột, loại cột, độ rộng cột.
// Author: Xuân Đào (12/03/2023)
<template>
  <div class="grid-viewer" ref="gridViewer" @click="getClickedPosition">
    <div class="grid-viewer__scroll">
      <table class="grid-table" ref="gridTable">
        <thead ref="tableThead">
          <tr class="grid-title">
            <th class="multiple-select" :class="{'fix-start': isFixedStart}" v-if="muiltipleSelect">
              <input type="checkbox" class="checkbox">
            </th>
            <th :class="item.dataType" v-for="(item, index) in data" :key="index">
              {{ item.title }}
            </th>
            <th class="editable" :class="{'fix-end': isFixedEnd}" v-if="editable">
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody ref="tableBody">
          <MGridDataLoading v-if="showLoading"></MGridDataLoading>
          <tr v-for="(item, index) in gridData" :key="index">
            <td v-if="muiltipleSelect" :class="{'fix-start': isFixedStart}" v-show="showData">
              <input type="checkbox" class="checkbox" >
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
            <td class="editable" :class="{'fix-end': isFixedEnd}" v-if="editable" v-show="showData">
              <div class="edit">
                <div class="edit-text">Sửa</div>
                <div tabindex="0" class="edit-icon" @click="editOnClick" @blur="editOnBlur"></div>
            </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <MContextMenu ref="context" @deleteAction="deleteEmployee" v-show="showContext"></MContextMenu>
  </div>
</template>
<script>
import MGridDataLoading from "../unit-components/MGridDataLoading.vue";
import MContextMenu from "./MContextMenu.vue";
export default {
  name: "MGridData",

  components: {
    MContextMenu,
    MGridDataLoading,
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
    }
  },
  /**
   * Lấy dữ liệu từ api và đổ vào data
   *
   * Author: Xuân Đào(12/03/2023)
   */
  async created() {
    this.gridData = await (await fetch(this.api)).json();
    this.showLoading = false;
  },

  /**
   * Định dạng dữ liệu tiêu đề
   *
   * Author: Xuân Đào(12/03/2023)
   */
  mounted() {
    let totalWidth = 0;
    if (!this.muiltipleSelect){
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
      this.$refs.tableThead.children[0].children[i+1].style.width =
        this.data[i].colWidth + "px";
      if (parseInt(this.data[i].colWidth))
        totalWidth += parseInt(this.data[i].colWidth);
      if (this.data[i].dataType == "date") {
        this.$refs.tableThead.children[0].children[i+1].classList.add(
          "align-center"
        );
      }
    }
  }
    this.$refs.gridViewer.style.minWidth = totalWidth + "px";
    //
    //
  },

  watch:{
    gridData: function(newVal){
      for (const item of newVal) {
        item.DateOfBirth = this.dateFormator(item.DateOfBirth);
        item.IdentityDate = this.dateFormator(item.IdentityDate);
      }
    }
  },

  /**
   * Định dạng dữ liệu gridData
   *
   * Author: Xuân Đào (12/03/2023)
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
    };
  },
  methods: {

    editOnBlur(){
      event.target.parentElement.classList.remove("tr-selected");
      setTimeout(() => {
        this.showContext = false;
      }, 300)
    },

    editOnClick(){
      this.getClickedPosition(event);
      this.$refs.context.setPosition(50, this.cursor_y + 15);
      this.showContext = true;
    },

    /**
     * Xử lý sự kiện click vào các hàng trong table
     * 
     * Author: Xuân Đào (14/03/2023x)
     */
    itemOnClick(item){
      if (this.selected === null) this.selected = event.target.parentElement;
      else {
        this.selected.classList.remove("tr-selected")
        this.selected = event.target.parentElement;
        if (this.selected.tagName !== 'DIV'){
          this.selected.classList.add("tr-selected")
        } else {
          this.selectedData = item;
        }
      }
    },
    /**
     * Hàm định dạng dữ liệu ngày tháng
     *
     * Author: Xuân Đào (12/03/2023)
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
     * Author: Xuân Đào (12/03/2023)
     */
    showContextMenu() {
      this.showContext = true;
    },

    /**
     * Hàm ẩn contextmenu
     *
     * Author: Xuân Đào (12/03/2023)
     */
    hideContextMenu() {
      this.showContext = false;
    },

    /**
     * Hàm lấy dữ liệu vị trí click chuột
     *
     * Author: Xuân Đào (12/03/2023)
     */
    getClickedPosition(event) {
      this.cursor_y = event.clientY;
    },

    /**
     * Hàm load dữ liệu
     *
     * Author: Xuân Đào (12/03/2023)
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
     * Author: Xuân Đào (12/03/2023)
     */
    hideLoadingSkeleton() {
      this.showLoading = false;
    },

    /**
     * Hàm làm mới dữ liệu
     *
     * Author: Xuân Đào (12/03/2023)
     */
    refreshData() {
      this.showLoading = true;
      this.showData = false;
      fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
        .then((res) => res.json())
        .then((data) => {
          this.gridData = data;
          this.hideLoadingSkeleton();
          this.showData = true;
        });
    },

    /**
     * Hàm hiển thị form sửa khi nhấn double click
     *
     * Author: Xuân Đào (12/03/2023)
     */
    editOnDbClick(item){
      this.$emit("dbClicked", item);
    },

    /**
     * Hàm xóa một bản ghi
     */
    deleteEmployee(){
      this.$emit("deleteRc", this.selectedData);
    },

    contextOnDelete(){
      
    }
  },
};
</script>
<style scoped>
  .date{
    text-align: center;
  }
  
  .multiple-select{
    width: 40px;
  }

  .editable{
    width: 150px;
    text-align: center;
  }
</style>