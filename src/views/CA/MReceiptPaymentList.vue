<template>
  <div class="rp-main">
    <div class="content-main__header">
        <div class="action-multiple__icon"></div>
        <m-action-multiple
        class="action-multiple"
        :enable="enableMultipleEditor"
        @delete="multipleDelete"
        ></m-action-multiple>
      <m-search-bar></m-search-bar>
      <div
        @click="renewData"
        title="Tải lại (Ctrl + R)"
        class="icon reload-icon"
      ></div>
      <div
        title="Xuất ra excel (Ctrl + E)"
        @click="excelExport"
        class="icon export-excel-icon"
      ></div>
      <div class="create-btn">
        <div class="ct-btn" @click="showNewPopup">{{ this.resources.vi.cashControl.actionBtn.PT }}</div>
        <div class="more-icon"></div>
      </div>

      <div class="create-btn">
        <div class="ct-btn" @click="showNewPopup">{{ this.resources.vi.cashControl.actionBtn.PC }}</div>
        <div class="more-icon"></div>
      </div>
    </div>
    <div ref="reMaster" class="content-main_master">
        <div class="content-main__data">
            <MGridData
            ref="gridMaster"
            :api="this.APIString"
            :data="[
                {
                  title: resources.vi.cashControl.gridData.rp_date,
                  tooltip: resources.vi.cashControl.gridData.rp_date,
                  dataField: 're_date',
                  dataType: 'date',
                  colWidth: '200',
                },
                {
                  title: resources.vi.cashControl.gridData.rp_ref_no,
                  tooltip: resources.vi.cashControl.gridData.rp_ref_no,
                  dataField: 're_ref_no',
                  dataType: 'text',
                  colWidth: '150',
                },
                {
                  title: resources.vi.cashControl.gridData.rp_description,
                  tooltip: resources.vi.cashControl.gridData.rp_description,
                  dataField: 're_description',
                  dataType: 'text',
                  colWidth: '350',
                },
                {
                  title: resources.vi.cashControl.gridData.amount,
                  tooltip: resources.vi.cashControl.gridData.amount,
                  dataField: 'total_amount',
                  dataType: 'd-money',
                  colWidth: '200',
                },
                {
                  title: resources.vi.cashControl.gridData.object,
                  tooltip: resources.vi.cashControl.gridData.object,
                  dataField: 'supplier_name',
                  dataType: 'text',
                  colWidth: '150',
                },
                {
                  title: resources.vi.cashControl.gridData.rp_reason,
                  tooltip: resources.vi.cashControl.gridData.rp_reason,
                  dataField: 're_reason',
                  dataType: 'text',
                  colWidth: '150',
                },
                {
                  title: resources.vi.cashControl.gridData.ca_type,
                  tooltip: resources.vi.cashControl.gridData.ca_type,
                  dataField: 'ca_type',
                  dataType: 'text',
                  colWidth: '150',
                },
            ]"
            :isFixedStart="true"
            :isFixedEnd="true"
            :muiltiple-select="true"
            :editable="true"
            :key="gridKey"
            @loadCompleted = "gridMasterLoaded"
            @gridItemClicked = "gridItemOnClicked"
            :isFocusFirst="true"
            ></MGridData>
        </div>
        <div class="re-pagination">
          <div class="total_amount">
            <div class="total_txt">{{ this.resources.vi.cashControl.gridMaster.total_txt }}</div>
            <div class="total_value">{{ this.formatMoney(this.total_amount_master) }}</div>
          </div>
          <MPagination
          :totalRecord="this.totalMaster"
          @updateAPI="updateMasterApi"
          ref="pagingMaster"
        ></MPagination>
        </div>
    </div>
    <div ref="reDetail" class="content-main_detail">
        <div class="re-main__header">
            <div class="re-header__name">{{ this.resources.vi.cashControl.detail }}</div>
            <div ref="reDetailCollase" class="re-header__collase" @click="collaseDetail"></div>
        </div>
        <div class="content-main__data detail-data">
            <MGridData
            ref="gridDetail"
            :api="this.detailAPI"
            :data="[
                {
                  title: '#',
                  tooltip: '',
                  dataField: 're_no',
                  dataType: 'num',
                  colWidth: '30',
                },
                {
                  title: resources.vi.cashControl.gridDetail.rp_description,
                  tooltip: resources.vi.cashControl.gridDetail.rp_description,
                  dataField: 'rpd_description',
                  dataType: 'text',
                  colWidth: '150',
                },
                {
                  title: resources.vi.cashControl.gridDetail.debit_account,
                  tooltip: resources.vi.cashControl.gridDetail.debit_account_tooltip,
                  dataField: 'debit_account',
                  dataType: 'text',
                  colWidth: '100',
                },
                {
                  title: resources.vi.cashControl.gridDetail.credit_account,
                  tooltip: resources.vi.cashControl.gridDetail.credit_account_tooltip,
                  dataField: 'credit_account',
                  dataType: 'text',
                  colWidth: '100',
                },
                {
                  title: resources.vi.cashControl.gridDetail.amount,
                  tooltip: resources.vi.cashControl.gridDetail.amount,
                  dataField: 'amount',
                  dataType: 'd-money',
                  colWidth: '150',
                },
                {
                  title: resources.vi.cashControl.gridDetail.object,
                  tooltip: resources.vi.cashControl.gridDetail.object,
                  dataField: 'supplier_code',
                  dataType: 'text',
                  colWidth: '150',
                },
                {
                  title: resources.vi.cashControl.gridDetail.object_name,
                  tooltip: resources.vi.cashControl.gridDetail.object_name,
                  dataField: 'supplier_name',
                  dataType: 'text',
                  colWidth: '350',
                },
            ]"
            :isFixedEnd="true"
            :editable="true"
            :key="gridKey"
            @loadCompleted = "gridDetailLoaded"
            ></MGridData>
        </div>
        <div ref="detailPaging" class="re-pagination">
          <div class="total_amount">
            <div class="total_txt">{{ this.resources.vi.cashControl.gridMaster.total_txt }}</div>
            <div class="total_value">{{ this.formatMoney(this.total_amount_detail) }}</div>
          </div>
          <MPagination
          :totalRecord="this.totalDetail"
          @updateAPI="updateAPIDetail"
          ref="pagingDetail"
        ></MPagination>
        </div>
    </div>
    <MPaymentDetail @closeDetail="closeDetail" v-if="showDetail"></MPaymentDetail>
  </div>
</template>
<script>
import resources from "@/js/resources";
import MSearchBar from '@/components/base-component/MSearchBar.vue';
import MActionMultiple from "@/components/base-component/MActionMultiple.vue";
import MGridData from "@/components/base-component/MGridData.vue";
import MPagination from "@/components/base-component/MPagination.vue";
import MPaymentDetail from '@/views/CA/MPaymentDetail.vue'
 
export default {
  components: { MSearchBar, MActionMultiple, MGridData, MPagination, MPaymentDetail },
  name: "MReceiptPaymentList",

  created(){
    this.APIString = this.resources.endpoint + 'ReceiptPayment/Filter?pageSize=20&pageNumber=1';
  },

  mounted(){
  },

  methods: {

    updateAPIDetail(){
      //
    },

    updateMasterApi(pageSize, pageNum){
      this.APIString = this.resources.endpoint + `ReceiptPayment/Filter?pageSize=${pageSize}&pageNumber=${pageNum}`;
      console.log(this.APIString);
    },

    showNewPopup(){
      this.showDetail = true;
    },

    closeDetail(){
      this.showDetail = false;
    },

    gridMasterLoaded(){
        this.currentPayment = this.$refs.gridMaster.gridData[0];
        this.total_amount_master = this.$refs.gridMaster.gridData[0]['summary'];
        this.totalMaster = this.$refs.gridMaster.gridData[0]['total_record'];
        this.detailAPI = this.resources.endpoint + 'ReceiptPaymentDetail/GetAllByReId?re_id=' + this.currentPayment.re_id;
    },

    gridDetailLoaded(){ 
      if (this.$refs.gridDetail.gridData[0]){
        this.total_amount_detail = this.$refs.gridDetail.gridData[0]['total_amount'];
        this.totalDetail = this.$refs.gridDetail.gridData[0]['total_record'];
      }
      else this.total_amount_detail = 0;
    },

    collaseDetail(){
        if (!this.collased){
            this.$refs.reMaster.classList.remove('collase-master');
            this.$refs.reDetail.classList.remove('expand-detail');
            this.$refs.reDetailCollase.classList.remove('unrotate');
            this.$refs.reMaster.classList.add("expand-master");
            this.$refs.reDetail.classList.add("collase-detail");
            this.$refs.reDetailCollase.classList.add("rotate180deg");
            this.$refs.detailPaging.classList.add("detail-paging");
            this.collased = true;
        } else {
            this.$refs.reMaster.classList.remove("expand-master");
            this.$refs.reDetail.classList.remove("collase-detail");
            this.$refs.reDetailCollase.classList.remove("rotate180deg");
            this.$refs.reMaster.classList.add('collase-master');
            this.$refs.reDetail.classList.add('expand-detail');
            this.$refs.reDetailCollase.classList.add('unrotate');
            this.$refs.detailPaging.classList.remove("detail-paging");
            this.collased = false;
        }
    },

    gridItemOnClicked(item){
      this.detailAPI = this.resources.endpoint + 'ReceiptPaymentDetail/GetAllByReId?re_id=' + item['re_id'];
      console.log(this.detailAPI);
    },

    formatMoney(amount, decimalCount = 0, decimal = "", thousands = ".") {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      const negativeSign = amount < 0 ? "-" : "";
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    },
  },

  data() {
    return {
      resources: resources,
      APIString: "",
      detailAPI: "",
      gridKey: 0,
      currentPayment: null,
      collased: false,
      total_amount_master: 0,
      total_amount_detail: 0,
      totalMaster: 0,
      totalDetail: 0,
      showDetail: false,
    };
  },
};
</script>
<style scoped>
.rp-main {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
}

.create-btn {
  height: 28px;
  width: 115px;
  background-color: #2ca01c;
  border-radius: 25px;
  display: flex;
  margin-right: 20px;
  cursor: pointer;
}

.ct-btn {
  color: #fff;
  font-size: 13px;
  font-family: Notosans-bold;
  height: 22px;
  margin-top: 3px;
  width: 50px;
  line-height: 22px;
  margin-left: 15px;
  border-right: solid #fff 1px;
  width: 65px;
}

.more-icon {
  margin-top: 3px;
  margin-left: 6px;
  height: 22px;
  width: 22px;
  background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -846px -356px;
}

.search-bar {
  position: absolute;
  left: 15px;
}

.action-multiple{
    margin-left: 24px;
}

.action-multiple__icon{
    height: 18px;
    width: 18px;
    background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -259px -147px;
    position: absolute;
    left: 12px;
    top: 18px;
}

.rp-main__content{
    height: calc(100% - 44px);
    width: 100%;
}

.re-main__header{
    height: 40px;
    background-color: #eceef1;
    position: relative;
}

.re-pagination{
    height: 66px;
    width: 100%;
    background-color: #fff;
}

.content-main_master{
    height: 50%;
    width: 100%;
}

.content-main_detail{
    height: calc(50% - 56px);
    width: 100%;
    position: absolute;
    bottom: 12px;
}

.content-main__data{
    height: 80%;
}

.detail-data{
    height: calc(80% - 40px);
}

.re-header__name{
    padding: 4px 16px;
    background-color: #f2ebbf;
    width: 50px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-size: 13px;
    font-family: Notosans-bold;
    text-align: center;
    position: absolute;
    bottom: 0;
}

.re-header__collase{
    height: 13px;
    width: 48px;
    background-color: #d4d7dc;
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: calc(50% - 24px);
    cursor: pointer;
}

.re-header__collase::before{
    content: '';
    display: block;
    background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -564px -365px;
    width: 8px;
    height: 5px;
    position: absolute;
    top: 5px;
    left: calc(50% - 4px);
}

.total_txt{
  font-family: Notosans-bold;
  font-size: 13px;
  line-height: 28px;
  padding-left: 52px;

}

.total_value{
  font-family: Notosans-bold;
  font-size: 13px;
  line-height: 28px;
  position: absolute;
  right: 607px;
}

.total_amount{
  height: 28px;
  width: 100%;
  background-color: #e8eaef;
  display: flex;
  position: relative;
}
.detail-paging{
    display: none;
}

@keyframes collase-detail {
    from{height: calc(50% - 56px);}
    to{height: 40px;}
}

@keyframes expand-detail {
    from{height: 40px;}
    to{height: calc(50% - 56px);}
}

@keyframes expand-master {
    from{height: 50%;}
    to{height: calc(100% - 44px);}
}

@keyframes collase-master {
    from{height: calc(100% - 40px);}
    to{height: 50%;}
}

.rotate180deg{
    transform: rotate(180deg);
    transition-duration: 0.5s;
}

.unrotate{
    transform: rotate(0deg);
    transition-duration: 0.5s;
}

.collase-detail{
    animation-name: collase-detail;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

.expand-detail{
    animation-name: expand-detail;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

.collase-master{
    animation-name: collase-master;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

.expand-master{
    animation-name: expand-master;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}
</style>