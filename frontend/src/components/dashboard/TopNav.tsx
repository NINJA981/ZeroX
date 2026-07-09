"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Settings, User, LogOut } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function TopNav({ userEmail }: { userEmail?: string | null }) {
  const pathname = usePathname();
  const [showPreferences, setShowPreferences] = useState(false);

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => {
                  document.documentElement.classList.toggle('dark');
                  // Optional: save preference to localStorage
                  const isDark = document.documentElement.classList.contains('dark');
                  localStorage.setItem('theme', isDark ? 'dark' : 'light');
                }}
              >
                Toggle Theme
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => setShowPreferences(true)}
              >
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Help & Support</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Preferences Dialog */}
          <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Preferences</DialogTitle>
                <DialogDescription>
                  Manage your personal settings and notifications.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <span className="text-[13px] text-muted-foreground">
                      Receive alerts for case updates.
                    </span>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <span className="text-[13px] text-muted-foreground">
                      Receive product updates and offers.
                    </span>
                  </div>
                  <Switch id="marketing" />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="data-sharing">Anonymous Data Sharing</Label>
                    <span className="text-[13px] text-muted-foreground">
                      Help us improve Sahur AI.
                    </span>
                  </div>
                  <Switch id="data-sharing" defaultChecked />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <div className="h-5 w-px bg-border mx-2" />
          
          {userEmail ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-secondary to-primary text-primary-foreground transition-transform hover:scale-105">
                  <User className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action="/auth/sign-out" method="post" className="w-full">
                    <button type="submit" className="flex w-full items-center text-red-500 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:underline">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
