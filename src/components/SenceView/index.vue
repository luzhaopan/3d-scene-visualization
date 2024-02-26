<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// 导入场景
import scene from '@/base3d/three/scene'
// 导入相机
import camera from '@/base3d/three/camera'
// 导入辅助坐标轴
import axesHelper from '@/base3d/three/axesHelper'
// 导入渲染器
import renderer from '@/base3d/three/renderer'
// 导入添加物体函数
import createMesh from '@/base3d/three/createMesh'
// 导入每一帧的执行函数
import animate from '@/base3d/three/animate'
// 初始化调整屏幕
import '@/base3d/three/init'

// 场景元素div
let sceneDiv = ref(null)
// 添加相机
scene.add(camera)
// 添加辅助坐标轴
scene.add(axesHelper)

createMesh()

onMounted(() => {
  // 渲染器Canvas画布属性.domElement
  // 渲染器WebGLRenderer通过属性.domElement可以获得渲染方法.render()生成的Canvas画布，.domElement本质上就是一个HTML元素：Canvas画布。
  //Canvas画布插入到任意HTML元素中
  sceneDiv.value.appendChild(renderer.domElement)
  // document.getElementById('id')!.appendChild(renderer.domElement)

  //执行渲染操作
  animate()
})
</script>

<style>
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>
