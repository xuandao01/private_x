<template>
  <div class="input-component" :class="{ unfocus: !isFocus }">
    <input
      ref="searchBar"
      @focus="inputOnFocus"
      @blur="inputOnBlur"
      @keyup="inputOnSearch"
      type="text"
      class="search"
      placeholder="Tìm kiếm"
    />
    <div class="icon search-icon"></div>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  name: "MSearchBar",
  data() {
    return {
      isFocus: false,
    };
  },

  methods: {
    /**
     * Khi focus vào input
     *
     * @author  Xuân Đào (12/03/2023)
     */
    inputOnFocus() {
      this.isFocus = true;
    },

    /**
     * Khi thoát khỏi input
     *
     * @author  Xuân Đào (12/03/2023)
     */
    inputOnBlur() {
      this.isFocus = false;
    },

    inputOnSearch: debounce(function() {
      this.$emit('onSearch', this.$refs.searchBar.value);
    }, 500),
  },
};
</script>
<style lang="">
</style>