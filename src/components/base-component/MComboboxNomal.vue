<template>
  <div
    class="combobox-nomal"
    id="combobox-paging"
    tabindex="0"
    :class="{ 'focused': showData, 'disabled': !enable }"
    @focus="comboboxOnFocus"
    @blur="comboboxOnBlur"
    @keydown="comboboxOnKeyDown"
  >
    <input ref="cbInput" type="text" class="selected" v-model="comboboxData[selected]" />
    <div class="icon dropdown-icon" @click="iconOnClick"></div>
    <div ref="cbMain" class="combo-item-list" v-show="showData">
      <div
        :class="{ 'seleted-item': selected == index }"
        class="combo-item"
        @click="itemOnClick(index)"
        v-for="(item, index) in data"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // Dữ liệu cho combobox
    data: {
      type: Array,
      required: true,
    },

    // Item được chọn của combobox
    defaultValue: {
      type: Number,
      required: false,
      default: 0,
    },

    enable: {
      type: Boolean,
      required: false,
      default: true,
    },

    displayDirection: {
      type: String,
      required: false,
      default: "Down",
    }
  },

  created() {
    this.selected = this.defaultValue;
    this.comboboxData = this.data;
    this.isEnable = this.enable;
  },

  mounted(){

    if(!this.isEnable) this.$refs.cbInput.value = "";

    switch(this.displayDirection){
      case "Down":{
        this.$refs.cbMain.classList.add("combo-item-list__down")
        break;
      }
      case "Up":{
        this.$refs.cbMain.classList.add("combo-item-list__up")
        break;
      }
      case "Left":{
        this.$refs.cbMain.classList.add("combo-item-list__left")
        break;
      }
      case "Right":{
        this.$refs.cbMain.classList.add("combo-item-list__right")
        break;
      }
    }
  },

  data() {
    return {
      selected: null,
      comboboxData: null,
      showData: false,
      isEnable: false,
    };
  },

  methods: {
    /**
     * Xự kiện click vào item trong combobox
     * 
     * @author Xuân Đào (04/04/2023)
     */
    itemOnClick(index) {
      this.selected = index;
      this.$emit("changeVal", index);
      this.showData = false;
    },

    /**
     * Xự kiện focus vào input trong combobox
     * 
     * @author Xuân Đào (04/04/2023)
     */
    comboboxOnFocus() {
      if(this.isEnable)
        this.showData = true;
    },

    /**
     * Xự kiện unfocus khỏi input trong combobox
     * 
     * @author Xuân Đào (04/04/2023)
     */
    comboboxOnBlur() {
      this.showData = false;
    },

    /**
     * Xự kiện bàn phím trong combobox
     * 
     * @author Xuân Đào (04/04/2023)
     */
    comboboxOnKeyDown() {
      if (event.key == "ArrowUp") {
        if (this.selected == 0) this.selected = this.comboboxData.length - 1;
        else this.selected--;
      } else if (event.key == "ArrowDown") {
        if (this.selected == this.comboboxData.length - 1) this.selected = 0;
        else this.selected++;
      } else if (event.key == "Enter") {
        this.$emit("changeVal", this.selected);
        this.showData = false;
      } else if (event.key == "Tab") {
        event.preventDefault();
        this.$emit("changeVal", this.selected);
        this.showData = false;
      }
    },

    /**
     * Xự kiện chuột trong combobox
     * 
     * @author Xuân Đào (04/04/2023)
     */
    iconOnClick(){
      if(this.isEnable)
        this.showData = true;
    },
  },
};
</script>
<style scoped>

.disabled{
  background-color: #eff0f2;
}

input {
  border: unset;
  font-size: 13px;
  outline: unset;
  background-color: unset;
  pointer-events: none;
}
.combobox-nomal {
  font-size: 14px;
  height: 26px;
  width: 220px;
  color: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: #e0e0e0 1px solid;
  position: relative;
  outline: unset;
}

.dropdown-icon {
  margin-top: 15px;
}

.selected {
  line-height: 26px;
  margin-left: 12px;
}

.combo-item-list {
  width: 100%;
  position: absolute;
  background-color: #fff;
  border: solid #b0b0b0 1px;
  z-index: 99;
}

.combo-item-list__up{
  bottom: 30px;
}

.combo-item-list__down{
  top: 30px;
}

.combo-item-list__up{
  bottom: 30px;
}

.combo-item-list__up{
  bottom: 30px;
}

.combo-item {
  height: 32px;
  line-height: 26px;
  padding-left: 12px;
  display: flex;
  align-items: center;
}

.combo-item:last-child {
  margin-bottom: 4px;
}

.combo-item:first-child {
  margin-top: 4px;
}

.combo-item:hover {
  background-color: #f0f0f0;
  color: #50b83c;
  cursor: pointer;
}

.seleted-item {
  background-color: #50b83c;
  color: #fff;
}

.focused {
  border: #50b83c solid 1px;
}
</style>