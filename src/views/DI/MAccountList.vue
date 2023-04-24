<template>
  <div class="content" ref="content">
    <div class="content-header">
      <div class="content-title">{{ this.res.vi.accountList.title }}</div>
    </div>
    <router-link to='/DI' class="ct-header">
      <div class="ct-header__icon back-icon"></div>
      <div class="ct-header__text">{{ res.vi.di.return }}</div>
    </router-link>
    <!-- Phần hiển thị nội dung chính của table -->
    <div class="content-main">
      <div class="content-main__header">
        <MSearchBar class="search-bar" :width="225" :placeholder="this.res.vi.accountList.inputPlaceholder" @onSearch="this.searchOnInput"></MSearchBar>
        <div @click="renewData" title="Tải lại (Ctrl + R)" class="icon reload-icon"></div>
        <div
          title="Xuất ra excel (Ctrl + E)"
          @click="excelExport"
          class="icon export-excel-icon"
        ></div>
        <div class="create-btn">
          <div class="ct-btn" @click="showNewPopup"> Thêm </div>
          <div class="more-icon"></div>
        </div>
      </div>
      <div class="content-main__data">
        <MGridTree
          ref="gridData"
          :api="this.APIString"
          :data="[
            {
              title: res.vi.accountList.data.accountNumber,
              dataField: 'accountnumber',
              dataType: 'text',
              colWidth: '150',
            },
            {
              title: res.vi.accountList.data.accountName,
              dataField: 'accountname',
              dataType: 'text',
              colWidth: '250',
            },
            {
              title: res.vi.accountList.data.property,
              dataField: 'propertyname',
              dataType: 'text',
              colWidth: '100',
            },
            {
              title: res.vi.accountList.data.englishName,
              dataField: 'englishname',
              dataType: 'text',
              colWidth: '250',
            },
            {
              title: res.vi.accountList.data.description,
              dataField: 'description',
              dataType: 'text',
              colWidth: '300',
            },
            {
              title: res.vi.accountList.data.status,
              dataField: 'statusname',
              dataType: 'text',
              colWidth: '200',
            },
          ]"
          :isFixedStart="false"
          :isFixedEnd="true"
          @deleteRc="deleteRecord"
          @dbClicked="editOnDbClick"
          @refresh="updateTotal"
          @selectMultiple="selectMultiple"
          @duplicateData="duplicateEmployee"
          @loadCompleted="gridLoaded"
          :muiltiple-select="false"
          :editable="true"
          :key="gridKey"
        ></MGridTree>
      </div>
      <div class="content-main__footer">
        <MPagination
          :totalRecord="this.totalRecord"
          ref="pagingMaster"
          :allow-paging="false"
        ></MPagination>
      </div>
    </div>
    <MDeleteConfirmDialog
      ref="confirmDelete"
      v-if="deleteDialog"
      @hideDeleteDialog="closeDeleteDialog"
      @hideAndDelete="closeAndDelete"
      :messagse="deleteMessage"
    ></MDeleteConfirmDialog>
    <MSingleActionDialog
    ref="singleDialog"
    ></MSingleActionDialog>
    <MAccountDetail @closeMe="closeDetail" v-if="showDetail" :sortedData="this.sortedData"></MAccountDetail>
    <MCircleLoader v-if="showLoader"></MCircleLoader>
  </div>
</template>
<script>
import MGridTree from "@/components/base-component/MGridTree.vue";
// import { ToastType } from '../base-component/MToastItem.vue';
import MDeleteConfirmDialog from "@/components/unit-components/MConfirmDeleteDialog.vue";
import { toastControl } from "@/store/toast";
import { formAction } from "@/components/unit-components/MEmployeeDetail.vue";
import MSearchBar from "@/components/base-component/MSearchBar.vue";
import resources from "@/js/resources";
import MSingleActionDialog from "@/components/unit-components/MSingleActionDialog.vue";
import MCircleLoader from "@/components/base-component/MCircleLoader.vue";
import { loader } from '@/store/loader';
import MAccountDetail from "@/components/unit-components/MAccountDetail.vue";
import MPagination from "@/components/base-component/MPagination.vue";

export const accountStatus = {
  using: 0,
  unuse: 1,
}

export const AccountProperty = {
  Debt: 0,
  Excess: 1,
  Hermaphrodite: 2,
  NoBalance: 3,
}

export default {
  name: "MEmployeeList",
  // inject:['showToastMsg'],
  // Set up toast message
  setup() {
    const ToastControl = toastControl();
    const Loader = loader();
    return {
      ToastControl, Loader
    };
  },
  components: {
    MGridTree,
    MDeleteConfirmDialog,
    MSearchBar,
    MSingleActionDialog,
    MCircleLoader,
    MAccountDetail,
    MPagination
  },
  created() {
    // fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.employees = data;
    //   });
    this.APIString =
      `${this.res.endpoint}Account`;
    window.addEventListener("keydown", this.handleKeyDown);
  },

  mounted(){
    this.sortedData = this.$refs.gridData.sortedData;
  },

  unmounted() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  watch: {},

  methods: {
    showNewPopup(){
      this.showDetail = true;
    },

    closeDetail(){
      this.showDetail = false;
    },

    gridLoaded(){
      this.sortedData = this.$refs.gridData.sortedData;
      this.totalRecord = this.$refs.gridData.gridData[0]['total_record'];
      this.formatDisplayData();
      console.log(this.sortedData);
    },

    formatDisplayData(){
      this.sortedData.forEach(element => {
        this.sortedData.displayData = " ".repeat(element['DataLevel']) + element['accountnumber'];
      });
    }
  },
  data() {
    return {
      showDetail: false,
      showLoading: true,
      showToast: false,
      deleteDialog: false,
      APIString: null,
      res: resources,
      popupTitle: "",
      action: formAction.createRecord,
      showLoader: false,
      sortedData: null,
      totalRecord: 0,
    };
  },
};
</script>
<style scoped>
.icon:hover {
  cursor: pointer;
}

.ct-header{
  display: flex;
  font-size: 13px;
  height: 22px;
  line-height: 20px;
  align-items: center;
  column-gap: 4px;
  margin-left: 4px;
  color: #0075c0;
}

.create-btn{
  height: 28px;
  width: 100px;
  background-color: #2ca01c;
  border-radius: 25px;
  display: flex;
  margin-right: 20px;
  cursor: pointer;
}

.ct-btn{
  color: #fff;
  font-size: 13px;
  font-family: Notosans-bold;
  height: 22px;
  margin-top: 3px;
  width: 50px;
  line-height: 22px;
  margin-left: 15px;
  border-right: solid #fff 1px;
}

.more-icon{
  margin-top: 3px;
  margin-left: 6px;
  height: 22px;
  width: 22px;
  background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -846px -356px;
}

.search-bar{
  position: absolute;
  left: 15px;
}
</style>