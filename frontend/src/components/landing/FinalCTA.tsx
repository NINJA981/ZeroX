"use client";

import { motion } from "framer-motion";

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
          <div className="mt-8 flex justify-center">
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl bg-background px-8 py-4 text-[15px] font-semibold text-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Analyze My Situation
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
