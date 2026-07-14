import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LearningHub",
    template: "%s | LearningHub",
  },
  description:
    "LearningHub — the premium developer learning platform powered by Kaishi Innovations.",
  keywords: ["learning", "courses", "programming", "developer", "LMS"],
  authors: [{ name: "Kaishi Innovations" }],
  openGraph: {
    title: "LearningHub",
    description: "Premium developer learning platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
