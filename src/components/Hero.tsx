"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { soundManager } from "@/utils/soundManager";
import { ArrowDownRight, FileText, Terminal, Cpu, Database, Layers, User, Activity } from "lucide-react";
import { getPortfolioData } from "@/data/portfolioData";
import { CyrillicScramble } from "@/components/CyrillicScramble";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";

interface HeroProps {
  onOpenCvModal: () => void;
  onOpenTerminalModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal, onOpenTerminalModal }) => {
  const [uptimeSeconds, setUptimeSeconds] = useState(1482);
  const [activeChipMode, setActiveChipMode] = useState<"ARCH" | "LOGIC" | "ERP">("ARCH");
  const [rightPanelTab, setRightPanelTab] = useState<"PORTRAIT" | "SPEC">("PORTRAIT");
  const [scrambleTrigger, setScrambleTrigger] = useState(0);
  const { isQuietMist } = useTheme();
  const { language, isArabic } = useLanguage();
  const tHero = UI_TRANSLATIONS[language].hero;
  const portfolioData = getPortfolioData(language);

  // Re-trigger Cyrillic cipher flash on language toggle
  useEffect(() => {
    setScrambleTrigger((prev) => prev + 1);
  }, [language]);

  // Automatic periodic re-scramble cycle every 6 seconds
  useEffect(() => {
    const autoInterval = setInterval(() => {
      setScrambleTrigger((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(autoInterval);
  }, []);

  const handleHeadlineHover = () => {
    soundManager.playTick(1100);
    setScrambleTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-zinc-800/90 overflow-hidden">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-zinc-900/60 pointer-events-none hidden lg:block" />
      <div className="absolute top-0 left-1/3 w-[1px] h-full bg-zinc-900/60 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Badge & Coordinates */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 border font-mono-tech text-xs transition-colors ${
              isQuietMist
                ? "border-[#d8d1c2] bg-[#eae4d6]/90 text-[#1e293b]"
                : "border-zinc-800 bg-zinc-950/80 text-zinc-300"
            }`}
          >
            <span className={`w-1.5 h-1.5 ${isQuietMist ? "bg-[#385a7c]" : "bg-zinc-100"}`} />
            <span>{tHero.badge}</span>
          </div>

          <div
            className={`hidden sm:flex items-center gap-4 font-mono-tech text-xs ${
              isQuietMist ? "text-[#64748b]" : "text-zinc-500"
            }`}
          >
            <span>{tHero.coord}: {portfolioData.personal.coordinates}</span>
            <span>//</span>
            <span>{tHero.sysStatus}</span>
          </div>
        </div>

        {/* Hero Grid: Typographic Statement + Telemetry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Bold Headline & Overview */}
          <div className="lg:col-span-8 space-y-8">
            <h1
              onMouseEnter={handleHeadlineHover}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.08] cursor-default select-none group max-w-full overflow-hidden"
              title="Hover to re-scramble Cyrillic cipher"
            >
              {/* Line 1: Starts first */}
              <span className="block overflow-hidden">
                <CyrillicScramble
                  text={tHero.headlinePrefix}
                  triggerKey={scrambleTrigger}
                  delay={100}
                  duration={650}
                />
              </span>

              {/* Line 2: Starts only after Line 1 finishes */}
              <span className="block mt-1 sm:mt-2 overflow-hidden">
                <span className="text-zinc-400 underline decoration-zinc-800 underline-offset-8 inline-block">
                  <CyrillicScramble
                    text={tHero.headlineHighlight}
                    triggerKey={scrambleTrigger}
                    delay={780}
                    duration={550}
                  />
                </span>{" "}
                <CyrillicScramble
                  text={tHero.headlineSuffix}
                  triggerKey={scrambleTrigger}
                  delay={1350}
                  duration={500}
                />
              </span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
              <strong className="text-zinc-200 font-medium">{tHero.bioAuthor}</strong> {tHero.bioText}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#archive"
                onClick={() => soundManager.playConfirm()}
                className={`tactile-btn inline-flex items-center gap-2 px-6 py-3.5 font-semibold font-mono-tech text-xs tracking-wider border uppercase transition-all shadow-sm ${
                  isQuietMist
                    ? "bg-[#1e293b] hover:bg-[#0f172a] !text-white border-[#1e293b] text-inverted-white"
                    : "bg-zinc-100 hover:bg-white text-black border-zinc-200"
                }`}
                style={isQuietMist ? { color: "#ffffff" } : undefined}
              >
                <span style={isQuietMist ? { color: "#ffffff" } : undefined}>{tHero.exploreWork}</span>
                <ArrowDownRight size={14} style={isQuietMist ? { color: "#ffffff" } : undefined} />
              </a>

              <button
                type="button"
                onClick={() => {
                  soundManager.playConfirm();
                  onOpenCvModal();
                }}
                className={`tactile-btn inline-flex items-center gap-2 px-5 py-3.5 font-mono-tech text-xs tracking-wider border transition-all uppercase ${
                  isQuietMist
                    ? "bg-[#eae4d6] hover:bg-[#dfd7c5] text-[#1e293b] border-[#d8d1c2]"
                    : "bg-zinc-950 hover:bg-zinc-900 text-zinc-200 hover:text-white border-zinc-700 hover:border-zinc-400"
                }`}
              >
                <FileText size={14} className={isQuietMist ? "text-[#385a7c]" : "text-zinc-400"} />
                <span>{tHero.downloadCv}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTick(1100);
                  onOpenTerminalModal();
                }}
                className={`tactile-btn hidden sm:inline-flex items-center gap-2 px-4 py-3.5 font-mono-tech text-xs border transition-all ${
                  isQuietMist
                    ? "bg-[#eae4d6] hover:bg-[#dfd7c5] text-[#475569] hover:text-[#0f172a] border-[#d8d1c2]"
                    : "bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-600"
                }`}
                title="Launch Interactive Terminal"
              >
                <Terminal size={14} />
                <span>{tHero.cliConsole}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Studio Portrait & Telemetry Card */}
          <div className="lg:col-span-4">
            <div
              className={`border p-4 space-y-4 font-mono-tech text-xs relative group transition-colors shadow-xl ${
                isQuietMist
                  ? "border-[#d8d1c2] bg-[#fbf9f4]/95 text-[#1e293b] shadow-stone-200/50"
                  : "border-zinc-800 bg-zinc-950/90 text-zinc-300 hover:border-zinc-500"
              }`}
            >
              {/* Header with Switcher Tabs */}
              <div
                className={`flex items-center justify-between border-b pb-3 ${
                  isQuietMist ? "border-[#d8d1c2]" : "border-zinc-800"
                }`}
              >
                <div
                  className={`flex items-center gap-1 p-0.5 border text-[10px] ${
                    isQuietMist ? "bg-[#eae4d6] border-[#d8d1c2]" : "bg-zinc-900/60 border-zinc-800"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTick(800);
                      setRightPanelTab("PORTRAIT");
                    }}
                    className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
                      rightPanelTab === "PORTRAIT"
                        ? isQuietMist
                          ? "bg-[#1e293b] !text-white font-semibold text-inverted-white"
                          : "bg-zinc-100 text-black font-semibold"
                        : isQuietMist
                          ? "text-[#64748b] hover:text-[#0f172a]"
                          : "text-zinc-400 hover:text-white"
                    }`}
                    style={rightPanelTab === "PORTRAIT" && isQuietMist ? { color: "#ffffff" } : undefined}
                  >
                    <User size={11} style={rightPanelTab === "PORTRAIT" && isQuietMist ? { color: "#ffffff" } : undefined} />
                    <span>{tHero.portraitTab}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTick(900);
                      setRightPanelTab("SPEC");
                    }}
                    className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
                      rightPanelTab === "SPEC"
                        ? isQuietMist
                          ? "bg-[#1e293b] !text-white font-semibold text-inverted-white"
                          : "bg-zinc-100 text-black font-semibold"
                        : isQuietMist
                          ? "text-[#64748b] hover:text-[#0f172a]"
                          : "text-zinc-400 hover:text-white"
                    }`}
                    style={rightPanelTab === "SPEC" && isQuietMist ? { color: "#ffffff" } : undefined}
                  >
                    <Activity size={11} style={rightPanelTab === "SPEC" && isQuietMist ? { color: "#ffffff" } : undefined} />
                    <span>{tHero.specTab}</span>
                  </button>
                </div>
                <span className={`text-[10px] ${isQuietMist ? "text-[#64748b]" : "text-zinc-500"}`}>
                  ID: #0xTAHER
                </span>
              </div>

              {/* Panel Content: Portrait View */}
              {rightPanelTab === "PORTRAIT" ? (
                <div className="space-y-3">
                  {/* Portrait Image Frame with Corner Brackets */}
                  <div
                    className={`relative aspect-[3/4] w-full border overflow-hidden group/img ${
                      isQuietMist ? "border-[#d8d1c2] bg-[#eae4d6]" : "border-zinc-800/90 bg-black"
                    }`}
                  >
                    {/* Dark Mode Photo (when in Dark/Monochrome mode) */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isQuietMist ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                    >
                      <Image
                        src="/images/mohamed_light.jpg"
                        alt="Mohamed Taher - Computer & Systems Engineering (Dark Mode)"
                        fill
                        priority
                        className="object-cover object-top group-hover/img:scale-[1.02] transition-transform duration-500"
                      />
                    </div>

                    {/* Light Mode Photo (when in Light / Quiet Mist mode) */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isQuietMist ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src="/images/mohamed_dark.jpg"
                        alt="Mohamed Taher - Computer & Systems Engineering (Light Mode)"
                        fill
                        priority
                        className="object-cover object-top group-hover/img:scale-[1.02] transition-transform duration-500"
                      />
                    </div>

                    {/* Architectural Hairline Overlays */}
                    <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                      {/* Top Overlay Bar */}
                      <div
                        className={`flex items-center justify-between text-[10px] px-2 py-0.5 border backdrop-blur-xs font-mono-tech select-none ${
                          isQuietMist
                            ? "bg-white/85 text-[#0f172a] border-[#d8d1c2]/80 shadow-xs"
                            : "bg-black/60 text-white/90 border-white/20"
                        }`}
                      >
                        <span>{portfolioData.personal.name.toUpperCase()}</span>
                        <span>{tHero.studioTag}</span>
                      </div>

                      {/* Hairline Corner Crosshairs */}
                      <div className={`absolute top-2 left-2 text-[10px] select-none ${isQuietMist ? "text-slate-700/60" : "text-white/60"}`}>+</div>
                      <div className={`absolute top-2 right-2 text-[10px] select-none ${isQuietMist ? "text-slate-700/60" : "text-white/60"}`}>+</div>
                      <div className={`absolute bottom-2 left-2 text-[10px] select-none ${isQuietMist ? "text-slate-700/60" : "text-white/60"}`}>+</div>
                      <div className={`absolute bottom-2 right-2 text-[10px] select-none ${isQuietMist ? "text-slate-700/60" : "text-white/60"}`}>+</div>

                      {/* Bottom Overlay Bar */}
                      <div
                        className={`flex items-center justify-between text-[10px] px-2 py-0.5 border backdrop-blur-xs font-mono-tech select-none ${
                          isQuietMist
                            ? "bg-white/85 text-[#0f172a] border-[#d8d1c2]/80 shadow-xs"
                            : "bg-black/60 text-white/90 border-white/20"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          {tHero.onlineStatus}
                        </span>
                        <span>{tHero.portraitSubtag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Caption & Location metadata */}
                  <div className="flex items-center justify-between text-[11px] px-1 font-mono-tech">
                    <span className={isQuietMist ? "text-[#1e293b] font-semibold" : "text-zinc-300 font-semibold"}>
                      {tHero.academicTag}
                    </span>
                    <span className={isQuietMist ? "text-[#64748b]" : "text-zinc-500"}>
                      {tHero.locationTag}
                    </span>
                  </div>
                </div>
              ) : (
                /* Panel Content: Telemetry Specs View */
                <div className="space-y-4">
                  {/* Mode Toggles */}
                  <div
                    className={`grid grid-cols-3 gap-1 border p-0.5 text-[10px] ${
                      isQuietMist ? "border-[#d8d1c2] bg-[#eae4d6]" : "border-zinc-800 bg-zinc-900/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTick(650);
                        setActiveChipMode("ARCH");
                      }}
                      className={`py-1 text-center transition-colors ${
                        activeChipMode === "ARCH"
                          ? isQuietMist
                            ? "bg-[#1e293b] !text-white font-semibold text-inverted-white"
                            : "bg-zinc-200 text-black font-semibold"
                          : isQuietMist
                            ? "text-[#64748b] hover:text-[#0f172a]"
                            : "text-zinc-400 hover:text-zinc-200"
                      }`}
                      style={activeChipMode === "ARCH" && isQuietMist ? { color: "#ffffff" } : undefined}
                    >
                      {tHero.chipArch}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTick(750);
                        setActiveChipMode("LOGIC");
                      }}
                      className={`py-1 text-center transition-colors ${
                        activeChipMode === "LOGIC"
                          ? isQuietMist
                            ? "bg-[#1e293b] !text-white font-semibold text-inverted-white"
                            : "bg-zinc-200 text-black font-semibold"
                          : isQuietMist
                            ? "text-[#64748b] hover:text-[#0f172a]"
                            : "text-zinc-400 hover:text-zinc-200"
                      }`}
                      style={activeChipMode === "LOGIC" && isQuietMist ? { color: "#ffffff" } : undefined}
                    >
                      {tHero.chipLogic}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTick(850);
                        setActiveChipMode("ERP");
                      }}
                      className={`py-1 text-center transition-colors ${
                        activeChipMode === "ERP"
                          ? isQuietMist
                            ? "bg-[#1e293b] !text-white font-semibold text-inverted-white"
                            : "bg-zinc-200 text-black font-semibold"
                          : isQuietMist
                            ? "text-[#64748b] hover:text-[#0f172a]"
                            : "text-zinc-400 hover:text-zinc-200"
                      }`}
                      style={activeChipMode === "ERP" && isQuietMist ? { color: "#ffffff" } : undefined}
                    >
                      {tHero.chipErp}
                    </button>
                  </div>

                  {/* Content Panel depending on mode */}
                  <div
                    className={`min-h-[140px] border p-3 font-mono-tech space-y-2 text-[11px] ${
                      isQuietMist
                        ? "border-[#d8d1c2] bg-[#f4f0e6] text-[#1e293b]"
                        : "border-zinc-900 bg-zinc-950/60"
                    }`}
                  >
                    {activeChipMode === "ARCH" && (
                      <>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "الجهة الأكاديمية:" : "ACADEMIC:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>
                            {isArabic ? "هندسة حورس 2030" : "HORUS CSE 2030"}
                          </span>
                        </div>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "التقدير التراكمي:" : "RECORD:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>
                            {isArabic ? "مرتبة الشرف (امتياز)" : "DISTINCTION (EXCELLENT)"}
                          </span>
                        </div>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "التمثيل الطلابي:" : "LEADERSHIP:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>
                            {isArabic ? "مجلس اتحاد الطلاب" : "STUDENT UNION COUNCIL"}
                          </span>
                        </div>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "معمل الإلكترونيات:" : "HARDWARE LAB:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>
                            {isArabic ? "الدوائر والتشخيص" : "CIRCUITS & DIAGNOSTICS"}
                          </span>
                        </div>
                      </>
                    )}

                    {activeChipMode === "LOGIC" && (
                      <>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "إدارة الذاكرة:" : "MEMORY ALLOC:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>
                            {isArabic ? "محرك SLAB / BUDDY" : "SLAB / BUDDY ENGINE"}
                          </span>
                        </div>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "المترجم:" : "COMPILER:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>GCC / CLANG -O3</span>
                        </div>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "التعقيد الخوارزمي:" : "COMPLEXITY:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>O(log N) AVL INDEX</span>
                        </div>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "فحص التسريب:" : "LEAK DETECT:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>VALGRIND CLEAN (0B)</span>
                        </div>
                      </>
                    )}

                    {activeChipMode === "ERP" && (
                      <>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "بيئة النشر:" : "DEPLOYMENT:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>
                            {isArabic ? "الهدى لتكنولوجيا المعلومات" : "EL-HODA IT SERVICES"}
                          </span>
                        </div>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "محرك ERP:" : "ERP ENGINE:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>
                            {isArabic ? "ODOO POS ونقاط البيع" : "ODOO POS & INVENTORY"}
                          </span>
                        </div>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "التجارة الإلكترونية:" : "COMMERCE:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>
                            {isArabic ? "متاجر SHOPIFY المتعددة" : "SHOPIFY MULTI-STORE"}
                          </span>
                        </div>
                        <div className={`flex justify-between ${isQuietMist ? "text-[#64748b]" : "text-zinc-400"}`}>
                          <span>{isArabic ? "دقة المزامنة:" : "ACCURACY:"}</span>
                          <span className={isQuietMist ? "text-[#0f172a] font-medium" : "text-zinc-200"}>99.9% SYNCED LEDGER</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* ASCII Circuit Wireframe */}
                  <div
                    className={`text-[10px] leading-tight select-none border-t pt-3 font-mono-tech ${
                      isQuietMist ? "border-[#d8d1c2] text-[#64748b]" : "border-zinc-900 text-zinc-600"
                    }`}
                  >
                    <pre
                      className={`p-2 border overflow-x-auto ${
                        isQuietMist
                          ? "border-[#d8d1c2] bg-[#eae4d6]/60 text-[#334155]"
                          : "border-transparent text-zinc-500"
                      }`}
                    >
{`+------------------------------+
| [CPU] === [BUS] === [SYS_IO] |
|   |         |          |     |
| [MEM]   [ODOO_SYNC] [CACHE]  |
+------------------------------+`}
                    </pre>
                  </div>
                </div>
              )}

              {/* System Uptime Metric (Persistent in both modes) */}
              <div
                className={`flex items-center justify-between pt-2 border-t text-[10px] font-mono-tech ${
                  isQuietMist ? "border-[#d8d1c2] text-[#64748b]" : "border-zinc-900 text-zinc-500"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 animate-pulse ${isQuietMist ? "bg-[#385a7c]" : "bg-zinc-400"}`} />
                  {tHero.uptime}:
                </span>
                <span className={isQuietMist ? "text-[#0f172a] font-semibold" : "text-zinc-300"}>
                  {formatUptime(uptimeSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono-tech text-xs">
          <div className="border border-zinc-900 p-3 bg-zinc-950/40 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-2 text-zinc-400 mb-1">
              <Cpu size={14} className="text-zinc-300" />
              <span className="font-semibold text-zinc-200">{tHero.features.cSystems}</span>
            </div>
            <p className="text-[11px] text-zinc-500">{tHero.features.cSystemsDesc}</p>
          </div>

          <div className="border border-zinc-900 p-3 bg-zinc-950/40 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-2 text-zinc-400 mb-1">
              <Database size={14} className="text-zinc-300" />
              <span className="font-semibold text-zinc-200">{tHero.features.odooShopify}</span>
            </div>
            <p className="text-[11px] text-zinc-500">{tHero.features.odooShopifyDesc}</p>
          </div>

          <div className="border border-zinc-900 p-3 bg-zinc-950/40 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-2 text-zinc-400 mb-1">
              <Layers size={14} className="text-zinc-300" />
              <span className="font-semibold text-zinc-200">{tHero.features.tactileFrontend}</span>
            </div>
            <p className="text-[11px] text-zinc-500">{tHero.features.tactileFrontendDesc}</p>
          </div>

          <div className="border border-zinc-900 p-3 bg-zinc-950/40 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-2 text-zinc-400 mb-1">
              <span className="w-2 h-2 bg-zinc-300" />
              <span className="font-semibold text-zinc-200">{tHero.features.hardwareMedia}</span>
            </div>
            <p className="text-[11px] text-zinc-500">{tHero.features.hardwareMediaDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
