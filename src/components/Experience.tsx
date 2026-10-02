"use client";

import React, { useState } from "react";
import { soundManager } from "@/utils/soundManager";
import { getPortfolioData, ExperienceItem } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { ChevronDown, Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export const Experience: React.FC = () => {
  const { language } = useLanguage();
  const portfolioData = getPortfolioData(language);
  const tExp = UI_TRANSLATIONS[language].experience;
  const [expandedId, setExpandedId] = useState<string>("elhoda-it");

  const toggleExpand = (id: string) => {
    soundManager.playTick(expandedId === id ? 600 : 850);
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-zinc-800 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-2 py-1 bg-zinc-950">
            {tExp.tag}
          </span>
          <div className="h-[1px] flex-1 bg-zinc-800/80" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              {tExp.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              {tExp.subtitle}
            </p>
          </div>
          <div className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-3 py-1.5 self-start md:self-auto bg-zinc-950">
            {tExp.totalRoles}: {portfolioData.experiences.length}
          </div>
        </div>

        {/* Accordion / Timeline List */}
        <div className="space-y-4">
          {portfolioData.experiences.map((exp: ExperienceItem, idx: number) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className={`border transition-all duration-200 ${
                  isExpanded
                    ? "border-zinc-500 bg-zinc-950 shadow-md"
                    : "border-zinc-800/90 bg-zinc-950/40 hover:border-zinc-700"
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(exp.id)}
                  className="w-full p-5 sm:p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-2 py-1 bg-zinc-900/50 mt-1">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        <span className="text-zinc-500 text-xs font-mono-tech">@</span>
                        <span className="text-zinc-300 font-medium text-sm sm:text-base">
                          {exp.company}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-2 font-mono-tech text-xs text-zinc-400">
                        <span className="flex items-center gap-1.5 text-zinc-300">
                          <Calendar size={13} className="text-zinc-500" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <MapPin size={13} className="text-zinc-500" />
                          {exp.location}
                        </span>
                        <span className="border border-zinc-800 px-2 py-0.5 text-zinc-400 bg-zinc-900/50 hidden sm:inline">
                          {exp.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="text-xs font-mono-tech text-zinc-500 hidden sm:inline">
                      {isExpanded ? tExp.collapse : tExp.expandSpec}
                    </span>
                    <div
                      className={`p-1.5 border border-zinc-800 bg-zinc-900 text-zinc-300 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 bg-zinc-100 text-black border-white" : ""
                      }`}
                    >
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </button>

                {/* Expanded Telemetry Drawer */}
                {isExpanded && (
                  <div className="border-t border-zinc-800/80 p-5 sm:p-6 bg-zinc-950 space-y-6">
                    {/* Summary Description */}
                    <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
                      {exp.description}
                    </p>

                    {/* Highlights & Engineering Accomplishments */}
                    <div className="space-y-3">
                      <div className="font-mono-tech text-xs text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        <Briefcase size={13} className="text-zinc-400" />
                        {tExp.keyDeliverables}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exp.highlights.map((highlight, hIdx) => (
                          <div
                            key={hIdx}
                            className="border border-zinc-900 p-3 bg-zinc-900/30 flex items-start gap-2.5 font-mono-tech text-xs text-zinc-300"
                          >
                            <CheckCircle2 size={14} className="text-zinc-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Operational Metrics */}
                    {exp.metrics && exp.metrics.length > 0 && (
                      <div className="border-t border-zinc-900 pt-4">
                        <div className="font-mono-tech text-[11px] text-zinc-500 uppercase tracking-wider mb-3">
                          {tExp.metricsTitle}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono-tech">
                          {exp.metrics.map((metric, mIdx) => (
                            <div
                              key={mIdx}
                              className="border border-zinc-800/60 p-2.5 bg-zinc-900/20"
                            >
                              <div className="text-zinc-500 text-[10px] uppercase">
                                {metric.label}
                              </div>
                              <div className="text-zinc-100 font-bold text-sm sm:text-base mt-1">
                                {metric.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    <div className="border-t border-zinc-900 pt-4 flex flex-wrap items-center gap-2">
                      <span className="font-mono-tech text-xs text-zinc-500 mr-2">
                        {tExp.techRepertoire}
                      </span>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          onMouseEnter={() => soundManager.playTick(950)}
                          className="font-mono-tech text-xs px-2.5 py-1 border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
