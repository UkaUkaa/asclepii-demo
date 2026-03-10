"use client";

import { motion } from "framer-motion";
import { Star, Calendar, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DOCTORS } from "@/lib/api/mock-doctors";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function DoctorsSection() {
  const t = useTranslations("home.doctors");
  const doctorsT = useTranslations("doctors");
  const locale = useLocale() as "uk" | "en";
  const featured = DOCTORS.slice(0, 4);

  return (
    <section className="section-padding bg-[#F2F6FB]">
      <div className="container-clinic">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
          <Link href="/likari">
            <Button variant="outline" size="sm" icon={<ChevronRight size={14} />} iconPosition="right">
              {t("viewAll")}
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link href={{ pathname: "/likari/[slug]", params: { slug: doctor.slug } }}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group bg-white border border-[#D6E3F0] rounded-[6px] overflow-hidden shadow-[0_2px_20px_rgba(13,58,126,0.06)] hover:shadow-[0_8px_40px_rgba(13,58,126,0.12)] transition-shadow cursor-pointer"
                >
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={doctor.photo}
                      alt={doctor.name[locale]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1929]/60 via-transparent to-transparent" />
                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-[4px] px-2 py-1">
                      <Star size={10} className="text-[#F59E0B] fill-[#F59E0B]" />
                      <span className="text-xs font-semibold text-[#0C1929]">{doctor.rating}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-[#0C1929] font-medium text-sm leading-snug mb-1">
                        {doctor.name[locale]}
                      </h3>
                      <p className="text-[#1A9EC9] text-xs font-light">
                        {doctor.specialty[locale]}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#8298B0] font-light mb-4">
                      <span>{doctor.experience} {doctorsT("experience")}</span>
                      <span>{doctor.reviewCount} {locale === "uk" ? "відгуків" : "reviews"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#0D3A7E] text-xs font-medium opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                      <Calendar size={12} />
                      <span>{doctorsT("bookAppointment")}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
