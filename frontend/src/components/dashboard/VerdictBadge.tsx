import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type VerdictStatus = "safe" | "warning" | "violation" | "info";

interface VerdictBadgeProps {
  status: VerdictStatus;
  className?: string;
  showIcon?: boolean;
}

export function VerdictBadge({ status, className, showIcon = true }: VerdictBadgeProps) {
  const config = {
    safe: {
      label: "Safe",
      icon: CheckCircle2,
      styles: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    warning: {
      label: "Warning",
      icon: AlertTriangle,
      styles: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    violation: {
      label: "Violation",
      icon: AlertCircle,
      styles: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    },
    info: {
      label: "Info",
      icon: AlertCircle,
      styles: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
  };

  const { label, icon: Icon, styles } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles,
        className
      )}
    >
      {showIcon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}
