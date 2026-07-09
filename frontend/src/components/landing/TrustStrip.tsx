"use client";

import { motion } from "framer-motion";
import { BookOpen, Landmark, BrainCircuit, Lock, ShieldCheck, Scale } from "lucide-react";
import { ElementType } from "react";

const badges: { icon: ElementType, label: string }[] = [
  { icon: Scale, label: "Official Sources" },
  { icon: BookOpen, label: "Constitution of India" },
  { icon: Landmark, label: "India Code" },
  { icon: Lock, label: "Secure Storage" },
  { icon: BrainCircuit, label: "Explainable AI" },
  { icon: ShieldCheck, label: "Privacy First" },
];

export function TrustStrip() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-[20px] font-semibold tracking-tight text-foreground">
          Built on a foundation of trusted legal intelligence.
        </h2>
      </motion.div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {badges.map((b, i) => (
          <motion.span
            key={b.label}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-[14px] font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            <b.icon className="h-4 w-4" />
            {b.label}
          </motion.span>
        ))}
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto mt-12 max-w-xl rounded-xl bg-muted/50 px-5 py-4 text-center text-[13px] font-medium text-muted-foreground"
      >
        For legal awareness and decision support only. Not a substitute for professional legal advice.
      </motion.p>
    </section>
  );
}
