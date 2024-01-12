// import * as THREE from "three";
import createCity from "../mesh/city.js";
import createAircraft from "../mesh/aircraft.js";
import coneMesh from "../mesh/coneMesh.js";
export default function createMesh() {
  createAircraft();
  coneMesh(0.2);
  createCity();
}
