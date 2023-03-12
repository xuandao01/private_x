<template>
        <button>
            {{ value }}
        </button>
</template>
<script>
export default {
    props:{
        kind:{
            type: String,
            required: false,
            default: 'original'
        },
        value:{
            type: String,
            required: false,
            default: 'click'
        }
    }
}
</script>
<style scoped>
    
</style>