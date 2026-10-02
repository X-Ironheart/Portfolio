"use client";

import React from "react";
import { soundManager } from "@/utils/soundManager";
import { getPortfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { Award, Terminal, HardDrive, Compass } from "lucide-react";

export const About: React.FC = () => {
  const { language, isArabic } = useLanguage();
  const tAbout = UI_TRANSLATIONS[language].about;
  const portfolioData = getPortfolioData(language);

  return (
    <section id="about" className="py-20 md:py-28 border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Index Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-2 py-1 bg-zinc-950">
            {tAbout.sectionNum}
          </span>
          <div className="h-[1px] flex-1 bg-zinc-800/80" />
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase leading-tight">
              {tAbout.heading}
            </h2>

            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
              <p>
                {tAbout.lead}
              </p>
              <p>
                {tAbout.body1}
              </p>
              <p>
                {tAbout.body2}
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 font-mono-tech text-xs">
              <div
                onMouseEnter={() => soundManager.playTick(700)}
                className="border border-zinc-800 p-3 bg-zinc-950/60 hover:border-zinc-500 transition-colors"
              >
                <div className="text-zinc-500 text-[10px] uppercase">{tAbout.stat1Label}</div>
                <div className="text-zinc-100 font-semibold mt-1">{tAbout.stat1Val}</div>
                <div className="text-zinc-400 text-[11px] mt-0.5">{isArabic ? "جامعة حورس" : "Horus Univ"}</div>
              </div>

              <div
                onMouseEnter={() => soundManager.playTick(750)}
                className="border border-zinc-800 p-3 bg-zinc-950/60 hover:border-zinc-500 transition-colors"
              >
                <div className="text-zinc-500 text-[10px] uppercase">{tAbout.stat2Label}</div>
                <div className="text-zinc-100 font-semibold mt-1">{tAbout.stat2Val}</div>
                <div className="text-zinc-400 text-[11px] mt-0.5">{isArabic ? "الهدى للتقنية" : "El-Hoda IT"}</div>
              </div>

              <div
                onMouseEnter={() => soundManager.playTick(800)}
                className="border border-zinc-800 p-3 bg-zinc-950/60 hover:border-zinc-500 transition-colors col-span-2 sm:col-span-1"
              >
                <div className="text-zinc-500 text-[10px] uppercase">{tAbout.stat3Label}</div>
                <div className="text-zinc-100 font-semibold mt-1">{tAbout.stat3Val}</div>
                <div className="text-zinc-400 text-[11px] mt-0.5">{isArabic ? "دمياط، مصر" : "Damietta, EG"}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Spec Card */}
          <div className="lg:col-span-5">
            <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-6 font-mono-tech text-xs relative group hover:border-zinc-600 transition-colors">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-200 font-semibold uppercase tracking-wider flex items-center gap-2">
                  <Terminal size={14} className="text-zinc-400" />
                  SYSTEM_PILLARS.CFG
                </span>
                <span className="text-[10px] text-zinc-500">ACTIVE_SPEC</span>
              </div>

              <div className="space-y-4">
                <div className="border border-zinc-900 p-3.5 bg-zinc-900/30 space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-200 font-semibold">
                    <span className="flex items-center gap-2">
                      <Award size={13} className="text-zinc-400" />
                      {isArabic ? "01 // الدقة الأكاديمية والبحثية" : "01 // ACADEMIC RIGOR"}
                    </span>
                    <span className="text-zinc-500 text-[10px]">HUE_CSE</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    {isArabic
                      ? "دراسة منهجية لنظم التحكم، المنطق الرقمي، المعالجات الدقيقة، والتحسين الخوارزمي في جامعة حورس."
                      : "Formal study of control systems, digital logic, microprocessors, and algorithmic optimization at Horus University."}
                  </p>
                </div>

                <div className="border border-zinc-900 p-3.5 bg-zinc-900/30 space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-200 font-semibold">
                    <span className="flex items-center gap-2">
                      <HardDrive size={13} className="text-zinc-400" />
                      {isArabic ? "02 // نظم ERP والتكنولوجيا المؤسسية" : "02 // INDUSTRIAL IT & ERP"}
                    </span>
                    <span className="text-zinc-500 text-[10px]">EL_HODA</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    {isArabic
                      ? "إدارة إنتاجية لأنظمة Odoo ERP، نقاط البيع، جسور مزامنة المخزون التلقائية، وصيانة اللوحات الإلكترونية."
                      : "Production administration of Odoo ERP pipelines, POS registers, automated inventory bridges, and hardware recovery."}
                  </p>
                </div>

                <div className="border border-zinc-900 p-3.5 bg-zinc-900/30 space-y-1.5">
                  <div className="flex items-center justify-between text-zinc-200 font-semibold">
                    <span className="flex items-center gap-2">
                      <Compass size={13} className="text-zinc-400" />
                      {isArabic ? "03 // هندسة الويب وتطبيقات الأداء العالي" : "03 // HIGH-CONCURRENCY WEB"}
                    </span>
                    <span className="text-zinc-500 text-[10px]">INDEPENDENT</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    {isArabic
                      ? "تطوير واجهات مونوكروم فائقة السرعة والاستجابة بدون أي مكتبات ثقيلة مع استجابة فورية ونبض تفاعلي."
                      : "Engineering responsive, strict-monochrome user interfaces with zero bloated dependencies and instant user feedback."}
                  </p>
                </div>
              </div>

              {/* Terminal Signature */}
              <div className="border-t border-zinc-900 pt-4 text-[11px] text-zinc-500 flex items-center justify-between">
                <span>{isArabic ? "الهوية: محمد طاهر" : "IDENTITY: MOHAMED TAHER"}</span>
                <span className="text-zinc-400">HASH: #0x7E3A9F</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
