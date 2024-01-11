<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'

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
// 导入控制器
import controls from '@/base3d/three/controls'
// 初始化调整屏幕
import '@/base3d/three/init'

import AlarmSprite from '@/base3d/mesh/AlarmSprite'
import LightWall from '@/base3d/mesh/LightWall'
import FlyLineShader from '@/base3d/mesh/FlyLineShader'
import LightRadar from '@/base3d/mesh/LightRadar'

import emiter from '@/utils/emiter'

const props = defineProps(['eventList'])
// 场景元素div
let sceneDiv = ref(null)
// 添加相机
scene.add(camera)
// 添加辅助坐标轴
scene.add(axesHelper)

createMesh()

const eventListMesh = []
let mapFn = {
  火警: (position, i) => {
    const lightWall = new LightWall(1, 2, position)
    lightWall.eventListIndex = i
    scene.add(lightWall.mesh)
    eventListMesh.push(lightWall)
  },
  治安: (position, i) => {
    //   生成随机颜色
    const color = new THREE.Color(Math.random(), Math.random(), Math.random()).getHex()
    // 添加着色器飞线
    const flyLineShader = new FlyLineShader(position, color)
    flyLineShader.eventListIndex = i
    scene.add(flyLineShader.mesh)
    eventListMesh.push(flyLineShader)
  },
  电力: (position, i) => {
    // 添加雷达
    const lightRadar = new LightRadar(2, position)
    lightRadar.eventListIndex = i
    scene.add(lightRadar.mesh)
    eventListMesh.push(lightRadar)
  }
}
emiter.on('eventToggle', (i) => {
  eventListMesh.forEach((item) => {
    if (item.eventListIndex === i) {
      item.mesh.visible = true
    } else {
      item.mesh.visible = false
    }
  })
  const position = {
    x: props.eventList[i].position.x / 5 - 10,
    y: 0,
    z: props.eventList[i].position.y / 5 - 10
  }
  //   controls.target.set(position.x, position.y, position.z);
  gsap.to(controls.target, {
    duration: 1,
    x: position.x,
    y: position.y,
    z: position.z
  })
})

watch(
  () => props.eventList,
  () => {
    eventListMesh.forEach((item) => {
      item.remove()
    })
    props.eventList.forEach((item, i) => {
      const position = {
        x: item.position.x / 5 - 10,
        z: item.position.y / 5 - 10
      }
      const alarmSprite = new AlarmSprite(item.name, position)
      alarmSprite.onClick(() => {
        emiter.emit('spriteClick', { event: item, i })
      })
      alarmSprite.eventListIndex = i
      eventListMesh.push(alarmSprite)
      scene.add(alarmSprite.mesh)
      if (mapFn[item.name]) {
        mapFn[item.name](position, i)
      }
    })
  }
)

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
