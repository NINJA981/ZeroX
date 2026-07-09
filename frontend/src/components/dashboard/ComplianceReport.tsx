import { VerdictBadge, VerdictStatus } from "./VerdictBadge";
import { FileText, Shield, Scale, ChevronRight, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

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
  summary: string;
  clauses: ClauseAnalysis[];
}

interface ComplianceReportProps {
  data: ComplianceReportData;
  onOpenChat: () => void;
  className?: string;
}

export function ComplianceReport({ data, onOpenChat, className }: ComplianceReportProps) {
  return (
    <div className={cn("w-full max-w-5xl mx-auto flex flex-col gap-6", className)}>
      {/* Header Card */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
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
              <VerdictBadge status={data.overallVerdict} className="text-sm px-3 py-1" />
            </div>
            <button 
              onClick={onOpenChat}
              className="mt-2 flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <MessageSquare className="h-4 w-4" />
              Ask follow-up questions
            </button>
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
    </div>
  );
}
