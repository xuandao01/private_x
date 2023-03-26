<template>
  <div class="input-component" :class="{'unfocus': !isFocus}">
    <input
      ref="searchBar"
      @input="searchOnInput"
      @focus="isFocus = true"
      @blur="isFocus = false"
      type="text"
      class="search"
      placeholder="Tìm kiếm"
    />
    <div class="icon search-icon"></div>
  </div>
</template>
<script>
export default {
    name: "MSearchBar",
    data() {
        return {
            isFocus: false,
        }
    },

    methods:{
        searchOnInput(){
            this.$emit("onSearch", this.$refs.searchBar.value);
        }
    }
};
</script>
<style lang="">
</style>