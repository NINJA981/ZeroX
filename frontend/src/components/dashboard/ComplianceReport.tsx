import { VerdictBadge, VerdictStatus } from "./VerdictBadge";
import { FileText, Shield, Scale, ChevronRight, MessageSquare, ListChecks, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExplainabilityTree, ExplainabilityData } from "./ExplainabilityTree";
import { RightsHeatmap, RightHeat } from "./RightsHeatmap";
import { MissingInfoPrompt } from "./MissingInfoPrompt";
import { WhatIfSimulator } from "./WhatIfSimulator";

export interface ClauseAnalysis {
  id: string;
  originalText: string;
  verdict: VerdictStatus;
  explanation: string;
  citedLaw: string;
  recommendation?: string;
}

export interface ComplianceReportData {
  documentName: string;
  overallVerdict: VerdictStatus;
  complianceScore: number;
  summary: string;
  clauses: ClauseAnalysis[];
  explainabilityTree?: ExplainabilityData;
  rightsHeatmap?: RightHeat[];
  missingInfo?: string[];
  authorityRecommendation?: string;
  evidenceChecklist?: string[];
}

interface ComplianceReportProps {
  data: ComplianceReportData;
  onOpenChat: () => void;
  onSimulate?: (scenario: string) => void;
  onAnswerMissingInfo?: (answers: string[]) => void;
  isSimulating?: boolean;
  className?: string;
}

export function ComplianceReport({ data, onOpenChat, onSimulate, onAnswerMissingInfo, isSimulating, className }: ComplianceReportProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto flex flex-col gap-6 print:m-0 print:p-0", className)}>
      {/* Header Card */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm print:shadow-none print:border-none">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Legal Analysis Report</h2>
                <p className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <FileText className="h-4 w-4" />
                  {data.documentName}
                </p>
              </div>
            </div>
            
            <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
              {data.summary}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground mb-1">Overall Status</p>
              <div className="flex items-center gap-3">
                <VerdictBadge status={data.overallVerdict} className="text-sm px-3 py-1" />
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-primary/10 text-primary font-bold text-sm">
                  {data.complianceScore}%
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 print:hidden"
              >
                <FileText className="h-4 w-4" />
                Export Passport PDF
              </button>
              <button 
                onClick={onOpenChat}
                className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 print:hidden"
              >
                <MessageSquare className="h-4 w-4" />
                Ask follow-up questions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clause Analysis */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          Clause-by-Clause Breakdown
        </h3>
        
        <div className="grid gap-4">
          {data.clauses.map((clause) => (
            <div key={clause.id} className="rounded-xl border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md">
              <div className="border-b bg-muted/30 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-3">
                      &quot;{clause.originalText}&quot;
                    </p>
                  </div>
                  <VerdictBadge status={clause.verdict} className="shrink-0" />
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">AI Explanation</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{clause.explanation}</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-1.5 rounded-md bg-secondary/50 px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    <FileText className="h-3.5 w-3.5" />
                    Cited: {clause.citedLaw}
                  </div>
                  {clause.recommendation && (
                    <div className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      <ChevronRight className="h-3.5 w-3.5" />
                      {clause.recommendation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Authority Recommendation */}
      {data.authorityRecommendation && (
        <div className="rounded-xl border bg-primary/5 p-5 flex items-start gap-4">
          <div className="bg-primary/20 p-3 rounded-full text-primary shrink-0">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Recommended Authority</h4>
            <p className="text-sm text-muted-foreground">{data.authorityRecommendation}</p>
          </div>
        </div>
      )}

      {/* Explainability Tree */}
      {data.explainabilityTree && (
        <ExplainabilityTree data={data.explainabilityTree} />
      )}

      {/* Rights Heatmap */}
      {data.rightsHeatmap && (
        <RightsHeatmap data={data.rightsHeatmap} />
      )}

      {/* Evidence Checklist */}
      {data.evidenceChecklist && data.evidenceChecklist.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            Evidence Checklist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.evidenceChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Information Prompt */}
      {data.missingInfo && data.missingInfo.length > 0 && onAnswerMissingInfo && (
        <MissingInfoPrompt questions={data.missingInfo} onSubmit={onAnswerMissingInfo} />
      )}

      {/* What If Simulator */}
      {onSimulate && (
        <WhatIfSimulator onSimulate={onSimulate} isLoading={isSimulating} />
      )}
    </div>
  );
}
