<template>
    <div class="account-detail">
        <div ref="detailMain" class="ad-main">
            <div ref="detailExpandBtn" @click="expandOnClick" class="ad-expand"></div>
            <div class="ad-title">
                <div class="ad-title__content">{{ this.resources.vi.accountDetail.title.create}}</div>
                <div class="ad-title__action">
                    <div class="icon help-icon" title="Trợ giúp (F1)"></div>
                    <div class="icon close-icon" title="Đóng (ESC)" @click="closeDetail"></div>
                </div>
            </div>
            <div class="ad-base__information">
                <div class = "ad-content">
                    <div class="ad-content__row1">
                        <MInput class="ad-content__row--item" titleColor="333333" :input-title="this.resources.vi.accountList.data.accountNumber" :required="true"></MInput>
                    </div>
                    <div class="ad-content__row">
                        <MInput class="ad-content__row--item" titleColor="333333" :input-title="this.resources.vi.accountList.data.accountName" :required="true"></MInput>
                        <MInput class="ad-content__row--item" titleColor="333333" :input-title="this.resources.vi.accountList.data.englishName" :required="false"></MInput>
                    </div>
                    <div class="ad-content__row2">
                        <MScrollableCombobox :width="440" :rawData="sortedData" titleColor="333333" :inputTitle="this.resources.vi.accountList.parentAcc" :required="false"
                        :mapData="[
                            {
                                title: this.resources.vi.accountList.data.accountNumber,
                                modelValue: 'accountnumber',
                                width: 150,
                            },
                            {
                                title: this.resources.vi.accountList.data.accountName,
                                modelValue: 'accountname',
                                width: 250,
                            }
                            
                        ]"
                        display-model="accountnumber"
                        ></MScrollableCombobox>
                        <MInput class="ad-content__row--item" titleColor="333333" :input-title="this.resources.vi.accountList.data.property" :required="true"></MInput>
                    </div>
                    <div class="ad-content__row">
                        <MTextArea class="ad-content__row--item" titleColor="333333" :input-title="this.resources.vi.accountList.data.description" :required="false"></MTextArea>
                    </div>
                    <div class="ad-checkbox__container">
                        <MCheckbox></MCheckbox>
                        <div class="ad-checkbox__txt">{{ this.resources.vi.accountDetail.checkboxTitle.Accounting }}</div>
                    </div>
                </div>

                <div class="ad-collase__information">
                    <div class="ad-collase__header" @click="collaseOnClick">
                        <div ref="collaseIcon" class="adc-header__icon"></div>
                        <div class="adc-header__content">{{ this.resources.vi.accountDetail.followTo }}</div>
                    </div>
                    <div class="ad-collase__content" ref="collaseContent">
                        <div class="ad-collase__content--left">
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.Object }}</div>
                                <MComboboxNomal :enable="false" :data="this.resources.vi.accountDetail.comboboxData.ObjectFollow"></MComboboxNomal>
                            </div>
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.ObjectTHCP }}</div>
                                <MComboboxNomal :enable="false" :data="this.resources.vi.accountDetail.comboboxData.AlertRequired"></MComboboxNomal>
                            </div>
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.Order }}</div>
                                <MComboboxNomal :enable="false" :data="this.resources.vi.accountDetail.comboboxData.AlertRequired"></MComboboxNomal>
                            </div>
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.PurchaseContract }}</div>
                                <MComboboxNomal :enable="false" :data="this.resources.vi.accountDetail.comboboxData.AlertRequired"></MComboboxNomal>
                            </div>
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.Unit }}</div>
                                <MComboboxNomal :enable="false" :data="this.resources.vi.accountDetail.comboboxData.AlertRequired"></MComboboxNomal>
                            </div>
                        </div>
                        <div class="ad-collase__content--right">
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.BankAccount }}</div>
                            </div>
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.Construct }}</div>
                                <MComboboxNomal :enable="false" :data="this.resources.vi.accountDetail.comboboxData.AlertRequired"></MComboboxNomal>
                            </div>
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.SellContract }}</div>
                                <MComboboxNomal :enable="false" :data="this.resources.vi.accountDetail.comboboxData.AlertRequired"></MComboboxNomal>
                            </div>
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.CPItem }}</div>
                                <MComboboxNomal :enable="false" :data="this.resources.vi.accountDetail.comboboxData.AlertRequired"></MComboboxNomal>
                            </div>
                            <div class="ad-collase__item">
                                <MCheckbox></MCheckbox>
                                <div class="ad-collase__item--title">{{ this.resources.vi.accountDetail.checkboxTitle.StatisticalCode }}</div>
                                <MComboboxNomal :enable="false" :data="this.resources.vi.accountDetail.comboboxData.AlertRequired"></MComboboxNomal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "popup-main__footer">
                <div class="btn group-btn">
                <div class="btn-save">
                    <button id="save" :title="this.resources.vi.btnAction.storeTooltip" class="optionalBtn">{{ this.resources.vi.btnAction.store }}</button>
                </div>
                <div class="btn btn-saveAndAdd">
                    <button :title="this.resources.vi.btnAction.storeSaveToolTip" id="saveAdd">
                    {{ this.resources.vi.btnAction.storeSave }}
                    </button>
                </div>
                </div>
                <div class="btn btn-close">
                <button @keydown="cancelOnKeyDown" id="cancel" :title="this.resources.vi.btnAction.cancelTooltip" class="optionalBtn">
                    {{ this.resources.vi.btnAction.cancel }}
                </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import resources from '@/js/resources.js'
import MInput from '../base-component/MInput.vue';
import MTextArea from '../base-component/MTextArea.vue';
import MCheckbox from '../base-component/MCheckbox.vue';
import MComboboxNomal from '../base-component/MComboboxNomal.vue';
import MScrollableCombobox from '../base-component/MScrollableCombobox.vue';
export default {
    name: "MAccountDetail",

    props:{
        sortedData: {
            type: Array,
            required: false,
        }
    },

    components:{
        MInput,
        MTextArea,
        MCheckbox,
        MComboboxNomal,
        MScrollableCombobox
    },
    
    data() {
        return {
            isExpanded: false,
            resources: resources,
            collase: false,
        }
    },

    methods: {

        closeDetail(){
            this.$emit("closeMe");
        },

        expandOnClick(){
            if (!this.isExpanded) {
                this.isExpanded = true;
                this.$refs.detailMain.classList.remove("ad-collase");
                this.$refs.detailMain.classList.add("ad-full");
                this.$refs.detailExpandBtn.classList.add("expanded");
            } else {
                this.isExpanded = false;
                this.$refs.detailMain.classList.remove("ad-full");
                this.$refs.detailExpandBtn.classList.remove("expanded");
                this.$refs.detailMain.classList.add("ad-collase");
            }
        },

        collaseOnClick(){
            if (!this.collase) {
                this.collase = true;
                this.$refs.collaseContent.classList.add("collase-inf");
                this.$refs.collaseContent.classList.remove("expand-inf");
                this.$refs.collaseIcon.classList.add("rotate90");
                this.$refs.collaseIcon.classList.remove("unrotate");
            } else {
                this.collase = false;
                this.$refs.collaseContent.classList.remove("collase-inf");
                this.$refs.collaseContent.classList.add("expand-inf");
                this.$refs.collaseIcon.classList.remove("rotate90");
                this.$refs.collaseIcon.classList.add("unrotate");
            }
        }
    },
}
</script>
<style scoped>

    .ad-collase__item--title{
        font-size: 13px;
        color: #111111;
        min-width: 100px;
    }

    .ad-collase__item{
        height: 26px;
        width: 100%;
        display: flex;
        align-items: center;
        column-gap: 2%;
    }

    .ad-collase__content--right{
        height: 100%;
        width: 49%;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .ad-collase__content--left{
        height: 100%;
        width: 49%;
        margin-right: 2%;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
    .ad-collase__content{
        display: flex;
        height: 100%;
        width: 98%;
        margin-left: 2%;
        position: relative;
    }

    .adc-header__content{
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        font-family: Notosans;
        color: #111111;
    }

    .adc-header__content:hover {
        color: #2ca10c;
    }

    .adc-header__icon{
        background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -371px -364px;
        width: 10px;
        height: 8px;
        transform: rotate(0deg);
    }

    .ad-collase__header{
        height: 30px;
        width: 100%;
        display: flex;
        column-gap: 4px;
        align-items: center;
        cursor: pointer;    
    }

    .ad-collase__information{
        height: 35%;
        width: 100%;
    }

    .ad-checkbox__txt{
        color: #111111;
        font-size: 13px;
    }

    .ad-checkbox__container{
        display: flex;
        align-items: center;
        column-gap: 8px;
        cursor: pointer;
    }

    .ad-content__row--item{
        flex: 1;
    }

    .ad-content__row2{
        width: calc(50% - 6px);
        display: flex;
        column-gap: 12px;
    }

    .ad-content__row1{
        width: calc(25% - 6px);
        display: flex;
    }

    .ad-content__row{
        width: 100%;
        display: flex;
        column-gap: 12px;
    }

    .ad-footer{
        height: 46px;
        width: 100%;
        border-top: solid 1px #d0d0d0;
    }

    .ad-content{
        width: 100%;
        height: 45%;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .ad-base__information{
        width: calc(100% - 32px);
        height: calc(100% - 46px - 61px);
        margin: 0 16px;
    }

    .ad-title__action{
        display: flex;
        padding: 16px;
        column-gap: 8px;
    }

    .ad-title__content{
        font-size: 24px;
        font-family: Notosans-semibold;
        line-height: 33px;
        padding: 16px;
    }

    .ad-title{
        height: 61px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .account-detail{
        height: 100vh;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.400);
        position: fixed;
    }

    .ad-main{
        height: 100%;
        width: 800px;
        resize: none;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 4px;
        position: absolute;
        right: 0;
    }

    .ad-expand{
        height: 50px;
        width: 12px;
        border: solid #d0d0d0 1px;
        background-color: #fff;
        position: absolute;
        top: calc(50% - 50px);
        left: -6px;
        border-radius: 10px;
        cursor: pointer;
    }

    .expanded{
        rotate: 180deg;
    }

    .collased{
        rotate: 180deg;
    }
    
    .ad-expand::after{
        content: '';
        display: block;
        width: 8px;
        height: 14px;
        position: absolute;
        top: calc(50% - 7px);
        left: 2px;
        background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -36px -361px;;
    }

    .ad-full{
        animation-name: expand;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
    }

    .ad-collase{
        animation-name: collase;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
    }

    .icon{
        cursor: pointer;
    }

    .collase-inf::after{
        content: '';
        height: 100%;
        width: 100%;
        background-color: #fff;
        position: absolute;
        bottom: 1px;
        left: 0;
        animation-name: collaseInf;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
    }

    .expand-inf::after{
        content: '';
        height: 100%;
        width: 100%;
        background-color: #fff;
        position: absolute;
        bottom: 1px;
        left: 0;
        animation-name: expandInf;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
    }

    .rotate90{
        transform: rotate(-90deg);
        transition-duration: 0.5s;
    }

    .unrotate{
        transform: rotate(0deg);
        transition-duration: 0.5s;
    }

    .popup-main__footer{
        height: 48px;
    }

    @keyframes expand {
        from { width: 800px;}
        to {width: 99%;}
    }

    @keyframes collase {
        from { width: 99%;}
        to {width: 800px;}
    }

    @keyframes collaseInf {
        from {height: 0%;}
        to {height: 100%;}
    }

    @keyframes expandInf {
        from {height: 100%;}
        to {height: 0%;}
    }

</style>