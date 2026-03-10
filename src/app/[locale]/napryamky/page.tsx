import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesPageContent } from "@/features/services/ServicesPageContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ServicesPageContent />;
}
