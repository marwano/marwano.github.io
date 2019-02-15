
function getCamera() {
	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);
	camera.up.set(0, 0, 1);
	camera.position.set(0, -10, 10);
	camera.add( new THREE.PointLight(0xffffff, 0.8));
	return camera;
}


function getGrid() {
	var grid = new THREE.GridHelper(25, 50, 0xffffff, 0x555555);
	grid.rotateOnAxis(new THREE.Vector3(1, 0, 0 ), 90 * (Math.PI/180));
	return grid;
}


function getScene(camera) {
	var scene = new THREE.Scene();
	scene.add(new THREE.AmbientLight(0x999999));
	scene.add(camera);
	scene.add(getGrid());
	return scene;
}


function getRenderer() {
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor(0x999999);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	return renderer;
}


function addGeometryToScene(geometry, scene, camera, renderer) {
	var material = new THREE.MeshPhongMaterial({color: 0x0e2045, specular: 0x111111, shininess: 200});
	var mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 6, 0);
	mesh.scale.set(.2, .2, .2);

	scene.add(mesh);
	renderer.render(scene, camera);
}


function loadModel(path, scene, camera, renderer) {
	var loader = new THREE.STLLoader();
	var on_load = function (geometry) {addGeometryToScene(geometry, scene, camera, renderer)};
	loader.load(path, on_load);
}


function addControls(scene, camera, renderer) {
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	var on_change = function () {renderer.render(scene, camera)};
	controls.addEventListener('change', on_change);
	controls.target.set(0, 1.2, 2);
	controls.update();
}


function init() {
	var camera = getCamera();
	var scene = getScene(camera);
	var renderer = getRenderer();

	document.body.appendChild(renderer.domElement);
	loadModel('dog_wing_octo.stl', scene, camera, renderer);
	addControls(scene, camera, renderer);
}


init();
