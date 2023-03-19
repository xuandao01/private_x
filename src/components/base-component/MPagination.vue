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
                ]"

                :defaultValue="1"
            >
                
            </MComboboxNomal>
          </div>
          <div class="page-number">
            <div class="previous">Trước</div>
            <div class="number">
              <div class="num page-seleted">1</div>
              <div class="num">2</div>
              <div class="num">3</div>
              <div class="num">...</div>
              <div class="num final">12</div>
            </div>
            <div class="next">Sau</div>
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
        totalPage: {
            type: Number,
            required: true,
            default: 0,
        }
    },
}
</script>
<style>
    
</style>