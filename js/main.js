const MARS_g = 3.7; // Acceleration due to gravity near Mars' surface
const LANDER_SCALE = 1.0/150.0; // At this scale 1 unit is approx. equal to 1 meter
const LANDER_MASS = 290 + 64; // 290 kg for Lander itself and 64 kg of propellant.
const TIME_SCALE = 0.01;

var clock = new THREE.Clock()
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

camera.position.y = -10;
camera.position.z = 2;
camera.lookAt(0, 0, 0);

var light = new THREE.AmbientLight(0x404040, 10); // soft white light
scene.add(light);

var lander;
var landerVelocity = new THREE.Vector3()

var gravity = new THREE.Vector3(0, -MARS_g, 0);

function addForces(t) {
	landerVelocity.y += gravity.y * t*TIME_SCALE;
}

function updatePosition() {
	lander.position.x += landerVelocity.x;
	lander.position.y += landerVelocity.y;
	lander.position.z += landerVelocity.z;
}

function mainLoop() {
	t = clock.getDelta();

	addForces(t);
	updatePosition();

	camera.lookAt(lander.position.x, lander.position.y, lander.position.z);

	requestAnimationFrame(mainLoop);
	renderer.render(scene, camera);
}

function startMainLoop() {
	clock.getDelta();
	mainLoop();
}

var loader = new THREE.GLTFLoader();
loader.load('models/mars-polar-lander/scene.gltf', function (gltf) {
	lander = gltf.scene;
	scene.add(lander);
	lander.scale.x = LANDER_SCALE;
	lander.scale.y = LANDER_SCALE;
	lander.scale.z = LANDER_SCALE;
	startMainLoop();
}, undefined, function (error) {
	console.error(error);
});

