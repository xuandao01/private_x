// Component build radio button theo mảng được chuyền qua props
// Author: Xuân Đào (15/03/2023)
<template>
    <div :class="{flex: this.isFlex}">
        <div class="group" v-for="(item, index) in data" :key="index">
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
    .flex{
        display: flex;
        align-items: center;
        column-gap: 20px;
    }

    label{
        line-height: 28px;
    }

    .group{
        display: flex;
        column-gap: 10px;
        align-items: center;
    }

    input{
        margin: 0;
    }
    
</style>