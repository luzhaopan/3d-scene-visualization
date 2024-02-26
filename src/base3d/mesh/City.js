import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import scene from "../three/scene.js";

export default function createCity() {
	const gltfLoader = new GLTFLoader();
	gltfLoader.load("./model/city.glb", (gltf) => {
		gltf.scene.traverse((item) => {
			if (item.type == "Mesh") {
				const cityMaterial = new THREE.MeshBasicMaterial({
					color: new THREE.Color(0x0c0e33),
				});
				item.material = cityMaterial;
			}
		});
		
		scene.add(gltf.scene);

	});
}
