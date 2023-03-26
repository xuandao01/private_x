// Component hiển thị mà hình popup cho phép thêm nhân viên mới
// Author: Xuân Đào (05/03/2023)
<template>
  <div class="popup" @keydown="keyboardHandle" id="popupId">
    <div class="popup-main" id="popupMain">
      <div class="popup-main__header">
        <div class="part1">
          <div class="title opens-san-bold">{{ txtData.title }}</div>
          <div class="option">
            <div class="option is-customer">
              <input type="checkbox" class="popup-checkbox" />
              <div class="text">{{ txtData.customer }}</div>
            </div>
            <div class="option is-supplier">
              <input type="checkbox" class="popup-checkbox" />
              <div class="text">{{ txtData.supplier }}</div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <div class="help" title="Trợ giúp (F1)">
            <div class="icon help-icon"></div>
          </div>
          <div class="close" title="Đóng (ESC)">
            <button
              id="btn-close"
              ref="closeBtn"
              class="close"
              @click="this.closePopup()"
            >
              <div class="icon close-icon"></div>
            </button>
          </div>
        </div>
      </div>
      <!-- Content table  -->
      <div class="popup-main__context">
        <div class="personal-info">
          <div class="left-side">
            <div class="inf-area">
              <MInput
                ref="inpEmployeeCode"
                :inputTitle="txtData.code"
                :required="true"
                v-model:modelValue="employee.EmployeeCode"
                :canFocus="true"
              />
              <MInput
                ref="inpEmployeeFullName"
                class="com2"
                :inputTitle="txtData.fullName"
                :required="true"
                v-model:modelValue="employee.FullName"
              />
            </div>
            <div class="inf-area">
              <div class="inf-component unit">
                <MCombobox
                  ref="inpDepartment"
                  title="Phòng ban"
                  :isRequired="true"
                  api="https://localhost:7006/api/Departments"
                  v-model="employee.DepartmentName"
                  modelName="DepartmentName"
                />
              </div>
            </div>
            <div class="inf-area">
              <div class="inf-component position">
                <MInput
                  class="position-name"
                  :inputTitle="txtData.position"
                  v-model:modelValue="employee.PositionName"
                  ref="inpPosition"
                />
              </div>
            </div>
          </div>
          <!-- right-side -->
          <div class="right-side">
            <div class="inf-area">
              <div class="inf-component dob" style="width: 170px">
                <MDatePicker
                  :title="txtData.dob"
                  v-model="this.employee.DateOfBirth"
                ></MDatePicker>
              </div>
              <div class="inf-component com2 gender-field">
                <div class="gender" id="gender">
                  <MRadioButton
                    :title="txtData.gender"
                    :data="['Nam', 'Nữ', 'Khác']"
                    v-model="employee.GenderName"
                  ></MRadioButton>
                </div>
              </div>
            </div>
            <div class="inf-area">
              <div class="inf-component" style="flex: 1">
                <MInput
                  class="position-name"
                  :inputTitle="txtData.identity"
                  v-model:modelValue="employee.IdentityNumber"
                  ref="inpPosition"
                />
              </div>
              <div class="inf-component issue-date" style="width: 170px">
                <MDatePicker
                  :title="txtData.dateOfIssue"
                  v-model="this.employee.identityDate"
                ></MDatePicker>
              </div>
            </div>
            <div class="inf-area">
              <MInput
                class="position-name"
                :inputTitle="txtData.issuedBy"
                ref="inpPosition"
              />
            </div>
          </div>
        </div>
        <!-- contact-inf -->
        <div class="contact-info">
          <div class="inf-area">
            <div class="inf-component">
              <MInput :inputTitle="txtData.address" ref="inpPosition" />
            </div>
          </div>
          <div class="inf-area">
            <div class="inf-component">
              <MInput :inputTitle="txtData.phoneNumber" ref="inpPosition" />
            </div>
            <div class="inf-component">
              <MInput :inputTitle="txtData.landingPhone" ref="inpPosition" />
            </div>
            <div class="inf-component">
              <MInput inputTitle="Email" ref="inpPosition" />
            </div>
          </div>
          <div class="inf-area">
            <div class="inf-component">
              <MInput :inputTitle="txtData.bankAccount" ref="inpPosition" />
            </div>
            <div class="inf-component">
              <MInput
                class="position-name"
                :inputTitle="txtData.bankName"
                ref="inpPosition"
              />
            </div>
            <div class="inf-component">
              <MInput
                class="position-name"
                :inputTitle="txtData.bankBranch"
                ref="inpPosition"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Content footer -->
      <div class="popup-main__footer">
        <div class="btn group-btn">
          <div class="btn-save">
            <button id="save" class="optionalBtn">{{ txtBtn.store }}</button>
          </div>
          <div class="btn btn-saveAndAdd">
            <button @click="saveAndAdd" id="saveAdd">
              {{ txtBtn.storeSave }}
            </button>
          </div>
        </div>
        <div class="btn btn-close">
          <button @keydown="cancelOnKeyDown" id="cancel" class="optionalBtn">
            {{ txtBtn.cancel }}
          </button>
        </div>
      </div>
    </div>
    <ConfirmDialog
      v-if="confirmDialog"
      @hideDialog="this.closeDialog()"
      @hideDialogPopup="this.undoData()"
      @hideAndSave="this.closeSave()"
    ></ConfirmDialog>
  </div>
</template>
<script>
import MInput from "../base-component/MInput.vue";
import MCombobox from "../base-component/MCombobox.vue";
import MDatePicker from "../base-component/MDatePicker.vue";
import ConfirmDialog from "./MConfirmDialog.vue";
import resources from "../../js/resources.js";
import { toastControl } from "@/store/toast";
import { ToastType } from "../base-component/MToastItem.vue";
import MRadioButton from "../base-component/MRadioButton.vue";

export default {
  name: "employee-detail",
  components: {
    ConfirmDialog,
    MInput,
    MDatePicker,
    MCombobox,
    MRadioButton,
  },
  setup() {
    const ToastControl = toastControl();
    return {
      ToastControl,
    };
  },

  created() {
    this.employee = this.employeeSelected;
    fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/departments")
      .then((res) => res.json())
      .then((data) => {
        this.departments = data;
      });
    fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/positions")
      .then((res) => res.json())
      .then((data) => {
        this.positions = data;
      });
    window.addEventListener("keydown", this.handleKeyDown);
  },

  beforeUnmount() {
    window.removeEventListener("keyup", this.handleKeyDown);
  },

  computed: {
    /**
     * Hàm format dữ liệu ngày thàng
     *
     * Author: Xuân Đào (03/03/2023)
     */
    dateFormater() {
      const date = new Date(this.employee.DateOfBirth);
      const dateVal =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const month =
        date.getMonth() < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const year = date.getFullYear();
      return `${year}-${month}-${dateVal}`;
    },
  },

  watch: {
    // employee: {
    //   handler: function(newVal){
    //     console.log("Data change: ", newVal.Gender);
    //   },
    //   deep: true
    // }
  },

  beforeMount() {
    if (!this.employee) {
      this.employee = {
        EmployeeCode: "",
        FullName: "",
        GenderName: "",
        DepartmentName: "",
        PositionName: "",
        DateOfBirth: "",
        IdentityNumber: "",
      };
    } else {
      this.employee.DateOfBirth = this.dateFormater;
      if (this.employee.GenderName === "Không xác định")
        this.employee.GenderName = "Khác";
      console.log(this.employee.DateOfBirth);
    }
    this.CURRENT_DATA = Object.assign({}, this.employee);
  },

  mounted() {
    this.$refs.inpEmployeeCode.focus();
  },

  methods: {
    /**
     * Hàm đóng popup hiện tại
     *
     * Author: Xuân Đào (03/03/2023)
     */
    closePopup() {
      if (JSON.stringify(this.CURRENT_DATA) != JSON.stringify(this.employee)) {
        this.openConfirmDialog();
        return;
      }
      this.$emit("hidePopup");
    },
    /**
     * Hàm mở thông báo xác nhận đóng popup khi dữ liệu bị thay đổi
     *
     * Author: Xuân Đào (03/03/2023)
     */
    openConfirmDialog() {
      this.confirmDialog = true;
    },
    /**
     * Hàm xử lý sự kiện khi click các button trên dialog
     *
     * Author: Xuân Đào(03/03/2023)
     */
    undoData() {
      this.employee = this.CURRENT_DATA;
      // console.log("employee: ", this.employee);
      // console.log("currents: ", this.CURRENT_DATA);
      this.closePopup();
    },
    /**
     * Hàm đóng confirm dialog
     *
     * Author: Xuân Đào(05/03/2023)
     */
    closeDialog() {
      this.confirmDialog = false;
    },

    /**
     * Hàm handle sự kiện bàn phím
     *
     * Author: Xuân Đào (05/03/2023)
     */
    handleKeyDown(event) {
      this.keyPressed = event.keyCode;
      // Kiểm tra trước đó đã bấm phím nào chưa
      if (!this.lastKeyPress) {
        this.lastKeyPress = event.keyCode;
        this.lastTimePress = new Date();
      } else {
        // Kiểm tra thời gian giữa 2 lần nhấn phím
        if (new Date() - this.lastTimePress < 1000) {
          if (this.lastKeyPress == 17 && event.keyCode == 83) {
            // ctrl + s
            event.preventDefault();
            this.saveAndAdd();
          } else if (this.lastKeyPress == 17 && event.keyCode == 120) {
            // ctrl + f9
            event.preventDefault();
          }
        } else {
          this.lastKeyPress = event.keyCode;
          this.lastTimePress = new Date();
        }
      }
      if (event.keyCode == 27) {
        //ESC Pressed
        this.closePopup();
      }
    },

    /**
     * Hàm sử lý tab order của người dùng
     *
     * Author: Xuân Đào (05/03/2023)
     */
    cancelOnKeyDown() {
      if (event.keyCode == 9) this.$refs.closeBtn.focus();
    },

    /**
     * Hàm thêm mới một bản ghi vào db
     *
     * Author: Xuân Đào (06/03/2023)
     */
    async createRecord(
      employeeCode,
      employeeFullName,
      department,
      position,
      departmentId,
      positionId,
      identityNumber
    ) {
      try {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            createdDate: null,
            createdBy: "",
            modifiedDate: null,
            modifiedBy: "",
            employeeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            employeeCode: employeeCode,
            firstName: "",
            lastName: "",
            fullName: employeeFullName,
            gender: 0,
            dateOfBirth: null,
            phoneNumber: "",
            email: "",
            address: "",
            identityNumber: identityNumber,
            identityDate: "",
            identityPlace: "",
            joinDate: "",
            martialStatus: 0,
            educationalBackground: 0,
            qualificationId: "",
            departmentId: departmentId,
            positionId: positionId,
            workStatus: 0,
            personalTaxCode: "",
            salary: 0,
            positionCode: "",
            positionName: position,
            departmentCode: "",
            departmentName: department,
            qualificationName: "",
          }),
        };
        let res = await fetch(
          "https://apidemo.laptrinhweb.edu.vn/api/v1/Employees",
          options
        );
        let data = await res.json();
        console.log(data);
        return { status: res.status, value: data };
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Sự kiện cất và thêm
     *
     * Author: Xuân Đào (05/03/2023)
     */
    async saveAndAdd() {
      this.$refs.inpEmployeeCode.validate();
      this.$refs.inpEmployeeFullName.validate();
      this.$refs.inpDepartment.validate();
      if (this.$refs.inpEmployeeCode.isError) {
        this.$refs.inpEmployeeCode.focus();
      } else if (this.$refs.inpEmployeeFullName.isError) {
        this.$refs.inpEmployeeFullName.focus();
      } else if (this.$refs.inpDepartment.isError) {
        this.$refs.inpDepartment.setFocus();
      } else {
        if (this.actions == 0) {
          const employeeCode = this.$refs.inpEmployeeCode.value;
          const employeeFullName = this.$refs.inpEmployeeFullName.value;
          const department = this.$refs.inpDepartment.getValue();
          const position = this.$refs.inpPosition.value
            ? this.$refs.inpPosition.value
            : "";
          let departmentId = "";
          let positionId = "";
          for (const depart of this.departments) {
            if (
              this.removeVietnameseTones(
                depart.DepartmentName.toLowerCase()
              ) === this.removeVietnameseTones(department.toLowerCase())
            )
              departmentId = depart.DepartmentId;
          }
          for (const pos of this.positions) {
            if (
              this.removeVietnameseTones(pos.PositionName.toLowerCase()) ===
              this.removeVietnameseTones(position.toLowerCase())
            )
              positionId = pos.PositionId;
          }
          let res = await this.createRecord(
            employeeCode,
            employeeFullName,
            department,
            position,
            departmentId,
            positionId
          );
          console.log(res);
          this.$emit("hidePopup");
          if (res.status === 200 || res.status === 201) {
            this.ToastControl.showToastMsg(
              ToastType.Success,
              "Thêm mới thành công!"
            );
            this.$emit('refreshData');
          } else {
            console.log(res.value.userMsg);
            this.ToastControl.showToastMsg(ToastType.Error, res.value.userMsg);
          }
        } else {
          //
        }
      }
    },
    /**
     * Hàm xóa các ký tự dấu và các ký tự đặc biệt
     */
    removeVietnameseTones(str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      // Some system encode vietnamese combining accent as individual utf-8 characters
      // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
      // Remove extra spaces
      // Bỏ các khoảng trắng liền nhau
      str = str.replace(/ + /g, " ");
      str = str.trim();
      return str;
    },

    /**
     * Hàm đóng confirm dialog và save data
     *
     * Author: Xuân Đào (07/03/2023)
     */
    closeSave() {
      this.closeDialog();
      this.saveAndAdd();
    },

    /**
     * Hàm hiển thị thông báo xác nhận xóa
     *
     * Author: Xuân Đào (08/03/2023)
     */
    showDeleteDialog() {},
  },
  props: ["employeeSelected"],
  data() {
    return {
      employee: null,
      CURRENT_DATA: null,
      confirmDialog: false,
      txtData: resources.vi.employeeDetail,
      txtBtn: resources.vi.btnAction,
      keyPressed: null,
      checkFocus: false,
      lastKeyPress: null,
      lastTimePress: null,
      departments: null,
      positions: null,
      actions: 0,
      deleteDialog: true,
    };
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.position-name {
  width: 100%;
}

.opens-san-bold {
  font-family: opens-san-bold;
  font-weight: 600;
}
</style>