import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { JsonLd } from "@/components/seo/JsonLd";

const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection").then(m => ({ default: m.ServicesSection })));
const WhySection = dynamic(() => import("@/components/sections/WhySection").then(m => ({ default: m.WhySection })));
const DoctorsSection = dynamic(() => import("@/components/sections/DoctorsSection").then(m => ({ default: m.DoctorsSection })));
const BookingSection = dynamic(() => import("@/components/sections/BookingSection").then(m => ({ default: m.BookingSection })));
const NewsSection = dynamic(() => import("@/components/sections/NewsSection").then(m => ({ default: m.NewsSection })));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: locale === "uk" ? "Asklepiy Clinic — Медицина нового покоління" : "Asklepiy Clinic — Next Generation Medicine",
    description:
      locale === "uk"
        ? "Провідна медична клініка Харкова. 25 років досвіду, 50+ лікарів, сучасна діагностика."
        : "Kharkiv's leading medical clinic. 25 years of experience, 50+ doctors, modern diagnostics.",
    openGraph: {
      title: locale === "uk" ? "Asklepiy Clinic — Медицина нового покоління" : "Asklepiy Clinic — Next Generation Medicine",
      description: locale === "uk"
        ? "Провідна медична клініка Харкова"
        : "Kharkiv's leading medical clinic",
      images: [{ url: "/og-home.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: "Asklepiy Clinic",
          url: "https://asklepiy-clinic.vercel.app",
          address: {
            "@type": "PostalAddress",
            streetAddress: "вул. Ярослава Мудрого, 31",
            addressLocality: "Харків",
            postalCode: "61000",
            addressCountry: "UA",
          },
          telephone: "+380570000001",
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "15:00" },
          ],
          medicalSpecialty: ["Cardiology", "Neurology", "Gynecology", "Pediatrics", "Orthopedics"],
          foundingDate: "2000",
          numberOfEmployees: { "@type": "QuantitativeValue", value: 150 },
        }}
      />
      <HeroSection />
      <ServicesSection />
      <WhySection />
      <DoctorsSection />
      <BookingSection />
      <NewsSection />
    </>
  );
}
