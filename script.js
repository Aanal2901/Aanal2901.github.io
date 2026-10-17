// Section menu: close on outside click or Escape
(() => {
  const menu = document.querySelector('.menu');
  if (!menu) return;
  document.addEventListener('click', e => { if (!menu.contains(e.target)) menu.open = false; });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
  });
})();

// Homepage hero: event-camera rendering of the name
(() => {
  const box = document.getElementById('sensor');
  if (!box) return;
  const cv = document.getElementById('events');
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NAME = 'Aanal Sonara';
  let W, H, dpr, edges = [], colors = {};
  let vx = 1, vy = 0.35, t = 0, lastMove = 0;

  function readColors() {
    const s = getComputedStyle(document.documentElement);
    colors.bg = s.getPropertyValue('--bg').trim();
    colors.on = s.getPropertyValue('--on').trim();
    colors.off = s.getPropertyValue('--off').trim();
  }

  // Render the name off-screen, keep pixels on its outline with their gradient direction.
  function buildEdges() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = box.getBoundingClientRect();
    W = Math.round(r.width * dpr); H = Math.round(r.height * dpr);
    cv.width = W; cv.height = H;
    const h1 = box.querySelector('h1');
    const fs = parseFloat(getComputedStyle(h1).fontSize) * dpr;
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const o = off.getContext('2d');
    o.font = `800 ${fs}px "Schibsted Grotesk", system-ui, sans-serif`;
    if (o.letterSpacing !== undefined) o.letterSpacing = `${-0.03 * fs}px`;
    o.textBaseline = 'middle';
    o.fillStyle = '#000';
    o.fillText(NAME, 0, H / 2);
    const a = o.getImageData(0, 0, W, H).data;
    const A = (x, y) => a[(y * W + x) * 4 + 3];
    edges = [];
    const step = dpr > 1 ? 2 : 1;
    for (let y = 1; y < H - 1; y += step) {
      for (let x = 1; x < W - 1; x += step) {
        const gx = A(x + 1, y) - A(x - 1, y);
        const gy = A(x, y + 1) - A(x, y - 1);
        const m = Math.hypot(gx, gy);
        if (m > 60) edges.push(x, y, gx / m, gy / m);
      }
    }
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, W, H);
  }

  // One sensor tick: edges fire in proportion to how much they face the motion.
  function tick(n, fade) {
    if (fade) { ctx.globalAlpha = fade; ctx.fillStyle = colors.bg; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    const sz = Math.max(1.5, dpr * 1.6);
    const count = edges.length / 4;
    if (!count) return;
    for (let i = 0; i < n; i++) {
      const k = (Math.random() * count | 0) * 4;
      const d = edges[k + 2] * vx + edges[k + 3] * vy;
      if (Math.random() > Math.abs(d)) continue;
      ctx.fillStyle = d > 0 ? colors.on : colors.off;
      ctx.fillRect(edges[k] + (Math.random() - 0.5) * 2 * dpr, edges[k + 1] + (Math.random() - 0.5) * 2 * dpr, sz, sz);
    }
    // sparse background noise, as on a real sensor
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = Math.random() < 0.5 ? colors.on : colors.off;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(Math.random() * W, Math.random() * H, sz, sz);
      ctx.globalAlpha = 1;
    }
  }

  function loop(now) {
    // drift slowly unless the visitor is steering
    if (now - lastMove > 1200) {
      t += 0.004;
      vx += (Math.cos(t) - vx) * 0.02;
      vy += (Math.sin(t * 1.3) * 0.8 - vy) * 0.02;
    }
    tick(2600, 0.14);
    requestAnimationFrame(loop);
  }

  function start() {
    readColors();
    buildEdges();
    if (!edges.length) return;              // leave the plain heading visible
    document.documentElement.classList.add('js-live');
    if (reduce) { for (let i = 0; i < 4; i++) tick(9000, 0); return; }
    requestAnimationFrame(loop);
  }

  let px = null, py = null;
  window.addEventListener('pointermove', e => {
    if (px !== null) {
      const dx = e.clientX - px, dy = e.clientY - py, m = Math.hypot(dx, dy);
      if (m > 1) { vx = dx / m; vy = dy / m; lastMove = performance.now(); }
    }
    px = e.clientX; py = e.clientY;
  }, { passive: true });

  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { buildEdges(); if (reduce) for (let i = 0; i < 4; i++) tick(9000, 0); }, 150); });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { readColors(); buildEdges(); });

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(start);
})();
