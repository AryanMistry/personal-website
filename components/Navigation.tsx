"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import SocialLinks from "./SocialLinks";

const navLinks = [
  { href: "/#about", label: "about" },
  { href: "/#experience", label: "experience" },
  { href: "/#education", label: "education" },
  { href: "/#projects", label: "projects" },
  { href: "/#ctf", label: "ctf" },
  { href: "/posts", label: "posts" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");
  const pathname = usePathname();
  const isScrollingProgrammatically = useRef(false);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash || "#about");
    };

    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;
      if (pathname !== "/") return;
      const sections = navLinks
        .filter((l) => l.href.startsWith("/#"))
        .map((link) => link.href.replace("/#", ""));
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          const newHash = `#${sections[i]}`;
          setActiveSection(newHash);
          if (window.location.hash !== newHash) {
            window.history.replaceState(null, "", newHash);
          }
          break;
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      return;
    }
    e.preventDefault();
    const hash = href.startsWith("/#") ? href.slice(1) : href;
    setActiveSection(hash);
    const element = document.querySelector(hash);
    if (element) {
      isScrollingProgrammatically.current = true;
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 800);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-6 z-50"
    >
      {/* Desktop: sidebar nav — hidden on mobile */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isHome = link.href === "/";
              const isSection = link.href.startsWith("/#");
              const sectionHash = isSection ? link.href.replace("/#", "#") : null;
              const isActive = isHome
                ? pathname === "/" && (!activeSection || activeSection === "#about")
                : isSection
                  ? pathname === "/" &&
                    (activeSection === sectionHash || (!activeSection && link.href === "/#about"))
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              const linkContent = (
                <>
                  <span
                    className={`inline-block relative text-sm transition-colors duration-150 underline-animate ${
                      isActive ? "text-text-primary" : "text-text-secondary"
                    } group-hover:text-text-primary`}
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-text-secondary rounded-full"
                      aria-hidden
                    />
                  )}
                </>
              );
              if (isHome || isSection) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative hoverable group pl-2"
                    onClick={(e) => isSection && handleSectionClick(e as React.MouseEvent<HTMLAnchorElement>, link.href)}
                  >
                    {linkContent}
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative hoverable group pl-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {linkContent}
                </Link>
              );
            })}
          </div>
          <div className="pt-2 border-t border-border">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Mobile: hamburger button */}
      <button
        className="md:hidden fixed top-5 right-5 p-2 text-text-secondary hover:text-text-primary transition-colors duration-150 z-[60] rounded-lg hover:bg-background-secondary"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile: dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-background-primary/80 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-16 left-4 right-4 z-50 bg-background-secondary border border-border rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => {
                  const isHome = link.href === "/";
                  const isSection = link.href.startsWith("/#");
                  const sectionHash = isSection ? link.href.replace("/#", "#") : null;
                  const isActive = isHome
                    ? pathname === "/" && (!activeSection || activeSection === "#about")
                    : isSection
                      ? pathname === "/" &&
                        (activeSection === sectionHash || (!activeSection && link.href === "/#about"))
                      : pathname === link.href || pathname.startsWith(link.href + "/");
                  const className = `block py-3 px-4 rounded-lg text-base transition-colors duration-150 ${
                    isActive
                      ? "text-text-primary bg-background-elevated"
                      : "text-text-secondary hover:text-text-primary hover:bg-background-elevated/50"
                  }`;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={className}
                      onClick={(e) => {
                        if (isSection && pathname === "/") {
                          e.preventDefault();
                          handleSectionClick(e as React.MouseEvent<HTMLAnchorElement>, link.href);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-3 mt-3 border-t border-border">
                  <SocialLinks />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

