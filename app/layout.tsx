import type { Metadata } from "next";
import { TypekitLoader } from "@/components/TypekitLoader";
import { ThemeProvider } from "@/components/ThemeProvider";

import "./globals.css";
import "zenn-content-css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TwitterScriptLoader from "@/components/TwitterScriptLoader";

export const metadata: Metadata = {
  title: "KanikanLab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script src="https://embed.zenn.studio/js/listen-embed-event.js"></script>
      </head>
      <body className="bg-white font-[fot-tsukuardgothic-std] text-black antialiased dark:bg-black dark:text-white">
        <ThemeProvider>
          <TwitterScriptLoader />
          <TypekitLoader />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
