<template>
    <div class="m-checkbox" :class="{'checked': checked}" @click="checked = !checked">
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            checked: false,
        }
    },
}
</script>
<style scoped>
    .m-checkbox{
        height: 20px;
        width: 20px;
        border: solid #b0b0b0 1px;
        border-radius: 4px;
    }

    .checked{
        background: url('/src/assets/img/Sprites.64af8f61.svg') no-repeat -894px -310px;
        border-color: #57C841;
    }
</style>