import { TopNav } from "@/components/dashboard/TopNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = { email: "demo@sahur.ai" };

  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav userEmail={user.email} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
