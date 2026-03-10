"use client";

import { motion } from "framer-motion";
import { Star, Clock, Calendar, MapPin, ChevronLeft, Languages, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Doctor } from "@/lib/api/mock-doctors";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { JsonLd } from "@/components/seo/JsonLd";

interface DoctorProfileContentProps {
  doctor: Doctor;
  locale: "uk" | "en";
}

export function DoctorProfileContent({ doctor, locale }: DoctorProfileContentProps) {
  const t = useTranslations("doctors");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Physician",
          name: doctor.name[locale],
          jobTitle: doctor.specialty[locale],
          description: doctor.bio[locale],
          worksFor: {
            "@type": "MedicalClinic",
            name: "Asklepiy Clinic",
          },
          knowsAbout: doctor.specializations[locale],
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-4">
          <Link
            href="/likari"
            className="inline-flex items-center gap-1.5 text-sm text-[#4A6180] hover:text-[#0D3A7E] transition-colors font-light"
          >
            <ChevronLeft size={15} />
            <span>{t("title")}</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#F2F6FB] pb-0">
        <div className="container-clinic py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Photo + quick info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-white border border-[#D6E3F0] rounded-[6px] overflow-hidden shadow-[0_4px_30px_rgba(13,58,126,0.08)] sticky top-[110px]">
                {/* Photo */}
                <div className="relative h-72">
                  <img
                    src={doctor.photo}
                    alt={doctor.name[locale]}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1929]/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-[4px] px-3 py-1.5">
                    <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-sm font-semibold text-[#0C1929]">{doctor.rating}</span>
                    <span className="text-xs text-[#8298B0]">({doctor.reviewCount})</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h1 className="text-xl font-light text-[#0C1929] mb-1">{doctor.name[locale]}</h1>
                  <p className="text-[#1A9EC9] text-sm font-light mb-4">{doctor.specialty[locale]}</p>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-3 text-sm text-[#4A6180] font-light">
                      <Clock size={14} className="text-[#8298B0]" />
                      <span>{doctor.experience} {t("experience")}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#4A6180] font-light">
                      <Calendar size={14} className="text-[#8298B0] mt-0.5 flex-shrink-0" />
                      <span>{doctor.schedule[locale]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#4A6180] font-light">
                      <MapPin size={14} className="text-[#8298B0]" />
                      <span>{locale === "uk" ? "Клініка Asklepiy, Харків" : "Asklepiy Clinic, Kharkiv"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#4A6180] font-light">
                      <Languages size={14} className="text-[#8298B0]" />
                      <span>{doctor.languages.join(", ").toUpperCase()}</span>
                    </div>
                  </div>

                  <Button variant="primary" fullWidth icon={<Calendar size={15} />}>
                    {t("bookAppointment")}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right: Bio + Details */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Bio */}
              <div className="bg-white border border-[#D6E3F0] rounded-[6px] p-7 shadow-[0_2px_20px_rgba(13,58,126,0.06)]">
                <h2 className="text-lg font-light text-[#0C1929] mb-4 pb-3 border-b border-[#EBF1F8]">
                  {locale === "uk" ? "Про лікаря" : "About the Doctor"}
                </h2>
                <p className="text-[#4A6180] font-light leading-relaxed">{doctor.bio[locale]}</p>
              </div>

              {/* Education */}
              <div className="bg-white border border-[#D6E3F0] rounded-[6px] p-7 shadow-[0_2px_20px_rgba(13,58,126,0.06)]">
                <h2 className="text-lg font-light text-[#0C1929] mb-4 pb-3 border-b border-[#EBF1F8] flex items-center gap-2">
                  <GraduationCap size={18} className="text-[#1A9EC9]" />
                  {t("education")}
                </h2>
                <ul className="space-y-3">
                  {doctor.education[locale].map((edu, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1A9EC9] mt-2 flex-shrink-0" />
                      <span className="text-[#4A6180] font-light text-sm">{edu}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Specializations */}
              <div className="bg-white border border-[#D6E3F0] rounded-[6px] p-7 shadow-[0_2px_20px_rgba(13,58,126,0.06)]">
                <h2 className="text-lg font-light text-[#0C1929] mb-4 pb-3 border-b border-[#EBF1F8]">
                  {t("specializations")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations[locale].map((spec) => (
                    <Badge key={spec} variant="primary">{spec}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking section */}
      <section className="section-padding bg-[#F2F6FB]">
        <div className="container-clinic">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-light text-[#0C1929] mb-2 text-center">
              {locale === "uk" ? `Запис до ${doctor.name[locale].split(" ")[0]}` : `Book with ${doctor.name[locale].split(" ")[0]}`}
            </h2>
            <p className="text-[#4A6180] font-light text-center mb-8 text-sm">
              {locale === "uk" ? "Оберіть зручний час для прийому" : "Choose a convenient appointment time"}
            </p>
            <div className="bg-white border border-[#D6E3F0] rounded-[6px] p-8 shadow-[0_4px_30px_rgba(13,58,126,0.08)]">
              <BookingWizard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
