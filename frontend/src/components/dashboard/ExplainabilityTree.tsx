import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, MapPin, Scale, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExplainabilityData {
  incident: string;
  facts: string[];
  constitutionArticles: string[];
  applicableLaws: string[];
  precedents: string[];
  conclusion: string;
}

export function ExplainabilityTree({ data, className }: { data: ExplainabilityData, className?: string }) {
  const steps = [
    { title: "Incident", icon: MapPin, items: [data.incident], color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Extracted Facts", icon: AlertCircle, items: data.facts, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Constitutional Map", icon: Scale, items: data.constitutionArticles, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Applicable Laws", icon: BookOpen, items: data.applicableLaws, color: "text-rose-500", bg: "bg-rose-500/10" },
    { title: "Precedents", icon: GitBranch, items: data.precedents, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Conclusion", icon: CheckCircle2, items: [data.conclusion], color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GitBranch className="h-5 w-5 text-primary" />
          Explainability Tree
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {steps.map((step, idx) => {
            if (step.items.length === 0 || (step.items.length === 1 && !step.items[0])) return null;
            return (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                  <step.icon className={cn("h-4 w-4", step.color)} />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                  <h4 className="font-semibold text-sm mb-2 text-foreground">{step.title}</h4>
                  <ul className="space-y-1.5">
                    {step.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", step.bg.replace('/10', ''))} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
