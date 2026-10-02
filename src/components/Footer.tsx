"use client";

import React from "react";
import { soundManager } from "@/utils/soundManager";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { getPortfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const portfolioData = getPortfolioData(language);
  const tFoot = UI_TRANSLATIONS[language].footer;
  const tNav = UI_TRANSLATIONS[language].nav;

  const scrollToTop = () => {
    soundManager.playConfirm();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-800 bg-[#070707] py-12 text-zinc-400 font-mono-tech text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-10 border-b border-zinc-900">
          {/* Brand & Mission */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-zinc-100 font-bold uppercase tracking-wider text-sm">
              <span className="w-2 h-2 bg-white" />
              MOHAMED TAHER // CSE [2030]
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-md">
              {tFoot.tagline}
            </p>
            <div className="text-[11px] text-zinc-600" dir="ltr">
              COORDINATES: {portfolioData.personal.coordinates} // DAMIETTA, EGYPT
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-zinc-500 uppercase text-[10px] tracking-wider">
              {tFoot.telemetryDir}
            </div>
            <div className="grid grid-cols-2 gap-1 text-zinc-400">
              <a href="#about" onClick={() => soundManager.playTick(700)} className="hover:text-white transition-colors">
                [01] {tNav.about}
              </a>
              <a href="#experience" onClick={() => soundManager.playTick(750)} className="hover:text-white transition-colors">
                [02] {tNav.experience}
              </a>
              <a href="#stack" onClick={() => soundManager.playTick(800)} className="hover:text-white transition-colors">
                [03] {tNav.tech}
              </a>
              <a href="#archive" onClick={() => soundManager.playTick(850)} className="hover:text-white transition-colors">
                [04] {tNav.projects}
              </a>
              <a href="#academic" onClick={() => soundManager.playTick(900)} className="hover:text-white transition-colors">
                [05] {tNav.academic}
              </a>
              <a href="#contact" onClick={() => soundManager.playTick(950)} className="hover:text-white transition-colors">
                [06] {tNav.contact}
              </a>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="md:col-span-3 space-y-3 md:text-right">
            <div className="text-zinc-500 uppercase text-[10px] tracking-wider">
              {tFoot.networkInterfaces}
            </div>
            <div className="flex items-center md:justify-end gap-3">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTick(900)}
                className="p-2 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon size={14} />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTick(950)}
                className="p-2 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon size={14} />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                onClick={() => soundManager.playTick(1000)}
                className="p-2 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white transition-colors"
                title="Email"
              >
                <Mail size={14} />
              </a>
              <button
                type="button"
                onClick={scrollToTop}
                className="tactile-btn p-2 border border-zinc-700 hover:border-zinc-300 text-zinc-300 hover:text-white bg-zinc-900 transition-colors"
                title="Back to Top"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-600">
          <div>
            &copy; {new Date().getFullYear()} MOHAMED TAHER. {tFoot.colophon}
          </div>
          <div className="flex items-center gap-2 text-zinc-500" dir="ltr">
            <span>ENGINE: NEXT.JS 16 APP ROUTER</span>
            <span>//</span>
            <span>{tFoot.status}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
