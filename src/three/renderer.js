import * as THREE from "three";

// WebGL渲染器WebGLRenderer
// 通过WebGL渲染器WebGLRenderer (opens new window)可以实例化一个WebGL渲染器对象。
// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
	// 抗锯齿
	antialias: true,
});
// 设置Canvas画布尺寸.setSize()
// 定义threejs输出画布的尺寸(单位:像素px)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
export default renderer;
