// Create Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('ninja-container').appendChild(renderer.domElement);

// Add Lighting
const light = new THREE.AmbientLight(0xffffff, 1); // Soft white light
scene.add(light);

// Load GLTFLoader (Make sure it's imported in index.html)
const loader = new GLTFLoader();
loader.load('models/ninja.glb', function (gltf) {
    const ninja = gltf.scene;
    ninja.scale.set(2, 2, 2);  // Resize model if needed
    ninja.position.set(0, -1, 0); // Adjust model position
    scene.add(ninja);

    // Animation loop to rotate the model
    function animate() {
        requestAnimationFrame(animate);
        ninja.rotation.y += 0.01; // Rotate model slowly
        renderer.render(scene, camera);
    }
    animate();
}, undefined, function (error) {
    console.error('Error loading model:', error);
});

// Set Camera Position
camera.position.z = 5;

// Handle Window Resizing
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
