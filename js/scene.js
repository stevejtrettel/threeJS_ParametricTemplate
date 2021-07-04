//=============================================
//Imports from lib/
//=============================================

import * as THREE from './libs/three.module.js';

import {
    LightProbeGenerator
} from './libs/LightProbeGenerator.js';


//=============================================
//Imports from My Code
//=============================================

import {
    ui
} from './ui.js';


import {
    createMeshes,
    updateMeshes
} from './mesh.js'


import {
    pmremGenerator
} from './main.js';






//=============================================
//Variables Defined in this File
//=============================================

let camera,scene;


let time = 0.;


let directionalLight;


let mainScene={
    lightProbe:undefined,
    directionalLight:undefined, 
}


let bkgScene={
    scene:undefined,
    room:undefined,
    mainLight:undefined,
    
    
}



//=============================================
//Functions Internal to this file
//=============================================






//Internal Functions: Camera and Lights for Main Scene
//======================================================



function createCamera() {
    
     camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
     camera.position.set(24, 16, 12);
     camera.up.set(0,1,0);

}



function createLights() {
    
    // light probe
    mainScene.lightProbe = new THREE.LightProbe();
    mainScene.lightProbe.intensity = 2.;
    scene.add(mainScene.lightProbe);

    // normal light
    directionalLight = new THREE.DirectionalLight(0xffffff, 1.);
    directionalLight.position.set(10, 10, 10);
    //directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    
    let directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.);
    directionalLight2.position.set(10, -10, -10);
    //directionalLight.castShadow = true;
    scene.add(directionalLight2);

    let ptLight = new THREE.PointLight(0xffffff, ui.background, 0, 2);
    ptLight.position.set(0,3,-1);
    scene.add(ptLight);

}







//Internal Functions: Scene Background
//==========================================================


//=====if we have a generated background in a white cube

function createBkgScene() {

    bkgScene.scene = new THREE.Scene();

    var geometry = new THREE.BoxBufferGeometry();
    geometry.deleteAttribute('uv');
    
    var roomMaterial = new THREE.MeshStandardMaterial({
        color:0x9ACFF4,
        metalness: 0.,
        side: THREE.BackSide
    });
    
    bkgScene.room = new THREE.Mesh(geometry, roomMaterial);
    bkgScene.room.scale.setScalar(10);
    
    bkgScene.scene.add(bkgScene.room);

    bkgScene.mainLight = new THREE.PointLight(0xffffff, 10, 0, 2);
    
    bkgScene.scene.add(bkgScene.mainLight);

    //build the cube map fom this scene:
    var generatedCubeRenderTarget = pmremGenerator.fromScene(bkgScene.scene, 0.04);

    return  generatedCubeRenderTarget.texture;
}






//=============================================
//Functions to Be Exported
//=============================================

//Makes environment map for the materials
//=============================================
function createEnvMap() {
    // envmap
    let genCubeUrls = function (prefix, postfix) {

        return [
            prefix + 'px' + postfix, prefix + 'nx' + postfix,
            prefix + 'py' + postfix, prefix + 'ny' + postfix,
            prefix + 'pz' + postfix, prefix + 'nz' + postfix
        ];

    };


    //CAN GENERATE CUBE MAPS
    //https://jaxry.github.io/panorama-to-cubemap/
    let urls = genCubeUrls('./textures/trees/', '.png');

    return new THREE.CubeTextureLoader().load(urls, function (cubeTexture) {

        cubeTexture.encoding = THREE.sRGBEncoding;

        mainScene.lightProbe.copy(LightProbeGenerator.fromCubeTexture(cubeTexture));

    });

}




function createScene() {
    scene = new THREE.Scene();
    scene.background=createBkgScene();

    createCamera();
    createLights();
    createMeshes();

}



function updateScene() {
    time += 0.01;
    updateMeshes(time);
}




//=============================================
//Exports from this file
//=============================================


export {
    camera,
    scene,
    mainScene,
    createScene,
    createEnvMap,
    updateScene
};
