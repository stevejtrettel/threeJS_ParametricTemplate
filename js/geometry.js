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
    computeGeodesic,
   parametricSurfacePoint
} from './calculations.js';
// from './calculations_Advanced.js';





//=============================================
//Variables defined in this file
//=============================================

//none here





//=============================================
//Functions to Export
//=============================================


//parameters are initial condition and length
function createGeodesic(params){
    
    let points=computeGeodesic(params);
    let numSteps=points.length;
    
    let curve = new THREE.CatmullRomCurve3(points);

    let res=10*numSteps;
    let width=0.07;

    let geometry = new THREE.TubeBufferGeometry(curve, res, width, 15, false);
    
    return geometry; 
    
}


////outputs the geometry of the surface
//uses the function getSurfacePoint
function createSurface(time){


    //set the coordinate domain:
    let uMin=0;
    let uMax=2.*Math.PI;
    let vMin=-2.*Math.PI;
    let vMax=2.*Math.PI;


    //set the resolution of the surface
    let slices=100;
    let stacks=100;
    
    return new THREE.ParametricBufferGeometry(
        (u,v, dest) => {

            //rescale the coords from [0,1]
            u = (uMax-uMin)*u+uMin;
            v = (vMax-vMin)*v+vMin;

            //map using parametric surface
            let res=parametricSurfacePoint(u,v,time);
            dest.set(res.x,res.y,res.z);

        },
        slices,stacks //slices and stacks
    )

}



//=============================================
//Exports from this file
//=============================================



export {
    createGeodesic,
    createSurface
};
