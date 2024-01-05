<template>
  <div class="scene">3333</div>
</template>

<script setup>
defineProps({
  msg: {
    type: String
  }
})
</script>

<style scoped>
.scene {
  background-color: rgb(148, 161, 156);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  font-size: 0.3rem;
}
</style>
