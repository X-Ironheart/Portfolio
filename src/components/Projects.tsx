"use client";

import React, { useState } from "react";
import { soundManager } from "@/utils/soundManager";
import { getPortfolioData, ProjectItem } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import {
  Code2,
  ChevronDown,
  Layers,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export const Projects: React.FC = () => {
  const { language } = useLanguage();
  const portfolioData = getPortfolioData(language);
  const tProj = UI_TRANSLATIONS[language].projects;

  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [expandedProjectId, setExpandedProjectId] = useState<string>("odoo-shopify-sync");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const categoryKeys = ["ALL", "SYSTEMS", "WEB", "ENTERPRISE", "HARDWARE", "MEDIA"];

  const categoryLabels: Record<string, string> = {
    ALL: tProj.categories.all,
    SYSTEMS: tProj.categories.systems,
    WEB: tProj.categories.web,
    ENTERPRISE: tProj.categories.enterprise,
    HARDWARE: tProj.categories.hardware,
    MEDIA: tProj.categories.media,
  };

  const filteredProjects =
    activeCategory === "ALL"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    soundManager.playTick(800);
    setActiveCategory(cat);
  };

  const handleToggleExpand = (id: string) => {
    soundManager.playTick(expandedProjectId === id ? 650 : 900);
    setExpandedProjectId(expandedProjectId === id ? "" : id);
  };

  const handleCopyCode = (code: string, id: string) => {
    soundManager.playConfirm();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <section id="archive" className="py-20 md:py-28 border-b border-zinc-800 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-2 py-1 bg-zinc-950">
            {tProj.tag}
          </span>
          <div className="h-[1px] flex-1 bg-zinc-800/80" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              {tProj.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              {tProj.subtitle}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 font-mono-tech text-xs border border-zinc-800 p-1 bg-zinc-950">
            {categoryKeys.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 transition-colors ${
                  activeCategory === cat
                    ? "bg-zinc-100 text-black font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                [{categoryLabels[cat] || cat}]
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredProjects.map((project: ProjectItem) => {
            const isExpanded = expandedProjectId === project.id;
            return (
              <div
                key={project.id}
                className={`border transition-all duration-300 bg-zinc-950 ${
                  isExpanded
                    ? "border-zinc-400 ring-1 ring-zinc-700/50"
                    : "border-zinc-800/90 hover:border-zinc-500"
                }`}
              >
                {/* Project Header Bar */}
                <div className="p-6 border-b border-zinc-900 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono-tech text-[11px] text-zinc-500">
                      <span className="border border-zinc-800 px-2 py-0.5 bg-zinc-900/60 text-zinc-300">
                        {categoryLabels[project.category] || project.category}
                      </span>
                      <span>//</span>
                      <span>{tProj.year}: {project.year}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm font-light">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Links / External Icons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundManager.playTick(900)}
                        title="GitHub Repository"
                        className="p-2 border border-zinc-800 hover:border-zinc-400 bg-zinc-900/40 text-zinc-400 hover:text-white transition-colors"
                      >
                        <GithubIcon size={15} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundManager.playTick(950)}
                        title="Live Preview / Architecture"
                        className="p-2 border border-zinc-800 hover:border-zinc-400 bg-zinc-900/40 text-zinc-400 hover:text-white transition-colors"
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description & Metrics */}
                <div className="p-6 space-y-4">
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="border border-zinc-900 p-3 bg-zinc-900/30 font-mono-tech text-xs text-zinc-400 flex items-center justify-between">
                    <span className="text-zinc-500">{tProj.systemBenchmark}</span>
                    <span className="text-zinc-200 font-semibold">{project.metrics}</span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono-tech text-[11px] px-2 py-0.5 border border-zinc-800/80 bg-zinc-900/50 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expand Architecture Toggle */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleToggleExpand(project.id)}
                      className="w-full py-2 px-3 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 flex items-center justify-between font-mono-tech text-xs transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Code2 size={13} className="text-zinc-400" />
                        {isExpanded ? tProj.hideArch : tProj.inspectArch}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-white" : "text-zinc-500"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Expandable Architecture & Code Snippet Panel */}
                {isExpanded && (
                  <div className="border-t border-zinc-800/80 p-6 bg-zinc-950/90 space-y-5 font-mono-tech text-xs">
                    {/* Architecture Specs */}
                    <div className="space-y-2">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                        <Layers size={12} />
                        {tProj.archSpecs}
                      </div>
                      <ul className="space-y-1.5 text-zinc-300">
                        {project.architecture.map((arch, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2">
                            <span className="text-zinc-600 select-none">//</span>
                            <span>{arch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Code Snippet (if available) */}
                    {project.codeSnippet && (
                      <div className="space-y-2 pt-2 border-t border-zinc-900">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className="text-[11px] text-zinc-400">
                            {tProj.file} {project.codeSnippet.filename}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyCode(project.codeSnippet!.code, project.id)
                            }
                            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                          >
                            {copiedCodeId === project.id ? (
                              <>
                                <Check size={12} className="text-white" />
                                <span>{tProj.copied}</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span>{tProj.copy}</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="border border-zinc-900 bg-[#070707] p-3 text-[11px] overflow-x-auto text-zinc-300">
                          <pre className="font-mono-tech leading-relaxed">
                            {project.codeSnippet.code}
                          </pre>
                        </div>
                      </div>
                    )}
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
