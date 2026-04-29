import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emir Kaya — AI Automation & Web Development",
  description:
    "Freelance developer specializing in AI automations, web development, and digital business systems. Building systems that work while you sleep.",
  keywords: [
    "AI automation",
    "n8n",
    "web development",
    "Next.js",
    "freelancer",
    "workflow automation",
    "digital systems",
  ],
  openGraph: {
    title: "Emir Kaya — AI Automation & Web Development",
    description:
      "Freelance developer specializing in AI automations, web development, and digital business systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
