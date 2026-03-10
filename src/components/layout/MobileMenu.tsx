"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Globe, X, Calendar, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type AppPath = "/" | "/napryamky" | "/posluhy" | "/likari" | "/novyny" | "/pro-nas" | "/kontakty";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: AppPath; label: string }[];
  locale: string;
  onToggleLocale: () => void;
  phones: { reception: string; diagnostic: string; pediatrics: string };
}

export function MobileMenu({ isOpen, onClose, navLinks, locale, onToggleLocale, phones }: MobileMenuProps) {
  const t = useTranslations();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-[#0C1929]/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm glass-dark overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Image
                src="/logo.webp"
                alt="Асклепій — Медичний центр"
                width={140}
                height={46}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-[6px] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="p-6 space-y-1" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center h-12 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-[6px] transition-all text-base font-light"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Divider */}
            <div className="mx-6 border-t border-white/10" />

            {/* Phone numbers */}
            <div className="p-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4 font-light">
                {locale === "uk" ? "Телефони" : "Phone Numbers"}
              </p>
              <div className="space-y-3">
                {(
                  [
                    { key: "reception", number: phones.reception },
                    { key: "diagnostic", number: phones.diagnostic },
                    { key: "pediatrics", number: phones.pediatrics },
                  ] as const
                ).map(({ key, number }) => (
                  <a
                    key={key}
                    href={`tel:${number.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                      <Phone size={14} className="text-[#1A9EC9]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs font-light">
                        {t(`header.phones.${key}`)}
                      </div>
                      <div className="text-white text-sm font-medium">{number}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-white/10" />

            {/* Actions */}
            <div className="p-6 space-y-3">
              <a
                href="https://patient-docs.com/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-[6px] border border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all text-sm font-medium"
              >
                <User size={15} />
                {t("nav.signIn")}
              </a>
              <Link href="/napryamky" onClick={onClose}>
                <Button
                  variant="secondary"
                  fullWidth
                  icon={<Calendar size={15} />}
                >
                  {t("header.bookButton")}
                </Button>
              </Link>

              {/* Language */}
              <button
                onClick={() => { onToggleLocale(); onClose(); }}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-[6px] border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
              >
                <Globe size={14} />
                <span>
                  {locale === "uk" ? "Switch to English" : "Перейти на Українську"}
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
