"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Award, Heart, Users, Calendar, GraduationCap, Shield } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale() as "uk" | "en";

  const STATS = [
    { key: "founded", value: "2000", icon: Calendar },
    { key: "patients", value: "50K+", icon: Users },
    { key: "doctors", value: "50+", icon: GraduationCap },
    { key: "departments", value: "15+", icon: Shield },
  ];

  const VALUES = [
    { icon: Heart, uk: "Піклування", en: "Care", uk_d: "Ми ставимо пацієнта в центр всього", en_d: "We put the patient at the center of everything" },
    { icon: Award, uk: "Якість", en: "Quality", uk_d: "Найвищі стандарти медичної допомоги", en_d: "The highest standards of medical care" },
    { icon: Shield, uk: "Довіра", en: "Trust", uk_d: "Прозорість та чесність у кожній взаємодії", en_d: "Transparency and honesty in every interaction" },
    { icon: GraduationCap, uk: "Розвиток", en: "Growth", uk_d: "Постійне вдосконалення та навчання", en_d: "Continuous improvement and learning" },
  ];

  return (
    <>
      {/* Header */}
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-12">
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            tag={locale === "uk" ? "25 років досвіду" : "25 years of experience"}
          />
        </div>
      </div>

      {/* Stats */}
      <section className="bg-white border-b border-[#D6E3F0]">
        <div className="container-clinic py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ key, value, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-[6px] bg-[#EEF3FB] flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-[#0D3A7E]" />
                </div>
                <div className="text-4xl font-light text-[#0D3A7E] mb-1">{value}</div>
                <div className="text-sm text-[#4A6180] font-light">{t(`stats.${key}` as any)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-clinic">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs text-[#0D3A7E] font-medium uppercase tracking-widest mb-4 block">{t("mission")}</span>
              <h2 className="text-3xl font-light text-[#0C1929] mb-6">{t("missionText")}</h2>
              <p className="text-[#4A6180] font-light leading-relaxed">
                {locale === "uk"
                  ? "З 2000 року ми допомагаємо тисячам пацієнтів відновити та зберегти здоров'я. Наша клініка оснащена найсучаснішим обладнанням та укомплектована командою висококваліфікованих лікарів, кожен з яких прагне надати допомогу найвищої якості."
                  : "Since 2000, we have been helping thousands of patients restore and maintain their health. Our clinic is equipped with the most modern equipment and staffed with a team of highly qualified doctors, each committed to providing the highest quality care."}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative h-80 rounded-[6px] overflow-hidden shadow-[0_20px_60px_rgba(13,58,126,0.12)]"
            >
              <img
                src="https://asklepiy.com/wp-content/uploads/2025/11/golovne-pro-nas-2.webp"
                alt="Asklepiy Clinic"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#F2F6FB]">
        <div className="container-clinic">
          <SectionHeader title={t("values")} centered />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {VALUES.map(({ icon: Icon, uk, en, uk_d, en_d }, i) => (
              <motion.div
                key={uk}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[#D6E3F0] rounded-[6px] p-6 shadow-[0_2px_20px_rgba(13,58,126,0.06)] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#EEF3FB] border-2 border-[#D5E2F5] flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-[#0D3A7E]" />
                </div>
                <h3 className="text-[#0C1929] font-medium text-sm mb-2">{locale === "uk" ? uk : en}</h3>
                <p className="text-[#4A6180] text-xs font-light leading-relaxed">{locale === "uk" ? uk_d : en_d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="section-padding bg-white">
        <div className="container-clinic">
          <SectionHeader title={t("certificates")} centered />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {["ISO 9001:2015", "JCI Accredited", "EU GMP", "WHO Standards"].map((cert) => (
              <div key={cert} className="flex items-center gap-2 px-5 py-3 bg-[#F2F6FB] border border-[#D6E3F0] rounded-[6px]">
                <Award size={16} className="text-[#0D3A7E]" />
                <span className="text-sm font-medium text-[#0C1929]">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
