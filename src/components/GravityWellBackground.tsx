"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  orbitAngle: number;
  orbitSpeed: number;
  shimmerPhase: number;
  shimmerSpeed: number;
}

export const GravityWellBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isQuietMist } = useTheme();
  const isQuietMistRef = useRef(isQuietMist);

  useEffect(() => {
    isQuietMistRef.current = isQuietMist;
  }, [isQuietMist]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Smoothed mouse tracking coordinates
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let mouseVx = 0;
    let mouseVy = 0;
    let isMouseActive = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Rich particle density to fill the entire screen with fine, tangible sand dust
    // Scales dynamically: ~1800-2400 particles on desktop, ~800 on mobile
    const particleCount = Math.min(
      Math.max(Math.floor((width * height) / 950), 750),
      2200
    );
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      particles.push({
        x: rx,
        y: ry,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        size: Math.random() * 1.35 + 0.45, // Fine sand grain sizes (0.45px to 1.8px)
        baseAlpha: Math.random() * 0.26 + 0.16, // Clearly visible sand grain ambient opacity
        alpha: 0.22,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.007,
        shimmerPhase: Math.random() * Math.PI * 2,
        shimmerSpeed: Math.random() * 0.02 + 0.006,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isMouseActive = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
        isMouseActive = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor center interpolation
      mouseX += (targetMouseX - mouseX) * 0.075;
      mouseY += (targetMouseY - mouseY) * 0.075;

      // Mouse velocity
      mouseVx = (mouseX - prevMouseX) * 0.08;
      mouseVy = (mouseY - prevMouseY) * 0.08;
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Wide reach magnetic field spanning across the screen
      const magnetRadius = Math.max(Math.min(width, height) * 0.72, 580);
      const mistActive = isQuietMistRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient shimmer
        p.shimmerPhase += p.shimmerSpeed;
        const shimmer = Math.sin(p.shimmerPhase) * 0.06;

        if (isMouseActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < magnetRadius) {
            const normDist = dist / magnetRadius; // 0 at cursor, 1 at edge
            // Smooth sine curve for gentle, soft, and progressive attraction
            const factor = Math.sin((1 - normDist) * (Math.PI / 2));
            const pullStrength = factor * 0.16; // Gentle, smooth, calming approach

            // Progressive pull toward cursor
            if (dist > 32) {
              p.vx += (dx / dist) * pullStrength;
              p.vy += (dy / dist) * pullStrength;
            } else {
              // Gentle soft cushion cushion around the exact cursor point
              const cushion = (1 - dist / 32) * 0.2;
              p.vx -= (dx / (dist || 1)) * cushion;
              p.vy -= (dy / (dist || 1)) * cushion;
            }

            // Smooth momentum drag with mouse
            p.vx += mouseVx * factor * 0.045;
            p.vy += mouseVy * factor * 0.045;

            // Subtle organic celestial drift
            p.orbitAngle += p.orbitSpeed;
            p.vx += Math.cos(p.orbitAngle) * factor * 0.06;
            p.vy += Math.sin(p.orbitAngle) * factor * 0.06;

            // Fluid silky damping (soft motion without jarring stops)
            p.vx *= 0.965;
            p.vy *= 0.965;

            // Smooth brightness increase as particles approach mouse
            p.alpha = Math.min(0.82, p.baseAlpha + factor * 0.45 + shimmer);
          } else {
            // Calm ambient idle drift across the screen
            p.vx += (Math.random() - 0.5) * 0.016;
            p.vy += (Math.random() - 0.5) * 0.016;
            p.vx *= 0.988;
            p.vy *= 0.988;
            p.alpha = Math.max(0.1, p.baseAlpha + shimmer);
          }
        } else {
          // Idle floating state
          p.vx += (Math.random() - 0.5) * 0.014;
          p.vy += (Math.random() - 0.5) * 0.014;
          p.vx *= 0.99;
          p.vy *= 0.99;
          p.alpha = Math.max(0.1, p.baseAlpha + shimmer);
        }

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Seamless wrap around edges
        if (p.x < -15) p.x = width + 15;
        else if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        else if (p.y > height + 15) p.y = -15;

        // Render sand grain
        ctx.fillStyle = mistActive
          ? `rgba(71, 85, 105, ${p.alpha * 1.25})`
          : `rgba(245, 245, 250, ${p.alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
