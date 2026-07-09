import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function MissingInfoPrompt({ questions, onSubmit }: { questions: string[], onSubmit: (answers: string[]) => void }) {
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));

  if (!questions || questions.length === 0) return null;

  return (
    <Card className="border-orange-500/20 bg-orange-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-orange-600">
          <AlertCircle className="h-5 w-5" />
          Missing Information Detected
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Our AI needs a bit more context to provide a conclusive verdict. Please answer the following to refine the analysis:
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((q, idx) => (
          <div key={idx} className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              {idx + 1}. {q}
            </label>
            <Textarea
              placeholder="Your answer..."
              value={answers[idx]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="resize-none h-20 bg-background"
            />
          </div>
        ))}
        <Button 
          onClick={() => onSubmit(answers)}
          className="w-full mt-2"
          disabled={answers.some(a => a.trim() === "")}
        >
          Update Analysis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
