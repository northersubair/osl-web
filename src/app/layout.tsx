import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Support Ledger",
  description:
    "Transparent funding pages and public payment ledgers for open-source projects, powered by Stellar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          Skip to main content
        </a>
        <SiteHeader />
        {/* tabIndex lets the skip link move focus here in all browsers. */}
        <div id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
