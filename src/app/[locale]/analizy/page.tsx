"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FlaskConical, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";

const ANALYSES = [
  { id: "a1", uk: "Загальний аналіз крові (ЗАК)", en: "Complete Blood Count (CBC)", price: 120, cat: "general", time: { uk: "1 день", en: "1 day" } },
  { id: "a2", uk: "Загальний аналіз сечі (ЗАС)", en: "Urinalysis", price: 90, cat: "general", time: { uk: "1 день", en: "1 day" } },
  { id: "a3", uk: "Біохімічний аналіз крові", en: "Blood Biochemistry Panel", price: 350, cat: "biochemistry", time: { uk: "1 день", en: "1 day" } },
  { id: "a4", uk: "Ліпідний профіль", en: "Lipid Profile", price: 280, cat: "biochemistry", time: { uk: "1 день", en: "1 day" } },
  { id: "a5", uk: "Глюкоза в крові", en: "Blood Glucose", price: 60, cat: "biochemistry", time: { uk: "1 день", en: "1 day" } },
  { id: "a6", uk: "ТТГ (тиреотропний гормон)", en: "TSH (Thyroid Stimulating Hormone)", price: 220, cat: "hormones", time: { uk: "2 дні", en: "2 days" } },
  { id: "a7", uk: "Т4 вільний", en: "Free T4", price: 180, cat: "hormones", time: { uk: "2 дні", en: "2 days" } },
  { id: "a8", uk: "Тестостерон загальний", en: "Total Testosterone", price: 230, cat: "hormones", time: { uk: "2 дні", en: "2 days" } },
  { id: "a9", uk: "Феритин", en: "Ferritin", price: 160, cat: "biochemistry", time: { uk: "2 дні", en: "2 days" } },
  { id: "a10", uk: "С-реактивний білок (СРБ)", en: "C-Reactive Protein (CRP)", price: 140, cat: "immunology", time: { uk: "1 день", en: "1 day" } },
  { id: "a11", uk: "Антитіла до ТПО", en: "Anti-TPO Antibodies", price: 260, cat: "immunology", time: { uk: "3 дні", en: "3 days" } },
  { id: "a12", uk: "Коагулограма", en: "Coagulogram", price: 320, cat: "biochemistry", time: { uk: "2 дні", en: "2 days" } },
  { id: "a13", uk: "Антинуклеарні антитіла (ANA)", en: "Antinuclear Antibodies (ANA)", price: 380, cat: "immunology", time: { uk: "4 дні", en: "4 days" } },
  { id: "a14", uk: "ПЛР на COVID-19", en: "COVID-19 PCR Test", price: 380, cat: "microbiology", time: { uk: "24 год", en: "24 hrs" } },
  { id: "a15", uk: "Бактеріологічний посів", en: "Bacteriological Culture", price: 290, cat: "microbiology", time: { uk: "5-7 днів", en: "5-7 days" } },
];

const CAT_MAP: Record<string, { uk: string; en: string }> = {
  general: { uk: "Загальні аналізи", en: "General Tests" },
  biochemistry: { uk: "Біохімія", en: "Biochemistry" },
  hormones: { uk: "Гормони", en: "Hormones" },
  immunology: { uk: "Імунологія", en: "Immunology" },
  microbiology: { uk: "Мікробіологія", en: "Microbiology" },
};

export default function AnalysesPage() {
  const t = useTranslations("analyses");
  const locale = useLocale() as "uk" | "en";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = ANALYSES.filter((a) => {
    const matchSearch = a[locale].toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || a.cat === activeCategory;
    return matchSearch && matchCat;
  });

  const categories = ["all", ...Object.keys(CAT_MAP)];

  return (
    <>
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-12">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} tag="Lab" />
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-clinic">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 max-w-sm">
              <Input
                placeholder={t("search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search size={15} />}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-[4px] border font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-[#0D3A7E] text-white border-[#0D3A7E]"
                      : "bg-white text-[#4A6180] border-[#D6E3F0] hover:border-[#0D3A7E]/50"
                  }`}
                >
                  {cat === "all" ? (locale === "uk" ? "Всі" : "All") : CAT_MAP[cat][locale]}
                </button>
              ))}
            </div>
          </div>

          {/* Analyses list */}
          <div className="space-y-2 max-w-3xl">
            {filtered.map((analysis, i) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between py-4 px-5 bg-white border border-[#D6E3F0] rounded-[6px] hover:border-[#0D3A7E]/30 hover:bg-[#F8FAFC] transition-all group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-[4px] bg-[#E6F7FC] flex items-center justify-center flex-shrink-0">
                    <FlaskConical size={14} className="text-[#1A9EC9]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-[#0C1929] font-light truncate group-hover:text-[#0D3A7E] transition-colors">
                      {analysis[locale]}
                    </div>
                    <div className="text-xs text-[#8298B0] font-light">
                      {locale === "uk" ? "Результат:" : "Result:"} {analysis.time[locale]}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-base font-medium text-[#0D3A7E]">
                    {analysis.price} {locale === "uk" ? "грн" : "UAH"}
                  </span>
                  <Button variant="secondary" size="sm">
                    {t("orderOnline")}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#8298B0] font-light">
              {locale === "uk" ? "Аналізів не знайдено" : "No analyses found"}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
