const MARS_g = 3.7;
const LANDER_SCALE = 1.0/150.0;

var clock = new THREE.Clock()
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(0, 0, 0);

var light = new THREE.AmbientLight(0x404040, 10); // soft white light
scene.add(light);

var loader = new THREE.GLTFLoader();
var lander;
var landerMass = 290 + 64;
var landerVector = new THREE.Vector3()

function main_loop() {
	t = clock.getDelta();

	landerVector.y -= MARS_g * landerMass * 0.00001;
	lander.position.y += landerVector.y;

	camera.lookAt(lander.position.x, lander.position.y, lander.position.z);

	requestAnimationFrame(main_loop);
	renderer.render(scene, camera);
}

function start_main_loop() {
	clock.getDelta();
	main_loop();
}

loader.load('models/mars-polar-lander/scene.gltf', function (gltf) {
	lander = gltf.scene;
	scene.add(lander);
	lander.scale.x = LANDER_SCALE;
	lander.scale.y = LANDER_SCALE;
	lander.scale.z = LANDER_SCALE;
	start_main_loop();
}, undefined, function (error) {
	console.error(error);
});


