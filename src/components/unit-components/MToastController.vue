<template>
    <div class="toast-container" v-if="haveToast">
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            haveToast: true,
        }
    },
}
</script>
<style>
    .toast-container{
        min-height: 56px;
        position: fixed;
    }
</style>