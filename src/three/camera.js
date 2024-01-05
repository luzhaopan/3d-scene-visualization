import * as THREE from "three";

// 创建透视相机 PerspectiveCamera
//Threejs提供了正投影相机OrthographicCamera (opens new window)和透视投影相机PerspectiveCamera (opens new window)。本节课先给大家比较常用的透视投影相机PerspectiveCamera。
//透视投影相机PerspectiveCamera本质上就是在模拟人眼观察这个世界的规律。
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerHeight / window.innerHeight,
  1,
  50000
);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(5, 10, 15);

export default camera;
