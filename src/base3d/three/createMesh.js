// import * as THREE from "three";
import createCity from "../mesh/city.js";
import createAircraft from "../mesh/aircraft.js";
import coneMesh from "../mesh/coneMesh.js";
import createRadar from "../mesh/radar.js";

export default function createMesh() {
  createRadar();
  createAircraft();
  coneMesh(0.2);
  createCity();
}
