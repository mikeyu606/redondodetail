import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Cormorant_Garamond,
  Montserrat,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Redondo Detail | Premier Mobile Auto Spa — South Bay",
  description:
    "Boutique mobile car detailing for Redondo Beach, Hermosa Beach, Manhattan Beach & Palos Verdes. Woman-owned. Fully insured. Bi-weekly subscription slots available.",
  keywords: [
    "mobile car detailing",
    "Redondo Beach",
    "South Bay",
    "auto spa",
    "car wash subscription",
  ],
  openGraph: {
    title: "Redondo Detail | Premier Mobile Auto Spa",
    description:
      "Spotless door jambs, streak-free glass, and satin tire finishes — delivered to your driveway on autopilot.",
    url: "https://redondodetail.com",
    siteName: "Redondo Detail",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-charcoal">
        {children}
      </body>
    </html>
  );
}
