"use client";

import { useState } from "react";
import { AnalysisInput } from "@/components/dashboard/AnalysisInput";
import { ComplianceReport, ComplianceReportData } from "@/components/dashboard/ComplianceReport";
import { ChatDrawer } from "@/components/dashboard/ChatDrawer";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function DashboardClient() {
  const [showReport, setShowReport] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [reportData, setReportData] = useState<ComplianceReportData | null>(null);

  // Keep original inputs for simulations
  const [originalQuery, setOriginalQuery] = useState("");
  const [documentText, setDocumentText] = useState("");

  const handleAnalyze = async (query: string, file?: File | null) => {
    setIsAnalyzing(true);
    setOriginalQuery(query);
    setShowReport(false);

    try {
      let extractedText = "";

      // 1. Upload and parse file if it exists
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch(`${API_URL}/api/documents/upload`, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Failed to upload document");

        const uploadData = await uploadRes.json();
        extractedText = uploadData.extracted_text;
        setDocumentText(extractedText);
      }

      // 2. Run analysis
      const analyzeRes = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          document_text: extractedText || undefined
        }),
      });

      if (!analyzeRes.ok) throw new Error("Failed to analyze");

      const report = await analyzeRes.json();
      // Inject document name for the UI
      report.documentName = file ? file.name : "Text Scenario Analysis";

      setReportData(report);
      setShowReport(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSimulate = async (scenario: string) => {
    setIsSimulating(true);
    try {
      const simulateRes = await fetch(`${API_URL}/api/simulate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          original_query: originalQuery,
          scenario: scenario,
          document_text: documentText || undefined
        }),
      });

      if (!simulateRes.ok) throw new Error("Failed to simulate");

      const newReport = await simulateRes.json();
      newReport.documentName = reportData?.documentName || "Simulated Scenario";

      setReportData(newReport);
    } catch (error) {
      console.error(error);
      alert("Failed to run simulation.");
    } finally {
      setIsSimulating(false);
    }
  };

  const handleAnswerMissingInfo = async (answers: string[]) => {
    if (!reportData?.missingInfo) return;

    // Combine original query with the questions and answers
    let extraContext = "\n\nUSER PROVIDED ADDITIONAL CONTEXT:\n";
    reportData.missingInfo.forEach((q, i) => {
      extraContext += `Q: ${q}\nA: ${answers[i]}\n\n`;
    });

    await handleAnalyze(originalQuery + extraContext);
  };

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
                Good Night User!

              </h1>
              <p className="mt-4 text-[18px] text-muted-foreground max-w-2xl mx-auto">
                What legal situation can we help you understand today? Upload a document or describe your case to get started.
              </p>
            </div>

            {isAnalyzing ? (
              <div className="mt-12 flex flex-col items-center gap-4 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Analyzing legal documents and running compliance checks...</p>
              </div>
            ) : (
              <AnalysisInput onSubmit={handleAnalyze} />
            )}
          </motion.div>
        ) : (
          reportData && (
            <motion.div
              key="report-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 w-full max-w-6xl mx-auto px-4 sm:px-6"
            >
              <button
                onClick={() => setShowReport(false)}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground print:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </button>

              <ComplianceReport
                data={reportData}
                onOpenChat={() => setIsChatOpen(true)}
                onSimulate={handleSimulate}
                isSimulating={isSimulating}
                onAnswerMissingInfo={handleAnswerMissingInfo}
              />
            </motion.div>
          )
        )}
      </AnimatePresence>

      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        documentContext={reportData?.documentName || "Case Analysis"}
      />
    </div>
  );
}
