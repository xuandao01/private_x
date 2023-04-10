<template>
    <div ref="checkbox" class="m-checkbox" :class="{'checked': checked}" @click="checked = !checked">
        
    </div>
</template>
<script>
export default {
    props:{
        // Kích thước của checkbox
        width: {
            type: Number,
            required: false,
            default: 16,
        },
        height: {
            type: Number,
            required: false,
            default: 16,
        }
    },

    mounted(){
        this.$refs.checkbox.style.width = this.width + "px";
        this.$refs.checkbox.style.height = this.height + "px";
    },

    data() {
        return {
            checked: false,
        }
    },
}
</script>
<style scoped>
    .m-checkbox{
        height: 16px;
        width: 16px;
        border: solid #b0b0b0 1px;
        border-radius: 2px;
    }

    .checked{
        background: url('/src/assets/img/Sprites.64af8f61.svg') no-repeat -896px -312px;
        border-color: #57C841;
    }
</style>