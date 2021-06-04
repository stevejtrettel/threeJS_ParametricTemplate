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
    parametricCurvePoint,
   parametricSurfacePoint
} from './calculations.js';






//=============================================
//Variables defined in this file
//=============================================

//none here





//=============================================
//Functions to Export
//=============================================



function createCurve(time){
    
    let points=[];
    let numSteps=200*ui.curveRes;
    let pt;

    for(let i=0;i<numSteps;i++){

        pt=parametricCurvePoint(i/numSteps,time);
        points.push(pt);
    }
    
    let curve = new THREE.CatmullRomCurve3(points);

    let res=5*numSteps;
    let width=Math.max(0.01,0.3*ui.tubeWidth);

    let geometry = new THREE.TubeBufferGeometry(curve, res, width, 15, true);
    
    return geometry; 
    
}





////outputs the geometry of the surface
//uses the function getSurfacePoint
function createSurface(time){

    //set the resolution of the surface
    let slices=200.*ui.slices;
    let stacks=200.*ui.stacks;
    
    return new THREE.ParametricBufferGeometry(
        (u,v, dest) => {

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
    createCurve,
    createSurface
};
