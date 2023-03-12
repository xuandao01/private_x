// Component tạo ra một input datepicker
// Author: Xuân Đào(05/03/2023)
<template>
  <div class="text">{{ title }}</div>
  <input
    type="date"
    class="pop-input date-time"
    v-model="this.value"
    @blur="this.validate()"
    ref="mInput"
  />
  <div v-if="inValid" class="errMes">Ngày không hợp lệ</div>
</template>
<script>
export default {
  name: "MDatePicker",
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      value: null,
      datePicked: null,
      inValid: false,
    };
  },
  methods: {
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
.errMes {
  color: red;
}
.input-err {
  border-color: #e81e1e !important;
}
</style>