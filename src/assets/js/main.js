
import * as THREE from 'three';

export var scene;
export var camera;
export var renderer;

export const start = function(callback){

	// make scene
	scene = new THREE.Scene();



	// add camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3000 );
	camera.position.set(0,0,10);

	// make render and add to page
	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.setClearColor(0x515151);
	renderer.setSize( window.innerWidth, window.innerHeight );

	let app = document.getElementById('app');
	app.appendChild(renderer.domElement);


	let ambientLight = new THREE.AmbientLight( 0xfffbd1, 2 );
	scene.add( ambientLight );


	let light = new THREE.PointLight( 0xffffff, 0, 0 );
	light.position.set(0,2,10);
	scene.add( light );


	callback();
	

};











