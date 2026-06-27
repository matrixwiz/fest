/**
 * Lightweight Confetti Engine
 * Uses requestAnimationFrame + Canvas. CPU-friendly, no libraries.
 */
(function () {
  'use strict';

  let canvas, ctx, particles = [], animId, running = false;

  function init(colors) {
    canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize, { passive: true });
    burst(colors);
  }

  function resize() {
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle(colors) {
    return {
      x: randomBetween(0, canvas.width),
      y: randomBetween(-20, -5),
      w: randomBetween(6, 12),
      h: randomBetween(4, 8),
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: randomBetween(-1.5, 1.5),
      vy: randomBetween(2, 5),
      angle: randomBetween(0, Math.PI * 2),
      spin: randomBetween(-0.1, 0.1),
      opacity: 1,
      fade: randomBetween(0.004, 0.008)
    };
  }

  function burst(colors) {
    if (running) { cancelAnimationFrame(animId); particles = []; }
    running = true;

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    for (let i = 0; i < 80; i++) particles.push(createParticle(colors));

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.opacity -= p.fade;
        p.vy += 0.05; // gravity

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      particles = particles.filter(p => p.opacity > 0 && p.y < canvas.height + 20);

      if (particles.length > 0) {
        animId = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }

    animId = requestAnimationFrame(frame);
  }

  window.ConfettiEngine = { init, burst };
})();
