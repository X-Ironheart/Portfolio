"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "@/utils/soundManager";
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Terminal, Coffee, Globe } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";

interface NavbarProps {
  onOpenCvModal: () => void;
  onOpenTerminalModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCvModal }) => {
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeDamietta, setTimeDamietta] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, isQuietMist } = useTheme();
  const { language, toggleLanguage, isArabic } = useLanguage();
  const tNav = UI_TRANSLATIONS[language].nav;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Damietta, Egypt is UTC+2 / UTC+3 depending on daylight savings. Egypt Standard Time is GMT+2 or +3.
      // Using Africa/Cairo timezone
      try {
        const timeString = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeDamietta(timeString);
      } catch {
        setTimeDamietta(now.toTimeString().split(" ")[0]);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSound = () => {
    const isNowActive = soundManager.toggleSound();
    setSoundActive(isNowActive);
  };

  const navLinks = [
    { label: tNav.about, href: "#about", num: "01" },
    { label: tNav.experience, href: "#experience", num: "02" },
    { label: tNav.stack, href: "#stack", num: "03" },
    { label: tNav.archive, href: "#archive", num: "04" },
    { label: tNav.academic, href: "#academic", num: "05" },
    { label: tNav.contact, href: "#contact", num: "06" },
  ];

  const handleLinkClick = () => {
    soundManager.playTick(900);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Telemetry / Status Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-zinc-800"
            : "bg-[#0a0a0a] border-zinc-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 flex items-center justify-between font-mono-tech text-xs">
            {/* Left: Brand & Academic Tag */}
            <a
              href="#"
              onClick={() => soundManager.playTick(800)}
              className="flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors group"
            >
              <span className="inline-block w-2 h-2 bg-zinc-100 rounded-none group-hover:bg-white" />
              <span className="font-semibold tracking-tight uppercase">
                {isArabic ? "محمد طاهر" : "MOHAMED TAHER"}
              </span>
              <span className="text-zinc-500">//</span>
              <span className="text-zinc-400 hidden sm:inline">{isArabic ? "هندسة حورس [2030]" : "CSE [2030]"}</span>
            </a>

            {/* Center Desktop Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => soundManager.playTick(750)}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1.5 py-1 px-1.5 border border-transparent hover:border-zinc-800"
                >
                  <span className="text-zinc-600 text-[10px]">[{link.num}]</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>

            {/* Right: Live Status & Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Damietta Clock */}
              <div
                className={`hidden md:flex items-center gap-2 border px-2 py-1 text-[11px] transition-colors ${
                  isQuietMist
                    ? "border-[#d8d1c2] bg-[#eae4d6] text-[#1e293b]"
                    : "border-zinc-800/80 bg-zinc-950/60 text-zinc-300"
                }`}
              >
                <span className={isQuietMist ? "text-[#64748b]" : "text-zinc-500"}>{tNav.dmt}</span>
                <span className={`font-mono-tech ${isQuietMist ? "text-[#0f172a] font-semibold" : "text-zinc-200"}`}>
                  {timeDamietta || "00:00:00"}
                </span>
              </div>

              {/* Status Badge */}
              <div
                className={`hidden sm:flex items-center gap-2 border px-2.5 py-1 transition-colors ${
                  isQuietMist
                    ? "border-[#d8d1c2] bg-[#eae4d6]"
                    : "border-zinc-800 bg-zinc-900/50"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isQuietMist ? "bg-emerald-600" : "bg-zinc-400"
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      isQuietMist ? "bg-emerald-600" : "bg-zinc-200"
                    }`}
                  ></span>
                </span>
                <span
                  className={`text-[10px] tracking-wider font-mono-tech uppercase font-medium ${
                    isQuietMist ? "text-[#1e293b]" : "text-zinc-300"
                  }`}
                >
                  {tNav.available}
                </span>
              </div>

              {/* Bilingual Language Switcher (EN // AR) */}
              <button
                type="button"
                onClick={toggleLanguage}
                title={isArabic ? "Switch to English" : "التبديل إلى اللغة العربية"}
                className={`p-1.5 border transition-colors flex items-center gap-1.5 font-mono-tech text-[10px] ${
                  isQuietMist
                    ? "border-[#d8d1c2] bg-[#eae4d6] text-[#1e293b] hover:bg-[#ded6c5]"
                    : "border-zinc-800 hover:border-zinc-600 bg-zinc-950 text-zinc-300 hover:text-white"
                }`}
              >
                <Globe size={13} className={isArabic ? "text-emerald-400" : "text-zinc-400"} />
                <span className="font-semibold">{tNav.langToggle}</span>
              </button>

              {/* Audio feedback toggle */}
              <button
                type="button"
                onClick={toggleSound}
                title={soundActive ? tNav.muteAudio : tNav.enableAudio}
                className={`p-1.5 border transition-colors ${
                  soundActive
                    ? "border-zinc-300 bg-zinc-100 text-black"
                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400"
                }`}
              >
                {soundActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>

              {/* Quiet Mist Watercolor Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isQuietMist ? "Return to Strict Monochrome" : "Activate Quiet Mist (Watercolor Theme)"}
                className={`p-1.5 border transition-colors flex items-center gap-1.5 font-mono-tech text-[10px] ${
                  isQuietMist
                    ? "border-[#385a7c] bg-[#2c3746] text-[#f5f3ec]"
                    : "border-zinc-800 hover:border-zinc-600 bg-zinc-950 text-zinc-400 hover:text-white"
                }`}
              >
                <Coffee size={13} className={isQuietMist ? "text-[#e2b170]" : "text-zinc-400"} />
                <span className="hidden sm:inline font-semibold">{isQuietMist ? tNav.mistTheme : tNav.monoTheme}</span>
              </button>

              {/* Quick CV Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playConfirm();
                  onOpenCvModal();
                }}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs border border-zinc-700 hover:border-zinc-300 bg-zinc-900 hover:bg-zinc-100 hover:text-black text-zinc-200 transition-all font-mono-tech"
              >
                <span>{tNav.cvSpec}</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playTick(850);
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-1.5 border border-zinc-800 hover:border-zinc-700 text-zinc-300 bg-zinc-950"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl pt-16 px-6 flex flex-col justify-between pb-10 border-b border-zinc-800">
          <div className="space-y-4 pt-6">
            <div className="text-[11px] font-mono-tech text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-2">
              // TELEMETRY INDEX
            </div>
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-3 border border-zinc-800/80 bg-zinc-950 hover:bg-zinc-900 text-zinc-200 hover:text-white transition-colors font-mono-tech"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 text-xs">[{link.num}]</span>
                    <span className="text-sm font-semibold tracking-wide">{link.label}</span>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-500" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3 font-mono-tech text-xs pt-6 border-t border-zinc-900">
            <div className="flex items-center justify-between text-zinc-400">
              <span>LOCAL TIME (DAM):</span>
              <span className="text-zinc-200">{timeDamietta}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>STATUS:</span>
              <span className="text-zinc-200">AVAILABLE FOR ROLES</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="flex-1 py-2.5 px-3 border border-zinc-600 bg-zinc-100 text-black font-semibold text-center hover:bg-white transition-colors"
              >
                [VIEW CV SPEC]
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
