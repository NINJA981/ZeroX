"use client";

import { motion } from "framer-motion";
import { FolderLock, ShieldCheck, FileSearch } from "lucide-react";

export function BentoFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Intelligence that works for you.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[18px] text-muted-foreground">
          Built securely on verifiable legal frameworks and your personal context.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Large Cell: Personal Legal Vault */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="col-span-1 flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:col-span-2"
        >
          <div className="p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
              <FolderLock className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-foreground">Personal Legal Vault</h3>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted-foreground">
              Upload contracts, notices, and agreements securely. Sahur AI parses your documents and extracts critical clauses to ground its compliance analysis in your exact reality.
            </p>
          </div>
          <div className="mt-auto flex flex-1 items-end justify-end p-6 md:p-10">
            {/* Visual representation of a secure vault/document */}
            <div className="relative w-full max-w-xs overflow-hidden rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3 border-b border-border/50 pb-3">
                <div className="h-8 w-8 rounded bg-teal-100 dark:bg-teal-900/40" />
                <div className="space-y-1.5">
                  <div className="h-2 w-24 rounded bg-border" />
                  <div className="h-2 w-16 rounded bg-border/60" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full rounded bg-border/40" />
                <div className="h-2 w-4/5 rounded bg-border/40" />
                <div className="h-2 w-full rounded bg-border/40" />
                <div className="h-2 w-2/3 rounded bg-border/40" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Medium Cell: Explainable AI */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-1 flex flex-col overflow-hidden rounded-3xl border border-border bg-slate-900 shadow-sm dark:bg-card"
        >
          <div className="p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white dark:bg-primary/10 dark:text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-white dark:text-foreground">Explainable AI</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-slate-300 dark:text-muted-foreground">
              No black-box answers. Every compliance report cites the exact constitutional rights and statutory laws applicable to your case.
            </p>
          </div>
        </motion.div>

        {/* Medium Cell: Document Intelligence */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:col-span-3 lg:col-span-1"
        >
          <div className="p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <FileSearch className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-foreground">Clause Intelligence</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
              Automatically flags mismatches between your signed agreements and statutory labor or tenancy laws.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
