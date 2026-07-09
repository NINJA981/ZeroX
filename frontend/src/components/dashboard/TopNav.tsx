"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Settings, User } from "lucide-react";

export function TopNav() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/vault", label: "Legal Vault" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Scale className="h-4 w-4" />
            </div>
            <span className="font-display text-sm font-bold tracking-tight">Sahur AI</span>
          </Link>
          
          <nav className="hidden space-x-1 sm:flex">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${
                    isActive 
                      ? "text-foreground bg-muted/50" 
                      : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </button>
          <div className="h-5 w-px bg-border mx-2" />
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-secondary to-primary text-primary-foreground transition-transform hover:scale-105">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
