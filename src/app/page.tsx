"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { TechMatrix } from "@/components/TechMatrix";
import { Projects } from "@/components/Projects";
import { Academic } from "@/components/Academic";
import { TerminalSection } from "@/components/TerminalSection";
import { Footer } from "@/components/Footer";
import { CvModal } from "@/components/CvModal";
import { CustomCursor } from "@/components/CustomCursor";
import { GravityWellBackground } from "@/components/GravityWellBackground";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

function MainContent() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleOpenTerminal = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen transition-colors duration-300">
      {/* Full-Page Interactive Gravity Well Dust Particles Canvas */}
      <GravityWellBackground />

      {/* Subtle Crosshair Custom Cursor on Desktop */}
      <CustomCursor />

      {/* Floating HUD Navbar with Quiet Mist Theme Toggle */}
      <Navbar
        onOpenCvModal={() => setCvModalOpen(true)}
        onOpenTerminalModal={handleOpenTerminal}
      />

      {/* Main Content Assembly */}
      <main className="relative z-10">
        <Hero
          onOpenCvModal={() => setCvModalOpen(true)}
          onOpenTerminalModal={handleOpenTerminal}
        />
        <Marquee />
        <About />
        <Experience />
        <TechMatrix />
        <Projects />
        <Academic />
        <TerminalSection />
      </main>

      {/* Architectural Colophon Footer */}
      <Footer />

      {/* Printable / Downloadable CV Spec Sheet Modal */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
