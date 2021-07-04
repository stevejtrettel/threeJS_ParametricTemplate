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

//none here



//=============================================
//Square Wave
//=============================================


function squareWave_Coefs(n){

    let sinCoef = 1 / (2 * n + 1);;
    return sinCoef;
}

function squareWave_Frequency(n){
    //what is the frequency of the wave with index n?
    return (2 * n + 1);
}







//=============================================
//Fourier Analysis
//=============================================



function amplitude(n){
    return squareWave_Coefs(n);
}

function frequency(n){
    return squareWave_Frequency(n);
}


function fourierPartialSum(t,n){
    //t=point on x axis;
    //n=how many terms in partial sum

    let res = 0.;
    let coef,freq;

    for(let i=0; i<n; i++){
        res +=  amplitude(i) * Math.sin(frequency(i) * t);
    }

    return res;
}

function fourierPartialSum_Complex(t,n){
    let res=new THREE.Vector2(0,0);

    for(let i=0; i<n; i++){
        res.x +=  amplitude(i) * Math.cos(frequency(i) * t);
        res.y +=  amplitude(i) * Math.sin(frequency(i) * t);
    }

    return res;
}


function fourierGraphPoint(t,n){
    return new THREE.Vector3(t,fourierPartialSum(t,n),0);
}


function fourierGraphPoint_Complex(t,n){
    let pt=fourierPartialSum_Complex(t,n);
    //make it so the real fourier series appears in the xy plane
    return new THREE.Vector3(t,pt.y,pt.x);
}




//=============================================
//Exports from this file
//=============================================


export{
    amplitude,
    fourierPartialSum,
    fourierPartialSum_Complex,
    fourierGraphPoint,
    fourierGraphPoint_Complex,
}
