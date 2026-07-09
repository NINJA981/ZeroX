"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Sahur AI helped me understand my tenancy rights when my landlord tried to evict me illegally. The compliance report gave me the confidence to stand my ground.",
    author: "Rahul S., Tenant",
  },
  {
    quote: "I uploaded my employment contract and found two clauses that violated state labor laws. Sahur AI pointed me exactly to the right authority.",
    author: "Priya M., Software Engineer",
  },
  {
    quote: "The explainable AI feature is brilliant. It doesn't just give you an answer; it shows you exactly which article of the Constitution protects you.",
    author: "Arjun K., Law Student",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Empowering citizens with legal clarity.
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
              &quot;{t.quote}&quot;
            </p>
            <footer className="mt-4 text-sm font-semibold text-muted-foreground">
              &mdash; {t.author}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
