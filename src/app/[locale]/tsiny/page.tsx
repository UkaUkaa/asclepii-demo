"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { PRICE_CATEGORIES } from "@/lib/api/mock-services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Calendar } from "lucide-react";

export default function PricesPage() {
  const t = useTranslations("prices");
  const locale = useLocale() as "uk" | "en";
  const [activeTab, setActiveTab] = useState("1");

  const TABS = [
    { id: "1", uk: "Консультації", en: "Consultations" },
    { id: "2", uk: "Діагностика", en: "Diagnostics" },
    { id: "3", uk: "Аналізи", en: "Analyses" },
  ];

  const activeCategory = PRICE_CATEGORIES.find((c) => c.id === activeTab);

  return (
    <>
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-12">
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            tag={locale === "uk" ? "Прозорі ціни" : "Transparent Prices"}
          />
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-clinic">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-[#D6E3F0]">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${
                  activeTab === tab.id
                    ? "border-[#0D3A7E] text-[#0D3A7E]"
                    : "border-transparent text-[#4A6180] hover:text-[#0C1929]"
                }`}
              >
                {tab[locale]}
              </button>
            ))}
          </div>

          {/* Price list */}
          {activeCategory && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl"
            >
              <div className="space-y-2">
                {activeCategory.items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center justify-between py-4 px-5 bg-white border border-[#D6E3F0] rounded-[6px] hover:border-[#0D3A7E]/30 hover:bg-[#F8FAFC] transition-all group"
                  >
                    <span className="text-sm text-[#0C1929] font-light group-hover:text-[#0D3A7E] transition-colors">
                      {item.name[locale]}
                    </span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-base font-medium text-[#0D3A7E]">
                        {item.price} {t("currency")}
                      </span>
                      <Link href="/napryamky">
                        <Button variant="secondary" size="sm">
                          {locale === "uk" ? "Записатись" : "Book"}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#EEF3FB] border border-[#D5E2F5] rounded-[6px]">
                <p className="text-sm text-[#4A6180] font-light">
                  {locale === "uk"
                    ? "* Ціни вказані в гривнях. Остаточна вартість може відрізнятись залежно від складності та обсягу процедур. Для уточнення зверніться до адміністратора."
                    : "* Prices are in UAH. Final cost may vary depending on the complexity and scope of procedures. Contact the administrator for clarification."}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
