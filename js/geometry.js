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
    fourierGraphPoint,
} from './calculations.js';





//=============================================
//Variables defined in this file
//=============================================

//none here



//=============================================
//Functions to Export
//=============================================


//the curve defining the partial sum of the fourier series
//parameters={n,a,b,thickness}
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

    //add the final point a couple times so it doesn't get chopped short
    points.push(curve(params.b,params.n));
    points.push(curve(params.b,params.n));
    points.push(curve(params.b,params.n));

    let path = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeBufferGeometry(path, 3000, params.thickness, 15, false);

}





//=============================================
//Exports from this file
//=============================================



export {
    fourierGraphGeometry,
};
