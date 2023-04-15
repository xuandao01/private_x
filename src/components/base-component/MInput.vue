// Component tạo ra một input tự validate
// Author: Xuân Đào(05/03/2023)
<template>
  <div class="inf-component com1">
    <div class="text-area">
      <span class="bold-text" :title="tooltip">{{ inputTitle }}</span>
      <a v-if="required"> *</a>
    </div>
    <input
      ref="mInput"
      type="text"
      autocomplete="off"
      id="employeeCode"
      v-model="this.value"
      @blur="this.validate()"
    />
    <div v-if="isError" class="errMes">{{ inputTitle }} không được trống</div>
  </div>
</template>
<script>
export default {
  name: "MInput",
  props: {
    // Dữ liệu binding
    modelValue: {
      type: String,
    },

    // Tiêu đề
    inputTitle: {
      type: String,
      required: false,
    },

    // Được phép trống
    required: {
      type: Boolean,
      required: false,
      default: false,
    },

    // Có thể focus
    canFocus: {
      type: Boolean,
      required: false,
      default: false,
    },

    tooltip:{
      type: String,
      required: false
    }
  },

  watch:{
    value(newVal){
      this.$emit("update:modelValue", newVal);
    }
  },

  created() {
    this.value = this.modelValue;
  },

  mounted() {
    this.$nextTick(() => {
      // this.focus();
    });
  },

  methods: {
    /**
     * Hàm set focus vào input
     * 
     * Author: Xuân Đào (05/03/2023)
     */
    setFocus() {
      this.$refs.mInput.focus();
    },
    /**
     * Hàm hiển thị thông báo lỗi nếu có
     */
    showErr(){
      this.isError = true;
      this.$refs.mInput.classList.add("input-err");
    },
    /**
     * Hàm xoá thông báo lỗi nếu có
     */
    hideErr(){
      this.$refs.mInput.classList.remove("input-err");
      this.isError = false;
    },
    /**Hàm thực hiện validate nếu cần */
    validate(){
      if (!this.required) return;
      let value = "";
      if(this.$refs.mInput){
        value = this.$refs.mInput.value;
        if (value.trim() == "" || value == null || value == undefined){
          this.showErr();
        } else {
          this.hideErr();
        }
      }
    },

    /**
     * Hàm lấy tên input
     *
     * @author  Xuân Đào (12/03/2023)
     */
    getInputName(){
      return this.inputTitle;
    }

  },
  data() {
    return {
      value: null,
      isError: false
    };
  },
};
</script>
<style scoped>
a {
  border: unset;
  outline: unset;
  text-decoration: none;
  color: #E81E1E;
}

.text-area{
  font-size: 13px;

}

.com1 {
  width: 150px;
}
.errMes{
  font-size: 13px;
  color: red;
}
.input-err{
    border-color: #E81E1E !important;
}

.bold-text{
  font-family: opens-san-bold !important;
  font-weight: 600;
}
</style>