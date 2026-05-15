'use client';

import { useRef, useEffect } from 'react';

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
}

const ORBS = [
  { color: 'rgba(16, 185, 129, 0.08)', radius: 280 },
  { color: 'rgba(99, 179, 237, 0.06)', radius: 320 },
  { color: 'rgba(167, 139, 250, 0.05)', radius: 260 },
];

export default function AmbientOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let orbs: Orb[] = [];
    let animationId = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      orbs = ORBS.map((o, i) => ({
        x: w * (0.2 + (i % 2) * 0.6),
        y: h * (0.2 + Math.floor(i / 2) * 0.5),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.12,
        radius: o.radius,
        color: o.color,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      const time = Date.now() * 0.001;

      for (const o of orbs) {
        o.x += o.vx;
        o.y += o.vy;

        if (o.x < -o.radius) o.x = w + o.radius;
        if (o.x > w + o.radius) o.x = -o.radius;
        if (o.y < -o.radius) o.y = h + o.radius;
        if (o.y > h + o.radius) o.y = -o.radius;

        const breathe = 1 + Math.sin(time * 0.5 + o.phase) * 0.15;
        const r = o.radius * breathe;

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
        grad.addColorStop(0, o.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.fillRect(o.x - r, o.y - r, r * 2, r * 2);
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
