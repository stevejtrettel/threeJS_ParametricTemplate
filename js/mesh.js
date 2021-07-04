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

let graph;
let partialGraphs=[];



//=============================================
//Making a Graph with Balls on the End
//=============================================




//draw the graph of a partial sum of the fourier series
//parameters={n,a,b,thickness}
function fourierGraphMesh(params, mat){

    let graph, geometry, curve,pos, ball1, ball2;

    //make the main part of the graph
    graph=new THREE.Group();
    geometry=fourierGraphGeometry(fourierGraphPoint, params);
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


//update this graph by changing its parameters.
function updateFourierGraphMesh(group,n, a,b,thickness){
    group.graph.geometry.dispose();
    group.graph.geometry=fourierGraphGeometry(fourierGraphPoint, n, a, b, thickness);
}




//=============================================
//Functions to Export
//=============================================


function createMeshes(cubeTexture) {
    
    let geometry,mesh;//internal variable

    //build up the materials
    createMaterials(cubeTexture);


    //set the res
    let N=30;
    let width, pos,params;

    //make the real graph
    params={
        n:N,
        a:-2*Math.PI,
        b:2.*Math.PI+0.012,
        thickness:0.05
    };
    graph=fourierGraphMesh( params, curveMaterial);
    scene.add(graph);


    //make all the partial graphs
    for(let i=0;i<N;i++) {
        width=0.05/(i+1);
        //change the number of terms in the sum
        params.n=i;
        mesh=fourierGraphMesh( params, curveMaterial );
        mesh.position.set(0,0,-N+i);
        partialGraphs.push(mesh);
        scene.add(partialGraphs[i]);
    }


    //make the plane
    geometry = new THREE.PlaneGeometry(4.*Math.PI+0.5 , 8.);
    let plane = new THREE.Mesh(geometry, glassMaterial);
    scene.add(plane);

    // //make the x-axis
    // geometry = rodGeometry(new THREE.Vector3(-2.*Math.PI,0,0), new THREE.Vector3(2*Math.PI+0.4,0,0),0.03);
    // let axis=new THREE.Mesh(geometry, curveMaterial);
    // scene.add(axis);




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

    // //move and re-set all the graphs
    // for(let i=0;i<N;i++) {
    //     width=0.05/(i+1);
    //     rods[i].geometry.dispose();
    //     rods[i].geometry=rodGeometry(fourierGraphPoint_Complex(t,i), fourierGraphPoint_Complex(t,i+1),width);
    // }


}




//=============================================
//Exports from this file
//=============================================



export {
    createMeshes,
    updateMeshes
}
