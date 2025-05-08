import type { Metadata } from "next";
import { TypekitLoader } from "@/components/TypekitLoader";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";

import "./globals.css";
import "zenn-content-css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TwitterScriptLoader from "@/components/TwitterScriptLoader";

import { Zen_Kaku_Gothic_New } from "next/font/google";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Script src="https://embed.zenn.studio/js/listen-embed-event.js" />
      </head>
      <body
        className={`${zenKakuGothicNew.className} bg-white font-[fot-tsukuardgothic-std] text-black antialiased dark:bg-black dark:text-white`}
      >
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
