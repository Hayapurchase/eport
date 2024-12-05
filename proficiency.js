import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import World from "./engine/world";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();


const canvas = document.querySelector(".prof");
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
scene.add(camera);
camera.position.set(8, 2, 0);
//camera.lookAt(0,0,0);



//load model
const glbloader = new GLTFLoader();
glbloader.load(
    "/models/proficiency.glb",
    function (gltf) {
        // On success: Add the model to the scene
        scene.add(gltf.scene);
        gltf.scene.scale.set(0.5, 0.5, 0.5); // Adjust the scale of the model
        gltf.scene.position.set(0, 0, 0); // Set position
    },
)


const light = new THREE.SpotLight(0xffffff, 5);
light.position.set(3, 4, 2);
scene.add(light);

const lights = new THREE.SpotLight(0xffffff, 5);
lights.position.set(3, 4, -2);
scene.add(lights);


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

//renderer.render(scene,camera);
renderer.setSize(window.innerWidth, window.innerHeight);

//orbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = false;
controls.enableRotate = false;

const sphere = new THREE.OctahedronGeometry(5,12);
const sphereMat = new THREE.PointsMaterial({
    color:0xffffff,
    size:0.01
});
const sphereMesh = new THREE.Points(sphere,sphereMat);

scene.add(sphereMesh);



function animate() {
    sphereMesh.rotation.y += 0.001;
    requestAnimationFrame(animate);

    composer.render();

    //renderer.render(scene, camera);

}
const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.0,
    0.1,
    0.1
);
composer.addPass(bloomPass);

renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1.5;

animate();