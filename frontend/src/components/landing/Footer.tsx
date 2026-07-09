"use client";

import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

const links = ["Features", "Privacy", "Terms", "Legal Disclaimer", "GitHub", "Hackathon"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Explainable AI legal intelligence for legal awareness and decision
              support. Not a substitute for professional legal advice.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a
                key={l}
                href="#top"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            Â© {new Date().getFullYear()} Sahur AI. All rights reserved.
          </p>
          <div className="flex gap-2">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-teal/40 hover:text-teal"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
