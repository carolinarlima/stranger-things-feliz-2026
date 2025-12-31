// Configura a data para o horário do último episódio
const targetDate = new Date("December 31, 2025 22:00:00").getTime();

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Cálculo de horas, minutos e segundos
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Formatação com zeros à esquerda
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');

    document.getElementById("countdown").innerHTML = `${h}:${m}:${s}`;

    // Ação ao chegar em Zero
    if (distance < 0) {
        clearInterval(timerInterval);
        triggerUpsideDown();
    }
}, 1000);

function triggerUpsideDown() {
    document.getElementById("countdown-container").classList.add("hidden");
    document.getElementById("finish-container").classList.remove("hidden");
    document.getElementById("body").classList.add("upside-down-bg");

    const canvas = document.getElementById("particles");
    canvas.style.display = "block";
    startAshEffect(canvas);
}

function startAshEffect(canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 0.5,
            d: Math.random() * 0.5 + 0.3, // Velocidade de queda
            o: Math.random() * 0.5 // Opacidade
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    function update() {
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.y += p.d;
            p.x += Math.sin(p.y / 20) * 0.5; // Balanço horizontal
            if (p.y > canvas.height) {
                particles[i] = { x: Math.random() * canvas.width, y: -10, r: p.r, d: p.d };
            }
        }
    }

    setInterval(draw, 30);
}