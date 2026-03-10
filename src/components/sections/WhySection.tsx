"use client";

import { motion } from "framer-motion";
import { Monitor, Users, Heart, Smartphone } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ICONS = [Monitor, Users, Heart, Smartphone];
const FEATURE_KEYS = ["modern", "team", "care", "digital"];

export function WhySection() {
  const t = useTranslations("home.why");
  const locale = useLocale();

  return (
    <section className="section-padding bg-[#0C1929] text-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#0D3A7E]/20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#1A9EC9]/10 translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container-clinic relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4" style={{ color: "#FFFFFF" }}>
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group p-6 rounded-[6px] border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 transition-all h-full"
                >
                  <div className="w-12 h-12 rounded-[6px] bg-[#1A9EC9]/20 border border-[#1A9EC9]/30 flex items-center justify-center mb-5 group-hover:bg-[#1A9EC9]/30 transition-colors mx-auto sm:mx-0">
                    <Icon size={22} className="text-[#1A9EC9]" />
                  </div>
                  <h3 className="font-medium text-sm mb-3" style={{ color: "#FFFFFF" }}>
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">
                    {t(`features.${key}.desc`)}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
        >
          {[
            { valUk: "99.2%", valEn: "99.2%", uk: "Точність діагностики", en: "Diagnostic Accuracy" },
            { valUk: "<15 хв", valEn: "<15 min", uk: "Час очікування", en: "Wait Time" },
            { valUk: "4.9 / 5", valEn: "4.9 / 5", uk: "Середній рейтинг", en: "Average Rating" },
            { valUk: "ISO 9001", valEn: "ISO 9001", uk: "Сертифікація", en: "Certification" },
          ].map(({ valUk, valEn, uk, en }) => (
            <div key={uk}>
              <div className="text-3xl font-light text-[#1A9EC9] mb-1">{locale === "uk" ? valUk : valEn}</div>
              <div className="text-white/40 text-xs font-light">{locale === "uk" ? uk : en}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
