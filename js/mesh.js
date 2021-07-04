//=============================================
//Imports from lib/
//=============================================

import * as THREE from './libs/three.module.js';




//=============================================
//Imports from My Code
//=============================================

    import{
        ui
    } from "./ui.js";


import {
        scene
    } from './scene.js';


    import {
        rodGeometry,
        wheelGeometry,
        fourierGraphGeometry,
    } from './geometry.js';

    import{
        curveMaterial,
        surfaceMaterial,
        glassMaterial,
        createMaterials,
    } from './materials.js';

import {
    amplitude,
    fourierGraphPoint,
    fourierGraphPoint_Complex
} from "./calculations.js";






//=============================================
//Variables Defined in this File
//=============================================

let graph,graph_Complex;
let gBall1,gBall2,gCBall1,gCBall2;
let wheels=[];
let rods=[];
let balls=[];



//=============================================
//Functions to Export
//=============================================


function createMeshes(cubeTexture) {
    
    let geometry;//internal variable

    //build up the materials
    createMaterials(cubeTexture);


    //set the res
    let N=30;
    let width, pos;




    //make the real graph
    geometry=fourierGraphGeometry(fourierGraphPoint, N,-2*Math.PI,2.*Math.PI+0.012,0.05);
    graph=new THREE.Mesh(geometry, curveMaterial);
    scene.add(graph);


    //add little balls on the end of the graph to cap it off:
    geometry=new THREE.SphereBufferGeometry(0.075,32,32);
    gBall1=new THREE.Mesh(geometry, curveMaterial);
    scene.add(gBall1);
    pos=fourierGraphPoint(-2*Math.PI,N);
    gBall1.position.set(pos.x,pos.y,pos.z);

    gBall2=new THREE.Mesh(geometry, curveMaterial);
    scene.add(gBall2);
    pos=fourierGraphPoint(2*Math.PI,N);
    gBall2.position.set(pos.x,pos.y,pos.z);




    //make the complex graph
    geometry=fourierGraphGeometry(fourierGraphPoint_Complex, N,-2*Math.PI,2*Math.PI+0.012,0.03);
    graph_Complex=new THREE.Mesh(geometry, glassMaterial);
    scene.add(graph_Complex);


    //make the plane
    geometry = new THREE.PlaneGeometry(4.*Math.PI+0.5 , 8.);
    let plane = new THREE.Mesh(geometry, glassMaterial);
    scene.add(plane);

    //make the x-axis
    geometry = rodGeometry(new THREE.Vector3(-2.*Math.PI,0,0), new THREE.Vector3(2*Math.PI+0.4,0,0),0.03);
    let axis=new THREE.Mesh(geometry, curveMaterial);
    scene.add(axis);








    //make all the wheels
    for(let i=0;i<N;i++) {
        width=0.05/(i+1);
        geometry = wheelGeometry(amplitude(i),width);
        wheels.push(new THREE.Mesh(geometry, curveMaterial));
        scene.add(wheels[i]);
    }

    //make all the rods
    for(let i=0;i<N;i++) {
        width = 0.05/(i+1);
        geometry = rodGeometry(fourierGraphPoint_Complex(0,i), fourierGraphPoint_Complex(0,i+1),width);
        rods.push(new THREE.Mesh(geometry, curveMaterial));
        scene.add(rods[i]);
    }

    //make all the balls
    for(let i=0;i<N;i++) {
        width=0.1;
        if(i!=0){
            width=0.075/i;
        }
        geometry = new THREE.SphereBufferGeometry(width,32,32);
        balls.push(new THREE.Mesh(geometry, curveMaterial));
        scene.add(balls[i]);
    }

}




function updateMeshes(time) {

    //use the UI to update material properties
    surfaceMaterial.transmission=1-ui.opacity;
    surfaceMaterial.color.set(ui.surfColor);
    surfaceMaterial.envMapIntensity=3.*ui.reflectivity;

    curveMaterial.color.set(ui.curveColor);


    let width,pos;

    //set the domain coordinate we are going for
    let t=2.*Math.PI*Math.sin(0.2*time);

    //set the depth
    let N=30;

    //move all the wheels and balls
    for(let i=0;i<N;i++) {
        pos=fourierGraphPoint_Complex(t, i);
        wheels[i].position.set(pos.x,pos.y,pos.z);
        balls[i].position.set(pos.x,pos.y,pos.z);
    }

    //re-make all the rods
    for(let i=0;i<N;i++) {
        width=0.05/(i+1);
        rods[i].geometry.dispose();
        rods[i].geometry=rodGeometry(fourierGraphPoint_Complex(t,i), fourierGraphPoint_Complex(t,i+1),width);
    }


}




//=============================================
//Exports from this file
//=============================================



export {
    createMeshes,
    updateMeshes
}
