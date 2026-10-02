"use client";

import React from "react";
import { soundManager } from "@/utils/soundManager";
import { getPortfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";

export const Marquee: React.FC = () => {
  const { language } = useLanguage();
  const portfolioData = getPortfolioData(language);
  const items = portfolioData.marqueeItems;
  // Repeat items for smooth infinite loop
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative border-y border-zinc-800 bg-[#0a0a0a] overflow-hidden py-3 select-none" dir="ltr">
      <div className="flex animate-marquee items-center gap-8 whitespace-nowrap">
        {repeated.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => soundManager.playTick(1100)}
            className="flex items-center gap-8 group cursor-default"
          >
            <span className="font-mono-tech text-xs tracking-widest text-zinc-400 group-hover:text-white transition-colors">
              {item}
            </span>
            <span className="text-zinc-700 text-xs font-mono-tech select-none">
              //
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
