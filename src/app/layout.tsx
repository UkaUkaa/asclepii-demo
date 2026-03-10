import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asklepiy-clinic.vercel.app"),
  title: {
    template: "%s | Asklepiy Clinic",
    default: "Asklepiy Clinic — Медицина нового покоління",
  },
  description:
    "Медичний центр Асклепій — провідна клініка Житомира з 25-річним досвідом. Кардіологія, неврологія, гінекологія, педіатрія та більше 30 напрямків медичної допомоги.",
  keywords: [
    "медична клініка",
    "Житомир",
    "Асклепій",
    "кардіологія",
    "неврологія",
    "гінекологія",
    "педіатрія",
    "МРТ",
    "УЗД",
    "сімейний лікар",
  ],
  openGraph: {
    type: "website",
    siteName: "Asklepiy Clinic",
    locale: "uk_UA",
    alternateLocale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-[#0C1929]`}>{children}</body>
    </html>
  );
}
