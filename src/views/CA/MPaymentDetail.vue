<template>
  <div class="pd-main" :key="detailKey">
    <div class="pd-content">
      <div class="pd-header">
        <div class="pd-header__left-side">
          <div class="pd-history__icon"></div>
          <div class="pd-title">
            {{
              this.resources.vi.cashControl.gridDetail.title +
              " " +
              this.currentPayment["re_ref_no"]
            }}
          </div>
          <MComboboxNomal
            @changeVal="updateReason"
            :default-value="6"
            :display_list_no="true"
            class="pd-combobox"
            :data="this.resources.vi.paymentDetail.payment_reason"
            ref="paymentReason"
          ></MComboboxNomal>
        </div>
        <div class="pd-header__right-side">
          <div class="pd-btn__group">
            <div title="Trợ giúp (F1)" class="help-icon icon"></div>
            <div title="Đóng (ESC)" class="close-icon icon" @click="closeOnClick"></div>
          </div>
        </div>
      </div>
      <div class="pd-main__content">
        <div class="info-area">
          <div class="pd-main__content--baseinfo">
            <div class="pd-main__row">
              <MScrollableCombobox
                :width="750"
                :input-title="
                  this.resources.vi.cashControl.objectCombobox.objectCode
                "
                :api="
                  this.resources.endpoint +
                  'Supplier/Filter?pageSize=20&pageNumber='
                "
                :map-data="[
                  {
                    title: this.resources.vi.cashControl.objectCombobox.object,
                    modelValue: 'supplier_code',
                    width: 75,
                  },
                  {
                    title:
                      this.resources.vi.cashControl.objectCombobox.objectName,
                    modelValue: 'supplier_name',
                    width: 200,
                  },
                  {
                    title:
                      this.resources.vi.cashControl.objectCombobox.tax_code,
                    modelValue: 'tax_code',
                    width: 100,
                  },
                  {
                    title: this.resources.vi.cashControl.objectCombobox.address,
                    modelValue: 'address',
                    width: 150,
                  },
                  {
                    title:
                      this.resources.vi.cashControl.objectCombobox.phone_number,
                    modelValue: 'phone_number',
                    width: 100,
                  },
                ]"
                :fix-to-position="1"
                display-model="supplier_code"
                @itemSelect="updateSelectedObject"
                :default-value="this.currentPayment['supplier_code']"
                ref="inpObject"
              ></MScrollableCombobox>
              <MInput
                v-model:modelValue="this.selectedObject['supplier_name']"
                :canFocus="true"
                :inputTitle="
                  this.resources.vi.cashControl.objectCombobox.objectName
                "
              ></MInput>
            </div>
            <div class="pd-main__row">
              <MInput
                v-model:modelValue="this.selectedObject['supplier_name']"
                :canFocus="true"
                :inputTitle="
                  this.resources.vi.cashControl.objectCombobox.receive
                "
              ></MInput>
              <MInput
                v-model:modelValue="this.selectedObject['address']"
                :canFocus="true"
                :inputTitle="
                  this.resources.vi.cashControl.objectCombobox.address
                "
              ></MInput>
            </div>
            <div class="pd-main__row">
              <MInput
                v-model:modelValue="this.currentPayment['re_description']"
                :canFocus="true"
                :inputTitle="
                  this.resources.vi.cashControl.objectCombobox.pay_reason
                "
                @onInput="desMasterInput"
              ></MInput>
            </div>
            <div class="pd-main__row pd-row3">
              <MScrollableCombobox
                :width="650"
                :input-title="
                  this.resources.vi.cashControl.objectCombobox.employee
                "
                :api="
                  this.resources.endpoint +
                  'Employees/Filter?pageSize=20&pageNumber='
                "
                :map-data="[
                  {
                    title: this.resources.vi.employeeList.EmployeeCodeTitle,
                    modelValue: 'employeecode',
                    width: 100,
                  },
                  {
                    title: this.resources.vi.employeeList.EmployeeFullNameTitle,
                    modelValue: 'fullname',
                    width: 200,
                  },
                  {
                    title: this.resources.vi.employeeDetail.position,
                    modelValue: 'positionname',
                    width: 100,
                  },
                  {
                    title: this.resources.vi.employeeDetail.phoneNumber,
                    modelValue: 'phonenumber',
                    width: 150,
                  },
                ]"
                display-model="fullname"
                @itemSelect="updateSelectedEmployee"
                :default-value="this.currentPayment['fullname']"
                :fix-to-position="1"
              ></MScrollableCombobox>
              <MInput
                placeholder="Số lượng"
                class="pd-more"
                :canFocus="true"
                :inputTitle="this.resources.vi.cashControl.objectCombobox.more"
                textAlign="right"
                v-model="this.currentPayment['re_attach']"
                type="d-money"
                :maximum-length="18"
              ></MInput>
            </div>
          </div>
          <div class="pd-main__content--timeinfo">
            <div class="pd-main__row fix-right">
              <MDatePicker
                :default-date="this.currentPayment['re_date']"
                :canFocus="true"
                :title="this.resources.vi.cashControl.gridDetail.success_date"
                @valueChange="updateReDate"
                ref="reDate"
              ></MDatePicker>
            </div>
            <div class="pd-main__row fix-right">
              <MDatePicker
                :default-date="this.currentPayment['ca_date']"
                :canFocus="true"
                :title="this.resources.vi.cashControl.gridDetail.payment_date"
                @valueChange="updateCaDate"
                ref="caDate"
              ></MDatePicker>
            </div>
            <div class="pd-main__row fix-right">
              <MInput
                v-model="this.currentPayment['re_ref_no']"
                class="last-row"
                :canFocus="true"
                :inputTitle="this.resources.vi.cashControl.objectCombobox.re_no"
                ref="reRefNo"
              ></MInput>
            </div>
          </div>
        </div>
        <div class="pd-main__content--summary">
          <div class="summary-title">
            {{ this.resources.vi.cashControl.objectCombobox.summary }}
          </div>
          <div class="summary-value">{{ summary_amount }}</div>
        </div>
      </div>
      <div class="grid-content">
        <div class="grid-main">
          <div class="grid-main__title">Hạch toán</div>
          <div class="grid-main__viewer">
            <MGridEditable
              :mapData="[
                {
                  title: 'Diễn giải',
                  modelValue: 'rpd_description',
                  width: 450,
                  editable: true,
                  align: 'left',
                  type: 'text',
                },
                {
                  title: 'TK nợ',
                  modelValue: 'debit_account',
                  width: 150,
                  editable: true,
                  align: 'left',
                  type: 'combobox',
                },
                {
                  title: 'TK có',
                  modelValue: 'credit_account',
                  width: 150,
                  editable: true,
                  align: 'left',
                  type: 'combobox',
                },
                {
                  title: 'Số tiền',
                  modelValue: 'amount',
                  width: 170,
                  editable: true,
                  align: 'right',
                  type: 'd-money',
                },
                {
                  title: 'Đối tượng',
                  modelValue: 'supplier_code',
                  width: 200,
                  editable: true,
                  align: 'left',
                  type: 'combobox',
                },
                {
                  title: 'Tên đối tượng',
                  modelValue: 'supplier_name',
                  width: 365,
                  editable: false,
                  align: 'left',
                  type: 'text',
                },
              ]"
              :fixStart="true"
              :fixEnd="true"
              :data="gridData"
              :key="gridKey"
              @deleteOnClick="deleteOnClick"
              @comboOnChange="comboboxDataChange"
              @updateEdittedValue="updateEditValue"
              @updateSumaryAmount="updateSumary"
              :comboboxData="this.comboboxData"
              :editable="editable"
              ref="editableGrid"
            ></MGridEditable>
          </div>
          <div class="btn-group" :class="{ disable: !this.editable }">
            <button class="grid-btn" @click="addRow">Thêm dòng</button>
            <button class="grid-btn" @click="removeAll">Xóa hết dòng</button>
          </div>
        </div>
      </div>
      <div class="pd-footer">
        <div class="popup-main__footer">
          <div class="btn group-btn">
            <div class="btn-save" v-if="this.formMode != 2">
              <button
                id="save"
                :title="this.resources.vi.btnAction.storeTooltip"
                class="optionalBtn pd-savebtn"
                @click="saveRequest(2)"
              >
                {{ this.resources.vi.btnAction.store }}
              </button>
            </div>
            <div class="btn-save" v-else>
              <button
                id="save"
                class="optionalBtn pd-savebtn"
                @click="editRequest"
              >
                Sửa
              </button>
            </div>
            <div class="btn btn-saveAndAdd" v-if="this.formMode != 2">
              <button
                :title="this.resources.vi.btnAction.storeSaveToolTip"
                id="saveAdd"
                class="pd-save__addbtn"
                @click="optionalButtonClicked"
              >
                {{ this.btnOptionText }}
              </button>
              <div class="dropdown-btn" tabindex="0" @focus="showOptionBtn = true" @blur="showOptionBtn = false">
                <div class="dropdown-icon"></div>
                <div class="btn-group__option" v-if="showOptionBtn">
                  <div class="btn-group__option--item" @click="saveAndClose">{{ this.resources.vi.btnAction.saveAndClose }}</div>
                  <div class="btn-group__option--item" @click="saveAndAdd" >{{ this.resources.vi.btnAction.storeSave }}</div>
                </div>
              </div>
            </div>
            <div class="btn btn-saveAndAdd store-option" v-else>
              <button
                id="saveAdd"
                class="pd-save__addbtn"
              >
                Ghi sổ
              </button>
            </div>
          </div>
          <div class="btn btn-close">
            <button
              @keydown="cancelOnKeyDown"
              id="cancel"
              :title="this.resources.vi.btnAction.cancelTooltip"
              class="optionalBtn pd-savebtn"
              @click="closeOnClick"
            >
              {{ this.resources.vi.btnAction.cancel }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <MSingleActionDialog
      ref="singleDialog"
      @dialogOnClose="dialogClosed"
    ></MSingleActionDialog>
  </div>
</template>
<script>
import MComboboxNomal from "@/components/base-component/MComboboxNomal.vue";
import MInput from "@/components/base-component/MInput.vue";
import MScrollableCombobox from "@/components/base-component/MScrollableCombobox.vue";
import resources from "@/js/resources";
import MDatePicker from "@/components/base-component/MDatePicker.vue";
import MGridEditable from "@/components/base-component/MGridEditable.vue";
import MSingleActionDialog, {
  dialogType,
} from "@/components/unit-components/MSingleActionDialog.vue";
import { paymentDetail } from "@/store/paymentDetail";
import { PaymentFormMode } from "./MReceiptPaymentList.vue";
import { toastControl } from "@/store/toast";
import { ToastType } from "@/components/base-component/MToastItem.vue";

// Dữ liệu mặc định ban đầu
const fixData = {
        re_no: 1,
        rpd_description: "Chi tien cho",
        debit_account: "",
        credit_account: "",
        amount: 0,
        supplier_code: "",
        supplier_name: "",
        edit_mode: false,
};

// Hành động của nút option
export const BtnOption = {
  saveAndClose: 0,
  saveAndAdd: 1,
}

// Hành động sau khi lưu dữ liệu
export const ActionAfterSave = {
  close: 0,
  add: 1,
  watch: 2,
}

export default {
  name: "MPaymentDetail",
  components: {
    MComboboxNomal,
    MScrollableCombobox,
    MInput,
    MDatePicker,
    MGridEditable,
    MSingleActionDialog,
  },

  setup() {
    const PaymentDetail = paymentDetail();
    const Toast = toastControl();
    return {
      PaymentDetail,
      Toast,
    };
  },

  props: {
    // payment: {
    //   type: Object,
    //   required: false,
    // },

    // paymentMode: {
    //   type: Number,
    //   required: false,
    // },
  },

  computed: {
    /**
     * Tính tổng tiền dưới detail
     * @author Xuân Đào (09/05/2023)
     */
    summary_amount() {
      // let sum = 0;
      // this.gridData.forEach(el => {
      //   sum += parseInt(el['amount'].replace('.',''));
      // })
      return this.formatMoney(this.summary);
    },
  },

  watch: {
    selectedReason: function (newVal) {
      this.gridData.forEach((el) => {
        if (this.selectedObject) {
          el["rpd_description"] =
            newVal + ` ${this.selectedObject["supplier_name"]}`;
          this.currentPayment.re_description =
            newVal + ` ${this.selectedObject["supplier_name"]}`;
        } else el["rpd_description"] = newVal;
      });
    },
  },

  created() {
    this.currentPayment = {
      re_ref_no: "",
      rpd_description: "",
      re_date: "",
      ca_date: "",
    };
    this.selectedObject = {
      supplier_name: "",
    };
    this.formMode = sessionStorage.paymentMode;
    if (!this.formMode) this.formMode = PaymentFormMode.create;
    if (this.formMode == PaymentFormMode.create) {
      this.editable = true;
      this.gridData.push(this.exampleData);
      this.currentPayment = {
        re_ref_no: "",
        rpd_description: this.selectedReason,
        re_date: this.dateFormator(new Date()),
        ca_date: this.dateFormator(new Date()),
      };
      this.currentCaDate = this.currentPayment["ca_date"];
    } else {
      if (
        this.formMode == PaymentFormMode.duplicate ||
        this.formMode == PaymentFormMode.modify
      ) {
        this.editable = true;
      } else {
        this.editable = false;
      }
    }
    
    let btnAction = sessionStorage.BtnOption;
    if (btnAction == null || btnAction == undefined) btnAction = BtnOption.saveAndClose;
    if (btnAction == BtnOption.saveAndClose) this.btnOptionText = this.resources.vi.btnAction.saveAndClose;
    else this.btnOptionText = this.resources.vi.btnAction.storeSave;
    this.comboboxData = [
      {
        name: "account",
        width: 440,
        api: `${this.resources.endpoint}Account/Filter?pageSize=100&pageNumber=`,
        mapData: [
          {
            title: this.resources.vi.accountList.data.accountNumber,
            modelValue: "accountnumber",
            width: 150,
          },
          {
            title: this.resources.vi.accountList.data.accountName,
            modelValue: "accountname",
            width: 250,
          },
        ],
        displayModel: "accountnumber",
        positionLeft: 0,
        positionTop: 30,
      },
      {
        name: "supplier",
        width: 750,
        api: `${this.resources.endpoint}Supplier/Filter?pageSize=100&pageNumber=`,
        mapData: [
          {
            title: this.resources.vi.cashControl.objectCombobox.object,
            modelValue: "supplier_code",
            width: 75,
          },
          {
            title: this.resources.vi.cashControl.objectCombobox.objectName,
            modelValue: "supplier_name",
            width: 200,
          },
          {
            title: this.resources.vi.cashControl.objectCombobox.tax_code,
            modelValue: "tax_code",
            width: 100,
          },
          {
            title: this.resources.vi.cashControl.objectCombobox.address,
            modelValue: "address",
            width: 150,
          },
          {
            title: this.resources.vi.cashControl.objectCombobox.phone_number,
            modelValue: "phone_number",
            width: 100,
          },
        ],
        displayModel: "supplier_code",
        positionLeft: -330,
        positionTop: 30,
      },
    ];
  },

  async mounted() {
    if (!this.editable) {
      this.$refs.paymentReason.setFocus();
      let inputEl = document
        .querySelector(".pd-main")
        .querySelectorAll("input");
      inputEl.forEach((el) => {
        el.parentElement.classList.add("disable");
      });
    }
    if (this.formMode != PaymentFormMode.create && this.formMode != PaymentFormMode.duplicate){
      await this.getPaymentById(this.$route.params.id);
      await this.getDetailData(this.$route.params.id);
      if (this.formMode == PaymentFormMode.duplicate){
        this.currentPayment['re_ref_no'] = "";
        await this.getNewRefNo();
      } 
    } else {
      if (this.formMode == PaymentFormMode.duplicate){
        let currentPaymentId = sessionStorage.currentPaymentId;
        await this.getPaymentById(currentPaymentId);
        await this.getDetailData(currentPaymentId);
      }
      await this.getNewRefNo();
    }
    window.addEventListener("keydown", this.handleOnKeydown);
  },

  unmounted() {
    window.removeEventListener("keydown", this.handleOnKeydown);
  },

  methods: {

    /**
     * Hành động của button option khi được chọn
     * @author Xuân Đào (09/05/2023)
     */
    optionalButtonClicked(){
      const btnMode = sessionStorage.BtnOption;
      if (btnMode == BtnOption.saveAndAdd) {
        this.saveAndAdd();
      } else {
        this.saveAndClose();
      }
    },

    /**
     * Cho phép sửa form
     * @author Xuân Đào (09/05/2023)
     */
    enableEditor(){
      let inputEl = document
            .querySelector(".pd-main")
            .querySelectorAll("input");
          for (let i = 0; i < inputEl.length; i++) {
            inputEl[i].parentElement.classList.remove("disable");
          }
          if (this.$refs.editableGrid.selected_index)
            this.$refs.editableGrid.gridData[
              this.$refs.editableGrid.selected_index
            ]["edit_mode"] = true;
    },

    /**
     * Disable các input không cho phép sửa
     * @author Xuân Đào (09/05/2023)
     */
    disableEditor(){
      let inputEl = document
            .querySelector(".pd-main")
            .querySelectorAll("input");
          for (let i = 0; i < inputEl.length; i++) {
            inputEl[i].parentElement.classList.add("disable");
          }
          if (this.$refs.editableGrid.gridData[this.$refs.editableGrid.selected_index])
            this.$refs.editableGrid.gridData[
              this.$refs.editableGrid.selected_index
            ]["edit_mode"] = false;
    },

    /**
     * Gửi yêu cầu sửa
     * @author Xuân Đào (09/05/2023)
     */
    editRequest(){
      this.formMode = PaymentFormMode.modify;
      this.editable = true;
      this.enableEditor();
    },

    /**
     * Hàm lưu và thêm mới dữ liệu
     * @author Xuân Đào (08/05/2023)
     */
    saveAndAdd(){
      sessionStorage.BtnOption = BtnOption.saveAndAdd;
      this.showOptionBtn = false;
      this.btnOptionText = this.resources.vi.btnAction.storeSave;
      this.saveRequest(ActionAfterSave.add);
    },

    /**
     * Hàm lưu và đóng form
     * @author Xuân Đào (08/05/2023)
     */
    saveAndClose(){
      sessionStorage.BtnOption = BtnOption.saveAndClose;
      this.showOptionBtn = false;
      this.btnOptionText = this.resources.vi.btnAction.saveAndClose;
      this.saveRequest(ActionAfterSave.close);
    },

    /**
     * Hàm lấy số chứng từ mới
     * @author Xuân Đào (08/05/2023)
     */
    async getNewRefNo(){
      const res = await fetch(
        this.resources.endpoint + "ReceiptPayment/GetNewCode")
      const data = await res.json();
      // Vue.set(this.currentPayment,'re_ref_no',   data['Data']);
      this.currentPayment['re_ref_no'] = data['Data'];
      // ).then((res) =>
      //   res.json().then((data) => {
      //     this.currentPayment['re_ref_no'] = data['Data'];
      //   })
      // )
    },

    /**
     * Hàm lấy chứng từ qua id
     * @author Xuân Đào (08/05/2023)
     */
    async getPaymentById(id) {
      
      const res = await fetch(this.resources.endpoint + "ReceiptPayment/" + id)
      const data = await res.json();
      this.currentPayment = data["Data"][0];
        this.currentPayment['re_date'] = this.dateFormator(this.currentPayment['re_date']);
        this.currentPayment['ca_date'] = this.dateFormator(this.currentPayment['ca_date']);
        this.selectedObject = {
          supplier_code: this.currentPayment['supplier_code'],  
          supplier_name: this.currentPayment['supplier_name'],
          address: this.currentPayment['address'],
      };
    },

    /**
     * Hàm cập nhật dữ liệu mô tả dưới detail khi edit trên master
     * @author Xuân Đào (08/05/2023)
     */
    desMasterInput(input) {
      this.gridData.forEach((el) => (el["rpd_description"] = input));
    },

    /**
     * Hàm cập nhật ngày tháng theo phụ thuộc
     * @author Xuân Đào (08/05/2023)
     */
    updateReDate(newValue) {
      if (this.currentPayment["re_date"] == this.currentCaDate) {
        this.$refs.caDate.setValue(newValue);
        this.currentCaDate = newValue;
      }
      this.currentPayment["re_date"] = newValue;
    },

    /**
     * Hàm cập nhật ngày chứng từ
     * @author Xuân Đào (08/05/2023)
     */
    updateCaDate(newValue) {
      this.currentPayment["ca_date"] = newValue;
      this.currentCaDate = newValue;
    },

    // dateFormatorv2(data){
    //   let date = data.toString().replaceAll('/','-');
    //   return
    // },

    /**
     * Hàm định dạng dữ liệu ngày tháng
     * @author Xuân Đào (08/05/2023)
     */
    dateFormator(data) {
      const dateData = new Date(data);
      const day =
        dateData.getDate() < 10 ? "0" + dateData.getDate() : dateData.getDate();
      const month =
        dateData.getMonth() + 1 < 10
          ? "0" + (dateData.getMonth() + 1)
          : dateData.getMonth() + 1;
      const year = dateData.getFullYear();
      return `${year}-${month}-${day}`;
    },

    /**
     * Hàm cập nhật dữ liệu nhân viên được chọn
     * @author Xuân Đào (08/05/2023)
     */
    updateSelectedEmployee(employee) {
      this.selectedEmployee = employee;
    },

    /**
     * Hàm lấy dữ liệu dưới detail
     * @author Xuân Đào (08/05/2023)
     */
    async getDetailData(id) {
      let apiString =
        this.resources.endpoint +
        "ReceiptPaymentDetail/GetAllByReId?re_id=" + id;
      let res = await fetch(apiString);
      let data = await res.json();
      this.gridData = data["Data"]["data"];
      for (let i=0;i<this.gridData.length;i++){
        this.summary += this.gridData[i]['amount'];
        this.gridData[i] = Object.assign({re_no: i+1}, this.gridData[i]);
        this.gridData[i]['amount'] = this.formatMoney(this.gridData[i]['amount']);
      }
      this.$refs.editableGrid.formatDataMoney();
    },

    /**
     * Hàm focus nhập liệu bị lỗi khi đóng cảnh báo
     * @author Xuân Đào (08/05/2023)
     */
    dialogClosed() {
      if (this.currentElErr) {
        this.currentElErr.setFocus();
        return;
      }
      if (this.currentError != null) {
        this.$refs.editableGrid.focusElement(
          this.currentError,
          this.currentErrorIndex
        );
      }
    },

    /**
     * Hàm tính tổng tiền dưới detail
     * @param data: Dữ liệu tiền được cập nhật
     * @param dataIndex: Chỉ số của data
     * @author Xuân Đào (08/05/2023)
     */
    updateSumary(data, dataIndex) {
      if (data) {
        this.summary -= parseInt(
          this.gridData[dataIndex]["amount"].toString().replaceAll(".", "")
        );
        this.summary += parseInt(data.replaceAll(".", ""));
      }
    },

    /**
     * Hàm thực hiện validate dữ liệu
     * @author Xuân Đào (08/05/2023)
     */
    validate() {
      for (let i = 0; i < this.gridData.length; i++) {
        // if (this.gridData[i].edit_mode == false) {
          if (this.gridData[i]["debit_account"].length < 3) {
            this.currentError = i;
            this.currentErrorIndex = 2;
            this.errMessage =
              this.resources.vi.paymentDetail.paymentError.debitRequired;
            return false;
          } else if (this.gridData[i]["credit_account"].length < 3) {
            this.currentError = i;
            this.currentErrorIndex = 3;
            this.errMessage =
              this.resources.vi.paymentDetail.paymentError.creditRequired;
            return false;
        //   }
        // } else {
          //
        }
      }
      if (this.currentPayment["re_date"] < this.currentCaDate) {
        this.currentElErr = this.$refs.reDate;
        this.errMessage = `Ngày hạch toán phải lớn hơn hoặc bằng Ngày chứng từ <${this.currentCaDate}>. Xin vui lòng kiểm tra lại`;
        return false;
      }
      return true;
    },

    /**
     * Hàm lấy dữ liệu chứng từ trong input
     * @author Xuân Đào (08/05/2023)
     */
    getPaymentData() {
      if (this.selectedObject['supplier_id']) {
        this.currentPayment.supplier_code = this.selectedObject.supplier_code;
        this.currentPayment.supplier_name = this.selectedObject.supplier_name;
        this.currentPayment.account_id = this.selectedObject.supplier_id;
        this.gridData.forEach(
        (el) => (el.object_id = this.selectedObject.supplier_id)
        );
      } else {
        this.currentPayment['account_id'] = this.currentPayment['supplier_id'];
      }
      if (this.selectedEmployee) {
        this.currentPayment.employee_id = this.selectedEmployee.employeeid;
      } else {
        this.currentPayment['employee_id'] = this.currentPayment['employeeid'];
      }
      if (this.selectedReason == "Chi tiền cho "){
        this.currentPayment.re_reason = "Chi khác";
      } else 
        this.currentPayment.re_reason = this.selectedReason;
      this.gridData.forEach(
        (el) => (el["amount"] = el["amount"].toString().replaceAll(".", ""))
      );
    },

    /**
     * Hàm lưu chứng từ
     * @param action: Hành động sau khi lưu
     * @author Xuân Đào (08/05/2023)
     */
    async savePayment(action) {
      if (this.formMode == PaymentFormMode.create || this.formMode == PaymentFormMode.duplicate){
        let paymentAPI = this.resources.endpoint + "ReceiptPayment";
        let detailAPI =
          this.resources.endpoint + "ReceiptPaymentDetail/BulkCreate";
        const paymentOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.currentPayment),
        };
        const paymentRes = await fetch(paymentAPI, paymentOptions);
        const paymentData = await paymentRes.json();
        if (!paymentData["IsSuccess"]) {
          this.$refs.singleDialog.showDialogOn(
            dialogType.error,
            paymentData["Data"][0]["UserMsg"],
            this.resources.vi.btnAction.confirm
          );
          this.currentElErr = this.$refs.reRefNo;
          return;
        }
        const re_id = paymentData.Data["Data"];
        this.gridData.forEach((el) => {
          el.rp_id = re_id;
          el.debit_account = el.debit_account.toString();
          el.credit_account = el.credit_account.toString();
        });
        const detailOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.gridData),
        };
        const detailRes = await fetch(detailAPI, detailOptions);
        if (detailRes.status == 201 && paymentRes.status == 201) {
          this.Toast.showToastMsg(ToastType.Success, paymentData.Data["Message"]);
          if (action == ActionAfterSave.watch){
            this.formMode = PaymentFormMode.watch;
            this.editable = false;
            sessionStorage.PaymentFormMode = PaymentFormMode.watch;
            this.$router.push({ name: "PaymentDetail", params: {id: re_id}});
            this.disableEditor();
          } else if (action == ActionAfterSave.close){
            this.$router.go(-this.numOfRouterWasGo);
          } else {
            this.currentPayment = {
              re_ref_no: "",
              rpd_description: "",
              re_date: this.dateFormator(new Date()),
              ca_date: this.dateFormator(new Date()),
              fullname: "",
            };
            this.$router.push({ name: "PaymentDetail", params: {id: ''}});
            this.numOfRouterWasGo++;
            this.summary = 0;
            this.selectedObject = {
              supplier_name: "",
            };
            this.gridData = [];
            this.gridData.push(fixData);
           await this.getNewRefNo();
            this.formMode = PaymentFormMode.create;
            this.enableEditor();
          }
          this.gridKey++;
        }
      } else if (this.formMode == PaymentFormMode.modify){
        let apiString = this.resources.endpoint + "ReceiptPayment?id=" + this.currentPayment['re_id'];
        const options = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.currentPayment),
        }
        const res = await fetch(apiString, options);
        const data = await res.json();
        if (data['IsSuccess']){
          let detailUpdate = this.resources.endpoint + "ReceiptPaymentDetail/UpdateMultiple?re_id=" + this.currentPayment['re_id'];
          const gridData = this.$refs.editableGrid.gridData;
          for(let i=0;i<gridData.length;i++){
            gridData[i]['rp_id'] = this.currentPayment['re_id'];
            gridData[i]['object_id'] = this.currentPayment['supplier_id']
            gridData[i]['credit_account'] = gridData[i]['credit_account'].toString();
            gridData[i]['debit_account'] = gridData[i]['debit_account'].toString();
          }
          const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gridData),
          }
          const res = await fetch(detailUpdate, options);
          const data = await res.json();
          if (data['IsSuccess']){
            this.Toast.showToastMsg(ToastType.Success, data['Message']);
            if (action == ActionAfterSave.watch){
            this.formMode = PaymentFormMode.watch;
            this.editable = false;
            this.disableEditor();
          } else if (action == ActionAfterSave.close){
            this.$router.go(-this.numOfRouterWasGo);
          } else {
            this.currentPayment = {
              re_ref_no: "",
              rpd_description: "",
              re_date: this.dateFormator(new Date()),
              ca_date: this.dateFormator(new Date()),
              fullname: "",
            };
            this.$router.push({ name: "PaymentDetail", params: {id: ''}});
            this.numOfRouterWasGo++;
            this.summary = 0;
            this.selectedObject = {
              supplier_name: "",
            };
            this.gridData = [];
            this.gridData.push(fixData);
            this.getNewRefNo();
            this.formMode = PaymentFormMode.create;
            this.enableEditor();
          }
          this.gridKey++;
          }
        }
      }
      sessionStorage.paymentMode = this.formMode;
    },

    /**
     * Hàm gửi yêu cầu lưu chứng từ
     * @author Xuân Đào (08/05/2023)
     */
    saveRequest(action) {
      if (this.validate()) {
        this.getPaymentData();
        this.savePayment(action);
      } else {
        if (this.currentError != null) {
          this.$refs.singleDialog.showDialogOn(
            dialogType.info,
            this.errMessage,
            resources.vi.btnAction.close
          );
          this.$refs.editableGrid.selected_index = this.currentError;
          this.gridData.forEach((el) => (el["edit_mode"] = false));
          this.gridData[this.currentError]["edit_mode"] = true;
        }
        if (this.currentElErr != null) {
          this.$refs.singleDialog.showDialogOn(
            dialogType.info,
            this.errMessage,
            resources.vi.btnAction.close
          );
        }
      }
    },

    /**
     * Hàm cập nhật dữ liệu dưới detail khi thay đổi
     * @author Xuân Đào (08/05/2023)
     */
    updateEditValue(data, dataIndex, modelIndex) {
      this.gridData[dataIndex][
        Object.keys(this.gridData[this.$refs.editableGrid.selected_index])[
          modelIndex
        ]
      ] = data;
    },

    /**
     * Hàm cập nhật dữ liệu khi dữ liệu combobox bị thay đổi
     * @author Xuân Đào (08/05/2023)
     */
    comboboxDataChange(index, data) {
      if (index == 2 || index == 3) {
        if (index == 2){
          this.gridData[this.$refs.editableGrid.selected_index]['debit_account'] = data["accountnumber"];
        } else {
          this.gridData[this.$refs.editableGrid.selected_index]['credit_account'] = data["accountnumber"];
        }
      } else if (index == 5) {
        this.gridData[this.$refs.editableGrid.selected_index][
          Object.keys(this.gridData[this.$refs.editableGrid.selected_index])[
            index
          ]
        ] = data["supplier_code"];
        this.gridData[this.$refs.editableGrid.selected_index][
          Object.keys(this.gridData[this.$refs.editableGrid.selected_index])[
            index + 1
          ]
        ] = data["supplier_name"];
      }
    },

    /**
     * Hàm xử lý sự kiện bàn phím
     * @author Xuân Đào (08/05/2023)
     */
    handleOnKeydown() {
      if (event.key == "Tab") {
        if (document.activeElement.id == "cancel") {
          event.preventDefault();
          this.$refs.inpObject.setFocus();
        }

        if (!this.editable){
          event.preventDefault();
        }
      }

      if (this.formMode != PaymentFormMode.watch){
        if (event.key == "Escape"){
          this.$router.go(-this.numOfRouterWasGo);
        }
        console.log(event);
      }
    },


    /**
     * Hàm cập nhật khi đối tượng thay đổi
     * @author Xuân Đào (07/05/2023)
     */
    updateSelectedObject(object) {
      if (object) {
        this.selectedObject = Object.assign({}, object);
        this.gridData.forEach((el) => {
          if (this.selectedReason) {
            el[
              "rpd_description"
            ] = `${this.selectedReason} ${this.selectedObject["supplier_name"]}`;
            this.currentPayment[
              "re_description"
            ] = `${this.selectedReason} ${this.selectedObject["supplier_name"]}`;
          } else {
            el["rpd_description"] += ` ${this.selectedObject["supplier_name"]}`;
            this.currentPayment[
              "re_description"
            ] += ` ${this.selectedObject["supplier_name"]}`;
          }
        });
        this.selectedObject["address"] = object["address"];
        console.log(this.selectedObject);
        this.exampleData.supplier_code = object["supplier_code"];
        this.exampleData.supplier_name = object["supplier_name"];
      }
    },

     /**
     * Hàm cập nhật khi lý do chi thay đổi
     * @author Xuân Đào (07/05/2023)
     */
    updateReason(index) {
      if (index == 6) {
        this.selectedReason = "Chi tiền cho ";
      } else
        this.selectedReason =
          this.resources.vi.paymentDetail.payment_reason[index];
    },

     /**
     * Hàm định dạng dữ liệu số
     * @param amount: tổng tiền
     * @param decimalCount: Số sau dấu phẩy mặc định 0
     * @param thousands: Ngăn cách hàng nghìn
     * @author Xuân Đào (07/05/2023)
     */
    formatMoney(amount, decimalCount = 0, decimal = "", thousands = ".") {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      const negativeSign = amount < 0 ? "-" : "";
      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;
      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    },

     /**
     * Hàm quay lại trang trước đó
     * @author Xuân Đào (07/05/2023)
     */
    closeOnClick() {
      this.$router.go(-this.numOfRouterWasGo);
    },

     /**
     * Hàm thêm hàng mới dưới detail
     * @author Xuân Đào (07/05/2023)
     */
    addRow() {
      let newData = Object.assign({}, this.gridData[this.gridData.length - 1]);
      newData["re_no"] = this.gridData[this.gridData.length - 1]["re_no"] + 1;
      newData["edit_mode"] = true;
      newData["amount"] = 0;
      this.gridData.forEach((el) => (el.edit_mode = false));
      this.gridData.push(newData);
      this.$refs.editableGrid.selected_index = this.gridData.length - 1;
    },

     /**
     * Hàm xóa hết dữ liệu dưới detail
     * @author Xuân Đào (07/05/2023)
     */
    removeAll() {
      this.gridKey++;
      this.gridData = [this.exampleData];
    },

     /**
     * Hàm xóa dữ liệu dưới detail theo từng dòng
     * @param index: chỉ số của dữ liệu cần xóa
     * @author Xuân Đào (07/05/2023)
     */
    deleteOnClick(index) {
      if (this.gridData.length >= 2) {
        this.gridKey++;
        this.gridData = this.removeItemFromArr(this.gridData, index);
        for (let i = 0; i < this.gridData.length; i++)
          this.gridData[i]["re_no"] = i + 1;
      }
    },

     /**
     * Hàm xóa 1 item khỏi array
     * @param proxy: proxy cần xóa
     * @param index: vị trí bị xóa
     * @author Xuân Đào (07/05/2023)
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
  },

  data() {
    return {
      showOptionBtn: false,
      resources: resources,
      payment_data: null,
      gridData: [],
      gridKey: 0,
      summary: 0,
      exampleData: {
        re_no: 1,
        rpd_description: "Chi tien cho",
        debit_account: "",
        credit_account: "",
        amount: 0,
        supplier_code: "",
        supplier_name: "",
        edit_mode: false,
      },
      currentPayment: null,
      selectedObject: null,
      selectedReason: "Chi tiền cho ",
      selectedEmployee: null,
      currentError: null,
      currentErrorIndex: null,
      comboboxData: [],
      errMessage: null,
      formMode: 0,
      editable: false,
      currentCaDate: null,
      currentElErr: null,
      detailKey: 0,
      showConfirm: true,
      btnOptionText: "",
      numOfRouterWasGo: 1,
    };
  },
};
</script>
<style scoped>

.store-option{
  margin-right: -24px;
}

.btn-group__option{
  position: absolute;
  min-width: 100px;
  right: 0;
  background-color: #fff;
  bottom: 26px;
  border: solid #a0a0a0 1px;
  border-radius: 2px;
}

.btn-group__option--item{
  font-size: 13px;
  line-height: 26px;
  padding: 2px 10px;
}

.btn-group__option--item:hover{
  background-color: rgba(80, 184, 60, 0.1);
  color: #2ca01c;
  cursor: pointer;
}

.group-btn{
  padding-right: 30px;
}

.dropdown-btn{
	width: 26px;
	height: 26px;
  background-color: #2ca01c;
  position: absolute;
  right: -22px;
  top: 0;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
}

.dropdown-btn:focus{
  outline-color: #fff;
}

.dropdown-icon{
  background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -844px -358px;
  width: 26px;
	height: 18px;
  border-left: solid #fff 1px;
  position: absolute;
  top: -2px;
}

.dropdown-btn:hover{
  background-color: #4ab335 !important;
}

.disable {
  pointer-events: none;
}

.disable button {
  color: #a0a0a0;
  border-color: #a0a0a0 !important;
}

.pd-save__addbtn:focus {
  background-color: #2ca01c;
  outline: solid #e0e0e0 2px;
}

.pd-savebtn:focus {
  background-color: inherit;
  outline: solid #e0e0e0 2px;
}

.tr-selected .fix-start div input {
  text-align: center;
}

.grid-btn:focus {
  outline: solid #a0a0a0 2px;
}

.popup-main__footer {
  height: 42px;
}

.btn-group button:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}

.btn-group button {
  padding: 0 8px;
  font-size: 13px;
  font-family: Notosans-bold;
  background-color: #fff;
  border: solid #111111 1px;
  border-radius: 2px;
  outline: unset;
}

.btn-group {
  height: 24px;
  width: 300px;
  margin-top: 8px;
  display: flex;
  column-gap: 8px;
  margin-left: 24px;
}

.grid-main__title {
  height: 24px;
  width: 100%;
  font-family: Notosans-bold;
  line-height: 24px;
  font-size: 13px;
}

.grid-main__viewer {
  margin-top: 8px;
}

.grid-main {
  width: calc(100% - 48px);
  margin: 12px 24px;
  height: 90%;
  overflow: auto;
}

.grid-content {
  margin-top: 24px;
  width: 100%;
  height: 387px;
  overflow: auto;
  background-color: #fff;
}

.pd-footer {
  width: 100%;
  height: 42px;
  background-color: #555555;
  position: absolute;
  bottom: 0;
}

.pd-footer button {
  color: #fff;
}

.pd-footer button:hover {
  background-color: #404040;
}

.btn-saveAndAdd button:hover {
  background-color: #4ab335 !important;
}

.btn-saveAndAdd{
  position: relative;
}

.last-row {
  width: 168px !important;
}

.pd-more::after {
  content: "chứng từ gốc";
  display: block;
  font-size: 13px;
  position: absolute;
  right: -90px;
  bottom: 0;
}

.pd-more,
.last-row {
  flex: 0 !important;
}

.pd-row3 {
  width: 580px;
}

.info-area {
  display: flex;
  column-gap: 0;
}

.summary-title {
  height: 26px;
  font-size: 13px;
  font-family: Notosans;
}

.summary-value {
  height: 48px;
  font-size: 36px;
  font-family: Notosans-bold;
}

.fix-right {
  justify-content: flex-end;
  margin-right: 12px;
}

.pd-main__row {
  display: flex;
  column-gap: 12px;
}

.pd-main__content--summary {
  height: 100%;
  min-width: 250px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.pd-main__content--timeinfo {
  height: 100%;
  min-width: 150px;
  width: 210px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.pd-main__content--timeinfo::before {
  content: "";
  display: block;
  height: 68%;
  width: 1px;
  background-color: #b0b0b0;
  position: absolute;
  top: 26px;
  left: 890px;
}

.pd-main__content--baseinfo {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 850px;
  height: 100%;
}

.pd-main__content {
  height: 245px;
  width: 100%;
  padding: 24px;
  margin-top: 24px;
  display: flex;
  box-sizing: border-box;
  min-width: 800px;
  position: relative;
  justify-content: space-between;
}

.pd-btn__group {
  height: calc(100% - 16px);
  padding: 8px 8px 0 0;
  width: calc(100% - 6px);
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;
  cursor: pointer;
}

.pd-combobox {
  background-color: #fff;
  margin-left: 12px;
  width: 400px;
}

.pd-main {
  height: 100%;
  width: 100%;
  background-color: rgba(66, 66, 66, 0.345);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.pd-content {
  height: 100%;
  width: 100%;
  background-color: #eceef1;
}

.pd-header {
  height: 36px;
  width: 100%;
  display: flex;
}

.pd-header__left-side {
  height: 100%;
  width: calc(50% - 32px);
  display: flex;
  padding: 12px 16px;
  align-items: center;
  column-gap: 12px;
}

.pd-header__right-side {
  height: 100%;
  width: calc(50% - 32px);
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
}

.pd-history__icon {
  height: 24px;
  width: 24px;
  background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -648px -145px;
}

.pd-title {
  height: 36px;
  font-size: 24px;
  color: #111111;
  line-height: 36px;
  font-family: Notosans-bold;
  min-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>