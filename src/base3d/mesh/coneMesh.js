//  旋转透明渐变棱锥
import * as THREE from 'three';
import createWaveMesh from './waveMesh.js';
import scene from "../three/scene.js";

export default function createConeMesh(size) {
  var height = size * 4; //棱锥高度
  // 圆锥体几何体API(ConeGeometry)圆周方向四等分实现四棱锥效果
  var geometry = new THREE.ConeGeometry(size, height, 4, 1, true);
  // 可以根据需要旋转到特定角度
  geometry.rotateX(Math.PI);
  // geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, 0, height/8);
  var material = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('./img/渐变.png'),
    // color: 0x22ffcc,
    color: 0xccff22,
    transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
    // opacity: 0.5,//整体改变透明度
    side: THREE.DoubleSide,
    depthTest: true,
  });
  var mesh = new THREE.Mesh(geometry, material);

  // 棱锥上在叠加一个棱锥
  var mesh2 = mesh.clone();
  mesh2.scale.y = 0.5;
  mesh2.position.y = height * (1 + mesh2.scale.y)/2;
  // mesh2.position.y = 2;
  mesh2.rotateZ(Math.PI);
  mesh.add(mesh2);

  // 设置坐标
  mesh.position.set(-12, 6, -10);

  // 棱锥旋转动画
  function animation() {
    mesh.rotateY(0.05);
    requestAnimationFrame(animation);
  }
  animation();

  var WaveMesh = createWaveMesh(size);
  WaveMesh.position.z = height;
  mesh.add(WaveMesh);
  scene.add(mesh)
  // return mesh;
}
