"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";

const CLINIC_COORDS = { lat: 50.2549, lng: 28.6609 };

export default function ContactsPage() {
  const t = useTranslations("contacts");
  const locale = useLocale() as "uk" | "en";

  const PHONES = [
    { key: "reception", number: "+38 (098) 046-33-03" },
    { key: "diagnostic", number: "+38 (095) 010-31-03" },
    { key: "pediatrics", number: "+38 (093) 170-01-03" },
  ];

  return (
    <>
      {/* Header */}
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-12">
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            tag={locale === "uk" ? "Знайти нас" : "Find Us"}
          />
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-clinic">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            {/* Left: Contact info */}
            <div className="flex flex-col gap-6">
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-[#D6E3F0] rounded-[6px] p-6 shadow-[0_2px_20px_rgba(13,58,126,0.06)]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-[6px] bg-[#EEF3FB] flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#0D3A7E]" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-[#0C1929] mb-1">{t("address")}</h3>
                    <p className="text-[#4A6180] font-light text-sm">{t("addressValue")}</p>
                    <a
                      href="https://maps.google.com/?q=вул.+Покровська,+31,+Житомир"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs text-[#1A9EC9] hover:text-[#0D3A7E] transition-colors font-medium"
                    >
                      <ExternalLink size={11} />
                      {t("getDirections")}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Phones */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="bg-white border border-[#D6E3F0] rounded-[6px] p-6 shadow-[0_2px_20px_rgba(13,58,126,0.06)] space-y-4"
              >
                {PHONES.map(({ key, number }) => (
                  <div key={key} className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-[6px] bg-[#EEF3FB] flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#0D3A7E]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#8298B0] font-light mb-0.5 text-left">
                        {t(key as any)}
                      </div>
                      <a
                        href={`tel:${number.replace(/\s/g, "")}`}
                        className="text-sm font-medium text-[#0C1929] hover:text-[#0D3A7E] transition-colors"
                      >
                        {number}
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="bg-white border border-[#D6E3F0] rounded-[6px] p-6 shadow-[0_2px_20px_rgba(13,58,126,0.06)]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-[6px] bg-[#EEF3FB] flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-[#0D3A7E]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8298B0] font-light mb-0.5 text-left">{t("email")}</div>
                    <a
                      href="mailto:info@asklepiy.com"
                      className="text-sm font-medium text-[#0C1929] hover:text-[#0D3A7E] transition-colors"
                    >
                      info@asklepiy.com
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="flex-1 flex flex-col"
              >
                <div className="bg-white border border-[#D6E3F0] rounded-[6px] p-6 shadow-[0_2px_20px_rgba(13,58,126,0.06)] flex-1 flex flex-col">
                <div className="flex items-center gap-5 flex-1">
                  <div className="w-10 h-10 rounded-[6px] bg-[#EEF3FB] flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-[#0D3A7E]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-medium text-[#0C1929] mb-3">{t("workingHours")}</h3>
                    <div className="space-y-2">
                      {[
                        { day: t("weekdays"), hours: t("weekdaysHours") },
                        { day: t("saturday"), hours: t("saturdayHours") },
                        { day: t("sunday"), hours: t("sundayHours") },
                      ].map(({ day, hours }) => (
                        <div key={day} className="flex items-center justify-between text-sm">
                          <span className="text-[#4A6180] font-light">{day}</span>
                          <span className="text-[#0C1929] font-medium">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Map + Contact form */}
            <div className="flex flex-col gap-6">
              {/* Map embed */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-[6px] overflow-hidden border border-[#D6E3F0] shadow-[0_2px_20px_rgba(13,58,126,0.06)] h-72 bg-[#EEF3FB] flex items-center justify-center"
              >
                <iframe
                  src="https://maps.google.com/maps?q=вул.+Покровська+31+Житомир&output=embed&hl=uk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Asklepiy Clinic Location"
                />
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="bg-white border border-[#D6E3F0] rounded-[6px] p-7 shadow-[0_2px_20px_rgba(13,58,126,0.06)] flex-1 text-left"
              >
                <h3 className="text-lg font-light text-[#0C1929] mb-6">{t("writeUs")}</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label={locale === "uk" ? "Ваше ім'я" : "Your name"} placeholder={locale === "uk" ? "Ім'я та прізвище" : "First and last name"} />
                    <PhoneInput label={locale === "uk" ? "Телефон" : "Phone"} id="phone" />
                  </div>
                  <Input label={locale === "uk" ? "Email" : "Email"} placeholder="email@example.com" type="email" />
                  <Textarea
                    label={locale === "uk" ? "Повідомлення" : "Message"}
                    placeholder={locale === "uk" ? "Ваше повідомлення..." : "Your message..."}
                  />
                  <Button variant="primary" fullWidth>
                    {locale === "uk" ? "Надіслати повідомлення" : "Send Message"}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
