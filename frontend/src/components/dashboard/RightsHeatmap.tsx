import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RightHeat {
  right: string;
  confidence: number;
  status: "affected" | "intact";
}

export function RightsHeatmap({ data, className }: { data: RightHeat[], className?: string }) {
  if (!data || data.length === 0) return null;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-primary" />
          Rights Affected Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((item, i) => {
            const isAffected = item.status === "affected";
            const confidenceColor = isAffected
              ? item.confidence > 80 ? "bg-rose-500" : item.confidence > 50 ? "bg-orange-500" : "bg-yellow-500"
              : "bg-emerald-500";
            
            return (
              <div key={i} className="flex flex-col gap-2 p-4 rounded-xl border bg-card">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm text-foreground">{item.right}</span>
                  <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", isAffected ? "bg-rose-500/10 text-rose-600" : "bg-emerald-500/10 text-emerald-600")}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className={cn("h-2 rounded-full transition-all duration-1000", confidenceColor)} style={{ width: `${item.confidence}%` }} />
                </div>
                <div className="text-right text-xs text-muted-foreground mt-1">
                  Confidence: {item.confidence}%
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
