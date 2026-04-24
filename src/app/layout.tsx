import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AURAL_PROTOCOL",
  description: "Premium Cyber-Luxury audiophile equipment store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen relative`}>
        {/* Acoustic repeating SVG background pattern */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-acoustic opacity-5"></div>
        {children}
      </body>
    </html>
  );
}
