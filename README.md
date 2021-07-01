# threeJS_ParametricTemplate
A basic example of using parametric surface geometry in threeJS for making math animations

THREEJS objects are called 'meshes' and have two components: a geometry and a material
This template is set up to make creating an object described by a parametric equation as easy as possible.

The creation of the geometry and material (and background things like the scene, reflections, etc) are taken care of
in the files with names like geometry.js, materials.js scene.js etc.  To begin, you may ignore these.
To change the parametric curve or surface being drawn, you can edit the file calculations.js
This provides the shape which is used to determine the geometry.
You may replace this file with the advanced example to see more.
