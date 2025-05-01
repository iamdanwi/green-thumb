import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenThumb | Vegetable Details | Garden Guide",
  description:
    "Explore detailed growing, harvesting, and care information for vegetables, including common pests and health benefits.",
  keywords: [
    "vegetable",
    "gardening",
    "plant care",
    "pests",
    "organic farming",
    "sowing guide",
    "harvesting tips",
    "home gardening",
  ],
  authors: [{ name: "Garden Guide Team" }],
  openGraph: {
    title: "Vegetable Details | Garden Guide",
    description:
      "Get detailed instructions for growing and harvesting your favorite vegetables. Learn about pests, spacing, soil, and more.",
    type: "website",
    url: "https://green-thumb-chi.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
