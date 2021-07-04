//=============================================
//Imports from lib/
//=============================================

import {
    GUI
} from './libs/dat.gui.module.js';


//=============================================
//Imports from My Code
//=============================================

//NONE HERE
import {
    updateFourierGraphMesh,
    graph,
    graph_Complex
} from "./mesh.js";

import {
    fourierGraphPoint,
    fourierGraphPoint_Complex
} from "./calculations.js";


//=============================================
//Variables Defined in this File
//=============================================

//=============================================
//Variables Defined in this File
//=============================================


let ui = {
    AboutThis: function(){
        window.open('./about.html');
    },

    N:30,

};






//=============================================
//Functions to Export
//=============================================


function createUI() {

    let mainMenu = new GUI();

    mainMenu.width = 300;

    mainMenu.domElement.style.userSelect = 'none';

    mainMenu.add(ui, 'AboutThis').name("Help/About");

    let numController=mainMenu.add(ui, 'N', 0, 30, 1).name('N');

    numController.onChange(function(value){
        //already when we are animating each frame, we can set the visibility of the linkage.
        //the only thing we want to restrict to UI changes is re-drawing the graph;
        let params= {
            n:value,
            a:-2*Math.PI,
            b:2.*Math.PI,
            width:0.05
        };
        updateFourierGraphMesh(graph,fourierGraphPoint,params);
        updateFourierGraphMesh(graph_Complex,fourierGraphPoint_Complex,params);

    });

}



//=============================================
//Exports from this file
//=============================================


export {
    ui,
    createUI
};
