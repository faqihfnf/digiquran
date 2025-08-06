import type { Metadata } from "next";
import { Poppins, Amiri } from "next/font/google";
import "./globals.css";
import Provider from "@/provider/Provider";
import Footer from "@/components/Footer";

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
        <body className={`${poppins.className} antialiased`}>
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
