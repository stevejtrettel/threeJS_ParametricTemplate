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
    fourierPartialSum,
    fourierPartialSum_Complex,
    fourierGraphPoint,
    fourierGraphPoint_Complex,
} from './calculations.js';
// from './calculations_Advanced.js';





//=============================================
//Variables defined in this file
//=============================================

//none here



//=============================================
//Functions to Export
//=============================================

function wheelGeometry(rad, thickness=0.25){
//wheel is created centered at 0,0,0, in the yz-plane.
    //its orientation and position can be moved by moving the entire mesh after creating.
    let points = [];
    let p,t;

    for (let k = 0; k < 25; k++) {
        t = 2 * 3.14 * (k / 25);

        p = new THREE.Vector3(0, rad * Math.cos(t), rad * Math.sin(t));
        points.push(p);
    }

    let path = new THREE.CatmullRomCurve3(points);

    return new THREE.TubeBufferGeometry(path, 75, thickness, 15, true);
}




function rodGeometry(p,q,thickness=0.25){
    //p,q are Vector3 endpoints of the rod
    //thickness is an optional parameter.

    let points = [];
    let t,r;
    for (let k = 0; k < 30; k++) {
        t = k / 30;

        r = new THREE.Vector3(p.x + t * (q.x - p.x), p.y + t * (q.y - p.y), p.z + t * (q.z - p.z));
        points.push(r);
    }

    let path = new THREE.CatmullRomCurve3(points);

    return new THREE.TubeBufferGeometry(path, 75, thickness, 15, false);
}




function fourierGraphGeometry(curve,n,a=-Math.PI,b=Math.PI, thickness=0.1){
    //n is how many terms in fourier series
    //a,b are endpoints of interval it is graphed on
    //drawn in xy plane

    let points = [];
    let t;
    for (let k = 0; k < 1000; k++) {
        t = a+(b-a)* k / 1000;

        points.push(curve(t,n));
    }

    let path = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeBufferGeometry(path, 3000, thickness, 15, false);

}





//=============================================
//Exports from this file
//=============================================



export {
    rodGeometry,
    wheelGeometry,
    fourierGraphGeometry,
};
