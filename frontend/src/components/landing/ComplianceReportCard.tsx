"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ScrollText, Landmark, Gauge, AlertTriangle, FileText } from "lucide-react";

export function ComplianceReportCard({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 shadow-elegant ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
            <ScrollText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-foreground">
              Compliance Analysis
            </h3>
            <p className="text-xs font-medium text-muted-foreground">
              Generated in 2.4s
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Live
        </span>
      </div>

      {/* Primary Metrics */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <AlertTriangle className="h-3.5 w-3.5" /> Risk Level
          </p>
          <p className="mt-2 text-[15px] font-bold text-warning">Needs Review</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Gauge className="h-3.5 w-3.5" /> Confidence
          </p>
          <p className="mt-2 text-[15px] font-bold text-success">94% High</p>
        </div>
      </div>

      {/* Details List */}
      <div className="mt-5 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Rights Identified</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
              <ShieldCheck className="h-3.5 w-3.5" /> Article 14
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
              <ShieldCheck className="h-3.5 w-3.5" /> Article 21
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Applicable Law</p>
          <div className="flex items-center justify-between rounded-xl border border-border bg-background p-3">
            <p className="text-sm font-medium text-foreground">The Labour Code, 2020</p>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Footer Authority */}
      <div className="mt-6 flex items-center gap-3 rounded-xl bg-primary p-4 text-primary-foreground shadow-sm">
        <Landmark className="h-5 w-5 opacity-80" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
            Recommended Authority
          </p>
          <p className="text-[14px] font-bold">Labour Commissioner</p>
        </div>
      </div>
    </div>
  );
}

export function FloatingComplianceReport() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="animate-float">
        <ComplianceReportCard />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft sm:flex"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
          ✓
        </span>
        <p className="text-xs font-semibold text-foreground">
          Grounded in
          <br /> official law
        </p>
      </motion.div>
    </motion.div>
  );
}
