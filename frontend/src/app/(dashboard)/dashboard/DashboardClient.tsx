"use client";

import { useState } from "react";
import { AnalysisInput } from "@/components/dashboard/AnalysisInput";
import { ComplianceReport, ComplianceReportData } from "@/components/dashboard/ComplianceReport";
import { ChatDrawer } from "@/components/dashboard/ChatDrawer";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockReportData: ComplianceReportData = {
  documentName: "Employment_Contract_2024.pdf",
  overallVerdict: "warning",
  summary: "The employment contract generally complies with standard labor laws, but contains a few clauses that require attention. Specifically, the non-compete clause is overly broad and the termination notice period is unusually short, which may not be enforceable depending on jurisdiction.",
  clauses: [
    {
      id: "c1",
      originalText: "Employee agrees not to engage in any similar business or employment for a period of 5 years after termination.",
      verdict: "violation",
      explanation: "A 5-year non-compete period is typically considered legally unenforceable and excessively restrictive under standard labor laws, which usually cap such periods to 6-12 months.",
      citedLaw: "Contract Act, Sec 27",
      recommendation: "Negotiate down to a 6-month or 1-year period."
    },
    {
      id: "c2",
      originalText: "The Company may terminate this agreement at any time without prior notice or severance.",
      verdict: "warning",
      explanation: "Unless termination is for 'just cause' (e.g., gross misconduct), labor laws mandate a minimum notice period or severance pay in lieu of notice.",
      citedLaw: "Industrial Disputes Act",
      recommendation: "Request standard 30-day notice or equivalent severance."
    },
    {
      id: "c3",
      originalText: "Standard working hours shall be 40 hours per week, Monday to Friday.",
      verdict: "safe",
      explanation: "This clause is standard and fully compliant with national labor regulations regarding maximum working hours.",
      citedLaw: "Factories Act / Shops and Establishments Act"
    }
  ]
};

export function DashboardClient() {
  const [showReport, setShowReport] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {!showReport ? (
          <motion.div
            key="input-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex min-h-[80vh] flex-col items-center justify-center py-12"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Good evening mahathi/.
              </h1>
              <p className="mt-4 text-[18px] text-muted-foreground max-w-2xl mx-auto">
                What legal situation can we help you understand today? Upload a document or describe your case to get started.
              </p>
            </div>

            <AnalysisInput onSubmit={(query, file) => {
              console.log("Analyzing:", query, "File:", file?.name);
              setShowReport(true);
            }} />
          </motion.div>
        ) : (
          <motion.div
            key="report-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 w-full max-w-6xl mx-auto px-4 sm:px-6"
          >
            <button
              onClick={() => setShowReport(false)}
              className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
            
            <ComplianceReport 
              data={mockReportData} 
              onOpenChat={() => setIsChatOpen(true)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        documentContext={mockReportData.documentName}
      />
    </div>
  );
}
