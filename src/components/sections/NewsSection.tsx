"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NEWS_ITEMS } from "@/lib/api/mock-services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function NewsSection() {
  const t = useTranslations("home.news");
  const newsT = useTranslations("news");
  const locale = useLocale() as "uk" | "en";

  return (
    <section className="section-padding bg-[#F2F6FB]">
      <div className="container-clinic">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} />
          <Link href="/novyny">
            <Button variant="outline" size="sm" icon={<ChevronRight size={14} />} iconPosition="right">
              {t("viewAll")}
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {NEWS_ITEMS.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <Link href={{ pathname: "/novyny/[slug]", params: { slug: item.slug } }}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group bg-white border border-[#D6E3F0] rounded-[6px] overflow-hidden shadow-[0_2px_20px_rgba(13,58,126,0.06)] hover:shadow-[0_8px_40px_rgba(13,58,126,0.12)] transition-shadow cursor-pointer h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title[locale]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#0D3A7E] text-xs font-medium rounded-[4px]">
                        {item.category[locale]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#8298B0] font-light mb-3">
                      <Clock size={11} />
                      <span>{new Date(item.date).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span>·</span>
                      <span>{item.readTime[locale]}</span>
                    </div>
                    <h3 className="text-[#0C1929] font-medium text-sm leading-snug mb-2 flex-1">
                      {item.title[locale]}
                    </h3>
                    <p className="text-[#4A6180] text-xs font-light leading-relaxed mb-4">
                      {item.excerpt[locale]}
                    </p>
                    <div className="flex items-center gap-1.5 text-[#1A9EC9] text-xs font-medium group-hover:gap-2 transition-all">
                      <span>{newsT("readMore")}</span>
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
  );
}
