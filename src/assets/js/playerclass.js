

import * as THREE from 'three';
import {calcSize} from './helpers.js';
import {scene} from './main.js';


export class Player {

	constructor(url, namespace){

		this.loadPlayer(url, namespace);

		this.playerControls();


		this.character;
		// character speed 
		this.speed = 0.1;
		this.jumpSpeed = 0.5;
		this.jumpHeight = 3;
		this.isjumping = false;
		this.onGround = true;
		this.canMove = true;

		this.faceingRight = false;
		this.faceingLeft = false;

		this.faceRight = 90 * Math.PI / 180;
		this.faceLeft = -90 * Math.PI / 180;

		this.turnSpeed = 20 * Math.PI / 180;

		// Collider settings
		this.height;
		this.width;

		this.playerCollider;
		this.animation;

	}

	update(){

		
		this.initJump();
		this.initGravity();
		this.colliderUpdate();

		

		
	}


	loadPlayer(url, namespace){

		let loader = new THREE.ObjectLoader();


		loader.load(url,

		    obj => {

		    	obj.receiveShadow = true;
				obj.castShadow = true; 

				this.character = obj;

				this.character.rotation.y = this.faceRight;

				this.addCollider(obj);

				let manager = new THREE.LoadingManager();
				let textureLoader = new THREE.TextureLoader( manager );
				let texture = textureLoader.load( './src/assets/models/color-platte.jpg' );

				obj.traverse( child => {
					if ( child instanceof THREE.Mesh ) child.material.map = texture;
				} );

		        namespace.scene.add( obj );

		        this.animation = new THREE.MorphAnimation(obj);
		        this.animation.play();

		        console.log(this.character);

		    },

		);



	}


	addCollider(player) {

		let collider = calcSize(player);

		let geometry = new THREE.BoxGeometry( collider.x, collider.y, collider.z );
		let material = new THREE.MeshBasicMaterial( {
			color: 0x00ff00,
			wireframe: true,
			opacity: 0.5,
			transparent: true
		} );
		let cube = new THREE.Mesh( geometry, material );

		this.playerCollider = cube;

		this.playerCollider.position.x = this.character.position.x;

		scene.add( cube );

	}


	colliderUpdate(){

		if ( this.playerCollider ) {
			this.playerCollider.position.x = this.character.position.x;
			this.playerCollider.position.y = this.character.position.y;
		}

	}


	playerControls(){

		document.addEventListener('keydown', (e) => {

			switch (e.keyCode) {

				// D
				case 68:
					this.moveRight();
				break;

				// A
				case 65:
					this.moveLeft();
				break;

			} // end switch

		});

		document.addEventListener('keypress', (e) => {

			switch (e.keyCode) {

				// spacebar
				case 32:
					this.isjumping = true;
					this.onGround = false;
				break;

			}


		});



	}




	moveRight() {
		this.character.position.x += this.speed;


		if ( !this.faceingRight ) {

			
			this.faceingLeft = false;
			this.faceingRight = true;

			let turn = setInterval(() => {

				if ( this.faceRight > this.character.rotation.y  ) {
					this.character.rotation.y += this.turnSpeed;
				} else {
					clearInterval(turn);
				}

			}, 35);
	
		}

	}

	moveLeft() {
		
		this.character.position.x -= this.speed;

		if ( !this.faceingLeft ) {
			
			this.faceingLeft = true;
			this.faceingRight = false;

			let turn = setInterval(() => {

				if ( this.faceLeft < this.character.rotation.y ) {
					this.character.rotation.y -= this.turnSpeed;
				} else {
					clearInterval(turn);
				}

			}, 35);
	
		}

	}



	initJump() {

		if ( this.isjumping ) {

			if ( this.character.position.y < this.jumpHeight ) {
				this.character.position.y += this.jumpSpeed;
			} else {
				this.isjumping = false;
				this.onGround = false;
			}

		} 

	}


	initGravity() {

		if ( !this.isjumping && !this.onGround ) {

			this.character.position.y -= this.jumpSpeed;

		}

	}







}