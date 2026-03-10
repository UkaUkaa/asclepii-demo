import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DoctorsPageContent } from "@/features/doctors/DoctorsPageContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "doctors" });
  return { title: t("title"), description: t("subtitle") };
}

export default function DoctorsPage() {
  return <DoctorsPageContent />;
}
