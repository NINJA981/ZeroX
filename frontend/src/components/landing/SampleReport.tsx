"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

const sections = [
  { title: "Case Summary", body: "Employee terminated without the statutory notice period and denied final settlement." },
  { title: "Rights Involved", body: "Article 14 (Equality), Article 21 (Livelihood as part of life & liberty)." },
  { title: "Applicable Laws", body: "Industrial Disputes Act, 1947; applicable State Labour Code provisions." },
  { title: "Relevant Contract Clauses", body: "Clause 7.2 â€” Notice period of 30 days required prior to termination." },
  { title: "Compliance Status", body: "ðŸŸ¡ Needs Review â€” employer action appears non-compliant with notice terms." },
  { title: "Reasoning", body: "Termination without notice contravenes both the signed contract and statutory protections." },
  { title: "Evidence Checklist", body: "Appointment letter, termination email, salary slips, communication records." },
  { title: "Recommended Authority", body: "Labour Commissioner / Labour Court for conciliation and adjudication." },
];

export function SampleReport() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal">The outcome</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          A sample compliance report
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Every analysis produces a clear, explainable report you can read,
          share, and act on.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-elegant"
      >
        <div className="flex items-center justify-between bg-gradient-primary px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-teal-foreground/80">
              Legal Compliance Report
            </p>
            <p className="font-display text-lg font-bold text-teal-foreground">
              Wrongful Termination Analysis
            </p>
          </div>
          <span className="rounded-full bg-background/20 px-3 py-1 text-xs font-semibold text-teal-foreground">
            94% confidence
          </span>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2">
          {sections.map((s) => (
            <div key={s.title} className="bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                {s.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-5 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            Official References: Constitution of India Â· India Code Â· Industrial Disputes Act
          </p>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-teal-foreground shadow-soft transition-transform hover:scale-[1.03]">
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>
      </motion.div>
    </section>
  );
}
