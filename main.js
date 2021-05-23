import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports,min/optimized/three.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ! Basic Setup
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});
// const controls = new OrbitControls( camera, renderer.domElement );
// document.body.appendChild( renderer.domElement );
// Screen Setup
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// ! Objects
// Stars
var starGroup = new THREE.Group();
function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y - 20, z);
	starGroup.add(star);
	scene.add(starGroup);
}
Array(200).fill().forEach(addStar);

// Boxes
var boxesGroup = new THREE.Group();
function addBoxes() {
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const edges = new THREE.EdgesGeometry(geometry);
	const line = new THREE.LineSegments(
		edges,
		new THREE.LineBasicMaterial({ color: 0xffffff })
	);

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100));

	line.position.set(x, y, z);
	boxesGroup.add(line);
	scene.add(boxesGroup);
}
Array(200).fill().forEach(addBoxes);

// Text
var mainText;
const loader = new THREE.FontLoader();
loader.load(
	'https://raw.githubusercontent.com/Kendy205/tomaskebrle/main/Inconsolata_Regular.json',
	function (font) {
		const color = 0xffffff;
		const matLite = new THREE.MeshBasicMaterial({
			color: color,
			transparent: true,
			side: THREE.DoubleSide,
		});
		const message = 'Tomáš Kebrle';
		const shapes = font.generateShapes(message, 1);
		const geometry = new THREE.ShapeGeometry(shapes);
		geometry.computeBoundingBox();
		const xMid =
			-0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
		geometry.translate(xMid, 0, 0);
		mainText = new THREE.Mesh(geometry, matLite);
		scene.add(mainText);
		shapes.push.apply(shapes);
		mainText.position.z = -15;
	}
);

//! Informace
const profileImg = new THREE.TextureLoader().load('tomas-kebrle.jpeg');
const geometry = new THREE.PlaneGeometry(3, 3, 3);
const materialProfile = new THREE.MeshBasicMaterial({
	map: profileImg,
	side: THREE.DoubleSide,
});
const profile = new THREE.Mesh(geometry, materialProfile);
profile.position.x = 3;
profile.position.z = 1;
profile.position.y = -2;
scene.add(profile);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
	new THREE.SphereGeometry(3, 25, 25),
	new THREE.MeshStandardMaterial({
		map: moonTexture,
		normalMap: normalTexture,
	})
);

scene.add(moon);

moon.position.z = 12;
moon.position.setX(-5);

// Torus
const torusGeometry = new THREE.TorusGeometry(4, 1.6, 32, 100);
const material = new THREE.MeshStandardMaterial({
	color: 0xffffff,
	wireframe: true,
});
const torus = new THREE.Mesh(torusGeometry, material);
torus.position.z = 45;
torus.position.x = 5;

// Torus knot
const torusKnotGeometry = new THREE.TorusKnotGeometry(2, 0.8, 128, 16);
const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
scene.add(torusKnot);

torusKnot.position.z = 65;
torusKnot.position.x = -3;

scene.add(torus);
// ! Background image
const backgroundImage = new THREE.TextureLoader().load('nord0.png');
scene.background = 0x000000;

async function init() {
	// ! Scrolling
	// mainText.position.z = -15;
	function moveCamera() {
		const t = document.body.getBoundingClientRect().top;
		//scene.add(window.mainText);
		console.log(t);
		camera.position.z = t * -0.01;
		camera.position.x = t * -0.0002;
		camera.position.y = t * -0.0002;

		profile.rotation.y += t * 0.00001;

		if (t < -1560) {
			profile.visible = false;
			mainText.visible = false;
		}
		if (t > -1560) {
			profile.visible = true;
			mainText.visible = true;
		}
	}
	document.body.onscroll = moveCamera;

	function animate() {
		requestAnimationFrame(animate);
		starGroup.rotation.y += 0.001;
		starGroup.rotation.x += 0.001;
		starGroup.rotation.z += 0.001;
		moon.rotation.z += 0.01;
		moon.rotation.x += 0.001;
		moon.rotation.y += 0.001;
		torus.rotation.z += 0.01;
		torus.rotation.x += 0.002;
		torus.rotation.y += 0.002;
		torusKnot.rotation.z += 0.01;
		torusKnot.rotation.x += 0.002;
		torusKnot.rotation.y += 0.002;
		renderer.render(scene, camera);
	}
	animate();
	moveCamera();
}
async function sleeper() {
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	await sleep(300000);
}
sleeper();
init();
