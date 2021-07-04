//=============================================
//Imports from lib/
//=============================================

import {
    GUI
} from './libs/dat.gui.module.js';

//=============================================
//Imports from My Code
//=============================================

import {
    updateGeodesicFromUI
} from './mesh.js';

//=============================================
//Variables Defined in this File
//=============================================


let ui = {
    AboutThis: function(){
      window.open('./about.html');
    },
    anglePos:0.2,
    angleVel:0.5,
    length:10,
    a:0.5,
    b:0.5,
    c:0.5,
    // slices:0.1,
    // stacks:0.5,
    // curveRes:0.5,
    // tubeWidth:0.5,
    // opacity:0.5,
    // reflectivity:0.5,
    // surfColor:0x1e43,
    // curveColor:0xffffff,
};






//=============================================
//Functions to Export
//=============================================


function createUI() {

    let mainMenu = new GUI();

    mainMenu.width = 300;

    mainMenu.domElement.style.userSelect = 'none';
    
    mainMenu.add(ui, 'AboutThis').name("Help/About");
    let posController=mainMenu.add(ui, 'anglePos', 0, 1, 0.01).name('Initial Position');
    let velController=mainMenu.add(ui, 'angleVel', 0, 1, 0.01).name('Initial Veloicty');
    let lengthController=mainMenu.add(ui, 'length', 0, 50, 0.01).name('Length');

    posController.onChange(function(value){
        updateGeodesicFromUI();
        });

    velController.onChange(function(value){
        updateGeodesicFromUI();
    });

    lengthController.onChange(function(value){
        updateGeodesicFromUI();
    });


    let params= mainMenu.addFolder('Parameters');
    params.add(ui, 'a', 0, 1, 0.01).name('a');
    // params.add(ui, 'b', 0, 1, 0.01).name('b');
    // params.add(ui, 'c', 0, 1, 0.01).name('c');

    // let surfSettings= mainMenu.addFolder('Surface Settings');
    // surfSettings.add(ui,'slices',0,1,0.01).name('u Resolution');
    // surfSettings.add(ui,'stacks',0,1,0.01).name('v Resolution');
    // surfSettings.add(ui,'opacity',0,1,0.01).name('Opacity');
    // surfSettings.add(ui,'reflectivity',0,1,0.01).name('Reflectivity');
    // surfSettings.addColor(ui, 'surfColor')
    //     .name('Color');
    //
    // let curveSettings= mainMenu.addFolder('Curve Settings');
    // curveSettings.add(ui,'curveRes',0,1,0.01).name('Resolution');
    // curveSettings.add(ui,'tubeWidth',0,1,0.01).name('Thickness');
    // curveSettings.addColor(ui, 'curveColor')
    //     .name('Color');
    //
    // params.close();
    // surfSettings.close();
    // curveSettings.close();
}



//=============================================
//Exports from this file
//=============================================


export {
    ui,
    createUI
};
