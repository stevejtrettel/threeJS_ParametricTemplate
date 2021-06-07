//=============================================
//Imports from lib/
//=============================================


//=============================================
//READ TO USE THIS FILE
//=============================================


//this is an alternative file to the "calculations.js" file which is included,
//to help those of you who are interested get involved in making more complex animations
//here we build a parametric surface by stereographically projecting a surface from R4
//this gives you an example where we have to define several of our own functions

//TO USE THIS:
//just update the "import" statements in geometry.js to import the functions
//parametricCurvePoint and parametricSurfacePoint from this file instead.





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

let PI=Math.PI;


//=============================================
//Components for building the surface
//=============================================


//take in polar coordinates, spit out cartesian
function toZ(p){
    let r=p.x;
    let t=p.y;

    let ct=Math.cos(t);
    let st=Math.sin(t);

    let q=new THREE.Vector2(ct,st).multiplyScalar(r);

    return q;
}


//take in cartesian, spit out polar
function fromZ(q){

    let r=q.length();
    let t=Math.atan2(q.y,q.x);

    let p=new THREE.Vector2(r,t);

    return p;
}





//=============================================
//Components for working with points in R4
//=============================================

//rotate around in different coordinate planes in R4.
//x,y,u let you set the individual rotations to a specific value if you like, tumble
//is to allow some animation.
function rotateR4(p,x,y,u,tumble){

    let cS=Math.cos(y+0.7*tumble);
    let sS=Math.sin(y+0.7*tumble);
    let cT=Math.cos(x+1.5*tumble);
    let sT=Math.sin(x+1.5*tumble);
    let cU=Math.cos(u-1.3*tumble);
    let sU=Math.sin(u-1.3*tumble);


    let rotMatY=new THREE.Matrix4().set(
        cS,0,-sS,0,
        0,cS,0,-sS,
        sS,0,cS,0,
        0,sS,0,cS
    );



    let rotMatX=new THREE.Matrix4().set(
        cT,0,0,-sT,
        0,cT,-sT,0,
        0,sT,cT,0,
        sT,0,0,cT
    );


    let rotMatU=new THREE.Matrix4().set(
        cU,-sU,0,0,
        sU,cU,0,0,
        0,0,cU,-sU,
        0,0,sU,cU
    );


    let q= p.clone().applyMatrix4(rotMatY).applyMatrix4(rotMatX).applyMatrix4(rotMatU);

    return q;

}


function perspectiveProj(p){

    return new THREE.Vector3(p.x,p.y,p.z).multiplyScalar(1/(p.w));
}


function orthographicProj(p){

    //JUST DELETE THE W COORDINATE
    return new THREE.Vector3(p.x,p.y,p.z);
}



function combinedProj(v,time){

    //rotate in R4;
    v=rotateR4(v,0, 0,0,time);

    //now do whatever projection we want to show it:
    let V=orthographicProj(v);

    return V;

}








//=============================================
//Calculating points on the graphs of complex fn's
//=============================================


//compute the graph of the function z->exp(z)
function calcExp(x,y){

    let u=Math.exp(x)*Math.cos(y);
    let v=Math.exp(x)*Math.sin(y);

    return new THREE.Vector4(x,y,u,v);

}



//compute the graph of the complex function z->z^2
function calcZ2(x,y){

    let u=x*x-y*y;
    let v=2.*x*y;

    return new THREE.Vector4(x,y,u,v);
}





function getFunctionPoint(x,y,time){

    let q=calcExp(x,y);
   // let q=calcZ2(x,y);

    return combinedProj(q,time);
}






//=============================================
//Functions to Export
//=============================================

//
function parametricSurfacePoint(u,v,time){


    //set the coordinate domain:
    let uMin=-5;
    let uMax=2;
    let vMin=0;
    let vMax=6*PI;

    //rescale the coords from [0,1]
    u=(uMax-uMin)*u+uMin;
    v=(vMax-vMin)*v+vMin;

    //rename and rescale parameters from user input
    let a=5*ui.a;
    let b=5*ui.b;
    let c=5*ui.c;

    //make the parametric function:
    let q=calcExp(u,v);
    //let q=calcZ2(u,v);

    return combinedProj(q,time);
}


function parametricCurvePoint(s,time){

    //set up the domain:
    let sMin=0;
    let sMax=2*Math.PI;

    //rescale the input:
    s=(sMax-sMin)*s+sMin;

    //rename and rescale parameters from user input
    let a=5*ui.a;
    let b=5*ui.b;
    let c=5*ui.c;

    //MAKE ANY CURVE YOU WANT HERE
    //right now, NOT DRAWING A CURVE
    //so just have it returning the zero vector.

    //return the result
    return new THREE.Vector3(0,0,0);
}






//=============================================
//Exports from this file
//=============================================


export{
    parametricCurvePoint,
    parametricSurfacePoint,
}
