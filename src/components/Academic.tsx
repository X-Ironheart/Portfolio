"use client";

import React from "react";
import { soundManager } from "@/utils/soundManager";
import { getPortfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { GraduationCap, Users, Radio } from "lucide-react";

export const Academic: React.FC = () => {
  const { language } = useLanguage();
  const portfolioData = getPortfolioData(language);
  const tAcad = UI_TRANSLATIONS[language].academic;

  return (
    <section id="academic" className="py-20 md:py-28 border-b border-zinc-800 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-2 py-1 bg-zinc-950">
            {tAcad.tag}
          </span>
          <div className="h-[1px] flex-1 bg-zinc-800/80" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              {tAcad.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              {tAcad.subtitle}
            </p>
          </div>
          <div className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-3 py-1.5 self-start md:self-auto bg-zinc-950">
            HUE CSE // 2024–2030
          </div>
        </div>

        {/* 2-Column Grid: Degree & Leadership Card + Conferences Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Academic Degree & Student Union Council */}
          <div className="lg:col-span-6 space-y-6">
            {/* Degree Card */}
            <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-4 hover:border-zinc-500 transition-colors">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-mono-tech text-xs text-zinc-400 flex items-center gap-2">
                  <GraduationCap size={15} className="text-zinc-300" />
                  {tAcad.degreeProgram}
                </span>
                <span className="font-mono-tech text-[10px] text-zinc-500">
                  {tAcad.classOf}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {portfolioData.academic.degree}
                </h3>
                <div className="text-zinc-400 text-sm mt-1">
                  {portfolioData.academic.institution} (HUE)
                </div>
              </div>

              <div className="border border-zinc-900 p-3 bg-zinc-900/30 flex items-center justify-between font-mono-tech text-xs">
                <span className="text-zinc-500">{tAcad.standing}</span>
                <span className="text-zinc-100 font-bold">
                  {portfolioData.academic.standing}
                </span>
              </div>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                {tAcad.curriculum}
              </p>
            </div>

            {/* Student Union Council Leadership */}
            <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-4 hover:border-zinc-500 transition-colors">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-mono-tech text-xs text-zinc-400 flex items-center gap-2">
                  <Users size={15} className="text-zinc-300" />
                  {tAcad.electedGovernance}
                </span>
                <span className="font-mono-tech text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5">
                  {tAcad.activeTerm}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {tAcad.studentUnionTitle}
                </h3>
                <div className="text-zinc-400 text-xs mt-1 font-mono-tech">
                  {tAcad.studentUnionSubtitle}
                </div>
              </div>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                {tAcad.studentUnionDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Conferences & Symposia Log */}
          <div className="lg:col-span-6">
            <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-5 hover:border-zinc-600 transition-colors">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-mono-tech text-xs text-zinc-400 flex items-center gap-2">
                  <Radio size={14} className="text-zinc-300" />
                  {tAcad.conferencesAttended}
                </span>
                <span className="font-mono-tech text-[10px] text-zinc-500">
                  {tAcad.verifiedLogs}
                </span>
              </div>

              <div className="space-y-4">
                {portfolioData.academic.conferences.map((conf, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => soundManager.playTick(900)}
                    className="border border-zinc-900 p-4 bg-zinc-900/30 hover:border-zinc-700 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between font-mono-tech text-xs">
                      <span className="text-zinc-200 font-bold tracking-tight">
                        {conf.name}
                      </span>
                      <span className="text-[10px] border border-zinc-800 px-2 py-0.5 bg-zinc-950 text-zinc-400">
                        {conf.badge}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      {conf.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Research & Technical Philosophy Note */}
              <div className="border-t border-zinc-900 pt-4 font-mono-tech text-xs text-zinc-500 flex items-center justify-between">
                <span>{tAcad.researchFocus}</span>
                <span className="text-zinc-400">ENG_COUNCIL #2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
