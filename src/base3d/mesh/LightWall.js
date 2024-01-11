import * as THREE from "three";
import gsap from "gsap";
import vertex from "../shader/wall_vertex.glsl.js";
import fragment from "../shader/wall_fragment.glsl.js";

export default class LightWall {
	constructor(radius = 5, length = 2, position = { x: 0, z: 0 }) {
		this.geometry = new THREE.CylinderGeometry(
			radius,
			radius,
			2,
			32,
			1,
			true
		);
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertex,
			fragmentShader: fragment,
			transparent: true,
			side: THREE.DoubleSide,
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(position.x, 1, position.z);
		this.mesh.geometry.computeBoundingBox();

		let { min, max } = this.mesh.geometry.boundingBox;
		//   获取物体的高度差
		let uHeight = max.y - min.y;
		this.material.uniforms.uHeight = {
			value: uHeight,
		};

		// 光墙动画
		gsap.to(this.mesh.scale, {
			x: length,
			z: length,
			duration: 1,
			repeat: -1,
			yoyo: true,
		});
	}

	remove() {
		this.mesh.remove();
		this.mesh.removeFromParent();
		this.mesh.geometry.dispose();
		this.mesh.material.dispose();
	}
}
