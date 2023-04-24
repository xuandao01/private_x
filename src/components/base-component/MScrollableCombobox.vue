<template>
    <div class="inf-component com1">
    <div class="text-area">
      <span ref="inpText" class="bold-text" :title="tooltip">{{ inputTitle }}</span>
      <a v-if="required"> *</a>
    </div>
    <input
      ref="mInput"
      type="text"
      autocomplete="off"
      id="employeeCode"
      v-model="this.value"
    />
    <div @blur="iconOnBlur" ref="dropdown" class="cb-dropdown" @click="iconOnClick" tabindex="1">
        <div class="cb-dropdown__icon"></div>
    </div>

    <div ref="comboData" class="cb-data" v-show="showData" @scroll="dataOnScroll">
        <table :border="0" class="combo-table">
            <thead ref="tbHead">
                <tr>
                    <td v-for="(item, index) in this.mapData" :key="index">{{ item['title'] }}</td>
                </tr>
            </thead>
            <tbody ref="tbody">
                <tr @click="rowOnClick(index)" v-for="(item, index) in this.apiData" :key="index">
                    <td v-for="(data, inx) in this.mapData" :key="inx">{{ item[data['modelValue']] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <div v-if="isError" class="errMes">{{ inputTitle }} không được trống</div> -->
  </div>
</template>
<script>

export default {
    props: {

        api: {
            type: String,
            required: false,
        },

        rawData:{
            type: Array,
            required: false,
        },

        mapData:{
            type: Array,
            required: false,
        },

        modelValue: {
            type: String,
        },

        inputTitle:{
            type: String,
            required: false,
        },

        required:{
            type: Boolean,
            required: false,
            default: false,
        },

        titleColor: {
            type: String,
            required: false,
            dafault: "000"
        },
        width:{
            type: Number,
            required: false,
            default: 300,
        },
        
        fixToPosition:{
            type: Number,
            required: false,
            default: 2,
        },

        displayModel:{
            type: String,
            required: false,
        }
    },

    created() {
        this.value = this.modelValue;
        if (this.api){
            this.localAPI = this.api + this.currentPage;
            this.getApiData();
        } else {
            this.apiData = this.rawData;
        }
        this.fixPositionIndex = parseInt(this.fixToPosition);
    },

    mounted() {
        this.$nextTick(() => {
        // this.focus();
            this.$refs.inpText.style.color = `#${this.titleColor}`;
            this.$refs.comboData.style.width = `${this.width}px`;
            let thList = this.$refs.tbHead.children[0].children;
            for (let i =0; i<thList.length;i++){
                thList[i].style.width = this.mapData[i].width + 'px';
                
            }
        });
    },

    watch:{
        selectedIndex: function(newVal, oldVal){
            let elementList = this.$refs.tbody.children;
            if (oldVal != -1){
                if (newVal >= this.fixPositionIndex){
                    if (newVal > oldVal){
                        this.scrollYPos += 36;
                    } else {
                        if (this.scrollYPos > 0)
                            this.scrollYPos -= 36;
                    }
                } else {
                    if (newVal < oldVal){
                        if (this.scrollYPos > 0)
                            this.scrollYPos -= 36;
                    }
                }
                this.$refs.comboData.scrollTo(0, this.scrollYPos)
                elementList[oldVal].classList.remove("row-selected");
            }
            elementList[newVal].classList.add("row-selected");
            this.value = this.apiData[this.selectedIndex][this.displayModel];
        }
    },

    methods: {
        async getApiData(){
            try{
                let data = await (await fetch(this.localAPI)).json();
                if (!this.apiData[0])
                    this.apiData = data['data'];
                else {
                    this.apiData.push(...data['data']);
                }
            } catch (ex) {
                console.log(ex);
            }
        },

        iconOnClick(){
            window.addEventListener('keydown', this.handleOnKeyDown);
            this.$refs.dropdown.focus();
            this.showData = !this.showData;
        },

        iconOnBlur(){
            window.removeEventListener('keydown', this.handleOnKeyDown);
            setTimeout(() => {
                this.showData = false;
            }, 300);
        },

        dataOnScroll(){

            let scrollPosition = this.$refs.comboData.scrollTop;
            let scrollRange = this.$refs.comboData.scrollHeight - this.$refs.comboData.clientHeight;
            let rangeLeft = scrollRange - scrollPosition;
            if (rangeLeft < 2) {
                if (this.api){
                    this.currentPage++;
                    this.localAPI = this.api + this.currentPage;
                    this.getApiData();
                }
            }
        },

        rowOnClick(index){
            this.selectedIndex = index;
        },

        handleOnKeyDown(){
            if (event.key == "ArrowDown"){
                if (this.selectedIndex == -1) {
                    this.selectedIndex = 0;
                }
                else if (this.selectedIndex < this.apiData.length - 1) {
                    this.selectedIndex++;
                } 
            }

            if (event.key == "ArrowUp"){
                if (this.selectedIndex > 0) {
                    this.selectedIndex--;
                } 
            }

            if (event.key == "Enter" || event.key == "Tab"){
                event.preventDefault();
                this.value = this.apiData[this.selectedIndex][this.displayModel];
                this.showData = false;
            }
        },
    },

    data() {
        return {
            value: null,
            apiData: [],
            showData: false,
            currentPage: 1,
            localAPI: null,
            selectedIndex: -1,
            scrollYPos: 0,
            fixPositionIndex: 0,
        }
    },
    
}
</script>
<style scoped>

    .row-selected:hover{
        color: #111111;
    }

    .row-selected{
        background-color: #50b83c;
        color: #fff;
        z-index: 99;
    }

    thead tr {
        position: sticky;
        top: 0;
        z-index: 9;
    }

    a {
        border: unset;
        outline: unset;
        text-decoration: none;
        color: #E81E1E;
    }

    .combo-table, tbody, thead{
        border-collapse: collapse;
    }

    .text-area{
    font-size: 13px;

    }

    table td{
        border: none;
    }

    table thead tr{
        background-color: #e6e6e6;
    }

    table thead tr td{
        font-family: Notosans-bold;
    }

    .com1 {
    flex: 1;
    }
    .errMes{
    font-size: 13px;
    color: red;
    }
    .input-err{
        border-color: #E81E1E !important;
    }

    .bold-text{
    font-family: opens-san-bold !important;
    font-weight: 600;
    }

    .cb-dropdown__icon{
        background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -564px -365px;
        width: 8px;
        height: 5px;
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .cb-dropdown__icon:focus, .cb-dropdown:focus{
        border: unset;
        outline: unset;
    }
    
    .cb-dropdown{
        height: 26px;
        width: 26px;
        position: absolute;
        right: 0;
        top: 22px;
    }

    .cb-dropdown:hover{
        background-color: #b8b8b8e3;
    }

    .cb-data{
        min-height: 100px;
        max-height: 200px;
        width: 200%;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        background-color: #fff;
        position: absolute;
        top: 50px;
        z-index: 999;
        border-radius: 4px;
        border: solid #b8b8b8e3 1px;
        overflow: auto;
        cursor: pointer;
    }

    .cb-data__title{
        height: 26px;
        width: 100%;
        background-color: #dfdfdf;
        display: flex;
        column-gap: 20px;
        position: sticky;
        top: 0;
    }

    .cb-data__title--item{
        font-size: 13px;
        font-family: Notosans-bold;
        line-height: 26px;
        padding: 0 10px;
    }

    /* .cb-data__item{
        display: flex;
        column-gap: 20px;
    }

    .cb-data__item--value{
        font-size: 13px;
        font-family: Notosans;
        padding: 8px 12px;
    }
    .cb-data__item:hover{
        background-color: rgb(233, 232, 232);
        color: rgb(47, 199, 13);
    } */

    ::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
    z-index: 99999999;
    }
    ::-webkit-scrollbar-track-piece {
        background-color: #E6E6E6;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #B0B0B0;
    }
</style>