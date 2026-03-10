"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Calendar, ChevronRight, Shield, Award, Clock, Star } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

const STATS = [
  { value: "50,000+", key: "patients", icon: Shield },
  { value: "50+", key: "doctors", icon: Award },
  { value: "25", key: "experience", icon: Clock },
  { value: "30+", key: "services", icon: Calendar },
];

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const navT = useTranslations("nav");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F2F6FB] min-h-[85vh] flex items-center">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#EEF3FB] opacity-60" />
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-[#E6F7FC] opacity-40" />
        <div className="absolute -bottom-16 right-1/4 w-[300px] h-[300px] rounded-full bg-[#EEF3FB] opacity-50" />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0D3A7E" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-clinic relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={{ y: titleY }}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-[#D6E3F0] rounded-[4px] text-xs text-[#0D3A7E] font-medium shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                {locale === "uk" ? "Відкрито зараз" : "Open Now"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#0C1929] leading-[1.1] mb-6"
            >
              {t("title").split("\n").map((line, i) => (
                <span key={i}>
                  {i === 1 ? (
                    <span className="text-gradient">{line}</span>
                  ) : (
                    line
                  )}
                  {i === 0 && <br />}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-[#4A6180] text-lg font-light leading-relaxed mb-8 max-w-lg"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/napryamky" className="sm:w-auto w-full">
                <Button
                  variant="primary"
                  size="md"
                  icon={<Calendar size={16} />}
                  className="whitespace-nowrap w-full sm:w-auto"
                >
                  {t("cta")}
                </Button>
              </Link>
              <Link href="/likari" className="sm:w-auto w-full">
                <Button
                  variant="outline"
                  size="md"
                  icon={<ChevronRight size={16} />}
                  iconPosition="right"
                  className="whitespace-nowrap w-full sm:w-auto"
                >
                  {navT("doctors")}
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map(({ value, key, icon: Icon }) => (
                <div key={key} className="flex flex-col gap-1">
                  <div className="text-2xl font-light text-[#0D3A7E]">{value}</div>
                  <div className="text-xs text-[#4A6180] font-light leading-snug">
                    {t(`stats.${key}`)}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
            style={{ y: imageY }}
          >
            <div className="relative">
              {/* Main image container */}
              <div className="relative rounded-[6px] overflow-hidden shadow-[0_20px_60px_rgba(13,58,126,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop"
                  alt="Modern medical clinic"
                  className="w-full h-[520px] object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={800}
                  height={520}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1929]/40 via-transparent to-transparent" />
              </div>

              {/* Floating card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute -left-8 top-1/4 glass rounded-[6px] px-4 py-3 shadow-[0_8px_30px_rgba(13,58,126,0.15)] border border-white/50 w-[160px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-xs text-[#0D3A7E] font-medium">
                    {locale === "uk" ? "Онлайн запис" : "Online Booking"}
                  </span>
                </div>
                <div className="text-2xl font-light text-[#0C1929]">24/7</div>
                <div className="text-xs text-[#4A6180] font-light">
                  {locale === "uk" ? "Доступно" : "Available"}
                </div>
              </motion.div>

              {/* Floating card 2 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute -right-6 bottom-1/3 glass rounded-[6px] px-4 py-3 shadow-[0_8px_30px_rgba(13,58,126,0.15)] border border-white/50 w-[160px]"
              >
                <div className="text-xs text-[#4A6180] font-light mb-1">
                  {locale === "uk" ? "Рейтинг клініки" : "Clinic Rating"}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-light text-[#0C1929]">4.9</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-[#8298B0] font-light">
                  {locale === "uk" ? "2,847 відгуків" : "2,847 reviews"}
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-2 border-[#D5E2F5] opacity-50" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border border-[#D5E2F5] opacity-40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
