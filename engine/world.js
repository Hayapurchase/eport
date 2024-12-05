import * as THREE from 'three';


export default class World{

    makeworld(width,length,scene){
        const plane = new THREE.PlaneGeometry(width,length);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color:0xffffff
        });
        const planeMesh = new THREE.Mesh(plane,planeMaterial);
        planeMesh.rotation.set(0,0,0);
        scene.add(planeMesh);
    }
}
