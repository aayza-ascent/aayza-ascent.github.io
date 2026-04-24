import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aayza Ahmed = Software Engineer",
  description:
    "Portfolio of Aayza Ahmed - a Glasgow-based software engineer building full-stack TypeScript, AI-powered workflow automation, and modular dashboards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
