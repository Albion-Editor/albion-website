"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Menu, X as CloseIcon } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Models", href: "#models" },
  { label: "Pricing", href: "#pricing" },
  { label: "Download", href: "#download" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  // Scroll detection for faint shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sections = ["features", "models", "pricing", "download"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: "-20% 0px -70% 0px" }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Escape key handler & focus trap for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 h-[68px] bg-white border-b border-slate-200 transition-shadow duration-200 ${
        isScrolled ? "shadow-[0_2px_12px_rgba(15,23,42,0.06)]" : ""
      }`}
      role="banner"
    >
      <div className="max-w-container mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Logo + Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Albion IDE Homepage">
          <div className="w-8 h-8 relative flex items-center justify-center">
            <Image
              src="/albion-logo.svg"
              alt="Albion Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              priority
            />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-navy-ink">
            Albion
          </span>
        </Link>

        {/* Center: In-page Nav Links with Scroll-Spy Underline */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-navy-ink font-semibold" : "text-slate-600 hover:text-navy-ink"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: X Link & Primary Download Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://x.com/albion_ide"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Albion on X"
            className="w-9 h-9 rounded-control border border-slate-200 flex items-center justify-center text-slate-700 hover:text-navy-ink hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            {/* Real X icon */}
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="#download"
            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-control bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 stroke-[2]" aria-hidden="true" />
            <span>Download</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-control text-slate-700 hover:text-navy-ink hover:bg-slate-100"
            aria-label="Open mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6 stroke-[1.75]" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-white animate-in fade-in duration-200 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          ref={mobileDrawerRef}
        >
          {/* Mobile Sheet Header */}
          <div className="h-[68px] px-6 border-b border-slate-200 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <Image src="/albion-logo.svg" alt="Albion Logo" width={28} height={28} />
              <span className="font-display font-bold text-lg text-navy-ink">Albion</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-control text-slate-700 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <CloseIcon className="w-6 h-6 stroke-[1.75]" />
            </button>
          </div>

          {/* Mobile Sheet Nav Items */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold text-slate-800 hover:text-blue-500 py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pt-6 border-t border-slate-200">
              <a
                href="#download"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-11 flex items-center justify-center gap-2 rounded-control bg-blue-500 text-white font-semibold text-sm shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Albion</span>
              </a>
              <a
                href="https://x.com/albion_ide"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 flex items-center justify-center gap-2 rounded-control border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Follow @albion_ide</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
