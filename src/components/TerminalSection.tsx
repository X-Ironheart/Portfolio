"use client";

import React, { useState, useRef, useEffect } from "react";
import { soundManager } from "@/utils/soundManager";
import { getPortfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import {
  Terminal as TerminalIcon,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Send,
  CornerDownLeft,
  Trash2,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export const TerminalSection: React.FC = () => {
  const { language } = useLanguage();
  const portfolioData = getPortfolioData(language);
  const tTerm = UI_TRANSLATIONS[language].terminal;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Terminal state
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<Array<{ text: string; type: "input" | "output" | "error" | "system" }>>([
    {
      type: "system",
      text:
        language === "AR"
          ? "نواة محمد طاهر [v2.4.0-release] (x86_64-systems-damietta)\nاكتب 'help' لعرض الأوامر المتاحة أو اضغط على الأزرار السريعة أدناه."
          : "MOHAMED_TAHER KERNEL [v2.4.0-release] (x86_64-systems-damietta)\nType 'help' for available system commands or click the shortcut chips below.",
    },
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    soundManager.playConfirm();
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    soundManager.playKeypress();
    const cmd = rawCmd.toLowerCase();
    const newHistory = [...history, { type: "input" as const, text: `$ ${rawCmd}` }];

    if (cmd === "clear" || cmd === "cls") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let output = "";
    let outType: "output" | "error" = "output";

    switch (cmd) {
      case "help":
        output =
          language === "AR"
            ? `دليل أوامر النظام المتاحة:
  help       - عرض قائمة الأوامر
  about      - نبذة هندسية عن محمد طاهر
  skills     - استعراض مصفوفة الكفاءة التقنية
  exp        - استعراض سجل الخبرة وإدارة الأنظمة
  projects   - استعلام أرشيف البرمجيات والأنظمة
  contact    - إحداثيات وقنوات التواصل المباشر
  email      - البريد الإلكتروني الرسمي
  phone      - رقم الهاتف والتواصل
  github     - رابط مستودع جيت هاب
  time       - توقيت دمياط المحلي
  clear      - مسح شاشة الطرفية`
            : `AVAILABLE SYSTEM INSTRUCTIONS:
  help       - Print this command directory
  about      - Display Mohamed Taher's engineering overview
  skills     - Dump technical competency matrix
  exp        - Inspect employment & system administration roles
  projects   - Query software & hardware archives
  contact    - Retrieve verified communication coordinates
  email      - Output primary email address
  phone      - Output primary contact phone
  github     - Display GitHub repository coordinates
  time       - Display Damietta local system time
  clear      - Clear terminal screen buffer`;
        break;

      case "about":
        output =
          language === "AR"
            ? `محمد طاهر // هندسة حاسبات ونظم تحكم [جامعة حورس 2030]
الدور: أخصائي نظم وتكنولوجيا معلومات بشركة الهدى | مهندس مستقل
التخصص: بنية C منخفضة المستوى، مزامنة Odoo ERP وShopify، وهندسة واجهات الويب التفاعلية.
التقدير: امتياز مستمر.`
            : `MOHAMED TAHER // CSE [HORUS UNIVERSITY 2030]
Role: Systems & IT Specialist @ El-Hoda IT | Independent Engineer
Focus: Low-level C architecture, Odoo ERP & Shopify synchronization, tactile brutalist web engineering.
Track: Distinction ("Excellent" continuous record).`;
        break;

      case "skills":
        output =
          language === "AR"
            ? `المصفوفة الأساسية:
  [C / الأنظمة]       ANSI C99/C11، المؤشرات، مخصصات الذاكرة، نداءات النظام POSIX
  [هياكل البيانات]    أشجار AVL/BST، جداول التجزئة، تعقب الرسوم البيانية، تحليل التعقيد
  [الواجهات الأمامية] Next.js، React 19، TypeScript، Tailwind CSS v4
  [أنظمة المؤسسات]    Odoo ERP، بنية Shopify، أتمتة المخزون والمزامنة
  [الهاردوير]         فحص الدوائر الإلكترونية، اللحام الدقيق، شاشة المنفذ التسلسلي
  [اللغات]            العربية (الأم)، الإنجليزية (C1 طلاقة)، الروسية (A1)`
            : `CORE MATRIX:
  [C / Systems]  ANSI C99/C11, Pointers, Memory Allocators, POSIX Syscalls
  [Data Struct]  AVL/BST Trees, Hash Tables, Graph Traversal, Big-O Analysis
  [Frontend]     Next.js, React 19, TypeScript Strict, Tailwind CSS v4
  [Enterprise]   Odoo ERP, Shopify Infrastructure, Inventory Automation
  [Hardware]     PCB Diagnostics, Component Soldering, Serial Monitor
  [Languages]    Arabic (Native), English (C1 Fluent), Russian (A1)`;
        break;

      case "exp":
        output =
          language === "AR"
            ? `سجل الأدوار التشغيلية:
  [1] شركة الهدى للكمبيوتر وتكنولوجيا المعلومات (أغسطس 2025 - حتى الآن)
      أخصائي دعم فني ونظم (Odoo ERP، Shopify، صيانة وفحص)
  [2] هندسة مستقلة وبرمجة حرة (2024 - حتى الآن)
      مهندس برمجيات وواجهات وسائط (خوارزميات C، تطبيقات ويب، DaVinci)
  [3] مركز الدالي للإلكترونيات (2023)
      متدرب فني إلكترونيات (لحام إلكتروني دقيق، إصلاح لوحات SMD)`
            : `CURATED OPERATIONAL ROLES:
  [1] El-Hoda Computer & IT Services (Aug 2025 - Present)
      IT Support & Technical Specialist (Odoo ERP, Shopify, Diagnostics)
  [2] Freelance & Independent Engineering (2024 - Present)
      Full-Stack / Frontend & Media Engineer (C algorithms, Web apps, DaVinci)
  [3] El-Daly Electronics Center (2023)
      Electronics Technician Intern (Micro-soldering, SMD board repairs)`;
        break;

      case "projects":
        output =
          language === "AR"
            ? `أرشيف المشاريع:
  [1] جسر مزامنة Odoo ERP مع Shopify (خادم مزامنة تجاري)
  [2] مخصص ذاكرة مخصص في لغة C مع شجرة AVL (مخصص منخفض المستوى)
  [3] محرك ويب معماري تجريبي (واجهة هندسية فائقة الدقة)
  [4] وحدة تحكم وفحص عبر المنفذ التسلسلي UART (مراقب الإشارات)
  [5] معالجة وتدرج لوني سينمائي (DaVinci Resolve ACEScc)`
            : `PROJECT REPOSITORY:
  [1] Odoo ERP to Shopify Sync Bridge (Enterprise Sync Daemon)
  [2] C Custom Memory Allocator & AVL Tree (Low-level Allocator)
  [3] Avant-Garde Architectural Web Engine (Tactile Web Architecture)
  [4] Hardware Serial & Diagnostic Controller (UART Signal Monitor)
  [5] Cinematic Grade & Color Pipeline (DaVinci Resolve ACEScc)`;
        break;

      case "contact":
        output = `DIRECT CHANNELS:
  Email:    ${portfolioData.personal.email}
  Phone:    ${portfolioData.personal.phone}
  Location: ${portfolioData.personal.location}
  GitHub:   github.com/${portfolioData.personal.githubHandle}`;
        break;

      case "email":
        output = `EMAIL: ${portfolioData.personal.email}`;
        break;

      case "phone":
        output = `PHONE / WHATSAPP: ${portfolioData.personal.phone}`;
        break;

      case "github":
        output = `GITHUB: ${portfolioData.personal.github}`;
        break;

      case "time":
        output = `DAMIETTA LOCAL TIME: ${new Date().toLocaleTimeString(language === "AR" ? "ar-EG" : "en-GB", {
          timeZone: "Africa/Cairo",
        })} (UTC+2 / EET)`;
        break;

      case "sudo":
        output =
          language === "AR"
            ? `تم رفض الإذن: المستخدم يعمل بالفعل بامتيازات النواة العليا CSE.`
            : `Permission denied: User is already operating in high-privilege CSE kernel mode.`;
        break;

      default:
        if (cmd.startsWith("echo ")) {
          output = rawCmd.substring(5);
        } else {
          output =
            language === "AR"
              ? `أمر غير معروف: '${rawCmd}'. اكتب 'help' لمراجعة الأوامر المتاحة.`
              : `Command not recognized: '${rawCmd}'. Type 'help' to review syntax.`;
          outType = "error";
        }
    }

    newHistory.push({ type: outType, text: output });
    setHistory(newHistory);
    setInputVal("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formMessage) return;

    soundManager.playConfirm();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormMessage("");
    }, 1500);
  };

  const shortcutChips = ["help", "about", "skills", "exp", "projects", "contact", "clear"];

  return (
    <section id="contact" className="py-20 md:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-2 py-1 bg-zinc-950">
            {tTerm.tag}
          </span>
          <div className="h-[1px] flex-1 bg-zinc-800/80" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              {tTerm.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              {tTerm.subtitle}
            </p>
          </div>
          <div className="font-mono-tech text-xs text-zinc-500 border border-zinc-800 px-3 py-1.5 self-start md:self-auto bg-zinc-950">
            {tTerm.latency}
          </div>
        </div>

        {/* 2-Column Grid: Contact Spec Cards + Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Minimal Contact Card & Transmission Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Copy Coordinates Card */}
            <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-5 hover:border-zinc-600 transition-colors">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-mono-tech text-xs text-zinc-300 font-semibold tracking-wider uppercase">
                  {tTerm.verifiedChannels}
                </span>
                <span className="font-mono-tech text-[10px] text-zinc-500">
                  {tTerm.oneClickCopy}
                </span>
              </div>

              {/* Email One-Click Copy */}
              <div className="border border-zinc-900 p-3.5 bg-zinc-900/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono-tech text-zinc-500 uppercase">
                      {tTerm.electronicMail}
                    </div>
                    <div className="text-zinc-200 text-xs sm:text-sm font-mono-tech truncate font-semibold" dir="ltr">
                      {portfolioData.personal.email}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(portfolioData.personal.email, "email")}
                  className="tactile-btn p-2 border border-zinc-800 hover:border-zinc-400 bg-zinc-950 text-zinc-300 hover:text-white shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Phone One-Click Copy */}
              <div className="border border-zinc-900 p-3.5 bg-zinc-900/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-400 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono-tech text-zinc-500 uppercase">
                      {tTerm.phoneWhatsApp}
                    </div>
                    <div className="text-zinc-200 text-xs sm:text-sm font-mono-tech truncate font-semibold" dir="ltr">
                      {portfolioData.personal.phone}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(portfolioData.personal.phone, "phone")}
                  className="tactile-btn p-2 border border-zinc-800 hover:border-zinc-400 bg-zinc-950 text-zinc-300 hover:text-white shrink-0"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Location & Social Row */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono-tech text-xs">
                <div className="border border-zinc-900 p-3 bg-zinc-900/20">
                  <div className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                    <MapPin size={11} /> {tTerm.location}
                  </div>
                  <div className="text-zinc-200 mt-1 font-semibold">
                    {portfolioData.personal.location}
                  </div>
                </div>

                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playTick(900)}
                  className="border border-zinc-900 hover:border-zinc-600 p-3 bg-zinc-900/20 text-zinc-300 hover:text-white transition-colors"
                >
                  <div className="text-zinc-500 text-[10px] uppercase flex items-center gap-1">
                    <GithubIcon size={11} /> {tTerm.github}
                  </div>
                  <div className="text-zinc-200 mt-1 font-semibold truncate" dir="ltr">
                    /{portfolioData.personal.githubHandle}
                  </div>
                </a>
              </div>
            </div>

            {/* Direct Message Transmission Box */}
            <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-mono-tech text-xs text-zinc-300 font-semibold tracking-wider uppercase">
                  {tTerm.dispatchPacket}
                </span>
                <span className="font-mono-tech text-[10px] text-zinc-500">
                  {tTerm.directForm}
                </span>
              </div>

              {formSubmitted ? (
                <div className="border border-zinc-700 p-5 bg-zinc-900/50 text-center space-y-2 font-mono-tech text-xs">
                  <div className="text-white font-bold flex items-center justify-center gap-2">
                    <Check size={16} /> {tTerm.packetTransmitted}
                  </div>
                  <p className="text-zinc-400">
                    {tTerm.packetLogged}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-3 px-3 py-1.5 border border-zinc-700 bg-zinc-950 text-zinc-300 hover:text-white"
                  >
                    {tTerm.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3 font-mono-tech text-xs">
                  <div>
                    <label className="block text-zinc-500 text-[11px] mb-1">
                      {tTerm.senderId}
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={tTerm.senderPlaceholder}
                      className="w-full bg-[#070707] border border-zinc-800 focus:border-zinc-400 text-zinc-200 px-3 py-2 outline-none font-mono-tech transition-colors placeholder:text-zinc-700"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-500 text-[11px] mb-1">
                      {tTerm.returnEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder={tTerm.emailPlaceholder}
                      className="w-full bg-[#070707] border border-zinc-800 focus:border-zinc-400 text-zinc-200 px-3 py-2 outline-none font-mono-tech transition-colors placeholder:text-zinc-700"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-500 text-[11px] mb-1">
                      {tTerm.payload}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder={tTerm.payloadPlaceholder}
                      className="w-full bg-[#070707] border border-zinc-800 focus:border-zinc-400 text-zinc-200 px-3 py-2 outline-none font-mono-tech transition-colors placeholder:text-zinc-700 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="tactile-btn w-full py-3 bg-zinc-100 hover:bg-white text-black font-semibold font-mono-tech text-xs tracking-wider border border-zinc-200 flex items-center justify-center gap-2 uppercase transition-all"
                  >
                    <span>{tTerm.transmitBtn}</span>
                    <Send size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Interactive CLI Terminal */}
          <div className="lg:col-span-7">
            <div className="border border-zinc-800 bg-[#070707] p-4 sm:p-6 space-y-4 font-mono-tech text-xs hover:border-zinc-600 transition-colors">
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={14} className="text-zinc-300" />
                  <span className="text-zinc-200 font-bold uppercase tracking-wider text-xs">
                    {tTerm.cliTitle}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTick(500);
                      setHistory([]);
                    }}
                    title="Clear Buffer"
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  <span className="w-2 h-2 bg-zinc-400 animate-pulse" />
                </div>
              </div>

              {/* Shortcut Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-zinc-600 text-[10px] mr-1 uppercase">{tTerm.quickInstructions}</span>
                {shortcutChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleCommand(chip)}
                    className="px-2 py-0.5 border border-zinc-800/80 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors text-[10px]"
                  >
                    ${chip}
                  </button>
                ))}
              </div>

              {/* Terminal Screen Buffer */}
              <div className="min-h-[320px] max-h-[460px] overflow-y-auto border border-zinc-900 bg-[#050505] p-4 space-y-3 scanlines" dir="ltr">
                {history.map((line, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {line.type === "input" && (
                      <div className="text-zinc-100 font-semibold">{line.text}</div>
                    )}
                    {line.type === "output" && (
                      <div className="text-zinc-300 whitespace-pre-wrap">{line.text}</div>
                    )}
                    {line.type === "system" && (
                      <div className="text-zinc-500 whitespace-pre-wrap">{line.text}</div>
                    )}
                    {line.type === "error" && (
                      <div className="text-zinc-400 italic">{line.text}</div>
                    )}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

              {/* Command Line Input Field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(inputVal);
                }}
                className="flex items-center gap-2 border border-zinc-800 bg-[#0a0a0a] p-2 focus-within:border-zinc-400 transition-colors"
                dir="ltr"
              >
                <span className="text-zinc-500 font-bold select-none">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={tTerm.inputPlaceholder}
                  className="flex-1 bg-transparent text-zinc-100 outline-none text-xs font-mono-tech placeholder:text-zinc-700"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 border border-zinc-800 hover:border-zinc-500 bg-zinc-900 text-zinc-300 hover:text-white transition-colors text-[10px] flex items-center gap-1"
                >
                  <span>{tTerm.exec}</span>
                  <CornerDownLeft size={11} />
                </button>
              </form>

              {/* Terminal Status Footer */}
              <div className="flex items-center justify-between text-[10px] text-zinc-600 border-t border-zinc-900 pt-2">
                <span>{tTerm.bufferStatus}</span>
                <span>{tTerm.asciiStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
