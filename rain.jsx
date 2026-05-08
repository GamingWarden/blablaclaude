/* eslint-disable */
// Falling binary rain canvas — runs always, fills viewport.
// Mounts itself to #rain-mount; no React props needed.

(function () {
  const mount = document.getElementById('rain-mount');
  if (!mount) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'bg-rain';
  mount.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cols = 0;
  let drops = [];
  const fontSize = 14;
  const charset = ['0','1','0','1','0','1','0','1',
    '$','>','#','*','{','}','[',']','/','\\',':',';','.',
    '0','1','0','1'];

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.floor(w / fontSize);
    drops = new Array(cols).fill(0).map(() => ({
      y: Math.random() * h,
      speed: 0.4 + Math.random() * 1.6,
      bright: Math.random() < 0.08,
    }));
  }

  function pickChar() {
    return charset[Math.floor(Math.random() * charset.length)];
  }

  let lastTime = 0;
  function tick(t) {
    const dt = Math.min(60, t - lastTime);
    lastTime = t;

    // Fade trail
    ctx.fillStyle = 'rgba(7, 11, 8, 0.10)';
    ctx.fillRect(0, 0, w, h);

    ctx.font = `${fontSize}px JetBrains Mono, ui-monospace, monospace`;
    ctx.textBaseline = 'top';

    for (let i = 0; i < cols; i++) {
      const d = drops[i];
      const x = i * fontSize;
      const ch = pickChar();

      if (d.bright && Math.random() < 0.02) {
        ctx.fillStyle = 'rgba(216, 255, 230, 0.95)';
      } else {
        ctx.fillStyle = `rgba(0, 255, 122, ${0.55 + Math.random() * 0.25})`;
      }
      ctx.fillText(ch, x, d.y);

      d.y += d.speed * (dt * 0.06);
      if (d.y > h + 20) {
        d.y = -20 - Math.random() * 200;
        d.speed = 0.4 + Math.random() * 1.6;
        d.bright = Math.random() < 0.08;
      }
    }
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
})();
