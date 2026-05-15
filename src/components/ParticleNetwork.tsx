'use client';

import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseA: number;
  da: number;
}

const MAX_PARTICLES = 48;
const CONNECTION_DIST = 100;
const MAX_CONNECTIONS = 2;

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId = 0;
    let W = 0;
    let H = 0;

    function resize() {
      if (!canvas || !ctx) return;
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(MAX_PARTICLES, Math.floor((W * H) / 25000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
        baseA: Math.random() * 0.16 + 0.06,
        da: (Math.random() - 0.5) * 0.001,
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.baseA += p.da;
        p.baseA = Math.max(0.04, Math.min(0.22, p.baseA));

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.baseA})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.10;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            connections++;
            if (connections >= MAX_CONNECTIONS) break;
          }
        }
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
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 1 }}
    />
  );
}
