"use client";

import { Scale } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
        <Scale className="h-5 w-5 text-teal-foreground" strokeWidth={2.2} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-teal ring-2 ring-background" />
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
        Sahur<span className="text-teal"> AI</span>
      </span>
    </div>
  );
}
