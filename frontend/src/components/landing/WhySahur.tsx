"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { label: "Answer style", generic: "General answers", sahur: "Official legal references" },
  { label: "Personalization", generic: "No personalization", sahur: "Personal Legal Vault" },
  { label: "Legal grounding", generic: "Limited legal grounding", sahur: "Constitutional analysis" },
  { label: "Transparency", generic: "Opaque responses", sahur: "Explainable reasoning" },
  { label: "Deliverable", generic: "Plain text reply", sahur: "Compliance report" },
  { label: "Next steps", generic: "No guidance", sahur: "Authority recommendation" },
];

export function WhySahur() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal">The difference</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why Sahur AI?
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mt-12 grid gap-5 md:grid-cols-2"
      >
        <div className="rounded-3xl border border-border bg-card p-6">
          <p className="font-display text-lg font-bold text-muted-foreground">Generic AI</p>
          <ul className="mt-5 space-y-3">
            {rows.map((r) => (
              <li key={r.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <X className="h-3.5 w-3.5" />
                </span>
                {r.generic}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-3xl border border-teal/40 bg-card p-6 shadow-glow">
          <span className="absolute -top-3 left-6 rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold text-teal-foreground">
            Recommended
          </span>
          <p className="font-display text-lg font-bold text-foreground">Sahur AI</p>
          <ul className="mt-5 space-y-3">
            {rows.map((r) => (
              <li key={r.label} className="flex items-center gap-3 text-sm font-medium text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {r.sahur}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
