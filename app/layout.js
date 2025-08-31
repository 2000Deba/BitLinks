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
  title: "BitLinks - Your trusted URL shortener",
  description: "Fast, simple, privacy-first URL shortener built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <Navbar />
        {/* এখানে margin-top যোগ করলাম যাতে sticky navbar-এর নিচে content চাপা না পড়ে */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
