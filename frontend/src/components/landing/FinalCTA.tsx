"use client";

import { motion } from "framer-motion";
import { FolderUp } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-primary px-6 py-16 text-center shadow-elegant sm:px-12"
      >
        <div className="legal-grid absolute inset-0 opacity-20" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-navy/40 blur-3xl" />

        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-teal-foreground sm:text-5xl">
            Ready to Understand Your Rights?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-teal-foreground/85">
            Get an explainable, personalized compliance report grounded in
            official legal sources â€” in minutes.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-background px-6 py-3.5 text-sm font-semibold text-foreground shadow-soft transition-transform hover:scale-[1.03]"
            >
              ðŸš€ Analyze My Situation
            </a>
            <a
              href="#legal-vault"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-teal-foreground/40 bg-transparent px-6 py-3.5 text-sm font-semibold text-teal-foreground transition-colors hover:bg-background/10"
            >
              <FolderUp className="h-4 w-4" /> Upload My Documents
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
