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
let glassMaterial;


//=============================================
//Useful Auxillary Functions
//=============================================

function HSLToHex(h,s,l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}




//=============================================
//Functions to Export
//=============================================


    function createMaterials(){
        
        
        let cubeTex=createEnvMap();

        glassMaterial = new THREE.MeshPhysicalMaterial({

            color: 0xffffff,
            metalness: 0.2,
            roughness: 0,
            envMap: cubeTex,
            envMapIntensity: 1.,
            side: THREE.DoubleSide,
            transparent: true,
            clearcoat:1,
            transmission:1.,
        });

        curveMaterial = new THREE.MeshPhysicalMaterial({

            color: 0xffffff,
            metalness: 0.2,
            roughness: 0,
            envMap: cubeTex,
            envMapIntensity: 2.,
            side: THREE.DoubleSide,
        });


       surfaceMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1e43,
            transparent:true,
            clearcoat:1,
            transmission:1-ui.opacity,
            metalness: 0,
            roughness: 0,
            envMap: cubeTex,
            envMapIntensity: 1.5,
            side: THREE.DoubleSide,
        });

    }




//=============================================
//Exports from this file
//=============================================



    export{
        HSLToHex,
        glassMaterial,
        curveMaterial,
        surfaceMaterial,
        createMaterials,
    }