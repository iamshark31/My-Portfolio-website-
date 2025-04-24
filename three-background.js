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
    const particlesCount = 5000; // Increased particle count
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100; // Increased spread
        if(i % 3 === 0) {
            scaleArray[i/3] = Math.random() * 2; // Increased size variation
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create material with improved visuals
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2, // Increased base size
        color: '#ffffff',
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending // Added for better visual effect
    });
    
    // Create particle system
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Smoother rotation
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0007;
    
    // Enhanced mouse interaction
    if(mouseX && mouseY) {
        const targetRotationX = mouseY * 0.00005;
        const targetRotationY = mouseX * 0.00005;
        
        particles.rotation.x += (targetRotationX - particles.rotation.x) * 0.05;
        particles.rotation.y += (targetRotationY - particles.rotation.y) * 0.05;
    }
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mouse movement tracking with smoothing
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

function onMouseMove(event) {
    targetMouseX = event.clientX - window.innerWidth / 2;
    targetMouseY = event.clientY - window.innerHeight / 2;
}

// Smooth mouse movement
function updateMousePosition() {
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;
}

// Event listeners
window.addEventListener('resize', onWindowResize, false);
document.addEventListener('mousemove', onMouseMove);

// Initialize and start animation
init();
animate(); 