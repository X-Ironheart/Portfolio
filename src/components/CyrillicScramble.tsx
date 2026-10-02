"use client";

import React, { useState, useEffect, useRef } from "react";

// Curated sleek authentic Russian Cyrillic glyphs for high-tech matrix flashing
const CYRILLIC_GLYPHS = "БГДЖИЙЛПФЦЧШЩЮЯ";

interface CyrillicScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  triggerKey?: any;
}

export const CyrillicScramble: React.FC<CyrillicScrambleProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 650,
  triggerKey,
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any previous running animation
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    if (!text) {
      setDisplayText("");
      return;
    }

    setDisplayText(text);

    const startAnimation = () => {
      setIsScrambling(true);
      const startTime = performance.now();
      const length = text.length;

      // Small sliding window: only 1 to 2 characters flash at any given moment
      // This strictly prevents layout expansion, prevents stretching the page, and prevents overflowing
      const GLITCH_WINDOW = 2;

      const updateFrame = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Progressively advance the scanline cursor from 0 to length + GLITCH_WINDOW
        const cursor = Math.floor(progress * (length + GLITCH_WINDOW));

        let result = "";
        for (let i = 0; i < length; i++) {
          const originalChar = text[i];

          // Preserve whitespace and punctuation directly
          if (
            originalChar === " " ||
            originalChar === "\n" ||
            originalChar === "\t" ||
            originalChar === "&" ||
            originalChar === "." ||
            originalChar === "," ||
            originalChar === "-" ||
            originalChar === "_"
          ) {
            result += originalChar;
          } else if (i < cursor - GLITCH_WINDOW) {
            // Already resolved character
            result += originalChar;
          } else if (i >= cursor - GLITCH_WINDOW && i <= cursor) {
            // Only this tiny active window (1-2 characters) momentarily flashes with a Russian Cyrillic glyph
            const randomGlyph =
              CYRILLIC_GLYPHS[Math.floor(Math.random() * CYRILLIC_GLYPHS.length)];
            result += randomGlyph;
          } else {
            // Ahead of the ripple: keep original character intact so layout never shifts or stretches
            result += originalChar;
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(updateFrame);
        } else {
          setDisplayText(text);
          setIsScrambling(false);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateFrame);
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [text, triggerKey, delay, duration]);

  return (
    <span
      className={`inline-block ${
        isScrambling ? "transition-colors text-zinc-100 select-none" : ""
      } ${className}`}
    >
      {displayText}
    </span>
  );
};
