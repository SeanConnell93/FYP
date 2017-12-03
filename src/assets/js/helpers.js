

export function loadPlayer(url, namespace){

	let loader = new THREE.ObjectLoader();

	loader.load(url,

	    obj => {

	    	obj.receiveShadow = true;
			obj.castShadow = true;

			console.log(obj);
	        namespace.scene.add( obj );

	    },

	);

}



export function calcDimensions(obj) {

	let objDimensions = new THREE.Box3();
	objDimensions.setFromObject( obj );
	let objHeight = objDimensions.max.y - objDimensions.min.y,
		objWidth = objDimensions.max.x - objDimensions.min.x,
		objDept = objDimensions.max.z - objDimensions.min.z;

	return obj = {
		y: objHeight,
		x: objWidth,
		z: objDept
	};


}

