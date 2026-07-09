"use client";

import { motion } from "framer-motion";
import { FolderUp } from "lucide-react";
import { FloatingComplianceReport } from "./ComplianceReportCard";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-background pt-32 pb-20 sm:pt-40"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/5 via-background to-background" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 lg:grid-cols-2">
        <div>


          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground lg:text-[64px]"
          >
            Know Your Rights.
            <br />
            Before You Take Action.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-[18px] leading-relaxed text-muted-foreground"
          >
            AI-powered constitutional compliance analysis using official legal resources and your own legal documents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-[15px] font-semibold text-primary-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
            >
              Analyze My Situation
            </a>
            <a
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-8 py-4 text-[15px] font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <FolderUp className="h-4 w-4" /> Upload Legal Documents
            </a>
          </motion.div>


        </div>

        <FloatingComplianceReport />
      </div>
    </section>
  );
}
