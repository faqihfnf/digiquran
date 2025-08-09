import type { Metadata } from "next";
import { Poppins, Amiri } from "next/font/google";
import "./globals.css";
import Provider from "@/provider/Provider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "DigiQuran - Quran Digital",
  description:
    "Aplikasi Quran Digital dengan Terjemahan, Tafsir, dan Fitur Bookmark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body className={`${poppins.variable} ${amiri.variable} antialiased`}>
          {/* 1. Tambahkan "flex flex-col" pada pembungkus utama */}
          <main className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 text-slate-100 flex flex-col">
            <Navbar />
            {/* 2. Tambahkan "flex-grow" pada area konten */}
            <div className="flex-grow">{children}</div>
            <Analytics />
            <Footer />
          </main>
        </body>
      </html>
    </Provider>
  );
}
