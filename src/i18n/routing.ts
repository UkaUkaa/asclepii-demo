import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uk", "en"],
  defaultLocale: "uk",
  pathnames: {
    "/": "/",
    "/napryamky": { uk: "/napryamky", en: "/services" },
    "/posluhy": { uk: "/posluhy", en: "/posluhy" },
    "/novyny": { uk: "/novyny", en: "/news" },
    "/novyny/[slug]": { uk: "/novyny/[slug]", en: "/news/[slug]" },
    "/deklaratsiya": { uk: "/deklaratsiya", en: "/declaration" },
    "/pro-nas": { uk: "/pro-nas", en: "/about" },
    "/kontakty": { uk: "/kontakty", en: "/contacts" },
    "/likari": { uk: "/likari", en: "/doctors" },
    "/likari/[slug]": { uk: "/likari/[slug]", en: "/doctors/[slug]" },
  },
});

export type Locale = (typeof routing.locales)[number];
