<template>
  <div class="home-container">
    <!-- 场景 -->
    <SenceView :eventList="eventList"></SenceView>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import gsap from 'gsap'
import SenceView from '@/components/SenceView/index.vue'

import { getInfoApi, getListApi } from '@/api/dashboard'

const dataInfo = reactive({
  iot: { number: 0 },
  event: { number: 0 },
  power: { number: 0 },
  test: { number: 0 }
})
// 获取事件信息
const changeInfo = async () => {
  let res = await getInfoApi()
  for (let key in dataInfo) {
    dataInfo[key].name = res.data[key].name
    dataInfo[key].unit = res.data[key].unit
    // 数字动画效果
    gsap.to(dataInfo[key], {
      number: res.data[key].number,
      duration: 1
    })
  }
}

const eventList = ref([])
// 获取事件列表
const getEventList = async () => {
  let res = await getListApi()
  eventList.value = res.data
}

onMounted(async () => {
  changeInfo()
  getEventList()
  setInterval(() => {
    changeInfo()
    getEventList()
  }, 10000)
})
</script>
