import { AnalysisInput } from "@/components/dashboard/AnalysisInput";

export const metadata = {
  title: "Dashboard - Sahur AI",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Good morning.
        </h1>
        <p className="mt-4 text-[18px] text-muted-foreground max-w-2xl mx-auto">
          What legal situation can we help you understand today? Upload a document or describe your case to get started.
        </p>
      </div>
      
      <AnalysisInput />
    </div>
  );
}
