"use client";

import React, { useState } from "react";
import Image from "next/image";
import { soundManager } from "@/utils/soundManager";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { Coffee, Mountain, Sparkles, X, Compass, ExternalLink } from "lucide-react";

export const QuietMomentVignette: React.FC = () => {
  const { theme, toggleTheme, isQuietMist } = useTheme();
  const { language, isArabic } = useLanguage();
  const tVignette = UI_TRANSLATIONS[language].vignette;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Floating Serene Vignette Strip */}
      <div
        className={`transition-all duration-300 border font-mono-tech text-xs p-3 select-none ${
          isQuietMist
            ? "border-[#c4bcb0] bg-[#eae5d8]/80 text-[#2c3746] shadow-md"
            : "border-zinc-800 bg-zinc-950/70 text-zinc-400 hover:border-zinc-600"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Thumbnail artwork */}
            <button
              type="button"
              onClick={() => {
                soundManager.playTick(900);
                setModalOpen(true);
              }}
              className="relative w-12 h-10 border border-zinc-700/60 overflow-hidden shrink-0 group hover:scale-105 transition-transform"
              title="Click to view artwork"
            >
              <Image
                src="/images/quiet_moment.png"
                alt="A Quiet Moment Watercolor"
                fill
                className="object-cover"
              />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-tight">
                <Mountain size={13} className={isQuietMist ? "text-[#385a7c]" : "text-zinc-300"} />
                <span className={isQuietMist ? "text-[#1d2734]" : "text-white"}>
                  {tVignette.title}
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 italic mt-0.5">
                {tVignette.quote}
              </div>
            </div>
          </div>

          {/* Mode Toggle Button */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => {
                soundManager.playTick(750);
                setModalOpen(true);
              }}
              className={`px-2 py-1 text-[11px] border transition-colors ${
                isQuietMist
                  ? "border-[#c4bcb0] bg-[#dfd9cb] text-[#2c3746] hover:bg-[#d6cfbe]"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              {tVignette.viewArt}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`px-2.5 py-1 text-[11px] border font-semibold transition-all flex items-center gap-1.5 ${
                isQuietMist
                  ? "border-[#2c3746] bg-[#2c3746] text-[#f5f3ec] hover:bg-[#1f2835]"
                  : "border-zinc-700 bg-zinc-900 hover:bg-zinc-100 hover:text-black text-zinc-300"
              }`}
            >
              <Coffee size={11} />
              <span>{isQuietMist ? tVignette.exitMist : tVignette.activateMist}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Artwork Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`relative w-full max-w-2xl border p-6 sm:p-8 space-y-6 shadow-2xl transition-colors font-mono-tech text-xs ${
              isQuietMist
                ? "bg-[#f5f3ec] border-[#c4bcb0] text-[#2c3746]"
                : "bg-[#0d0d0d] border-zinc-700 text-zinc-300"
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-current" />
                <span className="font-bold tracking-wider uppercase text-sm">
                  A QUIET MOMENT // VISUAL POETRY
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playTick(600);
                  setModalOpen(false);
                }}
                className="p-1.5 border border-zinc-800/80 hover:border-zinc-500 transition-colors"
                aria-label="Close Modal"
              >
                <X size={15} />
              </button>
            </div>

            {/* Artwork Presentation */}
            <div className="relative w-full aspect-[4/3] border border-zinc-800/40 bg-zinc-950 overflow-hidden shadow-inner">
              <Image
                src="/images/quiet_moment.png"
                alt="A Quiet Moment - Watercolor by Mt Fuji"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Text Inscription */}
            <div className="text-center space-y-2 py-1">
              <div className="text-sm tracking-widest uppercase font-semibold">
                coffee &middot; mist &middot; mountain
              </div>
              <div className="text-xs text-zinc-500 italic">
                a quiet moment &mdash; 2024
              </div>
              <p className="text-[11px] text-zinc-500 max-w-md mx-auto leading-relaxed pt-2">
                A serene counterweight to digital architecture and computational control. Where morning mist ascends over the mountain peak and stillness grounds the engineering mind.
              </p>
            </div>

            {/* Modal Action Footer */}
            <div className="border-t border-zinc-800/60 pt-4 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500">
                THEME: {theme}
              </span>
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                }}
                className={`px-3 py-1.5 border font-semibold transition-colors flex items-center gap-1.5 text-xs ${
                  isQuietMist
                    ? "border-[#2c3746] bg-[#2c3746] text-[#f5f3ec]"
                    : "border-zinc-600 bg-zinc-100 text-black hover:bg-white"
                }`}
              >
                <Coffee size={12} />
                <span>{isQuietMist ? tVignette.returnMono : tVignette.setActiveTheme}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
