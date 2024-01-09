import * as THREE from "three";

export default function createMesh() {
  const geometry = new THREE.BoxGeometry(15, 0.2, 15)

  // 物体外观：材质Material
  // 如果你想定义物体的外观效果，比如颜色，就需要通过材质Material相关的API实现。
  //创建一个材质对象Material
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000 //0xff0000设置材质颜色为红色
  })

  //3、物体：网格模型Mesh
  //实际生活中有各种各样的物体，在threejs中可以通过网格模型Mesh (opens new window)表示一个虚拟的物体，比如一个箱子、一个鼠标。
  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh

  //模型位置.position
  //实际生活中，一个物体往往是有位置的，对于threejs而言也是一样的，你可以通过位置属性.position定义网格模型Mesh在三维场景Scene中的位置。
  //设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(10, 1, 10)

  return mesh
  // createCity();
}
