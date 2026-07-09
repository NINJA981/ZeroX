import { FileText, MoreVertical, UploadCloud, Database } from "lucide-react";

export const metadata = {
  title: "Legal Vault - Sahur AI",
};

const documents = [
  { id: 1, name: "Employment_Contract_2024.pdf", date: "Today, 10:42 AM", size: "2.4 MB", status: "Analyzed" },
  { id: 2, name: "Lease_Agreement_Bangalore.pdf", date: "Yesterday", size: "1.1 MB", status: "Analyzed" },
  { id: 3, name: "ND_Agreement_AcmeCorp.docx", date: "Mar 12, 2026", size: "840 KB", status: "Pending" },
  { id: 4, name: "Health_Insurance_Policy.pdf", date: "Feb 28, 2026", size: "3.2 MB", status: "Analyzed" },
];

export default function VaultPage() {
  return (
    <div className="mx-auto max-w-6xl py-8">
      
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Legal Vault</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Database className="h-4 w-4" />
            End-to-end encrypted personal storage.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-[14px] font-semibold text-background transition-transform hover:-translate-y-0.5 shadow-md">
          <UploadCloud className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      {/* Storage Indicator */}
      <div className="mb-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between text-sm font-medium">
          <span className="text-foreground">Storage Used</span>
          <span className="text-muted-foreground">7.5 MB of 100 MB</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[7.5%] bg-primary rounded-full" />
        </div>
      </div>

      {/* Documents List */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-muted/20 px-6 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            All Documents
          </h2>
        </div>
        <div className="divide-y divide-border">
          {documents.map((doc) => (
            <div 
              key={doc.id}
              className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground group-hover:text-primary transition-colors">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-foreground">{doc.name}</p>
                  <p className="text-[13px] text-muted-foreground">{doc.date} • {doc.size}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                  doc.status === "Analyzed" 
                    ? "bg-success/10 text-success" 
                    : "bg-warning/10 text-warning"
                }`}>
                  {doc.status}
                </span>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
