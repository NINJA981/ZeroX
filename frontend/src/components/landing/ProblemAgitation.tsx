"use client";

import { motion } from "framer-motion";
import { FileText, Briefcase, ShoppingCart } from "lucide-react";

const problems = [
  {
    icon: FileText,
    title: "Tenancy Disputes",
    description: "Unfair eviction notices, withheld security deposits, or illegal rent hikes without proper legal grounding.",
  },
  {
    icon: Briefcase,
    title: "Workplace Exploitation",
    description: "Unpaid wages, illegal termination clauses, or forced resignations wrapped in confusing contract jargon.",
  },
  {
    icon: ShoppingCart,
    title: "Consumer Rights",
    description: "Defective products, misleading advertisements, and unresponsive sellers leaving you with no clear recourse.",
  },
];

export function ProblemAgitation() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            The law is complex.<br />
            <span className="text-muted-foreground">Your situation shouldn&apos;t be.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-md text-[18px] leading-relaxed text-muted-foreground"
          >
            Every day, citizens face legal challenges where their constitutional and statutory rights are unclear. Without expensive legal counsel, you&apos;re left guessing.
          </motion.p>
        </div>

        <div className="grid gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                <problem.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-foreground">{problem.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
