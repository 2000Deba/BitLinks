import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "BitLinks — Privacy-First URL Shortener",
    template: "%s | BitLinks",
  },

  description:
    "BitLinks is a fast, secure, and privacy-first URL shortener built with Next.js and MongoDB. Create clean, shareable links with custom aliases.",

  keywords: [
    "BitLinks",
    "URL shortener",
    "link shortener",
    "Next.js project",
    "MongoDB",
    "custom short links",
    "privacy first url shortener",
    "link management tool",
    "web development project",
  ],

  authors: [{ name: "Debasish Seal", url: "https://debasishseal.vercel.app" }],
  creator: "Debasish Seal",
  publisher: "Debasish Seal",

  metadataBase: new URL("https://bitlinks-jet.vercel.app"),

  alternates: {
    canonical: "https://bitlinks-jet.vercel.app",
  },

  openGraph: {
    title: "BitLinks — Privacy-First URL Shortener",
    description:
      "Shorten, manage, and share URLs securely with BitLinks. Built with Next.js and MongoDB.",
    url: "https://bitlinks-jet.vercel.app",
    siteName: "BitLinks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BitLinks — URL Shortener",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BitLinks — Privacy-First URL Shortener",
    description:
      "Fast, secure, privacy-focused URL shortener built with Next.js.",
    images: ["/og-image.png"],
    creator: '@ShilDebasish',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <Navbar />
        {/* Added margin-top here so that the content doesn't get buried under the sticky navbar. */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
