import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

const gltfLoader = new GLTFLoader();

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// GSAP

let tl = gsap.timeline();

// Object - Playing Card
gltfLoader.load("./models/Playing_Card/Playing_Card_Basic.gltf", (gltf) => {
  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.rotation.set(0, 0, 0);
  scene.add(gltf.scene);

  const twoPiRad = 2 * Math.PI;

  gui.add(gltf.scene.rotation, "x").min(0).max(twoPiRad);
  gui.add(gltf.scene.rotation, "y").min(0).max(twoPiRad);
  gui.add(gltf.scene.rotation, "z").min(0).max(twoPiRad);

  tl.to(gltf.scene.rotation, { y: twoPiRad, duration: 3 });
  tl.to(gltf.scene.rotation, { z: twoPiRad, duration: 3 }, "-=3");
});

// Objects
// const geometry = new THREE.TorusGeometry(1, 0.15, 100, 100);

// Materials

// const material = new THREE.MeshBasicMaterial();

// !RANDOM SHITS
// const colorInit = [255, 255, 255];
// const colorName = ["Red", "Green", "Blue"];

// // is an interval running in changeColor()...?
// let intervalInitialized = false;

// const changeColor = () => {
//   for (let n = 0; n < colorInit.length; ) {
//     // this is initial RGB component's value
//     let color = colorInit[n];

//     // should switch to next color? (If yes, n++)
//     // let nextColor = false;

//     // this reduces component's value
//     const reduceColor = () => {
//       console.log(`${colorName[n]} ${color}`);
//       color--;
//     };

//     console.log("here i am");
//     // create interval
//     if (intervalInitialized === false) {
//       console.log("interval initialized");
//       // start the interval
//       intervalInitialized = true;

//       let intervalValue = setInterval(() => {
//         reduceColor();
//         if (color < 0) {
//           // if component reaches 0, clear interval, switch to next color
//           clearInterval(intervalValue);
//           intervalInitialized = false;
//           n++;
//         }
//       }, 50);
//     }
//   }
// };

// changeColor();
// !RANDOM SHITS END

// material.color = new THREE.Color(0xffff00);

// Mesh
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

// Lights

const pointLight1 = new THREE.PointLight(0xffffff, 0.75);
pointLight1.position.x = 0;
pointLight1.position.y = 4;
pointLight1.position.z = 0;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 0.75);
pointLight2.position.x = 0;
pointLight2.position.y = -4;
pointLight2.position.z = 0;
scene.add(pointLight2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.01,
  100
);
camera.position.x = 0;
camera.position.y = 0.15;
camera.position.z = 0;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // console.log(
  //   `x_camera ${camera.position.x} \n y_camera${camera.position.x} \n z_camera${camera.position.x}`
  // );

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
