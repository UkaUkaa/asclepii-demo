"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, Menu, X, Globe, ChevronDown, Calendar } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils/cn";

const PHONE_NUMBERS = {
  reception: "+38 (098) 046-33-03",
  diagnostic: "+38 (095) 010-31-03",
  pediatrics: "+38 (093) 170-01-03",
};

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [phoneDropdown, setPhoneDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  type AppPath = "/" | "/napryamky" | "/posluhy" | "/likari" | "/novyny" | "/pro-nas" | "/kontakty";
  const navLinks: { href: AppPath; label: string }[] = [
    { href: "/napryamky", label: t("nav.directions") },
    { href: "/posluhy", label: t("nav.posluhy") },
    { href: "/likari", label: t("nav.doctors") },
    { href: "/novyny", label: t("nav.news") },
    { href: "/pro-nas", label: t("nav.about") },
    { href: "/kontakty", label: t("nav.contacts") },
  ];
  const mobileNavLinks: { href: AppPath; label: string }[] = [
    { href: "/", label: t("nav.home") },
    ...navLinks,
  ];

  const toggleLocale = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace({ pathname: pathname as any, params: params as any }, { locale: locale === "uk" ? "en" : "uk" });
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white border-b border-[#D6E3F0] shadow-[0_4px_30px_rgba(13,58,126,0.08)]"
            : "bg-transparent",
          mobileOpen && "opacity-0 pointer-events-none"
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Top bar */}
        <div className="border-b border-[#D6E3F0]/40 hidden lg:block">
          <div className="container-clinic">
            <div className="flex items-center justify-between h-10 text-xs text-[#4A6180]">
              <span className="whitespace-nowrap">{t("header.tagline")}</span>
              <div className="flex items-center gap-4 flex-shrink-0">
                <a
                  href={`tel:${PHONE_NUMBERS.reception.replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 hover:text-[#0D3A7E] transition-colors whitespace-nowrap"
                >
                  <Phone size={11} />
                  <span>{t("header.phones.reception")}: {PHONE_NUMBERS.reception}</span>
                </a>
                <span className="text-[#D6E3F0]">|</span>
                <a
                  href={`tel:${PHONE_NUMBERS.diagnostic.replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 hover:text-[#0D3A7E] transition-colors whitespace-nowrap"
                >
                  <Phone size={11} />
                  <span>{t("header.phones.diagnostic")}: {PHONE_NUMBERS.diagnostic}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="container-clinic">
          <div className="flex items-center justify-between h-16 lg:h-[70px]">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/logo.webp"
                alt="Асклепій — Медичний центр"
                width={160}
                height={52}
                priority
                className="h-9 w-auto lg:h-11 object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-light rounded-[4px] transition-all duration-200 whitespace-nowrap",
                    "hover:text-[#0D3A7E] hover:bg-[#EEF3FB]",
                    pathname === link.href
                      ? "text-[#0D3A7E] bg-[#EEF3FB] font-medium"
                      : "text-[#4A6180]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Phone dropdown (desktop) */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setPhoneDropdown(!phoneDropdown)}
                  className="flex items-center gap-1.5 h-9 px-3 text-sm text-[#4A6180] hover:text-[#0D3A7E] rounded-[6px] hover:bg-[#EEF3FB] transition-all"
                  aria-expanded={phoneDropdown}
                >
                  <Phone size={14} />
                  <ChevronDown size={12} className={cn("transition-transform", phoneDropdown && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {phoneDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-72 glass rounded-[6px] shadow-[0_8px_40px_rgba(13,58,126,0.12)] border border-white/40 py-2 z-50"
                    >
                      {Object.entries(PHONE_NUMBERS).map(([key, number]) => (
                        <a
                          key={key}
                          href={`tel:${number.replace(/\s/g, "")}`}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#EEF3FB] transition-colors"
                        >
                          <div className="w-7 h-7 rounded-full bg-[#EEF3FB] flex items-center justify-center flex-shrink-0">
                            <Phone size={12} className="text-[#0D3A7E]" />
                          </div>
                          <div>
                            <div className="text-xs text-[#8298B0] font-light">
                              {t(`header.phones.${key}`)}
                            </div>
                            <div className="text-sm text-[#0C1929] font-medium">{number}</div>
                          </div>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language toggle */}
              <button
                onClick={toggleLocale}
                className="hidden sm:flex items-center gap-1.5 h-9 px-3 text-sm text-[#4A6180] hover:text-[#0D3A7E] rounded-[6px] hover:bg-[#EEF3FB] transition-all"
                aria-label="Toggle language"
              >
                <Globe size={14} />
                <span className="font-medium uppercase text-xs">
                  {locale === "uk" ? "EN" : "UA"}
                </span>
              </button>

              {/* Sign in */}
              <a
                href="https://patient-docs.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center h-9 px-4 text-sm text-[#0D3A7E] font-medium rounded-[6px] border border-[#D6E3F0] hover:bg-[#EEF3FB] hover:border-[#0D3A7E] transition-all whitespace-nowrap"
              >
                {t("nav.signIn")}
              </a>

              {/* Book button */}
              <Link href="/napryamky">
                <Button
                  variant="primary"
                  size="sm"
                  className="hidden lg:inline-flex whitespace-nowrap"
                  icon={<Calendar size={14} />}
                >
                  {t("header.bookButton")}
                </Button>
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden flex items-center justify-center w-10 h-10 rounded-[6px] text-[#0C1929] hover:bg-[#EEF3FB] transition-all"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={mobileNavLinks}
        locale={locale}
        onToggleLocale={toggleLocale}
        phones={PHONE_NUMBERS}
      />

      {/* Overlay click-outside */}
      {phoneDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setPhoneDropdown(false)}
        />
      )}
    </>
  );
}
