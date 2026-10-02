"use client";

import React from "react";
import { soundManager } from "@/utils/soundManager";
import { getPortfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { X, Printer, Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const portfolioData = getPortfolioData(language);
  const tCv = UI_TRANSLATIONS[language].cvModal;

  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playConfirm();
    window.print();
  };

  const handleClose = () => {
    soundManager.playTick(600);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d0d0d] border border-zinc-700 shadow-2xl p-6 sm:p-10 my-8 space-y-8 font-mono-tech text-xs text-zinc-300">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white" />
            <span className="text-zinc-100 font-bold uppercase tracking-wider text-sm">
              {tCv.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="tactile-btn flex items-center gap-1.5 px-3 py-1.5 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition-colors text-xs"
              title="Print CV Document"
            >
              <Printer size={13} />
              <span>{tCv.printBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 border border-zinc-800 hover:border-zinc-500 bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close CV Modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* CV Header */}
        <div className="space-y-3 border-b border-zinc-900 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
            {portfolioData.personal.name}
          </h1>
          <p className="text-zinc-300 text-sm">
            {tCv.headline}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-zinc-400 pt-1" dir="ltr">
            <span className="flex items-center gap-1.5">
              <Mail size={12} className="text-zinc-500" />
              {portfolioData.personal.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={12} className="text-zinc-500" />
              {portfolioData.personal.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-zinc-500" />
              {portfolioData.personal.location}
            </span>
            <span className="flex items-center gap-1.5">
              <GithubIcon size={12} className="text-zinc-500" />
              github.com/{portfolioData.personal.githubHandle}
            </span>
          </div>
        </div>

        {/* Education & Academic Excellence */}
        <div className="space-y-3">
          <div className="text-zinc-100 font-bold uppercase tracking-wider text-xs border-b border-zinc-800 pb-1 flex items-center justify-between">
            <span>{tCv.sectionEdu}</span>
            <span className="text-zinc-500 text-[10px]">2024 – 2030</span>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-zinc-200">
              <span className="font-semibold text-sm">
                {tCv.degree}
              </span>
              <span className="text-zinc-400 text-xs">{tCv.institution}</span>
            </div>
            <div className="text-zinc-300 text-xs">
              {tCv.standingLabel} <strong className="text-white">{tCv.standingVal}</strong>
            </div>
            <div className="text-zinc-400 text-xs">
              {tCv.unionNotice}
            </div>
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-4">
          <div className="text-zinc-100 font-bold uppercase tracking-wider text-xs border-b border-zinc-800 pb-1">
            {tCv.sectionExp}
          </div>

          <div className="space-y-5">
            {portfolioData.experiences.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-zinc-200">
                  <span className="font-semibold text-sm">
                    {exp.role} — <span className="text-zinc-400">{exp.company}</span>
                  </span>
                  <span className="text-zinc-500 text-xs">{exp.period}</span>
                </div>
                <p className="text-zinc-400 text-xs">{exp.description}</p>
                <ul className="list-disc list-inside space-y-1 text-zinc-300 text-xs pl-1">
                  {exp.highlights.slice(0, 3).map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Matrix */}
        <div className="space-y-3">
          <div className="text-zinc-100 font-bold uppercase tracking-wider text-xs border-b border-zinc-800 pb-1">
            {tCv.sectionMatrix}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="border border-zinc-900 p-3 bg-zinc-950">
              <div className="text-white font-semibold mb-1">{tCv.cat1Title}</div>
              <div className="text-zinc-400">
                {tCv.cat1Desc}
              </div>
            </div>

            <div className="border border-zinc-900 p-3 bg-zinc-950">
              <div className="text-white font-semibold mb-1">{tCv.cat2Title}</div>
              <div className="text-zinc-400">
                {tCv.cat2Desc}
              </div>
            </div>

            <div className="border border-zinc-900 p-3 bg-zinc-950">
              <div className="text-white font-semibold mb-1">{tCv.cat3Title}</div>
              <div className="text-zinc-400">
                {tCv.cat3Desc}
              </div>
            </div>

            <div className="border border-zinc-900 p-3 bg-zinc-950">
              <div className="text-white font-semibold mb-1">{tCv.cat4Title}</div>
              <div className="text-zinc-400">
                {tCv.cat4Desc}
              </div>
            </div>
          </div>
        </div>

        {/* Linguistic Matrix */}
        <div className="space-y-2">
          <div className="text-zinc-100 font-bold uppercase tracking-wider text-xs border-b border-zinc-800 pb-1">
            {tCv.sectionLang}
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-zinc-300">
            <span>{tCv.langArabic}</span>
            <span>{tCv.langEnglish}</span>
            <span>{tCv.langRussian}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 pt-4 flex items-center justify-between text-[11px] text-zinc-500">
          <span>{tCv.docVerified}</span>
          <button
            type="button"
            onClick={handleClose}
            className="text-zinc-300 hover:text-white underline underline-offset-4"
          >
            {tCv.close}
          </button>
        </div>
      </div>
    </div>
  );
};
