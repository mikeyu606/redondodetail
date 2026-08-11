import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Cormorant_Garamond,
  Montserrat,
  Petrona,
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

const petrona = Petrona({
  variable: "--font-petrona",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Her Driveway Club | Woman-Owned Mobile Car Wash — Coastal CA",
  description:
    "Woman-owned driveway car washes in Newport Beach. Plant-based, non-toxic deep cleans—safe for kids and pets. From $140/mo.",
  keywords: [
    "mobile car wash",
    "Newport Beach",
    "woman-owned",
    "bi-weekly car wash",
    "driveway car wash subscription",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png?v=2", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon?v=2", type: "image/png" }],
  },
  openGraph: {
    title: "Her Driveway Club | Woman-Owned Mobile Car Wash",
    description:
      "A spotless car in your driveway every other Saturday—without lifting a finger. Plant-based, non-toxic, and 1% to local Newport Beach PTAs.",
    url: "https://redondodetail.com",
    siteName: "Her Driveway Club",
    locale: "en_US",
    type: "website",
    images: [{ url: "/hdclogo.png", alt: "Her Driveway Club" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} ${montserrat.variable} ${petrona.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-charcoal">
        {children}
      </body>
    </html>
  );
}
