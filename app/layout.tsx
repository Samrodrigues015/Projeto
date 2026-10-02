import type React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";

// Geist para títulos e texto: uma família só, com hierarquia feita pelo peso.
// Ficheiro local (app/fonts, licença OFL) em vez de next/font/google, para o
// build não depender de acesso ao Google Fonts.
const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samara Rodrigues · Programadora .NET",
  description:
    "Programadora .NET no Porto. Desenvolvo aplicações web com C# e .NET, do servidor à interface.",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={geist.variable}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
