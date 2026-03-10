"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { NEWS_ITEMS } from "@/lib/api/mock-services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";

const EXTRA_NEWS = [
  {
    id: "4",
    slug: "cardiology-screening",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80",
    category: { uk: "Акції", en: "Promotions" },
    title: { uk: "Безкоштовний скринінг серцево-судинних захворювань", en: "Free Cardiovascular Screening" },
    excerpt: { uk: "У квітні проводимо безкоштовний кардіологічний скринінг для осіб старше 40 років.", en: "In April we are conducting free cardiovascular screening for people over 40." },
    date: "2026-03-10",
    readTime: { uk: "3 хв", en: "3 min" },
  },
  {
    id: "5",
    slug: "new-pediatrics-specialist",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80",
    category: { uk: "Новини клініки", en: "Clinic News" },
    title: { uk: "Новий дитячий кардіолог у нашій команді", en: "New Pediatric Cardiologist Joins Our Team" },
    excerpt: { uk: "Раді повідомити, що до нашої команди приєднався провідний дитячий кардіолог з 15-річним досвідом.", en: "We are pleased to announce a leading pediatric cardiologist with 15 years of experience joins our team." },
    date: "2026-02-25",
    readTime: { uk: "2 хв", en: "2 min" },
  },
  {
    id: "6",
    slug: "online-results",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    category: { uk: "Новини клініки", en: "Clinic News" },
    title: { uk: "Результати аналізів тепер доступні онлайн", en: "Test Results Now Available Online" },
    excerpt: { uk: "Запускаємо нову функцію особистого кабінету — результати досліджень надходять прямо на смартфон.", en: "Launching a new dashboard feature — test results go straight to your smartphone." },
    date: "2026-02-18",
    readTime: { uk: "2 хв", en: "2 min" },
  },
];

const ALL_NEWS = [...NEWS_ITEMS, ...EXTRA_NEWS];

export default function NewsPage() {
  const t = useTranslations("news");
  const locale = useLocale() as "uk" | "en";
  const [filter, setFilter] = useState("all");

  const FILTERS = [
    { id: "all", uk: "Всі", en: "All" },
    { id: "clinic", uk: "Новини клініки", en: "Clinic News" },
    { id: "promo", uk: "Акції", en: "Promotions" },
  ];

  const filtered = ALL_NEWS.filter((n) => {
    if (filter === "all") return true;
    if (filter === "clinic") return n.category.uk === "Новини клініки";
    if (filter === "promo") return n.category.uk === "Акції";
    return true;
  });

  return (
    <>
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-12">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} tag="Blog" />
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-clinic">
          {/* Filter */}
          <div className="flex gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 text-sm rounded-[4px] font-medium transition-all ${
                  filter === f.id
                    ? "bg-[#0D3A7E] text-white"
                    : "bg-[#F2F6FB] text-[#4A6180] hover:bg-[#EEF3FB] border border-[#D6E3F0]"
                }`}
              >
                {f[locale]}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={{ pathname: "/novyny/[slug]", params: { slug: item.slug } }}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="group bg-white border border-[#D6E3F0] rounded-[6px] overflow-hidden shadow-[0_2px_20px_rgba(13,58,126,0.06)] hover:shadow-[0_8px_40px_rgba(13,58,126,0.12)] transition-shadow cursor-pointer h-full flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title[locale]}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant={item.category.uk === "Акції" ? "accent" : "neutral"}>
                          {item.category[locale]}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-[#8298B0] font-light mb-3">
                        <Clock size={11} />
                        <span>{new Date(item.date).toLocaleDateString(locale === "uk" ? "uk-UA" : "en", { day: "numeric", month: "long" })}</span>
                        <span>·</span>
                        <span>{item.readTime[locale]}</span>
                      </div>
                      <h3 className="text-[#0C1929] font-medium text-sm leading-snug mb-2 flex-1">{item.title[locale]}</h3>
                      <p className="text-[#4A6180] text-xs font-light leading-relaxed mb-4">{item.excerpt[locale]}</p>
                      <div className="flex items-center gap-1.5 text-[#1A9EC9] text-xs font-medium">
                        <span>{t("readMore")}</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
