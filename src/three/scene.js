import * as THREE from "three";

// 创建3D场景对象Scene
const scene = new THREE.Scene();

// 场景天空盒
const textureCubeLoader = new THREE.CubeTextureLoader().setPath("./textures/");
const textureCube = textureCubeLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
]);

scene.background = textureCube;
scene.environment = textureCube;

export default scene;
