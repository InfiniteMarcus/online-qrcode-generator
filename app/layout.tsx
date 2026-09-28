import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "QR Code Generator",
  description:
    "Generate QR codes. No registration, no cookies, no tracking. Fast, free, and private QR code generator.",
  applicationName: "QR Code Generator",
  authors: [{ name: "InfiniteMarcus", url: "https://github.com/InfiniteMarcus" }],
  generator: "Next.js",
  keywords: [
    "qr code generator",
    "free qr code",
    "online qr code",
    "privacy qr code",
    "instant qr code",
    "no tracking qr code",
  ],
  creator: "InfiniteMarcus",
  publisher: "InfiniteMarcus",
  openGraph: {
    title: "QR Code Generator",
    description:
      "Generate QR codes instantly without tracking or registration.",
    type: "website",
    locale: "en_US",
    siteName: "QR Code Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator",
    description:
      "Generate QR codes instantly without tracking or registration.",
    creator: "@InfiniteMarcus",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
