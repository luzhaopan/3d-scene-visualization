import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import scene from "../three/scene";
import MeshLine from "./MeshLine";

export default function createCity() {
	const gltfLoader = new GLTFLoader();
	gltfLoader.load("./model/city.glb", (gltf) => {
		gltf.scene.traverse((item) => {
			if (item.type == "Mesh") {
				const cityMaterial = new THREE.MeshBasicMaterial({
					color: new THREE.Color(0x0c0e33),
				});
				item.material = cityMaterial;
				// modifyCityMaterial(item);
				if (item.name == "Layerbuildings") {
					// 给模型添加线框
					const meshLine = new MeshLine(item.geometry);
					const size = item.scale.x * 1.001;
					meshLine.mesh.scale.set(size, size, size);
					scene.add(meshLine.mesh);
				}
			}
		});
		
		scene.add(gltf.scene);

	});
}
