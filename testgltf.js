import * as THREE from "three";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import World from "./engine/world";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const canvas = document.querySelector(".canpas");
const camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.01,100);
scene.add(camera);
camera.position.set(1,2,4);
camera.lookAt(0,0,0);





const axes = new THREE.AxesHelper(5);
axes.position.set(0,0,0);
scene.add(axes);


const light = new THREE.AmbientLight(0xffccff,4);
scene.add(light);

const hemilight = new THREE.HemisphereLight(0xccccff,0xffccff);
scene.add(hemilight);



const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
    antialias:true
});
renderer.render(scene,camera);
renderer.setSize(window.innerWidth,window.innerHeight);

//orbitControls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.enablePan = false;

controls.dampingFactor = 0.03;


function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();

// File input event listener
const fileInput = document.getElementById('model');
fileInput.addEventListener('change', handleFileSelect);

// GLTF loader
const loader = new GLTFLoader();

loader.load(
    "/models/stadi.glb",
    function (gltf) {
        // On success: Add the model to the scene
        scene.add(gltf.scene);
        
    },
)

// Function to handle file selection
function handleFileSelect(event) {
    console.log("Hello World");
    const file = event.target.files[0];
    if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const arrayBuffer = e.target.result;

        // Load the GLTF model from the ArrayBuffer
        loader.parse(arrayBuffer, '', function (gltf) {
        // Clear previous model (if any)
        scene.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
            scene.remove(child);
            }
        });

        // Add the loaded model to the scene
        scene.add(gltf.scene);

        // Adjust camera position
        camera.position.z = 5;
        }, function (error) {
        console.error(error);
        });
    };
    reader.readAsArrayBuffer(file);
    }
}
