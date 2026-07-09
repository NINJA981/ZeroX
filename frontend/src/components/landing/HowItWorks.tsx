"use client";

import { motion } from "framer-motion";
import { MessageSquare, ScanSearch, BookMarked, BrainCircuit, FileCheck2 } from "lucide-react";
import { ElementType } from "react";

const steps: { icon: ElementType, title: string, desc: string }[] = [
  { icon: MessageSquare, title: "User Describes Issue", desc: "Explain your situation in plain English." },
  { icon: ScanSearch, title: "AI Extracts Facts", desc: "Sahur AI identifies the key legal facts and context." },
  { icon: BookMarked, title: "Retrieves Laws & Documents", desc: "Cross-references the constitution, statutes, and your personal vault." },
  { icon: BrainCircuit, title: "Gemini Reasoning", desc: "Advanced AI models synthesize the data with explainable logic." },
  { icon: FileCheck2, title: "Compliance Report", desc: "Receive a polished, dashboard-style report with authority recommendations." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-4xl px-4 py-32">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          How It Works
        </h2>
      </div>

      <div className="relative mt-24">
        {/* Vertical Line */}
        <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:left-1/2 sm:-ml-[0.5px]" />

        <div className="space-y-16">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col gap-6 sm:flex-row sm:items-center ${
                i % 2 !== 0 ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Icon Container */}
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                  <s.icon className="h-8 w-8 text-secondary" />
                </div>
              </div>

              {/* Text Container */}
              <div className={`ml-28 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-20 sm:text-right" : "sm:pl-20 sm:text-left"}`}>
                <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
