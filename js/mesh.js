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
        fourierGraphGeometry,
    } from './geometry.js';

    import{
        curveMaterial,
        surfaceMaterial,
        glassMaterial,
        createMaterials,
    } from './materials.js';

import {
    fourierGraphPoint,
} from "./calculations.js";






//=============================================
//Variables Defined in this File
//=============================================

let partialGraphs=[];
let partialGraphMaterials=[];
let nMax=31;


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
function updateFourierGraphMesh(graph,params){
    let pos;

    //update the graph
    graph.children[0].geometry.dispose();
    graph.children[0].geometry=fourierGraphGeometry(fourierGraphPoint, params);

    //move the endpoint balls:
    pos=fourierGraphPoint(params.a,params.n);
    graph.children[1].position.set(pos.x,pos.y,pos.z);

    pos=fourierGraphPoint(params.a,params.n);
    graph.children[2].position.set(pos.x,pos.y,pos.z);

     }




function updateFourierGraphCollection(M){
    //re-arrange the original graphs so that we only draw M of them;
    for(let i=0;i<nMax;i++) {
        if(i>M){
            partialGraphs[i].visible=false;
        }
        else{
            //move graph to the right location
            partialGraphs[i].visible=true;
            partialGraphMaterials[i].color.setHSL(0.7,0.5,i/M);
            partialGraphs[i].position.set(0,0,-M+i);
        }
    }
}



//=============================================
//Functions to Export
//=============================================


function createMeshes(cubeTexture) {
    
    let geometry,mesh;//internal variable

    //build up the materials
    createMaterials(cubeTexture);

    //make the real graph
    let params={
        n:nMax,
        a:-2*Math.PI,
        b:2.*Math.PI+0.012,
        thickness:0.05
    };

    //make all the partial graphs
    for(let i=0;i<nMax;i++) {
        //change the number of terms in the sum
        params.n=i;
        //make a copy of the material for each curve; we are going to individually change its color
        partialGraphMaterials.push(curveMaterial.clone());
        partialGraphMaterials[i].color.setHSL(0.7,0.5,i/nMax);

        //make the actual mesh
        mesh=fourierGraphMesh( params, partialGraphMaterials[i] );
        mesh.position.set(0,0,-nMax+1+i);
        partialGraphs.push(mesh);
        scene.add(partialGraphs[i]);
    }

    //make the plane
    geometry = new THREE.PlaneGeometry(4.*Math.PI+0.5 , 8.);
    let plane = new THREE.Mesh(geometry, glassMaterial);
    scene.add(plane);

}




function updateMeshes(time) {

    //no updates to run every frame: its a static image
    //when N is changed in the UI, then we call updateFourierGraphCollection

}




//=============================================
//Exports from this file
//=============================================



export {
    createMeshes,
    updateMeshes,
    updateFourierGraphCollection
}
