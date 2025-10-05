// Starfield animation
const starfieldCanvas = document.getElementById('starfield');
const starfieldCtx = starfieldCanvas.getContext('2d');

function resizeStarfield() {
    starfieldCanvas.width = window.innerWidth;
    starfieldCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeStarfield);
resizeStarfield();

const stars = [];
const numStars = 300;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * starfieldCanvas.width,
        y: Math.random() * starfieldCanvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.1
    });
}

function drawStars() {
    starfieldCtx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);
    starfieldCtx.fillStyle = '#e0e0e0';
    
    stars.forEach(star => {
        starfieldCtx.beginPath();
        starfieldCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        starfieldCtx.fill();
    });
}

function updateStars() {
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > starfieldCanvas.height) {
            star.y = 0;
            star.x = Math.random() * starfieldCanvas.width;
        }
    });
}

// Mouse trail animation
const trailCanvas = document.getElementById('mouse-trail');
const trailCtx = trailCanvas.getContext('2d');

function resizeTrail() {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeTrail);
resizeTrail();

const particles = [];
const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle());
    }
});

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        trailCtx.fillStyle = this.color;
        trailCtx.beginPath();
        trailCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        trailCtx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    // starfieldCtx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    drawStars();
    updateStars();
    handleParticles();
    requestAnimationFrame(animate);
}

animate();