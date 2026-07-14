"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <QueryProvider>
        {children}
        {/* Global toast notifications via Sonner */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast:
                "bg-white border border-slate-200 shadow-lg shadow-slate-100/60 text-slate-900 rounded-xl",
              title: "text-sm font-semibold",
              description: "text-xs text-slate-500",
              actionButton:
                "bg-violet-600 text-white text-xs font-bold rounded-lg px-3 py-1.5 hover:bg-violet-700",
              cancelButton: "bg-slate-100 text-slate-600 text-xs font-bold rounded-lg px-3 py-1.5",
              success: "border-emerald-200",
              error: "border-red-200",
              warning: "border-amber-200",
              info: "border-blue-200",
            },
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  );
}
