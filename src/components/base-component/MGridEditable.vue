<template>
  <div class="gre-main">
    <div ref="scroller" class="gre-main__scroll">
      <table border="0">
        <thead>
          <tr>
            <td
              :class="{
                'fix-start': index == 0 && fixStart,
              }"
              :style="{ width: item.width + 'px', textAlign: item.align }"
              v-for="(item, index) in mapData"
              :key="index"
            >
              {{ item.title }}
              <div :class="{'left-border': index == 0 && fixStart}"></div>
            </td>
            <td class="fix-end"></td>
          </tr>
        </thead>
        <tbody ref="tbody">
          <tr v-for="(data, inx) in this.gridData" :key="inx" @click="rowOnClick(inx)">
            <td
              :class="{
                'fix-start': index == 0 && fixStart,
              }"
              :style="{ width: item.width + 'px' }"
              v-for="(item, index) in mapData"
              :key="index"
            >
              <input :tabindex="{'-1': !editable || index == 0 || !item['editable']}" :style="{textAlign: item.align}" :class="{'disable': !editable || index == 0 || !item['editable']}" type="text" :value="data[item['modelValue']]">
            </td>
            <td class="fix-end">
                <div class="delete-icon" @click="this.$emit('deleteOnClick', inx)"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import resources from "@/js/resources";
export default {
  name: "MGridEditable",

  props: {
    api: {
      type: String,
      required: false,
    },

    data: {
      type: Array,
      required: false,
    },

    mapData: {
      type: Array,
      required: false,
    },

    fixStart: {
      type: Boolean,
      required: false,
      default: false,
    },

    fixEnd: {
      type: Boolean,
      required: false,
      default: false,
    },

    editable: {
        type: Boolean,
        required: false,
        default: true,
    }
  },

  components: {},

  created() {
    if (this.api) {
      this.getApiData();
    } else {
      this.gridData = this.data;
    }
  },

  mounted() {
    let totalWidth = 0;
    for (let i = 0; i < this.mapData.length; i++) {
      totalWidth += this.mapData[i]["width"];
    }

    this.$refs.scroller.style.width = totalWidth + "px";
  },

  methods: {
    rowOnClick(index){
        if (event.target.tagName === 'DIV') return;
        let target = this.$refs.tbody.children[index];
        if (!this.selected_row) this.selected_row = target;
        else {
            this.selected_row.classList.remove("tr-selected");
            this.selected_row = target;
        }
        this.selected_row.classList.add("tr-selected");
    }
  },

  data() {
    return {
      resources: resources,
      selected_row: null,
      gridData: null,
    };
  },
};
</script>
<style scoped>
table {
  border-collapse: collapse;
}

table tr {
  height: 28px !important;
}

thead tr td{
    background-color: #e0e0e0;
    color: #111111;
    font-family: Notosans-bold;
}

tr td input{
    width: 100%;
    border: unset;
    outline: unset;
    background: unset;
    font-size: 13px;
    font-family: Notosans;
    line-height: 22px;
}

tr td input:focus{
    border: solid 1px #2ca01c;
    padding: 0 8px;
    width: calc(100% - 24px);
    border-radius: 2px;
    background-color: #fff;
}

.disable{
    user-select: none;
    pointer-events: none;
}

.fix-end{
    width: 5px;
}

.delete-icon{
    height: 16px;
    width: 16px;
    background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -464px -313px;
    cursor: pointer;
}
.tr-selected, .tr-selected td:first-child, .tr-selected td:last-child{
    background-color: #e5f3ff;
    z-index: 3;
}

</style>