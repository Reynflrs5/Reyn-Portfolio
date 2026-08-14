import { useEffect, useRef } from "react";
import "./IceBackground.css";

/* ─────────────────────────────────────────────
   Particle system — vanilla canvas, no libraries
   Now with: drifting frost dust, rotating crystal
   shards, and periodic "diamond flare" bling bursts
───────────────────────────────────────────── */
function useIceParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let animId;
    let width, height;

    const DUST_COUNT = 45;
    const SHARD_COUNT = 10;
    const FLARE_COUNT = 5; // big bling sparkle points

    const dust = [];
    const shards = [];
    const flares = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── small drifting frost dust (fine sparkle) ── */
    function makeDust() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.5,
        opacity: Math.random() * 0.5 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.4 + 0.1),
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      };
    }

    /* ── rotating crystal shards (bigger, more visible) ── */
    function makeShard() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 7 + 5,
        opacity: Math.random() * 0.35 + 0.15,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: -(Math.random() * 0.22 + 0.05),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
      };
    }

    /* ── big bling "diamond flare" bursts — sparkle cross flashes ── */
    function makeFlare() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        maxSize: Math.random() * 14 + 12,
        life: 0,
        duration: Math.random() * 140 + 100, // frames
        delay: Math.random() * 400,          // frames before it starts
        elapsed: 0,
      };
    }

    for (let i = 0; i < DUST_COUNT; i++) dust.push(makeDust());
    for (let i = 0; i < SHARD_COUNT; i++) shards.push(makeShard());
    for (let i = 0; i < FLARE_COUNT; i++) flares.push(makeFlare());

    function drawShard(s) {
      const shimmer = Math.sin(s.twinkle) * 0.35 + 0.65;
      const alpha = s.opacity * shimmer;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.globalAlpha = alpha;

      // diamond / crystal shard shape with a bright core + soft edge
      const grad = ctx.createLinearGradient(-s.size, -s.size, s.size, s.size);
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(0.5, "rgba(210,224,245,0.65)");
      grad.addColorStop(1, "rgba(180,200,230,0.15)");
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, -s.size);
      ctx.lineTo(s.size * 0.45, 0);
      ctx.lineTo(0, s.size);
      ctx.lineTo(-s.size * 0.45, 0);
      ctx.closePath();
      ctx.fill();

      // thin bright outline for that "cut glass" glint
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    }

    function drawFlare(f) {
      // 4-point sparkle "bling" flash — grows then fades
      const t = f.elapsed / f.duration;
      if (t < 0 || t > 1) return;
      const eased = Math.sin(t * Math.PI); // 0 -> 1 -> 0
      const size = f.maxSize * eased;
      const alpha = eased;

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.globalAlpha = alpha;

      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.4);
      glow.addColorStop(0, "rgba(255,255,255,0.9)");
      glow.addColorStop(0.35, "rgba(220,232,250,0.35)");
      glow.addColorStop(1, "rgba(220,232,250,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, size * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // 4-point star spike
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(-size * 0.6, -size * 0.6);
      ctx.lineTo(size * 0.6, size * 0.6);
      ctx.moveTo(-size * 0.6, size * 0.6);
      ctx.lineTo(size * 0.6, -size * 0.6);
      ctx.stroke();

      ctx.restore();
    }

    function loop() {
      ctx.clearRect(0, 0, width, height);

      // fine dust
      for (const p of dust) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.twinkle += p.twinkleSpeed;

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const shimmer = Math.sin(p.twinkle) * 0.4 + 0.6;
        const alpha = p.opacity * shimmer;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 236, 248, ${alpha})`;
        ctx.fill();
      }

      // crystal shards
      for (const s of shards) {
        s.x += s.speedX;
        s.y += s.speedY;
        s.rotation += s.rotationSpeed;
        s.twinkle += s.twinkleSpeed;

        if (s.y < -20) { s.y = height + 20; s.x = Math.random() * width; }
        if (s.x < -20) s.x = width + 20;
        if (s.x > width + 20) s.x = -20;

        drawShard(s);
      }

      // bling flares
      for (const f of flares) {
        if (f.delay > 0) {
          f.delay -= 1;
          continue;
        }
        f.elapsed += 1;
        drawFlare(f);
        if (f.elapsed >= f.duration) {
          // respawn elsewhere after a random pause
          f.x = Math.random() * width;
          f.y = Math.random() * height;
          f.maxSize = Math.random() * 14 + 12;
          f.duration = Math.random() * 140 + 100;
          f.elapsed = 0;
          f.delay = Math.random() * 300 + 60;
        }
      }

      animId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function IceBackground() {
  const canvasRef = useRef(null);
  useIceParticles(canvasRef);

  return (
    <div className="ice-bg" aria-hidden="true">
      {/* Particle canvas — dust, shards, bling flares */}
      <canvas ref={canvasRef} className="ice-canvas" />

      {/* Radial cold glow accents */}
      <div className="ice-glow ice-glow--tl" />
      <div className="ice-glow ice-glow--br" />
      <div className="ice-glow ice-glow--center" />

      {/* Shimmer sweep layers */}
      <div className="ice-shimmer ice-shimmer--1" />
      <div className="ice-shimmer ice-shimmer--2" />
      <div className="ice-shimmer ice-shimmer--3" />

      {/* Crystalline texture overlay */}
      <div className="ice-crystal-texture" />

      {/* Vignette to keep edges deep black, focus center */}
      <div className="ice-vignette" />
    </div>
  );
}