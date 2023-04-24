// Component tạo ra một input datepicker
// Props gồm title: Tiêu đề, modelValue: Dữ liệu binding
// Author: Xuân Đào(05/03/2023)
<template>
  <div class="dp-main">
    <div class="title">{{ title }}</div>
    <input
      type="date"
      class="pop-input date-time"
      v-model="this.value"
      @blur="this.validate()"
      ref="mInput"
    />
    <div v-if="inValid" class="errMes">Ngày không hợp lệ</div>
  </div>
</template>
<script>
export default {
  name: "MDatePicker",
  props: {
    title: {
      type: String,
      required: false,
    },
    modelValue: {
      type: Date,
      required: false,
    }
  },
  data() {
    return {
      value: null,
      datePicked: null,
      inValid: false,
    };
  },
  created(){
    this.value = this.modelValue;
  },
  watch:{
    value: function(newVal){
      this.$emit("update:modelValue", newVal);
    }
  },
  methods: {
    /**
     * Hàm validate dữ liệu hợp lệ 
     * 
     * @author Xuân Đào (04/04/2023)
     */
    validate() {
      const value = this.$refs.mInput.value;
      if (value && new Date(value) <= new Date()) {
        this.inValid = false;
        this.$refs.mInput.classList.remove("input-err");
      } else {
        this.$refs.mInput.classList.add("input-err");
        this.inValid = true;
      }
    },
  },
};
</script>
<style scoped>

.pop-input{
  border-radius: 2px;
  border: solid 1px #d0d0d0;
  outline: unset;
  font-size: 13px;
  height: 26px;
  min-width: 150px;
  padding: 0 8px;
}

.dp-main{
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.errMes {
  color: red;
  font-size: 13px;
}
.input-err {
  border-color: #e81e1e !important;
}
.title{
  font-weight: 600;
  font-family: opens-san-bold;
  font-size: 13px;
}

</style>