import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import createLightSphereMesh from './lightSphereMesh.js';
import createSignalMesh from './signalMesh.js';
import scene from "../three/scene.js";

export default function createAircraft() {
  const flyGroup = new THREE.Group() 

  const LightSphereMesh = createLightSphereMesh(1);
  flyGroup.add(LightSphereMesh);
  const SignalMesh = createSignalMesh();
  // console.log('SignalMesh', SignalMesh)
  flyGroup.add(SignalMesh);
  
  let mixer = null; //声明一个混合器变量
  const loader = new GLTFLoader();
  loader.load('./model/fly.glb', function (gltf) {
    let fly = gltf.scene;
  
    // 三维场景默认单位是米，美术导出模型单位是厘米，需要缩小数字尺寸
    fly.scale.set(0.03, 0.03, 0.03); //根据需要放大无人机
    fly.position.x = -0.8; //如果美术导出的模型不居中，需要代码调整
    // fly.position.z = 0;
    flyGroup.add(fly);
    // 递归遍历model包含所有的模型节点
    fly.traverse(function (child) {
      if (child.isMesh) {
        var material = child.material
        child.material = new THREE.MeshLambertMaterial({
          color: material.color,
        })
      }
    });
    // obj作为混合器的参数，可以播放obj包含的帧动画数据
    mixer = new THREE.AnimationMixer(fly);
    // console.log('gltf.animations[0]', gltf.animations);
    // obj.animations[0]：获得剪辑clip对象
    const AnimationAction = mixer.clipAction(gltf.animations[0]);
    AnimationAction.timeScale = 20; //默认1，可以调节播放速度
    // AnimationAction.loop = THREE.LoopOnce; //不循环播放
    // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
    AnimationAction.play();
    // 设置无人机坐标
    flyGroup.position.set(0, 5, 0);
    // // 姿态调整
    // flyGroup.rotateX(Math.PI / 2);
    scene.add(flyGroup);
  })
  
  
  const clock = new THREE.Clock();
  function UpdateLoop() {
    if (mixer !== null) {
      //clock.getDelta()方法获得两帧的时间间隔
      mixer.update(clock.getDelta());
    }
    requestAnimationFrame(UpdateLoop);
  }
  UpdateLoop();
}
