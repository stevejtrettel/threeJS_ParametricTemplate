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




//=============================================
//Variables Defined in this File
//=============================================

//curve parameters:
let sMin=0;
let sMax=2.*Math.PI;

//surface parameters:
let uMin=0;
let uMax=2.*Math.PI;
let vMin=-2.*Math.PI;
let vMax=2.*Math.PI;






//=============================================
//Components for building the surface,curve
//=============================================

//none here


//=============================================
//The shell example
//=============================================


function parametricSurfacePoint(u,v,time){


    //set the coordinate domain:
    let uMin=0;
    let uMax=2.*Math.PI;
    let vMin=-2.*Math.PI;
    let vMax=2.*Math.PI;

    //rescale the coords from [0,1]
    u=(uMax-uMin)*u+uMin;
    v=(vMax-vMin)*v+vMin;


    //make the parametric function:
    let x=5/4 *(1-v/(2*Math.PI))*Math.cos(2*v)*(1+Math.cos(u))+Math.cos(2*v);
    let y=5/4 *(1-v/(2*Math.PI))*Math.sin(2*v)*(1+Math.cos(u))+Math.sin(2*v);
    let z=10*v/(2*Math.PI)+(1-v/(2*Math.PI))*Math.sin(u);

    return new THREE.Vector3(x,z,-y);
}



function parametricCurvePoint(s,time){

    //set up the domain:
    // let sMin=0;
    // let sMax=2.*Math.PI;
    //
    // //rescale the input:
    // s=(sMax-sMin)*s+sMin;

    //apply the parametric function
    return parametricSurfacePoint(s,0,time);

}








//=============================================
//Exports from this file
//=============================================


export{
    parametricCurvePoint,
    parametricSurfacePoint,
}
