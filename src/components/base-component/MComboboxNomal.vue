<template>
  <div
    class="combobox-nomal"
    id="combobox-paging"
    tabindex="0"
    :class="{ focused: showData }"
    @focus="comboboxOnFocus"
    @blur="comboboxOnBlur"
    @keydown="comboboxOnKeyDown"
  >
    <input type="text" class="selected" v-model="comboboxData[selected]" />
    <div class="icon dropdown-icon"></div>
    <div class="combo-item-list" v-show="showData">
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
    data: {
      type: Array,
      required: true,
    },

    defaultValue: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  created() {
    this.selected = this.defaultValue;
    this.comboboxData = this.data;
  },

  data() {
    return {
      selected: null,
      comboboxData: null,
      showData: false,
    };
  },

  methods: {
    itemOnClick(index) {
      this.selected = index;
      this.showData = false;
    },

    comboboxOnFocus() {
      this.showData = true;
    },

    comboboxOnBlur() {
      this.showData = false;
    },
    comboboxOnKeyDown() {
      if (event.key == "ArrowUp") {
        if (this.selected == 0) this.selected = this.comboboxData.length - 1;
        else this.selected--;
      } else if (event.key == "ArrowDown") {
        if (this.selected == this.comboboxData.length - 1) this.selected = 0;
        else this.selected++;
      }
    },
  },
};
</script>
<style scoped>
input {
  border: unset;
  font-size: 14px;
  outline: unset;
  background-color: unset;
  pointer-events: none;
}
.combobox-nomal {
  font-size: 14px;
  height: 32px;
  width: 200px;
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
  bottom: 36px;
  background-color: #fff;
  border: solid #b0b0b0 1px;
}

.combo-item {
  height: 32px;
  line-height: 26px;
  padding-left: 12px;
  margin-top: 4px;
  display: flex;
  align-items: center;
}

.combo-item:last-child {
  margin-bottom: 4px;
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