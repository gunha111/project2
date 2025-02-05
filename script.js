// Initialize Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('ninja-container').appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load Ninja Model
const loader = new THREE.GLTFLoader();
loader.load('models/ninja.glb', function (gltf) {
    const ninja = gltf.scene;
    ninja.scale.set(2, 2, 2);
    scene.add(ninja);

    // Animate Ninja Model
    function animate() {
        requestAnimationFrame(animate);
        ninja.rotation.y += 0.01; // Rotate Ninja
        renderer.render(scene, camera);
    }
    animate();
}, undefined, function (error) {
    console.error('Error loading model:', error);
});

// Camera Position
camera.position.z = 5;

// Resize Handling
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
