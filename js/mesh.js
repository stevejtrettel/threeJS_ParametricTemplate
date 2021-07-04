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
        wheelMaterial,
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



//=============================================
//Functions for creating / updating groups of meshes
//=============================================


//draw the graph of a partial sum of the fourier series
//parameters={n,a,b,width}
function fourierGraphMesh(curve, params, mat){

    //aux variables
    let geometry,mesh,pos;
    let ball1,ball2;

    //thing to export
    let graph=new THREE.Object3D();

    //make the main part of the graph
    geometry=fourierGraphGeometry(curve, params);
    mesh=new THREE.Mesh(geometry, mat);
    graph.add(mesh);

    //add some balls on the end of the graph
    geometry=new THREE.SphereBufferGeometry(1.5*params.width,32,32);


    ball1=new THREE.Mesh(geometry, mat);
    pos=fourierGraphPoint(params.a,params.n);
    ball1.position.set(pos.x,pos.y,pos.z);
    graph.add(ball1);

    //add a second copy of this same ball, at a different location
    ball2=new THREE.Mesh(geometry, mat);
    pos=fourierGraphPoint(params.b,params.n);
    ball2.position.set(pos.x,pos.y,pos.z);
    graph.add(ball2);

    //return the group to add to scene
    return graph;
}


function updateFourierGraphMesh(graph, curve, params){
    //the first child of graph is the curve
    graph.children[0].geometry.dispose();
    graph.children[0].geometry=fourierGraphGeometry(curve,params);
}



//draw a linkage of balls and rods building up the partial sums of the fourier series
//parameters for linkage: N, width
function linkageMesh(params){

    let width, geometry, mesh, material,pos;

    let linkage=new THREE.Object3D();

    for(let i=0; i<params.n; i++) {

        //make the balls on the endpoints
        width=1.5*params.width;
        if(i!==0){
            width=1.25*params.width/i;
        }
        geometry = new THREE.SphereBufferGeometry(width,32,32);
        material = wheelMaterial.clone();
        material.color.setHSL((i-1)/params.n%1,0.7,0.3+0.4*(i/params.n));
        mesh = new THREE.Mesh(geometry, material);
        pos=fourierGraphPoint_Complex(0,i);
        mesh.position.set(pos.x,pos.y,pos.z);
        linkage.add(mesh);

        //make all the rods
        width = params.width/(i+1);
        geometry = rodGeometry(fourierGraphPoint_Complex(0,i), fourierGraphPoint_Complex(0,i+1), width);
        material = wheelMaterial.clone();
        material.color.setHSL(i/params.n%1,0.7,0.3+0.4*(i/params.n));
        mesh = new THREE.Mesh(geometry, material);
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

        //determine which circles are visible
        if(i<ui.N){
            linkage.children[2*i].visible=true;
            linkage.children[2*i].material.color.setHSL((i-1)/ui.N,0.7,0.3+0.4*(i/ui.N));

            linkage.children[2*i+1].visible=true;
            linkage.children[2*i+1].material.color.setHSL(i/ui.N,0.7,0.3+0.4*(i/ui.N));
        }
        else{
            linkage.children[2*i].visible=false;
            linkage.children[2*i+1].visible=false;
        }
    }
}


//params={n,width}
function wheelsMesh(params){
    let wheels=new THREE.Object3D();
    let width,geometry,material;

    for(let i=0;i<params.n;i++) {
        width=params.width/(i+1);
        geometry = wheelGeometry(amplitude(i),width);
        material = wheelMaterial.clone();
        material.color.setHSL(i/params.n%1,0.9,0.6+0.4*(i/params.n));
        wheels.add(new THREE.Mesh(geometry, material));
    }
    return wheels;
}



function updateWheelsMesh(wheels,params,time){
    let pos;

    for(let i=0;i<params.n;i++) {
        pos=fourierGraphPoint_Complex(time, i);
        wheels.children[i].position.set(pos.x,pos.y,pos.z);

        //determine which circles are visible
        if(i<ui.N){
            wheels.children[i].visible=true;
            wheels.children[i].material.color.setHSL(i/ui.N%1,0.9,0.6+0.4*(i/ui.N));
        }
        else{
            wheels.children[i].visible=false;
        }
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
        width:0.05
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
    wheels=wheelsMesh({n:30,width:0.075});
    scene.add(wheels);


    //make the linkage
    linkage=linkageMesh({n:30,width:0.075});
    scene.add(linkage);
}




function updateMeshes(time) {

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
    graph,
    graph_Complex,
    createMeshes,
    updateMeshes,
    updateFourierGraphMesh,
}
