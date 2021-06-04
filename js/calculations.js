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
    return parametricSurfacePoint(s,0,time);
}







//=============================================
//An Example with Parameters
//=============================================

//
// function parametricSurfacePoint(u,v,time){
//
//
//     //set the coordinate domain:
//     let uMin=-3;
//     let uMax=3;
//     let vMin=-3;
//     let vMax=3;
//
//     //rescale the coords from [0,1]
//     u=(uMax-uMin)*u+uMin;
//     v=(vMax-vMin)*v+vMin;
//
//
//     //get the constants from the UI:
//     //you can rescale them from [0,1] here if you like
//     let a=3*ui.a;
//     let b=3*ui.b;
//
//     //make the parametric function:
//     let x=u;
//     let y=v;
//     let z=Math.sin(a*x)*Math.sin(b*y);
//
//     //return the result
//     return new THREE.Vector3(x,z,-y);
// }
//
//
//
// function parametricCurvePoint(s,time){
//
//     //set up the domain:
//     let sMin=0;
//     let sMax=2.*Math.PI;
//
//     //rescale the input:
//     s=(sMax-sMin)*s+sMin;
//
//     //make the parametric function
//     let x=Math.cos(s);
//     let y=Math.sin(2*s);
//     let z=3+Math.sin(time)*Math.cos(3*s);
//
//
//     //return the result
//     return new THREE.Vector3(x,z,-y);
// }
//
//
//
//



//=============================================
//Exports from this file
//=============================================


export{
    parametricCurvePoint,
    parametricSurfacePoint,
}
