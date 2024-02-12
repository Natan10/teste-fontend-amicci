"use client";

import { Suspense } from "react";
import { Montserrat, Roboto_Mono } from "next/font/google";

import { ThemeProvider } from "@/app/providers/theme-provider";
import { ReactQueryProvider } from "./providers/react-query-provider";
import { Load } from "@/components/common/load";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["300", "400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  preload: true,
  variable: "--font-montserrat",
});

const robotoMono = Roboto_Mono({
  weight: ["300"],
  style: ["normal"],
  preload: true,
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${montserrat.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Suspense fallback={<Load />}>{children}</Suspense>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
