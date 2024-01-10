import * as THREE from 'three'
import gsap from 'gsap'

export default function flyLine() {
  let linePoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, 4, 0),
    new THREE.Vector3(10, 0, 0)
  ]
  // 创建曲线
  const lineCurve = new THREE.CatmullRomCurve3(linePoints)
  // 根据曲线生成管道几何体
  const geometry = new THREE.TubeGeometry(lineCurve, 100, 0.4, 2, false)
  // 设置飞线材质, 创建纹理
  const textloader = new THREE.TextureLoader()
  const texture = textloader.load('./img/z_11.png')
  texture.repeat.set(1, 2)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.MirroredRepeatWrapping

  const material = new THREE.MeshBasicMaterial({
    // color: 0xfff000,
    map: texture,
    transparent: true
  })

  // 4 创建飞线物体
  const mesh = new THREE.Mesh(geometry, material)

  // 5 创建飞线的动画
  gsap.to(texture.offset, {
    x: -1,
    duration: 1,
    repeat: -1,
    ease: 'none'
  })
  return mesh
}
