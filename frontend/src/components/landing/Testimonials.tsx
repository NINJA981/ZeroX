"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { quote: "Finally, legal guidance I can actually understand.", author: "Student" },
  { quote: "It helped me understand my employment rights before taking action.", author: "Working Professional" },
  { quote: "I knew exactly which authority to approach.", author: "Tenant" },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal">Voices</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Clarity people trust
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <Quote className="h-7 w-7 text-teal/40" />
            <p className="mt-4 text-lg font-medium leading-relaxed text-foreground">
              "{t.quote}"
            </p>
            <footer className="mt-4 text-sm font-semibold text-muted-foreground">
              â€” {t.author}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
