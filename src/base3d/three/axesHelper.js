import * as THREE from "three";

// 辅助观察坐标系
// AxesHelper：辅助观察的坐标系
// 坐标轴颜色红R、绿G、蓝B分别对应坐标系的x、y、z轴，对于three.js的3D坐标系默认y轴朝上。
const axesHelper = new THREE.AxesHelper(2);

export default axesHelper;
