//=============================================
//Imports from lib/
//=============================================

import * as THREE from './libs/three.module.js';




//=============================================
//Imports from My Code
//=============================================

    import{
        ui
    } from "./ui.js";


import {
        scene
    } from './scene.js';

import {
    setInitialCondition
} from './calculations.js';

    import {
        createGeodesic,
        createSurface
    } from './geometry.js';

    import{
        curveMaterial,
        surfaceMaterial,
        createMaterials,
    } from './materials.js';






//=============================================
//Variables Defined in this File
//=============================================

let curve, surface;





//=============================================
//Functions to Export
//=============================================


function createMeshes(cubeTexture) {
    
    let geometry;//internal variable

    //build up the materials
    createMaterials(cubeTexture);

    //surface geometry
    geometry = createSurface(0,0);
    surface = new THREE.Mesh(geometry, surfaceMaterial);
    scene.add(surface);

    //curve geometry
    let params={
        length:ui.length,
        initialCond:setInitialCondition(ui.anglePos,ui.angleVel),
    }
    geometry=createGeodesic(params);
    curve=new THREE.Mesh(geometry, curveMaterial);
    scene.add(curve);

}


function updateGeodesicFromUI(){
    curve.geometry.dispose();
    let params={
        length:ui.length,
        initialCond:setInitialCondition(ui.anglePos,ui.angleVel)
    };
    curve.geometry = createGeodesic(params);
}

function updateMeshes(time) {

    //there is no animation here, so updates are only performed when the UI is changed

}




//=============================================
//Exports from this file
//=============================================



export {
    createMeshes,
    updateMeshes,
    updateGeodesicFromUI
}
