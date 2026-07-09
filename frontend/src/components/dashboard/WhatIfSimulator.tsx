import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Beaker, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function WhatIfSimulator({ onSimulate, isLoading }: { onSimulate: (scenario: string) => void, isLoading?: boolean }) {
  const [scenario, setScenario] = useState("");

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
        <CardTitle className="flex items-center gap-2 text-lg text-primary">
          <Beaker className="h-5 w-5" />
          &quot;What If?&quot; Legal Simulator
        </CardTitle>
        <CardDescription>
          Modify the facts of the case to see how the legal outcome changes. (e.g. &quot;What if the notice period was 30 days?&quot;)
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <Textarea
          placeholder="Enter a hypothetical twist to your case..."
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          className="resize-none h-24"
        />
        <Button 
          onClick={() => onSimulate(scenario)}
          className="w-full"
          disabled={!scenario.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Simulating Outcome...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Simulation
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
