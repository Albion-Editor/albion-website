"use client";

import React, { useEffect, useRef } from "react";

export function SignalGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Guard against reduced-motion and saveData
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const isSaveData = Boolean(connection?.saveData);

    if (prefersReducedMotion || isSaveData) {
      // Keep static CSS grid only
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let isTabActive = true;
    let W = 0;
    let H = 0;

    const GRID_SIZE = 48;
    const MAX_PULSES = 36;
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    // Frame timing safeguard: stop if avg frame duration > 28ms over 30 frames
    const frameTimes: number[] = [];
    let lastRenderTime = 0;

    interface Pulse {
      x: number;
      y: number;
      dx: number;
      dy: number;
      len: number;
      speed: number;
      color: string;
      life: number;
      maxLife: number;
    }

    let pulses: Pulse[] = [];

    function resize() {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = container.offsetWidth;
      H = container.offsetHeight;

      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx!.scale(dpr, dpr);
    }

    function createPulse(): Pulse {
      // Pick a random grid intersection
      const numCols = Math.floor(W / GRID_SIZE) || 1;
      const numRows = Math.floor(H / GRID_SIZE) || 1;
      const col = Math.floor(Math.random() * numCols);
      const row = Math.floor(Math.random() * numRows);

      const isHorizontal = Math.random() > 0.5;
      const dir = Math.random() > 0.5 ? 1 : -1;
      const isGold = Math.random() < 0.12; // occasional gold pulse for premium call

      return {
        x: col * GRID_SIZE,
        y: row * GRID_SIZE,
        dx: isHorizontal ? dir * (Math.random() * 0.8 + 1.2) : 0,
        dy: !isHorizontal ? dir * (Math.random() * 0.8 + 1.2) : 0,
        len: Math.floor(Math.random() * 24 + 18),
        speed: 1,
        color: isGold ? "rgba(245, 183, 0," : "rgba(47, 111, 237,",
        life: 0,
        maxLife: Math.floor(Math.random() * 120 + 80),
      };
    }

    function drawStaticGrid() {
      ctx!.strokeStyle = "rgba(148, 163, 184, 0.045)";
      ctx!.lineWidth = 1;

      ctx!.beginPath();
      for (let x = 0; x <= W; x += GRID_SIZE) {
        ctx!.moveTo(x + 0.5, 0);
        ctx!.lineTo(x + 0.5, H);
      }
      for (let y = 0; y <= H; y += GRID_SIZE) {
        ctx!.moveTo(0, y + 0.5);
        ctx!.lineTo(W, y + 0.5);
      }
      ctx!.stroke();
    }

    function loop(now: number) {
      if (!isVisible || !isTabActive) {
        animId = requestAnimationFrame(loop);
        return;
      }

      // 30fps throttle
      const delta = now - lastRenderTime;
      if (delta < FRAME_INTERVAL) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const frameStart = performance.now();
      lastRenderTime = now - (delta % FRAME_INTERVAL);

      ctx!.clearRect(0, 0, W, H);
      drawStaticGrid();

      // Maintain pulses count
      while (pulses.length < MAX_PULSES) {
        pulses.push(createPulse());
      }

      // Draw & update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.x += p.dx;
        p.y += p.dy;
        p.life++;

        // Fade in and out smoothly
        const progress = p.life / p.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.65;

        ctx!.beginPath();
        const startX = p.x;
        const startY = p.y;
        const endX = p.x - (p.dx !== 0 ? Math.sign(p.dx) * p.len : 0);
        const endY = p.y - (p.dy !== 0 ? Math.sign(p.dy) * p.len : 0);

        const gradient = ctx!.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, `${p.color} ${alpha})`);
        gradient.addColorStop(1, `${p.color} 0)`);

        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 1.5;
        ctx!.moveTo(startX, startY);
        ctx!.lineTo(endX, endY);
        ctx!.stroke();

        // Expire pulse if out of bounds or life exceeded
        if (p.life >= p.maxLife || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          pulses.splice(i, 1);
        }
      }

      // Performance monitoring: track frame computation time
      const frameCost = performance.now() - frameStart;
      frameTimes.push(frameCost);
      if (frameTimes.length > 30) frameTimes.shift();

      if (frameTimes.length === 30) {
        const avg = frameTimes.reduce((a, b) => a + b, 0) / 30;
        if (avg > 28) {
          console.warn("[PERF] SignalGrid average frame time exceeded 28ms; falling back to static grid.");
          ctx!.clearRect(0, 0, W, H);
          drawStaticGrid();
          return; // Stop animation loop permanently
        }
      }

      animId = requestAnimationFrame(loop);
    }

    // 2. Pause when tab is hidden
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 3. Pause when hero is off-screen (IntersectionObserver)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 4. Resize listener
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Start after first paint to protect LCP
    const timer = setTimeout(() => {
      resize();
      animId = requestAnimationFrame(loop);
    }, 120);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Fallback CSS grid visible before/if canvas is inactive */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}
