"use client";

import { useEffect, useRef } from "react";

export default function BirthdayFireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const birthdayStart = new Date("2026-02-19T00:00:00");
    const birthdayEnd = new Date("2026-04-20T00:00:00");
    let midnightTriggered = false;

    const now = new Date();

    if (!(now >= birthdayStart && now < birthdayEnd)) {
      return;
    }

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];

    const colors = [
      "#ffd6f6",
      "#c4a1ff",
      "#f0abfc",
      "#a78bfa",
      "#ffffff",
    ];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      color: string;
      angle: number;
      spin: number;

      constructor(x: number, y: number, dir: number) {
        this.x = x;
        this.y = y;

        this.vx = dir * (Math.random() * 1.5 + 0.5);
        this.vy = -(Math.random() * 3 + 2);

        this.alpha = 1;
        this.size = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.angle = Math.random() * Math.PI;
        this.spin = (Math.random() - 0.5) * 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        this.vy += 0.03; // gravity
        this.alpha -= 0.01;
        this.angle += this.spin;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.globalAlpha = this.alpha;

        ctx.shadowBlur = 16;
        ctx.shadowColor = this.color;

        const spikes = 5;
        const outerRadius = this.size * 2.2;
        const innerRadius = this.size;

        let rot = Math.PI / 2 * 3;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(0, -outerRadius);

        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(
            Math.cos(rot) * outerRadius,
            Math.sin(rot) * outerRadius
          );
          rot += step;

          ctx.lineTo(
            Math.cos(rot) * innerRadius,
            Math.sin(rot) * innerRadius
          );
          rot += step;
        }

        ctx.lineTo(0, -outerRadius);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        ctx.restore();
      }
    }

    function spawnParticles() {
      const h = canvas.height;

      // left
      for (let i = 0; i < 3; i++) {
        particles.push(
          new Particle(
            20 + Math.random() * 40,
            h - 40 - Math.random() * 60,
            1
          )
        );
      }

      // right
      for (let i = 0; i < 3; i++) {
        particles.push(
          new Particle(
            canvas.width - 20 - Math.random() * 40,
            h - 40 - Math.random() * 60,
            -1
          )
        );
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.update();
        p.draw();

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const interval = setInterval(() => {
      const now = new Date();

      spawnParticles();

      if (!midnightTriggered && now >= birthdayStart) {
        midnightTriggered = true;

        for (let i = 0; i < 120; i++) {
          spawnParticles();
        }
      }

    }, 180);

    function handleFirework() {
      for (let i = 0; i < 30; i++) spawnParticles();
    }

    window.addEventListener("birthday-firework", handleFirework);

    return () => {
      clearInterval(interval);
      window.removeEventListener("birthday-firework", handleFirework);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}