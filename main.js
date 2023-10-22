import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const earthtexture = new THREE.TextureLoader().load("./earthtexture.jpg");
const normalmap = new THREE.TextureLoader().load("./normalmap.jpg");
const bgtexture = new THREE.TextureLoader().load("./milkyway.jpg");
scene.background = bgtexture;
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 64, 64),
  new THREE.MeshStandardMaterial({
    map: earthtexture,
    normalMap: normalmap,
  })
);
scene.add(earth);

function stars() {
  const geometry = new THREE.SphereGeometry(0.03, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(stars);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000);
camera.position.z = 20;
scene.add(camera);

const light = new THREE.AmbientLight("#0xffffff", 2, 100);
light.position.set(1, 1, 1);
scene.add(light);

const canvas = document.querySelector(".scene");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(2);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;

const rloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(rloop);
};
rloop();
//MADE BY @alperhasturk three js earth
