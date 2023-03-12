// component dùng để hiển thị data dưới dạng grid với dữ liệu được truyền vào thông qua api
// Author: Xuân Đào (12/03/2023)
<template>
  <div class="grid-viewer" ref="gridViewer" @click="getClickedPosition">
    <div class="grid-viewer__scroll">
      <table class="grid-table" ref="gridTable">
        <thead ref="tableThead">
          <tr class="grid-title">
            <th :class="{}" v-for="(item, index) in data.colName" :key="index">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody ref="tableBody">
          <tr v-for="(item, index) in gridData" :key="index">
            <td v-for="(value, index) in data.modelName" :key="index">
              {{ item[value] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      <MContextMenu ref="context" v-show="showContext"></MContextMenu>
  </div>
</template>
<script>
import MContextMenu from './MContextMenu.vue';
export default {
  name: "MGridData",
  components:{
    MContextMenu
  },
  /**
   * Lấy dữ liệu từ api và đổ vào data
   * 
   * Author: Xuân Đào(12/03/2023)
   */
  async created() {
    this.gridData = await (await fetch(this.api)).json();    
  },

  /**
   * Định dạng dữ liệu tiêu đề 
   * 
   * Author: Xuân Đào(12/03/2023)
   */
  mounted() {
    let totalWidth = 0;
    if (this.isFixedStart) this.$refs.tableThead.children[0].children[0].classList.add("fix-start");
    if (this.isFixedEnd) this.$refs.tableThead.children[0].children[this.data.colName.length-1].classList.add("fix-end");
    for (let i = 0; i < this.data.colName.length; i++) {
      this.$refs.tableThead.children[0].children[i].style.width = this.data.colWidth[i] + "px";
      if(parseInt(this.data.colWidth[i])) totalWidth += parseInt(this.data.colWidth[i]);
      if (this.data.colType[i] == 'checkbox'){
        this.$refs.tableThead.children[0].children[i].innerHTML = '<input type = "checkbox" class="checkbox" id="parentsCheck">'
      }
      if (this.data.colType[i] == 'date' || this.data.colType[i] == 'option'){
        this.$refs.tableThead.children[0].children[i].classList.add("align-center");
      }
    }
      this.$refs.gridViewer.style.minWidth = totalWidth + "px";  
      //
      //
  },

  /**
   * Định dạng dữ liệu gridData
   * 
   * Author: Xuân Đào (12/03/2023)
   */
  updated() {
    // Chỉ định dạng dữ liệu khi data thay đổi lần đầu
    if (!this.formated){
      for (let i=0;i<this.$refs.tableBody.children.length;i++){
      for (let j=0;j<this.data.colType.length;j++){
        if (this.data.colType[j] == 'checkbox'){
          this.$refs.tableBody.children[i].children[j].innerHTML = '<input type = "checkbox" class="checkbox">'
          }
        if (this.data.colType[j] == 'date'){
          this.$refs.tableBody.children[i].children[j].innerHTML = this.dateFormator(this.$refs.tableBody.children[i].children[j].textContent);
          this.$refs.tableBody.children[i].children[j].classList.add("align-center");
        }
        if (this.data.colType[j] == 'option'){
          this.$refs.tableBody.children[i].children[j].innerHTML = '<div class="edit"><div class="edit-text">Sửa</div><div tabindex="0" class="edit-icon"</div></div>'
          this.$refs.tableBody.children[i].children[j].classList.add("align-center");
        }
        }
      if (this.isFixedStart) this.$refs.tableBody.children[i].children[0].classList.add("fix-start");
      if (this.isFixedEnd) this.$refs.tableBody.children[i].children[this.data.colName.length-1].classList.add("fix-end");
    }
    for (let i=0;i<this.$refs.tableBody.children.length;i++){
      for (let j=0;j<this.data.colType.length;j++){
        if (this.data.colType[j] == 'option'){
          this.$refs.tableBody.children[i].children[j].children[0].children[1].addEventListener("click", () => {
            this.getClickedPosition(event);
            this.$refs.context.setPosition(50, this.cursor_y + 15);
            this.showContext = true;
          })

          this.$refs.tableBody.children[i].children[j].children[0].children[1].addEventListener("blur", () => {
            this.showContext = false;
          })
        }
      }
      this.formated = true;
    }
  }
    
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
  },
  data() {
    return {
      gridData: null,
      showContext: false,
      cursor_y: 0,
      formated: false,
    };
  },
  methods: {
    /**
     * Hàm định dạng dữ liệu ngày tháng
     * 
     * Author: Xuân Đào (12/03/2023)
     */
    dateFormator(date){
      const data = new Date(date);
      if (data.toDateString() !== 'Invalid Date'){
        const dateVal = data.getDay();
        const month = data.getMonth() + 1;
        const year = data.getFullYear();
        return `${dateVal}/${month}/${year}`;
      }
      else return "";
    },
    /**
     * Hàm hiển thị contextmenu
     * 
     * Author: Xuân Đào (12/03/2023)
     */
    showContextMenu(){
      this.showContext = true;
    },
    hideContextMenu(){
      this.showContext = false;
    },
    getClickedPosition(event){
      this.cursor_y = event.clientY;
    }
  },
};
</script>
<style scoped>

</style>