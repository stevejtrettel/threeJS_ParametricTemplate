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

// import{
// } from './calculations.js';




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





//the curve defining the partial sum of the fourier series
//parameters={n,a,b,width}
function fourierGraphGeometry(curve,params){
    //n is how many terms in fourier series
    //a,b are endpoints of interval it is graphed on
    //drawn in xy plane

    let points = [];
    let t;
    for (let k = 0; k < 1000; k++) {
        t = params.a+(params.b-params.a)* k / 1000;
        points.push(curve(t,params.n));
    }

    //add a bunch of the final end point to the end of the curve, so it doesn't get cut short
    points.push(curve(params.b,params.n));
    points.push(curve(params.b,params.n));
    points.push(curve(params.b,params.n));

    //build a path from this curve
    let path = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeBufferGeometry(path, 3000, params.width, 15, false);

}





//=============================================
//Exports from this file
//=============================================



export {
    rodGeometry,
    wheelGeometry,
    fourierGraphGeometry,
};
