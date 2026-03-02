import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ананд Хужирт Сувилал | Эрүүл амьдралын хэв маяг",
  description:
    "Өвөрхангай аймгийн Хужирт сумын Ананд Хужирт сувилал. Рашаан, шавар, физик эмчилгээ. Онлайн захиалга.",
  keywords: [
    "Ананд Хужирт",
    "сувилал",
    "рашаан эмчилгээ",
    "шавар эмчилгээ",
    "физик эмчилгээ",
    "Хужирт",
    "Өвөрхангай",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
