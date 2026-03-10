import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoctorBySlug, DOCTORS } from "@/lib/api/mock-doctors";
import { DoctorProfileContent } from "@/features/doctors/DoctorProfileContent";

export async function generateStaticParams() {
  return DOCTORS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return { title: "Doctor Not Found" };
  const loc = locale as "uk" | "en";
  return {
    title: `${doctor.name[loc]} — ${doctor.specialty[loc]}`,
    description: doctor.bio[loc].slice(0, 160),
  };
}

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();
  return <DoctorProfileContent doctor={doctor} locale={locale as "uk" | "en"} />;
}
