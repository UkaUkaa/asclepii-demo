"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Heart, Brain, Activity, Baby, Bone, Eye, Droplets, Zap, FlaskConical, Scan, Stethoscope, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/api/mock-services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { Link } from "@/i18n/navigation";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Heart, Brain, Activity, Baby, Bone, Eye, Droplets, Zap, FlaskConical, Scan, Stethoscope,
};

export function ServicesPageContent() {
  const t = useTranslations("services");
  const locale = useLocale() as "uk" | "en";

  return (
    <>
      {/* Page header */}
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-12">
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            tag={locale === "uk" ? "Медичні напрямки" : "Medical Services"}
          />
        </div>
      </div>

      {/* Services grid */}
      <section className="section-padding bg-white">
        <div className="container-clinic">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || Stethoscope;
              const name = t.raw(`items.${service.key}.name` as any) as string;
              const desc = t.raw(`items.${service.key}.desc` as any) as string;

              return (
                <motion.div
                  key={service.id}
                  id={service.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="group bg-white border border-[#D6E3F0] rounded-[6px] p-7 shadow-[0_2px_20px_rgba(13,58,126,0.06)] hover:shadow-[0_8px_40px_rgba(13,58,126,0.12)] transition-shadow h-full flex flex-col"
                  >
                    <div
                      className="w-14 h-14 rounded-[6px] flex items-center justify-center mb-5 mx-auto"
                      style={{ background: service.bgColor }}
                    >
                      <Icon size={26} style={{ color: service.color }} />
                    </div>
                    <h3 className="text-[#0C1929] font-medium text-base mb-3">{name}</h3>
                    <p className="text-[#4A6180] text-sm font-light leading-relaxed flex-1">{desc}</p>
                    <div className="mt-5 pt-5 border-t border-[#EBF1F8] flex items-center gap-3 justify-center sm:justify-start">
                      <Link href="/napryamky">
                        <Button variant="secondary" size="sm">
                          {locale === "uk" ? "Записатись" : "Book Now"}
                        </Button>
                      </Link>
                      <button className="text-xs text-[#4A6180] hover:text-[#0D3A7E] flex items-center gap-1 transition-colors font-light">
                        {locale === "uk" ? "Лікарі" : "Doctors"} <ArrowRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking section */}
      <section className="section-padding bg-[#F2F6FB]">
        <div className="container-clinic">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title={locale === "uk" ? "Записатись на прийом" : "Book an Appointment"}
              subtitle={locale === "uk" ? "Оберіть зручний час та лікаря" : "Choose a convenient time and doctor"}
              centered
            />
            <div className="mt-10 bg-white border border-[#D6E3F0] rounded-[6px] p-8 shadow-[0_4px_30px_rgba(13,58,126,0.08)]">
              <BookingWizard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
