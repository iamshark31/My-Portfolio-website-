// Three.js background animation
let scene, camera, renderer, particles;

// Initialize Three.js scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-animation'),
        antialias: true,
        alpha: true
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 30;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
        if(i % 3 === 0) {
            scaleArray[i/3] = Math.random();
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: '#ffffff',
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    // Create particle system
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0005;
    
    // Mouse interaction
    if(mouseX && mouseY) {
        particles.rotation.x += (mouseY * 0.00001);
        particles.rotation.y += (mouseX * 0.00001);
    }
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mouse movement tracking
let mouseX = 0;
let mouseY = 0;

function onMouseMove(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
}

// Event listeners
window.addEventListener('resize', onWindowResize, false);
document.addEventListener('mousemove', onMouseMove);

// Initialize and start animation
init();
animate(); 