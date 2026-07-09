import { TopNav } from "@/components/dashboard/TopNav";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  let user = data?.user;
  
  // Middleware handles unauthenticated redirects, but just in case:
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav userEmail={user?.email} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
