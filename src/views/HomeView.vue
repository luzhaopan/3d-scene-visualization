<template>
  <div class="home-container">
    <!-- 场景 -->
    <SenceView></SenceView>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SenceView from '@/components/SenceView/index.vue'

onMounted(async () => {
  // changeInfo()
})
</script>
