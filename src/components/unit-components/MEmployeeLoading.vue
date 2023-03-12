<template>
  <tr v-for="n in 1" :key="n">
    <td v-for="n in 12" :key="n">
      <div></div>
    </td>
  </tr>
</template>
<script>
export default {};
</script>
<style scoped>
div {
  height: 50%;
  width: 75%;
  margin-left: 12%;
  background-color: #e0e0e0;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    #EEEEEE;
  background-size: 200% 100%;
  background-position-x: 120%;
  animation: 1s loading ease-in-out infinite;
}
@keyframes loading {
    to {
        background-position-x: -20%;
    }
}
</style>