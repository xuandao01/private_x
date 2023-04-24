<template>
    <div class="pd-main">
        <div class="pd-content">
            <div class="pd-header">
                <div class="pd-header__left-side">
                    <div class="pd-history__icon"></div>
                    <div class="pd-title">{{ this.resources.vi.cashControl.gridDetail.title }}</div>
                    <MComboboxNomal class="pd-combobox" :data="[1,2,3]"></MComboboxNomal>
                </div>
                <div class="pd-header__right-side">
                    <div class="pd-btn__group">
                        <div class="help-icon icon"></div>
                        <div class="close-icon icon" @click="closeOnClick"></div>
                    </div>
                </div>
            </div>
            <div class="pd-main__content">
                <div class="info-area">
                    <div class="pd-main__content--baseinfo">
                        <div class="pd-main__row">
                            <MScrollableCombobox :width="750" :input-title="this.resources.vi.cashControl.objectCombobox.objectCode" :api="this.resources.endpoint + 'Supplier/Filter?pageSize=20&pageNumber='"
                            :map-data="[
                                {
                                    title: this.resources.vi.cashControl.objectCombobox.object,
                                    modelValue: 'supplier_code',
                                    width: 75,
                                },
                                {
                                    title: this.resources.vi.cashControl.objectCombobox.objectName,
                                    modelValue: 'supplier_name',
                                    width: 200,
                                },
                                {
                                    title: this.resources.vi.cashControl.objectCombobox.tax_code,
                                    modelValue: 'tax_code',
                                    width: 100,
                                },
                                {
                                    title: this.resources.vi.cashControl.objectCombobox.address,
                                    modelValue: 'address',
                                    width: 150,
                                },
                                {
                                    title: this.resources.vi.cashControl.objectCombobox.phone_number,
                                    modelValue: 'phone_number',
                                    width: 100,
                                },
                            ]"
                            :fix-to-position="2"
                            display-model="supplier_code"
                            ></MScrollableCombobox>
                            <MInput :canFocus="true" :inputTitle="this.resources.vi.cashControl.objectCombobox.objectName"></MInput>
                        </div>
                        <div class="pd-main__row">
                            <MInput :canFocus="true" :inputTitle="this.resources.vi.cashControl.objectCombobox.receive"></MInput>
                            <MInput :canFocus="true" :inputTitle="this.resources.vi.cashControl.objectCombobox.address"></MInput>
                        </div>
                        <div class="pd-main__row">
                            <MInput :canFocus="true" :inputTitle="this.resources.vi.cashControl.objectCombobox.pay_reason"></MInput>
                        </div>
                        <div class="pd-main__row pd-row3">
                            <MScrollableCombobox :width="650" :input-title="this.resources.vi.cashControl.objectCombobox.employee" :api="this.resources.endpoint + 'Employees/Filter?pageSize=20&pageNumber='"
                            :map-data="[
                                {
                                    title: this.resources.vi.employeeList.EmployeeCodeTitle,
                                    modelValue: 'employeecode',
                                    width: 100,
                                },
                                {
                                    title: this.resources.vi.employeeList.EmployeeFullNameTitle,
                                    modelValue: 'fullname',
                                    width: 200,
                                },
                                {
                                    title: this.resources.vi.employeeDetail.position,
                                    modelValue: 'positionname',
                                    width: 100,
                                },
                                {
                                    title: this.resources.vi.employeeDetail.phoneNumber,
                                    modelValue: 'phonenumber',
                                    width: 150,
                                }
                            ]"
                            display-model="employeecode"
                            :fix-to-position="2"
                            ></MScrollableCombobox>
                            <MInput placeholder="Số lượng" class="pd-more" :canFocus="true" :inputTitle="this.resources.vi.cashControl.objectCombobox.more" textAlign="right"></MInput>
                        </div>
                    </div>
                    <div class="pd-main__content--timeinfo">
                        <div class="pd-main__row fix-right">
                            <MDatePicker :canFocus="true" :title="this.resources.vi.cashControl.gridDetail.success_date"></MDatePicker>
                        </div>
                        <div class="pd-main__row fix-right">
                            <MDatePicker :canFocus="true" :title="this.resources.vi.cashControl.gridDetail.payment_date"></MDatePicker>
                        </div>
                        <div class="pd-main__row fix-right">
                            <MInput class="last-row" :canFocus="true" :inputTitle="this.resources.vi.cashControl.objectCombobox.re_no"></MInput>
                        </div>
                    </div>
                </div>
                <div class="pd-main__content--summary">
                    <div class="summary-title">{{ this.resources.vi.cashControl.objectCombobox.summary }}</div>
                    <div class="summary-value">{{ summary_amount }}</div>
                </div>
            </div>
            <div class="grid-content">
                <div class="grid-main">
                    <div class="grid-main__title">Hạch toán</div>
                    <div class="grid-main__viewer">
                        <MGridEditable 
                        :mapData="[
                            {
                                title: '#',
                                modelValue: 're_no',
                                width: 10,
                                align: 'center',
                                editable: true,
                            }, {
                                title: 'Diễn giải',
                                modelValue: 'description',
                                width: 450,
                                editable: true,
                                align: 'left',
                            }, {
                                title: 'TK nợ',
                                modelValue: 'debit_account',
                                width: 150,
                                editable: true,
                                align: 'left',
                            }, {
                                title: 'TK có',
                                modelValue: 'credit_account',
                                width: 150,
                                editable: true,
                                align: 'left',
                            }, {
                                title: 'Số tiền',
                                modelValue: 'amount',
                                width: 220,
                                editable: true,
                                align: 'right',
                            }, {
                                title: 'Đối tượng',
                                modelValue: 'object',
                                width: 150,
                                editable: true,
                                align: 'left',
                            }, {
                                title: 'Tên đối tượng',
                                modelValue: 'object_name',
                                width: 350,
                                editable: false,
                                align: 'left',
                            }    
                        ]"
                        :fixStart="true"
                        :fixEnd="true"
                        :data="gridData"
                        :key="gridKey"
                        @deleteOnClick="deleteOnClick"
                        ></MGridEditable>
                    </div>
                </div>
                <div class="btn-group">
                    <button @click="addRow">Thêm dòng</button>
                    <button @click="removeAll">Xóa hết dòng</button>
                </div>
            </div>
            <div class="pd-footer">
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
    </div>
</template>
<script>
import MComboboxNomal from '@/components/base-component/MComboboxNomal.vue';
import MInput from '@/components/base-component/MInput.vue';
import MScrollableCombobox from '@/components/base-component/MScrollableCombobox.vue';
import resources from '@/js/resources';
import MDatePicker from '@/components/base-component/MDatePicker.vue';
import MGridEditable from '@/components/base-component/MGridEditable.vue';

export default {
    name: "MPaymentDetail",
    components: {MComboboxNomal, MScrollableCombobox, MInput, MDatePicker, MGridEditable},

    computed:{
        summary_amount(){
            let sum = 0;
            this.gridData.forEach(element => {
                sum += parseInt(element['amount']);
            });
            return this.formatMoney(sum);
        }
    },

    created(){
        this.gridData = [this.exampleData]
    },
    
    methods: {

        formatMoney(amount, decimalCount = 0, decimal = "", thousands = ".") {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
            const negativeSign = amount < 0 ? "-" : "";
            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;
            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        },

        closeOnClick(){
            this.$emit("closeDetail")
        },

        addRow(){
            this.gridData.push(this.exampleData)
        },

        removeAll(){
            this.gridKey++;
            this.gridData = [this.exampleData]
        },

        deleteOnClick(index){
            this.gridKey++;
            this.gridData = this.removeItemFromArr(this.gridData, index);
        },

        removeItemFromArr(proxy, index) {
            let arr = [];
            for (let i = 0; i < proxy.length; i++) {
                if (i !== index) {
                arr.push(proxy[i]);
                }
            }
            return arr;
        },
    },

    data() {
        return {
            resources: resources,
            payment_data: null,
            gridData: null,
            gridKey: 0,
            summary: 0,
            exampleData:{
                re_no: 0,
                description: 'Chi tien cho',
                debit_account: '123',
                credit_account: '321',
                amount: '120000',
                object: 'SPP-213',
                object_name: 'Xuandao',
            }
        }
    },
}
</script>
<style>

    .popup-main__footer{
        height: 42px;
    }


    .btn-group button:hover{
        background-color: #e0e0e0;
        cursor: pointer;
    }

    .btn-group button{
        padding: 0 8px;
        font-size: 13px;
        font-family: Notosans-bold;
        background-color: #fff;
        border: solid #111111 1px;
        border-radius: 2px;
        outline: unset;
    }

    .btn-group{
        height: 24px;
        width: 300px;
        margin-top: 8px;
        display: flex;
        column-gap: 8px;
        margin-left: 24px;
    }

    .grid-main__title{
        height: 24px;
        width: 100%;
        font-family: Notosans-bold;
        line-height: 24px;
        font-size: 13px;
    }

    .grid-main__viewer{
        margin-top: 8px;
    }

    .grid-main{
        width: calc(100% - 48px);
        margin: 12px 24px;
        overflow: auto;
    }

    .grid-content{
        margin-top: 24px;
        width: 100%;
        height: 387px;
        overflow: auto;
        background-color: #fff;
    }

    .pd-footer{
        width: 100%;
        height: 42px;
        background-color: #555555;
        position: absolute;
        bottom: 0;
    }

    .last-row{
        width: 168px !important;
    }

    .pd-more::after{
        content: 'chứng từ gốc';
        display: block;
        font-size: 13px;
        position: absolute;
        right: -90px;
        bottom: 0;
    }

    .pd-more, .last-row{
        flex: 0 !important;
    }

    .pd-row3{
        width: 580px;
    }

    .info-area{
        display: flex;
        column-gap: 0;
    }

    .summary-title{
        height: 26px;
        font-size: 13px;
        font-family: Notosans;
    }

    .summary-value{
        height: 48px;
        font-size: 36px;
        font-family: Notosans-bold;
    }

    .fix-right{
        justify-content: flex-end;
        margin-right: 12px;
    }

    .pd-main__row{
        display: flex;
        column-gap: 12px;
    }

    .pd-main__content--summary{
        height: 100%;
        min-width: 250px;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .pd-main__content--timeinfo{
        height: 100%;
        min-width: 150px;
        width: 210px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .pd-main__content--timeinfo::before{
        content: '';
        display: block;
        height: 68%;
        width: 1px;
        background-color: #b0b0b0;
        position: absolute;
        top: 26px;
        left: 890px;
    }

    .pd-main__content--baseinfo{
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        width: 850px;
        height: 100%;
    }

    .pd-main__content{
        height: 245px;
        width: 100%;
        padding: 24px;
        margin-top: 24px;
        display: flex;
        box-sizing: border-box;
        min-width: 800px;
        position: relative;
        justify-content: space-between;
    }

    .pd-btn__group{
        height: calc(100% - 16px);
        padding: 8px 8px 0 0;
        width: calc(100% - 6px);
        display: flex;
        justify-content: flex-end;
        column-gap: 12px;
        cursor: pointer;
    }

    .pd-combobox{
        background-color: #fff;
        margin-left: 12px;
    }

    .pd-main{
        height: 100%;
        width: 100%;
        background-color: rgba(66, 66, 66, 0.345);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
    }

    .pd-content{
        height: 100%;
        width: 100%;
        background-color: #eceef1;
    }

    .pd-header{
        height: 36px;
        width: 100%;
        display: flex;
    }

    .pd-header__left-side{
        height: 100%;
        width: calc(50% - 32px);
        display: flex;
        padding: 12px 16px;
        align-items: center;
        column-gap: 12px;
    }

    .pd-header__right-side{
        height: 100%;
        width: calc(50% - 32px);
        padding: 12px 16px;
        display: flex;
        justify-content: flex-end;
    }

    .pd-history__icon{
        height: 24px;
        width: 24px;
        background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -648px -145px;
    }

    .pd-title{
        height: 36px;
        font-size: 24px;
        color: #111111;
        line-height: 36px;
        font-family: Notosans-bold;
        min-width: 100px;
    }
</style>