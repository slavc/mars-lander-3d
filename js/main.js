var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

camera.position.y = 200;
camera.position.z = 300;
camera.lookAt(0, 0, 0);

var light = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
scene.add( light );

var loader = new THREE.GLTFLoader();
var lander;
loader.load('models/mars-polar-lander/scene.gltf', function (gltf) {
	lander = gltf.scene;
	scene.add(lander);
}, undefined, function ( error ) {
	console.error( error );
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
