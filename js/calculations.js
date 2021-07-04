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

//none



//=============================================
//Components for building the surface,curve
//=============================================


function parametricSurfacePoint(u,v,time=0){

    //set the coordinate domain:
    let uMin=0;
    let uMax=2.*Math.PI;
    let vMin=-2.*Math.PI;
    let vMax=2.*Math.PI;


    //get variables from user input
    let a = 1.+2.*ui.a;
    let b = ui.b;
    let c = ui.c;

    //rescale the coords from [0,1]
    u = (uMax-uMin)*u+uMin;
    v = (vMax-vMin)*v+vMin;

    //make the parametric function:
    let x = (a + Math.cos(v)) * Math.sin(u);
    let y = (a + Math.cos(v)) * Math.cos(u);;
    let z = Math.sin(v);

    return new THREE.Vector3(x,z,-y);
}


//all the christoffel symbol trash goes in here!
function acceleration(state) {

    //unpack the position and velocity coordinates
    let u = state[0].x;
    let v = state[0].y;
    let uP = state[1].x;
    let vP = state[1].y;

    let A=2.*ui.a+1;

    //For Torus
    let uAcc = 2 * uP * vP * Math.sin(v) / (A + Math.cos(v));
    let vAcc = -(A + Math.cos(v)) * uP * uP * Math.sin(v);
    let acc = new THREE.Vector2(uAcc, vAcc);

    return acc;
}





//takes in Vector4[pos,vel] and returns Vector4[vel, acc]
function stateDeriv(st4) {

    let pos = new THREE.Vector2(st4.x, st4.y);
    let vel = new THREE.Vector2(st4.z, st4.w);

    let acc = acceleration([pos, vel]);

    return new THREE.Vector4(vel.x, vel.y, acc.x, acc.y);
}


function rk4OneStep(state,step) {

    //unpack the position and velocity
    let pos = state[0];
    let vel = state[1];

    let st4 = new THREE.Vector4(pos.x, pos.y, vel.x, vel.y);

    let k1 = stateDeriv(st4).multiplyScalar(step);

    let k2 = stateDeriv(st4.clone().add(k1.clone().multiplyScalar(0.5))).multiplyScalar(step);

    let k3 = stateDeriv(st4.clone().add(k2.clone().multiplyScalar(0.5))).multiplyScalar(step);

    let k4 = stateDeriv(st4.clone().add(k3)).multiplyScalar(step);

    let adjustment = k1.clone().add(k2.clone().multiplyScalar(2));
    adjustment.add(k3.clone().multiplyScalar(2));
    adjustment.add(k4);

    let soltn = st4.clone().add(adjustment.multiplyScalar(1 / 6));

    //now need to break the solution down into the right type of object to return; a state
    pos = new THREE.Vector2(soltn.x, soltn.y);
    vel = new THREE.Vector2(soltn.z, soltn.w);
    return [pos, vel];
}




function setInitialCondition(anglePos,angleVel){
    let pos=new THREE.Vector2(Math.cos(Math.PI*anglePos),Math.sin(Math.PI*anglePos));
    let vel=new THREE.Vector2(Math.cos(Math.PI*angleVel),Math.sin(Math.PI*angleVel));
    return [pos,vel];
}


//params are initial condition and time
function computeGeodesic(params){
    let points=[];
    let pt;

    //initial tangent vector to geodesic;
    let state = params.initialCond;
    let ui,vi;
    let step=0.1;
    let numSteps = params.length / step;

    for (let i = 0; i < numSteps; i++) {

        //these are the parameter-values of the geodesic
        ui = (state[0]).x;
        vi = (state[0]).y;

        //calculate x y z coords of parameterization
        pt=parametricSurfacePoint(ui,vi);

        //append points to the list
        points.push(pt);

        //move forward one step along the geodesic in UV coordinates
        state = rk4OneStep(state,step);

    }

    return points;
}









//=============================================
//Exports from this file
//=============================================


export{
    setInitialCondition,
    computeGeodesic,
    parametricSurfacePoint,
}
