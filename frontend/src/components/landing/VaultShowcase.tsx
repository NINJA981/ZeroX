"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Folder, 
  Users, 
  Shield, 
  UploadCloud, 
  ChevronRight, 
  CheckCircle2, 
  Lock,
  MoreHorizontal
} from "lucide-react";

const docs = [
  { name: "Employment_Contract_2024.pdf", date: "Today, 10:42 AM", status: "Analyzed", size: "2.4 MB" },
  { name: "NDA_TechCorp.docx", date: "Yesterday, 2:15 PM", status: "Processing", size: "1.1 MB" },
  { name: "Apartment_Lease_Agreement.pdf", date: "Mar 12, 2024", status: "Analyzed", size: "840 KB" },
  { name: "Tax_Returns_2023.pdf", date: "Feb 28, 2024", status: "Encrypted", size: "3.2 MB" },
];

export function VaultShowcase() {
  return (
    <section id="legal-vault" className="relative overflow-hidden bg-muted/30 py-32 border-t border-border">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-12">
        
        {/* Left Side: File Manager UI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 lg:order-1 order-2"
        >
          <div className="rounded-2xl border border-border bg-background shadow-elegant overflow-hidden flex h-[500px] flex-col sm:flex-row">
            
            {/* Sidebar */}
            <div className="hidden sm:flex w-56 bg-muted/30 border-r border-border flex-col p-4">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex space-x-1.5">
                  <div className="h-3 w-3 rounded-full bg-border" />
                  <div className="h-3 w-3 rounded-full bg-border" />
                  <div className="h-3 w-3 rounded-full bg-border" />
                </div>
              </div>
              
              <nav className="space-y-1">
                <div className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-foreground bg-background rounded-lg shadow-sm border border-border">
                  <Folder className="h-4 w-4 text-primary" /> My Files
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <Users className="h-4 w-4" /> Shared
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <Shield className="h-4 w-4" /> Vault
                </div>
              </nav>
              
              <div className="mt-auto">
                <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                  <span>Storage</span>
                  <span>12%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-[12%] bg-primary rounded-full" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-background min-w-0">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground whitespace-nowrap overflow-hidden">
                  <span className="truncate">My Files</span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                  <span className="text-foreground font-semibold truncate">Legal Docs</span>
                </div>
                <button className="shrink-0 ml-4 flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-[13px] font-medium text-background shadow-sm transition-colors hover:bg-primary/90">
                  <UploadCloud className="h-4 w-4" /> <span className="hidden sm:inline">Upload</span>
                </button>
              </div>
              
              {/* File List */}
              <div className="flex-1 p-0 overflow-y-auto">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-muted/30 sticky top-0 backdrop-blur-sm z-10">
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-2.5 px-4 font-medium">Name</th>
                      <th className="py-2.5 px-4 font-medium hidden md:table-cell">Modified</th>
                      <th className="py-2.5 px-4 font-medium">Status</th>
                      <th className="py-2.5 px-4 font-medium w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.map((d, i) => (
                      <motion.tr 
                        key={d.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="border-b border-border/50 hover:bg-muted/30 transition-colors group cursor-pointer"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted border border-border text-muted-foreground group-hover:text-primary transition-colors">
                              <FileText className="h-4 w-4" />
                            </span>
                            <div className="flex flex-col min-w-0">
                              <span className="font-medium text-foreground truncate max-w-[120px] sm:max-w-[200px]">{d.name}</span>
                              <span className="text-[11px] text-muted-foreground md:hidden">{d.date}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                          {d.date}
                        </td>
                        <td className="py-3 px-4">
                          {d.status === "Analyzed" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success border border-success/20">
                              <CheckCircle2 className="h-3 w-3" /> Analyzed
                            </span>
                          )}
                          {d.status === "Processing" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[11px] font-medium text-warning border border-warning/20">
                              <div className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" /> Processing
                            </span>
                          )}
                          {d.status === "Encrypted" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border">
                              <Lock className="h-3 w-3" /> Encrypted
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Right Side: Copy */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 lg:pl-6 lg:order-2 order-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-secondary"></span>
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              Legal Vault
            </span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            Your documents, understood in context.
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-muted-foreground">
            Our AI analyzes your personal agreements against current Indian law to provide
            personalized guidance. Not just generic answers, but insight
            grounded in the exact clauses you signed.
          </p>
          
          <ul className="mt-8 space-y-4">
            {[
              "Clause-by-clause comparison against applicable law.",
              "Private and encrypted — your documents stays yours.",
              "Reused across every analysis for tailored results.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] font-medium text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-xs text-success border border-success/30">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
        
      </div>
    </section>
  );
}
