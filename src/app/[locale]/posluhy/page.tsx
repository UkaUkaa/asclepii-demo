"use client";

import { useState, useMemo } from "react";
import {
  Search, Stethoscope, Baby, Scan, FlaskConical,
  Scissors, Syringe, ChevronDown, ChevronRight, X,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { ALL_POSLUHY, SUBCATS, type MainCat } from "@/lib/api/posluhy-data";

// ─── Config ───────────────────────────────────────────────────────────────────

const TABS: {
  id: MainCat;
  ukLabel: string;
  enLabel: string;
  icon: React.ElementType;
  ctaUk: string;
  ctaEn: string;
}[] = [
  { id: "adult",        ukLabel: "Поліклініка для дорослих",  enLabel: "Adult Polyclinic",    icon: Stethoscope, ctaUk: "Записатись",   ctaEn: "Book"    },
  { id: "pediatric",    ukLabel: "Поліклініка для дітей",     enLabel: "Pediatric Polyclinic",icon: Baby,        ctaUk: "Записатись",   ctaEn: "Book"    },
  { id: "instrumental", ukLabel: "Інструментальна діагностика", enLabel: "Diagnostics",       icon: Scan,        ctaUk: "Записатись",   ctaEn: "Book"    },
  { id: "lab",          ukLabel: "Лабораторні дослідження",   enLabel: "Laboratory",          icon: FlaskConical,ctaUk: "Замовити",     ctaEn: "Order"   },
  { id: "proc_adult",   ukLabel: "Процедури для дорослих",    enLabel: "Adult Procedures",    icon: Syringe,     ctaUk: "Записатись",   ctaEn: "Book"    },
  { id: "proc_child",   ukLabel: "Процедури для дітей",       enLabel: "Child Procedures",    icon: Syringe,     ctaUk: "Записатись",   ctaEn: "Book"    },
  { id: "op_adult",     ukLabel: "Операції для дорослих",     enLabel: "Adult Operations",    icon: Scissors,    ctaUk: "Консультація", ctaEn: "Consult" },
  { id: "op_child",     ukLabel: "Операції для дітей",        enLabel: "Child Operations",    icon: Scissors,    ctaUk: "Консультація", ctaEn: "Consult" },
];

const TAB_COLORS: Record<MainCat, { icon: string; bg: string; active: string }> = {
  adult:        { icon: "text-[#0D3A7E]", bg: "bg-[#EEF3FB]", active: "bg-[#0D3A7E]" },
  pediatric:    { icon: "text-[#F57C00]", bg: "bg-[#FFF3E0]", active: "bg-[#F57C00]" },
  instrumental: { icon: "text-[#1A9EC9]", bg: "bg-[#E6F7FC]", active: "bg-[#1A9EC9]" },
  lab:          { icon: "text-[#0097A7]", bg: "bg-[#E0F7FA]", active: "bg-[#0097A7]" },
  proc_adult:   { icon: "text-[#7B1FA2]", bg: "bg-[#F3E5F5]", active: "bg-[#7B1FA2]" },
  proc_child:   { icon: "text-[#E91E63]", bg: "bg-[#FCE4EC]", active: "bg-[#E91E63]" },
  op_adult:     { icon: "text-[#C62828]", bg: "bg-[#FFEBEE]", active: "bg-[#C62828]" },
  op_child:     { icon: "text-[#5D4037]", bg: "bg-[#EFEBE9]", active: "bg-[#5D4037]" },
};

const ITEMS_PER_PAGE = 50;

// ─── Component ────────────────────────────────────────────────────────────────

export default function PoslugyPage() {
  const locale = useLocale() as "uk" | "en";
  const [activeTab, setActiveTab] = useState<MainCat>("adult");
  const [activeSub, setActiveSub] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedTabs, setExpandedTabs] = useState<Set<MainCat>>(new Set(["adult"]));

  const toggleExpand = (tab: MainCat, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedTabs((prev) => {
      const next = new Set(prev);
      next.has(tab) ? next.delete(tab) : next.add(tab);
      return next;
    });
  };

  const handleTabChange = (tab: MainCat) => {
    setActiveTab(tab);
    setActiveSub("all");
    setSearch("");
    setVisibleCount(ITEMS_PER_PAGE);
    setMobileOpen(false);
    setExpandedTabs((prev) => {
      const next = new Set(prev);
      next.add(tab);
      return next;
    });
  };

  const handleSubChange = (sub: string) => {
    setActiveSub(sub);
    setVisibleCount(ITEMS_PER_PAGE);
    setMobileOpen(false);
  };

  const filtered = useMemo(() => {
    return ALL_POSLUHY.filter((item) => {
      const matchCat = item.cat === activeTab;
      const matchSub = activeSub === "all" || item.sub === activeSub;
      const matchSearch = search === "" || item.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSub && matchSearch;
    });
  }, [activeTab, activeSub, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const currentTab = TABS.find((t) => t.id === activeTab)!;
  const colors = TAB_COLORS[activeTab];
  const subcats = SUBCATS[activeTab];

  const counts = useMemo(
    () => Object.fromEntries(TABS.map((t) => [t.id, ALL_POSLUHY.filter((i) => i.cat === t.id).length])),
    []
  );

  const activeSubLabel = activeSub === "all"
    ? (locale === "uk" ? "Всі" : "All")
    : subcats.find((s) => s.sub === activeSub)?.label ?? "";

  // ─── Sidebar nav ────────────────────────────────────────────────────────────
  const SidebarNav = () => (
    <nav>
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActiveTab = activeTab === tab.id;
        const isExpanded = expandedTabs.has(tab.id);
        const c = TAB_COLORS[tab.id];
        const tabSubs = SUBCATS[tab.id];
        const hasSubs = tabSubs.length > 1;

        return (
          <div key={tab.id}>
            {/* Main category row */}
            <div className={cn(
              "flex items-center rounded-[6px] transition-all",
              isActiveTab ? "bg-[#EEF3FB]" : "hover:bg-[#F5F8FC]"
            )}>
              {/* Category select button */}
              <button
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm text-left min-w-0",
                  isActiveTab ? "text-[#0D3A7E] font-medium" : "text-[#4A6180] hover:text-[#0C1929]"
                )}
              >
                <div className={cn("w-7 h-7 rounded-[4px] flex items-center justify-center flex-shrink-0", isActiveTab ? c.bg : "bg-[#F2F6FB]")}>
                  <Icon size={13} className={isActiveTab ? c.icon : "text-[#8298B0]"} />
                </div>
                <span className="flex-1 leading-tight text-[13px] min-w-0">
                  {locale === "uk" ? tab.ukLabel : tab.enLabel}
                </span>
              </button>

              {/* Expand toggle */}
              {hasSubs ? (
                <button
                  onClick={(e) => toggleExpand(tab.id, e)}
                  className={cn(
                    "px-2 py-2.5 flex-shrink-0 transition-colors",
                    isActiveTab ? "text-[#0D3A7E]" : "text-[#8298B0] hover:text-[#4A6180]"
                  )}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                  <ChevronDown size={13} className={cn("transition-transform duration-200", isExpanded && "rotate-180")} />
                </button>
              ) : (
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 mr-2",
                  isActiveTab ? "bg-[#0D3A7E]/10 text-[#0D3A7E]" : "bg-[#F2F6FB] text-[#8298B0]"
                )}>
                  {counts[tab.id]}
                </span>
              )}
            </div>

            {/* Subcategories — collapsible */}
            {hasSubs && isExpanded && (
              <div className="ml-[1.625rem] mt-0.5 mb-1 border-l-2 border-[#D6E3F0] pl-3 space-y-0.5">
                <button
                  onClick={() => { if (!isActiveTab) handleTabChange(tab.id); else handleSubChange("all"); }}
                  className={cn(
                    "w-full text-left text-xs px-2 py-1.5 rounded-[4px] transition-all",
                    activeSub === "all" && isActiveTab
                      ? "text-[#0D3A7E] font-semibold bg-[#EEF3FB]"
                      : "text-[#4A6180] hover:text-[#0D3A7E] hover:bg-[#F5F8FC]"
                  )}
                >
                  {locale === "uk" ? "Всі" : "All"} ({counts[tab.id]})
                </button>
                {tabSubs.map((sc) => {
                  const subCount = ALL_POSLUHY.filter((i) => i.cat === tab.id && i.sub === sc.sub).length;
                  return (
                    <button
                      key={sc.sub}
                      onClick={() => { if (!isActiveTab) handleTabChange(tab.id); handleSubChange(sc.sub); }}
                      className={cn(
                        "w-full text-left text-xs px-2 py-1.5 rounded-[4px] transition-all leading-snug",
                        activeSub === sc.sub && isActiveTab
                          ? "text-[#0D3A7E] font-semibold bg-[#EEF3FB]"
                          : "text-[#4A6180] hover:text-[#0D3A7E] hover:bg-[#F5F8FC]"
                      )}
                    >
                      <span className="flex items-center justify-between gap-1">
                        <span>{sc.label}</span>
                        <span className="text-[10px] text-[#8298B0] flex-shrink-0">{subCount}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-10 lg:py-12">
          <span className="inline-block px-2.5 py-1 bg-[#E6F7FC] text-[#1A9EC9] text-[10px] font-medium uppercase tracking-widest rounded-[4px] mb-3">
            {locale === "uk" ? "Прозорі ціни" : "Transparent Pricing"}
          </span>
          <h1 className="text-3xl lg:text-4xl font-light text-[#0C1929] tracking-tight mb-2">
            {locale === "uk" ? "Послуги та ціни" : "Services & Pricing"}
          </h1>
          <p className="text-[#4A6180] font-light max-w-xl leading-relaxed text-sm">
            {locale === "uk"
              ? "Повний прайс-лист медичного центру Асклепій — 1 857 позицій."
              : "Full price list of Asklepiy Medical Center — 1,857 items."}
          </p>
        </div>
      </div>

      {/* ── Main layout ── */}
      <section className="bg-white">
        <div className="container-clinic py-8 lg:py-10">
          <div className="flex gap-6 xl:gap-8 items-start">

            {/* ── Desktop sidebar ── */}
            <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
              <div className="sticky top-[140px] space-y-0.5">
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#8298B0] px-3 mb-2">
                  {locale === "uk" ? "Категорії" : "Categories"}
                </p>
                {SidebarNav()}
              </div>
            </aside>

            {/* ── Content ── */}
            <div className="flex-1 min-w-0">

              {/* Mobile: category selector */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#F2F6FB] border border-[#D6E3F0] rounded-[6px] text-sm font-medium text-[#0C1929]"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#0D3A7E]">{locale === "uk" ? currentTab.ukLabel : currentTab.enLabel}</span>
                    {activeSub !== "all" && (
                      <>
                        <ChevronRight size={12} className="text-[#8298B0]" />
                        <span className="text-[#4A6180] font-light">{activeSubLabel}</span>
                      </>
                    )}
                  </span>
                  <ChevronDown size={16} className={cn("text-[#4A6180] transition-transform", mobileOpen && "rotate-180")} />
                </button>

                {mobileOpen && (
                  <div className="mt-1 border border-[#D6E3F0] rounded-[6px] bg-white shadow-[0_4px_20px_rgba(13,58,126,0.08)] p-2 max-h-80 overflow-y-auto">
                    {SidebarNav()}
                  </div>
                )}
              </div>

              {/* Search + reset */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 max-w-sm">
                  <Input
                    placeholder={locale === "uk" ? "Пошук послуги…" : "Search service…"}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setActiveSub("all"); setVisibleCount(ITEMS_PER_PAGE); }}
                    icon={<Search size={15} />}
                  />
                </div>
                {(search || activeSub !== "all") && (
                  <button
                    onClick={() => { setSearch(""); setActiveSub("all"); }}
                    className="flex items-center gap-1 text-xs text-[#4A6180] hover:text-[#0D3A7E] transition-colors whitespace-nowrap"
                  >
                    <X size={12} />
                    {locale === "uk" ? "Скинути" : "Reset"}
                  </button>
                )}
                {filtered.length > 0 && (
                  <span className="text-xs text-[#8298B0] font-light whitespace-nowrap ml-auto">
                    {filtered.length} {locale === "uk" ? "позицій" : "items"}
                  </span>
                )}
              </div>

              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 mb-4 text-xs text-[#8298B0]">
                <span className={cn("font-medium", colors.icon)}>
                  {locale === "uk" ? currentTab.ukLabel : currentTab.enLabel}
                </span>
                {activeSub !== "all" && (
                  <>
                    <ChevronRight size={10} />
                    <span className="text-[#4A6180]">{activeSubLabel}</span>
                  </>
                )}
              </div>

              {/* Items */}
              <div className="space-y-1.5">
                {visible.map((item) => {
                  const Icon = currentTab.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 px-4 bg-white border border-[#D6E3F0] rounded-[6px] hover:border-[#0D3A7E]/25 hover:bg-[#F8FAFC] transition-all group"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={cn("w-7 h-7 rounded-[4px] flex items-center justify-center flex-shrink-0 mt-0.5", colors.bg)}>
                          <Icon size={13} className={colors.icon} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-[#0C1929] font-light group-hover:text-[#0D3A7E] transition-colors leading-snug">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#8298B0] mt-0.5">{item.subLabel}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0 pl-10 sm:pl-0">
                        {item.price > 0 ? (
                          <span className="text-sm font-semibold text-[#0D3A7E] tabular-nums whitespace-nowrap">
                            {item.price.toLocaleString("uk-UA")} {locale === "uk" ? "грн" : "UAH"}
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-[#388E3C]">
                            {locale === "uk" ? "Безкоштовно" : "Free"}
                          </span>
                        )}
                        <Link href="/napryamky">
                          <Button variant="secondary" size="sm">
                            {locale === "uk" ? currentTab.ctaUk : currentTab.ctaEn}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-[#8298B0] font-light">
                    {locale === "uk" ? `Показано ${visible.length} з ${filtered.length}` : `Showing ${visible.length} of ${filtered.length}`}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                    icon={<ChevronDown size={14} />}
                    iconPosition="right"
                  >
                    {locale === "uk" ? "Показати ще" : "Load more"}
                  </Button>
                </div>
              )}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-[#8298B0] font-light">
                  {locale === "uk" ? "Послуг не знайдено" : "No services found"}
                </div>
              )}

              {visible.length > 0 && (
                <div className="mt-8 p-4 bg-[#EEF3FB] border border-[#D5E2F5] rounded-[6px]">
                  <p className="text-xs text-[#4A6180] font-light leading-relaxed">
                    {locale === "uk"
                      ? "* Ціни вказані в гривнях. Остаточна вартість може відрізнятись залежно від складності та обсягу процедур. Для уточнення зверніться до адміністратора клініки."
                      : "* Prices are in UAH. Final cost may vary depending on complexity and scope. Contact the clinic administrator for clarification."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
