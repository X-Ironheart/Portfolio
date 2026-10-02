"use client";

import React, { useState } from "react";
import { soundManager } from "@/utils/soundManager";
import { getPortfolioData, SkillCategory } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { Terminal, ArrowRight } from "lucide-react";

export const TechMatrix: React.FC = () => {
  const { language } = useLanguage();
  const portfolioData = getPortfolioData(language);
  const tTech = UI_TRANSLATIONS[language].tech;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);

  const activeCategory = portfolioData.skillMatrix[selectedCategoryIndex] || portfolioData.skillMatrix[0];
  const selectedSkill = activeCategory.skills[selectedSkillIndex] || activeCategory.skills[0];

  const handleSelectCategory = (idx: number) => {
    soundManager.playTick(750 + idx * 50);
    setSelectedCategoryIndex(idx);
    setSelectedSkillIndex(0);
  };

  const handleSelectSkill = (idx: number) => {
    soundManager.playTick(1050);
    setSelectedSkillIndex(idx);
  };

  return (
    <section id="stack" className="py-20 md:py-28 border-b border-zinc-800 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-2 py-1 bg-zinc-950">
            {tTech.tag}
          </span>
          <div className="h-[1px] flex-1 bg-zinc-800/80" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              {tTech.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              {tTech.subtitle}
            </p>
          </div>
          <div className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-3 py-1.5 self-start md:self-auto bg-zinc-950">
            {tTech.version}
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {portfolioData.skillMatrix.map((cat: SkillCategory, idx: number) => {
            const isSelected = selectedCategoryIndex === idx;
            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => handleSelectCategory(idx)}
                className={`p-3.5 text-left border transition-all font-mono-tech text-xs relative ${
                  isSelected
                    ? "border-zinc-300 bg-zinc-900 text-white"
                    : "border-zinc-800/90 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <div className="text-[10px] text-zinc-500 mb-1">[{cat.tag}]</div>
                <div className="font-semibold text-sm tracking-tight">{cat.title}</div>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bento Grid: Skills List + Telemetry Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Skills List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="border border-zinc-800/80 bg-zinc-950 p-4 font-mono-tech text-xs text-zinc-400 flex items-center justify-between">
              <span>{tTech.activeDomain} {activeCategory.title.toUpperCase()}</span>
              <span className="text-zinc-500">{activeCategory.skills.length} {tTech.nodesLogged}</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeCategory.skills.map((skill, sIdx) => {
                const isActive = selectedSkillIndex === sIdx;
                return (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => handleSelectSkill(sIdx)}
                    className={`w-full p-4 border text-left flex items-center justify-between transition-all select-none ${
                      isActive
                        ? "border-zinc-400 bg-zinc-900/90 text-white"
                        : "border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700 text-zinc-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 ${isActive ? "bg-white" : "bg-zinc-600"}`} />
                      <div>
                        <span className="font-mono-tech text-sm font-semibold tracking-tight">
                          {skill.name}
                        </span>
                        <div className="text-zinc-500 text-xs font-mono-tech mt-0.5 line-clamp-1">
                          {skill.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-4 font-mono-tech text-xs">
                      <span className="border border-zinc-800 px-2 py-0.5 bg-zinc-900/40 text-zinc-400 text-[11px]">
                        {skill.level}
                      </span>
                      <ArrowRight
                        size={14}
                        className={`transition-transform ${
                          isActive ? "translate-x-1 text-white" : "text-zinc-600"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Telemetry Inspector Card */}
          <div className="lg:col-span-5">
            <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-6 font-mono-tech text-xs sticky top-20 hover:border-zinc-600 transition-colors">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-zinc-400" />
                  <span className="text-zinc-200 font-bold uppercase tracking-wider">
                    {tTech.nodeInspector}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500">{tTech.liveTelemetry}</span>
              </div>

              {/* Selected Node Details */}
              <div className="space-y-4">
                <div>
                  <div className="text-zinc-500 text-[11px] uppercase">{tTech.selectedNode}</div>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                    {selectedSkill.name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 border-y border-zinc-900 py-3 text-[11px]">
                  <div>
                    <span className="text-zinc-500">{tTech.proficiencyLevel}</span>
                    <div className="text-zinc-200 font-semibold mt-0.5">{selectedSkill.level}</div>
                  </div>
                  <div>
                    <span className="text-zinc-500">{tTech.category}</span>
                    <div className="text-zinc-200 font-semibold mt-0.5">{activeCategory.tag}</div>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-500 text-[11px] uppercase">{tTech.technicalArchitecture}</span>
                  <p className="text-zinc-300 text-xs leading-relaxed mt-1 border border-zinc-900 p-3 bg-zinc-900/30">
                    {selectedSkill.description}
                  </p>
                </div>

                <div>
                  <span className="text-zinc-500 text-[11px] uppercase">{tTech.deploymentContext}</span>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-1 border border-zinc-900 p-3 bg-zinc-900/30">
                    {selectedSkill.context}
                  </p>
                </div>
              </div>

              {/* Interactive Status Indicator */}
              <div className="border-t border-zinc-900 pt-4 flex items-center justify-between text-zinc-500 text-[11px]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-zinc-100" />
                  {tTech.stateVerified}
                </span>
                <span>ID: #NODE_{selectedSkill.name.replace(/\W+/g, "").toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
