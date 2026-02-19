import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Security Engineer & Developer",
  description: "Building secure systems and breaking things ethically. Focused on network security, penetration testing, and secure software development.",
  keywords: ["cybersecurity", "security engineer", "penetration testing", "network security"],
  authors: [{ name: "Aryan Mistry" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Security Engineer & Developer",
    description: "Building secure systems and breaking things ethically.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased bg-background-primary text-text-primary`}
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

