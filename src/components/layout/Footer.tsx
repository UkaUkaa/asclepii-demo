import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

type AppPath = "/" | "/napryamky" | "/posluhy" | "/likari" | "/deklaratsiya" | "/pro-nas" | "/novyny" | "/kontakty";

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const services: { href: AppPath; key: string }[] = [
    { href: "/napryamky", key: "directions" },
    { href: "/posluhy", key: "posluhy" },
    { href: "/likari", key: "doctors" },
    { href: "/deklaratsiya", key: "declaration" },
  ];

  const info: { href: AppPath; key: string }[] = [
    { href: "/pro-nas", key: "about" },
    { href: "/novyny", key: "news" },
    { href: "/kontakty", key: "contacts" },
  ];

  return (
    <footer className="bg-[#0C1929] text-white">
      {/* Main footer content */}
      <div className="container-clinic py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href="/">
                <Image
                  src="/logo.webp"
                  alt="Асклепій — Медичний центр"
                  width={160}
                  height={52}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </Link>
            </div>
            <p className="text-white/50 text-sm font-light leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-[6px] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div className="text-left">
            <h3 className="text-white text-sm font-medium mb-5 uppercase tracking-widest">
              Послуги
            </h3>
            <ul className="space-y-3">
              {services.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/50 text-sm font-light hover:text-white transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info column */}
          <div className="text-left">
            <h3 className="text-white text-sm font-medium mb-5 uppercase tracking-widest">
              Клініка
            </h3>
            <ul className="space-y-3">
              {info.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/50 text-sm font-light hover:text-white transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://patient-docs.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 text-sm font-light hover:text-white transition-colors"
                >
                  {t("nav.signIn")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="text-left">
            <h3 className="text-white text-sm font-medium mb-5 uppercase tracking-widest">
              Контакти
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=вул.+Покровська,+31,+Житомир"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/50 text-sm hover:text-white transition-colors group"
                >
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 group-hover:text-[#1A9EC9]" />
                  <span className="font-light leading-relaxed">
                    {t("contacts.addressValue")}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+380980463303"
                  className="flex items-center gap-3 text-white/50 text-sm hover:text-white transition-colors group"
                >
                  <Phone size={14} className="flex-shrink-0 group-hover:text-[#1A9EC9]" />
                  <span className="font-light">+38 (098) 046-33-03</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@asklepiy.com"
                  className="flex items-center gap-3 text-white/50 text-sm hover:text-white transition-colors group"
                >
                  <Mail size={14} className="flex-shrink-0 group-hover:text-[#1A9EC9]" />
                  <span className="font-light">info@asklepiy.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/50 text-sm">
                  <Clock size={14} className="mt-0.5 flex-shrink-0" />
                  <div className="font-light text-left">
                    <div>{t("contacts.weekdays")}: {t("contacts.weekdaysHours")}</div>
                    <div>{t("contacts.sunday")}: {t("contacts.sundayHours")}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-clinic py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs font-light">
            <span>© {currentYear} Asklepiy Clinic. {t("footer.rights")}.</span>
            <span>Made by STEPS LAB</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white/60 transition-colors">
                {t("footer.privacy")}
              </a>
              <span>·</span>
              <a href="#" className="hover:text-white/60 transition-colors">
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
