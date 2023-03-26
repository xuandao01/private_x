// Component build radio button theo mảng được chuyền qua props
// Author: Xuân Đào (15/03/2023)
<template>
    <div class="container">
        <div class="title">{{ title }}</div>
        <div class="btn-group" :class="{flex: this.isFlex}">
            <div class="radio-item" v-for="(item, index) in data" :key="index">
                <input  
                type="radio"
                :name="this.name"
                :id="item"
                :value="item"
                v-model="value"
                >
                <label :for="item">{{ item }}</label>
            </div>
        </div>
    </div>
</template>
<script>
export default {

    props:{
        data:{
            type: [String, Array],
            required: true,
        },
        name: {
            type: String,
            required: false,
            default: "Ratio",
        },
        title: {
            type: String,
            required: false,
        },
        isFlex: {
            type: Boolean,
            required: false,
            default: true,
        },
        modelValue: {
            type: String,
            required: false,
        }
    },
    
    created(){
        this.value = this.modelValue
    },

    data() {
        return {
            value: null,
        }
    },
}
</script>
<style scoped>

    .container{
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }
    .flex{
        display: flex;
        align-items: center;
        column-gap: 20px;
    }

    .title{
        line-height: 22px;
        margin-top: -5px;
        font-weight: 600;
        font-family: opens-san-bold;
    }

    label{
        line-height: 28px;
    }

    .radio-item{
        display: flex;
        column-gap: 10px;
        align-items: center;
    }

    input{
        margin: 0;
    }
    
</style>