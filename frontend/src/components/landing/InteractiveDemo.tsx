"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const examples = [
  { emoji: "ðŸ¢", label: "Employer Issue", text: "My employer terminated me without notice and withheld my final salary." },
  { emoji: "ðŸ ", label: "Rental Dispute", text: "My landlord is refusing to return my security deposit after I moved out." },
  { emoji: "ðŸŽ“", label: "College Complaint", text: "My college is withholding my degree certificate over a disputed fee." },
  { emoji: "ðŸ‘®", label: "Police Action", text: "The police detained me without informing me of the grounds of arrest." },
  { emoji: "ðŸ›’", label: "Consumer Fraud", text: "I received a defective product and the seller refuses a refund." },
];

export function InteractiveDemo() {
  const [value, setValue] = useState("");

  return (
    <section id="demo" className="relative overflow-hidden py-20">
      <div className="legal-grid absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-3xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Try Sahur AI Instantly
        </motion.h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Describe what happened in your own words. No legal jargon needed.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass mt-8 rounded-3xl p-3 shadow-elegant"
        >
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            placeholder="My employer terminated me without notice..."
            className="w-full resize-none rounded-2xl bg-background/70 p-4 text-left text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            aria-label="Describe your legal situation"
          />
          <div className="mt-2 flex justify-end">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-teal-foreground shadow-soft transition-transform hover:scale-[1.03]">
              Analyze My Situation <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        <p className="mt-8 text-sm font-semibold text-muted-foreground">
          Popular examples
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {examples.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setValue(ex.text)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:border-teal hover:shadow-glow"
            >
              <span>{ex.emoji}</span> {ex.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
