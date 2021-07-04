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
let linkage;
let wheels;
// let rods=[];
// let balls=[];






//=============================================
//Functions for creating / updating groups of meshes
//=============================================


//draw the graph of a partial sum of the fourier series
//parameters={n,a,b,thickness}
function fourierGraphMesh(curve, params, mat){

    let graph, geometry,pos, ball1, ball2;

    //make the main part of the graph
    graph=new THREE.Group();
    geometry=fourierGraphGeometry(curve, params);
    curve=new THREE.Mesh(geometry, mat);
    graph.add(curve);

    //add some balls on the end of the graph
    geometry=new THREE.SphereBufferGeometry(0.075,32,32);
    ball1=new THREE.Mesh(geometry, mat);
    pos=fourierGraphPoint(params.a,params.n);
    ball1.position.set(pos.x,pos.y,pos.z);
    graph.add(ball1);

    ball2=new THREE.Mesh(geometry, mat);
    pos=fourierGraphPoint(params.b,params.n);
    ball2.position.set(pos.x,pos.y,pos.z);
    graph.add(ball2);

    //return the group to add to scene
    return graph;
}



//draw a linkage of balls and rods building up the partial sums of the fourier series
//parameters for linkage: N, width
function linkageMesh(params, mat){

    let width, geometry, mesh, pos;

    let linkage=new THREE.Object3D();

    for(let i=0; i<params.n; i++) {

        //make the balls on the endpoints
        width=1.5*params.width;
        if(i!==0){
            width=1.25*params.width/i;
        }
        geometry = new THREE.SphereBufferGeometry(width,32,32);
        mesh = new THREE.Mesh(geometry, mat);
        pos=fourierGraphPoint_Complex(0,i);
        mesh.position.set(pos.x,pos.y,pos.z);
        linkage.add(mesh);

        //make all the rods
        width = params.width/(i+1);
        geometry = rodGeometry(fourierGraphPoint_Complex(0,i), fourierGraphPoint_Complex(0,i+1), width);
        mesh = new THREE.Mesh(geometry, mat);
        linkage.add(mesh);
    }

    //the children of the linkage go ball0, rod01, ball1, rod12, ball2, etc...
    return linkage;

}

function updateLinkageMesh(linkage, params, t){
    let width,pos;

    for(let i=0;i<params.n;i++) {
        //re-position all the spheres:
        pos=fourierGraphPoint_Complex(t, i);
        //spheres are even indices in the linkage
        linkage.children[2*i].position.set(pos.x,pos.y,pos.z);

        //re-make all the rods
        width=params.width/(i+1);
        //rods are the odd indices in the linkage
        linkage.children[2*i+1].geometry.dispose();
        linkage.children[2*i+1].geometry=rodGeometry(fourierGraphPoint_Complex(t,i), fourierGraphPoint_Complex(t,i+1),width);
    }
}


//params={n,width}
function wheelsMesh(params,mat){
    let wheels=new THREE.Object3D();
    let width,geometry;

    for(let i=0;i<params.n;i++) {
        width=params.width/(i+1);
        geometry = wheelGeometry(amplitude(i),width);
        wheels.add(new THREE.Mesh(geometry, mat));
    }
    return wheels;
}



function updateWheelsMesh(wheels,params,time){
    let pos;

    for(let i=0;i<params.n;i++) {
        pos=fourierGraphPoint_Complex(time, i);
        wheels.children[i].position.set(pos.x,pos.y,pos.z);
    }
}



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
    let params;


    //make the real graph
    params={
        n:30,
        a:-2*Math.PI,
        b:2.*Math.PI,
        thickness:0.05
    };
    graph=fourierGraphMesh(fourierGraphPoint, params, curveMaterial);
    scene.add(graph);


    //make the complex graph
    //leave params the same, except thickness
    params.thickness=0.03;
    graph_Complex=fourierGraphMesh(fourierGraphPoint_Complex, params, glassMaterial);
    scene.add(graph_Complex);


    //make the plane
    geometry = new THREE.PlaneGeometry(4.*Math.PI+0.5 , 8.);
    let plane = new THREE.Mesh(geometry, glassMaterial);
    scene.add(plane);

    //make the x-axis
    geometry = rodGeometry(new THREE.Vector3(-2.*Math.PI,0,0), new THREE.Vector3(2*Math.PI+0.4,0,0),0.03);
    let axis=new THREE.Mesh(geometry, curveMaterial);
    scene.add(axis);


    //make the wheels
    wheels=wheelsMesh({n:30,width:0.075}, curveMaterial);
    scene.add(wheels);


    //make the linkage
    linkage=linkageMesh({n:30,width:0.075}, curveMaterial);
    scene.add(linkage);
}




function updateMeshes(time) {

    //use the UI to update material properties
    // surfaceMaterial.transmission=1-ui.opacity;
    // surfaceMaterial.color.set(ui.surfColor);
    // surfaceMaterial.envMapIntensity=3.*ui.reflectivity;
    //
    // curveMaterial.color.set(ui.curveColor);

    //set the domain coordinate we are going for
    let t=2.*Math.PI*Math.sin(0.2*time);

    let params={n:30,width:0.05};
    updateLinkageMesh(linkage,params,t);
    updateWheelsMesh(wheels,params,t);

}




//=============================================
//Exports from this file
//=============================================



export {
    createMeshes,
    updateMeshes
}
