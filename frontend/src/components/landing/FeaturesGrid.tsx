"use client";

import { motion } from "framer-motion";
import { Scale, ScrollText, FolderLock, BrainCircuit, FileText, Landmark, ListChecks } from "lucide-react";
import { ElementType } from "react";

const features: { icon: ElementType, title: string, desc: string }[] = [
  { icon: Scale, title: "Constitution Mapping", desc: "Instantly identify fundamental rights relevant to your situation." },
  { icon: FolderLock, title: "Personal Legal Vault", desc: "Securely store and reference your personal legal documents." },
  { icon: BrainCircuit, title: "Explainable AI", desc: "Every conclusion comes with transparent, sourced reasoning." },
  { icon: FileText, title: "Compliance Reports", desc: "Generate a polished, shareable dashboard of your legal standing." },
  { icon: Landmark, title: "Authority Recommendations", desc: "Know exactly which regulatory body to approach next." },
  { icon: ListChecks, title: "Evidence Checklist", desc: "A clear list of documents needed to strengthen your case." },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-32">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Everything you need to understand your rights.
        </h2>
      </div>

      <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[24px] border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-all duration-500 group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary-foreground">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="text-[18px] font-semibold text-foreground">{f.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
