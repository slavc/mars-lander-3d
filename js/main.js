const MARS_g = 3.7; // Acceleration due to gravity near Mars' surface.
const LANDER_SCALE = 1.0/150.0; // At this scale 1 unit of length is approx. equal to 1 meter.
const LANDER_MASS = 290 + 64; // 290 kg for Lander itself and 64 kg of propellant.
const TIME_SCALE = 0.1;
const CLIP_DISTANCE = 1000;

function initMarsSurface() {
	var geometry = new THREE.PlaneGeometry(CLIP_DISTANCE + 100, CLIP_DISTANCE + 100, 1, 1);
	var texture = new THREE.TextureLoader().load('textures/brown-and-black-crater-87655.jpg');
	var material = new THREE.MeshStandardMaterial({color: 0xffdddd, map: texture});
	var plane = new THREE.Mesh(geometry, material);
	return plane;
}

var clock = new THREE.Clock()
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, CLIP_DISTANCE);
var surface = initMarsSurface();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

var hemisphereLight = new THREE.HemisphereLight(0xffeeee, 0x666655, 2.0);
scene.add(hemisphereLight);

var directionalLight = new THREE.DirectionalLight(0xffeeee, 0.5);
scene.add(directionalLight);


var ambientLight = new THREE.AmbientLight(0x404040, 3.0); // soft white light
scene.add(ambientLight);

scene.add(surface);

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

function setInitialPositions() {
	directionalLight.position.x = -(2*CLIP_DISTANCE);
	directionalLight.position.z = -(2*CLIP_DISTANCE);
	directionalLight.position.y = 4*CLIP_DISTANCE;

	lander.position.y = 500;

	camera.position.y = lander.position.y - 10;
	camera.position.z = 3;

	surface.rotateX(- Math.PI / 2.0);
}

function startMainLoop() {
	setInitialPositions();
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

