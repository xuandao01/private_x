// Component tạo ra một input tự validate
// Author: Xuân Đào(05/03/2023)
<template>
  <div class="inf-component com1">
    <div class="text">
      <span>{{ inputTitle }}</span>
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
    modelValue: {
      type: String,
    },
    inputTitle: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  watch:{
    value(newVal){
      this.$emit("update:modelValue", newVal);
    }
  },

  created() {
    this.value = this.modelValue;
    console.log(this.modelValue);
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
    focus() {
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
      const value = this.$refs.mInput.value;
      if (value.trim() == "" || value == null || value == undefined){
        this.showErr();
      } else {
        this.hideErr();
      }
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
.com1 {
  width: 150px;
}
.errMes{
  color: red;
}
.input-err{
    border-color: #E81E1E !important;
}
</style>