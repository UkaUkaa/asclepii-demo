"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Calendar } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DOCTORS, CATEGORIES } from "@/lib/api/mock-doctors";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function DoctorsPageContent() {
  const t = useTranslations("doctors");
  const locale = useLocale() as "uk" | "en";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = DOCTORS.filter((d) => {
    const matchSearch = d.name[locale].toLowerCase().includes(search.toLowerCase()) ||
      d.specialty[locale].toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || d.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <>
      {/* Header */}
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-12">
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            tag={locale === "uk" ? "Наша команда" : "Our Team"}
          />
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
            {/* Mobile: dropdown */}
            <select
              className="sm:hidden w-full h-9 px-3 text-xs rounded-[6px] border border-[#D6E3F0] text-[#4A6180] bg-white font-medium focus:outline-none focus-visible:outline-none"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat[locale]}</option>
              ))}
            </select>

            {/* Desktop: buttons */}
            <div className="hidden sm:flex sm:flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 text-[11px] rounded-[4px] border font-medium transition-all text-center leading-tight ${
                    activeCategory === cat.id
                      ? "bg-[#0D3A7E] text-white border-[#0D3A7E]"
                      : "bg-white text-[#4A6180] border-[#D6E3F0] hover:border-[#0D3A7E]/50"
                  }`}
                >
                  {cat[locale]}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${search}-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((doctor, i) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="h-full"
                >
                  <Link href={{ pathname: "/likari/[slug]", params: { slug: doctor.slug } }} className="block h-full">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="group bg-white border border-[#D6E3F0] rounded-[6px] overflow-hidden shadow-[0_2px_20px_rgba(13,58,126,0.06)] hover:shadow-[0_8px_40px_rgba(13,58,126,0.12)] transition-shadow cursor-pointer flex flex-col h-full"
                    >
                      <div className="flex items-start gap-4 p-5">
                        <div className="relative flex-shrink-0">
                          <img
                            src={doctor.photo}
                            alt={doctor.name[locale]}
                            className="w-20 h-20 rounded-[6px] object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-white rounded-[4px] px-1.5 py-0.5 shadow-sm border border-[#D6E3F0]">
                            <Star size={9} className="text-[#F59E0B] fill-[#F59E0B]" />
                            <span className="text-[10px] font-semibold text-[#0C1929]">{doctor.rating}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[#0C1929] font-medium text-sm leading-snug mb-1">
                            {doctor.name[locale]}
                          </h3>
                          <p className="text-[#1A9EC9] text-xs font-light mb-2">
                            {doctor.specialty[locale]}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2 justify-center sm:justify-start">
                            <Badge variant="neutral" size="sm">
                              {doctor.experience} {t("experience")}
                            </Badge>
                          </div>
                          <p className="text-[#8298B0] text-xs font-light">
                            {doctor.schedule[locale]}
                          </p>
                        </div>
                      </div>
                      <div className="px-5 pb-5 mt-auto">
                        <div className="text-xs text-[#4A6180] font-light line-clamp-2 mb-4">
                          {doctor.bio[locale]}
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          icon={<Calendar size={13} />}
                          onClick={(e) => { e.preventDefault(); }}
                        >
                          {t("bookAppointment")}
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#8298B0] font-light">
              {locale === "uk" ? "Лікарів не знайдено" : "No doctors found"}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
