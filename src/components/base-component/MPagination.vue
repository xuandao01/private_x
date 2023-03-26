<template>
    <div class="part1">
          Tổng số: <b id="numberOfRecord"> {{ totalRecord }}</b> bản ghi
        </div>
        <div class="part2">
          <div>
            <MComboboxNomal
                :data="[
                    '10 bản ghi trên 1 trang',
                    '20 bản ghi trên 1 trang',
                    '50 bản ghi trên 1 trang',
                    '100 bản ghi trên 1 trang',
                    '200 bản ghi trên 1 trang',
                ]"
                :defaultValue="1"
                @changeVal="updateVal"
            >
            </MComboboxNomal>
          </div>
          <div class="page-number" ref="paging">
            <div @click="previousPage" :class="{'disabled': currentPage==1}" class="previous">Trước</div>
            <div @click="pageNumberOnClick" class="slot1 selected-page">{{ slot1 }}</div>
            <div @click="pageNumberOnClick" class="slot2" v-if="totalPage >= 2">{{ slot2 }}</div>
            <div @click="pageNumberOnClick" class="slot3" v-if="totalPage >= 3">{{ slot3 }}</div>
            <div @click="pageNumberOnClick" class="slot4" v-if="totalPage >= 4">{{ slot4 }}</div>
            <div @click="pageNumberOnClick" class="slot5" v-if="totalPage >= 5">{{ totalPage }}</div>
            <div @click="nextPage" :class="{'disabled': currentPage==totalPage}" class="next">Sau</div>
          </div>
        </div>
</template>
<script>
import MComboboxNomal from "../base-component/MComboboxNomal.vue";

export default {
    components: { MComboboxNomal },

    props: {
        totalRecord: {
            type: Number,
            required: true,
            default: 0,
        },
    },

    watch:{

    },

    computed:{
      totalPage(){
        if (this.totalRecord % this.pageSize == 0) {
          return Math.round(this.totalRecord/this.pageSize);
        } 
        else {
          if (Math.round(this.totalRecord/this.pageSize) > this.totalRecord/this.pageSize) return Math.round(this.totalRecord/this.pageSize);
          else  return Math.round(this.totalRecord/this.pageSize) + 1;
        }
      },

      slot1(){
        if (this.totalPage <= 5) return 1;
        if (this.currentPage < 2) return this.currentPage;
        else if (this.currentPage >= this.totalPage - 4) return this.totalPage - 4;
        else return this.currentPage-1;
      },

      slot2(){
        return this.slot1 + 1;
      },

      slot3(){
        return this.slot2 + 1;
      },

      slot4(){
        if (this.totalPage <= 5) return 4;
        else if (this.slot3 + 2 === this.totalPage) return this.totalPage - 1;
        else if (this.currentPage >= this.totalPage - 4) return this.totalPage - 1;
        else if (this.currentPage == this.totalPage) return this.totalPage - 1;
        else return ". . .";
      }
    },

    created(){
      this.selectedOption = 1;
    },

    data() {
      return {
        selectedOption: null,
        pageSize: 20,
        currentPage: 1,
      }
    },

    methods: {

      previousPage(){
        if (this.currentPage > 1) {
          this.currentPage--;
          this.resetSelected();
        }
      },

      nextPage(){
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
          this.resetSelected();
        }
      },

      updateVal(newVal){
        this.defaultValue = newVal;
        switch(newVal){
          case 0:{
            this.pageSize = 10;
            break;
          }
          case 1:{
            this.pageSize = 20;
            break;
          }
          case 2:{
            this.pageSize = 50;
            break;
          }
          case 3:{
            this.pageSize = 100;
            break;
          }
          case 4:{
            this.pageSize = 200;
            break;
          }
        }
        this.currentPage = 1;
        this.$emit("updateAPI", this.pageSize, this.currentPage)
      },

      pageNumberOnClick(){
        if (!isNaN(Number(event.target.textContent))){
          this.currentPage = Number(event.target.textContent);
          this.resetSelected();
        }
      },

      resetSelected(){
        this.$emit("updateAPI", this.pageSize, this.currentPage)
        setTimeout(() => {
          for (let i=0; i< this.$refs.paging.children.length; i++){
            if(Number(this.$refs.paging.children[i].textContent) === this.currentPage) this.$refs.paging.children[i].classList.add("selected-page");
            else this.$refs.paging.children[i].classList.remove("selected-page");
          }
        }, 50);
      }
    },
}
</script>
<style scoped>
    .page-number{
      display: flex;
      margin-right: 12px;
      margin-left: 12px;
      column-gap: 4px;
    }
    .page-number div{
      height: 22px;
      min-width: 22px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
      user-select: none;
    }

    .selected-page{
      border: solid #b0b0b0 1px;
      font-weight: 700;
    }

    .disabled{
      color: #b0b0b0;
    }
</style>