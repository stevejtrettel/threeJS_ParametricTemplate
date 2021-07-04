//=============================================
//Imports from lib/
//=============================================

import * as THREE from './libs/three.module.js';




//=============================================
//Imports from My Code
//=============================================


    import {
        ui
    } from './ui.js';

    import{
        createEnvMap
    } from "./scene.js";


//=============================================
//Variables Defined in this File
//=============================================

let curveMaterial,surfaceMaterial;


//=============================================
//Functions to Export
//=============================================


    function createMaterials(){
        
        
        let cubeTex=createEnvMap();


        curveMaterial = new THREE.MeshPhysicalMaterial({

            color: 0x5F199C,
            metalness: 0.2,
            roughness: 0,
            envMap: cubeTex,
            envMapIntensity: 0.5,
            side: THREE.DoubleSide,
        });


       surfaceMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xA195F5,
            //transparent:true,
            clearcoat:1,
            //transmission:1-ui.opacity,
            metalness: 0,
            roughness: 0,
            envMap: cubeTex,
            envMapIntensity: 0.5,
            side: THREE.BackSide,
        });

    }




//=============================================
//Exports from this file
//=============================================



    export{
        curveMaterial,
        surfaceMaterial,
        createMaterials,
    }