"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Heart, Brain, Activity, Baby, Bone, Eye, Droplets, Zap, FlaskConical, Scan, Stethoscope, Microscope } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/api/mock-services";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = {
  Heart, Brain, Activity, Baby, Bone, Eye, Droplets, Zap, FlaskConical, Scan, Stethoscope, Microscope,
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale() as "uk" | "en";

  return (
    <section className="section-padding bg-white">
      <div className="container-clinic">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          centered
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12"
        >
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] || Stethoscope;
            const name = t.raw(`items.${service.key}.name` as Parameters<typeof t.raw>[0]) as string;
            const desc = t.raw(`items.${service.key}.desc` as Parameters<typeof t.raw>[0]) as string;

            return (
              <motion.div key={service.id} variants={cardVariants}>
                <Link href="/napryamky">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="group bg-white border border-[#D6E3F0] rounded-[6px] p-6 shadow-[0_2px_20px_rgba(13,58,126,0.06)] hover:shadow-[0_8px_40px_rgba(13,58,126,0.12)] transition-shadow cursor-pointer h-full"
                  >
                    <div
                      className="w-12 h-12 rounded-[6px] flex items-center justify-center mb-5 transition-transform group-hover:scale-110 mx-auto"
                      style={{ background: service.bgColor }}
                    >
                      <Icon size={22} style={{ color: service.color }} />
                    </div>
                    <h3 className="text-[#0C1929] font-medium text-sm mb-2 leading-snug">
                      {name}
                    </h3>
                    <p className="text-[#4A6180] text-xs font-light leading-relaxed">
                      {desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-[#1A9EC9] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>{locale === "uk" ? "Дізнатись більше" : "Learn more"}</span>
                      <ArrowRight size={12} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
