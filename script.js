// Show special note
function showSpecialNote() {
    const note = document.getElementById('special-note');
    note.classList.remove('hidden');
    setTimeout(() => {
        note.classList.add('show');
    }, 10);
}

// Animated hearts and sparkles canvas
const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor(type = 'heart') {
        this.type = type;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = type === 'heart' ? Math.random() * 20 + 10 : Math.random() * 5 + 3;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = ['#ff1744', '#f50057', '#d81b60', '#e91e63', '#fbc02d'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.beginPath();
        if (this.type === 'heart') {
            const x = this.x;
            const y = this.y;
            const s = this.size / 20;
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x, y - 3 * s, x - 4 * s, y - 3 * s, x - 4 * s, y);
            ctx.bezierCurveTo(x - 4 * s, y + 2 * s, x, y + 5 * s, x, y + 7 * s);
            ctx.bezierCurveTo(x, y + 5 * s, x + 4 * s, y + 2 * s, x + 4 * s, y);
            ctx.bezierCurveTo(x + 4 * s, y - 3 * s, x, y - 3 * s, x, y);
            ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16);
            ctx.fill();
        } else {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16);
            ctx.fill();
        }
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.angle) * 0.5;
        this.angle += 0.05;
        if (this.y < -this.size) {
            this.y = canvas.height + this.size;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

function initParticles() {
    for (let i = 0; i < 25; i++) {
        particles.push(new Particle(Math.random() > 0.3 ? 'heart' : 'sparkle'));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Control music playback
const music = document.getElementById('background-music');
music.volume = 0.3;
window.addEventListener('click', () => {
    if (music.paused) music.play().catch(err => console.log('Music play blocked:', err));
});

initParticles();
animate();