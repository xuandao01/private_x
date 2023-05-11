<template>
    <div @focus="onFocus" @blur="onBlur" tabindex="1" ref="checkbox" class="m-checkbox" :class="{'checked': checked}" @click="checked = !checked">
        <div :class="{'onFocus': isFocus}"></div>
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
        },

        isChecked: {
            type: Boolean,
            required: false,
            default: false,
        },

        isCheckedByNum: {
            type: Number,
            required: false,
            default: -1,
        }
    },

    created(){
        if (this.isChecked)
            this.checked = this.isChecked;
    },
    

    mounted(){
        this.$refs.checkbox.style.width = this.width + "px";
        this.$refs.checkbox.style.height = this.height + "px";
        if (this.isCheckedByNum != -1){
            if (this.isCheckedByNum == 0) this.checked = true;
            else this.checked = false;
        }
    },

    methods:{
        onFocus(){
            this.isFocus = true;
            window.addEventListener("keydown", this.hanldeOnKeydown)
        },

        onBlur(){
            this.isFocus = false;
            window.removeEventListener("keydown", this.hanldeOnKeydown)
        },

        hanldeOnKeydown(){
            if(event.key == "Enter"){
                this.checked = !this.checked;
                this.$emit("updateStatus");
            }
        },

        setFocus(){
            this.$refs.checkbox.focus();
        }
    },

    data() {
        return {
            checked: false,
            isFocus: false,
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
        position: relative;
    }
    .m-checkbox:focus{
        outline: unset;
    }

    .onFocus{
        height: 20px;
        width: 20px;
        border: solid #3ae0bf 1px;
        border-radius: 2px;
        position: absolute;
        top: -3px;
        left: -3px;
    }

    .checked{
        background: url('/src/assets/img/Sprites.64af8f61.svg') no-repeat -896px -312px;
        border-color: #57C841;
    }
</style>