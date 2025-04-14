// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Neural Network Animation
class NeuralNetwork {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.nodeCount = 50;
        this.connectionCount = 100;
        
        this.init();
    }
    
    init() {
        this.container.appendChild(this.canvas);
        this.resize();
        this.createNodes();
        this.createConnections();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    createNodes() {
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 2,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }
    
    createConnections() {
        for (let i = 0; i < this.connectionCount; i++) {
            this.connections.push({
                node1: Math.floor(Math.random() * this.nodeCount),
                node2: Math.floor(Math.random() * this.nodeCount),
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update nodes
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
        });
        
        // Draw connections
        this.connections.forEach(conn => {
            const node1 = this.nodes[conn.node1];
            const node2 = this.nodes[conn.node2];
            
            const dx = node1.x - node2.x;
            const dy = node1.y - node2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(0, 243, 255, ${conn.opacity})`;
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(node1.x, node1.y);
                this.ctx.lineTo(node2.x, node2.y);
                this.ctx.stroke();
            }
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.fillStyle = '#00f3ff';
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 3D Brain Model
class BrainModel {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.init();
    }
    
    init() {
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.container.appendChild(this.renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x00f3ff, 0.5);
        this.scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x00f3ff, 1);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);
        
        // Brain geometry
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00f3ff,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        
        this.brain = new THREE.Mesh(geometry, material);
        this.scene.add(this.brain);
        
        this.camera.position.z = 15;
        
        this.animate();
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    onWindowResize() {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.brain.rotation.x += 0.005;
        this.brain.rotation.y += 0.005;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Scroll animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1
    });
});

gsap.utils.toArray('.feature-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

// Typing effect
const typingText = document.querySelector('.typing-text');
const text = typingText.textContent;
typingText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    // Neural Network
    const neuralNetwork = new NeuralNetwork(document.getElementById('neural-network'));
    
    // 3D Brain
    const brainModel = new BrainModel(document.getElementById('brain-3d'));
    
    // Start typing effect
    typeWriter();
    
    // Scroll to top button
    const scrollTop = document.querySelector('.scroll-top');
    scrollTop.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: 'power2.inOut'
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .join-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button.querySelector('.button-glow'), {
                opacity: 1,
                duration: 0.3
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button.querySelector('.button-glow'), {
                opacity: 0,
                duration: 0.3
            });
        });
    });

    // Smooth scrolling for View My Work button
    document.querySelector('.view-work-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const projectsSection = document.getElementById('projects');
        
        // Add a slight delay before scrolling to allow for the click animation
        setTimeout(() => {
            window.scrollTo({
                top: projectsSection.offsetTop - 100, // Offset to account for fixed header
                behavior: 'smooth'
            });
        }, 300);
    });

    // Add scroll reveal animation for projects section
    gsap.from("#projects", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top center",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    // Add hover animation for View My Work button
    const viewWorkBtn = document.querySelector('.view-work-btn');
    viewWorkBtn.addEventListener('mouseenter', () => {
        gsap.to(viewWorkBtn, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    viewWorkBtn.addEventListener('mouseleave', () => {
        gsap.to(viewWorkBtn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}); 