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
    "Woman-owned, white-glove doorstep car washes for busy coastal parents. Bi-weekly auto-pay from $180/mo. Launching in Newport Beach.",
  keywords: [
    "mobile car wash",
    "Newport Beach",
    "woman-owned",
    "bi-weekly car wash",
    "driveway car wash subscription",
  ],
  icons: {
    icon: [{ url: "/hdclogo.png", type: "image/png" }],
    apple: [{ url: "/hdclogo.png", type: "image/png" }],
  },
  openGraph: {
    title: "Her Driveway Club | Woman-Owned Mobile Car Wash",
    description:
      "Doorstep concierge washes that reset family SUVs so busy parents get their weekends back.",
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
