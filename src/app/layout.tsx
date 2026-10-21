import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WeddingDay — Պրեմիում Հարսանեկան Ծառայություններ",
  description: "Պլանավորեք Ձեր անմոռանալի հարսանիքը: Ընտրեք լավագույն հարսանեկան ծառայությունները և ուղարկեք մեկ ընդհանուր հայտ:",
  keywords: ["wedding", "armenia", "wedding services", "հարսանիք", "հարսանեկան ծառայություններ", "свадьба в Армении"],
  openGraph: {
    title: "WeddingDay — Luxury Wedding Services Platform",
    description: "Curated wedding services for couples in Armenia and worldwide. Request custom proposals in one click.",
    type: "website",
    locale: "hy_AM",
    siteName: "WeddingDay",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hy" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="antialiased bg-[#FAF8F4] text-[#292723] min-h-screen selection:bg-[#E8D7BE] selection:text-[#292723]">
        {children}
      </body>
    </html>
  );
}
