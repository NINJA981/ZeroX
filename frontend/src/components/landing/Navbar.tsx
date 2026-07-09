"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Legal Vault", href: "#legal-vault" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
          scrolled ? "glass shadow-soft" : "border border-transparent"
        }`}
      >
        <a href="#top" aria-label="Sahur AI home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#top"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Sign In
          </a>
          <a
            href="#demo"
            className="rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-teal-foreground shadow-soft transition-transform hover:scale-[1.03]"
          >
            Get Started
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 shadow-soft md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a href="#top" className="rounded-xl border border-border px-4 py-2 text-center text-sm font-semibold">
              Sign In
            </a>
            <a href="#demo" className="rounded-xl bg-gradient-primary px-4 py-2 text-center text-sm font-semibold text-teal-foreground">
              Get Started
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
