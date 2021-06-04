//=============================================
//Imports from lib/
//=============================================
import * as THREE from './libs/three.module.js';

        import {OrbitControls}
        from './libs/OrbitControls.js';



//=============================================
//Imports from My Code
//=============================================

        import {
            ui,
            createUI
        } from './ui.js';


        import {
            scene,
            camera,
            createScene,
            updateScene,
        } from './scene.js';




//=============================================
//Variables Defined in this File
//=============================================

        let controls, container;
        let renderer;

        let pmremGenerator;










//=============================================
//Functions Needed for Init and Animate
//=============================================




        function createMainRenderer() {
            // renderer
            renderer = new THREE.WebGLRenderer({
                antialias: true,
    
            });
            

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            

//            // set the gamma correction so that output colors look
            // correct on our screens
            renderer.physicallyCorrectLights = true;
            // tone mapping
            renderer.toneMapping = THREE.NoToneMapping;
            renderer.outputEncoding =THREE.GammaEncoding;


            //adding shadow capabilities to the renderer
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;


            // add the output of the renderer to the html element
            container.appendChild(renderer.domElement);


            //make the pmrem generator if we need it
            pmremGenerator = new THREE.PMREMGenerator(renderer);
            pmremGenerator.compileCubemapShader();


        }






        function createControls() {
            // controls
            controls = new OrbitControls(camera, container);
            controls.addEventListener('change', render);
            controls.minDistance = 1;
            controls.maxDistance = 50;
            controls.enablePan = true;
        }





        function onWindowResize() {

            var width = window.innerWidth;
            var height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        
        }



        function render() {

            renderer.render(scene, camera);
        }









//=============================================
//The Main Functions: Init and Animate
//=============================================



       async function init() {

            // Get a reference to the container element that will hold our scene
            container = document.querySelector('#scene-container');
           
            createUI();

            //renderer
            createMainRenderer();
            
           //from scene file.
            createScene();

            createControls();

            // listener
            window.addEventListener('resize', onWindowResize, false);

        }




        function animate() {

            requestAnimationFrame(animate);

            updateScene();
            render();

        }






//=============================================
//Actually Running the Code
//=============================================



        init();
        animate();






//=============================================
//Exports from this file
//=============================================


        export {
            pmremGenerator
        };
