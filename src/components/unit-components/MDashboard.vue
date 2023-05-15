<template>
    <div>
        <div>
        Tính năng đang phát triển
        </div>
    </div>
</template>
<script>
import { BtnOption } from '@/views/CA/MPaymentDetail.vue'
export default {
    mounted(){
        sessionStorage.extendBtnOption = BtnOption.saveAndClose;
    }
}
</script>
<style scoped>
    div div{
        padding: 10px;
        font-size: 25px;
        font-family: Opens-san-bold;
    }
</style>